const express = require("express");
const {
  adminGetAllRole,
  adminDeleteRole,
  adminAddRole,
  adminUpdateRole,
  adminOffset,
} = require("./admin.role.controller");
const {
  roleIDValidation,
  roleValidation,
} = require("../../../middlewares/validations/role.validation");
const {
  offsetValidation,
} = require("../../../middlewares/validations/search.validation");

const adminRoleRoute = express.Router();

adminRoleRoute.get("/", adminGetAllRole);
adminRoleRoute.post("/", offsetValidation, roleValidation, adminAddRole);
adminRoleRoute.delete(
  "/:id",
  offsetValidation,
  roleIDValidation,
  adminDeleteRole
);
adminRoleRoute.put(
  "/:id",
  offsetValidation,
  roleIDValidation,
  roleValidation,
  adminUpdateRole
);

adminRoleRoute.get("/get/offset", offsetValidation, adminOffset);

module.exports = adminRoleRoute;
