const { DonVi, sequelize, ThucPham } = require("../../../models");
const { Op } = require("sequelize");
const getAll = async () => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const list = await DonVi.findAll({
        order: [["id_donvi", "ASC"]],
      });
      return list;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminGetAllDonViService = async () => {
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

const checkten_donvi = async (ten_donvi, status, id_donvi) => {
  let whereObject = {};
  if (status === "ADD") {
    whereObject = {
      ten_donvi: ten_donvi,
    };
  } else if (status === "UPDATE") {
    whereObject = {
      [Op.and]: [
        { ten_donvi: ten_donvi },
        { id_donvi: { [Op.not]: id_donvi } },
      ],
    };
  }
  try {
    const result = await sequelize.transaction(async (t) => {
      const don_vi_item = await DonVi.findOne({
        where: whereObject,
      });
      return don_vi_item;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const AddDonVi = async (ten_donvi) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const don_vi_item = await DonVi.create(
        {
          ten_donvi: String(ten_donvi).trim(),
        },
        { transaction: t }
      );
      return don_vi_item;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminAddDonViService = async (ten_donvi, queryParam) => {
  ten_donvi = String(ten_donvi).trim();
  const check_name = await checkten_donvi(ten_donvi, "ADD", -1);
  if (check_name === null) {
    const add_result = await AddDonVi(ten_donvi);
    if (add_result) {
      const list = await getAllOfset(queryParam);
      const page = await findItem(queryParam, ten_donvi);
      return {
        status: true,
        data: list,
        page: page,
        message: "Thêm Đơn vị thành công",
      };
    } else {
      return {
        status: false,
        message: "Thêm Đơn vị thất bại",
      };
    }
  } else if (check_name !== null) {
    return {
      status: false,
      message: "Tên Đơn vị đã tồn tại trên hệ thống",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const checkDonViID = async (id_donvi) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const don_vi_item = await DonVi.findOne({
        where: {
          id_donvi,
        },
      });
      return don_vi_item;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const checkDonViHasThucPham = async (id_donvi) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const thuc_pham = await ThucPham.findOne({
        where: {
          id_donvi,
        },
      });
      return thuc_pham;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const deleteDonVi = async (id_donvi) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const don_vi_item = await DonVi.destroy(
        {
          where: {
            id_donvi: Number(id_donvi),
          },
        },
        { transaction: t }
      );
      return don_vi_item;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminDeleteDonViService = async (id_donvi, queryParam) => {
  const check_id_donvi = await checkDonViID(id_donvi);
  if (check_id_donvi) {
    const checkList = await Promise.all([
      Promise.resolve(checkDonViHasThucPham(id_donvi)),
    ]);
    console.log("checkList", checkList);
    if (checkList[0] === null) {
      const delete_result = await deleteDonVi(id_donvi);
      if (delete_result) {
        const list = await getAllOfset(queryParam);
        return {
          status: true,
          data: list,
          page: null,
          message: "Xóa Đơn vị thành công",
        };
      } else {
        return {
          status: false,
          message: "Xóa Đơn vị thất bại",
        };
      }
    } else if (checkList[0] !== null) {
      return {
        status: false,
        message:
          "Đơn vị đang chứa ít nhất một thực phẩm. Không thể xóa",
      };
    } else {
      return {
        status: false,
        message: "Lỗi hệ thống, vui lòng thử lại sau.",
      };
    }
  } else if (check_id_donvi === null) {
    return {
      status: false,
      message: "Đơn vị không tồn tại trên hệ thống.",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const updateDonVi = async (id_donvi, ten_donvi) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const don_vi_item = await DonVi.update(
        {
          ten_donvi: ten_donvi.trim(),
        },
        {
          where: {
            [Op.and]: [{ id_donvi }],
          },
        },
        { transaction: t }
      );
      return don_vi_item;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const adminUpdateDonViService = async (id_donvi, ten_donvi, queryParam) => {
  const check_id_donvi = await checkDonViID(id_donvi);
  if (check_id_donvi) {
    const check_name = await checkten_donvi(ten_donvi, "UPDATE", id_donvi);
    if (check_name === null) {
      const update_result = await updateDonVi(id_donvi, ten_donvi);
      if (update_result) {
        const list = await getAllOfset(queryParam);
        const page = await findItem(queryParam, ten_donvi);
        return {
          status: true,
          data: list,
          page: page,
          message: "Cập nhật thông tin Đơn vị thành công",
        };
      } else {
        return {
          status: false,
          message: "Cập nhật thông tin Đơn vị thất bại",
        };
      }
    } else if (check_name !== null) {
      return {
        status: false,
        message: "Tên Đơn vị đã tồn tại trên hệ thống.",
      };
    } else {
      return {
        status: false,
        message: "Lỗi hệ thống, vui lòng thử lại sau.",
      };
    }
  } else if (check_id_donvi === null) {
    return {
      status: false,
      message: "Đơn vị không tồn tại trên hệ thống.",
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
      const list = await DonVi.findAll({
        order: [[sort, type]],
        offset: Number(offset),
        limit: Number(limit),
        where: {
          [Op.or]: [
            {
              id_donvi: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              ten_donvi: {
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
      const list = await DonVi.findAll({
        order: [[sort, type]],
        where: {
          [Op.or]: [
            {
              id_donvi: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              ten_donvi: {
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
        String(item.ten_donvi).trim().toLocaleLowerCase() ===
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
  adminGetAllDonViService,
  adminAddDonViService,
  adminDeleteDonViService,
  adminUpdateDonViService,
  adminOffsetService,
};
