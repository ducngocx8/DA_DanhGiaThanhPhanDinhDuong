const express = require("express");
const {
  adminGetAllLaoDong,
  adminDeleteLaoDong,
  adminAddLaoDong,
  adminUpdateLaoDong,
  adminOffset,
} = require("./admin.laodong.controller");
const {
  tenLaoDongValidation,
  idLaoDongValidation,
} = require("../../../middlewares/validations/laodong.validation");
const { offsetValidation } = require("../../../middlewares/validations/search.validation");

const adminLaoDongRoute = express.Router();

adminLaoDongRoute.get("/", adminGetAllLaoDong);
adminLaoDongRoute.post("/", offsetValidation, tenLaoDongValidation, adminAddLaoDong);
adminLaoDongRoute.delete(
  "/:id",
  offsetValidation,
  idLaoDongValidation,
  adminDeleteLaoDong
);
adminLaoDongRoute.put(
  "/:id",
  offsetValidation,
  idLaoDongValidation,
  tenLaoDongValidation,
  adminUpdateLaoDong
);

adminLaoDongRoute.get("/get/offset", offsetValidation, adminOffset);

module.exports = adminLaoDongRoute;
