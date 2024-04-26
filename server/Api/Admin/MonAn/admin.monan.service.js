const {
  MonAn,
  sequelize,
  NhomMonAn,
  User,
  NgayAn,
  Favourite,
  ChiTietMon,
  ThucPham,
  ThongBao,
} = require("../../../models");
const { Op } = require("Sequelize");
const getAll = async () => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const monAnList = await MonAn.findAll({
        include: [
          {
            model: ChiTietMon,
            include: [{ model: ThucPham }],
          },
          { model: NhomMonAn },
          { model: User, attributes: ["username", "user_id"] },
        ],
        order: [
          ["id_monan", "ASC"],
          [{ model: ChiTietMon }, "ten_phannhom", "DESC"],
        ],
      });
      return monAnList;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const adminGetAllMonAnService = async () => {
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

const getMonAnByID = async (id_monan) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const mon_an = await MonAn.findOne({
        where: {
          id_monan,
        },
        include: [{ model: ChiTietMon }],
      });
      return mon_an;
    });
    return result;
  } catch (error) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const adminGetMonAnByIDMonAnService = async (id_monan) => {
  const result = await getMonAnByID(id_monan);
  if (result) {
    return {
      status: true,
      data: result,
    };
  } else if (result === null) {
    return {
      status: false,
      data: "Món ăn không tồn tại trên hệ thống.",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const checkTenMonAn = async (ten_mon, status, id_monan) => {
  // status 1: Add (không yêu cầu id), status 2: Update (yêu cầu id)
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

const checkUserIDExist = async (user_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const user = await User.findOne({
        where: {
          user_id,
        },
      });
      return user;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const checkIDThucPhamExist = async (id_thucpham) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const thuc_pham = await ThucPham.findOne({
        where: {
          id_thucpham,
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

// const checkIDThucPhamV2Exist = async (id_thucpham) => {
//   const query = `SELECT THUCPHAM.id_thucpham FROM THUCPHAM WHERE THUCPHAM.id_thucpham = ${id_thucpham}`;
//   try {
//     const result = await sequelize.transaction(async (t) => {
//       const thuc_pham_list = await sequelize.query(query, {
//         type: QueryTypes.SELECT,
//       });
//       return thuc_pham_list;
//     });
//     return result;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// };

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

const AddMonAn = async (monAnBody) => {
  const {
    ten_mon,
    don_vi,
    id_nhommonan,
    user_id,
    monan_status,
    image_url,
    listChiTietMon,
  } = monAnBody;

  const user_check = await checkUserIDExist(user_id);
  try {
    const result = await sequelize.transaction(async (t) => {
      const mon_an = await MonAn.create(
        {
          ten_mon: ten_mon.trim(),
          don_vi: don_vi.trim(),
          id_nhommonan,
          user_id: user_check ? user_id : null,
          monan_status,
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

const adminAddMonAnService = async (monAnBody, queryParam) => {
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
    const add_result = await AddMonAn(monAnBody);
    if (add_result) {
      const monAnList = await getAllOfset(queryParam);
      const page = await findItem(queryParam, ten_mon);
      return {
        status: true,
        page: page,
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

const checkMonAnID = async (id_monan) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const mon_an = await MonAn.findOne({
        where: {
          id_monan,
        },
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

const deleteMonAn = async (id_monan) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const mon_an = await MonAn.destroy(
        {
          where: {
            id_monan: Number(id_monan),
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

const adminDeleteMonAnService = async (id_monan, queryParam) => {
  const check_id_monan = await checkMonAnID(id_monan);
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
      const delete_result = await deleteMonAn(id_monan);
      if (delete_result) {
        const monAnList = await getAllOfset(queryParam);
        return {
          status: true,
          data: monAnList,
          page: null,
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
          "Món ăn đang nằm trong ít nhất một bữa ăn, danh sách món ăn yêu thích hoặc chi tiết món. Không thể xóa",
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

const getThongBaoAllow = async (user_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const thong_bao = await ThongBao.findOne({
        where: {
          status: true,
          user_id: user_id,
        },
        distinct: true,
        col: "expo_key",
      });
      return thong_bao;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const sendThongBao = async (expo_key, thongBaoBody) => {
  return fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    body: JSON.stringify({
      to: expo_key,
      title: thongBaoBody.title,
      body: thongBaoBody.body,
    }),
  })
    .then(async (response) => {
      const result = await response.json();
      if (result.status === "ok") {
        return true;
      }
      return false;
    })
    .catch(function (err) {
      return false;
    });
};

const updateMonAn = async (id_monan, monAnBody) => {
  const { ten_mon, don_vi, id_nhommonan, monan_status } = monAnBody;
  try {
    const result = await sequelize.transaction(async (t) => {
      const mon_an = await MonAn.update(
        {
          ten_mon: ten_mon.trim(),
          don_vi: don_vi.trim(),
          id_nhommonan,
          monan_status,
          updatedAt: new Date(),
        },
        {
          where: {
            [Op.and]: [{ id_monan }],
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

const adminUpdateMonAnService = async (id_monan, monAnBody, queryParam) => {
  let { ten_mon, id_nhommonan, monan_status } = monAnBody;
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
  const check_id_monan = await checkMonAnID(id_monan);
  if (check_id_monan) {
    const check_name = await checkTenMonAn(ten_mon, "UPDATE", id_monan);
    if (check_name === null) {
      const update_result = await updateMonAn(id_monan, monAnBody);
      if (update_result) {
        if (check_id_monan !== 1 && monan_status === 1) {
          const thong_bao = await getThongBaoAllow(check_id_monan.user_id);
          if (thong_bao) {
            sendThongBao(thong_bao.expo_key, {
              title: "Thông báo",
              body: `Món ăn ${ten_mon} đã chuyển sang trạng thái công khai.`,
            });
          }
        }
        const monAnList = await getAllOfset(queryParam);
        const page = await findItem(queryParam, ten_mon);
        return {
          status: true,
          data: monAnList,
          page: page,
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

const updateImage = async (id_monan, image_url) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const buaAn = await MonAn.update(
        {
          image_url: String(image_url).trim(),
        },
        {
          where: {
            id_monan,
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

const adminUpdateImageService = async (id_monan, image_url, queryParam) => {
  const check_id_monan = await checkMonAnID(id_monan);
  if (check_id_monan) {
    const update_result = await updateImage(id_monan, image_url);
    if (update_result) {
      const monAnList = await getAllOfset(queryParam);
      return {
        status: true,
        data: monAnList,
        page: null,
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

const getByFilterByStatus = async (whereObject) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const monAnList = await MonAn.findAll({
        include: [
          {
            model: ChiTietMon,
            include: [{ model: ThucPham }],
          },
          { model: NhomMonAn },
          { model: User, attributes: ["username", "user_id"] },
        ],
        order: [
          ["id_monan", "ASC"],
          [{ model: ChiTietMon }, "ten_phannhom", "DESC"],
        ],
        where: whereObject,
      });
      return monAnList;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const adminGetByFilterMonAnService = async (status) => {
  let whereObject = {};
  // status = 1: ALL
  // status = 2: Admin
  // status = 3: User
  // status = 4: Show
  // status = 5: Hide
  // status = 6: No Details
  // status = 7: Request Public
  if (status === 1) {
    const monAnList = await getAll();
    return {
      status: true,
      data: monAnList,
    };
  } else if (status === 2) {
    whereObject = {
      user_id: null,
    };
    const monAnList = await getByFilterByStatus(whereObject);
    return {
      status: true,
      data: monAnList,
    };
  } else if (status === 3) {
    whereObject = {
      user_id: { [Op.ne]: null },
    };
    const monAnList = await getByFilterByStatus(whereObject);
    return {
      status: true,
      data: monAnList,
    };
  } else if (status === 4) {
    whereObject = {
      monan_status: 1,
    };
    const monAnList = await getByFilterByStatus(whereObject);
    return {
      status: true,
      data: monAnList,
    };
  } else if (status === 5) {
    whereObject = {
      monan_status: 0,
    };
    const monAnList = await getByFilterByStatus(whereObject);
    return {
      status: true,
      data: monAnList,
    };
  } else if (status === 7) {
    whereObject = {
      monan_status: 2,
    };
    const monAnList = await getByFilterByStatus(whereObject);
    return {
      status: true,
      data: monAnList,
    };
  } else if (status === 6) {
    whereObject = {
      "$ChiTietMons.id_chitietmon$": null,
    };
    const monAnList = await getByFilterByStatus(whereObject);
    return {
      status: true,
      data: monAnList,
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
          user_id: null,
        };
      } else if (status === 3) {
        whereObject = {
          user_id: { [Op.ne]: null },
        };
      } else if (status === 4) {
        whereObject = {
          monan_status: 1,
        };
      } else if (status === 5) {
        whereObject = {
          monan_status: 0,
        };
      } else if (status === 7) {
        whereObject = {
          monan_status: 2,
        };
      } else if (status === 6) {
        whereObject = {
          "$ChiTietMons.id_chitietmon$": null,
        };
      }
      if (status !== 6) {
        const list = await MonAn.findAll({
          include: [
            { model: NhomMonAn },
            { model: User, attributes: ["username", "user_id"] },
            {
              separate: true,
              model: ChiTietMon,
              include: [{ model: ThucPham }],
            },
          ], // {model: DonVi}

          where: {
            [Op.or]: [
              {
                id_monan: {
                  [Op.like]: `%${keyword}%`,
                },
              },
              {
                ten_mon: {
                  [Op.like]: `%${keyword}%`,
                },
              },
              // {
              //   '$DonVi.ten_donvi$': {
              //     [Op.like]: `%${keyword}%`,
              //   },
              // },
              {
                "$NhomMonAn.ten_nhom$": {
                  [Op.like]: `%${keyword}%`,
                },
              },
              {
                "$User.username$": {
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
      } else {
        const list = await MonAn.findAll({
          include: [
            { model: NhomMonAn },
            { model: User, attributes: ["username", "user_id"] },
            {
              model: ChiTietMon,
              include: [{ model: ThucPham }],
            },
          ], // {model: DonVi}

          where: {
            [Op.or]: [
              {
                id_monan: {
                  [Op.like]: `%${keyword}%`,
                },
              },
              {
                ten_mon: {
                  [Op.like]: `%${keyword}%`,
                },
              },
              // {
              //   '$DonVi.ten_donvi$': {
              //     [Op.like]: `%${keyword}%`,
              //   },
              // },
              {
                "$NhomMonAn.ten_nhom$": {
                  [Op.like]: `%${keyword}%`,
                },
              },
              {
                "$User.username$": {
                  [Op.like]: `%${keyword}%`,
                },
              },
            ],
            [Op.and]: [whereObject],
          },
          order: [[sort, type]],
        });
        const new_list = [];
        for (let i = offset; i < offset + limit; i++) {
          if (i < list.length) {
            new_list.push(list[i]);
          } else {
            break;
          }
        }
        return new_list;
      }
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
      user_id: null,
    };
  } else if (status === 3) {
    whereObject = {
      user_id: { [Op.ne]: null },
    };
  } else if (status === 4) {
    whereObject = {
      monan_status: 1,
    };
  } else if (status === 5) {
    whereObject = {
      monan_status: 0,
    };
  } else if (status === 7) {
    whereObject = {
      monan_status: 2,
    };
  } else if (status === 6) {
    whereObject = {
      "$ChiTietMons.id_chitietmon$": null,
    };
  }
  try {
    const result = await sequelize.transaction(async (t) => {
      const list = await MonAn.findAll({
        order: [[sort, type]],
        include: [
          { model: NhomMonAn },
          { model: User, attributes: ["username", "user_id"] },
          {
            separate: true,
            model: ChiTietMon,
            include: [{ model: ThucPham }],
          },
        ], // {model: DonVi}
        where: {
          [Op.or]: [
            {
              id_monan: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              ten_mon: {
                [Op.like]: `%${keyword}%`,
              },
            },
            // {
            //   '$DonVi.ten_donvi$': {
            //     [Op.like]: `%${keyword}%`,
            //   },
            // },
            {
              "$NhomMonAn.ten_nhom$": {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              "$User.username$": {
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
      (item) =>
        String(item.ten_mon).trim().toLocaleLowerCase() ===
        String(find_value).trim().toLocaleLowerCase()
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
  adminGetAllMonAnService,
  adminAddMonAnService,
  adminDeleteMonAnService,
  adminUpdateMonAnService,
  adminGetMonAnByIDMonAnService,
  getMonAnByID,
  adminUpdateImageService,
  adminGetByFilterMonAnService,
  adminOffsetService,
};
