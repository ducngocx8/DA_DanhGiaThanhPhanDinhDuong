const nhomTuoiValidation = (req, res, next) => {
  let { TenNhomTuoi, strAge, endAge } = req.body;
  if (!Number.isInteger(Number(strAge)) || Number(strAge) < 0) {
    return res.status(201).send({
      status: false,
      message: "Start Age phải là số nguyên >= 0",
    });
  }
  if (!Number.isInteger(Number(endAge)) || Number(endAge) < 0) {
    return res.status(201).send({
      status: false,
      message: "End Age phải là số nguyên >= 0",
    });
  }
  if (Number(strAge) > Number(endAge)) {
    return res.status(201).send({
      status: false,
      message: "Start Age phải nhỏ hơn End Age",
    });
  }
  if (!TenNhomTuoi) {
    res.status(201).send({
      status: false,
      message: "Chưa có thông tin tên nhóm tuổi",
    });
  } else {
    if (String(TenNhomTuoi).trim() === "") {
      res.status(201).send({
        status: false,
        message: "Chưa điền thông tin tên nhóm tuổi",
      });
    } else if (
      String(TenNhomTuoi).trim().length > 255 ||
      String(TenNhomTuoi).trim().length < 2
    ) {
      res.status(201).send({
        status: false,
        message: "Tên nhóm tuổi cần >= 2 và <= 255 ký tự",
      });
    } else {
      next();
    }
  }
};

const idNhomTuoiValidation = (req, res, next) => {
  const id_doituong = req.params.id;
  if (!Number.isInteger(Number(id_doituong))) {
    res.status(201).send({
      status: false,
      message: "ID nhóm tuổi phải là số nguyên",
    });
  } else {
    next();
  }
};

module.exports = {
  nhomTuoiValidation,
  idNhomTuoiValidation,
};
