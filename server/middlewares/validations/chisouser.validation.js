const chiSoUserValidation = (req, res, next) => {
  let { age, height, weight, gender, user_id, id_laodong, id_doituong } =
    req.body;
  if (!Number.isInteger(age) || Number(age) < 1 || Number(age) > 140) {
    return res.status(201).send({
      status: false,
      message: "Tuổi phải là số nguyên > 0",
    });
  }
  if (
    !Number.isInteger(height) ||
    Number(height) < 40 ||
    Number(height) > 255
  ) {
    return res.status(201).send({
      status: false,
      message: "Chiêu cao phải là số nguyên > 40",
    });
  }
  if (
    typeof weight !== "number" ||
    (typeof weight === "number" && weight < 1) ||
    (typeof weight === "number" && weight > 500)
  ) {
    return res.status(201).send({
      status: false,
      message: "Cân nặng phải là số >= 1",
    });
  }
  if (!Number.isInteger(user_id)) {
    return res.status(201).send({
      status: false,
      message: "User ID phải là số nguyên.",
    });
  }
  if (!Number.isInteger(id_laodong)) {
    return res.status(201).send({
      status: false,
      message: "ID nhóm lao động phải là số nguyên.",
    });
  }
  if (!Number.isInteger(id_doituong)) {
    return res.status(201).send({
      status: false,
      message: "ID đối tượng phải là số nguyên.",
    });
  }
  if (!gender || (gender && gender !== "F" && gender !== "M")) {
    return res.status(201).send({
      status: false,
      message: "Chưa có thông tin tên giới tính F/M.",
    });
  }
  return next();
};
const chiSoUserOfUserValidation = (req, res, next) => {
  let { age, height, weight, gender, id_laodong, id_doituong } = req.body;
  if (!Number.isInteger(age) || Number(age) < 1 || Number(age) > 140) {
    return res.status(201).send({
      status: false,
      message: "Tuổi phải là số nguyên > 0",
    });
  }
  if (
    !Number.isInteger(height) ||
    Number(height) < 40 ||
    Number(height) > 255
  ) {
    return res.status(201).send({
      status: false,
      message: "Chiêu cao phải là số nguyên (Quá lớn hoặc dưới 40)",
    });
  }
  if (
    typeof weight !== "number" ||
    (typeof weight === "number" && weight < 1) ||
    (typeof weight === "number" && weight > 500)
  ) {
    return res.status(201).send({
      status: false,
      message: "Cân nặng không hợp lệ (Quá lớn hoặc dưới 1)",
    });
  }
  if (!Number.isInteger(id_laodong)) {
    return res.status(201).send({
      status: false,
      message: "ID nhóm lao động phải là số nguyên.",
    });
  }
  if (!Number.isInteger(id_doituong)) {
    return res.status(201).send({
      status: false,
      message: "ID đối tượng phải là số nguyên.",
    });
  }
  if (!gender || (gender && gender !== "F" && gender !== "M")) {
    return res.status(201).send({
      status: false,
      message: "Chưa có thông tin tên giới tính F/M.",
    });
  }
  return next();
};

const idChiSoUserValidation = (req, res, next) => {
  const id_chiso = req.params.id;
  if (typeof id_chiso !== "string") {
    return res.status(201).send({
      status: false,
      message: "ID Chỉ Số User không hợp lệ.",
    });
  } else {
    next();
  }
};

module.exports = {
  chiSoUserValidation,
  idChiSoUserValidation,
  chiSoUserOfUserValidation,
};
