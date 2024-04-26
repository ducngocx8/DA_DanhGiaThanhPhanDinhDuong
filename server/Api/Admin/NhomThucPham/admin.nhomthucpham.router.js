const express = require("express");
const {
  adminGetAllNhomThucPham,
  adminDeleteNhomThucPham,
  adminAddNhomThucPham,
  adminUpdateNhomThucPham,
  adminUpdateImage,
  adminOffset,
} = require("./admin.nhomthucpham.controller");
const {
  tenNhomThucPhamValidation,
  idNhomThucPhamValidation,
  imageNhomThucPhamValidation,
} = require("../../../middlewares/validations/nhomthucpham.validation");
const { offsetValidation } = require("../../../middlewares/validations/search.validation");

const adminNhomThucPhamRoute = express.Router();

adminNhomThucPhamRoute.get("/", adminGetAllNhomThucPham);
adminNhomThucPhamRoute.post(
  "/",
  offsetValidation,
  tenNhomThucPhamValidation,
  imageNhomThucPhamValidation,
  adminAddNhomThucPham
);
adminNhomThucPhamRoute.delete(
  "/:id",
  offsetValidation,
  idNhomThucPhamValidation,
  adminDeleteNhomThucPham
);
adminNhomThucPhamRoute.put(
  "/:id",
  offsetValidation,
  idNhomThucPhamValidation,
  tenNhomThucPhamValidation,
  adminUpdateNhomThucPham
);

adminNhomThucPhamRoute.put(
  "/upload/:id",
  offsetValidation,
  idNhomThucPhamValidation,
  imageNhomThucPhamValidation,
  adminUpdateImage
);


adminNhomThucPhamRoute.get(
  "/get/offset",
  offsetValidation,
  adminOffset
);

module.exports = adminNhomThucPhamRoute;
