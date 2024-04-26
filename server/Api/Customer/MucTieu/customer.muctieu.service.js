const { MucTieu, sequelize, User } = require("../../../models");
const {
  customerGetKhuyenNghiService,
} = require("../DeXuat/customer.khuyennghi.service");
const getAll = async (user_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const mucTieuList = await MucTieu.findAll({
        order: [["time", "DESC"]],
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

const getMucTieuHomNay = async (user_id) => {
  try {
    const dateNow = new Date();
    const date_string =
      dateNow.getFullYear() +
      "" +
      (dateNow.getMonth() + 1) +
      "" +
      dateNow.getDate() +
      "";
    const muctieu_id = "GOAL" + date_string + user_id;
    const result = await sequelize.transaction(async (t) => {
      const muc_tieu_hom_nay = await MucTieu.findOne({
        include: [
          {
            model: User,
            attributes: ["username", "user_id", "image_url"],
          },
        ],
        where: {
          user_id: user_id,
          muctieu_id,
        },
      });
      return muc_tieu_hom_nay;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const customerGetAllMucTieuService = async (user_id) => {
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

const customerGetMucTieuHomNayService = async (user_id) => {
  const result = await getMucTieuHomNay(user_id);
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

const customerGetMucTieuTheoNgayService = async (user_id, date_selected) => {
  const dateNow = new Date(date_selected);
  const date_string =
    dateNow.getFullYear() +
    "" +
    (dateNow.getMonth() + 1) +
    "" +
    dateNow.getDate() +
    "";
  const muctieu_id = "GOAL" + date_string + user_id;
  const check_muctieu_id = await checkMucTieuID(muctieu_id);
  console.log(check_muctieu_id);
  if (check_muctieu_id) {
    return {
      status: true,
      data: check_muctieu_id,
      type: "MUCTIEU",
    };
  } else if (check_muctieu_id === null) {
    // Check khuyến nghị
    const khuyen_nghi = await customerGetKhuyenNghiService(user_id);
    if (khuyen_nghi.data) {
      const ENERC = Number(
        khuyen_nghi.data.ThanhPhanNhuCau["NangLuong"].match(/\d+/)
          ? khuyen_nghi.data.ThanhPhanNhuCau["NangLuong"].match(/\d+/)[0]
          : 0
      );
      const PROCNT = Number(
        khuyen_nghi.data.ThanhPhanNhuCau["Protein"].match(/\d+/)
          ? khuyen_nghi.data.ThanhPhanNhuCau["Protein"].match(/\d+/)[0]
          : 0
      );
      const FAT = Number(
        khuyen_nghi.data.ThanhPhanNhuCau["Lipid"].match(/\d+/)
          ? khuyen_nghi.data.ThanhPhanNhuCau["Lipid"].match(/\d+/)[0]
          : 0
      );
      const CHOCDF = Number(
        khuyen_nghi.data.ThanhPhanNhuCau["Glucid"].match(/\d+/)
          ? khuyen_nghi.data.ThanhPhanNhuCau["Glucid"].match(/\d+/)[0]
          : 0
      );
      return {
        status: true,
        data: {
          ENERC,
          PROCNT,
          FAT,
          CHOCDF,
        },
        type: "MUCTIEU",
      };
    }
    const dateCurrent = new Date();
    const date_current_string =
      dateCurrent.getFullYear() +
      "" +
      (dateCurrent.getMonth() + 1) +
      "" +
      dateCurrent.getDate() +
      "";
    if (date_string === date_current_string) {
      return {
        status: true,
        message: "Bạn chưa tạo mục tiêu của ngày hôm nay",
        must: "create_muctieu",
        data: null,
        type: "MUCTIEU",
      };
    } else {
      return {
        status: true,
        message:
          "Bạn chưa tạo mục tiêu của ngày " +
          dateNow.getDate() +
          "/" +
          (dateNow.getMonth() + 1) +
          "/" +
          dateNow.getFullYear(),
        data: null,
        type: "MUCTIEU",
      };
    }
  } else {
    return {
      status: false,
      message: "Lỗi lấy thông tin mục tiêu, vui lòng thử lại sau.",
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

const checkMucTieuID = async (muctieu_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const muc_tieu = await MucTieu.findOne({
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

const AddMucTieu = async (mucTieuBody, user_id, muctieu_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const { ENERC, PROCNT, FAT, CHOCDF, note } = mucTieuBody;
      const muc_tieu = await MucTieu.create(
        {
          ENERC: Number(ENERC),
          PROCNT: Number(PROCNT),
          FAT: Number(FAT),
          CHOCDF: Number(CHOCDF),
          note: note.trim() || "",
          user_id: Number(user_id),
          time: Date.now(),
          muctieu_id,
        },
        { transaction: t }
      );
      return muc_tieu;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const customerAddMucTieuService = async (mucTieuBody, user_id) => {
  const dateNow = new Date();
  const date_string =
    dateNow.getFullYear() +
    "" +
    (dateNow.getMonth() + 1) +
    "" +
    dateNow.getDate() +
    "";
  const muctieu_id = "GOAL" + date_string + user_id;
  const checkList = await Promise.all([
    Promise.resolve(CheckUserIDExist(user_id)),
    Promise.resolve(checkMucTieuID(muctieu_id)),
  ]);

  if (checkList[0] === null) {
    return {
      status: false,
      message: "Người dùng không tồn tại trên hệ thống.",
    };
  }

  if (checkList[0] === false || checkList[1] === false) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }

  // Chưa có mục tiêu trong ngày hôm nay => ADD
  if (checkList[1] === null) {
    const add_result = await AddMucTieu(mucTieuBody, user_id, muctieu_id);
    if (add_result) {
      const muc_tieu_hom_nay = await getMucTieuHomNay(user_id);
      return {
        status: true,
        data: muc_tieu_hom_nay,
        message: "Tạo mục tiêu hôm nay thành công",
      };
    } else {
      return {
        status: false,
        message: "Tạo mục tiêu hôm nay thất bại",
      };
    }
  } else {
    //  Đã có mục tiêu trong ngày hôm nay => UPDATE
    const update_result = await updateMucTieu(mucTieuBody, user_id, muctieu_id);
    if (update_result) {
      const muc_tieu_hom_nay = await getMucTieuHomNay(user_id);
      return {
        status: true,
        data: muc_tieu_hom_nay,
        message: "Cập nhật mục tiêu hôm nay thành công",
      };
    } else {
      return {
        status: false,
        message: "Cập nhật mục tiêu hôm nay thất bại",
      };
    }
  }
};

const updateMucTieu = async (mucTieuBody, user_id, muctieu_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const { ENERC, PROCNT, FAT, CHOCDF, note } = mucTieuBody;
      const muc_tieu = await MucTieu.update(
        {
          ENERC: Number(ENERC),
          PROCNT: Number(PROCNT),
          FAT: Number(FAT),
          CHOCDF: Number(CHOCDF),
          note: note.trim() || "",
          time: Date.now(),
        },
        {
          where: {
            muctieu_id,
            user_id,
          },
        },
        { transaction: t }
      );
      return muc_tieu;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// const customerUpdateMucTieuService = async (mucTieuBody, user_id) => {
//   const dateNow = new Date();
//   const date_string =
//     dateNow.getFullYear() +
//     "" +
//     (dateNow.getMonth() + 1) +
//     "" +
//     dateNow.getDate() +
//     "";
//   const muctieu_id = "GOAL" + date_string + user_id;
//   const checkList = await Promise.all([
//     Promise.resolve(CheckUserIDExist(user_id)),
//     Promise.resolve(checkMucTieuID(muctieu_id)),
//   ]);

//   if (checkList[0] === null) {
//     return {
//       status: true,
//       message: "Người dùng không tồn tại trên hệ thống.",
//     };
//   }

//   if (checkList[0] === false || checkList[1] === false) {
//     return {
//       status: false,
//       message: "Lỗi hệ thống, vui lòng thử lại sau.",
//     };
//   }

//   // Chưa có mục tiêu trong ngày hôm nay => RETURN
//   if (checkList[1] === null) {
//     return {
//       status: false,
//       message: "Bạn chưa tạo mục tiêu cho ngày hôm nay.",
//     };
//   } else {
//     //  Đã có mục tiêu trong ngày hôm nay => UPDATE
//     const add_result = await updateMucTieu(mucTieuBody, user_id, muctieu_id);
//     if (add_result) {
//       const muc_tieu_hom_nay = await getMucTieuHomNay(user_id);
//       return {
//         status: true,
//         data: muc_tieu_hom_nay,
//         message: "Cập nhật Mục tiêu hôm nay thành công",
//       };
//     } else {
//       return {
//         status: false,
//         message: "Cập nhật Mục tiêu hôm nay thất bại",
//       };
//     }
//   }
// };

const deleteMucTieu = async (muctieu_id, user_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const muc_tieu = await MucTieu.destroy(
        {
          where: {
            muctieu_id,
            user_id,
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

const customerDeleteMucTieuService = async (muctieu_id, user_id) => {
  const checkList = await Promise.all([
    Promise.resolve(CheckUserIDExist(user_id)),
    Promise.resolve(checkMucTieuID(muctieu_id)),
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
      message: "Mục tiêu không tồn tại trên hệ thống.",
    };
  }

  if (checkList[0] === false || checkList[1] === false) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }

  const delete_result = await deleteMucTieu(muctieu_id, user_id);
  if (delete_result) {
    const mucTieuList = await getAll(user_id);
    return {
      status: true,
      data: mucTieuList,
      message: "Xóa mục tiêu " + muctieu_id + " thành công.",
    };
  } else {
    return {
      status: false,
      message: "Xóa mục tiêu " + muctieu_id + " thất bại.",
    };
  }
};

module.exports = {
  customerGetAllMucTieuService,
  customerAddMucTieuService,
  customerDeleteMucTieuService,
  customerGetMucTieuHomNayService,
  customerGetMucTieuTheoNgayService,
  getMucTieuHomNay,
  // customerUpdateMucTieuService,
};
