const { Op } = require("sequelize");
const { LichSuLog, sequelize, User } = require("../../../models");
const getAll = async () => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const list = await LichSuLog.findAll({
        order: [["time_cuoi", "DESC"]],
        include: [
          { model: User, attributes: ["username", "user_id", "image_url"] },
        ],
      });
      return list;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminGetAllLichSuLogService = async () => {
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

const checkLichSuLogID = async (id_lichsu) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const muc_tieu = await LichSuLog.findOne({
        include: [{ model: User }],
        where: {
          id_lichsu,
        },
      });
      return muc_tieu;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const deleteLichSuLog = async (id_lichsu) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const muc_tieu = await LichSuLog.destroy(
        {
          where: {
            id_lichsu,
          },
        },
        { transaction: t }
      );
      return muc_tieu;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminDeleteLichSuLogService = async (id_lichsu, queryParam) => {
  const check_lichsulog = await checkLichSuLogID(id_lichsu);
  if (check_lichsulog) {
    const delete_result = await deleteLichSuLog(id_lichsu);
    if (delete_result) {
      const list = await getAllOfset(queryParam);
      return {
        status: true,
        data: list,
        page: null,
        message:
          "Xóa lịch sử đăng nhập của user " +
          check_lichsulog.User.username +
          " thành công",
      };
    } else {
      return {
        status: false,
        message:
          "Xóa lịch sử đăng nhập của user " +
          check_lichsulog.User.username +
          " thất bại",
      };
    }
  } else if (check_lichsulog === null) {
    return {
      status: false,
      message: "Mục tiêu không tồn tại trên hệ thống.",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const getAllOfset = async (queryParam) => {
  const { offset, limit, sort, type, keyword } = queryParam;
  try {
    const result = await sequelize.transaction(async (t) => {
      const list = await LichSuLog.findAll({
        order: [[sort, type]],
        offset: Number(offset),
        limit: Number(limit),
        include: [
          { model: User, attributes: ["username", "user_id", "image_url"] },
        ],
        where: {
          [Op.or]: [
            {
              id_lichsu: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              "$User.username$": {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
        },
      });
      return list;
    });

    return result;
  } catch (error) {
    return false;
  }
};

const adminOffsetService = async (queryParam) => {
  const result = await getAllOfset(queryParam);
  if (result) {
    return {
      status: true,
      data: result,
      page: null,
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

module.exports = {
  adminGetAllLichSuLogService,
  adminDeleteLichSuLogService,
  adminOffsetService,
};
