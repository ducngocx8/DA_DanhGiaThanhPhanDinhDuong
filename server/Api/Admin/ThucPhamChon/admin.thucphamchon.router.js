const express = require("express");
const {
  adminGetAllThucPhamChon,
  adminDeleteThucPhamChon,
} = require("./admin.ThucPhamChon.controller");
const {
  idThucPhamChonValidation,
} = require("../../../middlewares/validations/thucphamchon.validation");

const adminThucPhamChonRoute = express.Router();

adminThucPhamChonRoute.get("/", adminGetAllThucPhamChon);
adminThucPhamChonRoute.delete("/:id", idThucPhamChonValidation, adminDeleteThucPhamChon);

module.exports = adminThucPhamChonRoute;
