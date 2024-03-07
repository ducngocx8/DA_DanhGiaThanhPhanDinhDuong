const express = require("express");
const {
  customerGetAllChiSoDuongHuyet,
  customerGetAllChiSoDuongHuyetOffset,
} = require("./customer.chisoduonghuyet.controller");
const { offsetMonAnValidation } = require("../../../middlewares/validations/search.validation");
const customerChiSoDuongHuyetRoute = express.Router();

customerChiSoDuongHuyetRoute.get("/", customerGetAllChiSoDuongHuyet);
customerChiSoDuongHuyetRoute.get(
  "/by/offset",
  offsetMonAnValidation,
  customerGetAllChiSoDuongHuyetOffset
);
module.exports = customerChiSoDuongHuyetRoute;
