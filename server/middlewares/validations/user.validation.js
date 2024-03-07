const { regexUsername, regexEmail, regexPhone } = require("../../Utils");

const userIDValidation = (req, res, next) => {
  const user_id = req.params.id;
  if (!Number.isInteger(Number(user_id))) {
    res.status(201).send({
      status: false,
      message: "User_id phải là số nguyên",
    });
  } else {
    next();
  }
};

const userValidation = (req, res, next) => {
  let { username, password, email, phonenumber, user_status, role_id } =
    req.body;
  console.log(username, password, email, phonenumber, user_status, role_id);
  if (!username || !password || !email || !user_status || !role_id) {
    return res.status(201).send({
      status: false,
      message:
        "Thiếu 1 trong các thông tin username, password, email, status, quyền hạn",
    });
  } else {
    if (!regexUsername.test(username) || username.trim().length > 20) {
      return res.status(201).send({
        status: false,
        message: "Username không hợp lệ, vui lòng kiểm tra lại.",
      });
    } else if (!regexEmail.test(email) || email.trim().length > 50) {
      return res.status(201).send({
        status: false,
        message: "Email không hợp lệ, vui lòng kiểm tra lại.",
      });
    } else if (!Number.isInteger(Number(role_id))) {
      return res.status(201).send({
        status: false,
        message: "Role ID phải là số nguyên dương.",
      });
    } else if (
      !Number.isInteger(Number(user_status)) ||
      Number(user_status) > 3 ||
      Number(user_status) < 1
    ) {
      return res.status(201).send({
        status: false,
        message: "Trạng thái người dùng phải là 1 số nguyên từ 1 đến 3.",
      });
    } else if (password.trim().length < 3 || password.trim().length > 255) {
      return res.status(201).send({
        status: false,
        message: "Mật khẩu cần từ 3 ký tự trở lên.",
      });
    } else if (phonenumber) {
      if (!regexPhone.test(phonenumber)) {
        return res.status(201).send({
          status: false,
          message: "Số điện thoại không hợp lệ, vui lòng kiểm tra lại",
        });
      }
    }
    next();
  }
};


const imageUserValidation = (req, res, next) => {
  let { image_url } = req.body;
  if (!image_url && image_url !== "") {
    return res.status(201).send({
      status: false,
      message: "Chưa có thông tin hình ảnh.",
    });
  } else {
    // if (image_url.trim() === "") {
    //   res.status(201).send({
    //     status: false,
    //     message: "Chưa chọn hình ảnh.",
    //   });
    // } else if (image_url.trim().length > 255) {
    //   res.status(201).send({
    //     status: false,
    //     message: "Đường dẫn hình ảnh cần <= 255 ký tự",
    //   });
    // } else {
    //   next();
    // }
  }

  return next();
};

module.exports = {
  userIDValidation,
  userValidation,
  imageUserValidation,
};
