const express = require("express");
const {
  adminGetAllChuyenMuc,
  adminDeleteChuyenMuc,
  adminAddChuyenMuc,
  adminUpdateChuyenMuc,
  adminOffset,
} = require("./admin.chuyenmuc.controller");
const {
  tenChuyenMucValidation,
  idChuyenMucValidation,
} = require("../../../middlewares/validations/chuyenmuc.validation");
const { offsetValidation } = require("../../../middlewares/validations/search.validation");

const adminChuyenMucRoute = express.Router();

adminChuyenMucRoute.get("/", adminGetAllChuyenMuc);
adminChuyenMucRoute.post(
  "/",
  offsetValidation,
  tenChuyenMucValidation,
  adminAddChuyenMuc
);
adminChuyenMucRoute.delete(
  "/:id",
  offsetValidation,
  idChuyenMucValidation,
  adminDeleteChuyenMuc
);
adminChuyenMucRoute.put(
  "/:id",
  offsetValidation,
  idChuyenMucValidation,
  tenChuyenMucValidation,
  adminUpdateChuyenMuc
);

adminChuyenMucRoute.get(
  "/get/offset",
  offsetValidation,
  adminOffset
);

module.exports = adminChuyenMucRoute;
