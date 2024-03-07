const express = require("express");
const {
  adminGetAllNhuCauHangNgay,
  adminDeleteNhuCauHangNgay,
  adminAddNhuCauHangNgay,
  adminUpdateNhuCauHangNgay,
  adminOffset,
} = require("./admin.nhucauhangngay.controller");
const {
  checkIDNhuCauHangNgayValidation,
  checkUpdateNhuCauHangNgayValidation,
} = require("../../../middlewares/validations/nhucauhangngay.validation");
const {
  offsetValidation,
} = require("../../../middlewares/validations/search.validation");

const adminNhuCauHangNgayRoute = express.Router();

adminNhuCauHangNgayRoute.get("/", adminGetAllNhuCauHangNgay);
adminNhuCauHangNgayRoute.post(
  "/",
  offsetValidation,
  checkIDNhuCauHangNgayValidation,
  adminAddNhuCauHangNgay
);
adminNhuCauHangNgayRoute.delete(
  "/",
  offsetValidation,
  checkIDNhuCauHangNgayValidation,
  adminDeleteNhuCauHangNgay
);
adminNhuCauHangNgayRoute.put(
  "/",
  offsetValidation,
  checkUpdateNhuCauHangNgayValidation,
  adminUpdateNhuCauHangNgay
);

adminNhuCauHangNgayRoute.get("/get/offset", offsetValidation, adminOffset);

module.exports = adminNhuCauHangNgayRoute;
