const { Op } = require("sequelize");
const { NgayAn, sequelize, User, BuaAn, MonAn } = require("../../../models");
const getAll = async () => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const ngayAnList = await NgayAn.findAll({
        order: [["time", "DESC"]],
        include: [{ model: BuaAn }, { model: User }, { model: MonAn }],
      });
      return ngayAnList;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminGetAllNgayAnService = async () => {
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

const checkNgayAnID = async (ngayan_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const ngay_an = await NgayAn.findOne({
        where: {
          ngayan_id,
        },
        include: [{ model: BuaAn }, { model: User }, { model: MonAn }],
      });
      return ngay_an;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const deleteNgayAn = async (ngayan_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const ngay_an = await NgayAn.destroy(
        {
          where: {
            ngayan_id: Number(ngayan_id),
          },
        },
        { transaction: t }
      );
      return ngay_an;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminDeleteNgayAnService = async (ngayan_id, queryParam) => {
  const check_id = await checkNgayAnID(ngayan_id);
  if (check_id) {
    const delete_result = await deleteNgayAn(ngayan_id);
    if (delete_result) {
      const ngayAnList = await getAllOfset(queryParam);
      return {
        status: true,
        data: ngayAnList,
        page: null,
        message:
          "Xóa Món ăn khỏi bữa " +
          check_id.BuaAn.ten_bua_an +
          " của User " +
          check_id.User.username +
          " thành công.",
      };
    } else {
      return {
        status: false,
        message:
          "Xóa Món ăn khỏi bữa " +
          check_id.BuaAn.ten_bua_an +
          " của User " +
          check_id.User.username +
          " thất bại.",
      };
    }
  } else if (check_id === null) {
    return {
      status: false,
      message: "Không tìm thấy ID Ngày Ăn của bữa ăn có món ăn cần xóa.",
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
      const list = await NgayAn.findAll({
        order: [[sort, type]],
        offset: Number(offset),
        limit: Number(limit),
        include: [{ model: BuaAn }, { model: User }, { model: MonAn }],
        where: {
          [Op.or]: [
            {
              ngayan_id: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              time: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              quanty: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              "$User.username$": {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              "$BuaAn.ten_bua_an$": {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              "$MonAn.ten_mon$": {
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
  adminGetAllNgayAnService,
  adminDeleteNgayAnService,
  adminOffsetService,
};
