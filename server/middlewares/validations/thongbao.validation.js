const ThongBaoValidation = (req, res, next) => {
  let { expo_key, status } = req.body;
  if (
    typeof expo_key !== "string" ||
    (typeof expo_key === "string" &&
      (expo_key.trim().length > 255 ||
        !expo_key.includes("ExponentPushToken[")))
  ) {
    return res.status(201).send({
      status: false,
      message: "Expo Key không hợp lệ",
    });
  }
  if (typeof status !== "boolean") {
    return res.status(201).send({
      status: false,
      message: "Vui lòng chọn trạng thái thông báo",
    });
  }
  return next();
};

const userIDValidation = (req, res, next) => {
  const user_id = req.params.id;
  if (!Number.isInteger(Number(user_id))) {
    res.status(201).send({
      status: false,
      message: "User ID phải là số nguyên",
    });
  } else {
    next();
  }
};

const ThongBaoAdminValidation = (req, res, next) => {
  let { title, body } = req.body;
  if (
    !title ||
    typeof title !== "string" ||
    (typeof title === "string" && title.trim().length > 100)
  ) {
    return res.status(201).send({
      status: false,
      message: "Tiêu đề không hợp lệ hoặc vượt quá 100 ký tự",
    });
  }
  if (
    !body ||
    typeof body !== "string" ||
    (typeof body === "string" && body.trim().length > 255)
  ) {
    return res.status(201).send({
      status: false,
      message: "Nội dung không hợp lệ hoặc vượt quá 255 ký tự",
    });
  }
  return next();
};

module.exports = {
  ThongBaoValidation,
  userIDValidation,
  ThongBaoAdminValidation,
};
