const { Op } = require("Sequelize");
const {
  ChiSoUser,
  sequelize,
  User,
  LaoDong,
  DoiTuong,
  NhomTuoi,
  NhuCauHangNgay,
  ThanhPhanNhuCau,
} = require("../../../models");
const getChiSoUserMoiNhat = async (user_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const chi_so_user_moi_nhat = await ChiSoUser.findOne({
        order: [["time_update", "DESC"]],
        include: [
          {
            model: User,
            attributes: ["username", "user_id", "image_url"],
          },
          {
            model: DoiTuong,
          },
          {
            model: LaoDong,
          },
        ],
        where: {
          user_id: user_id,
        },
      });
      return chi_so_user_moi_nhat;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const customerGetLastUpdateChiSoUserService = async (user_id) => {
  const result = await getChiSoUserMoiNhat(user_id);
  console.log(result);
  if (result !== false) {
    return {
      status: true,
      data: result,
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const CheckThuocNhomTuoi = async (thang_tuoi) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhom_tuoi = await NhomTuoi.findOne({
        where: {
          strAge: {
            [Op.lte]: thang_tuoi, // start <= 10
          },
          endAge: {
            [Op.gte]: thang_tuoi, // end >= 10
          },
        },
      });
      return nhom_tuoi;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const getNhuCauHangNgay = async (id_doituong, id_laodong, id_nhomtuoi) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhu_cau_hang_ngay = await NhuCauHangNgay.findOne({
        where: {
          id_doituong,
          id_laodong,
          id_nhomtuoi,
        },
        include: [
          { model: DoiTuong },
          { model: LaoDong },
          { model: NhomTuoi },
          { model: ThanhPhanNhuCau },
        ],
      });
      return nhu_cau_hang_ngay;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const customerGetKhuyenNghiService = async (user_id) => {
  // Check nếu không có mục tiêu trong ngày hôm nay => Tính theo đề xuất
  const result = await getChiSoUserMoiNhat(user_id);
  
  if (!result) {
    return {
      status: true,
      must: "update_chisouser",
      message: "Vui lòng cập nhật chỉ số cơ thể để nhận khuyến nghị.",
      type: "KHUYEN_NGHI",
      data: null,
    };
  } else {
    const { age, height, weight, gender, id_laodong, id_doituong } = result;
    if (!age || !height || !weight || !gender || !id_laodong || !id_doituong) {
      return {
        status: true,
        must: "update_chisouser",
        message: "Vui lòng cập nhật đầy đủ chỉ số cơ thể để nhận khuyến nghị.",
        type: "KHUYEN_NGHI",
        data: null,
      };
    }
    // Tìm nhóm tuổi
    const nhom_tuoi = await CheckThuocNhomTuoi(age * 12);
    if (nhom_tuoi) {
      const id_nhomtuoi = nhom_tuoi.id_nhomtuoi;
      const nhu_cau_hang_ngay = await getNhuCauHangNgay(
        id_doituong,
        id_laodong,
        id_nhomtuoi
      );
      if (nhu_cau_hang_ngay) {
        return {
          status: true,
          data: nhu_cau_hang_ngay,
          type: "KHUYEN_NGHI",
        };
      } else if (nhu_cau_hang_ngay === null) {
        return {
          status: true,
          message: "Hiện chưa có khuyến nghị nào dành cho bạn.",
          data: null,
          type: "KHUYEN_NGHI",
        };
      } else {
        return {
          status: false,
          message: "Lỗi hệ thống, vui lòng thử lại sau.",
        };
      }
    } else {
      return {
        status: "true",
        message: "Hiện chưa có khuyến nghị nào dành cho bạn.",
        data: null,
        type: "KHUYEN_NGHI",
      };
    }
  }
};

module.exports = {
  customerGetLastUpdateChiSoUserService,
  customerGetKhuyenNghiService,
};
