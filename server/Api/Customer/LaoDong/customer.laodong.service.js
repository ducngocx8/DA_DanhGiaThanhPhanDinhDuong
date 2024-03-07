const { sequelize, LaoDong } = require("../../../models");
const getAll = async () => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const laoDongList = await LaoDong.findAll({
        order: [["id_laodong", "ASC"]],
      });
      return laoDongList;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const customerGetAllLaoDongService = async () => {
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
  customerGetAllLaoDongService,
};
