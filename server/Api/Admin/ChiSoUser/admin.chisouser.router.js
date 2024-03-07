const express = require("express");
const {
  adminGetAllChiSoUser,
  adminDeleteChiSoUser,
  adminOffset,
} = require("./admin.chisouser.controller");
const {
  idChiSoUserValidation,
} = require("../../../middlewares/validations/chisouser.validation");
const {
  offsetValidation,
} = require("../../../middlewares/validations/search.validation");

const adminChiSoUserRoute = express.Router();

adminChiSoUserRoute.get("/", adminGetAllChiSoUser);
adminChiSoUserRoute.delete(
  "/:id",
  offsetValidation,
  idChiSoUserValidation,
  adminDeleteChiSoUser
);
adminChiSoUserRoute.get("/get/offset", offsetValidation, adminOffset);

module.exports = adminChiSoUserRoute;
