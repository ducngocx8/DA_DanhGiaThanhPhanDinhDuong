const express = require("express");
const {
  customerGetThongBao,
  customerDeleteThongBao,
  customerAddThongBao,
} = require("./customer.thongbao.controller.js");
const {
  ThongBaoValidation,
} = require("../../../middlewares/validations/thongbao.validation.js");

const {
  verifyToken,
  checkUserToken,
} = require("../../../middlewares/validations/account.validation.js");

const { customerPermission } = require("../../../middlewares/permission.js");

const customerThongBaoRoute = express.Router();

customerThongBaoRoute.get(
  "/",
  verifyToken,
  checkUserToken,
  customerPermission,
  customerGetThongBao
);

customerThongBaoRoute.post(
  "/",
  verifyToken,
  checkUserToken,
  customerPermission,
  ThongBaoValidation,
  customerAddThongBao
);

customerThongBaoRoute.delete(
  "/",
  verifyToken,
  checkUserToken,
  customerPermission,
  customerDeleteThongBao
);

module.exports = customerThongBaoRoute;
