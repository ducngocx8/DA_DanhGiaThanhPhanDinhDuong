const { QueryTypes } = require("Sequelize");
const {
  sequelize,
  ThucPham,
  NhomThucPham,
  HeaderColumn,
} = require("../../../models");
const getAll = async () => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const thucPhamList = await ThucPham.findAll({
        order: [["id_thucpham", "ASC"]],
        include: [
          {
            model: NhomThucPham,
          },
        ],
        where: {
          thucpham_status: true,
        },
      });
      return thucPhamList;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const customerGetAllThucPhamService = async () => {
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

const getByID = async (id_thucpham) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const mon_an = await ThucPham.findOne({
        include: [
          {
            model: NhomThucPham,
          },
        ],
        where: {
          id_thucpham,
          thucpham_status: true,
        },
      });
      return mon_an;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const customerGetChiTietThucPhamService = async (id_thucpham) => {
  const result = await getByID(id_thucpham);
  if (result) {
    return {
      status: true,
      data: result,
    };
  } else if (result === null) {
    return {
      status: false,
      message: "Không tìm thấy thực phẩm.",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const customerSearchThucPhamService = async (queryParam) => {
  let where = "";
  let order = "";
  const {
    keyword,
    category_id,
    energy_from,
    energy_to,
    protein_from,
    protein_to,
    fat_to,
    fat_from,
    cabs_from,
    cabs_to,
    sort_type,
  } = queryParam;

  if (keyword) {
    where += ` (THUCPHAM.thucpham_status = true AND (THUCPHAM.TenTiengViet LIKE '%${keyword.trim()}%' OR THUCPHAM.TenTiengAnh LIKE '%${keyword.trim()}%' OR THUCPHAM.id_thucpham LIKE '%${keyword.trim()}%'))`;
  }
  if (Number.isInteger(Number(category_id))) {
    where += ` AND THUCPHAM.id_nhomthucpham = ${Number(category_id)}`;
  }

  if (energy_to) {
    if (where === "") {
      where += ` THUCPHAM.ENERC <= ${Number(energy_to)}`;
    } else {
      where += `  AND THUCPHAM.ENERC <= ${Number(energy_to)}`;
    }
  }
  if (energy_from) {
    if (where === "") {
      where += ` THUCPHAM.ENERC >= ${Number(energy_from)} `;
    } else {
      where += ` AND THUCPHAM.ENERC >= ${Number(energy_from)}`;
    }
  }

  if (protein_to) {
    if (where === "") {
      where += ` THUCPHAM.PROCNT <= ${Number(protein_to)}`;
    } else {
      where += ` AND THUCPHAM.PROCNT <= ${Number(protein_to)}`;
    }
  }

  if (protein_from) {
    if (where === "") {
      where += ` THUCPHAM.PROCNT >= ${Number(protein_from)}`;
    } else {
      where += ` AND THUCPHAM.PROCNT >= ${Number(protein_from)}`;
    }
  }

  if (fat_to) {
    if (where === "") {
      where += ` THUCPHAM.FAT <= ${Number(fat_to)}`;
    } else {
      where += ` AND THUCPHAM.FAT <= ${Number(fat_to)}`;
    }
  }

  if (fat_from) {
    if (where === "") {
      where += ` THUCPHAM.FAT >= ${Number(fat_from)}`;
    } else {
      where += ` AND THUCPHAM.FAT >= ${Number(fat_from)}`;
    }
  }

  if (cabs_to) {
    if (where === "") {
      where += ` THUCPHAM.CHOCDF <= ${Number(cabs_to)}`;
    } else {
      where += ` AND THUCPHAM.CHOCDF <= ${Number(cabs_to)}`;
    }
  }

  if (cabs_from) {
    if (where === "") {
      where += ` THUCPHAM.CHOCDF >= ${Number(cabs_from)}`;
    } else {
      where += ` AND THUCPHAM.CHOCDF >= ${Number(cabs_from)}`;
    }
  }

  if (sort_type) {
    if (sort_type === "AZ") {
      order = "THUCPHAM.TenTiengViet ASC";
    } else if (sort_type === "ZA") {
      order = "THUCPHAM.TenTiengViet DESC";
    } else if (sort_type === "NUM09") {
      order = "TOTAL_ENERC ASC";
    } else if (sort_type === "NUM90") {
      order = "TOTAL_ENERC DESC";
    }
  }
  const query = `SELECT THUCPHAM.id_thucpham, THUCPHAM.TenTiengViet, THUCPHAM.TenTiengAnh, THUCPHAM.id_nhomthucpham, (SELECT ten_nhom FROM NHOMTHUCPHAM WHERE NHOMTHUCPHAM.id_nhomthucpham = THUCPHAM.id_nhomthucpham LIMIT 1) AS ten_nhom, THUCPHAM.image_url, 
  THUCPHAM.ENERC AS TOTAL_ENERC, THUCPHAM.PROCNT AS TOTAL_PROCNT,
  THUCPHAM.FAT AS TOTAL_FAT, THUCPHAM.CHOCDF AS TOTAL_CHOCDF
  FROM THUCPHAM
  ${where && "WHERE " + where}
  ${order && "ORDER BY " + order}`;

  try {
    const result = await sequelize.transaction(async (t) => {
      const thuc_pham = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
      return thuc_pham;
    });
    return {
      status: true,
      data: result,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const customerSearchTop10ThucPhamService = async (queryParam) => {
  let { keyword } = queryParam;
  keyword = String(keyword).trim();
  const query = `SELECT *
  FROM THUCPHAM
  JOIN NHOMTHUCPHAM
  ON THUCPHAM.id_nhomthucpham = NHOMTHUCPHAM.id_nhomthucpham
  WHERE THUCPHAM.thucpham_status = true AND (THUCPHAM.TenTiengViet LIKE '%${keyword}%' OR THUCPHAM.TenTiengAnh LIKE '%${keyword}%')
  OR THUCPHAM.id_thucpham LIKE '%${keyword}%'
  OR NHOMTHUCPHAM.ten_nhom LIKE '%${keyword}%'
  LIMIT 10`;

  try {
    const result = await sequelize.transaction(async (t) => {
      const thuc_pham_list = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
      return thuc_pham_list;
    });
    return {
      status: true,
      data: result,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const checkDuongChatExist = async (code) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const column = await HeaderColumn.findOne({
        where: {
          column_code: code,
        },
      });
      return column;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const customerGetThucPhamGiauDuongChatService = async (queryParam) => {
  let { code, sort } = queryParam;
  if (sort && sort === "NUM09") {
    sort = "ASC";
  } else {
    sort = "DESC";
  }
  code = String(code).trim();
  const check_code = await checkDuongChatExist(code);
  if (
    check_code === null ||
    (check_code &&
      (check_code.don_vi === "" ||
        check_code.lam_tron === null ||
        check_code.column_code === "EDIBLE"))
  ) {
    return {
      status: false,
      message: "Không tìm thấy dưỡng chất tra cứu.",
    };
  }
  const query = `SELECT THUCPHAM.id_thucpham, 
  THUCPHAM.TenTiengViet, THUCPHAM.TenTiengAnh,
  THUCPHAM.id_nhomthucpham, (SELECT ten_nhom FROM NHOMTHUCPHAM
  WHERE NHOMTHUCPHAM.id_nhomthucpham = THUCPHAM.id_nhomthucpham LIMIT 1) AS ten_nhom, THUCPHAM.image_url,
  THUCPHAM.${code} FROM THUCPHAM
  WHERE THUCPHAM.thucpham_status = true
  ORDER BY THUCPHAM.${code} ${sort}`;

  try {
    const result = await sequelize.transaction(async (t) => {
      const thuc_pham_list = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
      return thuc_pham_list;
    });
    return {
      status: true,
      data: result,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};
const customerGetThucPhamGiauDuongChatOffsetService = async (queryParam) => {
  let { code, offset, sort, limit } = queryParam;
  code = String(code).trim();
  const check_code = await checkDuongChatExist(code);
  if (sort && sort === "NUM09") {
    sort = "ASC";
  } else {
    sort = "DESC";
  }
  if (
    check_code === null ||
    (check_code &&
      (check_code.don_vi === "" ||
        check_code.lam_tron === null ||
        check_code.column_code === "EDIBLE"))
  ) {
    return {
      status: false,
      message: "Không tìm thấy dưỡng chất tra cứu.",
    };
  }
  const query = `SELECT THUCPHAM.id_thucpham, 
  THUCPHAM.TenTiengViet, THUCPHAM.TenTiengAnh, 
  THUCPHAM.id_nhomthucpham, (SELECT ten_nhom FROM NHOMTHUCPHAM
  WHERE NHOMTHUCPHAM.id_nhomthucpham = THUCPHAM.id_nhomthucpham LIMIT 1) AS ten_nhom, THUCPHAM.image_url,
  THUCPHAM.${code} FROM THUCPHAM
  WHERE THUCPHAM.thucpham_status = true
  ORDER BY THUCPHAM.${code} ${sort}, THUCPHAM.id_thucpham ASC
  LIMIT ${offset}, ${limit}`;

  try {
    const result = await sequelize.transaction(async (t) => {
      const thuc_pham_list = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
      return thuc_pham_list;
    });
    return {
      status: true,
      data: result,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const customerGetAllThucPhamByOffsetService = async (queryParam) => {
  let where = "";
  let order = "";
  let { offset, limit, category_id, sort_type } = queryParam;
  if (sort_type) {
    if (sort_type === "AZ") {
      order = "THUCPHAM.TenTiengViet ASC, id_thucpham ASC";
    } else if (sort_type === "ZA") {
      order = "THUCPHAM.TenTiengViet DESC, id_thucpham ASC";
    } else if (sort_type === "NUM09") {
      order = "TOTAL_ENERC ASC, id_thucpham ASC";
    } else if (sort_type === "NUM90") {
      order = "TOTAL_ENERC DESC, id_thucpham ASC";
    } else {
      order = "id_thucpham ASC";
    }
  } else {
    order = "id_thucpham ASC";
  }
  if (Number.isInteger(Number(category_id))) {
    where += ` WHERE THUCPHAM.id_nhomthucpham = ${Number(
      category_id
    )} AND THUCPHAM.thucpham_status = true`;
  }

  const query = `SELECT THUCPHAM.id_thucpham, THUCPHAM.TenTiengViet, THUCPHAM.TenTiengAnh, THUCPHAM.id_nhomthucpham,(SELECT ten_nhom FROM NHOMTHUCPHAM WHERE NHOMTHUCPHAM.id_nhomthucpham = THUCPHAM.id_nhomthucpham LIMIT 1) AS ten_nhom, THUCPHAM.image_url, 
  THUCPHAM.ENERC AS TOTAL_ENERC, THUCPHAM.PROCNT AS TOTAL_PROCNT,
  THUCPHAM.FAT AS TOTAL_FAT, THUCPHAM.CHOCDF AS TOTAL_CHOCDF
  FROM THUCPHAM
  ${where}
  ORDER BY ${order}
  LIMIT ${offset}, ${limit}`;
  try {
    const result = await sequelize.transaction(async (t) => {
      const thuc_pham_list = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
      return thuc_pham_list;
    });
    return {
      status: true,
      data: result,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

module.exports = {
  customerGetAllThucPhamService,
  customerGetChiTietThucPhamService,
  customerSearchThucPhamService,
  customerSearchTop10ThucPhamService,
  customerGetThucPhamGiauDuongChatService,
  customerGetAllThucPhamByOffsetService,
  customerGetThucPhamGiauDuongChatOffsetService,
};
