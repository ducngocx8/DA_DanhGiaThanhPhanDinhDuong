const express = require("express");
const { customerGetAllNhomTuoi } = require("./customer.nhomtuoi.controller");
const customerNhomTuoiRoute = express.Router();

customerNhomTuoiRoute.get("/", customerGetAllNhomTuoi);
module.exports = customerNhomTuoiRoute;
