const express = require("express");
const {
  adminGetAllMonAn,
  adminDeleteMonAn,
  adminAddMonAn,
  adminUpdateMonAn,
  adminGetMonAnByIDMonAn,
  adminUpdateImage,
  adminGetByFilterMonAn,
  adminOffset,
} = require("./admin.monan.controller");
const {
  monAnAdminValidation,
  idMonAnValidation,
  imageMonAnValidation,
} = require("../../../middlewares/validations/monan.validation");
const {
  filterMonAnValidation,
  offsetFilterValidation,
} = require("../../../middlewares/validations/search.validation");

const adminMonAnRoute = express.Router();

adminMonAnRoute.get("/", adminGetAllMonAn);
adminMonAnRoute.get(
  "/filter/status",
  filterMonAnValidation,
  adminGetByFilterMonAn
);
adminMonAnRoute.get("/:id", adminGetMonAnByIDMonAn);
adminMonAnRoute.post(
  "/",
  offsetFilterValidation,
  monAnAdminValidation,
  imageMonAnValidation,
  adminAddMonAn
);
adminMonAnRoute.delete(
  "/:id",
  offsetFilterValidation,
  idMonAnValidation,
  adminDeleteMonAn
);
adminMonAnRoute.put(
  "/:id",
  offsetFilterValidation,
  idMonAnValidation,
  monAnAdminValidation,
  adminUpdateMonAn
);

adminMonAnRoute.put(
  "/upload/:id",
  offsetFilterValidation,
  idMonAnValidation,
  imageMonAnValidation,
  adminUpdateImage
);

adminMonAnRoute.get("/get/offset", offsetFilterValidation, adminOffset);

module.exports = adminMonAnRoute;
