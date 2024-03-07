const express = require("express");
const {
  adminGetAllNhomMonAn,
  adminDeleteNhomMonAn,
  adminAddNhomMonAn,
  adminUpdateNhomMonAn,
  adminUpdateImage,
  adminOffset,
} = require("./admin.nhommonan.controller");
const {
  tenNhomMonAnValidation,
  idNhomMonAnValidation,
  imageNhomMonAnValidation,
} = require("../../../middlewares/validations/nhommonan.validation");
const {
  offsetValidation,
} = require("../../../middlewares/validations/search.validation");

const adminNhomMonAnRoute = express.Router();

adminNhomMonAnRoute.get("/", adminGetAllNhomMonAn);
adminNhomMonAnRoute.post(
  "/",
  offsetValidation,
  tenNhomMonAnValidation,
  imageNhomMonAnValidation,
  adminAddNhomMonAn
);
adminNhomMonAnRoute.delete(
  "/:id",
  offsetValidation,
  idNhomMonAnValidation,
  adminDeleteNhomMonAn
);
adminNhomMonAnRoute.put(
  "/:id",
  offsetValidation,
  idNhomMonAnValidation,
  tenNhomMonAnValidation,
  adminUpdateNhomMonAn
);

adminNhomMonAnRoute.put(
  "/upload/:id",
  offsetValidation,
  idNhomMonAnValidation,
  imageNhomMonAnValidation,
  adminUpdateImage
);

adminNhomMonAnRoute.get("/get/offset", offsetValidation, adminOffset);

module.exports = adminNhomMonAnRoute;
