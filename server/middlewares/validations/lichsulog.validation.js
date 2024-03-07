const idLichSuLogValidation = (req, res, next) => {
  const muctieu_id = req.params.id;
  if (typeof muctieu_id !== "string") {
    return res.status(201).send({
      status: false,
      message: "ID Lịch sử đăng nhập không hợp lệ.",
    });
  } else {
    next();
  }
};

module.exports = {
  idLichSuLogValidation,
};
