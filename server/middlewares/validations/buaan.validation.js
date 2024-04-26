const tenBuaAnValidation = (req, res, next) => {
  let { ten_bua_an } = req.body;
  if (!ten_bua_an || typeof ten_bua_an !== "string") {
    res.status(201).send({
      status: false,
      message: "Tên bữa ăn không hợp lệ",
    });
  } else {
    if (ten_bua_an.trim() === "") {
      res.status(201).send({
        status: false,
        message: "Chưa điền thông tin tên bữa ăn",
      });
    } else if (ten_bua_an.trim().length > 20 || ten_bua_an.trim().length < 2) {
      res.status(201).send({
        status: false,
        message: "Tên bữa ăn cần >= 2 và <= 20 ký tự",
      });
    } else {
      next();
    }
  }
};

const imageBuaAnValidation = (req, res, next) => {
  let { image_url } = req.body;
  if (!image_url && image_url !== "") {
    return res.status(201).send({
      status: false,
      message: "Chưa có thông tin hình ảnh cho bữa ăn",
    });
  } else {
    // if (image_url.trim() === "") {
    //   res.status(201).send({
    //     status: false,
    //     message: "Chưa chọn hình ảnh cho bữa ăn",
    //   });
    // } else if (image_url.trim().length > 255) {
    //   res.status(201).send({
    //     status: false,
    //     message: "Đường dẫn hình ảnh cho bữa ăn cần <= 255 ký tự",
    //   });
    // } else {
    //   next();
    // }
  }

  return next();
};

const idBuaAnValidation = (req, res, next) => {
  const bua_an_id = req.params.id;
  if (!Number.isInteger(Number(bua_an_id))) {
    res.status(201).send({
      status: false,
      message: "ID bữa ăn phải là số nguyên",
    });
  } else {
    next();
  }
};

module.exports = {
  tenBuaAnValidation,
  idBuaAnValidation,
  imageBuaAnValidation,
};
