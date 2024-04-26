const MucTieuValidation = (req, res, next) => {
  let { ENERC, PROCNT, FAT, CHOCDF, note } = req.body;
  if ((typeof ENERC !== "number" && isNaN(ENERC)) || Number(ENERC) < 0) {
    return res.status(201).send({
      status: false,
      message: "Năng lượng phải là một số >= 0",
    });
  }
  if ((typeof PROCNT !== "number" && isNaN(PROCNT)) || Number(PROCNT) < 0) {
    return res.status(201).send({
      status: false,
      message: "Lượng chất đạm (Protein) phải là một số >= 0",
    });
  }
  if ((typeof FAT !== "number" && isNaN(FAT)) || Number(FAT) < 0) {
    return res.status(201).send({
      status: false,
      message: "Lượng chất béo (FAT) phải là một số >= 0",
    });
  }
  if ((typeof CHOCDF !== "number" && isNaN(CHOCDF)) || Number(CHOCDF) < 0) {
    return res.status(201).send({
      status: false,
      message: "Lượng Carbohydrate phải là một số >= 0",
    });
  }
  if (
    typeof note !== "string" ||
    (typeof note === "string" && note.trim().length > 255)
  ) {
    return res.status(201).send({
      status: false,
      message: "Ghi chú cần là chuổi ký tự < 256 ký tự",
    });
  }
  return next();
};

const idMucTieuValidation = (req, res, next) => {
  const muctieu_id = req.params.id;
  if (typeof muctieu_id !== "string") {
    return res.status(201).send({
      status: false,
      message: "Mã ID Mục tiêu không hợp lệ.",
    });
  } else {
    next();
  }
};

module.exports = {
  MucTieuValidation,
  idMucTieuValidation,
};
