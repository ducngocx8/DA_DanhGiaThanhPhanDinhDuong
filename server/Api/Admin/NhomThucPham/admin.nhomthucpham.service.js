const { NhomThucPham, sequelize, ThucPham } = require("../../../models");
const { Op } = require("sequelize");
const getAll = async () => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhomThucPhamList = await NhomThucPham.findAll({
        order: [["id_nhomthucpham", "ASC"]],
      });
      return nhomThucPhamList;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminGetAllNhomThucPhamService = async () => {
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

const checkten_nhom = async (ten_nhom, status, id_nhomthucpham) => {
  // status 1: Add (không yêu cầu id), status 2: Update (yêu cầu id)
  let whereObject = {};
  if (status === "ADD") {
    whereObject = {
      ten_nhom: ten_nhom,
    };
  } else if (status === "UPDATE") {
    whereObject = {
      [Op.and]: [
        { ten_nhom: ten_nhom },
        { id_nhomthucpham: { [Op.not]: id_nhomthucpham } },
      ],
    };
  }
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhom_thuc_pham = await NhomThucPham.findOne({
        where: whereObject,
      });
      return nhom_thuc_pham;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const AddNhomThucPham = async (ten_nhom, image_url) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhom_thuc_pham = await NhomThucPham.create(
        {
          ten_nhom: String(ten_nhom).trim(),
          image_url,
        },
        { transaction: t }
      );
      return nhom_thuc_pham;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminAddNhomThucPhamService = async (ten_nhom, image_url, queryParam) => {
  ten_nhom = String(ten_nhom).trim();
  const check_name = await checkten_nhom(ten_nhom, "ADD", -1);
  if (check_name === null) {
    const add_result = await AddNhomThucPham(ten_nhom, image_url);
    if (add_result) {
      const nhomThucPhamList = await getAllOfset(queryParam);
      const page = await findItem(queryParam, ten_nhom);
      return {
        status: true,
        data: nhomThucPhamList,
        page: page,
        message: "Thêm Nhóm thực phẩm thành công",
      };
    } else {
      return {
        status: false,
        message: "Thêm Nhóm thực phẩm thất bại",
      };
    }
  } else if (check_name !== null) {
    return {
      status: false,
      message: "Tên Nhóm thực phẩm đã tồn tại trên hệ thống",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const checkNhomThucPhamID = async (id_nhomthucpham) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhom_thuc_pham = await NhomThucPham.findOne({
        where: {
          id_nhomthucpham,
        },
      });
      return nhom_thuc_pham;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const checkNhomThucPhamHasThucPham = async (id_nhomthucpham) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const thuc_pham = await ThucPham.findOne({
        where: {
          id_nhomthucpham,
        },
      });
      return thuc_pham;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const deleteNhomThucPham = async (id_nhomthucpham) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhom_thuc_pham = await NhomThucPham.destroy(
        {
          where: {
            id_nhomthucpham: Number(id_nhomthucpham),
          },
        },
        { transaction: t }
      );
      return nhom_thuc_pham;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminDeleteNhomThucPhamService = async (id_nhomthucpham, queryParam) => {
  const check_id_nhomthucpham = await checkNhomThucPhamID(id_nhomthucpham);
  if (check_id_nhomthucpham) {
    const checkList = await Promise.all([
      Promise.resolve(checkNhomThucPhamHasThucPham(id_nhomthucpham)),
    ]);
    console.log("checkList", checkList);
    if (checkList[0] === null) {
      const delete_result = await deleteNhomThucPham(id_nhomthucpham);
      if (delete_result) {
        const nhomThucPhamList = await getAllOfset(queryParam);
        return {
          status: true,
          data: nhomThucPhamList,
          page: null,
          message: "Xóa Nhóm thực phẩm thành công",
        };
      } else {
        return {
          status: false,
          message: "Xóa Nhóm thực phẩm thất bại",
        };
      }
    } else if (checkList[0] !== null) {
      return {
        status: false,
        message:
          "Nhóm thực phẩm đang chứa ít nhất một thực phẩm. Không thể xóa",
      };
    } else {
      return {
        status: false,
        message: "Lỗi hệ thống, vui lòng thử lại sau.",
      };
    }
  } else if (check_id_nhomthucpham === null) {
    return {
      status: false,
      message: "Nhóm thực phẩm không tồn tại trên hệ thống.",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const updateNhomThucPham = async (id_nhomthucpham, ten_nhom) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhom_thuc_pham = await NhomThucPham.update(
        {
          ten_nhom: ten_nhom.trim(),
        },
        {
          where: {
            [Op.and]: [{ id_nhomthucpham }],
          },
        },
        { transaction: t }
      );
      return nhom_thuc_pham;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const adminUpdateNhomThucPhamService = async (
  id_nhomthucpham,
  ten_nhom,
  queryParam
) => {
  const check_id_nhomthucpham = await checkNhomThucPhamID(id_nhomthucpham);
  if (check_id_nhomthucpham) {
    const check_name = await checkten_nhom(ten_nhom, "UPDATE", id_nhomthucpham);
    if (check_name === null) {
      const update_result = await updateNhomThucPham(id_nhomthucpham, ten_nhom);
      if (update_result) {
        const nhomThucPhamList = await getAllOfset(queryParam);
        const page = await findItem(queryParam, ten_nhom);
        return {
          status: true,
          data: nhomThucPhamList,
          page: page,
          message: "Cập nhật thông tin Nhóm thực phẩm thành công",
        };
      } else {
        return {
          status: false,
          message: "Cập nhật thông tin Nhóm thực phẩm thất bại",
        };
      }
    } else if (check_name !== null) {
      return {
        status: false,
        message: "Tên Nhóm thực phẩm đã tồn tại trên hệ thống.",
      };
    } else {
      return {
        status: false,
        message: "Lỗi hệ thống, vui lòng thử lại sau.",
      };
    }
  } else if (check_id_nhomthucpham === null) {
    return {
      status: false,
      message: "Nhóm thực phẩm không tồn tại trên hệ thống.",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const updateImage = async (id_nhomthucpham, image_url) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhom_thuc_pham = await NhomThucPham.update(
        {
          image_url: String(image_url).trim(),
        },
        {
          where: {
            id_nhomthucpham,
          },
        },
        { transaction: t }
      );
      return nhom_thuc_pham;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const adminUpdateImageService = async (
  id_nhomthucpham,
  image_url,
  queryParam
) => {
  const check_id_nhomthucpham = await checkNhomThucPhamID(id_nhomthucpham);
  if (check_id_nhomthucpham) {
    const update_result = await updateImage(id_nhomthucpham, image_url);
    if (update_result) {
      const nhomThucPhamList = await getAllOfset(queryParam);
      return {
        status: true,
        data: nhomThucPhamList,
        message: "Cập nhật ảnh đại diện cho nhóm thực phẩm thành công",
        page: null,
      };
    } else {
      return {
        status: false,
        message: "Cập nhật ảnh đại diện cho nhóm thực phẩm thất bại",
      };
    }
  } else if (check_id_nhomthucpham === null) {
    return {
      status: false,
      message: "Nhóm thực phẩm không tồn tại trên hệ thống.",
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
      const nhomThucPhamList = await NhomThucPham.findAll({
        order: [[sort, type]],
        offset: Number(offset),
        limit: Number(limit),
        where: {
          [Op.or]: [
            {
              id_nhomthucpham: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              ten_nhom: {
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
      const nhomThucPhamList = await NhomThucPham.findAll({
        order: [[sort, type]],
        where: {
          [Op.or]: [
            {
              id_nhomthucpham: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              ten_nhom: {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
        },
      });
      return nhomThucPhamList;
    });

    const find_index = result.findIndex(
      (item) =>
        String(item.ten_nhom).trim().toLocaleLowerCase() ===
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
  adminGetAllNhomThucPhamService,
  adminAddNhomThucPhamService,
  adminDeleteNhomThucPhamService,
  adminUpdateNhomThucPhamService,
  adminUpdateImageService,
  adminOffsetService,
};
