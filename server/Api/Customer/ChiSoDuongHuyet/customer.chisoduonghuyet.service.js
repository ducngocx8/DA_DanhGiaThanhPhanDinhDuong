const { Op } = require("sequelize");
const { sequelize, ChiSoDuongHuyet } = require("../../../models");
const getAll = async (whereObject, orderBy) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const gi_list = await ChiSoDuongHuyet.findAll({
        order: orderBy,
        where: whereObject,
      });
      return gi_list;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const customerGetAllChiSoDuongHuyetService = async (queryParam) => {
  let whereObject = "";
  let orderBy = "";
  let level = 0;
  let sortType = "NUM90";
  if (queryParam) {
    level = queryParam.level;
    sortType = queryParam.sortType;
  }
  if (Number(level) === 1) {
    whereObject = {
      GI: {
        [Op.gte]: 0,
        [Op.lte]: 55,
      },
    };
  } else if (Number(level) === 2) {
    whereObject = {
      GI: {
        [Op.gte]: 56,
        [Op.lte]: 69,
      },
    };
  } else if (Number(level) === 3) {
    whereObject = {
      GI: {
        [Op.gte]: 70,
      },
    };
  } else {
    whereObject = {
      GI: {
        [Op.gte]: 0, // >= 0
      },
    };
  }
  if (!["NUM09", "NUM90", "AZ", "ZA"].includes(sortType)) {
    sortType = "NUM90";
  }
  if (sortType === "NUM09") {
    orderBy = [["GI", "ASC"]];
  } else if (sortType === "NUM90") {
    orderBy = [["GI", "DESC"]];
  } else if (sortType === "AZ") {
    orderBy = [["TenThucPham", "ASC"]];
  } else if (sortType === "ZA") {
    orderBy = [["TenThucPham", "DESC"]];
  }
  const result = await getAll(whereObject, orderBy);
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

const getAllByOffset = async (whereObject, orderBy, offset, limit) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const gi_list = await ChiSoDuongHuyet.findAll({
        order: orderBy,
        where: whereObject,
        offset,
        limit,
      });
      return gi_list;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const customerGetAllChiSoDuongHuyetOffsetService = async (queryParam) => {
  let whereObject = "";
  let orderBy = "";
  let level = 0;
  let sortType = "NUM90";
  let { offset, limit } = queryParam;
  offset = Number(offset);
  limit = Number(limit);
  if (queryParam) {
    level = queryParam.level;
    sortType = queryParam.sortType;
  }
  if (Number(level) === 1) {
    whereObject = {
      GI: {
        [Op.gte]: 0,
        [Op.lte]: 55,
      },
    };
  } else if (Number(level) === 2) {
    whereObject = {
      GI: {
        [Op.gte]: 56,
        [Op.lte]: 69,
      },
    };
  } else if (Number(level) === 3) {
    whereObject = {
      GI: {
        [Op.gte]: 70,
      },
    };
  } else {
    whereObject = {
      GI: {
        [Op.gte]: 0, // >= 0
      },
    };
  }
  if (!["NUM09", "NUM90", "AZ", "ZA"].includes(sortType)) {
    sortType = "NUM90";
  }
  if (sortType === "NUM09") {
    orderBy = [
      ["GI", "ASC"],
      ["id_thucpham", "ASC"],
    ];
  } else if (sortType === "NUM90") {
    orderBy = [
      ["GI", "DESC"],
      ["id_thucpham", "ASC"],
    ];
  } else if (sortType === "AZ") {
    orderBy = [["TenThucPham", "ASC"]];
  } else if (sortType === "ZA") {
    orderBy = [["TenThucPham", "DESC"]];
  }
  const result = await getAllByOffset(whereObject, orderBy, offset, limit);
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

module.exports = {
  customerGetAllChiSoDuongHuyetService,
  customerGetAllChiSoDuongHuyetOffsetService,
};
