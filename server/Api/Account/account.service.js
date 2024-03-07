const { Op } = require("Sequelize");
const { User, Role, sequelize, Otp } = require("../../models");
const { OAuth2Client } = require("google-auth-library");
const {
  decodePassword,
  encodePassword,
  createTokenLogin,
  GOOGLE_CLIENT_ID,
  GOOGLE_WEB_CLIENT_ID,
} = require("../../Utils");
const { sendOTPVerifyEmailService } = require("../Mail/mail.service");
const { updateOTPService } = require("../Admin/Otp/admin.otp.service");
const {
  customerHandleLichSuLogService,
} = require("../Customer/LichSuLog/customer.lichsulog.service");
const checkExistUser = async (account, status) => {
  let username, email, arrCompare, typeCompare, user_id;
  if (status === "DANGKY") {
    username = account.username;
    email = account.email;
    arrCompare = [{ username: username }, { email: email }];
    typeCompare = {
      [Op.or]: arrCompare,
    };
  } else if (status === "CHECK_EXIST") {
    username = account.username;
    user_id = account.user_id;
    arrCompare = [{ user_id: user_id }, { username: username }];
    typeCompare = {
      [Op.and]: arrCompare,
    };
  }
  const user = await User.findOne({
    where: typeCompare,
  });
  return user;
};

const checkAccountLogin = async (account) => {
  const { username, password } = account;
  const user = await User.findOne({
    where: {
      username,
    },
    include: [
      {
        model: Role,
      },
    ],
  });
  if (user) {
    const password_user = user.password;
    const password_decode = decodePassword(password_user);
    if (password_decode === password) {
      if (Number(user.user_status) === 1) {
        return {
          status: false,
          message:
            "Tài khoản của bạn chưa xác thực Email. Vui lòng xác thực và đăng nhập lại.",
        };
      } else if (Number(user.user_status) === 3) {
        return {
          status: false,
          message:
            "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ Admin để được hỗ trợ.",
        };
      }

      const role = user.Role.role_code;
      const userLogin = {
        user_id: user.user_id,
        username: user.username,
        image_url: user.image_url,
        role: role,
      };
      console.log(userLogin);
      const token = createTokenLogin(userLogin);
      await customerHandleLichSuLogService(user.user_id);
      return {
        status: true,
        userLogin: userLogin,
        message: "Đăng nhập thành công.",
        token: token,
      };
    }
    return {
      status: false,
      message: "Tài khoản hoặc mật khẩu không chính xác.",
    };
  }
  return {
    status: false,
    message: "Username không tồn tại trên hệ thống",
  };
};

const checkAccountLoginGoogle = async (email) => {
  const user = await User.findOne({
    where: {
      email,
    },
    include: [
      {
        model: Role,
      },
    ],
  });
  if (user) {
    if (Number(user.user_status) === 1) {
      return {
        status: false,
        message:
          "Tài khoản của bạn chưa xác thực Email. Vui lòng xác thực và đăng nhập lại.",
      };
    } else if (Number(user.user_status) === 3) {
      return {
        status: false,
        message:
          "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ Admin để được hỗ trợ.",
      };
    }

    const role = user.Role.role_code;
    const userLogin = {
      user_id: user.user_id,
      username: user.username,
      image_url: user.image_url,
      role: role,
    };
    const token = createTokenLogin(userLogin);
    await customerHandleLichSuLogService(user.user_id);
    return {
      status: true,
      userLogin: userLogin,
      message: "Đăng nhập thành công.",
      token: token,
    };
  }
  return {
    status: false,
    message: "Tài khoản Google chưa được liên kết với tài khoản.",
  };
};

const loginService = async (account) => {
  const check_acount = await checkAccountLogin(account);
  return check_acount;
};

const loginGoogleService = async (account) => {
  try {
    const { token, device } = account;
    let client_id = GOOGLE_CLIENT_ID;
    if (device) {
      client_id = GOOGLE_WEB_CLIENT_ID;
    }

    const client = new OAuth2Client(client_id);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: client_id,
    });

    const response = ticket.getPayload();

    if (response.iss !== "accounts.google.com" && response.aud !== client_id) {
      return {
        status: false,
        message: "Đăng nhập bằng Google không thành công",
      };
    }

    // console.log("response", response);
    const { email } = response;
    if (email) {
      const result = await checkAccountLoginGoogle(email);
      return result;
    } else {
      return {
        status: false,
        message: "Đăng nhập bằng Google không thành công",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Đăng nhập bằng Google không thành công",
    };
  }
};

const checkRoleIDExist = async (role_id, role_code) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const role = await Role.findOne({
        where: {
          role_id,
          role_code,
        },
      });
      return role;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const addUser = async (account) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const { username, email, password } = account;
      const checkRole = await checkRoleIDExist(2, "ROLE_CUSTOMER");
      if (!checkRole) {
        return false;
      }
      const password_encode = encodePassword(password);
      const user_default = {
        username,
        password: password_encode,
        email,
        user_status: 1, // 2 IS ACTIVE ĐANG DEMO
        role_id: 2, // 1 IS ADMIN ĐANG DEMO
        createdAt: new Date(),
      };
      const user = await User.create(user_default);
      const send_email_verify = await sendOTPVerifyEmailService(email);
      if (user && send_email_verify.status) return true;
      else if (user && !send_email_verify.status) return null;
      else if (!user && send_email_verify.status) return false;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const signupService = async (account) => {
  const check_exist_user = await checkExistUser(account, "DANGKY");
  if (check_exist_user) {
    if (check_exist_user.email === account.email) {
      return { status: false, message: "Email đã tồn tại trên hệ thống" };
    }
    return { status: false, message: "Username đã tồn tại trên hệ thống" };
  }
  const result = await addUser(account);
  if (result) {
    return {
      status: true,
      message:
        "Tạo tài khoản mới thành công. Vui lòng kiểm tra email và kích hoạt tài khoản.",
    };
  } else if (result === null) {
    return {
      status: false,
      message:
        "Tạo tài khoản mới thành công. Vui lòng gửi lại yêu cầu kích hoạt tài khoản.",
    };
  } else if (result === false) {
    return {
      status: false,
      message:
        "Tạo tài khoản mới thất bại do lỗi hệ thống. Vui lòng thử lại sau.",
    };
  }
};

const getUserInfoService = async (userLogin) => {
  const check_exist_user = await checkExistUser(userLogin, "CHECK_EXIST");
  return check_exist_user;
};

const updateInfo = async (userLogin, bodyUser, status) => {
  // status = 1: Update Info, status = 2: Update: password
  let new_info;
  if (status === 1) {
    new_info = {
      firstname: bodyUser.firstname ? bodyUser.firstname.trim() : "",
      lastname: bodyUser.lastname ? bodyUser.lastname.trim() : "",
      phonenumber: bodyUser.phonenumber ? bodyUser.phonenumber.trim() : "",
      updatedAt: new Date(),
    };
  } else if (status === 2) {
    const password_encode = encodePassword(bodyUser.newpassword);
    new_info = {
      password: password_encode,
      updatedAt: new Date(),
    };
  }
  try {
    const result = await sequelize.transaction(async (t) => {
      const update_result = await User.update(new_info, {
        where: {
          [Op.and]: [
            { user_id: userLogin.user_id },
            { username: userLogin.username },
          ],
        },
      });
      return update_result;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const checkDuplicatePhoneNumber = async (phonenumber) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const user = await User.findOne({
        where: {
          phonenumber,
        },
      });
      return user;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const updateUserInfoService = async (userLogin, bodyUser, status) => {
  console.log(bodyUser.phonenumber);
  if (bodyUser.phonenumber) {
    const user_phone = await checkDuplicatePhoneNumber(bodyUser.phonenumber);
    if (user_phone) {
      if (user_phone.user_id !== userLogin.user_id) {
        return {
          status: false,
          message: "Số điện thoại này đã tồn tại trên hệ thống.",
        };
      }
    }
  }
  const update_result = await updateInfo(userLogin, bodyUser, status);
  console.log(bodyUser);
  console.log(userLogin);
  if (update_result) {
    const user = await getUserInfoService(userLogin);
    // const password_decode = decodePassword(user.password);
    user.password = "----------";
    return {
      status: true,
      data: user,
      message: "Cập nhật thông tin user thành công",
    };
  } else {
    return {
      status: false,
      message: "Cập nhật thông tin user thất bại",
    };
  }
};

const checkPasswordCorrect = async (userLogin, bodyUser) => {
  const user = await User.findOne({
    where: {
      [Op.and]: [
        { user_id: userLogin.user_id },
        { username: userLogin.username },
      ],
    },
  });
  if (user) {
    const decoded_password = decodePassword(user.password);
    console.log("decode", decoded_password);
    if (bodyUser.oldpassword === decoded_password) {
      return true;
    }
  }
  return false;
};

const updatePasswordService = async (userLogin, bodyUser, status) => {
  const checkPassword = await checkPasswordCorrect(userLogin, bodyUser);
  if (checkPassword) {
    const update_result = await updateInfo(userLogin, bodyUser, status);
    console.log(update_result);
    if (update_result) {
      const user = await getUserInfoService(userLogin);
      // const password_decode = decodePassword(user.password);
      user.password = "######";
      return {
        status: true,
        data: user,
        message: "Cập nhật mật khẩu mới thành công",
      };
    } else {
      return {
        status: false,
        message: "Cập nhật mật khẩu mới thất bại",
      };
    }
  } else {
    return {
      status: false,
      message: "Mật khẩu cũ không chính xác",
    };
  }
};

const checkEmailToken = async (email, token, otp_type) => {
  let option_where = "";
  if (otp_type === 1) {
    option_where = {
      email,
      otp_code: String(token),
      status: false,
      otp_type,
      time_send: {
        [Op.gt]: new Date(new Date() - 3 * 60 * 1000),
      },
    };
  } else {
    option_where = {
      email,
      otp_code: String(token),
      status: false,
      otp_type,
    };
  }
  try {
    const result = await sequelize.transaction(async (t) => {
      const otp = await Otp.findOne({
        where: option_where,
      });
      return otp;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const checkAccount = async (email) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const account = await User.findOne({
        where: {
          email,
        },
      });
      return account;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const updateVerifyUser = async (email) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      let user = await User.update(
        {
          user_status: 2,
        },
        {
          where: {
            email,
          },
        },
        { transaction: t }
      );
      return user;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const verifyAccountService = async (email, token) => {
  const check_email_token = await checkEmailToken(email, token, 2);
  if (check_email_token) {
    const check_account = await checkAccount(email);
    if (check_account !== null) {
      if (Number(check_account.user_status) === 2) {
        return {
          status: false,
          message: "Tài khoản của bạn xác thực trước đó.",
          must: "login",
        };
      } else if (Number(check_account.user_status) === 3) {
        return {
          status: false,
          message: "Tài khoản của bạn đã bị khóa. Không thể xác thực.",
          must: "login",
        };
      } else {
        const update_otp_status = await updateOTPService(email, token, 2);
        const verify = await updateVerifyUser(email);
        if (verify && update_otp_status) {
          return {
            status: true,
            message: "Chúc mừng. Bạn đã xác thực tài khoản thành công.",
          };
        } else {
          return {
            status: false,
            message: "Lỗi hệ thống. Vui lòng xác thực lại sau.",
          };
        }
      }
    } else if (check_account === false) {
      return {
        status: false,
        message: "Lỗi hệ thống, vui lòng thử lại sau.",
      };
    } else {
      return {
        status: false,
        message: "Không tìm thấy thông tin người dùng từ Email này.",
      };
    }
  } else if (check_email_token == false) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  } else {
    return {
      status: false,
      message:
        "Đường link xác thực không tồn tại hoặc đã hết hạn. Vui lòng gửi yêu cầu mới!",
    };
  }
};

const updatePasswordVerifyService = async (email, password) => {
  try {
    const password_encode = encodePassword(String(password).trim());
    const result = await sequelize.transaction(async (t) => {
      let user = await User.update(
        {
          password: password_encode,
        },
        {
          where: {
            email,
            user_status: 2,
          },
        },
        { transaction: t }
      );
      return user;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const verifyForgotPasswordService = async (email, otp_code, password) => {
  const check_email_token = await checkEmailToken(email, otp_code, 1);
  if (check_email_token) {
    const check_account = await checkAccount(email);
    if (check_account !== null) {
      if (Number(check_account.user_status) === 1) {
        return {
          status: false,
          message:
            "Tài khoản của chưa xác thực. Vui lòng xác thực trước khi lấy mật khẩu mới.",
          must: "login",
        };
      } else if (Number(check_account.user_status) === 3) {
        return {
          status: false,
          message: "Tài khoản của bạn đã bị khóa. Không thể lấy mật khẩu mới.",
          must: "login",
        };
      } else {
        const update_otp_status = await updateOTPService(email, otp_code, 1);
        const update_password = await updatePasswordVerifyService(
          email,
          password
        );
        if (update_password) {
          return {
            status: true,
            message: "Chúc mừng. Bạn đã thay đổi mật khẩu thành công.",
          };
        } else {
          return {
            status: false,
            message: "Lỗi hệ thống. Vui lòng lấy lại mật khẩu sau.",
          };
        }
      }
    } else if (check_account === false) {
      return {
        status: false,
        message: "Lỗi hệ thống, vui lòng thử lại sau.",
      };
    } else {
      return {
        status: false,
        message: "Không tìm thấy thông tin người dùng từ Email này.",
      };
    }
  } else if (check_email_token == false) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  } else {
    return {
      status: false,
      message: "Mã OTP không đúng hoặc đã hết hạn. Vui lòng gửi yêu cầu mới!",
    };
  }
};

const updateImage = async (user_id, image_url) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const user = await User.update(
        {
          image_url: String(image_url).trim(),
        },
        {
          where: {
            user_id,
          },
        },
        { transaction: t }
      );
      return user;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const customerUpdateImageService = async (user_id, image_url) => {
  const update_result = await updateImage(user_id, image_url);
  if (update_result) {
    return {
      status: true,
      data: {
        image_url: image_url,
      },
      message: "Cập nhật ảnh đại diện thành công",
    };
  } else {
    return {
      status: false,
      message: "Cập nhật ảnh đại diện thất bại",
    };
  }
};

module.exports = {
  loginService,
  signupService,
  getUserInfoService,
  checkExistUser,
  updateUserInfoService,
  updatePasswordService,
  verifyAccountService,
  verifyForgotPasswordService,
  customerUpdateImageService,
  loginGoogleService,
};
