// id_monan int AI PK
// ten_mon varchar(255)
// don_vi varchar(255)
// image_url varchar(255)
// id_nhommonan int
// user_id int
// monan_status int DEFAULT 0 (0, 1, 2),

// id_chitietmon int PK
// ten_phannhom varchar(45)
// quanty decimal(10,2)
// id_monan int
// id_thucpham char(5)

const checkListChiTietMon = (listChiTietMon) => {
  for (item of listChiTietMon) {
    if (
      typeof item.ten_phannhom !== "string" ||
      typeof item.quanty !== "number" ||
      typeof item.id_thucpham !== "string"
    ) {
      return {
        status: false,
        message:
          "Dữ liệu nhập vào của một số thuộc tính trong mã thực phẩm " +
          item.id_thucpham +
          " không đúng hoặc còn thiếu.",
      };
    }
    if (item.ten_phannhom.trim().length > 45) {
      return {
        status: false,
        message:
          "Món ăn với mã thực phẩm " +
          item.id_thucpham +
          " đang có tên phân nhóm vượt quá 45 ký tự.",
      };
    }

    if (item.quanty <= 0) {
      return {
        status: false,
        message:
          "Món ăn với mã thực phẩm " +
          item.id_thucpham +
          " đang có khối lượng <= 0",
      };
    }
  }
  return {
    status: true,
  };
};

const monAnValidation = async (req, res, next) => {
  const { ten_mon, don_vi, id_nhommonan, monan_status, listChiTietMon } =
    req.body;
  // Nếu phân quyền Admin thêm món thì sẽ cho user_id = NULL hoặc user_id = id đều được v.v

  if (req.method === "POST") {
    if (!Array.isArray(listChiTietMon)) {
      return res.status(201).send({
        status: false,
        message: "Vui lòng thêm thực phẩm vào món ăn và thử lại.",
      });
    }

    if (listChiTietMon.length === 0) {
      return res.status(201).send({
        status: false,
        message: "Chi tiết món ăn cần phải có ít nhất 1 thực phẩm.",
      });
    }

    if (listChiTietMon.length > 0) {
      const result = checkListChiTietMon(listChiTietMon);
      if (!result.status) {
        return res.status(201).send({
          status: false,
          message: result.message,
        });
      }
    }
  }

  if (!ten_mon || typeof ten_mon !== "string") {
    return res.status(201).send({
      status: false,
      message: "Chưa có thông tin tên món ăn",
    });
  } else {
    if (String(ten_mon).trim() === "") {
      return res.status(201).send({
        status: false,
        message: "Chưa điền thông tin tên món ăn",
      });
    } else if (
      String(ten_mon).trim().length > 255 ||
      String(ten_mon).trim().length < 2
    ) {
      return res.status(201).send({
        status: false,
        message: "Tên món ăn cần >= 2 và <= 255 ký tự",
      });
    }
  }

  if (!don_vi || typeof don_vi !== "string") {
    return res.status(201).send({
      status: false,
      message: "Chưa có thông tin đơn vị của món ăn (Phần, Chén, Củ...)",
    });
  } else {
    if (String(don_vi).trim() === "") {
      return res.status(201).send({
        status: false,
        message: "Chưa điền thông tin đơn vị của món ăn (Phần, Chén, Củ...)",
      });
    } else if (
      String(don_vi).trim().length > 255 ||
      String(don_vi).trim().length < 2
    ) {
      return res.status(201).send({
        status: false,
        message: "Tên đơn vị của món ăn cần >= 2 và <= 255 ký tự",
      });
    }
  }

  if (!Number.isInteger(Number(id_nhommonan))) {
    return res.status(201).send({
      status: false,
      message: "ID nhóm món ăn phải là số nguyên",
    });
  }

  console.log(
    "monan_status",
    !Number.isInteger(monan_status) || monan_status < 0 || monan_status > 2
  );

  if (req.method === "POST") {
    if (
      !Number.isInteger(monan_status) ||
      (monan_status !== 0 && monan_status !== 2)
    ) {
      return res.status(201).send({
        status: false,
        message: "Vui lòng chọn trạng thái của món ăn",
      });
    }
  } else {
    if (
      !Number.isInteger(monan_status) ||
      monan_status < 0 ||
      monan_status > 2
    ) {
      return res.status(201).send({
        status: false,
        message: "Vui lòng chọn trạng thái của món ăn",
      });
    }
  }

  return next();
};

const monAnAdminValidation = async (req, res, next) => {
  const { ten_mon, don_vi, id_nhommonan, monan_status, listChiTietMon } =
    req.body;
  // Nếu phân quyền Admin thêm món thì sẽ cho user_id = NULL hoặc user_id = id đều được v.v

  if (req.method === "POST") {
    if (!Array.isArray(listChiTietMon)) {
      return res.status(201).send({
        status: false,
        message: "Vui lòng thêm thực phẩm vào món ăn và thử lại.",
      });
    }

    if (listChiTietMon.length === 0) {
      return res.status(201).send({
        status: false,
        message: "Chi tiết món ăn cần phải có ít nhất 1 thực phẩm.",
      });
    }

    if (listChiTietMon.length > 0) {
      const result = checkListChiTietMon(listChiTietMon);
      if (!result.status) {
        return res.status(201).send({
          status: false,
          message: result.message,
        });
      }
    }
  }

  if (!ten_mon || typeof ten_mon !== "string") {
    return res.status(201).send({
      status: false,
      message: "Chưa có thông tin tên món ăn",
    });
  } else {
    if (String(ten_mon).trim() === "") {
      return res.status(201).send({
        status: false,
        message: "Chưa điền thông tin tên món ăn",
      });
    } else if (
      String(ten_mon).trim().length > 255 ||
      String(ten_mon).trim().length < 2
    ) {
      return res.status(201).send({
        status: false,
        message: "Tên món ăn cần >= 2 và <= 255 ký tự",
      });
    }
  }

  if (!don_vi || typeof don_vi !== "string") {
    return res.status(201).send({
      status: false,
      message: "Chưa có thông tin đơn vị của món ăn (Phần, Chén, Củ...)",
    });
  } else {
    if (String(don_vi).trim() === "") {
      return res.status(201).send({
        status: false,
        message: "Chưa điền thông tin đơn vị của món ăn (Phần, Chén, Củ...)",
      });
    } else if (
      String(don_vi).trim().length > 255 ||
      String(don_vi).trim().length < 2
    ) {
      return res.status(201).send({
        status: false,
        message: "Tên đơn vị của món ăn cần >= 2 và <= 255 ký tự",
      });
    }
  }

  if (!Number.isInteger(Number(id_nhommonan))) {
    return res.status(201).send({
      status: false,
      message: "ID nhóm món ăn phải là số nguyên",
    });
  }

  if (!Number.isInteger(monan_status) || monan_status < 0 || monan_status > 2) {
    return res.status(201).send({
      status: false,
      message: "Vui lòng chọn trạng thái của món ăn",
    });
  }
  return next();
};

const imageMonAnValidation = (req, res, next) => {
  let { image_url } = req.body;
  if (!image_url && image_url !== "") {
    return res.status(201).send({
      status: false,
      message: "Chưa có thông tin hình ảnh cho nhóm món ăn",
    });
  }
  return next();
};

const idMonAnValidation = (req, res, next) => {
  const id_monan = req.params.id;
  if (!Number.isInteger(Number(id_monan))) {
    return res.status(201).send({
      status: false,
      message: "ID món ăn phải là số nguyên",
    });
  } else {
    next();
  }
};

module.exports = {
  monAnValidation,
  idMonAnValidation,
  imageMonAnValidation,
  monAnAdminValidation,
};
