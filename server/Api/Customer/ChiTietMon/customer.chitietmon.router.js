const express = require("express");
const {
  customerDeleteChiTietMon,
  customerAddChiTietMon,
  customerUpdateChiTietMon,
  customerGetChiTietMonByIDMon,
} = require("./customer.chitietmon.controller");
const {
  chiTietMonValidation,
  idChiTietMonValidation,
} = require("../../../middlewares/validations/chitietmon.validation");
const {
  idMonAnValidation,
} = require("../../../middlewares/validations/monan.validation");
const {
  verifyToken,
  checkUserToken,
} = require("../../../middlewares/validations/account.validation");
const { customerPermission } = require("../../../middlewares/permission");

const customerChiTietMonRoute = express.Router();

customerChiTietMonRoute.get(
  "/:id",
  verifyToken,
  checkUserToken,
  customerPermission,
  idMonAnValidation,
  customerGetChiTietMonByIDMon
);
customerChiTietMonRoute.post(
  "/",
  verifyToken,
  checkUserToken,
  customerPermission,
  chiTietMonValidation,
  customerAddChiTietMon
);
customerChiTietMonRoute.delete(
  "/:id",
  verifyToken,
  checkUserToken,
  customerPermission,
  idChiTietMonValidation,
  customerDeleteChiTietMon
);
customerChiTietMonRoute.put(
  "/:id",
  verifyToken,
  checkUserToken,
  customerPermission,
  idChiTietMonValidation,
  chiTietMonValidation,
  customerUpdateChiTietMon
);

module.exports = customerChiTietMonRoute;
