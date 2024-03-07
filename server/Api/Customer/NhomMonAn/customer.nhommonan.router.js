const express = require("express");
const {
  customerGetAllNhomMonAn,
  customerGetAllMonAnThuocNhomMonAn,
} = require("./customer.nhommonan.controller");
const {
  idNhomMonAnValidation,
} = require("../../../middlewares/validations/nhommonan.validation");

const customerNhomMonAnRoute = express.Router();

customerNhomMonAnRoute.get("/", customerGetAllNhomMonAn);
customerNhomMonAnRoute.get(
  "/:id",
  idNhomMonAnValidation,
  customerGetAllMonAnThuocNhomMonAn
);
module.exports = customerNhomMonAnRoute;
