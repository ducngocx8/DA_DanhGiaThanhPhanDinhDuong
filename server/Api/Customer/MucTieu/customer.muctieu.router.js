const express = require("express");
const {
  customerGetAllMucTieu,
  customerDeleteMucTieu,
  customerAddMucTieu,
  customerGetMucTieuHomNay,
  // customerUpdateMucTieu,
  customerGetMucTieuTheoNgay,
} = require("./customer.muctieu.controller");
const {
  MucTieuValidation,
  idMucTieuValidation,
} = require("../../../middlewares/validations/muctieu.validation.js");

const {
  verifyToken,
  checkUserToken,
} = require("../../../middlewares/validations/account.validation");

const { customerPermission } = require("../../../middlewares/permission");

const customerMucTieuRoute = express.Router();

customerMucTieuRoute.get(
  "/",
  verifyToken,
  checkUserToken,
  customerPermission,
  customerGetAllMucTieu
);
customerMucTieuRoute.get(
  "/get/hom-nay",
  verifyToken,
  checkUserToken,
  customerPermission,
  customerGetMucTieuHomNay
);
customerMucTieuRoute.get(
  "/get/theo-ngay",
  verifyToken,
  checkUserToken,
  customerPermission,
  customerGetMucTieuTheoNgay
);
customerMucTieuRoute.post(
  "/",
  verifyToken,
  checkUserToken,
  customerPermission,
  MucTieuValidation,
  customerAddMucTieu
);
customerMucTieuRoute.delete(
  "/:id",
  idMucTieuValidation,
  verifyToken,
  checkUserToken,
  customerPermission,
  customerDeleteMucTieu
);

// customerMucTieuRoute.put(
//   "/",
//   verifyToken,
//   checkUserToken,
//   allPermission,
//   MucTieuValidation,
//   customerUpdateMucTieu
// );

module.exports = customerMucTieuRoute;
