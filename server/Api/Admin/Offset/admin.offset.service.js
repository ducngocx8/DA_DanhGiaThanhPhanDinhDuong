const { NhomThucPham, sequelize } = require("../../../models");

const adminOffsetNhomThucPhamService = async (queryParam) => {
  const { offset, limit, sort, type } = queryParam;
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhomThucPhamList = await NhomThucPham.findAll({
        order: [[sort, type]],
        offset: Number(offset),
        limit: Number(limit),
      });
      return nhomThucPhamList;
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

module.exports = {
  adminOffsetNhomThucPhamService,
};
