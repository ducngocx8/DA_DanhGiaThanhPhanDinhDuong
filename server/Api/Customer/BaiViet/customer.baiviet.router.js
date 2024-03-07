const express = require("express");
const {
  customerGetAllBaiViet,
  customerOffset,
  customerCount,
  customerGetChiTiet,
  customerGetCungChuyenMuc,
  customerGetBaiVietChuyenMuc,
  customerGetBaiVietTacGia,
} = require("./customer.baiviet.controller");
const {
  offsetUserValidation,
} = require("../../../middlewares/validations/search.validation");
const {
  slugBaiVietValidation,
  offsetCungChuyenMucValidation,
} = require("../../../middlewares/validations/baiviet.validation");
const {
  idChuyenMucValidation,
} = require("../../../middlewares/validations/chuyenmuc.validation");
const {
  userIDValidation,
} = require("../../../middlewares/validations/user.validation");

const customerBaiVietRoute = express.Router();

customerBaiVietRoute.get("/", customerGetAllBaiViet);
customerBaiVietRoute.get("/get/offset", offsetUserValidation, customerOffset);
customerBaiVietRoute.get("/get/count", offsetUserValidation, customerCount);
customerBaiVietRoute.get("/:id", slugBaiVietValidation, customerGetChiTiet);

customerBaiVietRoute.get(
  "/get/cung-chuyen-muc",
  offsetCungChuyenMucValidation,
  customerGetCungChuyenMuc
);

customerBaiVietRoute.get(
  "/get/bai-viet-chuyen-muc/:id",
  idChuyenMucValidation,
  customerGetBaiVietChuyenMuc
);

customerBaiVietRoute.get(
  "/get/bai-viet-tac-gia/:id",
  userIDValidation,
  customerGetBaiVietTacGia
);

module.exports = customerBaiVietRoute;
