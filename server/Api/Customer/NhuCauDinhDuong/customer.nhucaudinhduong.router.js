const express = require("express");
const { customerTraCuuTheoDoiTuong } = require("./customer.nhucaudinhduong.controller");

const customerNhuCauDinhDuongRoute = express.Router();

customerNhuCauDinhDuongRoute.get("/doi-tuong", customerTraCuuTheoDoiTuong);
module.exports = customerNhuCauDinhDuongRoute;
