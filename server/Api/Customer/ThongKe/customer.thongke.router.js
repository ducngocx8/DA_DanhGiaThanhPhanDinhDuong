const express = require("express");
const {
  customerGetThongKeUser,
  customerGetThongKeDinhDuong,
} = require("./customer.thongke.controller");
const {
  verifyToken,
  checkUserToken,
} = require("../../../middlewares/validations/account.validation");
const { customerPermission, allPermission } = require("../../../middlewares/permission");
const {
  filterThongKeDinhDuongValidation,
} = require("../../../middlewares/validations/search.validation");
const customerThongKeRoute = express.Router();

customerThongKeRoute.get(
  "/thong-ke-top",
  verifyToken,
  checkUserToken,
  allPermission,
  customerGetThongKeUser
);

customerThongKeRoute.get(
  "/thong-ke-dinh-duong",
  verifyToken,
  checkUserToken,
  customerPermission,
  filterThongKeDinhDuongValidation,
  customerGetThongKeDinhDuong
);
module.exports = customerThongKeRoute;
