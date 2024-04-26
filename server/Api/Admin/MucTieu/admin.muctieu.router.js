const express = require("express");
const {
  adminGetAllMucTieu,
  adminDeleteMucTieu,
  adminOffset,
} = require("./admin.muctieu.controller");
const { idMucTieuValidation } = require("../../../middlewares/validations/muctieu.validation");
const { offsetValidation } = require("../../../middlewares/validations/search.validation");

const adminMucTieuRoute = express.Router();

adminMucTieuRoute.get("/", adminGetAllMucTieu);
adminMucTieuRoute.delete("/:id", idMucTieuValidation, adminDeleteMucTieu);
adminMucTieuRoute.get("/get/offset", offsetValidation, adminOffset);

module.exports = adminMucTieuRoute;
