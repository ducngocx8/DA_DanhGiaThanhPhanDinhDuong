const { BuaAn, sequelize } = require("../../../models");
const getAll = async () => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const buaAnList = await BuaAn.findAll({
        order: [["bua_an_id", "ASC"]],
      });
      return buaAnList;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const customerGetAllBuaAnService = async () => {
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
  customerGetAllBuaAnService,
};
