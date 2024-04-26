const { QueryTypes } = require("sequelize");
const { sequelize, MonAn, Favourite } = require("../../../models");
const getAll = async (user_id) => {
  const query = `SELECT MONAN.id_monan, MONAN.ten_mon, MONAN.don_vi, FAVOURITE.user_id, MONAN.image_url, MONAN.id_nhommonan, NHOMMONAN.ten_nhom, 
  SUM(CHITIETMON.quanty * THUCPHAM.ENERC / 100) AS ENERC, SUM(CHITIETMON.quanty * THUCPHAM.PROCNT / 100) AS PROCNT,
  SUM(CHITIETMON.quanty * THUCPHAM.FAT / 100) AS FAT, SUM(CHITIETMON.quanty * THUCPHAM.CHOCDF / 100) AS CHOCDF FROM FAVOURITE
  INNER JOIN MONAN
  ON FAVOURITE.id_monan = MONAN.id_monan AND FAVOURITE.user_id = ${user_id} AND (MONAN.user_id = ${user_id} OR (MONAN.user_id IS NULL AND MONAN.monan_status = true))
  INNER JOIN NHOMMONAN
  ON NHOMMONAN.id_nhommonan = MONAN.id_nhommonan
  INNER JOIN CHITIETMON
  ON CHITIETMON.id_monan = MONAN.id_monan
  INNER JOIN THUCPHAM
  ON THUCPHAM.id_thucpham = CHITIETMON.id_thucpham
  GROUP BY MONAN.id_monan, MONAN.user_id`;

  try {
    const result = await sequelize.transaction(async (t) => {
      const favouriteList = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
      return favouriteList;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const customerGetAllFavouriteService = async (user_id) => {
  if (!user_id) {
    return {
      status: true,
      data: [],
    };
  }

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

const customerCheckMonAnFavouriteService = async (user_id, id_monan) => {
  if (!user_id) {
    return {
      status: true,
      data: false,
    };
  }
  try {
    const result = await sequelize.transaction(async (t) => {
      const favourite = await Favourite.findOne({
        where: {
          user_id,
          id_monan,
        },
      });
      if (favourite) {
        return {
          status: true,
          data: true,
        };
      } else {
        return {
          status: true,
          data: false,
        };
      }
    });
    return result;
  } catch (error) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
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

const customerToggleFavouriteService = async (user_id, id_monan) => {
  const checkList = await Promise.all([
    Promise.resolve(checkMonAnIDExist(id_monan)),
    Promise.resolve(checkFavouriteExist(user_id, id_monan)),
  ]);
  console.log("checkList", checkList);
  if (checkList[0] === null) {
    return {
      status: false,
      message: "Món ăn không tồn tại trên hệ thống.",
    };
  }
  if (checkList[0] === false || checkList[1] === false) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
  // checkList[1] === null => Chưa thích => Add
  // checkList[1] !== null => Đã thích => Remove
  if (checkList[1] === null) {
    const add_result = await AddFavourite(user_id, id_monan);
    if (add_result) {
      const favouriteList = await getAll(user_id);
      return {
        status: true,
        data: favouriteList,
        message: "Thêm Món ăn vào danh sách yêu thích thành công.",
        type: "ADD",
      };
    } else {
      return {
        status: false,
        message: "Thêm Món ăn vào danh sách yêu thích thất bại.",
      };
    }
  } else {
    const delete_result = await deleteFavourite(user_id, id_monan);
    if (delete_result) {
      const favouriteList = await getAll(user_id);
      return {
        status: true,
        data: favouriteList,
        message: "Xóa Món ăn khỏi danh sách yêu thích thành công.",
        type: "DELETE",
      };
    } else {
      return {
        status: false,
        message: "Xóa Món ăn khỏi danh sách yêu thích thất bại.",
      };
    }
  }
};

module.exports = {
  customerToggleFavouriteService,
  customerGetAllFavouriteService,
  customerCheckMonAnFavouriteService,
};
