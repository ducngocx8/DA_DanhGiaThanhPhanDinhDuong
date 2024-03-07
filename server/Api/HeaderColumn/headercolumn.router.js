const express = require("express");
const { getAllHeaderColumn } = require("./headercolumn.controller");
const headerColumnRoute = express.Router();

headerColumnRoute.get("/", getAllHeaderColumn);
module.exports = headerColumnRoute;
