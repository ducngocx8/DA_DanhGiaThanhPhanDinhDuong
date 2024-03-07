const {
  ChiSoUser,
  sequelize,
  User,
  LaoDong,
  DoiTuong,
} = require("../../../models");
const getAll = async (user_id) => {
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
          {
            model: DoiTuong,
          },
        ],
        where: { user_id },
      });
      return chiSoUserList;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getChiSoUserMoiNhat = async (user_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const chi_so_user_moi_nhat = await ChiSoUser.findOne({
        order: [["time_update", "DESC"]],
        include: [
          {
            model: User,
            attributes: ["username", "user_id", "image_url"],
          },
          {
            model: DoiTuong,
          },
          {
            model: LaoDong,
          },
        ],
        where: {
          user_id: user_id,
        },
      });
      return chi_so_user_moi_nhat;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const customerGetAllChiSoUserService = async (user_id) => {
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

const customerGetLastUpdateChiSoUserService = async (user_id) => {
  const result = await getChiSoUserMoiNhat(user_id);
  console.log(result);
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

const CheckLaoDongIDExist = async (id_laodong) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const lao_dong = await LaoDong.findOne({
        where: {
          id_laodong,
        },
      });
      return lao_dong;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const checkChiSoUserID = async (id_chiso, user_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const chi_so_user = await ChiSoUser.findOne({
        where: {
          id_chiso,
          user_id,
        },
      });
      return chi_so_user;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const CheckDoiTuongIDExist = async (id_doituong) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const doi_tuong = await DoiTuong.findOne({
        where: {
          id_doituong,
        },
      });
      return doi_tuong;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const AddChiSoUser = async (chiSoUserBody, id_chiso, user_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const { age, height, weight, gender, id_laodong, id_doituong } =
        chiSoUserBody;
      const chi_so_user = await ChiSoUser.create(
        {
          id_chiso: id_chiso,
          age: Number(age),
          height: Number(height),
          weight: Number(weight),
          gender: gender,
          id_laodong: Number(id_laodong),
          user_id: Number(user_id),
          id_doituong: Number(id_doituong),
          time_update: Date.now(),
        },
        { transaction: t }
      );
      return chi_so_user;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const updateChiSoUser = async (chiSoUserBody, id_chiso, user_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const { age, height, weight, gender, id_laodong, id_doituong } =
        chiSoUserBody;
      const chi_so_user = await ChiSoUser.update(
        {
          age: Number(age),
          height: Number(height),
          weight: Number(weight),
          gender: gender,
          id_laodong: Number(id_laodong),
          id_doituong: Number(id_doituong),
          time_update: Date.now(),
        },
        {
          where: {
            id_chiso,
            user_id,
          },
        },
        { transaction: t }
      );
      return chi_so_user;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// Check chỉ số của User mới nhất (Ngày gần với hiện tại) có trùng với kết quả chuẩn bị thêm hay không => Thêm hoặc không
const customerAddChiSoUserService = async (chiSoUserBody, user_id) => {
  let { age, height, weight, gender, id_laodong, id_doituong } = chiSoUserBody;
  const dateNow = new Date();
  const date_string =
    dateNow.getFullYear() +
    "" +
    (dateNow.getMonth() + 1) +
    "" +
    dateNow.getDate() +
    "";
  const id_chiso = "CHISO" + date_string + user_id;
  const checkList = await Promise.all([
    Promise.resolve(CheckUserIDExist(user_id)),
    Promise.resolve(CheckLaoDongIDExist(id_laodong)),
    Promise.resolve(CheckDoiTuongIDExist(id_doituong)),
    Promise.resolve(checkChiSoUserID(id_chiso, user_id)),
  ]);

  if (checkList[0] === null) {
    return {
      status: true,
      message: "Người dùng không tồn tại trên hệ thống.",
    };
  }

  if (checkList[1] === null) {
    return {
      status: true,
      message: "Nhóm Lao động không tồn tại trên hệ thống.",
    };
  }

  if (checkList[2] === null) {
    return {
      status: true,
      message: "Nhóm Đối tượng không tồn tại trên hệ thống.",
    };
  }

  if (
    checkList[0] === false ||
    checkList[1] === false ||
    checkList[2] === false ||
    checkList[3] === false
  ) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }

  // Check trùng với thông tin đã thêm trước đó gần nhất
  const chiSoGanNhat = await getChiSoUserMoiNhat(user_id);
  if (chiSoGanNhat === false) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }

  if (chiSoGanNhat) {
    console.log(Number(chiSoGanNhat.weight) === Number(weight.toFixed(2)));
    if (
      Number(chiSoGanNhat.age) === Number(age) &&
      Number(chiSoGanNhat.height) === Number(height) &&
      Number(chiSoGanNhat.weight) === Number(weight.toFixed(2)) &&
      chiSoGanNhat.gender === gender &&
      Number(chiSoGanNhat.id_laodong) === Number(id_laodong) &&
      Number(chiSoGanNhat.user_id) === Number(user_id) &&
      Number(chiSoGanNhat.id_doituong) === Number(id_doituong)
    ) {
      const chiSoUserList = await getChiSoUserMoiNhat(user_id);
      return {
        status: true,
        data: chiSoUserList,
        message: "Thành công! Thông tin không thay đổi.",
      };
    }
  }

  // Chỉ số user không tồn tại => Add
  if (checkList[3] === null) {
    const add_result = await AddChiSoUser(chiSoUserBody, id_chiso, user_id);
    if (add_result) {
      const chiSoUserList = await getChiSoUserMoiNhat(user_id);
      return {
        status: true,
        data: chiSoUserList,
        message: "Cập nhật Chỉ số User thành công",
      };
    } else {
      return {
        status: false,
        message: "Cập nhật Chỉ số User thất bại",
      };
    }
  } else {
    const update_result = await updateChiSoUser(
      chiSoUserBody,
      id_chiso,
      user_id
    );
    if (update_result) {
      const chiSoUserList = await getChiSoUserMoiNhat(user_id);
      return {
        status: true,
        data: chiSoUserList,
        message: "Cập nhật Chỉ số User thành công",
      };
    } else {
      return {
        status: false,
        message: "Cập nhật Chỉ số User thất bại",
      };
    }
  }
};

const deleteChiSoUser = async (id_chiso, user_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const chi_so_user = await ChiSoUser.destroy(
        {
          where: {
            id_chiso: id_chiso,
            user_id,
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

const customerDeleteChiSoUserService = async (id_chiso, user_id) => {
  const checkList = await Promise.all([
    Promise.resolve(CheckUserIDExist(user_id)),
    Promise.resolve(checkChiSoUserID(id_chiso, user_id)),
  ]);

  if (checkList[0] === null) {
    return {
      status: true,
      message: "Người dùng không tồn tại trên hệ thống.",
    };
  }

  if (checkList[1] === null) {
    return {
      status: true,
      message: "Chỉ số User không tồn tại trên hệ thống.",
    };
  }

  if (checkList[0] === false || checkList[1] === false) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }

  const delete_result = await deleteChiSoUser(id_chiso, user_id);
  if (delete_result) {
    const chiSoUserList = await getAll(user_id);
    return {
      status: true,
      data: chiSoUserList,
      message: "Xóa Chỉ số User thành công.",
    };
  } else {
    return {
      status: false,
      message: "Xóa Chỉ số User thất bại.",
    };
  }
};

module.exports = {
  customerGetAllChiSoUserService,
  customerAddChiSoUserService,
  customerDeleteChiSoUserService,
  customerGetLastUpdateChiSoUserService,
};
