const express = require("express");
const {
  customerGetAllThucPhamChon,
  customerAddThucPhamChon,
  customerDeleteThucPhamChon,
  customerUpdateThucPhamChon,
} = require("./customer.thucphamchon.controller");
const {
  thucPhamChonUserValidation,
  idThucPhamChonValidation,
} = require("../../../middlewares/validations/thucphamchon.validation");

const {
  verifyToken,
  checkUserToken,
} = require("../../../middlewares/validations/account.validation");
const { customerPermission } = require("../../../middlewares/permission");

const customerThucPhamChonRoute = express.Router();

customerThucPhamChonRoute.get(
  "/",
  verifyToken,
  checkUserToken,
  customerPermission,
  customerGetAllThucPhamChon
);
customerThucPhamChonRoute.post(
  "/",
  verifyToken,
  checkUserToken,
  customerPermission,
  thucPhamChonUserValidation,
  customerAddThucPhamChon
);

customerThucPhamChonRoute.put(
  "/:id",
  verifyToken,
  checkUserToken,
  customerPermission,
  thucPhamChonUserValidation,
  customerUpdateThucPhamChon
);

customerThucPhamChonRoute.delete(
  "/:id",
  verifyToken,
  checkUserToken,
  customerPermission,
  idThucPhamChonValidation,
  customerDeleteThucPhamChon
);

module.exports = customerThucPhamChonRoute;
