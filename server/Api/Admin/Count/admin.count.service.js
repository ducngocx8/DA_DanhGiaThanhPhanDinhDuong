const { Op } = require("Sequelize");
const {
  NhomThucPham,
  sequelize,
  DonVi,
  ChuyenMuc,
  BaiViet,
  NhomMonAn,
  BuaAn,
  LaoDong,
  NhomTuoi,
  ThanhPhanNhuCau,
  DoiTuong,
  Otp,
  Role,
  MucTieu,
  User,
  ChiSoUser,
  NhuCauHangNgay,
  ChiSoDuongHuyet,
  NgayAn,
  MonAn,
  ChiTietMon,
  LichSuLog,
  ThucPham,
  ThongBao,
} = require("../../../models");

const adminCountNhomThucPhamService = async (queryParam) => {
  const { keyword } = queryParam;
  try {
    const result = await sequelize.transaction(async (t) => {
      const count = await NhomThucPham.count({
        where: {
          [Op.or]: [
            {
              id_nhomthucpham: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              ten_nhom: {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
        },
      });
      return count;
    });
    return {
      status: true,
      data: result,
    };
  } catch (error) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const adminCountDonViService = async (queryParam) => {
  const { keyword } = queryParam;
  try {
    const result = await sequelize.transaction(async (t) => {
      const count = await DonVi.count({
        where: {
          [Op.or]: [
            {
              id_donvi: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              ten_donvi: {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
        },
      });
      return count;
    });
    return {
      status: true,
      data: result,
    };
  } catch (error) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const adminCountChuyenMucService = async (queryParam) => {
  const { keyword } = queryParam;
  try {
    const result = await sequelize.transaction(async (t) => {
      const count = await ChuyenMuc.count({
        where: {
          [Op.or]: [
            {
              id_chuyenmuc: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              ten_chuyenmuc: {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
        },
      });
      return count;
    });
    return {
      status: true,
      data: result,
    };
  } catch (error) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const adminCountBaiVietService = async (queryParam) => {
  let { keyword, status } = queryParam;
  status = Number(status);
  try {
    const result = await sequelize.transaction(async (t) => {
      let whereObject = {};
      // status = 1: ALL
      // status = 2: Show
      // status = 3: Hide
      // status = 4: No Image
      if (status === 1) {
        whereObject = {};
      } else if (status === 2) {
        whereObject = {
          hien_thi: true,
        };
      } else if (status === 3) {
        whereObject = {
          hien_thi: false,
        };
      } else if (status === 4) {
        whereObject = {
          [Op.or]: [
            {
              image_url: "",
            },
            {
              image_url: null,
            },
          ],
        };
      }
      const count = await BaiViet.count({
        where: {
          [Op.or]: [
            {
              id_baiviet: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              tieu_de: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              mo_ta: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              noi_dung: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              slug: {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
          [Op.and]: [whereObject],
        },
      });
      return count;
    });
    return {
      status: true,
      data: result,
    };
  } catch (error) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const adminCountNhomMonAnService = async (queryParam) => {
  const { keyword } = queryParam;
  try {
    const result = await sequelize.transaction(async (t) => {
      const count = await NhomMonAn.count({
        where: {
          [Op.or]: [
            {
              id_nhommonan: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              ten_nhom: {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
        },
      });
      return count;
    });
    return {
      status: true,
      data: result,
    };
  } catch (error) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const adminCountBuaAnService = async (queryParam) => {
  const { keyword } = queryParam;
  try {
    const result = await sequelize.transaction(async (t) => {
      const count = await BuaAn.count({
        where: {
          [Op.or]: [
            {
              bua_an_id: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              ten_bua_an: {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
        },
      });
      return count;
    });
    return {
      status: true,
      data: result,
    };
  } catch (error) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const adminCountLaoDongService = async (queryParam) => {
  const { keyword } = queryParam;
  try {
    const result = await sequelize.transaction(async (t) => {
      const count = await LaoDong.count({
        where: {
          [Op.or]: [
            {
              id_laodong: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              TenLaoDong: {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
        },
      });
      return count;
    });
    return {
      status: true,
      data: result,
    };
  } catch (error) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const adminCountDoiTuongService = async (queryParam) => {
  const { keyword } = queryParam;
  try {
    const result = await sequelize.transaction(async (t) => {
      const count = await DoiTuong.count({
        where: {
          [Op.or]: [
            {
              id_doituong: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              TenDoiTuong: {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
        },
      });
      return count;
    });
    return {
      status: true,
      data: result,
    };
  } catch (error) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const adminCountNhomTuoiService = async (queryParam) => {
  const { keyword } = queryParam;
  try {
    const result = await sequelize.transaction(async (t) => {
      const count = await NhomTuoi.count({
        where: {
          [Op.or]: [
            {
              id_nhomtuoi: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              TenNhomTuoi: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              strAge: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              endAge: {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
        },
      });
      return count;
    });
    return {
      status: true,
      data: result,
    };
  } catch (error) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const adminCountLichSuLogService = async (queryParam) => {
  const { keyword } = queryParam;
  try {
    const result = await sequelize.transaction(async (t) => {
      const count = await LichSuLog.count({
        include: [{ model: User }],
        where: {
          [Op.or]: [
            {
              id_lichsu: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              "$User.username$": {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
        },
      });
      return count;
    });
    return {
      status: true,
      data: result,
    };
  } catch (error) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const adminCountThanhPhanNhuCauService = async (queryParam) => {
  const { keyword } = queryParam;
  try {
    const result = await sequelize.transaction(async (t) => {
      const count = await ThanhPhanNhuCau.count({
        where: {
          [Op.or]: [
            {
              DienGiai: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              NangLuong: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Protein: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Lipid: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Glucid: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Xo: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              CanXi: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Phospho: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Magie: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Iod: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Cu: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Mangan: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Fluo: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Fe: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Zn: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Selen: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Crom: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              VitaminA: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              VitaminE: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              VitaminK: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              VitaminD: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              VitaminB1: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              VitaminB2: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Niacin: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Pantothenic: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              VitaminB6: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Folate: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              B12: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Bitotin: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              VitaminC: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Choline: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              NaMuoi: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Kali: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Clo: {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
        },
      });
      return count;
    });
    return {
      status: true,
      data: result,
    };
  } catch (error) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const adminCountTPNhuCauService = async (queryParam) => {
  const { keyword } = queryParam;
  try {
    const result = await sequelize.transaction(async (t) => {
      const count = await ThanhPhanNhuCau.count({
        where: {
          [Op.or]: [
            {
              id_nhucau: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              DienGiai: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              NangLuong: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Protein: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Lipid: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Glucid: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Xo: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              CanXi: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Phospho: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Magie: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Iod: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Cu: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Mangan: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Fluo: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Fe: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Zn: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Selen: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Crom: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              VitaminA: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              VitaminE: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              VitaminK: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              VitaminD: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              VitaminB1: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              VitaminB2: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Niacin: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Pantothenic: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              VitaminB6: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Folate: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              B12: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Bitotin: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              VitaminC: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Choline: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              NaMuoi: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Kali: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Clo: {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
        },
      });
      return count;
    });
    return {
      status: true,
      data: result,
    };
  } catch (error) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const adminCountOTPService = async (queryParam) => {
  const { keyword } = queryParam;
  try {
    const result = await sequelize.transaction(async (t) => {
      const count = await Otp.count({
        where: {
          [Op.or]: [
            {
              id: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              email: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              otp_code: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              time_send: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              status: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              otp_type: {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
        },
      });
      return count;
    });
    return {
      status: true,
      data: result,
    };
  } catch (error) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const adminCountRoleService = async (queryParam) => {
  const { keyword } = queryParam;
  try {
    const result = await sequelize.transaction(async (t) => {
      const count = await Role.count({
        where: {
          [Op.or]: [
            {
              role_id: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              role_code: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              role_name: {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
        },
      });
      return count;
    });
    return {
      status: true,
      data: result,
    };
  } catch (error) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const adminCountMucTieuService = async (queryParam) => {
  const { keyword } = queryParam;
  try {
    const result = await sequelize.transaction(async (t) => {
      const count = await MucTieu.count({
        include: [{ model: User }],
        where: {
          [Op.or]: [
            {
              muctieu_id: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              ENERC: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              PROCNT: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              FAT: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              CHOCDF: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              note: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              time: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              "$User.username$": {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
        },
      });
      return count;
    });
    return {
      status: true,
      data: result,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const adminCountChiSoUserService = async (queryParam) => {
  const { keyword } = queryParam;
  try {
    const result = await sequelize.transaction(async (t) => {
      const count = await ChiSoUser.count({
        include: [{ model: User }, { model: LaoDong }, { model: DoiTuong }],
        where: {
          [Op.or]: [
            {
              id_chiso: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              age: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              height: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              weight: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              gender: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              time_update: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              "$User.username$": {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              "$LaoDong.TenLaoDong$": {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              "$DoiTuong.TenDoiTuong$": {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
        },
      });
      return count;
    });
    return {
      status: true,
      data: result,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const adminCountNhuCauHangNgayService = async (queryParam) => {
  const { keyword } = queryParam;
  try {
    const result = await sequelize.transaction(async (t) => {
      const count = await NhuCauHangNgay.count({
        include: [
          { model: NhomTuoi },
          { model: ThanhPhanNhuCau },
          { model: LaoDong },
          { model: DoiTuong },
        ],
        where: {
          [Op.or]: [
            {
              "$NhomTuoi.TenNhomTuoi$": {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              "$ThanhPhanNhuCau.DienGiai$": {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              "$LaoDong.TenLaoDong$": {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              "$DoiTuong.TenDoiTuong$": {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
        },
      });
      return count;
    });
    return {
      status: true,
      data: result,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const adminCountChiSoDuongHuyetService = async (queryParam) => {
  const { keyword } = queryParam;
  try {
    const result = await sequelize.transaction(async (t) => {
      const count = await ChiSoDuongHuyet.count({
        where: {
          [Op.or]: [
            {
              id_thucpham: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              GI: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              TenThucPham: {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
        },
      });
      return count;
    });
    return {
      status: true,
      data: result,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const adminCountThongBaoService = async (queryParam) => {
  const { keyword } = queryParam;
  try {
    const result = await sequelize.transaction(async (t) => {
      const count = await ThongBao.count({
        include: [
          { model: User, attributes: ["username", "user_id", "image_url"] },
        ],
        where: {
          [Op.or]: [
            {
              user_id: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              expo_key: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              "$User.username$": {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
        },
      });
      return count;
    });
    return {
      status: true,
      data: result,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const adminCountNgayAnService = async (queryParam) => {
  const { keyword } = queryParam;
  try {
    const result = await sequelize.transaction(async (t) => {
      const count = await NgayAn.count({
        include: [{ model: BuaAn }, { model: User }, { model: MonAn }],
        where: {
          [Op.or]: [
            {
              ngayan_id: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              time: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              quanty: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              "$User.username$": {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              "$BuaAn.ten_bua_an$": {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              "$MonAn.ten_mon$": {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
        },
      });
      return count;
    });
    return {
      status: true,
      data: result,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const adminCountUserService = async (queryParam) => {
  let { keyword, status } = queryParam;
  status = Number(status);
  try {
    const result = await sequelize.transaction(async (t) => {
      let whereObject = {};
      // status = 1: ALL
      // status = 2: Đã xác thực
      // status = 3: Tạm khóa
      // status = 4: Chưa xác thực
      if (status === 1) {
        whereObject = {};
      } else if (status === 2) {
        whereObject = {
          user_status: 2,
        };
      } else if (status === 3) {
        whereObject = {
          user_status: 3,
        };
      } else if (status === 4) {
        whereObject = {
          user_status: 1,
        };
      }

      const count = await User.count({
        include: [{ model: Role }],
        where: {
          [Op.or]: [
            {
              user_id: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              username: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              email: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              phonenumber: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              "$Role.role_name$": {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              "$Role.role_code$": {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
          [Op.and]: [whereObject],
        },
      });
      return count;
    });
    return {
      status: true,
      data: result,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const adminCountMonAnService = async (queryParam) => {
  let { keyword, status } = queryParam;
  status = Number(status);
  try {
    const result = await sequelize.transaction(async (t) => {
      let whereObject = {};
      // status = 1: ALL
      // status = 2: Admin
      // status = 3: User
      // status = 4: Show
      // status = 5: Hide
      // status = 6: No Details
      if (status === 1) {
        whereObject = {};
      } else if (status === 2) {
        whereObject = {
          user_id: null,
        };
      } else if (status === 3) {
        whereObject = {
          user_id: { [Op.ne]: null },
        };
      } else if (status === 4) {
        whereObject = {
          monan_status: 1,
        };
      } else if (status === 5) {
        whereObject = {
          monan_status: 0,
        };
      } else if (status === 7) {
        whereObject = {
          monan_status: 2,
        };
      } else if (status === 6) {
        whereObject = {
          "$ChiTietMons.id_chitietmon$": null,
        };
      }

      const count = await MonAn.count({
        include: [{ model: NhomMonAn }, { model: User }, { model: ChiTietMon }], // {model: DonVi}
        where: {
          [Op.or]: [
            {
              id_monan: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              ten_mon: {
                [Op.like]: `%${keyword}%`,
              },
            },
            // {
            //   '$DonVi.ten_donvi$': {
            //     [Op.like]: `%${keyword}%`,
            //   },
            // },
            {
              "$NhomMonAn.ten_nhom$": {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              "$User.username$": {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
          [Op.and]: [whereObject],
        },
        distinct: true,
        col: "id_monan",
      });
      return count;
    });
    return {
      status: true,
      data: result,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const adminCountThucPhamService = async (queryParam) => {
  let { keyword, status } = queryParam;
  status = Number(status);
  try {
    const result = await sequelize.transaction(async (t) => {
      let whereObject = {};
      // status = 1: ALL
      // status = 2: Show
      // status = 3: Hide
      // status = 4: Lost NL
      // status = 5: Lost Image
      if (status === 1) {
        whereObject = {};
      } else if (status === 2) {
        whereObject = {
          thucpham_status: true,
        };
      } else if (status === 3) {
        whereObject = {
          thucpham_status: false,
        };
      } else if (status === 4) {
        whereObject = {
          [Op.or]: [
            {
              ENERC: null,
            },
          ],
        };
      } else if (status === 5) {
        whereObject = {
          [Op.or]: [
            {
              image_url: "",
            },
            {
              image_url: null,
            },
          ],
        };
      }

      const count = await ThucPham.count({
        include: [{ model: NhomThucPham }],
        where: {
          [Op.or]: [
            {
              id_thucpham: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              TenTiengViet: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              TenTiengAnh: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              "$NhomThucPham.ten_nhom$": {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
          [Op.and]: [whereObject],
        },
        distinct: true,
        col: "id_thucpham",
      });
      return count;
    });
    return {
      status: true,
      data: result,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

module.exports = {
  adminCountNhomThucPhamService,
  adminCountDonViService,
  adminCountChuyenMucService,
  adminCountBaiVietService,
  adminCountBuaAnService,
  adminCountNhomMonAnService,
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
  adminCountThanhPhanNhuCauService,
  adminCountLichSuLogService,
  adminCountThucPhamService,
  adminCountThongBaoService,
};
