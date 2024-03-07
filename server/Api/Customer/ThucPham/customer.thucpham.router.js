const express = require("express");
const {
  customerGetAllThucPham,
  customerGetChiTietThucPham,
  customerSearchThucPham,
  customerSearchTop10ThucPham,
  customerGetThucPhamGiauDuongChat,
  customerGetAllThucPhamByOffset,
  customerGetThucPhamGiauDuongChatOffset,
} = require("./customer.thucpham.controller");
const {
  idThucPhamValidation,
} = require("../../../middlewares/validations/thucpham.validation");
const {
  searchThucPhamValidation,
  searchTop10ThucPhamValidation,
  duongChatValidation,
  offsetMonAnValidation,
} = require("../../../middlewares/validations/search.validation");

const customerThucPhamRoute = express.Router();

customerThucPhamRoute.get("/", customerGetAllThucPham);
customerThucPhamRoute.get(
  "/search",
  searchThucPhamValidation,
  customerSearchThucPham
);
customerThucPhamRoute.get(
  "/search/top-ten",
  searchTop10ThucPhamValidation,
  customerSearchTop10ThucPham
);
customerThucPhamRoute.get(
  "/:id",
  idThucPhamValidation,
  customerGetChiTietThucPham
);

customerThucPhamRoute.get(
  "/tra-cuu/duong-chat",
  duongChatValidation,
  customerGetThucPhamGiauDuongChat
);

customerThucPhamRoute.get(
  "/tra-cuu/duong-chat/offset",
  offsetMonAnValidation,
  customerGetThucPhamGiauDuongChatOffset
);

customerThucPhamRoute.get(
  // offset=1&limit&id_nhommonan=2
  "/by/offset",
  offsetMonAnValidation,
  customerGetAllThucPhamByOffset
);

module.exports = customerThucPhamRoute;
