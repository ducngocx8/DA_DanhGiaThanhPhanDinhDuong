const express = require("express");
const {
  adminGetAllChiTietMon,
  adminDeleteChiTietMon,
  adminAddChiTietMon,
  adminUpdateChiTietMon,
  adminGetChiTietMonByIDMon,
} = require("./admin.chitietmon.controller");
const {
  chiTietMonValidation,
  idChiTietMonValidation,
} = require("../../../middlewares/validations/chitietmon.validation");

const adminChiTietMonRoute = express.Router();

adminChiTietMonRoute.get("/", adminGetAllChiTietMon);
adminChiTietMonRoute.get("/:id", adminGetChiTietMonByIDMon);
adminChiTietMonRoute.post("/", chiTietMonValidation, adminAddChiTietMon);
adminChiTietMonRoute.delete(
  "/:id",
  idChiTietMonValidation,
  adminDeleteChiTietMon
);
adminChiTietMonRoute.put(
  "/:id",
  idChiTietMonValidation,
  chiTietMonValidation,
  adminUpdateChiTietMon
);

module.exports = adminChiTietMonRoute;
