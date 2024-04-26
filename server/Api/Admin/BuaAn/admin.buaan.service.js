const { BuaAn, sequelize, NgayAn } = require("../../../models");
const { Op } = require("sequelize");
const getAll = async () => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const buaAnList = await BuaAn.findAll({
        order: [["bua_an_id", "ASC"]],
      });
      return buaAnList;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminGetAllBuaAnService = async () => {
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

const checkTenBuaAn = async (ten_bua_an, status, bua_an_id) => {
  // status 1: Add (không yêu cầu id), status 2: Update (yêu cầu id)
  let whereObject = {};
  if (status === "ADD") {
    whereObject = {
      ten_bua_an: ten_bua_an,
    };
  } else if (status === "UPDATE") {
    whereObject = {
      [Op.and]: [
        { ten_bua_an: ten_bua_an },
        { bua_an_id: { [Op.not]: bua_an_id } },
      ],
    };
  }
  try {
    const result = await sequelize.transaction(async (t) => {
      const buaAn = await BuaAn.findOne({
        where: whereObject,
      });
      return buaAn;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const AddBuaAn = async (ten_bua_an, image_url) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const buaAn = await BuaAn.create(
        {
          ten_bua_an: String(ten_bua_an).trim(),
          image_url: image_url,
        },
        { transaction: t }
      );
      return buaAn;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminAddBuaAnService = async (ten_bua_an, image_url, queryParam) => {
  ten_bua_an = String(ten_bua_an).trim();
  const check_name = await checkTenBuaAn(ten_bua_an, "ADD", -1);
  if (check_name === null) {
    const add_result = await AddBuaAn(ten_bua_an, image_url);
    if (add_result) {
      const buaAnList = await getAllOfset(queryParam);
      const page = await findItem(queryParam, ten_bua_an);
      return {
        status: true,
        data: buaAnList,
        page: page,
        message: "Thêm bữa ăn thành công",
      };
    } else {
      return {
        status: false,
        message: "Thêm bữa ăn thất bại",
      };
    }
  } else if (check_name !== null) {
    return {
      status: false,
      message: "Tên bữa ăn đã tồn tại trên hệ thống",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const checkBuaAnID = async (bua_an_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const buaAn = await BuaAn.findOne({
        where: {
          bua_an_id,
        },
      });
      return buaAn;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const checkBuaAnHasNgayAn = async (bua_an_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const ngayAn = await NgayAn.findOne({
        where: {
          bua_an_id,
        },
      });
      return ngayAn;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const deleteBuaAn = async (bua_an_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const buaAn = await BuaAn.destroy(
        {
          where: {
            bua_an_id: Number(bua_an_id),
          },
        },
        { transaction: t }
      );
      return buaAn;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminDeleteBuaAnService = async (bua_an_id, queryParam) => {
  const check_bua_an_id = await checkBuaAnID(bua_an_id);
  if (check_bua_an_id) {
    const checkNgayAn_Co_BuaAn = await checkBuaAnHasNgayAn(bua_an_id);
    if (checkNgayAn_Co_BuaAn === null) {
      const delete_result = await deleteBuaAn(bua_an_id);
      if (delete_result) {
        const buaAnList = await getAllOfset(queryParam);
        return {
          status: true,
          data: buaAnList,
          page: null,
          message: "Xóa bữa ăn thành công",
        };
      } else {
        return {
          status: false,
          message: "Xóa bữa ăn thất bại",
        };
      }
    } else if (checkNgayAn_Co_BuaAn !== null) {
      return {
        status: false,
        message: "Bữa ăn đang có ngày ăn. Không thể xóa",
      };
    } else {
      return {
        status: false,
        message: "Lỗi hệ thống, vui lòng thử lại sau.",
      };
    }
  } else if (check_bua_an_id === null) {
    return {
      status: false,
      message: "Bữa ăn không tồn tại trên hệ thống.",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const updateBuaAn = async (bua_an_id, ten_bua_an) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const buaAn = await BuaAn.update(
        {
          ten_bua_an: String(ten_bua_an).trim(),
        },
        {
          where: {
            [Op.and]: [{ bua_an_id }],
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

const adminUpdateBuaAnService = async (bua_an_id, ten_bua_an, queryParam) => {
  const check_bua_an_id = await checkBuaAnID(bua_an_id);
  if (check_bua_an_id) {
    const check_name = await checkTenBuaAn(ten_bua_an, "UPDATE", bua_an_id);
    if (check_name === null) {
      const update_result = await updateBuaAn(bua_an_id, ten_bua_an);
      if (update_result) {
        const buaAnList = await getAllOfset(queryParam);
        const page = await findItem(queryParam, ten_bua_an);
        return {
          status: true,
          data: buaAnList,
          page: page,
          message: "Cập nhật thông tin bữa ăn thành công",
        };
      } else {
        return {
          status: false,
          message: "Cập nhật thông tin bữa ăn thất bại",
        };
      }
    } else if (check_name !== null) {
      return {
        status: false,
        message: "Tên bữa ăn đã tồn tại trên hệ thống.",
      };
    } else {
      return {
        status: false,
        message: "Lỗi hệ thống, vui lòng thử lại sau.",
      };
    }
  } else if (check_bua_an_id === null) {
    return {
      status: false,
      message: "Bữa ăn không tồn tại trên hệ thống.",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const updateImage = async (bua_an_id, image_url) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const buaAn = await BuaAn.update(
        {
          image_url: String(image_url).trim(),
        },
        {
          where: {
            bua_an_id,
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

const adminUpdateImageService = async (bua_an_id, image_url, queryParam) => {
  const check_bua_an_id = await checkBuaAnID(bua_an_id);
  if (check_bua_an_id) {
    const update_result = await updateImage(bua_an_id, image_url);
    if (update_result) {
      const buaAnList = await getAllOfset(queryParam);
      return {
        status: true,
        data: buaAnList,
        page: null,
        message: "Cập nhật ảnh đại diện cho bữa ăn thành công",
      };
    } else {
      return {
        status: false,
        message: "Cập nhật ảnh đại diện cho bữa ăn thất bại",
      };
    }
  } else if (check_bua_an_id === null) {
    return {
      status: false,
      message: "Bữa ăn không tồn tại trên hệ thống.",
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
      const list = await BuaAn.findAll({
        order: [[sort, type]],
        offset: Number(offset),
        limit: Number(limit),
        where: {
          [Op.or]: [
            {
              bua_an_id: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              ten_bua_an: {
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
      const list = await BuaAn.findAll({
        order: [[sort, type]],
        where: {
          [Op.or]: [
            {
              bua_an_id: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              ten_bua_an: {
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
        String(item.ten_bua_an).trim().toLocaleLowerCase() ===
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
  adminGetAllBuaAnService,
  adminAddBuaAnService,
  adminDeleteBuaAnService,
  adminUpdateBuaAnService,
  adminUpdateImageService,
  adminOffsetService,
};
