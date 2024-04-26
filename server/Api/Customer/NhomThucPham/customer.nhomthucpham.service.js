const {
  sequelize,
  NhomThucPham,
  MonAn,
  ChiTietMon,
  ThucPham,
} = require("../../../models");
const getAll = async () => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhomThucPhamList = await NhomThucPham.findAll({
        order: [["id_nhomthucpham", "ASC"]],
      });
      return nhomThucPhamList;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const customerGetAllNhomThucPhamService = async () => {
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

const getByID = async (id_nhomthucpham) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const listThucPhamThuocNhomThucPham = await NhomThucPham.findOne({
        include: [
          {
            model: ThucPham,
            order: [["id_thucpham", "ASC"]],
          },
        ],
        where: {
          id_nhomthucpham,
        },
      });
      return listThucPhamThuocNhomThucPham;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const customerGetAllMonAnThuocNhomThucPhamService = async (id_nhomthucpham) => {
  const result = await getByID(id_nhomthucpham);
  if (result) {
    return {
      status: true,
      data: result,
    };
  } else if (result === null) {
    return {
      status: false,
      message: "Không tìm thấy nhóm thực phẩm.",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

module.exports = {
  customerGetAllNhomThucPhamService,
  customerGetAllMonAnThuocNhomThucPhamService,
};
