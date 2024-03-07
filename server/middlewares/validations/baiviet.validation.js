//     id_baiviet INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//     slug CHAR(100) NOT NULL,
//     tieu_de VARCHAR (255) NOT NULL DEFAULT '',
//     mo_ta VARCHAR (255) NOT NULL DEFAULT '',
//     noi_dung TEXT NOT NULL DEFAULT '',
//     image_url VARCHAR(255) NOT NULL DEFAULT '',
//     createdAt DATE NOT NULL,
//     updatedAt DATE NOT NULL,
// 	   user_id INT NOT NULL,
//     id_chuyenmuc INT NOT NULL,
//     luot_xem BIGINT NOT NULL DEFAULT 0,
//     hien_thi BOOLEAN NOT NULL DEFAULT true,

const { regexSlug } = require("../../Utils");

const baiVietValidation = async (req, res, next) => {
  const { tieu_de, mo_ta, id_chuyenmuc, hien_thi, slug, noi_dung } = req.body;

  if (!tieu_de || typeof tieu_de !== "string") {
    return res.status(201).send({
      status: false,
      message: "Chưa có thông tin tiêu đề bài viết",
    });
  } else {
    if (String(tieu_de).trim() === "") {
      return res.status(201).send({
        status: false,
        message: "Chưa điền thông tin tiêu đề bài viết",
      });
    } else if (
      String(tieu_de).trim().length > 255 ||
      String(tieu_de).trim().length < 5
    ) {
      return res.status(201).send({
        status: false,
        message: "Tiêu đề bài viết cần >= 5 và <= 255 ký tự",
      });
    }
  }

  if (!slug || typeof slug !== "string") {
    return res.status(201).send({
      status: false,
      message: "Chưa có thông tin đường dẫn bài viết",
    });
  } else {
    if (!regexSlug.test(String(slug).trim())) {
      return res.status(201).send({
        status: false,
        message: "Đường dẫn bài viết không hợp lệ",
      });
    } else if (
      String(slug).trim().length > 255 ||
      String(slug).trim().length < 2
    ) {
      return res.status(201).send({
        status: false,
        message: "Đường dẫn bài viết cần >= 2 và <= 255 ký tự",
      });
    }
  }

  if (!mo_ta || typeof mo_ta !== "string") {
    return res.status(201).send({
      status: false,
      message: "Chưa có thông tin mô tả bài viết",
    });
  } else {
    if (String(mo_ta).trim() === "") {
      return res.status(201).send({
        status: false,
        message: "Chưa điền thông tin mô tả bài viết",
      });
    } else if (
      String(mo_ta).trim().length > 255 ||
      String(mo_ta).trim().length < 2
    ) {
      return res.status(201).send({
        status: false,
        message: "Mô tả bài viết cần >= 2 và <= 255 ký tự",
      });
    }
  }

  if (!noi_dung || typeof noi_dung !== "string") {
    return res.status(201).send({
      status: false,
      message: "Chưa có thông tin nội dung bài viết",
    });
  } else {
    if (String(noi_dung).trim() === "") {
      return res.status(201).send({
        status: false,
        message: "Chưa điền thông tin nội dung bài viết",
      });
    }
  }

  if (!Number.isInteger(Number(id_chuyenmuc))) {
    return res.status(201).send({
      status: false,
      message: "ID chuyên mục phải là số nguyên",
    });
  }

  if (typeof hien_thi !== "boolean") {
    return res.status(201).send({
      status: false,
      message: "Vui lòng chọn trạng thái bài viết",
    });
  }
  return next();
};

const imageBaiVietValidation = (req, res, next) => {
  let { image_url } = req.body;
  if (!image_url && image_url !== "") {
    return res.status(201).send({
      status: false,
      message: "Chưa có thông tin hình ảnh bài viết",
    });
  }
  return next();
};

const idBaiVietValidation = (req, res, next) => {
  const id_baiviet = req.params.id;
  if (!Number.isInteger(Number(id_baiviet))) {
    return res.status(201).send({
      status: false,
      message: "ID bài viết phải là số nguyên",
    });
  } else {
    next();
  }
};

const slugBaiVietValidation = (req, res, next) => {
  const slug = req.params.id;
  if (!slug || typeof slug !== "string") {
    return res.status(201).send({
      status: false,
      message: "Chưa có thông tin đường dẫn bài viết",
    });
  } else {
    if (!regexSlug.test(String(slug).trim())) {
      return res.status(201).send({
        status: false,
        message: "Đường dẫn bài viết không hợp lệ",
      });
    }
  }
  next();
};

const offsetCungChuyenMucValidation = (req, res, next) => {
  const id_baiviet = req.query.id_baiviet;
  const id_chuyenmuc = req.query.id_chuyenmuc;
  if (!Number.isInteger(Number(id_baiviet))) {
    return res.status(201).send({
      status: false,
      message: "ID bài viết phải là số nguyên",
    });
  }

  if (!Number.isInteger(Number(id_chuyenmuc))) {
    return res.status(201).send({
      status: false,
      message: "ID chuyên mục phải là số nguyên",
    });
  }

  next();
};

module.exports = {
  baiVietValidation,
  idBaiVietValidation,
  imageBaiVietValidation,
  slugBaiVietValidation,
  offsetCungChuyenMucValidation,
};
