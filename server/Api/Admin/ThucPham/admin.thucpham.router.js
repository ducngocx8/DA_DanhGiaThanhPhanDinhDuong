const express = require("express");
const {
  adminGetAllThucPham,
  adminAddThucPham,
  adminUpdateThucPham,
  adminUpdateImage,
  adminGetByFilterThucPham,
  adminOffset,
} = require("./admin.thucpham.controller");
const {
  thucPhamValidationAdd,
  thucPhamValidationUpdate,
  idThucPhamValidation,
  imageThucPhamValidation,
} = require("../../../middlewares/validations/thucpham.validation");
const {
  filterThucPhamValidation,
  offsetFilterValidation,
} = require("../../../middlewares/validations/search.validation");

const adminThucPhamRoute = express.Router();

adminThucPhamRoute.get("/", adminGetAllThucPham);
adminThucPhamRoute.get(
  "/filter/status",
  filterThucPhamValidation,
  adminGetByFilterThucPham
);
adminThucPhamRoute.post(
  "/",
  offsetFilterValidation,
  thucPhamValidationAdd,
  imageThucPhamValidation,
  adminAddThucPham
);
adminThucPhamRoute.put(
  "/:id",
  offsetFilterValidation,
  idThucPhamValidation,
  thucPhamValidationUpdate,
  adminUpdateThucPham
);

adminThucPhamRoute.put(
  "/upload/:id",
  offsetFilterValidation,
  idThucPhamValidation,
  imageThucPhamValidation,
  adminUpdateImage
);

adminThucPhamRoute.get("/get/offset", offsetFilterValidation, adminOffset);

module.exports = adminThucPhamRoute;
