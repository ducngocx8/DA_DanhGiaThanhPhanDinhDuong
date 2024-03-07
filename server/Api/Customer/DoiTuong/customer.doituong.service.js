const { sequelize, DoiTuong } = require("../../../models");
const getAll = async () => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const doituongList = await DoiTuong.findAll({
        order: [["id_doituong", "ASC"]],
      });
      return doituongList;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const customerGetAllDoiTuongService = async () => {
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
module.exports = {
  customerGetAllDoiTuongService,
};
