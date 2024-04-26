const { QueryTypes } = require("sequelize");
const { sequelize } = require("../../../models");

const customerGetThongKeUserService = async (user_id) => {
  const query = `SELECT (SELECT CHISOUSER.weight FROM CHISOUSER WHERE CHISOUSER.user_id =  ${user_id} ORDER BY time_update DESC LIMIT 1) AS weight,
  time, ROUND(SUM(ENERC)) AS ENERC, (SELECT COUNT(MONAN.id_monan) FROM MONAN WHERE MONAN.user_id = ${user_id}) AS COUNT_FOOD FROM
  (SELECT NGAYAN.time, SUM(THUCPHAM.ENERC * NGAYAN.quanty * CHITIETMON.quanty / 100 ) AS ENERC
  FROM NGAYAN INNER JOIN MONAN ON NGAYAN.id_monan = MONAN.id_monan AND NGAYAN.user_id =  ${user_id}
  AND NGAYAN.time = curdate()
  INNER JOIN CHITIETMON ON CHITIETMON.id_monan = MONAN.id_monan INNER JOIN THUCPHAM
  ON THUCPHAM.id_thucpham = CHITIETMON.id_thucpham
  GROUP BY NGAYAN.time
  UNION ALL SELECT curdate() AS time, 0 AS ENERC) AS ABC
  GROUP BY time`;
  try {
    const result = await sequelize.transaction(async (t) => {
      const thong_ke = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
      return thong_ke;
    });
    return {
      status: true,
      data: result,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const queryDinhDuongByNumberDay = async (user_id, day) => {
  const query = `SELECT ngay, user_id, ROUND(SUM(ENERC)) AS ENERC, ROUND(SUM(PROCNT)) AS PROCNT, ROUND(SUM(FAT)) AS FAT, ROUND(SUM(CHOCDF)) AS CHOCDF FROM
  (WITH RECURSIVE CTE_DATE
  AS (
    SELECT date_add(curdate(), INTERVAL - ${day} day) AS ngay, ${user_id} AS user_id, 0 AS ENERC, 0 AS PROCNT, 0 AS FAT, 0 AS CHOCDF
    UNION ALL
    SELECT date_add(ngay, INTERVAL + 1 day) AS ngay, ${user_id} AS user_id, 0 AS ENERC, 0 AS PROCNT, 0 AS FAT, 0 AS CHOCDF
    FROM CTE_DATE 
    WHERE ngay < curdate())
  SELECT * FROM CTE_DATE 
  UNION ALL
  SELECT NGAYAN.time AS ngay, NGAYAN.user_id,
  SUM(THUCPHAM.ENERC * NGAYAN.quanty * CHITIETMON.quanty / 100 ) AS ENERC,
  SUM(THUCPHAM.PROCNT * NGAYAN.quanty * CHITIETMON.quanty / 100 ) AS PROCNT,
  SUM(THUCPHAM.FAT * NGAYAN.quanty * CHITIETMON.quanty / 100 ) AS FAT,
  SUM(THUCPHAM.CHOCDF * NGAYAN.quanty * CHITIETMON.quanty / 100 ) AS CHOCDF
  FROM NGAYAN
  INNER JOIN MONAN
  ON MONAN.id_monan = NGAYAN.id_monan AND NGAYAN.user_id = ${user_id} AND time BETWEEN date_add(curdate(), interval - ${day} day) AND curdate()
  INNER JOIN CHITIETMON
  ON CHITIETMON.id_monan = MONAN.id_monan
  INNER JOIN THUCPHAM
  ON THUCPHAM.id_thucpham = CHITIETMON.id_thucpham
  GROUP BY NGAYAN.time) AS LIST
  GROUP BY ngay`;
  try {
    const result = await sequelize.transaction(async (t) => {
      const thong_ke = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
      return thong_ke;
    });
    return {
      status: true,
      data: result,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const queryDinhDuongBetweenTwoDay = async (user_id, startDate, endDate) => {
  const query = `SELECT ngay, user_id, ROUND(SUM(ENERC), 0) AS ENERC, ROUND(SUM(PROCNT), 0) AS PROCNT, ROUND(SUM(FAT)) AS FAT, ROUND(SUM(CHOCDF)) AS CHOCDF FROM
  (WITH RECURSIVE CTE_DATE
  AS (
    SELECT '${startDate}' AS ngay, ${user_id} AS user_id, 0 AS ENERC, 0 AS PROCNT, 0 AS FAT, 0 AS CHOCDF
    UNION ALL
    SELECT date_add(ngay, INTERVAL + 1 day) AS ngay, ${user_id} AS user_id, 0 AS ENERC, 0 AS PROCNT, 0 AS FAT, 0 AS CHOCDF
    FROM CTE_DATE 
    WHERE ngay < '${endDate}')
  SELECT * FROM CTE_DATE 
  UNION ALL
  SELECT NGAYAN.time AS ngay, NGAYAN.user_id,
  SUM(THUCPHAM.ENERC * NGAYAN.quanty * CHITIETMON.quanty / 100 ) AS ENERC,
  SUM(THUCPHAM.PROCNT * NGAYAN.quanty * CHITIETMON.quanty / 100 ) AS PROCNT,
  SUM(THUCPHAM.FAT * NGAYAN.quanty * CHITIETMON.quanty / 100 ) AS FAT,
  SUM(THUCPHAM.CHOCDF * NGAYAN.quanty * CHITIETMON.quanty / 100 ) AS CHOCDF
  FROM NGAYAN
  INNER JOIN MONAN
  ON MONAN.id_monan = NGAYAN.id_monan AND NGAYAN.user_id = ${user_id} AND time BETWEEN '${startDate}' AND '${endDate}'
  INNER JOIN CHITIETMON
  ON CHITIETMON.id_monan = MONAN.id_monan
  INNER JOIN THUCPHAM
  ON THUCPHAM.id_thucpham = CHITIETMON.id_thucpham
  GROUP BY NGAYAN.time) AS LIST
  GROUP BY ngay`;
  try {
    const result = await sequelize.transaction(async (t) => {
      const thong_ke = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
      return thong_ke;
    });
    return {
      status: true,
      data: result,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const customerGetThongKeDinhDuongService = async (user_id, filterParam) => {
  let { thongKeType, startDate, endDate } = filterParam;
  if (thongKeType) {
    if (thongKeType === "7days") {
      const thong_ke = await queryDinhDuongByNumberDay(user_id, 6);
      return thong_ke;
    } else if (thongKeType === "15days") {
      const thong_ke = await queryDinhDuongByNumberDay(user_id, 14);
      return thong_ke;
    } else if (thongKeType === "30days") {
      const thong_ke = await queryDinhDuongByNumberDay(user_id, 29);
      return thong_ke;
    }
  } else if (startDate && endDate) {
    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate);
    startDate =
      newStartDate.getFullYear() +
      "-" +
      String(newStartDate.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(newStartDate.getDate()).padStart(2, "0");

    endDate =
      newEndDate.getFullYear() +
      "-" +
      String(newEndDate.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(newEndDate.getDate()).padStart(2, "0");

    const thong_ke = await queryDinhDuongBetweenTwoDay(
      user_id,
      startDate,
      endDate
    );
    return thong_ke;
  }
};

module.exports = {
  customerGetThongKeUserService,
  customerGetThongKeDinhDuongService,
};
