const { sequelize, ThucPhamChon, ThucPham, User } = require("../../../models");
const getAll = async (user_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const thucPhamChonList = await ThucPhamChon.findAll({
        order: [["id", "ASC"]],
        include: [{ model: ThucPham }, { model: User }],
        where: {
          user_id,
        },
      });
      return thucPhamChonList;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const customerGetAllThucPhamChonService = async (user_id) => {
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

const checkThucPhamIDExist = async (id_thucpham) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const thuc_pham = await ThucPham.findOne({
        where: {
          id_thucpham,
          thucpham_status: true,
        },
      });
      return thuc_pham;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const checkThucPhamIDUpdateExist = async (id_thucpham) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const thuc_pham = await ThucPham.findOne({
        where: {
          id_thucpham,
        },
      });
      return thuc_pham;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const checkThucPhamChonExist = async (user_id, id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const thuc_pham_chon = await ThucPhamChon.findOne({
        where: {
          user_id,
          id,
        },
      });
      return thuc_pham_chon;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const AddThucPhamChon = async (user_id, thucPhamChonBody) => {
  try {
    const { quanty, id_thucpham } = thucPhamChonBody;
    const result = await sequelize.transaction(async (t) => {
      const thuc_pham_chon = await ThucPhamChon.create(
        {
          user_id: Number(user_id),
          id_thucpham: id_thucpham,
          quanty,
        },
        { transaction: t }
      );
      return thuc_pham_chon;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const updateThucPhamChon = async (user_id, id, thucPhamChonBody) => {
  try {
    const { quanty, id_thucpham } = thucPhamChonBody;
    const result = await sequelize.transaction(async (t) => {
      const thuc_pham_chon = await ThucPhamChon.update(
        {
          id_thucpham: id_thucpham,
          quanty,
        },
        {
          where: {
            id,
            user_id,
          },
        },
        { transaction: t }
      );
      return thuc_pham_chon;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const deleteThucPhamChon = async (user_id, id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const thuc_pham_chon = await ThucPhamChon.destroy(
        {
          where: {
            user_id: Number(user_id),
            id: Number(id),
          },
        },
        { transaction: t }
      );
      return thuc_pham_chon;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const customerAddThucPhamChonService = async (user_id, thucPhamChonBody) => {
  const { id_thucpham } = thucPhamChonBody;
  const checkList = await Promise.all([
    Promise.resolve(checkThucPhamIDExist(id_thucpham)),
  ]);
  console.log("checkList", checkList);
  if (checkList[0] === null) {
    return {
      status: false,
      message: "Thực phẩm không tồn tại trên hệ thống.",
    };
  }
  if (checkList[0] === false) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }

  const add_result = await AddThucPhamChon(user_id, thucPhamChonBody);
  if (add_result) {
    const thucPhamChonList = await getAll(user_id);
    return {
      status: true,
      data: thucPhamChonList,
      message: "Thêm Thực phẩm vào danh sách đã chọn thành công.",
    };
  } else {
    return {
      status: false,
      message: "Thêm Thực phẩm vào danh sách đã chọn thất bại.",
    };
  }
};

const customerUpdateThucPhamChonService = async (
  user_id,
  id,
  thucPhamChonBody
) => {
  const { id_thucpham } = thucPhamChonBody;
  const checkList = await Promise.all([
    Promise.resolve(checkThucPhamChonExist(user_id, id)),
    Promise.resolve(checkThucPhamIDUpdateExist(id_thucpham)),
  ]);
  console.log("checkList", checkList);
  if (checkList[0] === null) {
    return {
      status: false,
      message:
        "Mã Thực phẩm chọn không tồn tại trong danh sách đã chọn của bạn.",
    };
  }

  if (checkList[1] === null) {
    return {
      status: false,
      message: "Thực phẩm không tồn tại trên hệ thống.",
    };
  }

  if (checkList[0] === false || checkList[1] === false) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
  const update_result = await updateThucPhamChon(user_id, id, thucPhamChonBody);
  if (update_result) {
    const thucPhamChonList = await getAll(user_id);
    return {
      status: true,
      data: thucPhamChonList,
      message: "Cập nhật Thực phẩm trong danh sách đã chọn thành công.",
    };
  } else {
    return {
      status: false,
      message: "Cập nhật Thực phẩm trong danh sách đã chọn thất bại.",
    };
  }
};

const customerDeleteThucPhamChonService = async (user_id, id) => {
  const checkList = await Promise.all([
    Promise.resolve(checkThucPhamChonExist(user_id, id)),
  ]);
  console.log("checkList", checkList);
  if (checkList[0] === null) {
    return {
      status: false,
      message:
        "Mã Thực phẩm chọn không tồn tại trong danh sách đã chọn của bạn.",
    };
  }
  if (checkList[0] === false) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
  const delete_result = await deleteThucPhamChon(user_id, id);
  if (delete_result) {
    const thucPhamChonList = await getAll(user_id);
    return {
      status: true,
      data: thucPhamChonList,
      message: "Xóa Thực Phẩm khỏi danh sách đã chọn thành công.",
    };
  } else {
    return {
      status: false,
      message: "Xóa Thực Phẩm khỏi danh sách đã chọn thất bại.",
    };
  }
};

module.exports = {
  customerGetAllThucPhamChonService,
  customerAddThucPhamChonService,
  customerDeleteThucPhamChonService,
  customerUpdateThucPhamChonService,
};
