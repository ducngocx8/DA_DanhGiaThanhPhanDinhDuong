const {
  customer_code,
  admin_code,
} = require("../Utils");

const customerPermission = (req, res, next) => {
  const { userLogin } = req;
  const role = userLogin.role;
  if (role === customer_code) {
    next();
  } else {
    res.status(200).send({
      status: false,
      message: "Chỉ có Khách Hàng mới có quyền sử dụng tính năng này!",
      must: "permission",
    });
  }
};

const adminPermission = (req, res, next) => {
  const { userLogin } = req;
  const role = userLogin.role;
  if (role === admin_code) {
    next();
  } else {
    res.status(200).send({
      status: false,
      message: "Chỉ có Admin mới có quyền sử dụng tính năng này!",
      must: "permission",
    });
  }
};

const admin_customer_Permission = (req, res, next) => {
  const { userLogin } = req;
  const role = userLogin.role;
  if (role === admin_code || role === customer_code) {
    next();
  } else {
    res.status(200).send({
      status: false,
      message: "Chỉ có Khách Hàng và Admin mới có quyền sử dụng tính năng này!",
      must: "permission",
    });
  }
};

const allPermission = (req, res, next) => {
  const { userLogin } = req;
  const role = userLogin.role;
  console.log(admin_code);
  if (role === admin_code || role === customer_code) {
    next();
  } else {
    res.status(200).send({
      status: false,
      message:
        "Chỉ có người dùng đăng nhập có quyền mới được sử dụng tính năng này!",
      must: "permission",
    });
  }
};

module.exports = {
  customerPermission,
  adminPermission,
  admin_customer_Permission,
  allPermission,
};
