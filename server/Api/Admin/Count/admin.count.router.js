const express = require("express");
const {
  adminCountNhomThucPham,
  adminCountDonVi,
  adminCountChuyenMuc,
  adminCountBaiViet,
  adminCountBuaAn,
  adminCountNhomMonAn,
  adminCountLaoDong,
  adminCountNhomTuoi,
  adminCountTPNhuCau,
  adminCountDoiTuong,
  adminCountOTP,
  adminCountRole,
  adminCountMucTieu,
  adminCountChiSoUser,
  adminCountNhuCauHangNgay,
  adminCountChiSoDuongHuyet,
  adminCountNgayAn,
  adminCountUser,
  adminCountMonAn,
  adminCountLichSuLog,
  adminCountThanhPhanNhuCau,
  adminCountThucPham,
  adminCountThongBao,
} = require("./admin.count.controller");
const {
  searchKeywordValidation,
  searchKeywordFilterValidation,
} = require("../../../middlewares/validations/search.validation");

const adminCountRoute = express.Router();

adminCountRoute.get(
  "/nhom-thuc-pham",
  searchKeywordValidation,
  adminCountNhomThucPham
);
adminCountRoute.get("/don-vi", searchKeywordValidation, adminCountDonVi);
adminCountRoute.get(
  "/chuyen-muc",
  searchKeywordValidation,
  adminCountChuyenMuc
);
adminCountRoute.get(
  "/bai-viet",
  searchKeywordFilterValidation,
  adminCountBaiViet
);
adminCountRoute.get("/bua-an", searchKeywordValidation, adminCountBuaAn);
adminCountRoute.get(
  "/nhom-mon-an",
  searchKeywordValidation,
  adminCountNhomMonAn
);
adminCountRoute.get("/lao-dong", searchKeywordValidation, adminCountLaoDong);
adminCountRoute.get("/nhom-tuoi", searchKeywordValidation, adminCountNhomTuoi);
adminCountRoute.get(
  "/thanh-phan-nhu-cau",
  searchKeywordValidation,
  adminCountTPNhuCau
);
adminCountRoute.get("/doi-tuong", searchKeywordValidation, adminCountDoiTuong);
adminCountRoute.get("/otp", searchKeywordValidation, adminCountOTP);
adminCountRoute.get("/role", searchKeywordValidation, adminCountRole);
adminCountRoute.get("/muc-tieu", searchKeywordValidation, adminCountMucTieu);
adminCountRoute.get(
  "/chi-so-user",
  searchKeywordValidation,
  adminCountChiSoUser
);
adminCountRoute.get(
  "/nhu-cau-hang-ngay",
  searchKeywordValidation,
  adminCountNhuCauHangNgay
);
adminCountRoute.get(
  "/chi-so-duong-huyet",
  searchKeywordValidation,
  adminCountChiSoDuongHuyet
);
adminCountRoute.get("/ngay-an", searchKeywordValidation, adminCountNgayAn);
adminCountRoute.get("/user", searchKeywordFilterValidation, adminCountUser);
adminCountRoute.get("/mon-an", searchKeywordFilterValidation, adminCountMonAn);
adminCountRoute.get("/thuc-pham", searchKeywordFilterValidation, adminCountThucPham);
adminCountRoute.get(
  "/lich-su-log",
  searchKeywordValidation,
  adminCountLichSuLog
);
adminCountRoute.get(
  "/thanh-phan-nhu-cau",
  searchKeywordValidation,
  adminCountThanhPhanNhuCau
);
adminCountRoute.get(
  "/thong-bao",
  searchKeywordValidation,
  adminCountThongBao
);

module.exports = adminCountRoute;
