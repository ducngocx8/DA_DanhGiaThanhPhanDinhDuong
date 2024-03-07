const {
  loginService,
  signupService,
  getUserInfoService,
  updateUserInfoService,
  updatePasswordService,
  verifyAccountService,
  verifyForgotPasswordService,
  customerUpdateImageService,
  loginGoogleService,
} = require("./account.service");

const login = async (req, res) => {
  const account = req.body;
  const result = await loginService(account);
  if (result.status) {
    res.cookie("access_token", "Bearer " + result.token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
  }
  res.status(201).send(result);
};

const loginGoogle = async (req, res) => {
  const account = req.body;
  const result = await loginGoogleService(account);
  if (result.status) {
    res.cookie("access_token", "Bearer " + result.token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
  }
  res.status(201).send(result);
};

const signup = async (req, res) => {
  const account = req.body;
  const result = await signupService(account);
  res.status(201).send(result);
};

const getUserInfo = async (req, res) => {
  const { userLogin } = req;
  const user = await getUserInfoService(userLogin);
  if (user) {
    // const password_decode = decodePassword(user.password);
    // user.password = password_decode;
    user.password = "##########";
    return res.status(200).send({
      status: true,
      data: user,
    });
  } else {
    return res.status(404).send({
      status: false,
      message: "Người dùng không tồn tại, vui lòng đăng nhập lại",
    });
  }
};

const updateUserInfo = async (req, res) => {
  const { userLogin } = req;
  const bodyUser = req.body;
  const result = await updateUserInfoService(userLogin, bodyUser, 1);
  res.status(201).send(result);
};

const updatePassword = async (req, res) => {
  const { userLogin } = req;
  const bodyUser = req.body;
  const result = await updatePasswordService(userLogin, bodyUser, 2);
  res.status(201).send(result);
};

const verifyAccount = async (req, res) => {
  const { email, token } = req.params;
  const result = await verifyAccountService(email, token);
  res.status(200).send(result);
};

const verifyForgotPassword = async (req, res) => {
  const { email, otp_code, password } = req.body;
  const result = await verifyForgotPasswordService(email, otp_code, password);
  res.status(201).send(result);
};

const logout = async (req, res) => {
  res.cookie("access_token", "", {
    maxAge: 24 * 60 * 60,
    httpOnly: true,
  });
  res.status(200).send({
    status: true,
    message: "Logout thành công.",
  });
};

const customerUpdateImage = async (req, res) => {
  const { userLogin } = req;
  const user_id = userLogin.user_id;
  let { image_url } = req.body;
  image_url = String(image_url).trim();
  const result = await customerUpdateImageService(user_id, image_url);
  res.status(201).send(result);
};

module.exports = {
  login,
  signup,
  logout,
  getUserInfo,
  updateUserInfo,
  updatePassword,
  verifyAccount,
  verifyForgotPassword,
  customerUpdateImage,
  loginGoogle,
};
