const { Op, Sequelize } = require("sequelize");
const {
  BaiViet,
  sequelize,
  ChuyenMuc,
  User,
  Role,
} = require("../../../models");
const getAll = async () => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const list = await BaiViet.findAll({
        order: [["createdAt", "DESC"]],
        where: {
          hien_thi: true,
        },
        include: [
          { model: ChuyenMuc },
          { model: User, attributes: ["user_id", "username"] },
        ],
      });
      return list;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const customerGetAllBaiVietService = async () => {
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

const getAllOfset = async (queryParam) => {
  const { offset, limit } = queryParam;
  try {
    const result = await sequelize.transaction(async (t) => {
      const list = await BaiViet.findAll({
        order: [["createdAt", "DESC"]],
        offset: Number(offset),
        limit: Number(limit),
        where: {
          hien_thi: true,
        },
        include: [
          { model: ChuyenMuc },
          { model: User, attributes: ["user_id", "username"] },
        ],
      });
      return list;
    });

    return result;
  } catch (error) {
    return false;
  }
};

const customerOffsetService = async (queryParam) => {
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

const customerCountService = async () => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const count = await BaiViet.count({
        where: {
          hien_thi: true,
        },
      });
      return count;
    });
    return {
      status: true,
      data: result,
    };
  } catch (error) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const getByID = async (slug) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const bai_viet = await BaiViet.findOne({
        include: [
          { model: ChuyenMuc },
          { model: User, attributes: ["user_id", "username"] },
        ],
        where: {
          slug,
          hien_thi: true,
        },
      });
      return bai_viet;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const customerGetChiTietService = async (slug) => {
  const result = await getByID(slug);
  if (result) {
    await countView(slug);
    return {
      status: true,
      data: result,
    };
  } else if (result === null) {
    return {
      status: false,
      message: "Không tìm thấy bài viết.",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const countView = async (slug) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const bai_viet_view = await BaiViet.update(
        {
          luot_xem: Sequelize.literal(`luot_xem + 1`),
        },
        {
          where: {
            slug: slug.trim(),
          },
        },
        { transaction: t }
      );
      return bai_viet_view;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const checkIDChuyenMuc = async (id_chuyenmuc) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const chuyen_muc = await ChuyenMuc.findOne({
        include: [
          {
            model: BaiViet,
            include: [{ model: User, attributes: ["user_id", "username"] }],
          },
        ],
        where: {
          id_chuyenmuc,
          "$BaiViets.hien_thi$": true,
        },
        order: [[{ model: BaiViet }, "createdAt", "DESC"]],
      });
      return chuyen_muc;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const checkIDTacGia = async (user_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const tac_gia = await User.findOne({
        attributes: ["user_id", "username"],
        include: [
          {
            model: BaiViet,
            include: [{ model: ChuyenMuc }],
          },
          {
            model: Role,
          },
        ],
        where: {
          "$Role.role_code$": "ROLE_ADMIN",
          "$BaiViets.hien_thi$": true,
          user_id,
        },
        order: [[{ model: BaiViet }, "createdAt", "DESC"]],
      });
      return tac_gia;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const customerGetCungChuyenMucService = async (id_chuyenmuc, id_baiviet) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const list = await BaiViet.findAll({
        include: [
          { model: ChuyenMuc },
          { model: User, attributes: ["user_id", "username"] },
        ],
        order: [["createdAt", "DESC"]],
        where: {
          id_chuyenmuc,
          id_baiviet: { [Op.not]: id_baiviet },
          hien_thi: true,
        },
      });
      return list;
    });
    return {
      status: true,
      data: result,
    };
  } catch (error) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const customerGetBaiVietChuyenMucService = async (id_chuyenmuc) => {
  const check_chuyen_muc = await checkIDChuyenMuc(id_chuyenmuc);
  if (check_chuyen_muc === null) {
    return {
      status: false,
      data: "Không tìm thấy thông tin chuyên mục",
    };
  }
  if (check_chuyen_muc === false) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
  return {
    status: true,
    data: check_chuyen_muc,
  };
};

const customerGetBaiVietTacGiaService = async (user_id) => {
  const check_tac_gia = await checkIDTacGia(user_id);
  if (check_tac_gia === null) {
    return {
      status: false,
      data: "Không tìm thấy thông tin tác giả",
    };
  }
  if (check_tac_gia === false) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
  return {
    status: true,
    data: check_tac_gia,
  };
};

module.exports = {
  customerGetAllBaiVietService,
  customerOffsetService,
  customerCountService,
  customerGetChiTietService,
  customerGetCungChuyenMucService,
  customerGetBaiVietTacGiaService,
  customerGetBaiVietChuyenMucService,
};
