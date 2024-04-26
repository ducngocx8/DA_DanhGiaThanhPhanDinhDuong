const express = require("express");
const {
  adminGetAllBaiViet,
  adminDeleteBaiViet,
  adminAddBaiViet,
  adminUpdateBaiViet,
  adminUpdateImage,
  adminOffset,
} = require("./admin.baiviet.controller");
const {
  idBaiVietValidation,
  imageBaiVietValidation,
  baiVietValidation,
} = require("../../../middlewares/validations/baiviet.validation");
const { offsetFilterValidation } = require("../../../middlewares/validations/search.validation");

const adminBaiVietRoute = express.Router();

adminBaiVietRoute.get("/", adminGetAllBaiViet);
adminBaiVietRoute.post(
  "/",
  offsetFilterValidation,
  baiVietValidation,
  imageBaiVietValidation,
  adminAddBaiViet
);
adminBaiVietRoute.delete(
  "/:id",
  offsetFilterValidation,
  idBaiVietValidation,
  adminDeleteBaiViet
);
adminBaiVietRoute.put(
  "/:id",
  offsetFilterValidation,
  idBaiVietValidation,
  baiVietValidation,
  adminUpdateBaiViet
);

adminBaiVietRoute.put(
  "/upload/:id",
  offsetFilterValidation,
  idBaiVietValidation,
  imageBaiVietValidation,
  adminUpdateImage
);


adminBaiVietRoute.get(
  "/get/offset",
  offsetFilterValidation,
  adminOffset
);

module.exports = adminBaiVietRoute;
