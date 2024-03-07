const {
  LaoDong,
  sequelize,
  NhuCauHangNgay,
  ChiSoUser,
} = require("../../../models");
const { Op } = require("sequelize");
const getAll = async () => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const laoDongList = await LaoDong.findAll({
        order: [["id_laodong", "ASC"]],
      });
      return laoDongList;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminGetAllLaoDongService = async () => {
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

const checkTenLaoDong = async (TenLaoDong, status, id_laodong) => {
  // status 1: Add (không yêu cầu id), status 2: Update (yêu cầu id)
  let whereObject = {};
  if (status === "ADD") {
    whereObject = {
      TenLaoDong: TenLaoDong,
    };
  } else if (status === "UPDATE") {
    whereObject = {
      [Op.and]: [
        { TenLaoDong: TenLaoDong },
        { id_laodong: { [Op.not]: id_laodong } },
      ],
    };
  }
  try {
    const result = await sequelize.transaction(async (t) => {
      const doi_tuong = await LaoDong.findOne({
        where: whereObject,
      });
      return doi_tuong;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const AddLaoDong = async (TenLaoDong) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const doi_tuong = await LaoDong.create(
        {
          TenLaoDong: String(TenLaoDong).trim(),
        },
        { transaction: t }
      );
      return doi_tuong;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminAddLaoDongService = async (TenLaoDong, queryParam) => {
  TenLaoDong = String(TenLaoDong).trim();
  const check_name = await checkTenLaoDong(TenLaoDong, "ADD", -1);
  if (check_name === null) {
    const add_result = await AddLaoDong(TenLaoDong);
    if (add_result) {
      const laoDongList = await getAllOfset(queryParam);
      const page = await findItem(queryParam, TenLaoDong);
      return {
        status: true,
        data: laoDongList,
        page: page,
        message: "Thêm Lao động thành công",
      };
    } else {
      return {
        status: false,
        message: "Thêm Lao động thất bại",
      };
    }
  } else if (check_name !== null) {
    return {
      status: false,
      message: "Tên Lao động đã tồn tại trên hệ thống",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const checkLaoDongID = async (id_laodong) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const doi_tuong = await LaoDong.findOne({
        where: {
          id_laodong,
        },
      });
      return doi_tuong;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const checkLaoDongHasNhuCau = async (id_laodong) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhuCauHangNgay = await NhuCauHangNgay.findOne({
        where: {
          id_laodong,
        },
      });
      return nhuCauHangNgay;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const checkLaoDongHasChiSoUser = async (id_laodong) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const chiSoUser = await ChiSoUser.findOne({
        where: {
          id_laodong,
        },
      });
      return chiSoUser;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const deleteLaoDong = async (id_laodong) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const doi_tuong = await LaoDong.destroy(
        {
          where: {
            id_laodong: Number(id_laodong),
          },
        },
        { transaction: t }
      );
      return doi_tuong;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminDeleteLaoDongService = async (id_laodong, queryParam) => {
  const check_id_laodong = await checkLaoDongID(id_laodong);
  if (check_id_laodong) {
    const checkList = await Promise.all([
      Promise.resolve(checkLaoDongHasNhuCau(id_laodong)),
      Promise.resolve(checkLaoDongHasChiSoUser(id_laodong)),
    ]);
    console.log("checkList", checkList);
    if (checkList[0] === null && checkList[1] === null) {
      const delete_result = await deleteLaoDong(id_laodong);
      if (delete_result) {
        const laoDongList = await getAllOfset(queryParam);
        return {
          status: true,
          data: laoDongList,
          page: null,
          message: "Xóa Lao động thành công",
        };
      } else {
        return {
          status: false,
          message: "Xóa Lao động thất bại",
        };
      }
    } else if (checkList[0] !== null || checkList[1] !== null) {
      return {
        status: false,
        message:
          "Lao động đang nằm trong chỉ số user hoặc nhu cầu hàng ngày. Không thể xóa",
      };
    } else {
      return {
        status: false,
        message: "Lỗi hệ thống, vui lòng thử lại sau.",
      };
    }
  } else if (check_id_laodong === null) {
    return {
      status: false,
      message: "Lao động không tồn tại trên hệ thống.",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const updateLaoDong = async (id_laodong, TenLaoDong) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const doi_tuong = await LaoDong.update(
        {
          TenLaoDong: TenLaoDong.trim(),
        },
        {
          where: {
            [Op.and]: [{ id_laodong }],
          },
        },
        { transaction: t }
      );
      return doi_tuong;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const adminUpdateLaoDongService = async (
  id_laodong,
  TenLaoDong,
  queryParam
) => {
  const check_id_laodong = await checkLaoDongID(id_laodong);
  if (check_id_laodong) {
    const check_name = await checkTenLaoDong(TenLaoDong, "UPDATE", id_laodong);
    if (check_name === null) {
      const update_result = await updateLaoDong(id_laodong, TenLaoDong);
      if (update_result) {
        const laoDongList = await getAllOfset(queryParam);
        const page = await findItem(queryParam, TenLaoDong);
        return {
          status: true,
          data: laoDongList,
          page: page,
          message: "Cập nhật thông tin Lao động thành công",
        };
      } else {
        return {
          status: false,
          message: "Cập nhật thông tin Lao động thất bại",
        };
      }
    } else if (check_name !== null) {
      return {
        status: false,
        message: "Tên Lao động đã tồn tại trên hệ thống.",
      };
    } else {
      return {
        status: false,
        message: "Lỗi hệ thống, vui lòng thử lại sau.",
      };
    }
  } else if (check_id_laodong === null) {
    return {
      status: false,
      message: "Lao động không tồn tại trên hệ thống.",
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
      const nhomThucPhamList = await LaoDong.findAll({
        order: [[sort, type]],
        offset: Number(offset),
        limit: Number(limit),
        where: {
          [Op.or]: [
            {
              id_laodong: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              TenLaoDong: {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
        },
      });
      return nhomThucPhamList;
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

const findItem = async (queryParam, find_value) => {
  const { limit, sort, type, keyword } = queryParam;
  try {
    const result = await sequelize.transaction(async (t) => {
      const list = await LaoDong.findAll({
        order: [[sort, type]],
        where: {
          [Op.or]: [
            {
              id_laodong: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              TenLaoDong: {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
        },
      });
      return list;
    });

    const find_index = result.findIndex(
      (item) =>
        String(item.TenLaoDong).trim().toLocaleLowerCase() ===
        String(find_value).trim().toLocaleLowerCase()
    );

    if (find_index !== -1) {
      const page_count = (find_index + 1) % limit;
      if (page_count === 0) {
        return (find_index + 1) / limit;
      } else {
        return Math.floor((find_index + 1) / limit) + 1;
      }
    }
    return 1;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  adminGetAllLaoDongService,
  adminAddLaoDongService,
  adminDeleteLaoDongService,
  adminUpdateLaoDongService,
  adminOffsetService,
};
