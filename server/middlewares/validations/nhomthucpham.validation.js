const tenNhomThucPhamValidation = (req, res, next) => {
  let { ten_nhom } = req.body;
  if (!ten_nhom) {
    return res.status(201).send({
      status: false,
      message: "Chưa có thông tin tên nhóm thực phẩm",
    });
  }
  if (typeof ten_nhom !== "string") {
    return res.status(201).send({
      status: false,
      message: "Tên nhóm thực phẩm không hợp lệ",
    });
  }
  if (String(ten_nhom).trim() === "") {
    return res.status(201).send({
      status: false,
      message: "Chưa điền thông tin tên nhóm thực phẩm",
    });
  } else if (
    String(ten_nhom).trim().length > 255 ||
    String(ten_nhom).trim().length < 2
  ) {
    return res.status(201).send({
      status: false,
      message: "Tên nhóm thực phẩm cần >= 2 và <= 255 ký tự",
    });
  } else {
    return next();
  }
};

const imageNhomThucPhamValidation = (req, res, next) => {
  let { image_url } = req.body;
  if (!image_url && image_url !== "") {
    return res.status(201).send({
      status: false,
      message: "Chưa có thông tin hình ảnh cho nhóm thực phẩm",
    });
  } else {
    // if (image_url.trim() === "") {
    //   res.status(201).send({
    //     status: false,
    //     message: "Chưa chọn hình ảnh cho nhóm thực phẩm",
    //   });
    // } else if (image_url.trim().length > 255) {
    //   res.status(201).send({
    //     status: false,
    //     message: "Đường dẫn hình ảnh cho nhóm thực phẩm cần <= 255 ký tự",
    //   });
    // } else {
    //   next();
    // }
  }

  return next();
};

const idNhomThucPhamValidation = (req, res, next) => {
  const id_nhomthucpham = req.params.id;
  if (!Number.isInteger(Number(id_nhomthucpham))) {
    res.status(201).send({
      status: false,
      message: "ID nhóm thực phẩm phải là số nguyên",
    });
  } else {
    next();
  }
};

module.exports = {
  tenNhomThucPhamValidation,
  idNhomThucPhamValidation,
  imageNhomThucPhamValidation,
};
