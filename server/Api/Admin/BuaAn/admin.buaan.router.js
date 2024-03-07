const express = require("express");
const {
  offsetValidation,
} = require("../../../middlewares/validations/search.validation");
const {
  adminGetAllBuaAn,
  adminDeleteBuaAn,
  adminAddBuaAn,
  adminUpdateBuaAn,
  adminUpdateImage,
  adminOffset,
} = require("./admin.buaan.controller");
const {
  tenBuaAnValidation,
  idBuaAnValidation,
  imageBuaAnValidation,
} = require("../../../middlewares/validations/buaan.validation");

const adminBuaAnRoute = express.Router();

adminBuaAnRoute.get("/", adminGetAllBuaAn);
adminBuaAnRoute.post(
  "/",
  offsetValidation,
  tenBuaAnValidation,
  imageBuaAnValidation,
  adminAddBuaAn
);
adminBuaAnRoute.delete(
  "/:id",
  offsetValidation,
  idBuaAnValidation,
  adminDeleteBuaAn
);
adminBuaAnRoute.put(
  "/:id",
  offsetValidation,
  idBuaAnValidation,
  tenBuaAnValidation,
  adminUpdateBuaAn
);

adminBuaAnRoute.put(
  "/upload/:id",
  offsetValidation,
  idBuaAnValidation,
  imageBuaAnValidation,
  adminUpdateImage
);

adminBuaAnRoute.get("/get/offset", offsetValidation, adminOffset);

module.exports = adminBuaAnRoute;
