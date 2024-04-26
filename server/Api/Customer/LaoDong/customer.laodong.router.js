const express = require("express");
const { customerGetAllLaoDong } = require("./customer.laodong.controller");

const customerLaoDongRoute = express.Router();

customerLaoDongRoute.get("/", customerGetAllLaoDong);
module.exports = customerLaoDongRoute;
