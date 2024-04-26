const express = require("express");
const {
  adminGetAllLichSuLog,
  adminDeleteLichSuLog,
  adminOffset,
} = require("./admin.lichsulog.controller");
const { idLichSuLogValidation } = require("../../../middlewares/validations/lichsulog.validation");
const { offsetValidation } = require("../../../middlewares/validations/search.validation");

const adminLichSuLogRoute = express.Router();

adminLichSuLogRoute.get("/", adminGetAllLichSuLog);
adminLichSuLogRoute.delete("/:id", idLichSuLogValidation, adminDeleteLichSuLog);
adminLichSuLogRoute.get("/get/offset", offsetValidation, adminOffset);

module.exports = adminLichSuLogRoute;
