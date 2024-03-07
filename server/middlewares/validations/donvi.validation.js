const tenDonViValidation = (req, res, next) => {
  let { ten_donvi } = req.body;
  if (!ten_donvi) {
    return res.status(201).send({
      status: false,
      message: "Chưa có thông tin tên đơn vị",
    });
  }
  if (typeof ten_donvi !== "string") {
    return res.status(201).send({
      status: false,
      message: "Tên đơn vị không hợp lệ",
    });
  }
  if (ten_donvi.trim() === "") {
    return res.status(201).send({
      status: false,
      message: "Chưa điền thông tin tên đơn vị",
    });
  } else if (ten_donvi.trim().length > 255 || ten_donvi.trim().length < 2) {
    return res.status(201).send({
      status: false,
      message: "Tên đơn vị cần >= 2 và <= 255 ký tự",
    });
  } else {
    return next();
  }
};

const idDonViValidation = (req, res, next) => {
  const id_donvi = req.params.id;
  if (!Number.isInteger(Number(id_donvi))) {
    res.status(201).send({
      status: false,
      message: "ID đơn vị phải là số nguyên",
    });
  } else {
    next();
  }
};

module.exports = {
  tenDonViValidation,
  idDonViValidation,
};
