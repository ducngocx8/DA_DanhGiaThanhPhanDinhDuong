const express = require("express");
const {
  adminGetAllUser,
  adminAddUser,
  adminUpdateUser,
  adminUpdateImage,
  adminOffset,
} = require("./admin.user.controller");
const {
  userValidation,
  userIDValidation,
  imageUserValidation,
} = require("../../../middlewares/validations/user.validation");
const {
  offsetFilterValidation,
} = require("../../../middlewares/validations/search.validation");

const adminUserRoute = express.Router();

adminUserRoute.get("/", adminGetAllUser);
adminUserRoute.post(
  "/",
  offsetFilterValidation,
  imageUserValidation,
  userValidation,
  adminAddUser
);
adminUserRoute.put(
  "/:id",
  offsetFilterValidation,
  userIDValidation,
  userValidation,
  adminUpdateUser
);

adminUserRoute.put(
  "/upload/:id",
  offsetFilterValidation,
  userIDValidation,
  imageUserValidation,
  adminUpdateImage
);

adminUserRoute.get("/get/offset", offsetFilterValidation, adminOffset);

module.exports = adminUserRoute;
