const { QueryTypes, Op } = require("Sequelize");
const {
  sequelize,
  MonAn,
  ChiTietMon,
  ThucPham,
  NhomMonAn,
  NgayAn,
  Favourite,
  HeaderColumn,
} = require("../../../models");
const { randomNMonAn } = require("../NgayAn/customer.ngayan.service");
const getAll = async (user_id) => {
  let whereObject = {};
  if (user_id) {
    whereObject = {
      // [Op.or]: [{ user_id: user_id }, { user_id: null, monan_status: 1 }],
      [Op.or]: [{ user_id: user_id }, { monan_status: 1 }],
    };
  } else {
    whereObject = {
      monan_status: 1,
    };
  }
  try {
    const result = await sequelize.transaction(async (t) => {
      const monAnList = await MonAn.findAll({
        order: [["id_monan", "ASC"]],
        include: [
          { model: ChiTietMon, include: [{ model: ThucPham }] },
          { model: NhomMonAn },
        ],
        where: whereObject,
      });
      return monAnList;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const customerGetAllMonAnService = async (user_id) => {
  const result = await getAll(user_id);
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

const getByID = async (id_monan, user_id) => {
  let whereObject = {};
  if (user_id) {
    whereObject = {
      id_monan,
      // [Op.or]: [{ user_id: user_id }, { user_id: null, monan_status: true }],
      [Op.or]: [{ user_id: user_id }, { monan_status: true }],
    };
  } else {
    whereObject = {
      id_monan,
      monan_status: 1,
    };
  }
  try {
    const result = await sequelize.transaction(async (t) => {
      const mon_an = await MonAn.findOne({
        include: [
          {
            model: ChiTietMon,
            include: [{ model: ThucPham }],
          },
          { model: NhomMonAn },
        ],
        order: [[{ model: ChiTietMon }, "ten_phannhom", "DESC"]],
        where: whereObject,
      });
      return mon_an;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const customerGetChiTietMonAnService = async (id_monan, user_id) => {
  const result = await getByID(id_monan, user_id);
  if (result) {
    return {
      status: true,
      data: result,
    };
  } else if (result === null) {
    return {
      status: false,
      message: "Không tìm thấy món ăn.",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const customerSearchMonAnService = async (queryParam, user_id) => {
  let where = "";
  let having = "";
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

  if (user_id) {
    // where += ` MONAN.user_id = ${user_id} OR (MONAN.user_id IS NULL AND MonAn.monan_status = true) `;
    where += ` MONAN.user_id = ${user_id} OR (MonAn.monan_status = 1) `;
  } else {
    where += ` MONAN.monan_status = 1`;
  }

  if (keyword) {
    where += ` AND MONAN.ten_mon LIKE '%${keyword.trim()}%'`;
  }
  if (Number.isInteger(Number(category_id))) {
    where += ` AND  MONAN.id_nhommonan = ${Number(category_id)}`;
  }

  if (energy_to) {
    if (having === "") {
      having += ` TOTAL_ENERC <= ${Number(energy_to)}`;
    } else {
      having += `  AND TOTAL_ENERC <= ${Number(energy_to)}`;
    }
  }
  if (energy_from) {
    if (having === "") {
      having += ` TOTAL_ENERC >= ${Number(energy_from)} `;
    } else {
      having += ` AND TOTAL_ENERC >= ${Number(energy_from)}`;
    }
  }

  if (protein_to) {
    if (having === "") {
      having += ` TOTAL_PROCNT <= ${Number(protein_to)}`;
    } else {
      having += ` AND TOTAL_PROCNT <= ${Number(protein_to)}`;
    }
  }

  if (protein_from) {
    if (having === "") {
      having += ` TOTAL_PROCNT >= ${Number(protein_from)}`;
    } else {
      having += ` AND TOTAL_PROCNT >= ${Number(protein_from)}`;
    }
  }

  if (fat_to) {
    if (having === "") {
      having += ` TOTAL_FAT <= ${Number(fat_to)}`;
    } else {
      having += ` AND TOTAL_FAT <= ${Number(fat_to)}`;
    }
  }

  if (fat_from) {
    if (having === "") {
      having += ` TOTAL_FAT >= ${Number(fat_from)}`;
    } else {
      having += ` AND TOTAL_FAT >= ${Number(fat_from)}`;
    }
  }

  if (cabs_to) {
    if (having === "") {
      having += ` TOTAL_CHOCDF <= ${Number(cabs_to)}`;
    } else {
      having += ` AND TOTAL_CHOCDF <= ${Number(cabs_to)}`;
    }
  }

  if (cabs_from) {
    if (having === "") {
      having += ` TOTAL_CHOCDF >= ${Number(cabs_from)}`;
    } else {
      having += ` AND TOTAL_CHOCDF >= ${Number(cabs_from)}`;
    }
  }

  if (sort_type) {
    if (sort_type === "AZ") {
      order = "MONAN.ten_mon ASC";
    } else if (sort_type === "ZA") {
      order = "MONAN.ten_mon DESC";
    } else if (sort_type === "NUM09") {
      order = "TOTAL_ENERC ASC";
    } else if (sort_type === "NUM90") {
      order = "TOTAL_ENERC DESC";
    }
  }
  const query = `SELECT MONAN.id_monan, MONAN.ten_mon, MONAN.id_nhommonan, (SELECT ten_nhom FROM NHOMMONAN WHERE NHOMMONAN.id_nhommonan = MONAN.id_nhommonan LIMIT 1) AS ten_nhom, MONAN.image_url, 
  SUM(CHITIETMON.quanty * THUCPHAM.ENERC / 100) AS TOTAL_ENERC,  SUM(CHITIETMON.quanty * THUCPHAM.PROCNT / 100) AS TOTAL_PROCNT,
  SUM(CHITIETMON.quanty * THUCPHAM.FAT / 100) AS TOTAL_FAT, SUM(CHITIETMON.quanty * THUCPHAM.CHOCDF / 100) AS TOTAL_CHOCDF
  FROM MONAN
  INNER JOIN CHITIETMON
  ON MONAN.id_monan = CHITIETMON.id_monan
  INNER JOIN THUCPHAM
  ON CHITIETMON.id_thucpham = THUCPHAM.id_thucpham
  ${where && "WHERE " + where}
  GROUP BY MONAN.id_monan
  ${having && "HAVING " + having}
  ${order && "ORDER BY " + order}`;

  try {
    const result = await sequelize.transaction(async (t) => {
      const mon_an = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
      return mon_an;
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

const getMonAnByUserID = async (user_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const mon_an = await MonAn.findAll({
        where: {
          user_id,
        },
        include: [{ model: ChiTietMon }, { model: NhomMonAn }],
      });
      return mon_an;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const customerGetMonAnOfUserService = async (user_id) => {
  const result = await getMonAnByUserID(user_id);
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

const checkIDThucPhamExist = async (id_thucpham) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const thuc_pham = await ThucPham.findOne({
        where: {
          id_thucpham,
          thucpham_status: true,
        },
      });
      if (thuc_pham) {
        return true;
      } else {
        return null;
      }
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const checkListThucPhamValid = async (IDThucPhamList) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const listThucPhamCheck = IDThucPhamList.map((item) =>
        Promise.resolve(checkIDThucPhamExist(item))
      );
      console.log(listThucPhamCheck);
      const resultCheck = await Promise.all(listThucPhamCheck);
      return resultCheck;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const checkTenMonAn = async (ten_mon, status, id_monan) => {
  let whereObject = {};
  if (status === "ADD") {
    whereObject = {
      ten_mon: ten_mon,
    };
  } else if (status === "UPDATE") {
    whereObject = {
      [Op.and]: [{ ten_mon: ten_mon }, { id_monan: { [Op.not]: id_monan } }],
    };
  }
  try {
    const result = await sequelize.transaction(async (t) => {
      const mon_an = await MonAn.findOne({
        where: whereObject,
      });
      return mon_an;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const checkNhomMonAnExist = async (id_nhommonan) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhom_mon_an = await NhomMonAn.findOne({
        where: {
          id_nhommonan,
        },
      });
      return nhom_mon_an;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const AddMonAn = async (user_id, monAnBody) => {
  const { ten_mon, don_vi, id_nhommonan, image_url, listChiTietMon } =
    monAnBody;

  try {
    const result = await sequelize.transaction(async (t) => {
      const mon_an = await MonAn.create(
        {
          ten_mon: ten_mon.trim(),
          don_vi: don_vi.trim(),
          id_nhommonan,
          user_id: user_id,
          monan_status: 0,
          image_url,
          ChiTietMons: listChiTietMon,
          createdAt: new Date(),
        },
        {
          include: [{ model: ChiTietMon }],
        },
        { transaction: t }
      );
      return mon_an;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const customerAddMonAnService = async (user_id, monAnBody) => {
  let { ten_mon, id_nhommonan, listChiTietMon } = monAnBody;
  const checkNhomMon = await checkNhomMonAnExist(id_nhommonan);
  if (checkNhomMon === null) {
    return {
      status: false,
      message: "Nhóm Món ăn không tồn tại trên hệ thống",
    };
  } else if (checkNhomMon === false) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
  ten_mon = String(ten_mon).trim();
  const check_name = await checkTenMonAn(ten_mon, "ADD", -1);
  if (check_name === null) {
    // Check List Chi Tiết Món Ăn
    const IDThucPhamList = [];
    listChiTietMon = listChiTietMon.map((item) => {
      if (!IDThucPhamList.includes(item.id_thucpham)) {
        IDThucPhamList.push(item.id_thucpham);
      }
      return {
        ...item,
        ten_phannhom: item.ten_phannhom.trim(),
      };
    });

    console.log("IDThucPhamList", IDThucPhamList);
    const result_check_chi_tiet_mon = await checkListThucPhamValid(
      IDThucPhamList
    );
    console.log("resultCheck =", result_check_chi_tiet_mon);
    if (result_check_chi_tiet_mon.includes(false)) {
      return {
        status: false,
        message: "Lỗi hệ thống, vui lòng thử lại sau.",
      };
    }
    if (result_check_chi_tiet_mon.includes(null)) {
      const null_index = result_check_chi_tiet_mon.indexOf(null);
      return {
        status: true,
        message:
          "Thực phẩm ID = " +
          listChiTietMon[null_index].id_thucpham +
          " không tồn tại trên hệ thống.",
      };
    }
    const add_result = await AddMonAn(user_id, monAnBody);
    if (add_result) {
      const monAnList = await getMonAnByUserID(user_id);
      return {
        status: true,
        data: monAnList,
        message: "Thêm Món ăn thành công",
      };
    } else {
      return {
        status: false,
        message: "Thêm Món ăn thất bại",
      };
    }
  } else if (check_name !== null) {
    return {
      status: false,
      message: "Tên Món ăn đã tồn tại trên hệ thống",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const checkMonAnID = async (user_id, id_monan) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const mon_an = await MonAn.findOne({
        where: {
          id_monan,
          user_id,
        },
      });
      return mon_an;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const checkMonAnHasNgayAn = async (id_monan) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const ngayan = await NgayAn.findOne({
        where: {
          id_monan,
        },
      });
      return ngayan;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const checkMonAnHasFavourite = async (id_monan) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const favourite = await Favourite.findOne({
        where: {
          id_monan,
        },
      });
      return favourite;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const checkMonAnHasChiTietMon = async (id_monan) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const chi_tiet_mon = await ChiTietMon.findOne({
        where: {
          id_monan,
        },
      });
      return chi_tiet_mon;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const deleteMonAn = async (user_id, id_monan) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const mon_an = await MonAn.destroy(
        {
          where: {
            id_monan: Number(id_monan),
            user_id,
          },
        },
        { transaction: t }
      );
      return mon_an;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const customerDeleteMonAnService = async (user_id, id_monan) => {
  const check_id_monan = await checkMonAnID(user_id, id_monan);
  if (check_id_monan) {
    const checkList = await Promise.all([
      Promise.resolve(checkMonAnHasNgayAn(id_monan)),
      Promise.resolve(checkMonAnHasFavourite(id_monan)),
      Promise.resolve(checkMonAnHasChiTietMon(id_monan)),
    ]);
    console.log("checkList", checkList);
    if (
      checkList[0] === null &&
      checkList[1] === null &&
      checkList[2] === null
    ) {
      const delete_result = await deleteMonAn(user_id, id_monan);
      if (delete_result) {
        const monAnList = await getMonAnByUserID(user_id);
        return {
          status: true,
          data: monAnList,
          message: "Xóa Món ăn thành công",
        };
      } else {
        return {
          status: false,
          message: "Xóa Món ăn thất bại",
        };
      }
    } else if (
      checkList[0] !== null ||
      checkList[1] !== null ||
      checkList[2] !== null
    ) {
      return {
        status: false,
        message:
          "Món ăn đang nằm trong ít nhất một bữa ăn, danh sách món ăn yêu thích hoặc có chi tiết món. Không thể xóa",
      };
    } else {
      return {
        status: false,
        message: "Lỗi hệ thống, vui lòng thử lại sau.",
      };
    }
  } else if (check_id_monan === null) {
    return {
      status: false,
      message: "Món ăn không tồn tại trên hệ thống.",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const updateMonAn = async (user_id, id_monan, monAnBody) => {
  const { ten_mon, don_vi, id_nhommonan, monan_status } = monAnBody;
  try {
    const result = await sequelize.transaction(async (t) => {
      const mon_an = await MonAn.update(
        {
          ten_mon: ten_mon.trim(),
          don_vi: don_vi.trim(),
          id_nhommonan,
          monan_status: monan_status,
          updatedAt: new Date(),
        },
        {
          where: {
            id_monan,
            user_id,
          },
        },
        { transaction: t }
      );
      return mon_an;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const customerUpdateMonAnService = async (user_id, id_monan, monAnBody) => {
  let { ten_mon, id_nhommonan, monan_status } = monAnBody;
  ten_mon = String(ten_mon).trim();

  const check_id_monan = await checkMonAnID(user_id, id_monan);
  if (check_id_monan) {
    if (check_id_monan.monan_status === 1) {
      return {
        status: false,
        message: "Món ăn đã Public, không thể chỉnh sửa",
      };
    }
    if (check_id_monan.monan_status !== 1 && Number(monan_status) === 1) {
      return {
        status: false,
        message: "Trạng thái món ăn không hợp lệ, vui lòng thử lại",
      };
    }
    const checkNhomMon = await checkNhomMonAnExist(id_nhommonan);
    if (checkNhomMon === null) {
      return {
        status: false,
        message: "Nhóm Món ăn không tồn tại trên hệ thống",
      };
    } else if (checkNhomMon === false) {
      return {
        status: false,
        message: "Lỗi hệ thống, vui lòng thử lại sau.",
      };
    }
    const check_name = await checkTenMonAn(ten_mon, "UPDATE", id_monan);
    if (check_name === null) {
      const update_result = await updateMonAn(user_id, id_monan, monAnBody);
      if (update_result) {
        const monAnList = await getMonAnByUserID(user_id);
        return {
          status: true,
          data: monAnList,
          message: "Cập nhật thông tin Món ăn thành công",
        };
      } else {
        return {
          status: false,
          message: "Cập nhật thông tin Món ăn thất bại",
        };
      }
    } else if (check_name !== null) {
      return {
        status: false,
        message: "Tên Món ăn đã tồn tại trên hệ thống.",
      };
    } else {
      return {
        status: false,
        message: "Lỗi hệ thống, vui lòng thử lại sau.",
      };
    }
  } else if (check_id_monan === null) {
    return {
      status: false,
      message: "Món ăn không tồn tại trên hệ thống.",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const updateImage = async (user_id, id_monan, image_url) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const buaAn = await MonAn.update(
        {
          image_url: String(image_url).trim(),
        },
        {
          where: {
            id_monan,
            user_id,
          },
        },
        { transaction: t }
      );
      return buaAn;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const customerUpdateImageService = async (user_id, id_monan, image_url) => {
  const check_id_monan = await checkMonAnID(user_id, id_monan);
  if (check_id_monan) {
    const update_result = await updateImage(user_id, id_monan, image_url);
    if (update_result) {
      const nhomMonAnList = await getMonAnByUserID(user_id);
      return {
        status: true,
        data: nhomMonAnList,
        message: "Cập nhật ảnh đại diện cho món ăn thành công",
      };
    } else {
      return {
        status: false,
        message: "Cập nhật ảnh đại diện cho món ăn thất bại",
      };
    }
  } else if (check_id_monan === null) {
    return {
      status: false,
      message: "Món ăn không tồn tại trên hệ thống.",
    };
  } else {
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

const customerGetMonAnGiauDuongChatService = async (queryParam, user_id) => {
  let where = "";
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
  if (user_id) {
    // where += ` MONAN.user_id = ${user_id} OR (MONAN.user_id IS NULL AND MonAn.monan_status = true) `;
    where += ` MONAN.user_id = ${user_id} OR (MonAn.monan_status = 1) `;
  } else {
    where += ` MONAN.monan_status = 1`;
  }

  const query = `SELECT MONAN.id_monan, MONAN.ten_mon, SUM(CHITIETMON.quanty * THUCPHAM.${code} / 100) AS ${code} FROM MONAN
  INNER JOIN CHITIETMON
  ON MONAN.ID_MONAN = CHITIETMON.ID_MONAN
  INNER JOIN THUCPHAM
  ON CHITIETMON.ID_THUCPHAM = THUCPHAM.ID_THUCPHAM
  WHERE ${where}
  GROUP BY ID_MONAN
  ORDER BY ${code} ${sort}`;
  try {
    const result = await sequelize.transaction(async (t) => {
      const mon_an_list = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
      return mon_an_list;
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

const customerGetMonAnGiauDuongChatOffsetService = async (
  queryParam,
  user_id
) => {
  let where = "";
  let { code, offset, limit, sort } = queryParam;
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
  if (user_id) {
    // where += ` MONAN.user_id = ${user_id} OR (MONAN.user_id IS NULL AND MonAn.monan_status = true) `;
    where += ` MONAN.user_id = ${user_id} OR (MonAn.monan_status = 1) `;
  } else {
    where += ` MONAN.monan_status = 1`;
  }

  const query = `SELECT MONAN.id_monan, MONAN.ten_mon, MONAN.id_nhommonan, NHOMMONAN.ten_nhom, MONAN.image_url, SUM(CHITIETMON.quanty * THUCPHAM.${code} / 100) AS ${code} FROM MONAN
  INNER JOIN NHOMMONAN
  ON MONAN.id_nhommonan = NHOMMONAN.id_nhommonan
  INNER JOIN CHITIETMON
  ON MONAN.ID_MONAN = CHITIETMON.ID_MONAN
  INNER JOIN THUCPHAM
  ON CHITIETMON.ID_THUCPHAM = THUCPHAM.ID_THUCPHAM
  WHERE ${where}
  GROUP BY ID_MONAN
  ORDER BY ${code} ${sort}, MONAN.id_monan ASC
  LIMIT ${offset}, ${limit}`;
  try {
    const result = await sequelize.transaction(async (t) => {
      const mon_an_list = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
      return mon_an_list;
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

const customerGetAllMonAnByOffsetService = async (queryParam, user_id) => {
  let where = "";
  let order = "";
  let { offset, limit, category_id, sort_type } = queryParam;
  if (sort_type) {
    if (sort_type === "AZ") {
      order = "MONAN.ten_mon ASC, MONAN.id_monan ASC";
    } else if (sort_type === "ZA") {
      order = "MONAN.ten_mon DESC, MONAN.id_monan ASC";
    } else if (sort_type === "NUM09") {
      order = "TOTAL_ENERC ASC, MONAN.id_monan ASC";
    } else if (sort_type === "NUM90") {
      order = "TOTAL_ENERC DESC, MONAN.id_monan ASC";
    } else {
      order = "id_monan ASC";
    }
  } else {
    order = "id_monan ASC";
  }
  if (user_id) {
    // where += ` MONAN.user_id = ${user_id} OR (MONAN.user_id IS NULL AND MonAn.monan_status = true) `;
    where += ` MONAN.user_id = ${user_id} OR (MonAn.monan_status = 1) `;
  } else {
    where += ` MONAN.monan_status = 1`;
  }

  if (Number.isInteger(Number(category_id))) {
    where += ` AND MONAN.id_nhommonan = ${Number(category_id)}`;
  }

  const query = `SELECT MONAN.id_monan, MONAN.ten_mon, MONAN.id_nhommonan, (SELECT ten_nhom FROM NHOMMONAN WHERE NHOMMONAN.id_nhommonan = MONAN.id_nhommonan LIMIT 1) AS ten_nhom, MONAN.image_url, 
  SUM(CHITIETMON.quanty * THUCPHAM.ENERC / 100) AS TOTAL_ENERC,  SUM(CHITIETMON.quanty * THUCPHAM.PROCNT / 100) AS TOTAL_PROCNT,
  SUM(CHITIETMON.quanty * THUCPHAM.FAT / 100) AS TOTAL_FAT, SUM(CHITIETMON.quanty * THUCPHAM.CHOCDF / 100) AS TOTAL_CHOCDF
  FROM MONAN
  INNER JOIN CHITIETMON
  ON MONAN.id_monan = CHITIETMON.id_monan
  INNER JOIN THUCPHAM
  ON CHITIETMON.id_thucpham = THUCPHAM.id_thucpham
  WHERE ${where}
  GROUP BY MONAN.id_monan
  ORDER BY ${order}
  LIMIT ${offset}, ${limit}`;
  try {
    const result = await sequelize.transaction(async (t) => {
      const mon_an_list = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
      return mon_an_list;
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

const customerGetMonAnCungChuyenMucService = async (queryParam, user_id) => {
  let where = "";
  let { id_monan, id_nhommonan } = queryParam;
  if (user_id) {
    // where += ` MONAN.user_id = ${user_id} OR (MONAN.user_id IS NULL AND MonAn.monan_status = true) `;
    where += ` MONAN.user_id = ${user_id} OR (MonAn.monan_status = 1) `;
  } else {
    where += ` MONAN.monan_status = 1`;
  }

  const query = `SELECT MONAN.id_monan, MONAN.ten_mon, MONAN.don_vi, MONAN.image_url, MONAN.id_nhommonan, NHOMMONAN.ten_nhom,
  SUM(CHITIETMON.quanty * THUCPHAM.ENERC / 100) AS ENERC
  FROM MONAN INNER JOIN NHOMMONAN
  ON MONAN.id_nhommonan = ${id_nhommonan} AND MONAN.id_monan != ${id_monan} AND NHOMMONAN.id_nhommonan = MONAN.id_nhommonan
  INNER JOIN CHITIETMON
  ON CHITIETMON.id_monan = MONAN.id_monan
  INNER JOIN THUCPHAM
  ON THUCPHAM.id_thucpham = CHITIETMON.id_thucpham
  WHERE ${where}
  GROUP BY MONAN.id_monan`;
  try {
    const result = await sequelize.transaction(async (t) => {
      const mon_an_list = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
      return mon_an_list;
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

const customerGetMonAnDungNhieuService = async (user_id) => {
  let where = "";
  if (user_id) {
    // where += ` AND (MONAN.user_id = ${user_id} OR (MONAN.user_id IS NULL AND MonAn.monan_status = true)) `;
    where += ` AND (MONAN.user_id = ${user_id} OR (MonAn.monan_status = 1)) `;
  } else {
    where += ` AND MONAN.monan_status = 1`;
  }

  const query = `SELECT NGAY_AN.id_monan, MONAN.ten_mon, MONAN.id_nhommonan, NHOMMONAN.ten_nhom, MONAN.image_url, NGAY_AN.TOTAL, ROUND(SUM(THUCPHAM.ENERC * CHITIETMON.quanty / 100)) AS TOTAL_ENERC,
  ROUND(SUM(THUCPHAM.PROCNT * CHITIETMON.quanty / 100)) AS TOTAL_PROCNT,
  ROUND(SUM(THUCPHAM.FAT * CHITIETMON.quanty / 100)) AS TOTAL_FAT,
  ROUND(SUM(THUCPHAM.CHOCDF * CHITIETMON.quanty / 100)) AS TOTAL_CHOCDF
  FROM(
  (SELECT NGAYAN.id_monan, SUM(NGAYAN.quanty) AS TOTAL FROM NGAYAN
  GROUP BY id_monan
  ORDER BY TOTAL DESC) AS NGAY_AN
  INNER JOIN MONAN 
  ON NGAY_AN.id_monan = MONAN.id_monan ${where}
  INNER JOIN NHOMMONAN
  ON MONAN.id_nhommonan = NHOMMONAN.id_nhommonan
  INNER JOIN CHITIETMON
  ON CHITIETMON.id_monan = MONAN.id_monan
  INNER JOIN THUCPHAM
  ON CHITIETMON.id_thucpham = THUCPHAM.id_thucpham
  ) GROUP BY NGAY_AN.id_monan
  LIMIT 10`;
  try {
    const result = await sequelize.transaction(async (t) => {
      const mon_an_list = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
      return mon_an_list;
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

const customerRandomMonAnService = async (queryParam, user_id) => {
  const ratio = [
    [30, 30, 30, 10],
    [40, 30, 20, 10],
    [20, 30, 40, 10],
    [30, 40, 20, 10],
  ];
  let { limit, energy } = queryParam;
  let list_mon = await randomNMonAn(limit, user_id);
  if (!list_mon || list_mon.length !== limit) {
    limit = 4;
    let list_mon = await randomNMonAn(limit, user_id);
    if (!list_mon || list_mon.length !== limit) {
      return {
        status: false,
        message: "Chưa có gợi ý món ăn phù hợp.",
      };
    }
  }
  const thuc_don = [];
  let list_temp = [];
  let ratio_choose = ratio[Math.floor(Math.random() * ratio.length)];
  list_mon.forEach((item, index) => {
    if (index !== 0 && index % 4 === 0) {
      thuc_don.push(list_temp);
      list_temp = [];
      ratio_choose = ratio[Math.floor(Math.random() * ratio.length)];
    }
    const quanty = Number(
      (
        (Number(ratio_choose[index % 4]) * Number(energy)) /
        100 /
        Number(item.TOTAL_ENERC)
      ).toFixed(2)
    );
    list_temp.push({
      id_monan: item.id_monan,
      ten_mon: item.ten_mon,
      don_vi: item.don_vi,
      TOTAL_ENERC: Number(
        ((Number(energy) * Number(ratio_choose[index % 4])) / 100).toFixed(2)
      ),
      TOTAL_PROCNT: Number((item.TOTAL_PROCNT * quanty).toFixed(2)),
      TOTAL_FAT: Number((item.TOTAL_FAT * quanty).toFixed(2)),
      TOTAL_CHOCDF: Number((item.TOTAL_CHOCDF * quanty).toFixed(2)),
      quanty: Number(quanty.toFixed(2)),
    });
  });
  thuc_don.push(list_temp);
  return {
    status: true,
    data: thuc_don,
  };
};

module.exports = {
  customerGetAllMonAnService,
  customerGetChiTietMonAnService,
  customerSearchMonAnService,
  customerGetMonAnOfUserService,
  customerAddMonAnService,
  customerDeleteMonAnService,
  customerUpdateMonAnService,
  customerUpdateImageService,
  customerGetMonAnGiauDuongChatService,
  customerGetAllMonAnByOffsetService,
  customerGetMonAnGiauDuongChatOffsetService,
  customerGetMonAnCungChuyenMucService,
  customerGetMonAnDungNhieuService,
  customerRandomMonAnService,
};
