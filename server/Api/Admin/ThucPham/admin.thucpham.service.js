const { ThucPham, sequelize, NhomThucPham } = require("../../../models");
const { Op } = require("Sequelize");
const getAll = async () => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const thucPhamList = await ThucPham.findAll({
        order: [["id_thucpham", "ASC"]],
        include: [{ model: NhomThucPham }],
      });
      return thucPhamList;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminGetAllThucPhamService = async () => {
  const result = await getAll();
  if (result) {
    return {
      status: true,
      data: result,
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const checkTenThucPhamTiengViet = async (TenTiengViet, status, id_thucpham) => {
  // status 1: Add (không yêu cầu id), status 2: Update (yêu cầu id)
  let whereObject = {};
  if (status === "ADD") {
    whereObject = {
      TenTiengViet: TenTiengViet,
    };
  } else if (status === "UPDATE") {
    whereObject = {
      [Op.and]: [
        { TenTiengViet: TenTiengViet },
        { id_thucpham: { [Op.not]: id_thucpham } },
      ],
    };
  }
  try {
    const result = await sequelize.transaction(async (t) => {
      const thuc_pham = await ThucPham.findOne({
        where: whereObject,
      });
      return thuc_pham;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const checkTenThucPhamTiengAnh = async (TenTiengAnh, status, id_thucpham) => {
  // status 1: Add (không yêu cầu id), status 2: Update (yêu cầu id)
  let whereObject = {};
  if (status === "ADD") {
    whereObject = {
      TenTiengAnh: TenTiengAnh,
    };
  } else if (status === "UPDATE") {
    whereObject = {
      [Op.and]: [
        { TenTiengAnh: TenTiengAnh },
        { id_thucpham: { [Op.not]: id_thucpham } },
      ],
    };
  }
  try {
    const result = await sequelize.transaction(async (t) => {
      const thuc_pham = await ThucPham.findOne({
        where: whereObject,
      });
      return thuc_pham;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const AddThucPham = async (thucPhamBody) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const {
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
        image_url,
        thucpham_status,
        id_nhomthucpham,
      } = thucPhamBody;
      const thuc_pham = await ThucPham.create(
        {
          id_thucpham: id_thucpham.trim(),
          TenTiengAnh: TenTiengAnh ? TenTiengAnh.trim() : "",
          TenTiengViet: TenTiengViet.trim(),
          DonViTinh: DonViTinh ? DonViTinh.trim() : "",
          createdAt: new Date(),
          EDIBLE:
            (EDIBLE || EDIBLE === 0) && typeof EDIBLE === "number"
              ? EDIBLE
              : null,
          ENERC:
            (ENERC || ENERC === 0) && typeof ENERC === "number" ? ENERC : null,
          WATER:
            (WATER || WATER === 0) && typeof WATER === "number" ? WATER : null,
          PROCNT:
            (PROCNT || PROCNT === 0) && typeof PROCNT === "number"
              ? PROCNT
              : null,
          FAT: (FAT || FAT === 0) && typeof FAT === "number" ? FAT : null,
          CHOCDF:
            (CHOCDF || CHOCDF === 0) && typeof CHOCDF === "number"
              ? CHOCDF
              : null,
          FIBC: (FIBC || FIBC === 0) && typeof FIBC === "number" ? FIBC : null,
          ASH: (ASH || ASH === 0) && typeof ASH === "number" ? ASH : null,
          CA: (CA || CA === 0) && typeof CA === "number" ? CA : null,
          P: (P || P === 0) && typeof P === "number" ? P : null,
          FE: (FE || FE === 0) && typeof FE === "number" ? FE : null,
          ZN: (ZN || ZN === 0) && typeof ZN === "number" ? ZN : null,
          NA: (NA || NA === 0) && typeof NA === "number" ? NA : null,
          K: (K || K === 0) && typeof K === "number" ? K : null,
          MG: (MG || MG === 0) && typeof MG === "number" ? MG : null,
          MN: (MN || MN === 0) && typeof MN === "number" ? MN : null,
          CU: (CU || CU === 0) && typeof CU === "number" ? CU : null,
          SE: (SE || SE === 0) && typeof SE === "number" ? SE : null,
          VITC: (VITC || VITC === 0) && typeof VITC === "number" ? VITC : null,
          THIA: (THIA || THIA === 0) && typeof THIA === "number" ? THIA : null,
          RIBF: (RIBF || RIBF === 0) && typeof RIBF === "number" ? RIBF : null,
          NIA: (NIA || NIA === 0) && typeof NIA === "number" ? NIA : null,
          PANTAC:
            (PANTAC || PANTAC === 0) && typeof PANTAC === "number"
              ? PANTAC
              : null,
          VITB6:
            (VITB6 || VITB6 === 0) && typeof VITB6 === "number" ? VITB6 : null,
          FOL: (FOL || FOL === 0) && typeof FOL === "number" ? FOL : null,
          FOLAC:
            (FOLAC || FOLAC === 0) && typeof FOLAC === "number" ? FOLAC : null,
          BIOT: (BIOT || BIOT === 0) && typeof BIOT === "number" ? BIOT : null,
          VITB12:
            (VITB12 || VITB12 === 0) && typeof VITB12 === "number"
              ? VITB12
              : null,
          RETOL:
            (RETOL || RETOL === 0) && typeof RETOL === "number" ? RETOL : null,
          VITA: (VITA || VITA === 0) && typeof VITA === "number" ? VITA : null,
          VITD: (VITD || VITD === 0) && typeof VITD === "number" ? VITD : null,
          VITE: (VITE || VITE === 0) && typeof VITE === "number" ? VITE : null,
          VITK: (VITK || VITK === 0) && typeof VITK === "number" ? VITK : null,
          CARTB:
            (CARTB || CARTB === 0) && typeof CARTB === "number" ? CARTB : null,
          CARTA:
            (CARTA || CARTA === 0) && typeof CARTA === "number" ? CARTA : null,
          CRYXB:
            (CRYXB || CRYXB === 0) && typeof CRYXB === "number" ? CRYXB : null,
          image_url,
          thucpham_status,
          id_nhomthucpham,
        },
        { transaction: t }
      );
      return thuc_pham;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const adminAddThucPhamService = async (thucPhamBody, queryParam) => {
  let { TenTiengAnh, TenTiengViet, id_nhomthucpham, id_thucpham } =
    thucPhamBody;

  const check_id_thucpham = await checkThucPhamID(id_thucpham);
  if (check_id_thucpham === null) {
    if (TenTiengAnh && typeof TenTiengAnh === "string") {
      const check_name_tieng_anh = await checkTenThucPhamTiengAnh(
        TenTiengAnh,
        "ADD",
        -1
      );
      if (check_name_tieng_anh !== null) {
        return {
          status: false,
          message: "Tên Thực phẩm bằng tiếng Anh đã tồn tại trên hệ thống.",
        };
      } else if (check_name_tieng_anh === false) {
        return {
          status: false,
          message: "Lỗi hệ thống, vui lòng thử lại sau.",
        };
      }
    }

    const check_nhom_thuc_pham = await checkIDNhomThucPhamExist(
      id_nhomthucpham
    );
    if (check_nhom_thuc_pham === null) {
      return {
        status: false,
        message: "Nhóm thực phẩm không tồn tại trên hệ thống.",
      };
    } else if (check_nhom_thuc_pham === false) {
      return {
        status: false,
        message: "Lỗi hệ thống, vui lòng thử lại sau.",
      };
    }
    TenTiengViet = String(TenTiengViet).trim();
    const check_name_tieng_viet = await checkTenThucPhamTiengViet(
      TenTiengViet,
      "ADD",
      -1
    );

    if (check_name_tieng_viet === null) {
      const add_result = await AddThucPham(thucPhamBody);
      if (add_result) {
        const thucPhamList = await getAllOfset(queryParam);
        const page = await findItem(queryParam, id_thucpham);
        return {
          status: true,
          data: thucPhamList,
          page: page,
          message: "Thêm Thực phẩm thành công",
        };
      } else {
        return {
          status: false,
          message: "Thêm Thực phẩm thất bại",
        };
      }
    } else if (check_name_tieng_viet !== null) {
      return {
        status: false,
        message: "Tên Thực phẩm bằng tiếng Việt đã tồn tại trên hệ thống",
      };
    } else {
      return {
        status: false,
        message: "Lỗi hệ thống, vui lòng thử lại sau.",
      };
    }
  } else if (check_id_thucpham) {
    return {
      status: false,
      message: "ID Thực phẩm đã tồn tại trên hệ thống.",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const checkThucPhamID = async (id_thucpham) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const thuc_pham = await ThucPham.findOne({
        where: {
          id_thucpham,
        },
      });
      return thuc_pham;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const checkIDNhomThucPhamExist = async (id_nhomthucpham) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhom_thuc_pham = await NhomThucPham.findOne({
        where: {
          id_nhomthucpham,
        },
      });
      return nhom_thuc_pham;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const updateThucPham = async (id_thucpham, thucPhamBody) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const {
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
      } = thucPhamBody;
      const thuc_pham = await ThucPham.update(
        {
          TenTiengAnh: TenTiengAnh ? TenTiengAnh.trim() : "",
          TenTiengViet: TenTiengViet.trim(),
          DonViTinh: DonViTinh ? DonViTinh.trim() : "",
          updatedAt: new Date(),
          EDIBLE:
            (EDIBLE || EDIBLE === 0) && typeof EDIBLE === "number"
              ? EDIBLE
              : null,
          ENERC:
            (ENERC || ENERC === 0) && typeof ENERC === "number" ? ENERC : null,
          WATER:
            (WATER || WATER === 0) && typeof WATER === "number" ? WATER : null,
          PROCNT:
            (PROCNT || PROCNT === 0) && typeof PROCNT === "number"
              ? PROCNT
              : null,
          FAT: (FAT || FAT === 0) && typeof FAT === "number" ? FAT : null,
          CHOCDF:
            (CHOCDF || CHOCDF === 0) && typeof CHOCDF === "number"
              ? CHOCDF
              : null,
          FIBC: (FIBC || FIBC === 0) && typeof FIBC === "number" ? FIBC : null,
          ASH: (ASH || ASH === 0) && typeof ASH === "number" ? ASH : null,
          CA: (CA || CA === 0) && typeof CA === "number" ? CA : null,
          P: (P || P === 0) && typeof P === "number" ? P : null,
          FE: (FE || FE === 0) && typeof FE === "number" ? FE : null,
          ZN: (ZN || ZN === 0) && typeof ZN === "number" ? ZN : null,
          NA: (NA || NA === 0) && typeof NA === "number" ? NA : null,
          K: (K || K === 0) && typeof K === "number" ? K : null,
          MG: (MG || MG === 0) && typeof MG === "number" ? MG : null,
          MN: (MN || MN === 0) && typeof MN === "number" ? MN : null,
          CU: (CU || CU === 0) && typeof CU === "number" ? CU : null,
          SE: (SE || SE === 0) && typeof SE === "number" ? SE : null,
          VITC: (VITC || VITC === 0) && typeof VITC === "number" ? VITC : null,
          THIA: (THIA || THIA === 0) && typeof THIA === "number" ? THIA : null,
          RIBF: (RIBF || RIBF === 0) && typeof RIBF === "number" ? RIBF : null,
          NIA: (NIA || NIA === 0) && typeof NIA === "number" ? NIA : null,
          PANTAC:
            (PANTAC || PANTAC === 0) && typeof PANTAC === "number"
              ? PANTAC
              : null,
          VITB6:
            (VITB6 || VITB6 === 0) && typeof VITB6 === "number" ? VITB6 : null,
          FOL: (FOL || FOL === 0) && typeof FOL === "number" ? FOL : null,
          FOLAC:
            (FOLAC || FOLAC === 0) && typeof FOLAC === "number" ? FOLAC : null,
          BIOT: (BIOT || BIOT === 0) && typeof BIOT === "number" ? BIOT : null,
          VITB12:
            (VITB12 || VITB12 === 0) && typeof VITB12 === "number"
              ? VITB12
              : null,
          RETOL:
            (RETOL || RETOL === 0) && typeof RETOL === "number" ? RETOL : null,
          VITA: (VITA || VITA === 0) && typeof VITA === "number" ? VITA : null,
          VITD: (VITD || VITD === 0) && typeof VITD === "number" ? VITD : null,
          VITE: (VITE || VITE === 0) && typeof VITE === "number" ? VITE : null,
          VITK: (VITK || VITK === 0) && typeof VITK === "number" ? VITK : null,
          CARTB:
            (CARTB || CARTB === 0) && typeof CARTB === "number" ? CARTB : null,
          CARTA:
            (CARTA || CARTA === 0) && typeof CARTA === "number" ? CARTA : null,
          CRYXB:
            (CRYXB || CRYXB === 0) && typeof CRYXB === "number" ? CRYXB : null,
          thucpham_status,
          id_nhomthucpham,
        },
        {
          where: {
            [Op.and]: [{ id_thucpham }],
          },
        },
        { transaction: t }
      );
      return thuc_pham;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const adminUpdateThucPhamService = async (
  id_thucpham,
  thucPhamBody,
  queryParam
) => {
  let { TenTiengAnh, TenTiengViet, id_nhomthucpham } = thucPhamBody;
  const check_id_thucpham = await checkThucPhamID(id_thucpham);
  if (check_id_thucpham) {
    if (TenTiengAnh && typeof TenTiengAnh === "string") {
      const check_name_tieng_anh = await checkTenThucPhamTiengAnh(
        TenTiengAnh,
        "UPDATE",
        id_thucpham
      );
      if (check_name_tieng_anh !== null) {
        return {
          status: false,
          message: "Tên Thực phẩm bằng tiếng Anh đã tồn tại trên hệ thống.",
        };
      } else if (check_name_tieng_anh === false) {
        return {
          status: false,
          message: "Lỗi hệ thống, vui lòng thử lại sau.",
        };
      }
    }

    const check_nhom_thuc_pham = await checkIDNhomThucPhamExist(
      id_nhomthucpham
    );
    if (check_nhom_thuc_pham === null) {
      return {
        status: false,
        message: "Nhóm thực phẩm không tồn tại trên hệ thống.",
      };
    } else if (check_nhom_thuc_pham === false) {
      return {
        status: false,
        message: "Lỗi hệ thống, vui lòng thử lại sau.",
      };
    }
    TenTiengViet = String(TenTiengViet).trim();
    const check_name_tieng_viet = await checkTenThucPhamTiengViet(
      TenTiengViet,
      "UPDATE",
      id_thucpham
    );

    if (check_name_tieng_viet === null) {
      const update_result = await updateThucPham(id_thucpham, thucPhamBody);
      if (update_result) {
        const thucPhamList = await getAllOfset(queryParam);
        const page = await findItem(queryParam, id_thucpham);
        return {
          status: true,
          data: thucPhamList,
          page: page,
          message: "Cập nhật thông tin Thực phẩm thành công",
        };
      } else {
        return {
          status: false,
          message: "Cập nhật thông tin Thực phẩm thất bại",
        };
      }
    } else if (check_name_tieng_viet !== null) {
      return {
        status: false,
        message: "Tên Thực phẩm bằng tiếng Việt đã tồn tại trên hệ thống.",
      };
    } else {
      return {
        status: false,
        message: "Lỗi hệ thống, vui lòng thử lại sau.",
      };
    }
  } else if (check_id_thucpham === null) {
    return {
      status: false,
      message: "Thực phẩm không tồn tại trên hệ thống.",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const updateImage = async (id_thucpham, image_url) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const thuc_pham = await ThucPham.update(
        {
          image_url: String(image_url).trim(),
        },
        {
          where: {
            id_thucpham,
          },
        },
        { transaction: t }
      );
      return thuc_pham;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const adminUpdateImageService = async (id_thucpham, image_url, queryParam) => {
  const check_id_thucpham = await checkThucPhamID(id_thucpham);
  if (check_id_thucpham) {
    const update_result = await updateImage(id_thucpham, image_url);
    if (update_result) {
      const thucPhamList = await getAllOfset(queryParam);
      return {
        status: true,
        data: thucPhamList,
        page: null,
        message: "Cập nhật ảnh đại diện cho thực phẩm thành công",
      };
    } else {
      return {
        status: false,
        message: "Cập nhật ảnh đại diện cho thực phẩm thất bại",
      };
    }
  } else if (check_id_thucpham === null) {
    return {
      status: false,
      message: "Thực phẩm không tồn tại trên hệ thống.",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const getByFilterByStatus = async (whereObject) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const thucPhamList = await ThucPham.findAll({
        order: [["id_thucpham", "ASC"]],
        include: [{ model: NhomThucPham }],
        where: whereObject,
      });
      return thucPhamList;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminGetByFilterThucPhamService = async (status) => {
  let whereObject = {};
  // status = 1: ALL
  // status = 2: Show
  // status = 3: Hide
  // status = 4: Lost NL
  // status = 5: Lost Image
  if (status === 1) {
    const thucPhamList = await getAll();
    return {
      status: true,
      data: thucPhamList,
    };
  } else if (status === 2) {
    whereObject = {
      thucpham_status: true,
    };
    const thucPhamList = await getByFilterByStatus(whereObject);
    return {
      status: true,
      data: thucPhamList,
    };
  } else if (status === 3) {
    whereObject = {
      thucpham_status: false,
    };
    const thucPhamList = await getByFilterByStatus(whereObject);
    return {
      status: true,
      data: thucPhamList,
    };
  } else if (status === 4) {
    whereObject = {
      [Op.or]: [
        {
          ENERC: null,
        },
      ],
    };
    const thucPhamList = await getByFilterByStatus(whereObject);
    return {
      status: true,
      data: thucPhamList,
    };
  } else if (status === 5) {
    whereObject = {
      [Op.or]: [
        {
          image_url: "",
        },
        {
          image_url: null,
        },
      ],
    };
    const thucPhamList = await getByFilterByStatus(whereObject);
    return {
      status: true,
      data: thucPhamList,
    };
  } else {
    return {
      status: true,
      data: [],
    };
  }
};

const getAllOfset = async (queryParam) => {
  let { offset, limit, sort, type, keyword, status } = queryParam;
  status = Number(status);
  try {
    const result = await sequelize.transaction(async (t) => {
      let whereObject = {};
      if (status === 1) {
        whereObject = {};
      } else if (status === 2) {
        whereObject = {
          thucpham_status: true,
        };
      } else if (status === 3) {
        whereObject = {
          thucpham_status: false,
        };
      } else if (status === 4) {
        whereObject = {
          [Op.or]: [
            {
              ENERC: null,
            },
          ],
        };
      } else if (status === 5) {
        whereObject = {
          [Op.or]: [
            {
              image_url: "",
            },
            {
              image_url: null,
            },
          ],
        };
      } else {
        return {
          status: true,
          data: [],
        };
      }
      const list = await ThucPham.findAll({
        include: [{ model: NhomThucPham }],
        where: {
          [Op.or]: [
            {
              id_thucpham: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              TenTiengViet: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              TenTiengAnh: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              "$NhomThucPham.ten_nhom$": {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
          [Op.and]: [whereObject],
        },
        order: [[sort, type]],
        offset: Number(offset),
        limit: Number(limit),
      });
      return list;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const adminOffsetService = async (queryParam) => {
  const result = await getAllOfset(queryParam);
  if (result) {
    return {
      status: true,
      data: result,
      page: null,
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const findItem = async (queryParam, find_value) => {
  let { limit, sort, type, keyword, status } = queryParam;
  status = Number(status);
  let whereObject = {};
  if (status === 1) {
    whereObject = {};
  } else if (status === 2) {
    whereObject = {
      thucpham_status: true,
    };
  } else if (status === 3) {
    whereObject = {
      thucpham_status: false,
    };
  } else if (status === 4) {
    whereObject = {
      [Op.or]: [
        {
          ENERC: null,
        },
      ],
    };
  } else if (status === 5) {
    whereObject = {
      [Op.or]: [
        {
          image_url: "",
        },
        {
          image_url: null,
        },
      ],
    };
  } else {
    return {
      status: true,
      data: [],
    };
  }
  try {
    const result = await sequelize.transaction(async (t) => {
      const list = await ThucPham.findAll({
        order: [[sort, type]],
        include: [{ model: NhomThucPham }],
        where: {
          [Op.or]: [
            {
              id_thucpham: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              TenTiengViet: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              TenTiengAnh: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              "$NhomThucPham.ten_nhom$": {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
          [Op.and]: [whereObject],
        },
      });
      return list;
    });

    const find_index = result.findIndex(
      (item) => item.id_thucpham === find_value
    );

    if (find_index !== -1) {
      const page_count = (find_index + 1) % limit;
      if (page_count === 0) {
        return (find_index + 1) / limit;
      } else {
        return Math.floor((find_index + 1) / limit) + 1;
      }
    }
    return 1;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  adminGetAllThucPhamService,
  adminAddThucPhamService,
  adminUpdateThucPhamService,
  adminUpdateImageService,
  adminGetByFilterThucPhamService,
  adminOffsetService,
};
