const { Op, QueryTypes } = require("Sequelize");
const { ThongBao, sequelize, User } = require("../../../models");
const getAll = async () => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const thongBaoList = await ThongBao.findAll({
        order: [["user_id", "ASC"]],
        include: [
          { model: User, attributes: ["username", "user_id", "image_url"] },
        ],
      });
      return thongBaoList;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminGetAllThongBaoService = async () => {
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

const checkThongBaoUserID = async (user_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const thong_bao = await ThongBao.findOne({
        include: [
          { model: User, attributes: ["username", "user_id", "image_url"] },
        ],
        where: {
          user_id,
        },
      });
      return thong_bao;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const deleteThongBao = async (user_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const thong_bao = await ThongBao.destroy(
        {
          where: {
            user_id,
          },
        },
        { transaction: t }
      );
      return thong_bao;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminDeleteThongBaoService = async (user_id, queryParam) => {
  const check_thongbao = await checkThongBaoUserID(user_id);
  if (check_thongbao) {
    const delete_result = await deleteThongBao(user_id);
    if (delete_result) {
      const thongBaoList = await getAllOfset(queryParam);
      return {
        status: true,
        data: thongBaoList,
        page: null,
        message:
          "Xóa thông báo của user " +
          check_thongbao.User.username +
          " thành công",
      };
    } else {
      return {
        status: false,
        message:
          "Xóa thông báo của user " +
          check_thongbao.User.username +
          " thất bại",
      };
    }
  } else if (check_thongbao === null) {
    return {
      status: false,
      message: "Thông báo của User không tồn tại trên hệ thống.",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const getAllThongBaoAllowV2 = async () => {
  const query = `SELECT DISTINCT(expo_key) FROM THONGBAO
WHERE expo_key LIKE '%ExponentPushToken[%' AND status = TRUE`;

  try {
    const result = await sequelize.transaction(async (t) => {
      const thong_bao = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
      return thong_bao;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const sendThongBao = async (expo_key, thongBaoBody) => {
  return fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    body: JSON.stringify({
      to: expo_key,
      title: thongBaoBody.title,
      body: thongBaoBody.body,
    }),
  })
    .then(async (response) => {
      const result = await response.json();
      if (result.status === "ok") {
        return true;
      }
      return false;
    })
    .catch(function (err) {
      return false;
    });
};

const adminCreateThongBaoService = async (thongBaoBody) => {
  // 30 user, 4 email 1 lần =>
  const user_thongbao = await getAllThongBaoAllowV2();
  if (user_thongbao) {
    const promises = await Promise.all(
      user_thongbao.map((item) =>
        Promise.resolve(sendThongBao(item.expo_key, thongBaoBody))
      )
    );
    return {
      status: true,
      message: "Gửi thông báo thành công!",
    };
  }
  return {
    status: false,
    message: "Gửi thông báo thất bại!",
  };
};

const getAllOfset = async (queryParam) => {
  const { offset, limit, sort, type, keyword } = queryParam;
  try {
    const result = await sequelize.transaction(async (t) => {
      const list = await ThongBao.findAll({
        order: [[sort, type]],
        offset: Number(offset),
        limit: Number(limit),
        include: [
          { model: User, attributes: ["username", "user_id", "image_url"] },
        ],
        where: {
          [Op.or]: [
            {
              user_id: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              expo_key: {
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
    console.log(error);
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
  adminGetAllThongBaoService,
  adminDeleteThongBaoService,
  adminOffsetService,
  adminCreateThongBaoService,
};
