const express = require("express");
const {
  customerGetAllChiSoUser,
  customerDeleteChiSoUser,
  customerAddChiSoUser,
  customerGetLastUpdateChiSoUser,
} = require("./customer.chisouser.controller");
const {
  chiSoUserOfUserValidation,
  idChiSoUserValidation,
} = require("../../../middlewares/validations/chisouser.validation");

const {
  verifyToken,
  checkUserToken,
} = require("../../../middlewares/validations/account.validation");

const { customerPermission } = require("../../../middlewares/permission");

const customerChiSoUserRoute = express.Router();

customerChiSoUserRoute.get(
  "/",
  verifyToken,
  checkUserToken,
  customerPermission,
  customerGetAllChiSoUser
);
customerChiSoUserRoute.get(
  "/get/last_update",
  verifyToken,
  checkUserToken,
  customerPermission,
  customerGetLastUpdateChiSoUser
);
customerChiSoUserRoute.post(
  "/",
  verifyToken,
  checkUserToken,
  customerPermission,
  chiSoUserOfUserValidation,
  customerAddChiSoUser
);
customerChiSoUserRoute.delete(
  "/:id",
  idChiSoUserValidation,
  verifyToken,
  checkUserToken,
  customerPermission,
  customerDeleteChiSoUser
);

module.exports = customerChiSoUserRoute;
