const { ThongBao, sequelize, User } = require("../../../models");
const getAll = async (user_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const thong_bao = await ThongBao.findOne({
        include: [
          {
            model: User,
            attributes: ["username", "user_id", "image_url"],
          },
        ],
        where: { user_id },
      });
      return thong_bao;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const customerGetThongBaoService = async (user_id) => {
  const result = await getAll(user_id);
  if (result !== false) {
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

const CheckThongBaoUserExist = async (user_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const thong_bao = await ThongBao.findOne({
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

const AddThongBao = async (thongBaoBody, user_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const { status, expo_key, time, repeats } = thongBaoBody;
      const thong_bao = await ThongBao.create(
        {
          status: status,
          expo_key: expo_key,
          time: time,
          repeats: repeats,
          user_id: Number(user_id),
        },
        { transaction: t }
      );
      return thong_bao;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const customerAddThongBaoService = async (thongBaoBody, user_id) => {
  const checkList = await Promise.all([
    Promise.resolve(CheckThongBaoUserExist(user_id)),
  ]);

  if (checkList[0] === false) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }

  // Chưa tạo thông báo => ADD
  if (checkList[0] === null) {
    const add_result = await AddThongBao(thongBaoBody, user_id);
    if (add_result) {
      const thong_bao = await getAll(user_id);
      return {
        status: true,
        data: thong_bao,
        message: "Tạo thông báo thành công",
      };
    } else {
      return {
        status: false,
        message: "Tạo thông báo thất bại",
      };
    }
  } else {
    //  Đã có thông báo => UPDATE
    const update_result = await updateThongBao(thongBaoBody, user_id);
    if (update_result) {
      const thong_bao = await getAll(user_id);
      return {
        status: true,
        data: thong_bao,
        message: "Cập nhật thông báo thành công",
      };
    } else {
      return {
        status: false,
        message: "Cập nhật thông báo thất bại",
      };
    }
  }
};

const updateThongBao = async (thongBaoBody, user_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const { status, expo_key, time, repeats } = thongBaoBody;
      const thong_bao = await ThongBao.update(
        {
          status: status,
          expo_key: expo_key,
          time: time,
          repeats: repeats,
        },
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
    console.log(error);
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

const customerDeleteThongBaoService = async (user_id) => {
  const checkList = await Promise.all([
    Promise.resolve(CheckThongBaoUserExist(user_id)),
  ]);

  if (checkList[0] === null) {
    return {
      status: false,
      message: "Thông báo không tồn tại trên hệ thống.",
    };
  }

  if (checkList[0] === false) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }

  const delete_result = await deleteThongBao(user_id);
  if (delete_result) {
    const thongBao = await getAll(user_id);
    return {
      status: true,
      data: thongBao,
      message: "Xóa cài đặt thông báo thành công.",
    };
  } else {
    return {
      status: false,
      message: "Xóa cài đặt thông báo thất bại.",
    };
  }
};

module.exports = {
  customerGetThongBaoService,
  customerAddThongBaoService,
  customerDeleteThongBaoService,
};
