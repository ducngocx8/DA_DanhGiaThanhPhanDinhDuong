const tenDoiTuongValidation = (req, res, next) => {
  let { TenDoiTuong } = req.body;
  if (!TenDoiTuong) {
    res.status(201).send({
      status: false,
      message: "Chưa có thông tin tên đối tượng",
    });
  } else {
    if (String(TenDoiTuong).trim() === "") {
      res.status(201).send({
        status: false,
        message: "Chưa điền thông tin tên đối tượng",
      });
    } else if (
      String(TenDoiTuong).trim().length > 255 ||
      String(TenDoiTuong).trim().length < 2
    ) {
      res.status(201).send({
        status: false,
        message: "Tên đối tượng cần >= 2 và <= 255 ký tự",
      });
    } else {
      next();
    }
  }
};

const idDoiTuongValidation = (req, res, next) => {
  const id_doituong = req.params.id;
  if (!Number.isInteger(Number(id_doituong))) {
    res.status(201).send({
      status: false,
      message: "ID đối tượng phải là số nguyên",
    });
  } else {
    next();
  }
};

module.exports = {
  tenDoiTuongValidation,
  idDoiTuongValidation,
};
