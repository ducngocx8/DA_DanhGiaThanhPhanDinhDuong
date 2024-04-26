const express = require("express");
const {
  adminGetAllThongBao,
  adminDeleteThongBao,
  adminOffset,
  adminCreateThongBao,
} = require("./admin.thongbao.controller");
const {
  userIDValidation,
  ThongBaoAdminValidation,
} = require("../../../middlewares/validations/thongbao.validation");
const { offsetValidation } = require("../../../middlewares/validations/search.validation");

const adminThongBaoRoute = express.Router();

adminThongBaoRoute.get("/", adminGetAllThongBao);
adminThongBaoRoute.delete("/:id", userIDValidation, adminDeleteThongBao);
adminThongBaoRoute.get("/get/offset", offsetValidation, adminOffset);
adminThongBaoRoute.post("/", ThongBaoAdminValidation, adminCreateThongBao);

module.exports = adminThongBaoRoute;
