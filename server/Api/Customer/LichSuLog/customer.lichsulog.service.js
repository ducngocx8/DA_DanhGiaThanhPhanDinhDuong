const { LichSuLog, sequelize, User } = require("../../../models");
const getAll = async (user_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const mucTieuList = await LichSuLog.findAll({
        order: [["time_cuoi", "DESC"]],
        include: [
          {
            model: User,
            attributes: ["username", "user_id", "image_url"],
          },
        ],
        where: { user_id },
      });
      return mucTieuList;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const customerGetAllLichSuLogService = async (user_id) => {
  const result = await getAll(user_id);
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

const CheckUserIDExist = async (user_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const user = await User.findOne({
        where: {
          user_id,
        },
      });
      return user;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const checkLichSuLogID = async (id_lichsu) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const lich_su_log = await LichSuLog.findOne({
        where: {
          id_lichsu,
        },
      });
      return lich_su_log;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const AddLichSuLog = async (user_id, id_lichsu) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const lich_su_log = await LichSuLog.create(
        {
          time_cuoi: Date.now(),
          time_dau: Date.now(),
          user_id: Number(user_id),
          id_lichsu,
        },
        { transaction: t }
      );
      return lich_su_log;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const customerHandleLichSuLogService = async (user_id) => {
  const dateNow = new Date();
  const date_string =
    dateNow.getFullYear() +
    "" +
    (dateNow.getMonth() + 1) +
    "" +
    dateNow.getDate() +
    "";
  const id_lichsu = "LOG" + date_string + user_id;
  const checkList = await Promise.all([
    Promise.resolve(CheckUserIDExist(user_id)),
    Promise.resolve(checkLichSuLogID(id_lichsu)),
  ]);

  if (checkList[0] === null) {
    return {
      status: true,
      message: "Người dùng không tồn tại trên hệ thống.",
    };
  }

  if (checkList[0] === false || checkList[1] === false) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }

  // Chưa có log trong ngày hôm nay => ADD
  if (checkList[1] === null) {
    const add_result = await AddLichSuLog(user_id, id_lichsu);
    if (add_result) {
      return true;
    } else {
      return false;
    }
  } else {
    //  Đã có log trong ngày hôm nay => UPDATE
    const update_result = await updateLichSuLog(user_id, id_lichsu);
    if (update_result) {
      return true;
    } else {
      return false;
    }
  }
};

const updateLichSuLog = async (user_id, id_lichsu) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const lich_su_log = await LichSuLog.update(
        {
          time_cuoi: Date.now(),
          time: Date.now(),
        },
        {
          where: {
            id_lichsu,
            user_id,
          },
        },
        { transaction: t }
      );
      return lich_su_log;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  customerGetAllLichSuLogService,
  customerHandleLichSuLogService,
};
