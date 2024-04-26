const express = require("express");
const {
  customerGetAllMonAn,
  customerGetChiTietMonAn,
  customerSearchMonAn,
  customerGetMonAnOfUser,
  customerAddMonAn,
  customerDeleteMonAn,
  customerUpdateMonAn,
  customerUpdateImage,
  customerGetMonAnGiauDuongChat,
  customerGetAllMonAnByOffset,
  customerGetMonAnGiauDuongChatOffset,
  customerGetMonAnCungChuyenMuc,
  customerGetMonAnDungNhieu,
  customerRandomMonAn,
} = require("./customer.monan.controller");
const {
  idMonAnValidation,
  monAnValidation,
  imageMonAnValidation,
} = require("../../../middlewares/validations/monan.validation");
const {
  searchMonAnValidation,
  duongChatValidation,
  offsetMonAnValidation,
  checkMonAnAndNhomMonAnParamValidation,
  offsetRandomMonAnValidation,
} = require("../../../middlewares/validations/search.validation");
const {
  verifyToken,
  checkUserToken,
  checkUserIDCookie,
} = require("../../../middlewares/validations/account.validation");
const {
  allPermission,
  customerPermission,
} = require("../../../middlewares/permission");

const customerMonAnRoute = express.Router();

customerMonAnRoute.get("/", checkUserIDCookie, customerGetAllMonAn);
customerMonAnRoute.get(
  "/search",
  checkUserIDCookie,
  searchMonAnValidation,
  customerSearchMonAn
);
customerMonAnRoute.get(
  "/:id",
  checkUserIDCookie,
  idMonAnValidation,
  customerGetChiTietMonAn
);
customerMonAnRoute.get(
  "/by/user",
  verifyToken,
  checkUserToken,
  customerPermission,
  customerGetMonAnOfUser
);

customerMonAnRoute.post(
  "/by/user",
  verifyToken,
  checkUserToken,
  customerPermission,
  monAnValidation,
  imageMonAnValidation,
  customerAddMonAn
);

customerMonAnRoute.delete(
  "/by/user/:id",
  verifyToken,
  checkUserToken,
  customerPermission,
  idMonAnValidation,
  customerDeleteMonAn
);
customerMonAnRoute.put(
  "/by/user/:id",
  verifyToken,
  checkUserToken,
  customerPermission,
  idMonAnValidation,
  monAnValidation,
  customerUpdateMonAn
);

customerMonAnRoute.put(
  "/upload/:id",
  verifyToken,
  checkUserToken,
  customerPermission,
  idMonAnValidation,
  imageMonAnValidation,
  customerUpdateImage
);

customerMonAnRoute.get(
  "/tra-cuu/duong-chat",
  checkUserIDCookie,
  duongChatValidation,
  customerGetMonAnGiauDuongChat
);

customerMonAnRoute.get(
  "/tra-cuu/duong-chat/offset",
  checkUserIDCookie,
  offsetMonAnValidation,
  customerGetMonAnGiauDuongChatOffset
);

customerMonAnRoute.get(
  // offset=1&limit&id_nhommonan=2
  "/by/offset",
  checkUserIDCookie,
  offsetMonAnValidation,
  customerGetAllMonAnByOffset
);

customerMonAnRoute.get(
  "/same/cung-chuyen-muc",
  checkUserIDCookie,
  checkMonAnAndNhomMonAnParamValidation,
  customerGetMonAnCungChuyenMuc
);

customerMonAnRoute.get(
  "/get/dung-nhieu",
  checkUserIDCookie,
  customerGetMonAnDungNhieu
);

customerMonAnRoute.get(
  "/get/random",
  offsetRandomMonAnValidation,
  checkUserIDCookie,
  customerRandomMonAn
);

module.exports = customerMonAnRoute;
