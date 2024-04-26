const dienGiaiThanhPhanNhuCauValidation = (req, res, next) => {
  let { DienGiai } = req.body;
  if (!DienGiai || typeof DienGiai !== "string") {
    res.status(201).send({
      status: false,
      message: "Chưa có thông tin diễn giải thành phần nhu cầu",
    });
  } else {
    if (DienGiai.trim() === "") {
      res.status(201).send({
        status: false,
        message: "Chưa điền thông tin diễn giải thành phần nhu cầu",
      });
    } else if (DienGiai.trim().length < 2) {
      res.status(201).send({
        status: false,
        message: "Diễn giải thành phần nhu cầu cần >= 2 ký tự",
      });
    } else {
      next();
    }
  }
};

const idThanhPhanNhuCauValidation = (req, res, next) => {
  const id_nhucau = req.params.id;
  if (!Number.isInteger(Number(id_nhucau))) {
    res.status(201).send({
      status: false,
      message: "ID thành phần nhu cầu phải là số nguyên",
    });
  } else {
    next();
  }
};

module.exports = {
  dienGiaiThanhPhanNhuCauValidation,
  idThanhPhanNhuCauValidation,
};
