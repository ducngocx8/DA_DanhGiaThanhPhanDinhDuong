const {
  adminCountNhomThucPhamService,
  adminCountDonViService,
  adminCountChuyenMucService,
  adminCountBaiVietService,
  adminCountNhomMonAnService,
  adminCountBuaAnService,
  adminCountLaoDongService,
  adminCountNhomTuoiService,
  adminCountTPNhuCauService,
  adminCountDoiTuongService,
  adminCountOTPService,
  adminCountRoleService,
  adminCountMucTieuService,
  adminCountChiSoUserService,
  adminCountNhuCauHangNgayService,
  adminCountChiSoDuongHuyetService,
  adminCountNgayAnService,
  adminCountUserService,
  adminCountMonAnService,
  adminCountLichSuLogService,
  adminCountThanhPhanNhuCauService,
  adminCountThucPhamService,
  adminCountThongBaoService,
} = require("./admin.count.service");

const adminCountNhomThucPham = async (req, res) => {
  const queryParam = req.query;
  const result = await adminCountNhomThucPhamService(queryParam);
  res.status(200).send(result);
};
const adminCountDonVi = async (req, res) => {
  const queryParam = req.query;
  const result = await adminCountDonViService(queryParam);
  res.status(200).send(result);
};
const adminCountChuyenMuc = async (req, res) => {
  const queryParam = req.query;
  const result = await adminCountChuyenMucService(queryParam);
  res.status(200).send(result);
};

const adminCountBaiViet = async (req, res) => {
  const queryParam = req.query;
  const result = await adminCountBaiVietService(queryParam);
  res.status(200).send(result);
};

const adminCountBuaAn = async (req, res) => {
  const queryParam = req.query;
  const result = await adminCountBuaAnService(queryParam);
  res.status(200).send(result);
};

const adminCountNhomMonAn = async (req, res) => {
  const queryParam = req.query;
  const result = await adminCountNhomMonAnService(queryParam);
  res.status(200).send(result);
};

const adminCountLaoDong = async (req, res) => {
  const queryParam = req.query;
  const result = await adminCountLaoDongService(queryParam);
  res.status(200).send(result);
};

const adminCountNhomTuoi = async (req, res) => {
  const queryParam = req.query;
  const result = await adminCountNhomTuoiService(queryParam);
  res.status(200).send(result);
};

const adminCountTPNhuCau = async (req, res) => {
  const queryParam = req.query;
  const result = await adminCountTPNhuCauService(queryParam);
  res.status(200).send(result);
};

const adminCountDoiTuong = async (req, res) => {
  const queryParam = req.query;
  const result = await adminCountDoiTuongService(queryParam);
  res.status(200).send(result);
};

const adminCountOTP = async (req, res) => {
  const queryParam = req.query;
  const result = await adminCountOTPService(queryParam);
  res.status(200).send(result);
};

const adminCountRole = async (req, res) => {
  const queryParam = req.query;
  const result = await adminCountRoleService(queryParam);
  res.status(200).send(result);
};

const adminCountMucTieu = async (req, res) => {
  const queryParam = req.query;
  const result = await adminCountMucTieuService(queryParam);
  res.status(200).send(result);
};

const adminCountChiSoUser = async (req, res) => {
  const queryParam = req.query;
  const result = await adminCountChiSoUserService(queryParam);
  res.status(200).send(result);
};

const adminCountNhuCauHangNgay = async (req, res) => {
  const queryParam = req.query;
  const result = await adminCountNhuCauHangNgayService(queryParam);
  res.status(200).send(result);
};

const adminCountChiSoDuongHuyet = async (req, res) => {
  const queryParam = req.query;
  const result = await adminCountChiSoDuongHuyetService(queryParam);
  res.status(200).send(result);
};

const adminCountNgayAn = async (req, res) => {
  const queryParam = req.query;
  const result = await adminCountNgayAnService(queryParam);
  res.status(200).send(result);
};

const adminCountUser = async (req, res) => {
  const queryParam = req.query;
  const result = await adminCountUserService(queryParam);
  res.status(200).send(result);
};

const adminCountMonAn = async (req, res) => {
  const queryParam = req.query;
  const result = await adminCountMonAnService(queryParam);
  res.status(200).send(result);
};

const adminCountThucPham = async (req, res) => {
  const queryParam = req.query;
  const result = await adminCountThucPhamService(queryParam);
  res.status(200).send(result);
};

const adminCountLichSuLog = async (req, res) => {
  const queryParam = req.query;
  const result = await adminCountLichSuLogService(queryParam);
  res.status(200).send(result);
};

const adminCountThanhPhanNhuCau = async (req, res) => {
  const queryParam = req.query;
  const result = await adminCountThanhPhanNhuCauService(queryParam);
  res.status(200).send(result);
};

const adminCountThongBao = async (req, res) => {
  const queryParam = req.query;
  const result = await adminCountThongBaoService(queryParam);
  res.status(200).send(result);
};

module.exports = {
  adminCountNhomThucPham,
  adminCountThucPham,
  adminCountDonVi,
  adminCountChuyenMuc,
  adminCountBaiViet,
  adminCountNhomMonAn,
  adminCountBuaAn,
  adminCountTPNhuCau,
  adminCountNhomTuoi,
  adminCountLaoDong,
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
  adminCountThanhPhanNhuCau,
  adminCountLichSuLog,
  adminCountThongBao,
};
