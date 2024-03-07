const { Sequelize } = require("Sequelize");
const {
  DATABASE,
  USERNAME,
  PASSWORD,
  HOST,
  DIALECT,
} = require("../configs/database.config");

const { createBuaAnModel } = require("./buaan.model");
const { createChiTietMonModel } = require("./chitietmon.model");
const { createFavouriteModel } = require("./favourite.model");
const { createMonAnModel } = require("./monan.mode");
const { createNgayAnModel } = require("./ngayan.model");
const { createNhomMonAnModel } = require("./nhommonan.model");
const { createNhomThucPhamModel } = require("./nhomthucpham.model");
const { createThucPhamModel } = require("./thucpham.model");
const { createThucPhamChonModel } = require("./thucphamchon.model");
const { createUserModel } = require("./user.model");
const { createOTPModel } = require("./otp.model");
const { createRoleModel } = require("./role.model");
const { createLaoDongModel } = require("./laodong.model");
const { createDoiTuongModel } = require("./doituong.model");
const { createNhomTuoiModel } = require("./nhomtuoi.model");
const { createThanhPhanNhuCauModel } = require("./thanhphannhucau.model");
const { createNhuCauHangNgayModel } = require("./nhucauhangngay.model");
const { createChiSoUserModel } = require("./chisouser.model");
const { createMucTieuModel } = require("./muctieu.model");
const { createHeaderColumnModel } = require("./headercolumn.model");
const { createChiSoDuongHuyetModel } = require("./chisoduonghuyet.model");
const { createChuyenMucModel } = require("./chuyenmuc.model");
const { createBaiVietModel } = require("./baiviet.model");
const { createLichSuLogModel } = require("./lichsulog.model");
const { createDonViModel } = require("./donvi.model");
const { createThongBaoModel } = require("./thongbao.model");

const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: HOST,
  dialect: DIALECT,
  pool: {
    max: 20,
    min: 0,
    acquire: 60000,
    idle: 10000,
  },
});

const dropTable = async () => {
  await sequelize.drop();
};

// Tạo thành phần
const LaoDong = createLaoDongModel(sequelize);
const DoiTuong = createDoiTuongModel(sequelize);
const NhomTuoi = createNhomTuoiModel(sequelize);
const ThanhPhanNhuCau = createThanhPhanNhuCauModel(sequelize);
const NhuCauHangNgay = createNhuCauHangNgayModel(sequelize);

// Tạo User
const Role = createRoleModel(sequelize);
const User = createUserModel(sequelize);
const ChiSoUser = createChiSoUserModel(sequelize);
const MucTieu = createMucTieuModel(sequelize);
const ThongBao = createThongBaoModel(sequelize);

// Model OTP
const Otp = createOTPModel(sequelize);

// Tạo Bữa ăn
const NhomThucPham = createNhomThucPhamModel(sequelize);
const ThucPham = createThucPhamModel(sequelize);
const ThucPhamChon = createThucPhamChonModel(sequelize);
const NhomMonAn = createNhomMonAnModel(sequelize);
const MonAn = createMonAnModel(sequelize);
const ChiTietMon = createChiTietMonModel(sequelize);
const BuaAn = createBuaAnModel(sequelize);
const Favourite = createFavouriteModel(sequelize);
const NgayAn = createNgayAnModel(sequelize);

// Tạo Bài viết
const ChuyenMuc = createChuyenMucModel(sequelize);
const BaiViet = createBaiVietModel(sequelize);
const LichSuLog = createLichSuLogModel(sequelize);
const DonVi = createDonViModel(sequelize);

// Tạo HeaderColumn
const HeaderColumn = createHeaderColumnModel(sequelize);
// Chỉ Số Đường Huyết
const ChiSoDuongHuyet = createChiSoDuongHuyetModel(sequelize);

const modelSync = async () => {
  // ROLE - USER
  Role.hasMany(User, { foreignKey: "role_id" });
  User.belongsTo(Role, { foreignKey: "role_id" });

  // USER - ChiSoUser
  User.hasMany(ChiSoUser, { foreignKey: "user_id" });
  ChiSoUser.belongsTo(User, { foreignKey: "user_id" });
  // LAO DỘNG - ChiSoUser
  LaoDong.hasMany(ChiSoUser, { foreignKey: "id_laodong" });
  ChiSoUser.belongsTo(LaoDong, { foreignKey: "id_laodong" });
  // ĐỐI TƯỢNG - ChiSoUser
  DoiTuong.hasMany(ChiSoUser, { foreignKey: "id_doituong" });
  ChiSoUser.belongsTo(DoiTuong, { foreignKey: "id_doituong" });

  // USER - MUCTIEU
  User.hasMany(MucTieu, { foreignKey: "user_id" });
  MucTieu.belongsTo(User, { foreignKey: "user_id" });

  // THỰC PHẨM - Nhóm Thực Phẩm
  NhomThucPham.hasMany(ThucPham, { foreignKey: "id_nhomthucpham" });
  ThucPham.belongsTo(NhomThucPham, { foreignKey: "id_nhomthucpham" });

  // Món Ăn - Nhóm Món Ăn
  NhomMonAn.hasMany(MonAn, { foreignKey: "id_nhommonan" });
  MonAn.belongsTo(NhomMonAn, { foreignKey: "id_nhommonan" });

  // Món Ăn - User
  User.hasMany(MonAn, { foreignKey: "user_id" });
  MonAn.belongsTo(User, { foreignKey: "user_id" });

  // Chi Tiết Món Ăn - Món Ăn
  MonAn.hasMany(ChiTietMon, { foreignKey: "id_monan" });
  ChiTietMon.belongsTo(MonAn, { foreignKey: "id_monan" });

  // Chi Tiết Món Ăn - Thực Phẩm
  ThucPham.hasMany(ChiTietMon, { foreignKey: "id_thucpham" });
  ChiTietMon.belongsTo(ThucPham, { foreignKey: "id_thucpham" });

  // Ngày Ăn - User
  User.hasMany(NgayAn, { foreignKey: "user_id" });
  NgayAn.belongsTo(User, { foreignKey: "user_id" });

  // Ngày Ăn - Bữa
  BuaAn.hasMany(NgayAn, { foreignKey: "bua_an_id" });
  NgayAn.belongsTo(BuaAn, { foreignKey: "bua_an_id" });

  // Ngày Ăn - Món Ăn
  MonAn.hasMany(NgayAn, { foreignKey: "id_monan" });
  NgayAn.belongsTo(MonAn, { foreignKey: "id_monan" });

  // Favourite - Món Ăn
  MonAn.belongsToMany(User, { through: Favourite, foreignKey: "id_monan" });
  User.belongsToMany(MonAn, { through: Favourite, foreignKey: "user_id" });

  // Thực Phẩm Chọn - Thực Phẩm
  ThucPham.hasMany(ThucPhamChon, { foreignKey: "id_thucpham" });
  ThucPhamChon.belongsTo(ThucPham, { foreignKey: "id_thucpham" });

  // Thực Phẩm Chọn - User
  User.hasMany(ThucPhamChon, { foreignKey: "user_id" });
  ThucPhamChon.belongsTo(User, { foreignKey: "user_id" });

  // Lao Động - Nhu Cầu Hàng Ngày
  LaoDong.hasMany(NhuCauHangNgay, { foreignKey: "id_laodong" });
  NhuCauHangNgay.belongsTo(LaoDong, { foreignKey: "id_laodong" });
  // Đối Tượng - Nhu Cầu Hàng Ngày
  DoiTuong.hasMany(NhuCauHangNgay, { foreignKey: "id_doituong" });
  NhuCauHangNgay.belongsTo(DoiTuong, { foreignKey: "id_doituong" });
  // Thành Phần Nhu Cầu - Nhu Cầu Hàng Ngày
  ThanhPhanNhuCau.hasMany(NhuCauHangNgay, { foreignKey: "id_nhucau" });
  NhuCauHangNgay.belongsTo(ThanhPhanNhuCau, { foreignKey: "id_nhucau" });
  // Nhóm Tuổi - Nhu Cầu Hàng Ngày
  NhomTuoi.hasMany(NhuCauHangNgay, { foreignKey: "id_nhomtuoi" });
  NhuCauHangNgay.belongsTo(NhomTuoi, { foreignKey: "id_nhomtuoi" });

  // Món Ăn - Favourite
  MonAn.hasMany(Favourite, { foreignKey: "id_monan" });
  Favourite.belongsTo(MonAn, { foreignKey: "id_monan" });

  // Chuyên mục - Bài Viết - User
  ChuyenMuc.hasMany(BaiViet, { foreignKey: "id_chuyenmuc" });
  BaiViet.belongsTo(ChuyenMuc, { foreignKey: "id_chuyenmuc" });

  User.hasMany(BaiViet, { foreignKey: "user_id" });
  BaiViet.belongsTo(User, { foreignKey: "user_id" });

  // User - Lịch sử log
  User.hasMany(LichSuLog, { foreignKey: "user_id" });
  LichSuLog.belongsTo(User, { foreignKey: "user_id" });

  // User - Lịch sử log
  User.hasMany(ThongBao, { foreignKey: "user_id" });
  ThongBao.belongsTo(User, { foreignKey: "user_id" });

  // await ThongBao.sync({ alter: true })
  //   .then(() => {
  //     console.log("ThongBao table created successfully!");
  //   })
  //   .catch((error) => {
  //     console.error("Unable to create table ThongBao : ", error);
  //   });

  // await dropTable();

  // await LaoDong.sync({ force: true })
  //   .then(() => {
  //     console.log("LaoDong table created successfully!");
  //   })
  //   .catch((error) => {
  //     console.error("Unable to create table LaoDong : ", error);
  //   });

  // await NhomTuoi.sync({ force: true })
  //   .then(() => {
  //     console.log("NhomTuoi table created successfully!");
  //   })
  //   .catch((error) => {
  //     console.error("Unable to create table NhomTuoi : ", error);
  //   });

  // await DoiTuong.sync({ force: true })
  //   .then(() => {
  //     console.log("DoiTuong table created successfully!");
  //   })
  //   .catch((error) => {
  //     console.error("Unable to create table DoiTuong : ", error);
  //   });

  // await ThanhPhanNhuCau.sync({ force: true })
  //   .then(() => {
  //     console.log("ThanhPhanNhuCau table created successfully!");
  //   })
  //   .catch((error) => {
  //     console.error("Unable to create table ThanhPhanNhuCau : ", error);
  //   });

  // await NhuCauHangNgay.sync({ force: true })
  //   .then(() => {
  //     console.log("NhuCauHangNgay table created successfully!");
  //   })
  //   .catch((error) => {
  //     console.error("Unable to create table NhuCauHangNgay : ", error);
  //   });

  // await Role.sync({ force: true })
  //   .then(() => {
  //     console.log("Role table created successfully!");
  //   })
  //   .catch((error) => {
  //     console.error("Unable to create table Role : ", error);
  //   });

  // await User.sync({ force: true })
  //   .then(() => {
  //     console.log("User table created successfully!");
  //   })
  //   .catch((error) => {
  //     console.error("Unable to create table User : ", error);
  //   });

  // await ChiSoUser.sync({ force: true })
  //   .then(() => {
  //     console.log("ChiSoUser table created successfully!");
  //   })
  //   .catch((error) => {
  //     console.error("Unable to create table ChiSoUser : ", error);
  //   });

  // await MucTieu.sync({ alter: true })
  //   .then(() => {
  //     console.log("MucTieu table created successfully!");
  //   })
  //   .catch((error) => {
  //     console.error("Unable to create table MucTieu : ", error);
  //   });

  // await Otp.sync({ force: true })
  //   .then(() => {
  //     console.log("Otp table created successfully!");
  //   })
  //   .catch((error) => {
  //     console.error("Unable to create table Otp : ", error);
  //   });

  // await NhomThucPham.sync({ force: true })
  //   .then(() => {
  //     console.log("NhomThucPham table created successfully!");
  //   })
  //   .catch((error) => {
  //     console.error("Unable to create table NhomThucPham : ", error);
  //   });

  // await ThucPham.sync({ force: true })
  //   .then(() => {
  //     console.log("ThucPham table created successfully!");
  //   })
  //   .catch((error) => {
  //     console.error("Unable to create table ThucPham : ", error);
  //   });

  // await ThucPhamChon.sync({ force: true })
  //   .then(() => {
  //     console.log("ThucPhamChon table created successfully!");
  //   })
  //   .catch((error) => {
  //     console.error("Unable to create table ThucPhamChon : ", error);
  //   });

  // await DonVi.sync({ force: true })
  //   .then(() => {
  //     console.log("DonVi table created successfully!");
  //   })
  //   .catch((error) => {
  //     console.error("Unable to create table DonVi : ", error);
  //   });

  // await NhomMonAn.sync({ force: true })
  //   .then(() => {
  //     console.log("NhomMonAn table created successfully!");
  //   })
  //   .catch((error) => {
  //     console.error("Unable to create table NhomMonAn : ", error);
  //   });

  // await MonAn.sync({ force: true })
  //   .then(() => {
  //     console.log("MonAn table created successfully!");
  //   })
  //   .catch((error) => {
  //     console.error("Unable to create table MonAn : ", error);
  //   });

  // await ChiTietMon.sync({ force: true })
  //   .then(() => {
  //     console.log("ChiTietMon table created successfully!");
  //   })
  //   .catch((error) => {
  //     console.error("Unable to create table ChiTietMon : ", error);
  //   });

  // await BuaAn.sync({ force: true })
  //   .then(() => {
  //     console.log("BuaAn table created successfully!");
  //   })
  //   .catch((error) => {
  //     console.error("Unable to create table BuaAn : ", error);
  //   });

  // await NgayAn.sync({ alter: true })
  //   .then(() => {
  //     console.log("NgayAn table created successfully!");
  //   })
  //   .catch((error) => {
  //     console.error("Unable to create table BuaAn : ", error);
  //   });

  // await Favourite.sync({ force: true })
  //   .then(() => {
  //     console.log("Favourite table created successfully!");
  //   })
  //   .catch((error) => {
  //     console.error("Unable to create table Favourite : ", error);
  //   });
  // await HeaderColumn.sync({ force: true })
  //   .then(() => {
  //     console.log("HeaderColumn table created successfully!");
  //   })
  //   .catch((error) => {
  //     console.error("Unable to create table HeaderColumn : ", error);
  //   });
  // await ChiSoDuongHuyet.sync({ force: true })
  //   .then(() => {
  //     console.log("ChiSoDuongHuyet table created successfully!");
  //   })
  //   .catch((error) => {
  //     console.error("Unable to create table ChiSoDuongHuyet : ", error);
  //   });
  // await ChuyenMuc.sync({ force: true })
  //   .then(() => {
  //     console.log("ChuyenMuc table created successfully!");
  //   })
  //   .catch((error) => {
  //     console.error("Unable to create table ChuyenMuc : ", error);
  //   });
  // await BaiViet.sync({ force: true })
  //   .then(() => {
  //     console.log("BaiViet table created successfully!");
  //   })
  //   .catch((error) => {
  //     console.error("Unable to create table BaiViet : ", error);
  //   });
  // await LichSuLog.sync({ force: true })
  //   .then(() => {
  //     console.log("LichSuLog table created successfully!");
  //   })
  //   .catch((error) => {
  //     console.error("Unable to create table LichSuLog : ", error);
  //   });
  // await ThongBao.sync({ force: true })
  //   .then(() => {
  //     console.log("ThongBao table created successfully!");
  //   })
  //   .catch((error) => {
  //     console.error("Unable to create table ThongBao : ", error);
  //   });
};

modelSync();

module.exports = {
  sequelize,
  User,
  Role,
  Otp,
  LaoDong,
  DoiTuong,
  ThanhPhanNhuCau,
  ThucPham,
  NhomThucPham,
  MonAn,
  NhomMonAn,
  BuaAn,
  ChiSoUser,
  ChiTietMon,
  Favourite,
  NhuCauHangNgay,
  NgayAn,
  NhomTuoi,
  ThucPhamChon,
  MucTieu,
  HeaderColumn,
  ChiSoDuongHuyet,
  ChuyenMuc,
  BaiViet,
  LichSuLog,
  DonVi,
  ThongBao,
};
