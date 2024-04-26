const express = require("express");
const { customerGetAllBuaAn } = require("./customer.buaan.controller");
const customerBuaAnRoute = express.Router();

customerBuaAnRoute.get("/", customerGetAllBuaAn);
module.exports = customerBuaAnRoute;
