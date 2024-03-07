const express = require("express");
const {
  customerGetAllNgayAn,
  customerAddNgayAn,
  customerDeleteNgayAn,
  customerUpdateNgayAn,
  customerCopyNgayAn,
  customerGoiYMonAn,
} = require("./customer.ngayan.controller");
const {
  ngayAnUserValidation,
  idNgayAnValidation,
  dayValidation,
  copyMonAnValidation,
} = require("../../../middlewares/validations/ngayan.validation");
const { customerPermission } = require("../../../middlewares/permission");
const {
  checkUserToken,
  verifyToken,
} = require("../../../middlewares/validations/account.validation");

const customerNgayAnRoute = express.Router();
customerNgayAnRoute.get(
  "/",
  verifyToken,
  checkUserToken,
  customerPermission,
  dayValidation,
  customerGetAllNgayAn
);
customerNgayAnRoute.post(
  "/",
  verifyToken,
  checkUserToken,
  customerPermission,
  ngayAnUserValidation,
  customerAddNgayAn
);
customerNgayAnRoute.put(
  "/:id",
  verifyToken,
  checkUserToken,
  customerPermission,
  ngayAnUserValidation,
  customerUpdateNgayAn
);
customerNgayAnRoute.delete(
  "/:id",
  verifyToken,
  checkUserToken,
  customerPermission,
  idNgayAnValidation,
  customerDeleteNgayAn
);

customerNgayAnRoute.post(
  "/copy",
  verifyToken,
  checkUserToken,
  customerPermission,
  copyMonAnValidation,
  customerCopyNgayAn
);

customerNgayAnRoute.get(
  "/goi-y",
  verifyToken,
  checkUserToken,
  customerPermission,
  customerGoiYMonAn
);

module.exports = customerNgayAnRoute;
