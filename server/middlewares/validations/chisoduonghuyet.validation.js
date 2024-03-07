const addChiSoDuongHuyetValidation = (req, res, next) => {
  let { TenThucPham, id_thucpham, GI } = req.body;

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

  if (!TenThucPham || typeof TenThucPham !== "string") {
    return res.status(201).send({
      status: false,
      message: "Chưa có thông tin tên thực phẩm",
    });
  } else {
    if (TenThucPham.trim() === "") {
      return res.status(201).send({
        status: false,
        message: "Chưa điền thông tin tên thực phẩm",
      });
    } else if (
      TenThucPham.trim().length > 255 ||
      TenThucPham.trim().length < 2
    ) {
      return res.status(201).send({
        status: false,
        message: "Tên thực phẩm cần >= 2 và <= 255 ký tự",
      });
    }
  }

  if (typeof GI !== "number" || GI < 0 || GI > 200) {
    return res.status(201).send({
      status: false,
      message: "Chỉ số GI không hợp lệ",
    });
  }
  next();
};

const updateChiSoDuongHuyetValidation = (req, res, next) => {
  let { TenThucPham, GI } = req.body;

  if (!TenThucPham || typeof TenThucPham !== "string") {
    return res.status(201).send({
      status: false,
      message: "Chưa có thông tin tên thực phẩm",
    });
  } else {
    if (TenThucPham.trim() === "") {
      return res.status(201).send({
        status: false,
        message: "Chưa điền thông tin tên thực phẩm",
      });
    } else if (
      TenThucPham.trim().length > 255 ||
      TenThucPham.trim().length < 2
    ) {
      return res.status(201).send({
        status: false,
        message: "Tên thực phẩm cần >= 2 và <= 255 ký tự",
      });
    }
  }

  if (typeof GI !== "number" || GI < 0 || GI > 200) {
    return res.status(201).send({
      status: false,
      message: "Chỉ số GI không hợp lệ",
    });
  }

  return next();
};

const idThucPhamValidation = (req, res, next) => {
  const id_thucpham = req.params.id;
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
  return next();
};

module.exports = {
  addChiSoDuongHuyetValidation,
  idThucPhamValidation,
  updateChiSoDuongHuyetValidation
};
