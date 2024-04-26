const tenChuyenMucValidation = (req, res, next) => {
  let { ten_chuyenmuc } = req.body;
  if (!ten_chuyenmuc) {
    return res.status(201).send({
      status: false,
      message: "Chưa có thông tin tên chuyên mục",
    });
  }
  if (typeof ten_chuyenmuc !== "string") {
    return res.status(201).send({
      status: false,
      message: "Tên chuyên mục không hợp lệ",
    });
  }
  if (ten_chuyenmuc.trim() === "") {
    return res.status(201).send({
      status: false,
      message: "Chưa điền thông tin tên chuyên mục",
    });
  } else if (
    ten_chuyenmuc.trim().length > 255 ||
    ten_chuyenmuc.trim().length < 2
  ) {
    return res.status(201).send({
      status: false,
      message: "Tên chuyên mục cần >= 2 và <= 255 ký tự",
    });
  } else {
    return next();
  }
};

const idChuyenMucValidation = (req, res, next) => {
  const id_chuyenmuc = req.params.id;
  if (!Number.isInteger(Number(id_chuyenmuc))) {
    res.status(201).send({
      status: false,
      message: "ID chuyên mục phải là số nguyên",
    });
  } else {
    next();
  }
};

module.exports = {
  tenChuyenMucValidation,
  idChuyenMucValidation,
};
