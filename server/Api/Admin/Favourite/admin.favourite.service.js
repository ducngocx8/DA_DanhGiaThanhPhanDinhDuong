const { sequelize, MonAn, Favourite, User } = require("../../../models");
const getAll = async () => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const favouriteList = await Favourite.findAll({
        order: [["id_monan", "ASC"]],
        include: [{ model: MonAn }],
      });
      return favouriteList;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const adminGetAllFavouriteService = async () => {
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

const checkMonAnIDExist = async (id_monan) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const mon_an = await MonAn.findOne({
        where: {
          id_monan,
        },
      });
      return mon_an;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const checkUserIDExist = async (user_id) => {
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

const checkFavouriteExist = async (user_id, id_monan) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const favourite = await Favourite.findOne({
        where: {
          user_id,
          id_monan,
        },
      });
      return favourite;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const AddFavourite = async (user_id, id_monan) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const favourite = await Favourite.create(
        {
          user_id: Number(user_id),
          id_monan: Number(id_monan),
        },
        { transaction: t }
      );
      return favourite;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const deleteFavourite = async (user_id, id_monan) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const favourite = await Favourite.destroy(
        {
          where: {
            user_id: Number(user_id),
            id_monan: Number(id_monan),
          },
        },
        { transaction: t }
      );
      return favourite;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminAddFavouriteService = async (user_id, id_monan) => {
  const checkList = await Promise.all([
    Promise.resolve(checkMonAnIDExist(id_monan)),
    Promise.resolve(checkUserIDExist(user_id)),
    Promise.resolve(checkFavouriteExist(user_id, id_monan)),
  ]);
  console.log("checkList", checkList);
  if (checkList[0] === null) {
    return {
      status: false,
      message: "Món ăn không tồn tại trên hệ thống.",
    };
  }

  if (checkList[1] === null) {
    return {
      status: false,
      message: "Người dùng không tồn tại trên hệ thống.",
    };
  }

  if (
    checkList[0] === false ||
    checkList[1] === false ||
    checkList[2] === false
  ) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
  // checkList[2] === null => Chưa thích => Add
  if (checkList[2] === null) {
    const add_result = await AddFavourite(user_id, id_monan);
    if (add_result) {
      const favouriteList = await getAll();
      return {
        status: true,
        data: favouriteList,
        message:
          "Thêm Món ăn vào danh sách yêu thích của người dùng thành công.",
      };
    } else {
      return {
        status: false,
        message: "Thêm Món ăn vào danh sách yêu thích của người dùng thất bại.",
      };
    }
  } else {
    return {
      status: false,
      message: "Người dùng đã thêm Món ăn vào danh sách yêu thích trước đó.",
    };
  }
};

const adminDeleteFavouriteService = async (user_id, id_monan) => {
  const checkList = await Promise.all([
    Promise.resolve(checkFavouriteExist(user_id, id_monan)),
  ]);
  console.log("checkList", checkList);
  if (checkList[0] === null) {
    return {
      status: false,
      message:
        "Món ăn không tồn tại trong danh sách món ăn yêu thích của người dùng.",
    };
  }

  if (checkList[0] === false) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
  // checkList[0] !== null/false => Đã thích => Remove
  if (checkList[0]) {
    const delete_result = await deleteFavourite(user_id, id_monan);
    if (delete_result) {
      const favouriteList = await getAll();
      return {
        status: true,
        data: favouriteList,
        message: "Xóa Món ăn khỏi danh sách yêu thích của người dùng thành công.",
      };
    } else {
      return {
        status: false,
        message: "Xóa Món ăn khỏi danh sách yêu thích của người dùng thất bại.",
      };
    }
  }
};

module.exports = {
  adminAddFavouriteService,
  adminDeleteFavouriteService,
  adminGetAllFavouriteService,
};
