const tenNhomMonAnValidation = (req, res, next) => {
  let { ten_nhom } = req.body;
  if (!ten_nhom || typeof ten_nhom !== "string") {
    res.status(201).send({
      status: false,
      message: "Tên nhóm món ăn không hợp lệ",
    });
  } else {
    if (ten_nhom.trim() === "") {
      res.status(201).send({
        status: false,
        message: "Chưa điền thông tin tên nhóm món ăn",
      });
    } else if (ten_nhom.trim().length > 255 || ten_nhom.trim().length < 2) {
      res.status(201).send({
        status: false,
        message: "Tên nhóm món ăn cần >= 2 và <= 255 ký tự",
      });
    } else {
      next();
    }
  }
};

const imageNhomMonAnValidation = (req, res, next) => {
  let { image_url } = req.body;
  if (!image_url && image_url !== "") {
    return res.status(201).send({
      status: false,
      message: "Chưa có thông tin hình ảnh cho nhóm món ăn",
    });
  } else {
    // if (image_url.trim() === "") {
    //   res.status(201).send({
    //     status: false,
    //     message: "Chưa chọn hình ảnh cho nhóm món ăn",
    //   });
    // } else if (image_url.trim().length > 255) {
    //   res.status(201).send({
    //     status: false,
    //     message: "Đường dẫn hình ảnh cho nhóm món ăn cần <= 255 ký tự",
    //   });
    // } else {
    //   next();
    // }
  }

  return next();
};

const idNhomMonAnValidation = (req, res, next) => {
  const id_nhommonan = req.params.id;
  if (!Number.isInteger(Number(id_nhommonan))) {
    res.status(201).send({
      status: false,
      message: "ID nhóm món ăn phải là số nguyên",
    });
  } else {
    next();
  }
};

module.exports = {
  tenNhomMonAnValidation,
  idNhomMonAnValidation,
  imageNhomMonAnValidation,
};
