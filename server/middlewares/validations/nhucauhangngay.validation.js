const checkIDNhuCauHangNgayValidation = (req, res, next) => {
  const { id_nhomtuoi, id_laodong, id_doituong, id_nhucau } = req.body;

  if (!Number.isInteger(Number(id_nhomtuoi))) {
    return res.status(201).send({
      status: false,
      message: "ID Nhóm tuổi phải là số nguyên",
    });
  }

  if (!Number.isInteger(Number(id_laodong))) {
    return res.status(201).send({
      status: false,
      message: "ID Lao động phải là số nguyên",
    });
  }

  if (!Number.isInteger(Number(id_doituong))) {
    return res.status(201).send({
      status: false,
      message: "ID Đối tượng phải là số nguyên",
    });
  }

  if (!Number.isInteger(Number(id_nhucau))) {
    return res.status(201).send({
      status: false,
      message: "ID Nhu cầu phải là số nguyên",
    });
  }

  return next();
};

const checkUpdateNhuCauHangNgayValidation = (req, res, next) => {
  const {
    id_nhomtuoi,
    id_laodong,
    id_doituong,
    id_nhucau,
    id_nhomtuoi_old,
    id_laodong_old,
    id_doituong_old,
    id_nhucau_old,
  } = req.body;

  if (!Number.isInteger(Number(id_nhomtuoi_old))) {
    return res.status(201).send({
      status: false,
      message: "ID Nhóm tuổi cũ phải là số nguyên",
    });
  }

  if (!Number.isInteger(Number(id_laodong_old))) {
    return res.status(201).send({
      status: false,
      message: "ID Lao động cũ phải là số nguyên",
    });
  }

  if (!Number.isInteger(Number(id_doituong_old))) {
    return res.status(201).send({
      status: false,
      message: "ID Đối tượng cũ phải là số nguyên",
    });
  }

  if (!Number.isInteger(Number(id_nhucau_old))) {
    return res.status(201).send({
      status: false,
      message: "ID Nhu cầu cũ phải là số nguyên",
    });
  }

  if (!Number.isInteger(Number(id_nhomtuoi))) {
    return res.status(201).send({
      status: false,
      message: "ID Nhóm tuổi mới phải là số nguyên",
    });
  }

  if (!Number.isInteger(Number(id_laodong))) {
    return res.status(201).send({
      status: false,
      message: "ID Lao động mới phải là số nguyên",
    });
  }

  if (!Number.isInteger(Number(id_doituong))) {
    return res.status(201).send({
      status: false,
      message: "ID Đối tượng mới phải là số nguyên",
    });
  }

  if (!Number.isInteger(Number(id_nhucau))) {
    return res.status(201).send({
      status: false,
      message: "ID Nhu cầu mới phải là số nguyên",
    });
  }

  return next();
};

module.exports = {
  checkIDNhuCauHangNgayValidation,
  checkUpdateNhuCauHangNgayValidation,
};
