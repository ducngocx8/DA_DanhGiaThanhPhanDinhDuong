const { Op } = require("sequelize");
const { MucTieu, sequelize, User } = require("../../../models");
const getAll = async () => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const mucTieuList = await MucTieu.findAll({
        order: [["time", "DESC"]],
        include: [{ model: User }],
      });
      return mucTieuList;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminGetAllMucTieuService = async () => {
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

const checkMucTieuID = async (muctieu_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const muc_tieu = await MucTieu.findOne({
        include: [{ model: User }],
        where: {
          muctieu_id,
        },
      });
      return muc_tieu;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const deleteMucTieu = async (muctieu_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const muc_tieu = await MucTieu.destroy(
        {
          where: {
            muctieu_id,
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

const adminDeleteMucTieuService = async (muctieu_id, queryParam) => {
  const check_muctieu = await checkMucTieuID(muctieu_id);
  if (check_muctieu) {
    const delete_result = await deleteMucTieu(muctieu_id);
    if (delete_result) {
      const mucTieuList = await getAllOfset(queryParam);
      return {
        status: true,
        data: mucTieuList,
        page: null,
        message:
          "Xóa mục tiêu của user " +
          check_muctieu.User.username +
          " thành công",
      };
    } else {
      return {
        status: false,
        message:
          "Xóa mục tiêu của user " + check_muctieu.User.username + " thất bại",
      };
    }
  } else if (check_muctieu === null) {
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
      const list = await MucTieu.findAll({
        order: [[sort, type]],
        offset: Number(offset),
        limit: Number(limit),
        include: [{ model: User }],
        where: {
          [Op.or]: [
            {
              muctieu_id: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              ENERC: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              PROCNT: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              FAT: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              CHOCDF: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              note: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              time: {
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
  adminGetAllMucTieuService,
  adminDeleteMucTieuService,
  adminOffsetService,
};
