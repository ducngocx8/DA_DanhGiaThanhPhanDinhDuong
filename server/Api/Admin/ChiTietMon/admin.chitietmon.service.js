const { ChiTietMon, sequelize, MonAn, ThucPham } = require("../../../models");
const { Op } = require("sequelize");
const getAll = async () => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const chiTietMonList = await ChiTietMon.findAll({
        order: [["id_chitietmon", "ASC"]],
        include: [{ model: MonAn }],
      });
      return chiTietMonList;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminGetAllChiTietMonService = async () => {
  const result = await getAll();
  if (result) {
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

const getChiTietMonByIDMon = async (id_monan) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const chiTietMonOfMonAnList = await ChiTietMon.findAll({
        order: [["ten_phannhom", "DESC"]],
        include: [{ model: ThucPham }],
        where: {
          id_monan,
        },
      });
      return chiTietMonOfMonAnList;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminGetChiTietMonByIDMonService = async (id_monan) => {
  const chiTietMonOfMonAnList = await getChiTietMonByIDMon(id_monan);
  if (chiTietMonOfMonAnList) {
    return {
      status: true,
      data: chiTietMonOfMonAnList,
    };
  } else if (chiTietMonOfMonAnList === false) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const checkThucPhamIDExist = async (id_thucpham) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const thuc_pham = await ThucPham.findOne({
        where: {
          id_thucpham,
        },
      });
      return thuc_pham;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const checkIDMonAnExist = async (id_monan) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const mon_an = await MonAn.findOne({
        where: {
          id_monan,
        },
      });
      return mon_an;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const AddChiTietMon = async (chiTietMonBody) => {
  const { ten_phannhom, quanty, id_monan, id_thucpham } = chiTietMonBody;
  try {
    const result = await sequelize.transaction(async (t) => {
      const chi_tiet_mon = await ChiTietMon.create(
        {
          ten_phannhom: ten_phannhom.trim(),
          quanty,
          id_monan,
          id_thucpham,
        },
        { transaction: t }
      );
      return chi_tiet_mon;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminAddChiTietMonService = async (chiTietMonBody) => {
  const { id_monan, id_thucpham } = chiTietMonBody;
  const checkList = await Promise.all([
    Promise.resolve(checkIDMonAnExist(id_monan)),
    Promise.resolve(checkThucPhamIDExist(id_thucpham)),
  ]);
  console.log("checkList", checkList);
  if (checkList[0] === null) {
    return {
      status: false,
      message: "Món ăn không tồn tại trên hệ thống.",
    };
  }
  if (checkList[1] === null) {
    return {
      status: false,
      message: "Thực phẩm không tồn tại trên hệ thống.",
    };
  }
  if (checkList[0] === false || checkList[1] === false) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }

  const add_result = await AddChiTietMon(chiTietMonBody);
  if (add_result) {
    const chiTietMonTheoMonAn = await getChiTietMonByIDMon(id_monan);
    return {
      status: true,
      data: chiTietMonTheoMonAn,
      message: "Thêm Thực phẩm mới vào món ăn thành công.",
    };
  } else {
    return {
      status: false,
      message: "Thêm Thực phẩm mới vào món ăn thất bại.",
    };
  }
};

const checkChiTietMonID = async (id_chitietmon) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const chi_tiet_mon = await ChiTietMon.findOne({
        where: {
          id_chitietmon,
        },
      });
      return chi_tiet_mon;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const deleteChiTietMon = async (id_chitietmon) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const chi_tiet_mon = await ChiTietMon.destroy(
        {
          where: {
            id_chitietmon: Number(id_chitietmon),
          },
        },
        { transaction: t }
      );
      return chi_tiet_mon;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminDeleteChiTietMonService = async (id_chitietmon) => {
  const check_id_chitietmon = await checkChiTietMonID(id_chitietmon);
  if (check_id_chitietmon) {
    const delete_result = await deleteChiTietMon(id_chitietmon);
    if (delete_result) {
      const chiTietMonTheoMonAn = await getChiTietMonByIDMon(
        check_id_chitietmon.id_monan
      );
      return {
        status: true,
        data: chiTietMonTheoMonAn,
        message: "Xóa Thực phẩm khỏi món ăn thành công",
      };
    } else {
      return {
        status: false,
        message: "Xóa Thực phẩm khỏi món ăn thất bại",
      };
    }
  } else if (check_id_chitietmon === null) {
    return {
      status: false,
      message: "Chi tiết món không tồn tại trên hệ thống.",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const updateChiTietMon = async (id_chitietmon, chiTietMonBody) => {
  try {
    const { ten_phannhom, quanty, id_monan, id_thucpham } = chiTietMonBody;
    const result = await sequelize.transaction(async (t) => {
      const chi_tiet_mon = await ChiTietMon.update(
        {
          ten_phannhom: ten_phannhom.trim(),
          quanty,
          id_monan,
          id_thucpham,
        },
        {
          where: {
            [Op.and]: [{ id_chitietmon }],
          },
        },
        { transaction: t }
      );
      return chi_tiet_mon;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const adminUpdateChiTietMonService = async (id_chitietmon, ten_nhom) => {
  const check_id_chitietmon = await checkChiTietMonID(id_chitietmon);
  if (check_id_chitietmon) {
    const update_result = await updateChiTietMon(id_chitietmon, ten_nhom);
    if (update_result) {
      const chiTietMonTheoMonAn = await getChiTietMonByIDMon(
        check_id_chitietmon.id_monan
      );
      return {
        status: true,
        data: chiTietMonTheoMonAn,
        message: "Cập nhật thông tin chi tiết món ăn thành công",
      };
    } else {
      return {
        status: false,
        message: "Cập nhật thông tin chi tiết món ăn thất bại",
      };
    }
  } else if (check_id_chitietmon === null) {
    return {
      status: false,
      message: "Chi tiết món không tồn tại trên hệ thống.",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

module.exports = {
  adminGetAllChiTietMonService,
  adminAddChiTietMonService,
  adminDeleteChiTietMonService,
  adminUpdateChiTietMonService,
  adminGetChiTietMonByIDMonService,
};
