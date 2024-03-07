const express = require("express");
const {
  customerGetAllNhomThucPham,
  customerGetAllMonAnThuocNhomThucPham,
} = require("./customer.nhomthucpham.controller");
const {
  idNhomThucPhamValidation,
} = require("../../../middlewares/validations/nhomthucpham.validation");

const customerNhomThucPhamRoute = express.Router();

customerNhomThucPhamRoute.get("/", customerGetAllNhomThucPham);
customerNhomThucPhamRoute.get(
  "/:id",
  idNhomThucPhamValidation,
  customerGetAllMonAnThuocNhomThucPham
);


module.exports = customerNhomThucPhamRoute;
