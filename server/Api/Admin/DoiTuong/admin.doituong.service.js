const {
  DoiTuong,
  sequelize,
  NhuCauHangNgay,
  ChiSoUser,
} = require("../../../models");
const { Op } = require("sequelize");
const getAll = async () => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const doiTuongList = await DoiTuong.findAll({
        order: [["id_doituong", "ASC"]],
      });
      return doiTuongList;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminGetAllDoiTuongService = async () => {
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

const checkTenDoiTuong = async (TenDoiTuong, status, id_doituong) => {
  // status 1: Add (không yêu cầu id), status 2: Update (yêu cầu id)
  let whereObject = {};
  if (status === "ADD") {
    whereObject = {
      TenDoiTuong: TenDoiTuong,
    };
  } else if (status === "UPDATE") {
    whereObject = {
      [Op.and]: [
        { TenDoiTuong: TenDoiTuong },
        { id_doituong: { [Op.not]: id_doituong } },
      ],
    };
  }
  try {
    const result = await sequelize.transaction(async (t) => {
      const doi_tuong = await DoiTuong.findOne({
        where: whereObject,
      });
      return doi_tuong;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const AddDoiTuong = async (TenDoiTuong) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const doi_tuong = await DoiTuong.create(
        {
          TenDoiTuong: String(TenDoiTuong).trim(),
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

const adminAddDoiTuongService = async (TenDoiTuong, queryParam) => {
  TenDoiTuong = String(TenDoiTuong).trim();
  const check_name = await checkTenDoiTuong(TenDoiTuong, "ADD", -1);
  if (check_name === null) {
    const add_result = await AddDoiTuong(TenDoiTuong);
    if (add_result) {
      const doiTuongList = await getAllOfset(queryParam);
      const page = await findItem(queryParam, TenDoiTuong);
      return {
        status: true,
        data: doiTuongList,
        page: page,
        message: "Thêm đối tượng thành công",
      };
    } else {
      return {
        status: false,
        message: "Thêm đối tượng thất bại",
      };
    }
  } else if (check_name !== null) {
    return {
      status: false,
      message: "Tên đối tượng đã tồn tại trên hệ thống",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const checkDoiTuongID = async (id_doituong) => {
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

const checkDoiTuongHasNhuCau = async (id_doituong) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhuCauHangNgay = await NhuCauHangNgay.findOne({
        where: {
          id_doituong,
        },
      });
      return nhuCauHangNgay;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const checkDoiTuongHasChiSoUser = async (id_doituong) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const chiSoUser = await ChiSoUser.findOne({
        where: {
          id_doituong,
        },
      });
      return chiSoUser;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const deleteDoiTuong = async (id_doituong) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const doi_tuong = await DoiTuong.destroy(
        {
          where: {
            id_doituong: Number(id_doituong),
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

const adminDeleteDoiTuongService = async (id_doituong, queryParam) => {
  const check_id_doituong = await checkDoiTuongID(id_doituong);
  if (check_id_doituong) {
    const checkList = await Promise.all([
      Promise.resolve(checkDoiTuongHasNhuCau(id_doituong)),
      Promise.resolve(checkDoiTuongHasChiSoUser(id_doituong)),
    ]);
    console.log("checkList", checkList);
    if (checkList[0] === null && checkList[1] === null) {
      const delete_result = await deleteDoiTuong(id_doituong);
      if (delete_result) {
        const doiTuongList = await getAllOfset(queryParam);
        return {
          status: true,
          data: doiTuongList,
          page: null,
          message: "Xóa đối tượng thành công",
        };
      } else {
        return {
          status: false,
          message: "Xóa đối tượng thất bại",
        };
      }
    } else if (checkList[0] !== null || checkList[1] !== null) {
      return {
        status: false,
        message:
          "Đối tượng đang nằm trong chỉ số user hoặc nhu cầu hàng ngày. Không thể xóa",
      };
    } else {
      return {
        status: false,
        message: "Lỗi hệ thống, vui lòng thử lại sau.",
      };
    }
  } else if (check_id_doituong === null) {
    return {
      status: false,
      message: "Đối tượng không tồn tại trên hệ thống.",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const updateDoiTuong = async (id_doituong, TenDoiTuong) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const doi_tuong = await DoiTuong.update(
        {
          TenDoiTuong: TenDoiTuong.trim(),
        },
        {
          where: {
            [Op.and]: [{ id_doituong }],
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

const adminUpdateDoiTuongService = async (
  id_doituong,
  TenDoiTuong,
  queryParam
) => {
  const check_id_doituong = await checkDoiTuongID(id_doituong);
  if (check_id_doituong) {
    const check_name = await checkTenDoiTuong(
      TenDoiTuong,
      "UPDATE",
      id_doituong
    );
    if (check_name === null) {
      const update_result = await updateDoiTuong(id_doituong, TenDoiTuong);
      if (update_result) {
        const doiTuongList = await getAllOfset(queryParam);
        const page = await findItem(queryParam, TenDoiTuong);
        return {
          status: true,
          data: doiTuongList,
          page: page,
          message: "Cập nhật thông tin đối tượng thành công",
        };
      } else {
        return {
          status: false,
          message: "Cập nhật thông tin đối tượng thất bại",
        };
      }
    } else if (check_name !== null) {
      return {
        status: false,
        message: "Tên đối tượng đã tồn tại trên hệ thống.",
      };
    } else {
      return {
        status: false,
        message: "Lỗi hệ thống, vui lòng thử lại sau.",
      };
    }
  } else if (check_id_doituong === null) {
    return {
      status: false,
      message: "Đối tượng không tồn tại trên hệ thống.",
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
      const list = await DoiTuong.findAll({
        order: [[sort, type]],
        offset: Number(offset),
        limit: Number(limit),
        where: {
          [Op.or]: [
            {
              id_doituong: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              TenDoiTuong: {
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

const findItem = async (queryParam, find_value) => {
  const { limit, sort, type, keyword } = queryParam;
  try {
    const result = await sequelize.transaction(async (t) => {
      const list = await DoiTuong.findAll({
        order: [[sort, type]],
        where: {
          [Op.or]: [
            {
              id_doituong: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              TenDoiTuong: {
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
        String(item.TenDoiTuong).trim().toLocaleLowerCase() ===
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
  adminGetAllDoiTuongService,
  adminAddDoiTuongService,
  adminDeleteDoiTuongService,
  adminUpdateDoiTuongService,
  adminOffsetService,
};
