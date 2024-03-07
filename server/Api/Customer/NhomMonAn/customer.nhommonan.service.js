const { sequelize, NhomMonAn, MonAn, ChiTietMon, ThucPham } = require("../../../models");
const getAll = async () => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhomMonAnList = await NhomMonAn.findAll({
        order: [["id_nhommonan", "ASC"]],
      });
      return nhomMonAnList;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const customerGetAllNhomMonAnService = async () => {
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

const getByID = async (id_nhommonan) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const listMonAnThuocNhomMon = await NhomMonAn.findOne({
        include: [
          {
            model: MonAn,
            order: [["id_monan", "ASC"]],
            include: [{ model: ChiTietMon, include: ThucPham }],
          },
        ],
        where: {
          id_nhommonan,
        },
      });
      return listMonAnThuocNhomMon;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const customerGetAllMonAnThuocNhomMonAnService = async (id_nhommonan) => {
  const result = await getByID(id_nhommonan);
  if (result) {
    return {
      status: true,
      data: result,
    };
  } else if (result === null) {
    return {
      status: false,
      message: "Không tìm thấy nhóm món ăn.",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

module.exports = {
  customerGetAllNhomMonAnService,
  customerGetAllMonAnThuocNhomMonAnService,
};
