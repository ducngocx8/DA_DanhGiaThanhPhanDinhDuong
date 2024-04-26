const { sequelize, ChiSoDuongHuyet } = require("../../../models");
const { Op } = require("Sequelize");
const getAll = async () => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const gi_list = await ChiSoDuongHuyet.findAll({
        order: [["id_thucpham", "ASC"]],
      });
      return gi_list;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminGetAllChiSoDuongHuyetService = async () => {
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

const checkTenThucPham = async (TenThucPham, status, id_thucpham) => {
  // status 1: Add (không yêu cầu id), status 2: Update (yêu cầu id)
  let whereObject = {};
  if (status === "ADD") {
    whereObject = {
      TenThucPham: TenThucPham,
    };
  } else if (status === "UPDATE") {
    whereObject = {
      [Op.and]: [
        { TenThucPham: TenThucPham },
        { id_thucpham: { [Op.not]: id_thucpham } },
      ],
    };
  }
  try {
    const result = await sequelize.transaction(async (t) => {
      const chi_so_gi = await ChiSoDuongHuyet.findOne({
        where: whereObject,
      });
      return chi_so_gi;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const AddChiSoDuongHuyet = async (id_thucpham, TenThucPham, GI) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const chi_so_gi = await ChiSoDuongHuyet.create(
        {
          TenThucPham: String(TenThucPham).trim(),
          id_thucpham,
          GI,
        },
        { transaction: t }
      );
      return chi_so_gi;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminAddChiSoDuongHuyetService = async (GIBody, queryParam) => {
  let { id_thucpham, TenThucPham, GI } = GIBody;

  const check_id_thucpham = await checkIDThucPhamGI(id_thucpham);
  if (check_id_thucpham) {
    return {
      status: false,
      message: "Mã thực phẩm đã tồn tại trên hệ thống",
    };
  } else if (check_id_thucpham === false) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }

  TenThucPham = String(TenThucPham).trim();
  const check_name = await checkTenThucPham(TenThucPham, "ADD", -1);
  if (check_name === null) {
    const add_result = await AddChiSoDuongHuyet(id_thucpham, TenThucPham, GI);
    if (add_result) {
      const gi_list = await getAllOfset(queryParam);
      const page = await findItem(queryParam, TenThucPham);
      return {
        status: true,
        data: gi_list,
        page: page,
        message: "Thêm Chỉ số đường huyết thực phẩm thành công",
      };
    } else {
      return {
        status: false,
        message: "Thêm Chỉ số đường huyết thực phẩm thất bại",
      };
    }
  } else if (check_name !== null) {
    return {
      status: false,
      message: "Tên thực phẩm đã tồn tại trên hệ thống",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const checkIDThucPhamGI = async (id_thucpham) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const chi_so_gi = await ChiSoDuongHuyet.findOne({
        where: {
          id_thucpham,
        },
      });
      return chi_so_gi;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const deleteChiSoDuongHuyet = async (id_thucpham) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const chi_so_gi = await ChiSoDuongHuyet.destroy(
        {
          where: {
            id_thucpham: id_thucpham,
          },
        },
        { transaction: t }
      );
      return chi_so_gi;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminDeleteChiSoDuongHuyetService = async (id_thucpham, queryParam) => {
  const check_id_thucpham = await checkIDThucPhamGI(id_thucpham);
  if (check_id_thucpham) {
    const delete_result = await deleteChiSoDuongHuyet(id_thucpham);
    if (delete_result) {
      const gi_list = await getAllOfset(queryParam);
      return {
        status: true,
        data: gi_list,
        page: null,
        message: "Xóa Chỉ số đường huyết thực phẩm thành công",
      };
    } else {
      return {
        status: false,
        message: "Xóa Chỉ số đường huyết thực phẩm thất bại",
      };
    }
  } else if (check_id_thucpham === null) {
    return {
      status: false,
      message: "Thực phẩm không tồn tại trên hệ thống.",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const updateChiSoDuongHuyet = async (id_thucpham, TenThucPham, GI) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const chi_so_gi = await ChiSoDuongHuyet.update(
        {
          TenThucPham: TenThucPham.trim(),
          GI,
        },
        {
          where: {
            [Op.and]: [{ id_thucpham }],
          },
        },
        { transaction: t }
      );
      return chi_so_gi;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const adminUpdateChiSoDuongHuyetService = async (
  id_thucpham,
  GIBody,
  queryParam
) => {
  let { TenThucPham, GI } = GIBody;
  const check_id_thucpham = await checkIDThucPhamGI(id_thucpham);
  if (check_id_thucpham) {
    const check_name = await checkTenThucPham(
      TenThucPham,
      "UPDATE",
      id_thucpham
    );
    if (check_name === null) {
      const update_result = await updateChiSoDuongHuyet(
        id_thucpham,
        TenThucPham,
        GI
      );
      if (update_result) {
        const gi_list = await getAllOfset(queryParam);
        const page = await findItem(queryParam, TenThucPham);
        return {
          status: true,
          data: gi_list,
          page: page,
          message: "Cập nhật thông tin Chỉ số đường huyết thành công",
        };
      } else {
        return {
          status: false,
          message: "Cập nhật thông tin Chỉ số đường huyết thất bại",
        };
      }
    } else if (check_name !== null) {
      return {
        status: false,
        message: "Tên thực phẩm đã tồn tại trên hệ thống.",
      };
    } else {
      return {
        status: false,
        message: "Lỗi hệ thống, vui lòng thử lại sau.",
      };
    }
  } else if (check_id_thucpham === null) {
    return {
      status: false,
      message: "Thực phẩm không tồn tại trên hệ thống.",
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
      const list = await ChiSoDuongHuyet.findAll({
        order: [[sort, type]],
        offset: Number(offset),
        limit: Number(limit),
        where: {
          [Op.or]: [
            {
              id_thucpham: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              TenThucPham: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              GI: {
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
      const list = await ChiSoDuongHuyet.findAll({
        order: [[sort, type]],
        where: {
          [Op.or]: [
            {
              id_thucpham: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              TenThucPham: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              GI: {
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
        String(item.TenThucPham).trim().toLocaleLowerCase() ===
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
  adminGetAllChiSoDuongHuyetService,
  adminAddChiSoDuongHuyetService,
  adminDeleteChiSoDuongHuyetService,
  adminUpdateChiSoDuongHuyetService,
  adminOffsetService,
};
