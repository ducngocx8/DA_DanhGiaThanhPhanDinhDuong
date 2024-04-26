const express = require("express");
const { customerGetKhuyenNghi } = require("./customer.khuyennghi.controller");

const {
  verifyToken,
  checkUserToken,
} = require("../../../middlewares/validations/account.validation");

const { customerPermission } = require("../../../middlewares/permission");

const customerKhuyenNghiRoute = express.Router();

customerKhuyenNghiRoute.get(
  "/",
  verifyToken,
  checkUserToken,
  customerPermission,
  customerGetKhuyenNghi
);

module.exports = customerKhuyenNghiRoute;
