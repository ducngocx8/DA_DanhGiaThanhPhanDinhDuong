// ngayan_id int AI PK
// time date
// quanty decimal(10,2)
// user_id int
// bua_an_id int
// id_monan int
const moment = require("moment");
const ngayAnUserValidation = async (req, res, next) => {
  const { quanty, bua_an_id, id_monan, time } = req.body;

  if (!Number.isInteger(bua_an_id)) {
    return res.status(201).send({
      status: false,
      message: "ID Bữa ăn chọn phải là số nguyên",
    });
  }

  if (!Number.isInteger(id_monan)) {
    return res.status(201).send({
      status: false,
      message: "ID Món ăn chọn phải là số nguyên",
    });
  }

  if (
    typeof quanty !== "number" ||
    (typeof quanty === "number" && quanty <= 0)
  ) {
    return res.status(201).send({
      status: false,
      message: "Lượng phần ăn phải là số > 0",
    });
  }

  if (!time || !moment(time).isValid()) {
    return res.status(201).send({
      status: false,
      message: "Dữ liệu ngày không hợp lệ",
    });
  }

  return next();
};

const idNgayAnValidation = (req, res, next) => {
  const id = req.params.id;
  if (!Number.isInteger(Number(id))) {
    return res.status(201).send({
      status: false,
      message: "ID Ngày Ăn chọn phải là số nguyên",
    });
  } else {
    next();
  }
};

const dayValidation = (req, res, next) => {
  const date_selected = req.query.date;
  if (date_selected && !moment(date_selected).isValid()) {
    return res.status(201).send({
      status: false,
      message: "Dữ liệu ngày không hợp lệ",
    });
  }
  next();
};

const dayValidationV2 = (req, res, next) => {
  const date_selected = req.query.date;
  if (!date_selected || !moment(date_selected).isValid()) {
    return res.status(201).send({
      status: false,
      message: "Dữ liệu ngày không hợp lệ",
    });
  }
  next();
};

const copyMonAnValidation = (req, res, next) => {
  const { timeCopy } = req.body;
  if (!timeCopy || !moment(timeCopy).isValid()) {
    return res.status(201).send({
      status: false,
      message: "Dữ liệu ngày không hợp lệ",
    });
  }
  next();
};

module.exports = {
  ngayAnUserValidation,
  idNgayAnValidation,
  dayValidation,
  dayValidationV2,
  copyMonAnValidation,
};
