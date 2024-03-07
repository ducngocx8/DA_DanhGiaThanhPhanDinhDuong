const { NhomMonAn, sequelize, MonAn } = require("../../../models");
const { Op } = require("sequelize");
const getAll = async () => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhomMonAnList = await NhomMonAn.findAll({
        order: [["id_nhommonan", "ASC"]],
      });
      return nhomMonAnList;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminGetAllNhomMonAnService = async () => {
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

const checkten_nhom = async (ten_nhom, status, id_nhommonan) => {
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
        { id_nhommonan: { [Op.not]: id_nhommonan } },
      ],
    };
  }
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhom_mon_an = await NhomMonAn.findOne({
        where: whereObject,
      });
      return nhom_mon_an;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const AddNhomMonAn = async (ten_nhom, image_url) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhom_mon_an = await NhomMonAn.create(
        {
          ten_nhom: String(ten_nhom).trim(),
          image_url,
        },
        { transaction: t }
      );
      return nhom_mon_an;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminAddNhomMonAnService = async (ten_nhom, image_url, queryParam) => {
  ten_nhom = String(ten_nhom).trim();
  const check_name = await checkten_nhom(ten_nhom, "ADD", -1);
  if (check_name === null) {
    const add_result = await AddNhomMonAn(ten_nhom, image_url);
    if (add_result) {
      const nhomMonAnList = await getAllOfset(queryParam);
      const page = await findItem(queryParam, ten_nhom);
      return {
        status: true,
        data: nhomMonAnList,
        page: page,
        message: "Thêm Nhóm món ăn thành công",
      };
    } else {
      return {
        status: false,
        message: "Thêm Nhóm món ăn thất bại",
      };
    }
  } else if (check_name !== null) {
    return {
      status: false,
      message: "Tên Nhóm món ăn đã tồn tại trên hệ thống",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const checkNhomMonAnID = async (id_nhommonan) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhom_mon_an = await NhomMonAn.findOne({
        where: {
          id_nhommonan,
        },
      });
      return nhom_mon_an;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const checkNhomMonAnHasMonAn = async (id_nhommonan) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const mon_an = await MonAn.findOne({
        where: {
          id_nhommonan,
        },
      });
      return mon_an;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const deleteNhomMonAn = async (id_nhommonan) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhom_mon_an = await NhomMonAn.destroy(
        {
          where: {
            id_nhommonan: Number(id_nhommonan),
          },
        },
        { transaction: t }
      );
      return nhom_mon_an;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminDeleteNhomMonAnService = async (id_nhommonan, queryParam) => {
  const check_id_nhommonan = await checkNhomMonAnID(id_nhommonan);
  if (check_id_nhommonan) {
    const checkList = await Promise.all([
      Promise.resolve(checkNhomMonAnHasMonAn(id_nhommonan)),
    ]);
    console.log("checkList", checkList);
    if (checkList[0] === null) {
      const delete_result = await deleteNhomMonAn(id_nhommonan);
      if (delete_result) {
        const nhomMonAnList = await getAllOfset(queryParam);
        return {
          status: true,
          data: nhomMonAnList,
          page: null,
          message: "Xóa Nhóm món ăn thành công",
        };
      } else {
        return {
          status: false,
          message: "Xóa Nhóm món ăn thất bại",
        };
      }
    } else if (checkList[0] !== null) {
      return {
        status: false,
        message: "Nhóm món ăn đang chứa ít nhất một món ăn. Không thể xóa",
      };
    } else {
      return {
        status: false,
        message: "Lỗi hệ thống, vui lòng thử lại sau.",
      };
    }
  } else if (check_id_nhommonan === null) {
    return {
      status: false,
      message: "Nhóm món ăn không tồn tại trên hệ thống.",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const updateNhomMonAn = async (id_nhommonan, ten_nhom) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhom_mon_an = await NhomMonAn.update(
        {
          ten_nhom: ten_nhom.trim(),
        },
        {
          where: {
            [Op.and]: [{ id_nhommonan }],
          },
        },
        { transaction: t }
      );
      return nhom_mon_an;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const adminUpdateNhomMonAnService = async (
  id_nhommonan,
  ten_nhom,
  queryParam
) => {
  const check_id_nhommonan = await checkNhomMonAnID(id_nhommonan);
  if (check_id_nhommonan) {
    const check_name = await checkten_nhom(ten_nhom, "UPDATE", id_nhommonan);
    if (check_name === null) {
      const update_result = await updateNhomMonAn(id_nhommonan, ten_nhom);
      if (update_result) {
        const nhomMonAnList = await getAllOfset(queryParam);
        const page = await findItem(queryParam, ten_nhom);
        return {
          status: true,
          data: nhomMonAnList,
          page: page,
          message: "Cập nhật thông tin Nhóm món ăn thành công",
        };
      } else {
        return {
          status: false,
          message: "Cập nhật thông tin Nhóm món ăn thất bại",
        };
      }
    } else if (check_name !== null) {
      return {
        status: false,
        message: "Tên Nhóm món ăn đã tồn tại trên hệ thống.",
      };
    } else {
      return {
        status: false,
        message: "Lỗi hệ thống, vui lòng thử lại sau.",
      };
    }
  } else if (check_id_nhommonan === null) {
    return {
      status: false,
      message: "Nhóm món ăn không tồn tại trên hệ thống.",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const updateImage = async (id_nhommonan, image_url) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const buaAn = await NhomMonAn.update(
        {
          image_url: String(image_url).trim(),
        },
        {
          where: {
            id_nhommonan,
          },
        },
        { transaction: t }
      );
      return buaAn;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const adminUpdateImageService = async (id_nhommonan, image_url, queryParam) => {
  const check_id_nhommonan = await checkNhomMonAnID(id_nhommonan);
  if (check_id_nhommonan) {
    const update_result = await updateImage(id_nhommonan, image_url);
    if (update_result) {
      const nhomMonAnList = await getAllOfset(queryParam);
      return {
        status: true,
        data: nhomMonAnList,
        message: "Cập nhật ảnh đại diện cho nhóm món ăn thành công",
      };
    } else {
      return {
        status: false,
        message: "Cập nhật ảnh đại diện cho nhóm món ăn thất bại",
      };
    }
  } else if (check_id_nhommonan === null) {
    return {
      status: false,
      message: "Nhóm món ăn không tồn tại trên hệ thống.",
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
      const nhomThucPhamList = await NhomMonAn.findAll({
        order: [[sort, type]],
        offset: Number(offset),
        limit: Number(limit),
        where: {
          [Op.or]: [
            {
              id_nhommonan: {
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
      const nhomThucPhamList = await NhomMonAn.findAll({
        order: [[sort, type]],
        where: {
          [Op.or]: [
            {
              id_nhommonan: {
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
  adminGetAllNhomMonAnService,
  adminAddNhomMonAnService,
  adminDeleteNhomMonAnService,
  adminUpdateNhomMonAnService,
  adminUpdateImageService,
  adminOffsetService,
};
