const { QueryTypes } = require("sequelize");
const { sequelize } = require("../../../models");

const adminCountTopService = async () => {
  const query = `SELECT * FROM (SELECT COUNT(id_monan) AS count_monan FROM MONAN ) AS MON_AN, 
  (SELECT COUNT(user_id) AS count_user FROM USERS ) AS USERS, 
  (SELECT COUNT(id_thucpham) AS count_thucpham FROM THUCPHAM ) AS THUC_PHAM`;
  try {
    const result = await sequelize.transaction(async (t) => {
      const count = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
      return count;
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

const queryUserByNumberDay = async (day) => {
  const query = `SELECT ngay, ROUND(SUM(total)) AS total FROM
  (WITH RECURSIVE CTE_DATE
  AS (
    SELECT date_add(curdate(), INTERVAL - ${day} day) AS ngay, 0 AS total
    UNION ALL
    SELECT date_add(ngay, INTERVAL + 1 day) AS ngay, 0 AS total
    FROM CTE_DATE 
    WHERE ngay < curdate())
  SELECT * FROM CTE_DATE 
  UNION ALL
  SELECT DATE(USERS.createdAt) AS ngay, COUNT(*) AS total FROM USERS
  WHERE DATE(USERS.createdAt) BETWEEN date_add(curdate(), interval - ${day} day) AND curdate()
  GROUP BY DATE(USERS.createdAt)) AS LIST
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

const queryUserByBetweenTwoDay = async (startDate, endDate) => {
  const query = `SELECT ngay, SUM(total) AS total FROM
  (WITH RECURSIVE CTE_DATE
  AS (
    SELECT '${startDate}' AS ngay, 0 AS total
    UNION ALL
    SELECT date_add(ngay, INTERVAL + 1 day) AS ngay, 0 AS total
    FROM CTE_DATE 
    WHERE ngay < '${endDate}')
  SELECT * FROM CTE_DATE 
  UNION ALL
  SELECT DATE(USERS.createdAt) AS ngay, COUNT(*) AS total FROM USERS
  WHERE DATE(USERS.createdAt) BETWEEN '${startDate}' AND '${endDate}'
  GROUP BY DATE(USERS.createdAt)) AS LIST
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

const customerGetThongKeUserService = async (filterParam) => {
  let { thongKeType, startDate, endDate } = filterParam;
  if (thongKeType) {
    if (thongKeType === "7days") {
      const thong_ke = await queryUserByNumberDay(6);
      return thong_ke;
    } else if (thongKeType === "15days") {
      const thong_ke = await queryUserByNumberDay(14);
      return thong_ke;
    } else if (thongKeType === "30days") {
      const thong_ke = await queryUserByNumberDay(29);
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

    const thong_ke = await queryUserByBetweenTwoDay(startDate, endDate);
    return thong_ke;
  }
};

const queryMonAnByNumberDay = async (day) => {
  const query = `SELECT ngay, SUM(total_admin) AS total_admin, SUM(total_user) AS total_user FROM
  (WITH RECURSIVE CTE_DATE
  AS (
    SELECT date_add(curdate(), INTERVAL - ${day} day) AS ngay, 0 AS total_admin, 0 AS total_user
    UNION ALL
    SELECT date_add(ngay, INTERVAL + 1 day) AS ngay,  0 AS total_admin, 0 AS total_user
    FROM CTE_DATE 
    WHERE ngay < curdate())
  SELECT * FROM CTE_DATE 
  UNION ALL
  SELECT ngay, SUM(total_admin) AS total_admin, SUM(total_user) AS total_user FROM 
  (SELECT DATE(MONAN.createdAt) AS ngay, COUNT(*) AS total_admin, 0 AS total_user FROM MONAN
  WHERE MONAN.user_id IS NULL AND DATE(MONAN.createdAt) BETWEEN date_add(curdate(), interval - ${day} day) AND curdate()
  GROUP BY DATE(MONAN.createdAt)
  UNION ALL
  SELECT DATE(MONAN.createdAt) AS ngay, 0 AS total_admin, COUNT(*) AS total_user FROM MONAN
  WHERE MONAN.user_id IS NOT NULL AND DATE(MONAN.createdAt) BETWEEN date_add(curdate(), interval - ${day} day) AND curdate()
  GROUP BY DATE(MONAN.createdAt)
  ) AS ABC GROUP BY ngay) AS CDE
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

const queryMonAnByBetweenTwoDay = async (startDate, endDate) => {
  const query = `SELECT ngay, SUM(total_admin) AS total_admin, SUM(total_user) AS total_user FROM
  (WITH RECURSIVE CTE_DATE
  AS (
    SELECT '${startDate}' AS ngay, 0 AS total_admin, 0 AS total_user
    UNION ALL
    SELECT date_add(ngay, INTERVAL + 1 day) AS ngay,  0 AS total_admin, 0 AS total_user
    FROM CTE_DATE 
    WHERE ngay < '${endDate}')
  SELECT * FROM CTE_DATE 
  UNION ALL
  SELECT ngay, SUM(total_admin) AS total_admin, SUM(total_user) AS total_user FROM 
  (SELECT DATE(MONAN.createdAt) AS ngay, COUNT(*) AS total_admin, 0 AS total_user FROM MONAN
  WHERE MONAN.user_id IS NULL AND DATE(MONAN.createdAt) BETWEEN '${startDate}' AND '${endDate}'
  GROUP BY DATE(MONAN.createdAt)
  UNION ALL
  SELECT DATE(MONAN.createdAt) AS ngay, 0 AS total_admin, COUNT(*) AS total_user FROM MONAN
  WHERE MONAN.user_id IS NOT NULL AND DATE(MONAN.createdAt) BETWEEN '${startDate}' AND '${endDate}'
  GROUP BY DATE(MONAN.createdAt)
  ) AS ABC GROUP BY ngay) AS CDE
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

const customerGetThongKeMonAnService = async (filterParam) => {
  let { thongKeType, startDate, endDate } = filterParam;
  if (thongKeType) {
    if (thongKeType === "7days") {
      const thong_ke = await queryMonAnByNumberDay(6);
      return thong_ke;
    } else if (thongKeType === "15days") {
      const thong_ke = await queryMonAnByNumberDay(14);
      return thong_ke;
    } else if (thongKeType === "30days") {
      const thong_ke = await queryMonAnByNumberDay(29);
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

    const thong_ke = await queryMonAnByBetweenTwoDay(startDate, endDate);
    return thong_ke;
  }
};

const queryTruyCapByNumberDay = async (day) => {
  const query = `SELECT ngay, SUM(TOTAL) AS TOTAL FROM
  (WITH RECURSIVE CTE_DATE
  AS (
    SELECT date_add(curdate(), INTERVAL - ${day} day) AS ngay, 0 AS TOTAL
    UNION ALL
    SELECT date_add(ngay, INTERVAL + 1 day) AS ngay, 0 AS TOTAL
    FROM CTE_DATE 
    WHERE ngay < curdate())
  SELECT * FROM CTE_DATE 
  UNION ALL
  SELECT DATE(LICHSULOG.time_dau) AS ngay,
  COUNT(LICHSULOG.id_lichsu) AS TOTAL
  FROM LICHSULOG
  WHERE DATE(LICHSULOG.time_dau) BETWEEN date_add(curdate(), interval - ${day} day) AND curdate()
  GROUP BY DATE(LICHSULOG.time_dau)) AS LIST
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

const queryTruyCapByBetweenTwoDay = async (startDate, endDate) => {
  const query = `SELECT ngay, SUM(TOTAL) AS TOTAL FROM
  (WITH RECURSIVE CTE_DATE
  AS (
    SELECT '${startDate}' AS ngay, 0 AS TOTAL
    UNION ALL
    SELECT date_add(ngay, INTERVAL + 1 day) AS ngay, 0 AS TOTAL
    FROM CTE_DATE 
    WHERE ngay < '${endDate}')
  SELECT * FROM CTE_DATE 
  UNION ALL
  SELECT DATE(LICHSULOG.time_dau) AS ngay,
  COUNT(LICHSULOG.id_lichsu) AS TOTAL
  FROM LICHSULOG
  WHERE DATE(LICHSULOG.time_dau) BETWEEN '${startDate}' AND '${endDate}'
  GROUP BY DATE(LICHSULOG.time_dau)) AS LIST
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

const customerGetThongKeTruyCapService = async (filterParam) => {
  let { thongKeType, startDate, endDate } = filterParam;
  if (thongKeType) {
    if (thongKeType === "7days") {
      const thong_ke = await queryTruyCapByNumberDay(6);
      return thong_ke;
    } else if (thongKeType === "15days") {
      const thong_ke = await queryTruyCapByNumberDay(14);
      return thong_ke;
    } else if (thongKeType === "30days") {
      const thong_ke = await queryTruyCapByNumberDay(29);
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

    const thong_ke = await queryTruyCapByBetweenTwoDay(startDate, endDate);
    return thong_ke;
  }
};

module.exports = {
  adminCountTopService,
  customerGetThongKeUserService,
  customerGetThongKeMonAnService,
  customerGetThongKeTruyCapService,
};
