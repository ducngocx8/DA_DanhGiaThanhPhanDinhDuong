const express = require("express");
const {
  getAllOTP,
  deleteAllOTP,
  adminOffset,
} = require("./admin.otp.controller");
const {
  offsetValidation,
} = require("../../../middlewares/validations/search.validation");
const adminOTPRoute = express.Router();

adminOTPRoute.get("/", getAllOTP);
adminOTPRoute.delete("/", offsetValidation, deleteAllOTP);
adminOTPRoute.get("/get/offset", offsetValidation, adminOffset);

module.exports = adminOTPRoute;
