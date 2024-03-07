const { HeaderColumn, sequelize } = require("../../models");
const getAll = async () => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const header_column = await HeaderColumn.findAll();
      return header_column;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getAllHeaderColumnService = async () => {
  const result = await getAll();
  if (result) {
    return {
      status: true,
      data: result,
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống",
    };
  }
};

module.exports = {
  getAllHeaderColumnService,
};
