const { NhomTuoi, sequelize, NhuCauHangNgay } = require("../../../models");
const { Op } = require("Sequelize");
const getAll = async () => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhomTuoiList = await NhomTuoi.findAll({
        order: [["id_nhomtuoi", "ASC"]],
      });
      return nhomTuoiList;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminGetAllNhomTuoiService = async () => {
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

const checkTenNhomTuoi = async (TenNhomTuoi, status, id_nhomtuoi) => {
  // status 1: Add (không yêu cầu id), status 2: Update (yêu cầu id)
  let whereObject = {};
  if (status === "ADD") {
    whereObject = {
      TenNhomTuoi: String(TenNhomTuoi).trim(),
    };
  } else if (status === "UPDATE") {
    whereObject = {
      [Op.and]: [
        { TenNhomTuoi: String(TenNhomTuoi).trim() },
        { id_nhomtuoi: { [Op.not]: id_nhomtuoi } },
      ],
    };
  }
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhom_tuoi = await NhomTuoi.findOne({
        where: whereObject,
      });
      return nhom_tuoi;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const checkKhoangCachTuoiUpdate = async (strAge, endAge, id_nhomtuoi) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhom_tuoi = await NhomTuoi.findOne({
        where: {
          [Op.and]: [
            {
              [Op.or]: [
                {
                  strAge: {
                    [Op.lte]: strAge,
                  },
                  endAge: {
                    [Op.gte]: strAge,
                  },
                },
                {
                  strAge: {
                    [Op.lte]: endAge,
                  },
                  endAge: {
                    [Op.gte]: endAge,
                  },
                },
              ],
            },
            { id_nhomtuoi: { [Op.not]: id_nhomtuoi } },
          ],
        },
      });
      return nhom_tuoi;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const checkKhoangCachTuoi = async (strAge, endAge) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhom_tuoi = await NhomTuoi.findOne({
        where: {
          [Op.or]: [
            {
              strAge: {
                [Op.lte]: strAge,
              },
              endAge: {
                [Op.gte]: strAge,
              },
            },
            {
              strAge: {
                [Op.lte]: endAge,
              },
              endAge: {
                [Op.gte]: endAge,
              },
            },
          ],
        },
      });
      return nhom_tuoi;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const AddNhomTuoi = async (TenNhomTuoi, strAge, endAge) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhom_tuoi = await NhomTuoi.create(
        {
          TenNhomTuoi: String(TenNhomTuoi).trim(),
          strAge,
          endAge,
        },
        { transaction: t }
      );
      return nhom_tuoi;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminAddNhomTuoiService = async (
  TenNhomTuoi,
  strAge,
  endAge,
  queryParam
) => {
  TenNhomTuoi = String(TenNhomTuoi).trim();
  const check_name = await checkTenNhomTuoi(TenNhomTuoi, "ADD", -1);
  if (check_name === null) {
    const check_khoang_cach_tuoi = await checkKhoangCachTuoi(strAge, endAge);
    if (check_khoang_cach_tuoi === null) {
      const add_result = await AddNhomTuoi(TenNhomTuoi, strAge, endAge);
      if (add_result) {
        const nhomTuoiList = await getAllOfset(queryParam);
        const page = await findItem(queryParam, TenNhomTuoi);
        return {
          status: true,
          data: nhomTuoiList,
          page: page,
          message: "Thêm Nhóm tuổi thành công",
        };
      } else {
        return {
          status: false,
          message: "Thêm Nhóm tuổi thất bại",
        };
      }
    } else if (check_khoang_cach_tuoi) {
      return {
        status: false,
        message:
          "Đã tồn tại độ tuổi từ " +
          strAge +
          " tới " +
          endAge +
          " tuổi (" +
          check_khoang_cach_tuoi.TenNhomTuoi +
          ")",
      };
    } else {
      return {
        status: false,
        message: "Lỗi hệ thống, vui lòng thử lại sau.",
      };
    }
  } else if (check_name !== null) {
    return {
      status: false,
      message: "Tên Nhóm tuổi đã tồn tại trên hệ thống",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const checkNhomTuoiID = async (id_nhomtuoi) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhom_tuoi = await NhomTuoi.findOne({
        where: {
          id_nhomtuoi,
        },
      });
      return nhom_tuoi;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const checkNhomTuoiHasNhuCau = async (id_nhomtuoi) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhuCauHangNgay = await NhuCauHangNgay.findOne({
        where: {
          id_nhomtuoi,
        },
      });
      return nhuCauHangNgay;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const deleteNhomTuoi = async (id_nhomtuoi) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhom_tuoi = await NhomTuoi.destroy(
        {
          where: {
            id_nhomtuoi: Number(id_nhomtuoi),
          },
        },
        { transaction: t }
      );
      return nhom_tuoi;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminDeleteNhomTuoiService = async (id_nhomtuoi, queryParam) => {
  const check_id_nhomtuoi = await checkNhomTuoiID(id_nhomtuoi);
  if (check_id_nhomtuoi) {
    const checkList = await Promise.all([
      Promise.resolve(checkNhomTuoiHasNhuCau(id_nhomtuoi)),
    ]);
    if (checkList[0] === null) {
      const delete_result = await deleteNhomTuoi(id_nhomtuoi);
      if (delete_result) {
        const nhomTuoiList = await getAllOfset(queryParam);
        return {
          status: true,
          data: nhomTuoiList,
          page: null,
          message: "Xóa Nhóm tuổi thành công",
        };
      } else {
        return {
          status: false,
          message: "Xóa Nhóm tuổi thất bại",
        };
      }
    } else if (checkList[0] !== null) {
      return {
        status: false,
        message:
          "Nhóm tuổi đang nằm trong nhu cầu hàng ngày. Không thể xóa",
      };
    } else {
      return {
        status: false,
        message: "Lỗi hệ thống, vui lòng thử lại sau.",
      };
    }
  } else if (check_id_nhomtuoi === null) {
    return {
      status: false,
      message: "Nhóm tuổi không tồn tại trên hệ thống.",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const updateNhomTuoi = async (id_nhomtuoi, TenNhomTuoi, strAge, endAge) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhom_tuoi = await NhomTuoi.update(
        {
          TenNhomTuoi: TenNhomTuoi.trim(),
          strAge,
          endAge,
        },
        {
          where: {
            [Op.and]: [{ id_nhomtuoi }],
          },
        },
        { transaction: t }
      );
      return nhom_tuoi;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const adminUpdateNhomTuoiService = async (
  id_nhomtuoi,
  TenNhomTuoi,
  strAge,
  endAge,
  queryParam
) => {
  const check_id_nhomtuoi = await checkNhomTuoiID(id_nhomtuoi);
  if (check_id_nhomtuoi) {
    const check_khoang_cach_tuoi = await checkKhoangCachTuoiUpdate(
      strAge,
      endAge,
      id_nhomtuoi
    );
    if (check_khoang_cach_tuoi === null) {
      const check_name = await checkTenNhomTuoi(
        TenNhomTuoi,
        "UPDATE",
        id_nhomtuoi
      );
      if (check_name === null) {
        const update_result = await updateNhomTuoi(
          id_nhomtuoi,
          TenNhomTuoi,
          strAge,
          endAge
        );
        if (update_result) {
          const nhomTuoiList = await getAllOfset(queryParam);
          const page = await findItem(queryParam, TenNhomTuoi);
          return {
            status: true,
            data: nhomTuoiList,
            page: page,
            message: "Cập nhật thông tin Nhóm tuổi thành công",
          };
        } else {
          return {
            status: false,
            message: "Cập nhật thông tin Nhóm tuổi thất bại",
          };
        }
      } else if (check_name !== null) {
        return {
          status: false,
          message: "Tên Nhóm tuổi đã tồn tại trên hệ thống.",
        };
      } else {
        return {
          status: false,
          message: "Lỗi hệ thống, vui lòng thử lại sau.",
        };
      }
    } else if (check_khoang_cach_tuoi) {
      return {
        status: false,
        message:
          "Đã tồn tại độ tuổi từ " +
          strAge +
          " tới " +
          endAge +
          " tuổi (" +
          check_khoang_cach_tuoi.TenNhomTuoi +
          ")",
      };
    } else {
      return {
        status: false,
        message: "Lỗi hệ thống, vui lòng thử lại sau.",
      };
    }
  } else if (check_id_nhomtuoi === null) {
    return {
      status: false,
      message: "Nhóm tuổi không tồn tại trên hệ thống.",
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
      const list = await NhomTuoi.findAll({
        order: [[sort, type]],
        offset: Number(offset),
        limit: Number(limit),
        where: {
          [Op.or]: [
            {
              id_nhomtuoi: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              TenNhomTuoi: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              strAge: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              endAge: {
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
      const list = await NhomTuoi.findAll({
        order: [[sort, type]],
        where: {
          [Op.or]: [
            {
              id_nhomtuoi: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              TenNhomTuoi: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              strAge: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              endAge: {
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
        String(item.TenNhomTuoi).trim().toLocaleLowerCase() ===
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
  adminGetAllNhomTuoiService,
  adminAddNhomTuoiService,
  adminDeleteNhomTuoiService,
  adminUpdateNhomTuoiService,
  adminOffsetService,
};
