const express = require("express");
const {
  adminGetAllDonVi,
  adminDeleteDonVi,
  adminAddDonVi,
  adminUpdateDonVi,
  adminOffset,
} = require("./admin.donvi.controller");
const {
  tenDonViValidation,
  idDonViValidation,
} = require("../../../middlewares/validations/donvi.validation");
const { offsetValidation } = require("../../../middlewares/validations/search.validation");

const adminDonViRoute = express.Router();

adminDonViRoute.get("/", adminGetAllDonVi);
adminDonViRoute.post(
  "/",
  offsetValidation,
  tenDonViValidation,
  adminAddDonVi
);
adminDonViRoute.delete(
  "/:id",
  offsetValidation,
  idDonViValidation,
  adminDeleteDonVi
);
adminDonViRoute.put(
  "/:id",
  offsetValidation,
  idDonViValidation,
  tenDonViValidation,
  adminUpdateDonVi
);

adminDonViRoute.get(
  "/get/offset",
  offsetValidation,
  adminOffset
);

module.exports = adminDonViRoute;
