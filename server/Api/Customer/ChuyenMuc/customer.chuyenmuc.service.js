const { QueryTypes } = require("sequelize");
const { sequelize } = require("../../../models");
const getAll = async () => {
  const query = `SELECT CHUYENMUC.id_chuyenmuc, CHUYENMUC.ten_chuyenmuc, (
      CASE 
          WHEN ISNULL(BAIVIET.id_chuyenmuc) THEN 0
          ELSE COUNT(CHUYENMUC.id_chuyenmuc)
      END) AS TOTAL FROM CHUYENMUC 
  LEFT JOIN BAIVIET
  ON CHUYENMUC.id_chuyenmuc = BAIVIET.id_chuyenmuc AND BAIVIET.hien_thi = true
  GROUP BY CHUYENMUC.id_chuyenmuc
  ORDER BY TOTAL DESC, CHUYENMUC.id_chuyenmuc ASC`;
  try {
    const result = await sequelize.transaction(async (t) => {
      const list = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
      return list;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const customerGetAllChuyenMucService = async () => {
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
  customerGetAllChuyenMucService,
};
