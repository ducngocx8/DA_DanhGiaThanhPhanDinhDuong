const thucPhamValidationAdd = (req, res, next) => {
  let {
    id_thucpham,
    TenTiengAnh,
    TenTiengViet,
    DonViTinh,
    EDIBLE,
    ENERC,
    WATER,
    PROCNT,
    FAT,
    CHOCDF,
    FIBC,
    ASH,
    CA,
    P,
    FE,
    ZN,
    NA,
    K,
    MG,
    MN,
    CU,
    SE,
    VITC,
    THIA,
    RIBF,
    NIA,
    PANTAC,
    VITB6,
    FOL,
    FOLAC,
    BIOT,
    VITB12,
    RETOL,
    VITA,
    VITD,
    VITE,
    VITK,
    CARTB,
    CARTA,
    CRYXB,
    thucpham_status,
    id_nhomthucpham,
  } = req.body;

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

  if (!TenTiengViet || typeof TenTiengViet !== "string") {
    return res.status(201).send({
      status: false,
      message: "Chưa có thông tin tên thực phẩm bằng Tiếng Việt",
    });
  } else {
    if (String(TenTiengViet).trim() === "") {
      return res.status(201).send({
        status: false,
        message: "Chưa điền thông tin tên thực phẩm bằng Tiếng Việt",
      });
    } else if (
      String(TenTiengViet).trim().length > 2555 ||
      String(TenTiengViet).trim().length < 2
    ) {
      return res.status(201).send({
        status: false,
        message: "Tên thực phẩm bằng Tiếng Việt cần >= 2 và <= 255 ký tự",
      });
    }
  }

  if (typeof TenTiengAnh === "string" && TenTiengAnh.trim() !== "") {
    if (TenTiengAnh.trim().length < 2 || TenTiengAnh.trim().length > 255) {
      return res.status(201).send({
        status: false,
        message: "Tên thực phẩm bằng Tiếng Anh phải từ 2 ký tự trở lên.",
      });
    }
  } else if (typeof TenTiengAnh !== "string") {
    return res.status(201).send({
      status: false,
      message: "Tên thực phẩm bằng Tiếng Anh phải là chuỗi ký tự.",
    });
  }

  if (typeof DonViTinh === "string" && DonViTinh.trim() !== "") {
    if (DonViTinh.trim().length < 2 || DonViTinh.trim().length > 255) {
      return res.status(201).send({
        status: false,
        message: "Đơn vị thực phẩm phải từ 2 ký tự trở lên.",
      });
    }
  } else if (typeof DonViTinh !== "string") {
    return res.status(201).send({
      status: false,
      message: "Đơn vị thực phẩm phải là chuỗi ký tự.",
    });
  }

  if (!Number.isInteger(Number(id_nhomthucpham))) {
    return res.status(201).send({
      status: false,
      message: "ID nhóm thực phẩm phải là số nguyên",
    });
  }

  if (typeof thucpham_status !== "boolean") {
    return res.status(201).send({
      status: false,
      message: "Vui lòng điền thông tin trạng thái thực phẩm T/F",
    });
  }

  if (
    EDIBLE &&
    (typeof EDIBLE !== "number" || Number(EDIBLE) > 100 || Number(EDIBLE) < 0)
  ) {
    return res.status(201).send({
      status: false,
      message: "Tỷ lệ phần ăn được không thể > 100% hoặc < 0",
    });
  }
  if (ENERC && (typeof ENERC !== "number" || Number(ENERC) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Năng Lượng phải >= 0",
    });
  }

  if (WATER && (typeof WATER !== "number" || Number(WATER) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Nước phải >= 0",
    });
  }

  if (PROCNT && (typeof PROCNT !== "number" || Number(PROCNT) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Protein phải >= 0",
    });
  }

  if (FAT && (typeof FAT !== "number" || Number(FAT) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần chất béo (FAT) phải >= 0",
    });
  }

  if (CHOCDF && (typeof CHOCDF !== "number" || Number(CHOCDF) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Carbohydrate phải >= 0",
    });
  }

  if (FIBC && (typeof FIBC !== "number" || Number(FIBC) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Chất Xơ phải >= 0",
    });
  }

  if (ASH && (typeof ASH !== "number" || Number(ASH) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Tro phải >= 0",
    });
  }
  if (CA && (typeof CA !== "number" || Number(CA) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Canxi (CA) phải >= 0",
    });
  }
  if (P && (typeof P !== "number" || Number(P) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Phospho phải >= 0",
    });
  }

  if (FE && (typeof FE !== "number" || Number(FE) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Sắt phải >= 0",
    });
  }

  if (ZN && (typeof ZN !== "number" || Number(ZN) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Kẽm phải >= 0",
    });
  }
  if (NA && (typeof NA !== "number" || Number(NA) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Natri phải >= 0",
    });
  }

  if (K && (typeof K !== "number" || Number(K) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Kali phải >= 0",
    });
  }

  if (MG && (typeof MG !== "number" || Number(MG) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Magie phải >= 0",
    });
  }

  if (MN && (typeof MN !== "number" || Number(MN) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Mangan phải >= 0",
    });
  }
  if (CU && (typeof CU !== "number" || Number(CU) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Đồng phải >= 0",
    });
  }

  if (SE && (typeof SE !== "number" || Number(SE) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Selen phải >= 0",
    });
  }
  if (VITC && (typeof VITC !== "number" || Number(VITC) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Vitamin C phải >= 0",
    });
  }

  if (THIA && (typeof THIA !== "number" || Number(THIA) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Thiamin, Vitamin B1 phải >= 0",
    });
  }
  if (RIBF && (typeof RIBF !== "number" || Number(RIBF) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Riboflavin, Vitamin B2 phải >= 0",
    });
  }

  if (NIA && (typeof NIA !== "number" || Number(NIA) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Niacin phải >= 0",
    });
  }
  if (PANTAC && (typeof PANTAC !== "number" || Number(PANTAC) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Acid Pantothenic phải >= 0",
    });
  }

  if (VITB6 && (typeof VITB6 !== "number" || Number(VITB6) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Vitamin B6 phải >= 0",
    });
  }
  if (FOL && (typeof FOL !== "number" || Number(FOL) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Tổng FOL phải >= 0",
    });
  }

  if (FOLAC && (typeof FOLAC !== "number" || Number(FOLAC) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Acid Folic phải >= 0",
    });
  }
  if (BIOT && (typeof BIOT !== "number" || Number(BIOT) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Tổng Biotin phải >= 0",
    });
  }

  if (VITB12 && (typeof VITB12 !== "number" || Number(VITB12) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Vitamin B12 phải >= 0",
    });
  }
  if (RETOL && (typeof RETOL !== "number" || Number(RETOL) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Tổng Retinol phải >= 0",
    });
  }

  if (VITA && (typeof VITA !== "number" || Number(VITA) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Vitamin A phải >= 0",
    });
  }
  if (VITD && (typeof VITD !== "number" || Number(VITD) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Tổng Vitamin D phải >= 0",
    });
  }

  if (VITE && (typeof VITE !== "number" || Number(VITE) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Vitamin E phải >= 0",
    });
  }
  if (VITK && (typeof VITK !== "number" || Number(VITK) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Tổng Vitamin K phải >= 0",
    });
  }

  if (CARTB && (typeof CARTB !== "number" || Number(CARTB) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Beta-Carotene phải >= 0",
    });
  }
  if (CARTA && (typeof CARTA !== "number" || Number(CARTA) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Tổng Alpha - Carotene phải >= 0",
    });
  }
  if (CRYXB && (typeof CRYXB !== "number" || Number(CRYXB) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Tổng CRYXB phải >= 0",
    });
  }

  return next();
};

const thucPhamValidationUpdate = (req, res, next) => {
  let {
    TenTiengAnh,
    TenTiengViet,
    DonViTinh,
    EDIBLE,
    ENERC,
    WATER,
    PROCNT,
    FAT,
    CHOCDF,
    FIBC,
    ASH,
    CA,
    P,
    FE,
    ZN,
    NA,
    K,
    MG,
    MN,
    CU,
    SE,
    VITC,
    THIA,
    RIBF,
    NIA,
    PANTAC,
    VITB6,
    FOL,
    FOLAC,
    BIOT,
    VITB12,
    RETOL,
    VITA,
    VITD,
    VITE,
    VITK,
    CARTB,
    CARTA,
    CRYXB,
    thucpham_status,
    id_nhomthucpham,
  } = req.body;

  if (!TenTiengViet || typeof TenTiengViet !== "string") {
    return res.status(201).send({
      status: false,
      message: "Chưa có thông tin tên thực phẩm bằng Tiếng Việt",
    });
  } else {
    if (String(TenTiengViet).trim() === "") {
      return res.status(201).send({
        status: false,
        message: "Chưa điền thông tin tên thực phẩm bằng Tiếng Việt",
      });
    } else if (
      String(TenTiengViet).trim().length > 2555 ||
      String(TenTiengViet).trim().length < 2
    ) {
      return res.status(201).send({
        status: false,
        message: "Tên thực phẩm bằng Tiếng Việt cần >= 2 và <= 255 ký tự",
      });
    }
  }

  if (typeof TenTiengAnh === "string" && TenTiengAnh.trim() !== "") {
    if (TenTiengAnh.trim().length < 2 || TenTiengAnh.trim().length > 255) {
      return res.status(201).send({
        status: false,
        message: "Tên thực phẩm bằng Tiếng Anh phải từ 2 ký tự trở lên.",
      });
    }
  } else if (typeof TenTiengAnh !== "string") {
    return res.status(201).send({
      status: false,
      message: "Tên thực phẩm bằng Tiếng Anh phải là chuỗi ký tự.",
    });
  }

  if (typeof DonViTinh === "string" && DonViTinh.trim() !== "") {
    if (DonViTinh.trim().length < 2 || DonViTinh.trim().length > 255) {
      return res.status(201).send({
        status: false,
        message: "Đơn vị thực phẩm phải từ 2 ký tự trở lên.",
      });
    }
  } else if (typeof DonViTinh !== "string") {
    return res.status(201).send({
      status: false,
      message: "Đơn vị thực phẩm phải là chuỗi ký tự.",
    });
  }

  if (!Number.isInteger(Number(id_nhomthucpham))) {
    return res.status(201).send({
      status: false,
      message: "ID nhóm thực phẩm phải là số nguyên",
    });
  }

  if (typeof thucpham_status !== "boolean") {
    return res.status(201).send({
      status: false,
      message: "Vui lòng điền thông tin trạng thái thực phẩm T/F",
    });
  }

  if (
    EDIBLE &&
    (typeof EDIBLE !== "number" || Number(EDIBLE) > 100 || Number(EDIBLE) < 0)
  ) {
    return res.status(201).send({
      status: false,
      message: "Tỷ lệ phần ăn được không thể > 100% hoặc < 0",
    });
  }
  if (ENERC && (typeof ENERC !== "number" || Number(ENERC) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Năng Lượng phải >= 0",
    });
  }

  if (WATER && (typeof WATER !== "number" || Number(WATER) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Nước phải >= 0",
    });
  }

  if (PROCNT && (typeof PROCNT !== "number" || Number(PROCNT) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Protein phải >= 0",
    });
  }

  if (FAT && (typeof FAT !== "number" || Number(FAT) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần chất béo (FAT) phải >= 0",
    });
  }

  if (CHOCDF && (typeof CHOCDF !== "number" || Number(CHOCDF) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Carbohydrate phải >= 0",
    });
  }

  if (FIBC && (typeof FIBC !== "number" || Number(FIBC) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Chất Xơ phải >= 0",
    });
  }

  if (ASH && (typeof ASH !== "number" || Number(ASH) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Tro phải >= 0",
    });
  }
  if (CA && (typeof CA !== "number" || Number(CA) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Canxi (CA) phải >= 0",
    });
  }
  if (P && (typeof P !== "number" || Number(P) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Phospho phải >= 0",
    });
  }

  if (FE && (typeof FE !== "number" || Number(FE) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Sắt phải >= 0",
    });
  }

  if (ZN && (typeof ZN !== "number" || Number(ZN) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Kẽm phải >= 0",
    });
  }
  if (NA && (typeof NA !== "number" || Number(NA) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Natri phải >= 0",
    });
  }

  if (K && (typeof K !== "number" || Number(K) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Kali phải >= 0",
    });
  }

  if (MG && (typeof MG !== "number" || Number(MG) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Magie phải >= 0",
    });
  }

  if (MN && (typeof MN !== "number" || Number(MN) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Mangan phải >= 0",
    });
  }
  if (CU && (typeof CU !== "number" || Number(CU) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Đồng phải >= 0",
    });
  }

  if (SE && (typeof SE !== "number" || Number(SE) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Selen phải >= 0",
    });
  }
  if (VITC && (typeof VITC !== "number" || Number(VITC) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Vitamin C phải >= 0",
    });
  }

  if (THIA && (typeof THIA !== "number" || Number(THIA) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Thiamin, Vitamin B1 phải >= 0",
    });
  }
  if (RIBF && (typeof RIBF !== "number" || Number(RIBF) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Riboflavin, Vitamin B2 phải >= 0",
    });
  }

  if (NIA && (typeof NIA !== "number" || Number(NIA) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Niacin phải >= 0",
    });
  }
  if (PANTAC && (typeof PANTAC !== "number" || Number(PANTAC) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Acid Pantothenic phải >= 0",
    });
  }

  if (VITB6 && (typeof VITB6 !== "number" || Number(VITB6) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Vitamin B6 phải >= 0",
    });
  }
  if (FOL && (typeof FOL !== "number" || Number(FOL) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Tổng FOL phải >= 0",
    });
  }

  if (FOLAC && (typeof FOLAC !== "number" || Number(FOLAC) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Acid Folic phải >= 0",
    });
  }
  if (BIOT && (typeof BIOT !== "number" || Number(BIOT) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Tổng Biotin phải >= 0",
    });
  }

  if (VITB12 && (typeof VITB12 !== "number" || Number(VITB12) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Vitamin B12 phải >= 0",
    });
  }
  if (RETOL && (typeof RETOL !== "number" || Number(RETOL) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Tổng Retinol phải >= 0",
    });
  }

  if (VITA && (typeof VITA !== "number" || Number(VITA) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Vitamin A phải >= 0",
    });
  }
  if (VITD && (typeof VITD !== "number" || Number(VITD) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Tổng Vitamin D phải >= 0",
    });
  }

  if (VITE && (typeof VITE !== "number" || Number(VITE) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Vitamin E phải >= 0",
    });
  }
  if (VITK && (typeof VITK !== "number" || Number(VITK) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Tổng Vitamin K phải >= 0",
    });
  }

  if (CARTB && (typeof CARTB !== "number" || Number(CARTB) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Beta-Carotene phải >= 0",
    });
  }
  if (CARTA && (typeof CARTA !== "number" || Number(CARTA) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Tổng Alpha - Carotene phải >= 0",
    });
  }
  if (CRYXB && (typeof CRYXB !== "number" || Number(CRYXB) < 0)) {
    return res.status(201).send({
      status: false,
      message: "Thành phần Tổng CRYXB phải >= 0",
    });
  }

  return next();
};

const imageThucPhamValidation = (req, res, next) => {
  let { image_url } = req.body;
  if (!image_url && image_url !== "") {
    return res.status(201).send({
      status: false,
      message: "Chưa có thông tin hình ảnh cho thực phẩm",
    });
  } else {
    // if (image_url.trim() === "") {
    //   res.status(201).send({
    //     status: false,
    //     message: "Chưa chọn hình ảnh cho thực phẩm",
    //   });
    // } else if (image_url.trim().length > 255) {
    //   res.status(201).send({
    //     status: false,
    //     message: "Đường dẫn hình ảnh cho thực phẩm cần <= 255 ký tự",
    //   });
    // } else {
    //   next();
    // }
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
  thucPhamValidationAdd,
  thucPhamValidationUpdate,
  idThucPhamValidation,
  imageThucPhamValidation,
};
