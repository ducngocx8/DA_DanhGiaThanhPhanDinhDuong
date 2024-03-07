// id int AI PK
// quanty decimal(10,2)
// id_thucpham char(5)
// user_id int

const thucPhamChonUserValidation = async (req, res, next) => {
  const { quanty, id_thucpham } = req.body;

  if (!id_thucpham || typeof id_thucpham !== "string") {
    return res.status(201).send({
      status: false,
      message: "Chưa có thông tin ID Thực phẩm.",
    });
  } else {
    if (String(id_thucpham).trim() === "") {
      return res.status(201).send({
        status: false,
        message: "Bạn chưa chọn Thực phẩm.",
      });
    } else if (
      String(id_thucpham).trim().length > 5 ||
      String(id_thucpham).trim().length < 2
    ) {
      return res.status(201).send({
        status: false,
        message:
          "Mã thực phẩm không hợp lệ (Đang dưới 2 ký tự hoặc nhiều hơn 5 ký tự)",
      });
    }
  }

  if (
    typeof quanty !== "number" ||
    (typeof quanty === "number" && quanty <= 0)
  ) {
    return res.status(201).send({
      status: false,
      message: "Khối lượng thực phẩm phải là số > 0",
    });
  }

  return next();
};

const idThucPhamChonValidation = (req, res, next) => {
  const id = req.params.id;
  if (!Number.isInteger(Number(id))) {
    return res.status(201).send({
      status: false,
      message: "ID Thực phẩm chọn phải là số nguyên",
    });
  } else {
    next();
  }
};

module.exports = {
  thucPhamChonUserValidation,
  idThucPhamChonValidation,
};
