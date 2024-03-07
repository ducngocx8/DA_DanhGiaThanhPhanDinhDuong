const express = require("express");
const { adminOffsetNhomThucPham } = require("./admin.offset.controller");
const { offsetValidation } = require("../../../middlewares/validations/search.validation");

const adminOffsetRoute = express.Router();

adminOffsetRoute.get(
  "/nhom-thuc-pham",
  offsetValidation,
  adminOffsetNhomThucPham
);

module.exports = adminOffsetRoute;
