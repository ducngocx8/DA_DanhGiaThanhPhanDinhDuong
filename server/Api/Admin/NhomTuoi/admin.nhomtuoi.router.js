const express = require("express");
const {
  adminGetAllNhomTuoi,
  adminDeleteNhomTuoi,
  adminAddNhomTuoi,
  adminUpdateNhomTuoi,
  adminOffset,
} = require("./admin.nhomtuoi.controller");
const {
  nhomTuoiValidation,
  idNhomTuoiValidation,
} = require("../../../middlewares/validations/nhomtuoi.validation");
const {
  offsetValidation,
} = require("../../../middlewares/validations/search.validation");

const adminNhomTuoiRoute = express.Router();

adminNhomTuoiRoute.get("/", adminGetAllNhomTuoi);
adminNhomTuoiRoute.post(
  "/",
  offsetValidation,
  nhomTuoiValidation,
  adminAddNhomTuoi
);
adminNhomTuoiRoute.delete(
  "/:id",
  offsetValidation,
  idNhomTuoiValidation,
  adminDeleteNhomTuoi
);
adminNhomTuoiRoute.put(
  "/:id",
  offsetValidation,
  idNhomTuoiValidation,
  nhomTuoiValidation,
  adminUpdateNhomTuoi
);

adminNhomTuoiRoute.get("/get/offset", offsetValidation, adminOffset);

module.exports = adminNhomTuoiRoute;
