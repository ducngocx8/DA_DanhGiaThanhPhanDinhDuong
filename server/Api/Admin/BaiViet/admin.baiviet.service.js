const { BaiViet, sequelize, ChuyenMuc, User } = require("../../../models");
const { Op } = require("Sequelize");
const getAll = async () => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const list = await BaiViet.findAll({
        include: [
          { model: ChuyenMuc },
          { model: User, attributes: ["user_id", "username"] },
        ],
        order: [["id_baiviet", "ASC"]],
      });
      return list;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminGetAllBaiVietService = async () => {
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

const checkTieuDeBaiViet = async (tieu_de, status, id_baiviet) => {
  let whereObject = {};
  if (status === "ADD") {
    whereObject = {
      tieu_de: tieu_de,
    };
  } else if (status === "UPDATE") {
    whereObject = {
      [Op.and]: [
        { tieu_de: tieu_de },
        { id_baiviet: { [Op.not]: id_baiviet } },
      ],
    };
  }
  try {
    const result = await sequelize.transaction(async (t) => {
      const bai_viet_item = await BaiViet.findOne({
        where: whereObject,
      });
      return bai_viet_item;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const checkSlugBaiViet = async (slug, status, id_baiviet) => {
  let whereObject = {};
  if (status === "ADD") {
    whereObject = {
      slug: slug,
    };
  } else if (status === "UPDATE") {
    whereObject = {
      [Op.and]: [{ slug: slug }, { id_baiviet: { [Op.not]: id_baiviet } }],
    };
  }
  try {
    const result = await sequelize.transaction(async (t) => {
      const bai_viet_item = await BaiViet.findOne({
        where: whereObject,
      });
      return bai_viet_item;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const AddBaiViet = async (baiVietBody, user_id) => {
  const { tieu_de, mo_ta, id_chuyenmuc, hien_thi, slug, noi_dung, image_url } =
    baiVietBody;
  try {
    const result = await sequelize.transaction(async (t) => {
      const bai_viet_item = await BaiViet.create(
        {
          tieu_de: tieu_de.trim(),
          mo_ta: mo_ta.trim(),
          slug: slug.trim(),
          noi_dung: noi_dung.trim(),
          id_chuyenmuc: Number(id_chuyenmuc),
          hien_thi: hien_thi,
          image_url,
          user_id,
          updatedAt: null,
          createdAt: new Date(),
          luot_xem: 0,
        },
        { transaction: t }
      );
      return bai_viet_item;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const adminAddBaiVietService = async (baiVietBody, queryParam, user_id) => {
  let { tieu_de, slug } = baiVietBody;
  tieu_de = tieu_de.trim();
  slug = slug.trim();
  const checkList = await Promise.all([
    Promise.resolve(checkTieuDeBaiViet(tieu_de, "ADD", -1)),
    Promise.resolve(checkSlugBaiViet(slug, "ADD", -1)),
  ]);
  if (checkList[0] === false || checkList[1] === false) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
  if (checkList[0]) {
    return {
      status: false,
      message: "Tiêu đề bài viết đã tồn tại trên hệ thống.",
    };
  }
  if (checkList[1]) {
    return {
      status: false,
      message: "Đường dẫn bài viết đã tồn tại trên hệ thống.",
    };
  }
  const add_result = await AddBaiViet(baiVietBody, user_id);
  if (add_result) {
    const list = await getAllOfset(queryParam);
    const page = await findItem(queryParam, baiVietBody.tieu_de);
    return {
      status: true,
      data: list,
      page: page,
      message: "Thêm Bài viết thành công",
    };
  } else {
    return {
      status: false,
      message: "Thêm Bài viết thất bại",
    };
  }
};

const checkBaiVietID = async (id_baiviet) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const bai_viet_item = await BaiViet.findOne({
        where: {
          id_baiviet,
        },
      });
      return bai_viet_item;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const deleteBaiViet = async (id_baiviet) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const bai_viet_item = await BaiViet.destroy(
        {
          where: {
            id_baiviet: Number(id_baiviet),
          },
        },
        { transaction: t }
      );
      return bai_viet_item;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminDeleteBaiVietService = async (id_baiviet, queryParam) => {
  const check_id_baiviet = await checkBaiVietID(id_baiviet);
  if (check_id_baiviet) {
    const delete_result = await deleteBaiViet(id_baiviet);
    if (delete_result) {
      const list = await getAllOfset(queryParam);
      return {
        status: true,
        data: list,
        page: null,
        message: "Xóa Bài viết thành công",
      };
    } else {
      return {
        status: false,
        message: "Xóa Bài viết thất bại",
      };
    }
  } else if (check_id_baiviet === null) {
    return {
      status: false,
      message: "Bài viết không tồn tại trên hệ thống.",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const updateBaiViet = async (id_baiviet, baiVietBody) => {
  const { tieu_de, mo_ta, id_chuyenmuc, hien_thi, slug, noi_dung } =
    baiVietBody;
  try {
    const result = await sequelize.transaction(async (t) => {
      const bai_viet_item = await BaiViet.update(
        {
          tieu_de: tieu_de.trim(),
          mo_ta: mo_ta.trim(),
          slug: slug.trim(),
          noi_dung: noi_dung.trim(),
          id_chuyenmuc: Number(id_chuyenmuc),
          hien_thi: hien_thi,
          updatedAt: new Date(),
        },
        {
          where: {
            [Op.and]: [{ id_baiviet }],
          },
        },
        { transaction: t }
      );
      return bai_viet_item;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const adminUpdateBaiVietService = async (
  id_baiviet,
  baiVietBody,
  queryParam
) => {
  const check_id_baiviet = await checkBaiVietID(id_baiviet);
  if (check_id_baiviet) {
    let { tieu_de, slug } = baiVietBody;
    tieu_de = tieu_de.trim();
    slug = slug.trim();
    const checkList = await Promise.all([
      Promise.resolve(checkTieuDeBaiViet(tieu_de, "UPDATE", id_baiviet)),
      Promise.resolve(checkSlugBaiViet(slug, "UPDATE", id_baiviet)),
    ]);
    if (checkList[0] === false || checkList[1] === false) {
      return {
        status: false,
        message: "Lỗi hệ thống, vui lòng thử lại sau.",
      };
    }
    if (checkList[0]) {
      return {
        status: false,
        message: "Tiêu đề bài viết đã tồn tại trên hệ thống.",
      };
    }
    if (checkList[1]) {
      return {
        status: false,
        message: "Đường dẫn bài viết đã tồn tại trên hệ thống.",
      };
    }
    const update_result = await updateBaiViet(id_baiviet, baiVietBody);
    if (update_result) {
      const list = await getAllOfset(queryParam);
      const page = await findItem(queryParam, baiVietBody.tieu_de);
      return {
        status: true,
        data: list,
        page: page,
        message: "Cập nhật thông tin Bài viết thành công",
      };
    } else {
      return {
        status: false,
        message: "Cập nhật thông tin Bài viết thất bại",
      };
    }
  } else if (check_id_baiviet === null) {
    return {
      status: false,
      message: "Bài viết không tồn tại trên hệ thống.",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const updateImage = async (id_baiviet, image_url) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const bai_viet_item = await BaiViet.update(
        {
          image_url: String(image_url).trim(),
        },
        {
          where: {
            id_baiviet,
          },
        },
        { transaction: t }
      );
      return bai_viet_item;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const adminUpdateImageService = async (id_baiviet, image_url, queryParam) => {
  const check_id_baiviet = await checkBaiVietID(id_baiviet);
  if (check_id_baiviet) {
    const update_result = await updateImage(id_baiviet, image_url);
    if (update_result) {
      const list = await getAllOfset(queryParam);
      return {
        status: true,
        data: list,
        message: "Cập nhật ảnh đại diện cho bài viết thành công",
      };
    } else {
      return {
        status: false,
        message: "Cập nhật ảnh đại diện cho bài viết thất bại",
      };
    }
  } else if (check_id_baiviet === null) {
    return {
      status: false,
      message: "Bài viết không tồn tại trên hệ thống.",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const getAllOfset = async (queryParam) => {
  let { offset, limit, sort, type, keyword, status } = queryParam;
  status = Number(status);
  let whereObject = {};
  if (status === 1) {
    whereObject = {};
  } else if (status === 2) {
    whereObject = {
      hien_thi: true,
    };
  } else if (status === 3) {
    whereObject = {
      hien_thi: false,
    };
  } else if (status === 4) {
    whereObject = {
      [Op.or]: [
        {
          image_url: "",
        },
        {
          image_url: null,
        },
      ],
    };
  } else {
    return {
      status: true,
      data: [],
    };
  }
  try {
    const result = await sequelize.transaction(async (t) => {
      const list = await BaiViet.findAll({
        order: [[sort, type]],
        offset: Number(offset),
        limit: Number(limit),
        include: [
          { model: ChuyenMuc },
          { model: User, attributes: ["user_id", "username"] },
        ],
        where: {
          [Op.or]: [
            {
              id_baiviet: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              tieu_de: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              mo_ta: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              noi_dung: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              slug: {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
          [Op.and]: [whereObject],
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
  let { limit, sort, type, keyword, status } = queryParam;
  status = Number(status);
  let whereObject = {};
  if (status === 1) {
    whereObject = {};
  } else if (status === 2) {
    whereObject = {
      hien_thi: true,
    };
  } else if (status === 3) {
    whereObject = {
      hien_thi: false,
    };
  } else if (status === 4) {
    whereObject = {
      [Op.or]: [
        {
          image_url: "",
        },
        {
          image_url: null,
        },
      ],
    };
  } else {
    return {
      status: true,
      data: [],
    };
  }
  try {
    const result = await sequelize.transaction(async (t) => {
      const list = await BaiViet.findAll({
        order: [[sort, type]],
        where: {
          [Op.or]: [
            {
              id_baiviet: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              tieu_de: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              mo_ta: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              noi_dung: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              slug: {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
          [Op.and]: [whereObject],
        },
      });
      return list;
    });

    const find_index = result.findIndex(
      (item) =>
        String(item.tieu_de).trim().toLocaleLowerCase() ===
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
  adminGetAllBaiVietService,
  adminAddBaiVietService,
  adminDeleteBaiVietService,
  adminUpdateBaiVietService,
  adminUpdateImageService,
  adminOffsetService,
};
