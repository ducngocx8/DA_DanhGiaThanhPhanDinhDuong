const tenLaoDongValidation = (req, res, next) => {
  let { TenLaoDong } = req.body;
  if (!TenLaoDong) {
    res.status(201).send({
      status: false,
      message: "Chưa có thông tin tên lao động",
    });
  } else {
    if (String(TenLaoDong).trim() === "") {
      res.status(201).send({
        status: false,
        message: "Chưa điền thông tin tên lao động",
      });
    } else if (
      String(TenLaoDong).trim().length > 255 ||
      String(TenLaoDong).trim().length < 2
    ) {
      res.status(201).send({
        status: false,
        message: "Tên lao động cần >= 2 và <= 255 ký tự",
      });
    } else {
      next();
    }
  }
};

const idLaoDongValidation = (req, res, next) => {
  const id_laodong = req.params.id;
  if (!Number.isInteger(Number(id_laodong))) {
    res.status(201).send({
      status: false,
      message: "ID Lao động phải là số nguyên",
    });
  } else {
    next();
  }
};

module.exports = {
  tenLaoDongValidation,
  idLaoDongValidation,
};
