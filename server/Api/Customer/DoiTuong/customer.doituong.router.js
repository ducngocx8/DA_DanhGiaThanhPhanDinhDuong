const express = require("express");
const { customerGetAllDoiTuong } = require("./customer.doituong.controller");
const customerDoiTuongRoute = express.Router();

customerDoiTuongRoute.get("/", customerGetAllDoiTuong);
module.exports = customerDoiTuongRoute;
