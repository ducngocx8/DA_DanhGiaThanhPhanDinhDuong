const { encodePassword, decodePassword } = require("../../../Utils");
const { sequelize, User, Role } = require("../../../models");
const { Op } = require("Sequelize");
const getAll = async () => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const users = await User.findAll({
        include: [{ model: Role }],
        order: [["user_id", "ASC"]],
      });
      users_update = users.map((user) => {
        const password_decode = decodePassword(user.dataValues.password);
        return {
          ...user.dataValues,
          password: password_decode,
        };
      });
      return users_update;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const adminGetAllUserService = async () => {
  const result = await getAll();
  if (result) {
    return {
      status: true,
      data: result,
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống",
    };
  }
};

const checkUserName = async (username, status, user_id) => {
  // status 1: Add (không yêu cầu id), status 2: Update (yêu cầu id)
  let whereObject = {};
  if (status === 1) {
    whereObject = {
      username: username,
    };
  } else if (status === 2) {
    whereObject = {
      [Op.and]: [
        { username: username },
        { user_id: { [Op.not]: Number(user_id) } },
      ],
    };
  }
  try {
    const result = await sequelize.transaction(async (t) => {
      const user = await User.findOne({
        where: whereObject,
      });
      return user;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const checkPhoneNumber = async (phonenumber, status, user_id) => {
  // status 1: Add (không yêu cầu id), status 2: Update (yêu cầu id)
  let whereObject = {};
  if (status === 1) {
    whereObject = {
      phonenumber: phonenumber,
    };
  } else if (status === 2) {
    whereObject = {
      [Op.and]: [
        { phonenumber: phonenumber },
        { user_id: { [Op.not]: Number(user_id) } },
      ],
    };
  }
  try {
    const result = await sequelize.transaction(async (t) => {
      const user = await User.findOne({
        where: whereObject,
      });
      return user;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const checkEmail = async (email, status, user_id) => {
  // status 1: Add (không yêu cầu id), status 2: Update (yêu cầu id)
  let whereObject = {};
  if (status === 1) {
    whereObject = {
      email: email,
    };
  } else if (status === 2) {
    whereObject = {
      [Op.and]: [{ email: email }, { user_id: { [Op.not]: Number(user_id) } }],
    };
  }
  try {
    const result = await sequelize.transaction(async (t) => {
      const user = await User.findOne({
        where: whereObject,
      });
      return user;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const checkRoleID = async (role_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const role = await Role.findOne({
        where: {
          role_id,
        },
      });
      return role;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const checkUserID = async (user_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const user = await User.findOne({
        where: {
          user_id,
        },
      });
      return user;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const addUser = async (userBody) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const {
        username,
        password,
        email,
        address,
        firstname,
        lastname,
        phonenumber,
        user_status,
        image_url,
        role_id,
      } = userBody;
      const password_encode = encodePassword(password.trim());
      const user = await User.create(
        {
          username,
          email,
          password: password_encode,
          address: address ? address : "",
          firstname: firstname ? firstname.trim() : "",
          lastname: lastname ? lastname.trim() : "",
          phonenumber: phonenumber ? phonenumber : "",
          user_status: Number(user_status),
          role_id: Number(role_id),
          image_url,
          createdAt: new Date(),
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

const adminAddUserService = async (userBody, queryParam) => {
  const username = userBody.username.trim();
  const email = userBody.email.trim();
  const phonenumber = userBody.phonenumber ? userBody.phonenumber : null;
  const role_id = Number(userBody.role_id);

  const check_role = await checkRoleID(role_id);
  if (!check_role) {
    return {
      status: false,
      message: "Quyền hạn không tồn tại trên hệ thống.",
    };
  }

  const list_check = phonenumber
    ? [
        Promise.resolve(checkUserName(username, 1, -1)),
        Promise.resolve(checkEmail(email, 1, -1)),
        Promise.resolve(checkPhoneNumber(phonenumber, 1, -1)),
      ]
    : [
        Promise.resolve(checkUserName(username, 1, -1)),
        Promise.resolve(checkEmail(email, 1, -1)),
      ];
  const values = await Promise.all(list_check);
  if (values[0] !== null) {
    // username
    return {
      status: false,
      message: "Username đã tồn tại trên hệ thống",
    };
  } else if (values[1] !== null) {
    // email
    return {
      status: false,
      message: "Email đã tồn tại trên hệ thống",
    };
  } else if (phonenumber) {
    // phonenumber
    if (values[2] !== null) {
      return {
        status: false,
        message: "Số điện thoại đã tồn tại trên hệ thống",
      };
    }
  }

  if (phonenumber) {
    if (values[0] === false || values[1] === false || values[2] === false) {
      return {
        status: false,
        message: "Lỗi server, vui lòng thử lại",
      };
    }
  } else {
    if (values[0] === false || values[1] === false) {
      return {
        status: false,
        message: "Lỗi server, vui lòng thử lại",
      };
    }
  }

  const add_result = await addUser(userBody);
  if (add_result) {
    const user_list = await getAllOfset(queryParam);
    const page = await findItem(queryParam, username);
    return {
      status: true,
      data: user_list,
      page: page,
      message: "Thêm user mới thành công",
    };
  } else {
    return {
      status: false,
      message: "Thêm user mới thất bại",
    };
  }
};

const updateUser = async (user_id, userBody) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const {
        username,
        password,
        email,
        address,
        firstname,
        lastname,
        phonenumber,
        user_status,
        role_id,
      } = userBody;
      const password_encode = encodePassword(password.trim());
      const price_update = await User.update(
        {
          username,
          email,
          password: password_encode,
          address: address ? address : "",
          firstname: firstname ? firstname.trim() : "",
          lastname: lastname ? lastname.trim() : "",
          phonenumber: phonenumber ? phonenumber : "",
          user_status: Number(user_status),
          role_id: Number(role_id),
          updatedAt: new Date(),
        },
        {
          where: {
            user_id,
          },
        },
        { transaction: t }
      );
      return price_update;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const adminUpdateUserService = async (user_id, userBody, queryParam) => {
  const username = userBody.username.trim();
  const email = userBody.email.trim();
  const phonenumber = userBody.phonenumber ? userBody.phonenumber : null;
  const role_id = Number(userBody.role_id);

  const check_user_id = await checkUserID(user_id);
  if (!check_user_id) {
    return {
      status: false,
      message: "User không tồn tại trên hệ thống.",
    };
  }

  const check_role = await checkRoleID(role_id);
  if (!check_role) {
    return {
      status: false,
      message: "Quyền hạn không tồn tại trên hệ thống.",
    };
  }

  const list_check = phonenumber
    ? [
        Promise.resolve(checkUserName(username, 2, user_id)),
        Promise.resolve(checkEmail(email, 2, user_id)),
        Promise.resolve(checkPhoneNumber(phonenumber, 2, user_id)),
      ]
    : [
        Promise.resolve(checkUserName(username, 2, user_id)),
        Promise.resolve(checkEmail(email, 2, user_id)),
      ];
  const values = await Promise.all(list_check);
  if (values[0] !== null) {
    // username
    return {
      status: false,
      message: "Username đã tồn tại trên hệ thống",
    };
  } else if (values[1] !== null) {
    // email
    return {
      status: false,
      message: "Email đã tồn tại trên hệ thống",
    };
  } else if (phonenumber) {
    // phonenumber
    if (values[2] !== null) {
      return {
        status: false,
        message: "Số điện thoại đã tồn tại trên hệ thống",
      };
    }
  }

  if (phonenumber) {
    if (values[0] === false || values[1] === false || values[2] === false) {
      return {
        status: false,
        message: "Lỗi server, vui lòng thử lại",
      };
    }
  } else {
    if (values[0] === false || values[1] === false) {
      return {
        status: false,
        message: "Lỗi server, vui lòng thử lại",
      };
    }
  }
  const update_result = await updateUser(user_id, userBody);
  if (update_result) {
    const user_list = await getAllOfset(queryParam);
    const page = await findItem(queryParam, username);
    return {
      status: true,
      data: user_list,
      page: page,
      message: "Cập nhật thông tin user thành công",
    };
  } else {
    return {
      status: false,
      message: "Cập nhật thông tin user thất bại",
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

const adminUpdateImageService = async (user_id, image_url, queryParam) => {
  const check_user_id = await checkUserID(user_id);
  if (check_user_id) {
    const update_result = await updateImage(user_id, image_url);
    if (update_result) {
      const userList = await getAllOfset(queryParam);
      return {
        status: true,
        data: userList,
        page: null,
        message: "Cập nhật ảnh đại diện cho người dùng thành công",
      };
    } else {
      return {
        status: false,
        message: "Cập nhật ảnh đại diện cho người dùng thất bại",
      };
    }
  } else if (check_user_id === null) {
    return {
      status: false,
      message: "Người dùng không tồn tại trên hệ thống.",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const getAllOfset = async (queryParam) => {
  let { offset, limit, sort, type, keyword, status } = queryParam;
  status = Number(status);
  try {
    const result = await sequelize.transaction(async (t) => {
      // status = 1: ALL
      // status = 2: Đã xác thực
      // status = 3: Tạm khóa
      // status = 4: Chưa xác thực
      let whereObject = {};
      if (status === 1) {
        whereObject = {};
      } else if (status === 2) {
        whereObject = {
          user_status: 2,
        };
      } else if (status === 3) {
        whereObject = {
          user_status: 3,
        };
      } else if (status === 4) {
        whereObject = {
          user_status: 1,
        };
      }

      const list = await User.findAll({
        order: [[sort, type]],
        offset: Number(offset),
        limit: Number(limit),
        include: [{ model: Role }],
        where: {
          [Op.or]: [
            {
              user_id: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              username: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              email: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              phonenumber: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              "$Role.role_name$": {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              "$Role.role_code$": {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
          [Op.and]: [whereObject],
        },
      });
      users_update = list.map((user) => {
        const password_decode = decodePassword(user.dataValues.password);
        return {
          ...user.dataValues,
          password: password_decode,
        };
      });
      return users_update;
    });

    return result;
  } catch (error) {
    return false;
  }
};

const adminOffsetService = async (queryParam) => {
  const result = await getAllOfset(queryParam);
  if (result) {
    return {
      status: true,
      data: result,
      page: null,
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const findItem = async (queryParam, find_value) => {
  let { limit, sort, type, keyword, status } = queryParam;
  status = Number(status);
  try {
    const result = await sequelize.transaction(async (t) => {
      let whereObject = {};
      if (status === 1) {
        whereObject = {};
      } else if (status === 2) {
        whereObject = {
          user_status: 2,
        };
      } else if (status === 3) {
        whereObject = {
          user_status: 3,
        };
      } else if (status === 4) {
        whereObject = {
          user_status: 1,
        };
      }
      const list = await User.findAll({
        order: [[sort, type]],
        include: [{ model: Role }],
        where: {
          [Op.or]: [
            {
              user_id: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              username: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              email: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              phonenumber: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              "$Role.role_name$": {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              "$Role.role_code$": {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
          [Op.and]: [whereObject],
        },
      });
      return list;
    });

    const find_index = result.findIndex(
      (item) =>
        String(item.username).trim().toLocaleLowerCase() ===
        String(find_value).trim().toLocaleLowerCase()
    );

    if (find_index !== -1) {
      const page_count = (find_index + 1) % limit;
      if (page_count === 0) {
        return (find_index + 1) / limit;
      } else {
        return Math.floor((find_index + 1) / limit) + 1;
      }
    }
    return 1;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  adminGetAllUserService,
  adminAddUserService,
  adminUpdateUserService,
  adminUpdateImageService,
  adminOffsetService,
};
