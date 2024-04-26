const express = require("express");
const {
  adminGetAllDoiTuong,
  adminDeleteDoiTuong,
  adminAddDoiTuong,
  adminUpdateDoiTuong,
  adminOffset,
} = require("./admin.doituong.controller");
const {
  tenDoiTuongValidation,
  idDoiTuongValidation,
} = require("../../../middlewares/validations/doituong.validation");
const {
  offsetValidation,
} = require("../../../middlewares/validations/search.validation");

const adminDoiTuongRoute = express.Router();

adminDoiTuongRoute.get("/", adminGetAllDoiTuong);
adminDoiTuongRoute.post(
  "/",
  offsetValidation,
  tenDoiTuongValidation,
  adminAddDoiTuong
);
adminDoiTuongRoute.delete(
  "/:id",
  offsetValidation,
  idDoiTuongValidation,
  adminDeleteDoiTuong
);
adminDoiTuongRoute.put(
  "/:id",
  offsetValidation,
  idDoiTuongValidation,
  tenDoiTuongValidation,
  adminUpdateDoiTuong
);
adminDoiTuongRoute.get("/get/offset", offsetValidation, adminOffset);

module.exports = adminDoiTuongRoute;
