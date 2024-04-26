const express = require("express");
const { customerGetAllChuyenMuc } = require("./customer.chuyenmuc.controller");

const customerChuyenMucRoute = express.Router();

customerChuyenMucRoute.get("/", customerGetAllChuyenMuc);

module.exports = customerChuyenMucRoute;
