const { Op } = require("sequelize");
const {
  ChiSoUser,
  sequelize,
  User,
  LaoDong,
  DoiTuong,
} = require("../../../models");
const getAll = async () => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const chiSoUserList = await ChiSoUser.findAll({
        order: [["time_update", "DESC"]],
        include: [
          {
            model: User,
            attributes: ["username", "user_id", "image_url"],
          },
          {
            model: LaoDong,
          },
          { model: DoiTuong },
        ],
      });
      return chiSoUserList;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminGetAllChiSoUserService = async () => {
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

const checkChiSoUserID = async (id_chiso) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const chi_so_user = await ChiSoUser.findOne({
        where: {
          id_chiso,
        },
      });
      return chi_so_user;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const deleteChiSoUser = async (id_chiso) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const chi_so_user = await ChiSoUser.destroy(
        {
          where: {
            id_chiso: id_chiso,
          },
        },
        { transaction: t }
      );
      return chi_so_user;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminDeleteChiSoUserService = async (id_chiso, queryParam) => {
  const check_id_chiso = await checkChiSoUserID(id_chiso);
  if (check_id_chiso) {
    const delete_result = await deleteChiSoUser(id_chiso);
    if (delete_result) {
      const chiSoUserList = await getAllOfset(queryParam);
      return {
        status: true,
        data: chiSoUserList,
        page: null,
        message: "Xóa Chỉ số User thành công",
      };
    } else {
      return {
        status: false,
        message: "Xóa Chỉ số User thất bại",
      };
    }
  } else if (check_id_chiso === null) {
    return {
      status: false,
      message: "Chỉ số User không tồn tại trên hệ thống.",
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
      const list = await ChiSoUser.findAll({
        order: [[sort, type]],
        offset: Number(offset),
        limit: Number(limit),
        include: [{ model: User }, { model: LaoDong }, { model: DoiTuong }],
        where: {
          [Op.or]: [
            {
              id_chiso: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              age: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              height: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              weight: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              gender: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              time_update: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              "$User.username$": {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              "$LaoDong.TenLaoDong$": {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              "$DoiTuong.TenDoiTuong$": {
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
  adminGetAllChiSoUserService,
  adminDeleteChiSoUserService,
  adminOffsetService,
};
