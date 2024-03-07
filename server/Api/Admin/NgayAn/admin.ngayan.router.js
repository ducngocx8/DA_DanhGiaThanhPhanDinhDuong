const express = require("express");
const {
  adminGetAllNgayAn,
  adminDeleteNgayAn,
  adminOffset,
} = require("./admin.ngayan.controller");
const {
  idNgayAnValidation,
} = require("../../../middlewares/validations/ngayan.validation");
const {
  offsetValidation,
} = require("../../../middlewares/validations/search.validation");

const adminNgayAnRoute = express.Router();

adminNgayAnRoute.get("/", adminGetAllNgayAn);
adminNgayAnRoute.delete("/:id", offsetValidation, idNgayAnValidation, adminDeleteNgayAn);
adminNgayAnRoute.get("/get/offset", offsetValidation, adminOffset);

module.exports = adminNgayAnRoute;
