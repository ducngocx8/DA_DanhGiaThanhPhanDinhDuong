const express = require("express");
const {
  adminGetAllChiSoDuongHuyet,
  adminDeleteChiSoDuongHuyet,
  adminAddChiSoDuongHuyet,
  adminUpdateChiSoDuongHuyet,
  adminOffset,
} = require("./admin.chisoduonghuyet.controller");
const {
  addChiSoDuongHuyetValidation,
  updateChiSoDuongHuyetValidation,
  idThucPhamValidation,
} = require("../../../middlewares/validations/chisoduonghuyet.validation");
const {
  offsetValidation,
} = require("../../../middlewares/validations/search.validation");

const adminChiSoDuongHuyetRoute = express.Router();

adminChiSoDuongHuyetRoute.get("/", adminGetAllChiSoDuongHuyet);
adminChiSoDuongHuyetRoute.post(
  "/",
  offsetValidation,
  addChiSoDuongHuyetValidation,
  adminAddChiSoDuongHuyet
);
adminChiSoDuongHuyetRoute.delete(
  "/:id",
  offsetValidation,
  idThucPhamValidation,
  adminDeleteChiSoDuongHuyet
);
adminChiSoDuongHuyetRoute.put(
  "/:id",
  offsetValidation,
  idThucPhamValidation,
  updateChiSoDuongHuyetValidation,
  adminUpdateChiSoDuongHuyet
);

adminChiSoDuongHuyetRoute.get("/get/offset", offsetValidation, adminOffset);

module.exports = adminChiSoDuongHuyetRoute;
