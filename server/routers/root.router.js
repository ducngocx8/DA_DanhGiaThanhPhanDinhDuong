const express = require("express");
const rootRouter = express.Router();
const acountRouter = require("../Api/Account/account.router");
const adminBuaAnRoute = require("../Api/Admin/BuaAn/admin.buaan.router");
const adminDoiTuongRoute = require("../Api/Admin/DoiTuong/admin.doituong.router");
const adminNhomTuoiRoute = require("../Api/Admin/NhomTuoi/admin.nhomtuoi.router");
const adminLaoDongRoute = require("../Api/Admin/LaoDong/admin.laodong.router");
const adminRoleRoute = require("../Api/Admin/Role/admin.role.router");
const adminNhomThucPhamRoute = require("../Api/Admin/NhomThucPham/admin.nhomthucpham.router");
const adminNhomMonAnRoute = require("../Api/Admin/NhomMonAn/admin.nhommonan.router");
const adminThanhPhanNhuCauRoute = require("../Api/Admin/ThanhPhanNhuCau/admin.thanhphannhucau.router");
const adminNhuCauHangNgayRoute = require("../Api/Admin/NhuCauHangNgay/admin.nhucauhangngay.router");
const adminOTPRoute = require("../Api/Admin/Otp/admin.otp.router");
const adminUserRoute = require("../Api/Admin/User/admin.user.router");
const adminChiSoUserRoute = require("../Api/Admin/ChiSoUser/admin.chisouser.router");
const adminThucPhamRoute = require("../Api/Admin/ThucPham/admin.thucpham.router");
const adminMonAnRoute = require("../Api/Admin/MonAn/admin.monan.router");
const adminChiTietMonRoute = require("../Api/Admin/ChiTietMon/admin.chitietmon.router");
const adminFavouriteRoute = require("../Api/Admin/Favourite/admin.favourite.router");
const adminThucPhamChonRoute = require("../Api/Admin/ThucPhamChon/admin.thucphamchon.router");
const customerThucPhamChonRoute = require("../Api/Customer/ThucPhamChon/customer.thucphamchon.router");
const adminNgayAnRoute = require("../Api/Admin/NgayAn/admin.ngayan.router");
const adminStatisticsRoute = require("../Api/Admin/Statistics/admin.statistics.router");
const adminChiSoDuongHuyetRoute = require("../Api/Admin/ChiSoDuongHuyet/admin.chisoduonghuyet.router");

const customerFavouriteRoute = require("../Api/Customer/Favourite/customer.favourite.router");
const customerNgayAnRoute = require("../Api/Customer/NgayAn/customer.ngayan.router");
const customerBuaAnRoute = require("../Api/Customer/BuaAn/customer.buaan.router");
const customerNhomMonAnRoute = require("../Api/Customer/NhomMonAn/customer.nhommonan.router");
const customerNhomThucPhamRoute = require("../Api/Customer/NhomThucPham/customer.nhomthucpham.router");
const customerMonAnRoute = require("../Api/Customer/MonAn/customer.monan.router");
const customerThucPhamRoute = require("../Api/Customer/ThucPham/customer.thucpham.router");
const customerChiSoUserRoute = require("../Api/Customer/ChiSoUser/customer.chisouser.router");
const customerDoiTuongRoute = require("../Api/Customer/DoiTuong/customer.doituong.router");
const customerLaoDongRoute = require("../Api/Customer/LaoDong/customer.laodong.router");
const checkRoute = require("../Api/Account/check.router");
const uploadRoute = require("../Api/Upload/upload.router");
const customerKhuyenNghiRoute = require("../Api/Customer/DeXuat/customer.khuyennghi.router");
const customerMucTieuRoute = require("../Api/Customer/MucTieu/customer.muctieu.router");
const headerColumnRoute = require("../Api/HeaderColumn/headercolumn.router");
const customerNhomTuoiRoute = require("../Api/Customer/NhomTuoi/customer.nhomtuoi.router");
const customerNhuCauDinhDuongRoute = require("../Api/Customer/NhuCauDinhDuong/customer.nhucaudinhduong.router");
const customerChiSoDuongHuyetRoute = require("../Api/Customer/ChiSoDuongHuyet/customer.chisoduonghuyet.router");
const customerChiTietMonRoute = require("../Api/Customer/ChiTietMon/customer.chitietmon.router");
const adminMucTieuRoute = require("../Api/Admin/MucTieu/admin.muctieu.router");
const customerThongKeRoute = require("../Api/Customer/ThongKe/customer.thongke.router");
const {
  verifyToken,
  checkUserToken,
} = require("../middlewares/validations/account.validation");
const { adminPermission } = require("../middlewares/permission");
const mailRouter = require("../Api/Mail/mail.router");
const adminCountRoute = require("../Api/Admin/Count/admin.count.router");
const adminOffsetRoute = require("../Api/Admin/Offset/admin.offset.router");
const adminDonViRoute = require("../Api/Admin/DonVi/admin.donvi.router");
const adminChuyenMucRoute = require("../Api/Admin/ChuyenMuc/admin.chuyenmuc.router");
const adminBaiVietRoute = require("../Api/Admin/BaiViet/admin.baiviet.router");
const customerBaiVietRoute = require("../Api/Customer/BaiViet/customer.baiviet.router");
const customerChuyenMucRoute = require("../Api/Customer/ChuyenMuc/customer.chuyenmuc.router");
const adminLichSuLogRoute = require("../Api/Admin/LichSuLog/admin.lichsulog.router");
const adminThongBaoRoute = require("../Api/Admin/ThongBao/admin.thongbao.router");
const customerThongBaoRoute = require("../Api/Customer/ThongBao/customer.thongbao.router");

// All Route
rootRouter.use("/api/account", acountRouter);
rootRouter.use("/api/bua-an", customerBuaAnRoute);
rootRouter.use("/api/nhom-mon-an", customerNhomMonAnRoute);
rootRouter.use("/api/nhom-thuc-pham", customerNhomThucPhamRoute);
rootRouter.use("/api/mon-an", customerMonAnRoute);
rootRouter.use("/api/thuc-pham", customerThucPhamRoute);
rootRouter.use("/api/doi-tuong", customerDoiTuongRoute);
rootRouter.use("/api/lao-dong", customerLaoDongRoute);
rootRouter.use("/api/nhom-tuoi", customerNhomTuoiRoute);
rootRouter.use("/api/check", checkRoute);
rootRouter.use("/api/header-column", headerColumnRoute);
rootRouter.use("/api/nhu-cau-dinh-duong", customerNhuCauDinhDuongRoute);
rootRouter.use("/api/chi-so-duong-huyet", customerChiSoDuongHuyetRoute);
rootRouter.use("/api/bai-viet", customerBaiVietRoute);
rootRouter.use("/api/chuyen-muc", customerChuyenMucRoute);

// Upload route
rootRouter.use("/api/upload", uploadRoute);

// Email route
rootRouter.use("/api/mail", mailRouter);

// Customer route
rootRouter.use("/api/favourite", customerFavouriteRoute);
rootRouter.use("/api/thuc-pham-chon", customerThucPhamChonRoute);
rootRouter.use("/api/ngay-an", customerNgayAnRoute);
rootRouter.use("/api/chi-so-user", customerChiSoUserRoute);
rootRouter.use("/api/khuyen-nghi", customerKhuyenNghiRoute);
rootRouter.use("/api/muc-tieu", customerMucTieuRoute);
rootRouter.use("/api/chi-tiet-mon", customerChiTietMonRoute);
rootRouter.use("/api/thong-ke", customerThongKeRoute);
rootRouter.use("/api/thong-bao", customerThongBaoRoute);

// Admin route
rootRouter.use(
  "/api/admin/bua-an",
  verifyToken,
  checkUserToken,
  adminPermission,
  adminBuaAnRoute
);
rootRouter.use(
  "/api/admin/doi-tuong",
  verifyToken,
  checkUserToken,
  adminPermission,
  adminDoiTuongRoute
);
rootRouter.use(
  "/api/admin/nhom-tuoi",
  verifyToken,
  checkUserToken,
  adminPermission,
  adminNhomTuoiRoute
);
rootRouter.use(
  "/api/admin/lao-dong",
  verifyToken,
  checkUserToken,
  adminPermission,
  adminLaoDongRoute
);
rootRouter.use(
  "/api/admin/role",
  verifyToken,
  checkUserToken,
  adminPermission,
  adminRoleRoute
);
rootRouter.use(
  "/api/admin/nhom-thuc-pham",
  verifyToken,
  checkUserToken,
  adminPermission,
  adminNhomThucPhamRoute
);
rootRouter.use(
  "/api/admin/nhom-mon-an",
  verifyToken,
  checkUserToken,
  adminPermission,
  adminNhomMonAnRoute
);
rootRouter.use(
  "/api/admin/thanh-phan-nhu-cau",
  verifyToken,
  checkUserToken,
  adminPermission,
  adminThanhPhanNhuCauRoute
);
rootRouter.use(
  "/api/admin/nhu-cau-hang-ngay",
  verifyToken,
  checkUserToken,
  adminPermission,
  adminNhuCauHangNgayRoute
);
rootRouter.use(
  "/api/admin/otp",
  verifyToken,
  checkUserToken,
  adminPermission,
  adminOTPRoute
);
rootRouter.use(
  "/api/admin/user",
  verifyToken,
  checkUserToken,
  adminPermission,
  adminUserRoute
);
rootRouter.use(
  "/api/admin/chi-so-user",
  verifyToken,
  checkUserToken,
  adminPermission,
  adminChiSoUserRoute
);
rootRouter.use(
  "/api/admin/thuc-pham",
  verifyToken,
  checkUserToken,
  adminPermission,
  adminThucPhamRoute
);
rootRouter.use(
  "/api/admin/mon-an",
  verifyToken,
  checkUserToken,
  adminPermission,
  adminMonAnRoute
);
rootRouter.use(
  "/api/admin/chi-tiet-mon",
  verifyToken,
  checkUserToken,
  adminPermission,
  adminChiTietMonRoute
);
rootRouter.use(
  "/api/admin/favourite",
  verifyToken,
  checkUserToken,
  adminPermission,
  adminFavouriteRoute
);
rootRouter.use(
  "/api/admin/thuc-pham-chon",
  verifyToken,
  checkUserToken,
  adminPermission,
  adminThucPhamChonRoute
);
rootRouter.use(
  "/api/admin/ngay-an",
  verifyToken,
  checkUserToken,
  adminPermission,
  adminNgayAnRoute
);
rootRouter.use(
  "/api/admin/statistics",
  verifyToken,
  checkUserToken,
  adminPermission,
  adminStatisticsRoute
);
rootRouter.use(
  "/api/admin/chi-so-duong-huyet",
  verifyToken,
  checkUserToken,
  adminPermission,
  adminChiSoDuongHuyetRoute
);
rootRouter.use(
  "/api/admin/muc-tieu",
  verifyToken,
  checkUserToken,
  adminPermission,
  adminMucTieuRoute
);

rootRouter.use(
  "/api/admin/don-vi",
  verifyToken,
  checkUserToken,
  adminPermission,
  adminDonViRoute
);

rootRouter.use(
  "/api/admin/chuyen-muc",
  verifyToken,
  checkUserToken,
  adminPermission,
  adminChuyenMucRoute
);
rootRouter.use(
  "/api/admin/bai-viet",
  verifyToken,
  checkUserToken,
  adminPermission,
  adminBaiVietRoute
);

rootRouter.use(
  "/api/admin/count",
  verifyToken,
  checkUserToken,
  adminPermission,
  adminCountRoute
);

rootRouter.use(
  "/api/admin/offset",
  verifyToken,
  checkUserToken,
  adminPermission,
  adminOffsetRoute
);

rootRouter.use(
  "/api/admin/lich-su-log",
  verifyToken,
  checkUserToken,
  adminPermission,
  adminLichSuLogRoute
);

rootRouter.use(
  "/api/admin/thong-bao",
  verifyToken,
  checkUserToken,
  adminPermission,
  adminThongBaoRoute
);
module.exports = rootRouter;
