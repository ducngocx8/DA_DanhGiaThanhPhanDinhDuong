const thanhPhanDinhDuongMonAn = (monAn, quantyPhanAn) => {
  const newtongThanhPhanChinh = {
    PROCNT: 0,
    FAT: 0,
    CHOCDF: 0,
    ENERC: 0,
    EDIBLE: 0,
    WATER: 0,
    FIBC: 0,
    ASH: 0,
    CA: 0,
    P: 0,
    FE: 0,
    ZN: 0,
    NA: 0,
    K: 0,
    MG: 0,
    MN: 0,
    CU: 0,
    SE: 0,
    VITC: 0,
    THIA: 0,
    RIBF: 0,
    NIA: 0,
    PANTAC: 0,
    VITB6: 0,
    FOL: 0,
    FOLAC: 0,
    BIOT: 0,
    VITB12: 0,
    RETOL: 0,
    VITA: 0,
    VITD: 0,
    VITE: 0,
    VITK: 0,
    CARTB: 0,
    CARTA: 0,
    CRYXB: 0,
    ThanhPhan: [],
  };
  monAn?.ChiTietMons?.forEach((item) => {
    newtongThanhPhanChinh["ThanhPhan"].push({
      ten_phannhom: item.ten_phannhom,
      quanty: item.quanty,
      id_thucpham: item.id_thucpham,
      TenTiengAnh: item.ThucPham.TenTiengAnh,
      TenTiengViet: item.ThucPham.TenTiengViet,
    });
    for (const [key, value] of Object.entries(item.ThucPham)) {
      if (
        ![
          "id_thucpham",
          "TenTiengAnh",
          "TenTiengViet",
          "DonViTinh",
          "id_nhomthucpham",
          "image_url",
        ].includes(key)
      ) {
        if (typeof Number(value) === "number") {
          newtongThanhPhanChinh[key] =
            Number(newtongThanhPhanChinh[key]) +
            (Number(value) * Number(item.quanty) * quantyPhanAn) / 100;
        }
      }
    }
  });
  for (const [key, value] of Object.entries(newtongThanhPhanChinh)) {
    if (
      [
        "ENERC",
        "FAT",
        "PROCNT",
        "CHOCDF",
        "EDIBLE",
        "CA",
        "P",
        "FE",
        "NA",
        "K",
        "MG",
        "FOL",
        "FOLAC",
        "RETOL",
        "VITA",
        "CARTB",
        "CARTA",
      ].includes(key)
    ) {
      newtongThanhPhanChinh[key] = Number(value).toFixed(0) * 1;
    } else if (["WATER"].includes(key)) {
      newtongThanhPhanChinh[key] = Number(value).toFixed(1) * 1;
    } else if (
      [
        "FIBC",
        "ASH",
        "ZN",
        "SE",
        "VITC",
        "BIOT",
        "VITB12",
        "VITD",
        "VITE",
        "VITK",
      ].includes(key)
    ) {
      newtongThanhPhanChinh[key] = Number(value).toFixed(2) * 1;
    } else if (
      ["MN", "CU", "THIA", "RIBF", "NIA", "PANTAC", "VITB6"].includes(key)
    ) {
      newtongThanhPhanChinh[key] = Number(value).toFixed(3) * 1;
    }
  }
  return newtongThanhPhanChinh;
};

const thanhPhanVariable = {
  PROCNT: 0,
  FAT: 0,
  CHOCDF: 0,
  ENERC: 0,
  EDIBLE: 0,
  WATER: 0,
  FIBC: 0,
  ASH: 0,
  CA: 0,
  P: 0,
  FE: 0,
  ZN: 0,
  NA: 0,
  K: 0,
  MG: 0,
  MN: 0,
  CU: 0,
  SE: 0,
  VITC: 0,
  THIA: 0,
  RIBF: 0,
  NIA: 0,
  PANTAC: 0,
  VITB6: 0,
  FOL: 0,
  FOLAC: 0,
  BIOT: 0,
  VITB12: 0,
  RETOL: 0,
  VITA: 0,
  VITD: 0,
  VITE: 0,
  VITK: 0,
  CARTB: 0,
  CARTA: 0,
  CRYXB: 0,
};

const tongThanhPhanDinhDuongThucPhamChon = (thucPhamChonList) => {
  const newtongThanhPhanChinh = {
    PROCNT: 0,
    FAT: 0,
    CHOCDF: 0,
    ENERC: 0,
    EDIBLE: 0,
    WATER: 0,
    FIBC: 0,
    ASH: 0,
    CA: 0,
    P: 0,
    FE: 0,
    ZN: 0,
    NA: 0,
    K: 0,
    MG: 0,
    MN: 0,
    CU: 0,
    SE: 0,
    VITC: 0,
    THIA: 0,
    RIBF: 0,
    NIA: 0,
    PANTAC: 0,
    VITB6: 0,
    FOL: 0,
    FOLAC: 0,
    BIOT: 0,
    VITB12: 0,
    RETOL: 0,
    VITA: 0,
    VITD: 0,
    VITE: 0,
    VITK: 0,
    CARTB: 0,
    CARTA: 0,
    CRYXB: 0,
    ThanhPhan: [],
  };
  thucPhamChonList?.forEach((item) => {
    for (const [key, value] of Object.entries(item.ThucPham)) {
      if (
        ![
          "id_thucpham",
          "TenTiengAnh",
          "TenTiengViet",
          "DonViTinh",
          "id_nhomthucpham",
          "image_url",
        ].includes(key)
      ) {
        if (typeof Number(value) === "number") {
          newtongThanhPhanChinh[key] =
            Number(newtongThanhPhanChinh[key]) +
            (Number(value) * Number(item.quanty)) / 100;
        }
      }
    }
  });
  for (const [key, value] of Object.entries(newtongThanhPhanChinh)) {
    if (
      [
        "ENERC",
        "FAT",
        "PROCNT",
        "CHOCDF",
        "EDIBLE",
        "CA",
        "P",
        "FE",
        "NA",
        "K",
        "MG",
        "FOL",
        "FOLAC",
        "RETOL",
        "VITA",
        "CARTB",
        "CARTA",
      ].includes(key)
    ) {
      newtongThanhPhanChinh[key] = Number(value).toFixed(0) * 1;
    } else if (["WATER"].includes(key)) {
      newtongThanhPhanChinh[key] = Number(value).toFixed(1) * 1;
    } else if (
      [
        "FIBC",
        "ASH",
        "ZN",
        "SE",
        "VITC",
        "BIOT",
        "VITB12",
        "VITD",
        "VITE",
        "VITK",
      ].includes(key)
    ) {
      newtongThanhPhanChinh[key] = Number(value).toFixed(2) * 1;
    } else if (
      ["MN", "CU", "THIA", "RIBF", "NIA", "PANTAC", "VITB6"].includes(key)
    ) {
      newtongThanhPhanChinh[key] = Number(value).toFixed(3) * 1;
    }
  }
  return newtongThanhPhanChinh;
};

export {
  thanhPhanDinhDuongMonAn,
  thanhPhanVariable,
  tongThanhPhanDinhDuongThucPhamChon,
};
