const { ChuyenMuc, sequelize, ThucPham, BaiViet } = require("../../../models");
const { Op } = require("Sequelize");
const getAll = async () => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const list = await ChuyenMuc.findAll({
        order: [["id_chuyenmuc", "ASC"]],
      });
      return list;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminGetAllChuyenMucService = async () => {
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

const checkten_chuyenmuc = async (ten_chuyenmuc, status, id_chuyenmuc) => {
  let whereObject = {};
  if (status === "ADD") {
    whereObject = {
      ten_chuyenmuc: ten_chuyenmuc,
    };
  } else if (status === "UPDATE") {
    whereObject = {
      [Op.and]: [
        { ten_chuyenmuc: ten_chuyenmuc },
        { id_chuyenmuc: { [Op.not]: id_chuyenmuc } },
      ],
    };
  }
  try {
    const result = await sequelize.transaction(async (t) => {
      const chuyenmuc_item = await ChuyenMuc.findOne({
        where: whereObject,
      });
      return chuyenmuc_item;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const AddChuyenMuc = async (ten_chuyenmuc) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const chuyenmuc_item = await ChuyenMuc.create(
        {
          ten_chuyenmuc: String(ten_chuyenmuc).trim(),
        },
        { transaction: t }
      );
      return chuyenmuc_item;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminAddChuyenMucService = async (ten_chuyenmuc, queryParam) => {
  ten_chuyenmuc = String(ten_chuyenmuc).trim();
  const check_name = await checkten_chuyenmuc(ten_chuyenmuc, "ADD", -1);
  if (check_name === null) {
    const add_result = await AddChuyenMuc(ten_chuyenmuc);
    if (add_result) {
      const list = await getAllOfset(queryParam);
      const page = await findItem(queryParam, ten_chuyenmuc);
      return {
        status: true,
        data: list,
        page: page,
        message: "Thêm Chuyên mục thành công",
      };
    } else {
      return {
        status: false,
        message: "Thêm Chuyên mục thất bại",
      };
    }
  } else if (check_name !== null) {
    return {
      status: false,
      message: "Tên Chuyên mục đã tồn tại trên hệ thống",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const checkChuyenMucID = async (id_chuyenmuc) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const chuyenmuc_item = await ChuyenMuc.findOne({
        where: {
          id_chuyenmuc,
        },
      });
      return chuyenmuc_item;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const checkChuyenMucHasBaiViet = async (id_chuyenmuc) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const bai_viet = await BaiViet.findOne({
        where: {
          id_chuyenmuc,
        },
      });
      return bai_viet;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const deleteChuyenMuc = async (id_chuyenmuc) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const chuyenmuc_item = await ChuyenMuc.destroy(
        {
          where: {
            id_chuyenmuc: Number(id_chuyenmuc),
          },
        },
        { transaction: t }
      );
      return chuyenmuc_item;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminDeleteChuyenMucService = async (id_chuyenmuc, queryParam) => {
  const check_id_chuyenmuc = await checkChuyenMucID(id_chuyenmuc);
  if (check_id_chuyenmuc) {
    const checkList = await Promise.all([
      Promise.resolve(checkChuyenMucHasBaiViet(id_chuyenmuc)),
    ]);
    console.log("checkList", checkList);
    if (checkList[0] === null) {
      const delete_result = await deleteChuyenMuc(id_chuyenmuc);
      if (delete_result) {
        const list = await getAllOfset(queryParam);
        return {
          status: true,
          data: list,
          page: null,
          message: "Xóa Chuyên mục thành công",
        };
      } else {
        return {
          status: false,
          message: "Xóa Chuyên mục thất bại",
        };
      }
    } else if (checkList[0] !== null) {
      return {
        status: false,
        message: "Chuyên mục đang chứa ít nhất một bài viết. Không thể xóa",
      };
    } else {
      return {
        status: false,
        message: "Lỗi hệ thống, vui lòng thử lại sau.",
      };
    }
  } else if (check_id_chuyenmuc === null) {
    return {
      status: false,
      message: "Chuyên mục không tồn tại trên hệ thống.",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const updateChuyenMuc = async (id_chuyenmuc, ten_chuyenmuc) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const chuyenmuc_item = await ChuyenMuc.update(
        {
          ten_chuyenmuc: ten_chuyenmuc.trim(),
        },
        {
          where: {
            [Op.and]: [{ id_chuyenmuc }],
          },
        },
        { transaction: t }
      );
      return chuyenmuc_item;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const adminUpdateChuyenMucService = async (
  id_chuyenmuc,
  ten_chuyenmuc,
  queryParam
) => {
  const check_id_chuyenmuc = await checkChuyenMucID(id_chuyenmuc);
  if (check_id_chuyenmuc) {
    const check_name = await checkten_chuyenmuc(
      ten_chuyenmuc,
      "UPDATE",
      id_chuyenmuc
    );
    if (check_name === null) {
      const update_result = await updateChuyenMuc(id_chuyenmuc, ten_chuyenmuc);
      if (update_result) {
        const list = await getAllOfset(queryParam);
        const page = await findItem(queryParam, ten_chuyenmuc);
        return {
          status: true,
          data: list,
          page: page,
          message: "Cập nhật thông tin Chuyên mục thành công",
        };
      } else {
        return {
          status: false,
          message: "Cập nhật thông tin Chuyên mục thất bại",
        };
      }
    } else if (check_name !== null) {
      return {
        status: false,
        message: "Tên Chuyên mục đã tồn tại trên hệ thống.",
      };
    } else {
      return {
        status: false,
        message: "Lỗi hệ thống, vui lòng thử lại sau.",
      };
    }
  } else if (check_id_chuyenmuc === null) {
    return {
      status: false,
      message: "Chuyên mục không tồn tại trên hệ thống.",
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
      const list = await ChuyenMuc.findAll({
        order: [[sort, type]],
        offset: Number(offset),
        limit: Number(limit),
        where: {
          [Op.or]: [
            {
              id_chuyenmuc: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              ten_chuyenmuc: {
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
      const list = await ChuyenMuc.findAll({
        order: [[sort, type]],
        where: {
          [Op.or]: [
            {
              id_chuyenmuc: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              ten_chuyenmuc: {
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
        String(item.ten_chuyenmuc).trim().toLocaleLowerCase() ===
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
  adminGetAllChuyenMucService,
  adminAddChuyenMucService,
  adminDeleteChuyenMucService,
  adminUpdateChuyenMucService,
  adminOffsetService,
};
