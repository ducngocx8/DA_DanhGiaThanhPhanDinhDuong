const { ThucPhamChon, sequelize, User, ThucPham } = require("../../../models");
const getAll = async () => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const thucPhamChonList = await ThucPhamChon.findAll({
        order: [["id", "ASC"]],
        include: [{ model: ThucPham }, { model: User }],
      });
      return thucPhamChonList;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminGetAllThucPhamChonService = async () => {
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

const checkThucPhamChonID = async (id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const thuc_pham_chon = await ThucPhamChon.findOne({
        where: {
          id,
        },
      });
      return thuc_pham_chon;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const deleteThucPhamChon = async (id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const thuc_pham_chon = await ThucPhamChon.destroy(
        {
          where: {
            id: Number(id),
          },
        },
        { transaction: t }
      );
      return thuc_pham_chon;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminDeleteThucPhamChonService = async (id) => {
  const check_id = await checkThucPhamChonID(id);
  if (check_id) {
    const delete_result = await deleteThucPhamChon(id);
    if (delete_result) {
      const thucPhamChonList = await getAll();
      return {
        status: true,
        data: thucPhamChonList,
        message: "Xóa Thực phẩm khỏi danh sách Thực phẩm chọn thành công.",
      };
    } else {
      return {
        status: false,
        message: "Xóa Thực phẩm khỏi danh sách Thực phẩm chọn thất bại.",
      };
    }
  } else if (check_id === null) {
    return {
      status: false,
      message: "Mã Thực phẩm đã chọn không tồn tại trên hệ thống.",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

module.exports = {
  adminGetAllThucPhamChonService,
  adminDeleteThucPhamChonService,
};
