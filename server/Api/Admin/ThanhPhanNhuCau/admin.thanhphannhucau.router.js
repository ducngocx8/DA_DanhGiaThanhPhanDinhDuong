const express = require("express");
const {
  adminGetAllThanhPhanNhuCau,
  adminDeleteThanhPhanNhuCau,
  adminAddThanhPhanNhuCau,
  adminUpdateThanhPhanNhuCau,
  adminOffset,
} = require("./admin.thanhphannhucau.controller");
const {
  dienGiaiThanhPhanNhuCauValidation,
  idThanhPhanNhuCauValidation,
} = require("../../../middlewares/validations/thanhphannhucau.validation");
const {
  offsetValidation,
} = require("../../../middlewares/validations/search.validation");

const adminThanhPhanNhuCauRoute = express.Router();

adminThanhPhanNhuCauRoute.get("/", adminGetAllThanhPhanNhuCau);
adminThanhPhanNhuCauRoute.post(
  "/",
  offsetValidation,
  dienGiaiThanhPhanNhuCauValidation,
  adminAddThanhPhanNhuCau
);
adminThanhPhanNhuCauRoute.delete(
  "/:id",
  offsetValidation,
  idThanhPhanNhuCauValidation,
  adminDeleteThanhPhanNhuCau
);
adminThanhPhanNhuCauRoute.put(
  "/:id",
  offsetValidation,
  idThanhPhanNhuCauValidation,
  dienGiaiThanhPhanNhuCauValidation,
  adminUpdateThanhPhanNhuCau
);

adminThanhPhanNhuCauRoute.get("/get/offset", offsetValidation, adminOffset);

module.exports = adminThanhPhanNhuCauRoute;
