// id_chitietmon int PK
// ten_phannhom varchar(45)
// quanty decimal(10,2)
// id_monan int
// id_thucpham char(5)
const chiTietMonValidation = (req, res, next) => {
  let { id_monan, id_thucpham, quanty, ten_phannhom } = req.body;

  if (!Number.isInteger(id_monan)) {
    return res.status(201).send({
      status: false,
      message: "ID món ăn phải là số nguyên",
    });
  }

  if (!id_thucpham || typeof id_thucpham !== "string") {
    return res.status(201).send({
      status: false,
      message: "Chưa có thông tin ID thực phẩm",
    });
  } else {
    if (String(id_thucpham).trim() === "") {
      return res.status(201).send({
        status: false,
        message: "Chưa điền thông tin ID thực phẩm",
      });
    } else if (
      String(id_thucpham).trim().length > 5 ||
      String(id_thucpham).trim().length < 2
    ) {
      return res.status(201).send({
        status: false,
        message: "ID thực phẩm cần >= 2 và <= 5 ký tự",
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

  if (typeof ten_phannhom !== "string") {
    return res.status(201).send({
      status: false,
      message: "Chưa có thông tin tên phân nhóm món ăn VD: Gia vị, Rau",
    });
  } else {
    if (String(ten_phannhom).trim().length > 45) {
      return res.status(201).send({
        status: false,
        message: "Tên phân nhóm món ăn phải <= 45 ký tự",
      });
    }
  }
  return next();
};

const idChiTietMonValidation = (req, res, next) => {
  const id_chitietmon = req.params.id;
  if (!Number.isInteger(Number(id_chitietmon))) {
    return res.status(201).send({
      status: false,
      message: "ID chi tiết món ăn phải là số nguyên",
    });
  } else {
    next();
  }
};

module.exports = {
  chiTietMonValidation,
  idChiTietMonValidation,
};
