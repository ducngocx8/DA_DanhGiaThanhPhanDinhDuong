const { QueryTypes, Op } = require("Sequelize");
const {
  sequelize,
  NgayAn,
  User,
  BuaAn,
  MonAn,
  ChiTietMon,
  ThucPham,
} = require("../../../models");
const { getMucTieuHomNay } = require("../MucTieu/customer.muctieu.service");
const {
  customerGetKhuyenNghiService,
} = require("../DeXuat/customer.khuyennghi.service");
const getAll = async (user_id, date_query) => {
  let date_selected = date_query;
  if (!date_query) {
    const date = new Date();
    date_selected =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  }
  try {
    const result = await sequelize.transaction(async (t) => {
      const ngayAnList = await NgayAn.findAll({
        order: [["bua_an_id", "ASC"]],
        include: [
          { model: BuaAn },
          { model: User },
          { model: MonAn, include: [{ model: ChiTietMon, include: ThucPham }] },
        ],
        where: {
          user_id,
          time: date_selected,
        },
      });
      return ngayAnList;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const customerGetAllNgayAnService = async (user_id, date_query) => {
  const result = await getAll(user_id, date_query);
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

const checkMonAnIDExist = async (id_monan, user_id) => {
  const whereObject = {
    id_monan,
    // [Op.or]: [{ user_id: user_id }, { user_id: null, monan_status: true }],
    [Op.or]: [{ user_id: user_id }, { monan_status: 1 }],
  };

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

const checkBuaAnIDExist = async (bua_an_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const bua_an = await BuaAn.findOne({
        where: {
          bua_an_id,
        },
      });
      return bua_an;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const checkNgayAnExist = async (user_id, ngayan_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const ngay_an = await NgayAn.findOne({
        where: {
          user_id,
          ngayan_id,
        },
      });
      return ngay_an;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const AddNgayAn = async (user_id, ngayAnBody) => {
  try {
    const { quanty, bua_an_id, id_monan, time } = ngayAnBody;
    const result = await sequelize.transaction(async (t) => {
      const ngay_an = await NgayAn.create(
        {
          user_id: Number(user_id),
          bua_an_id: Number(bua_an_id),
          id_monan: Number(id_monan),
          quanty,
          time,
        },
        { transaction: t }
      );
      return ngay_an;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const updateNgayAn = async (user_id, ngayan_id, ngayAnBody) => {
  try {
    const { quanty, bua_an_id } = ngayAnBody;
    const result = await sequelize.transaction(async (t) => {
      const ngay_an = await NgayAn.update(
        {
          bua_an_id: Number(bua_an_id),
          quanty,
        },
        {
          where: {
            ngayan_id,
            user_id,
          },
        },
        { transaction: t }
      );
      return ngay_an;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const deleteNgayAn = async (user_id, ngayan_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const ngay_an = await NgayAn.destroy(
        {
          where: {
            user_id: Number(user_id),
            ngayan_id: Number(ngayan_id),
          },
        },
        { transaction: t }
      );
      return ngay_an;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const customerAddNgayAnService = async (user_id, ngayAnBody) => {
  const { id_monan, bua_an_id, time } = ngayAnBody;
  const checkList = await Promise.all([
    Promise.resolve(checkBuaAnIDExist(bua_an_id)),
    Promise.resolve(checkMonAnIDExist(id_monan, user_id)),
  ]);
  console.log("checkList", checkList);

  if (checkList[0] === null) {
    return {
      status: false,
      message: "Bữa ăn không tồn tại trên hệ thống.",
    };
  }
  if (checkList[1] === null) {
    return {
      status: false,
      message: "Món ăn không tồn tại trên hệ thống.",
    };
  }

  if (checkList[0] === false || checkList[1] === false) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }

  const add_result = await AddNgayAn(user_id, ngayAnBody);
  if (add_result) {
    const ngayAnList = await getAll(user_id, time);
    return {
      status: true,
      data: ngayAnList,
      message: "Thêm Món ăn vào khẩu phần ăn thành công.",
    };
  } else {
    return {
      status: false,
      message: "Thêm Món ăn vào khẩu phần đã ăn thất bại.",
    };
  }
};

const customerUpdateNgayAnService = async (user_id, ngayan_id, ngayAnBody) => {
  const { id_monan, bua_an_id, time } = ngayAnBody;
  const checkList = await Promise.all([
    Promise.resolve(checkNgayAnExist(user_id, ngayan_id)),
    Promise.resolve(checkBuaAnIDExist(bua_an_id)),
  ]);
  console.log("checkList", checkList);

  if (checkList[0] === null) {
    return {
      status: false,
      message: "Không tìm thấy món ăn của ngày cập nhật.",
    };
  }

  if (checkList[1] === null) {
    return {
      status: false,
      message: "Bữa ăn không tồn tại trên hệ thống.",
    };
  }

  if (checkList[0] === false || checkList[1] === false) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }

  const update_result = await updateNgayAn(user_id, ngayan_id, ngayAnBody);
  if (update_result) {
    const ngayAnList = await getAll(user_id, time);
    return {
      status: true,
      data: ngayAnList,
      message: "Cập nhật Món ăn trong khẩu phần ăn thành công.",
    };
  } else {
    return {
      status: false,
      message: "Cập nhật Món ăn trong khẩu phần ăn thất bại.",
    };
  }
};

const customerDeleteNgayAnService = async (user_id, ngayan_id) => {
  const checkList = await Promise.all([
    Promise.resolve(checkNgayAnExist(user_id, ngayan_id)),
  ]);
  console.log("checkList", checkList);
  if (checkList[0] === null) {
    return {
      status: false,
      message: "Không tìm thấy món ăn của ngày ăn cần xóa.",
    };
  }
  if (checkList[0] === false) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
  const delete_result = await deleteNgayAn(user_id, ngayan_id);
  if (delete_result) {
    const ngayAnList = await getAll(user_id, checkList[0].time);
    return {
      status: true,
      data: ngayAnList,
      message: "Xóa Món ăn khỏi khẩu phần ăn thành công.",
    };
  } else {
    return {
      status: false,
      message: "Xóa Món ăn khỏi khẩu phần ăn thất bại.",
    };
  }
};

const deleteAllMonAnOfNgayAn = async (user_id, time) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const ngay_an = await NgayAn.destroy(
        {
          where: {
            user_id: Number(user_id),
            time,
          },
        },
        { transaction: t }
      );
      return ngay_an;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const addMonAnCopy = async (ngay_an_copy) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const ngay_an = await NgayAn.bulkCreate(ngay_an_copy, { transaction: t });
      return ngay_an;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getNgayAnByTime = async (user_id, timeCopy) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const ngay_an_list = await NgayAn.findAll({
        where: {
          user_id,
          time: timeCopy,
        },
      });
      return ngay_an_list;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const customerCopyNgayAnService = async (user_id, timeCopy) => {
  const date = new Date();
  const time =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  const time_toi_uu =
    date.getFullYear() +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0");

  // Time hiện tại = timeCopy => Return false thông báo
  // Check ngày ăn copy xem có món ăn nào không
  if (time === timeCopy || timeCopy === time_toi_uu) {
    return {
      status: false,
      message: "Không thể copy ngày ăn hiện tại.",
    };
  }
  const ngay_an_list = await getNgayAnByTime(user_id, timeCopy);
  if (ngay_an_list.length === 0) {
    return {
      status: false,
      message: "Không thể copy ngày ăn không có món ăn.",
    };
  } else {
    // Xóa tất cả món ăn của ngày hiện tại
    const ngay_an_copy = ngay_an_list.map((item) => {
      return {
        time: time,
        quanty: Number(item.quanty),
        user_id: Number(user_id),
        bua_an_id: Number(item.bua_an_id),
        id_monan: Number(item.id_monan),
      };
    });

    const delete_result = await deleteAllMonAnOfNgayAn(user_id, time);
    if (delete_result !== false) {
      // Thêm món ăn copy vào ngày ăn hiện tại.
      const add_result = await addMonAnCopy(ngay_an_copy);
      console.log("add_result", add_result);
      const ngayAnList = await getAll(user_id);
      if (add_result) {
        return {
          status: true,
          data: ngayAnList,
          message: "Copy món ăn thành công",
        };
      } else {
        return {
          status: false,
          message: "Copy món ăn thất bại",
        };
      }
    } else {
      return {
        status: false,
        message: "Lỗi hệ thống, vui lòng thử lại sau.",
      };
    }
  }
};

const getAllMonDaAnHomNay = async (user_id) => {
  const query = `SELECT NGAYAN.ngayan_id, NGAYAN.bua_an_id, NGAYAN.time, NGAYAN.id_monan,
  MONAN.ten_mon, NGAYAN.quanty, CHITIETMON.quanty,
  THUCPHAM.ENERC, THUCPHAM.PROCNT, THUCPHAM.FAT, THUCPHAM.CHOCDF,
  SUM(NGAYAN.quanty * CHITIETMON.quanty * THUCPHAM.ENERC / 100) AS TOTAL_ENERC,
  SUM(NGAYAN.quanty * CHITIETMON.quanty * THUCPHAM.PROCNT / 100) AS TOTAL_PROCNT,
  SUM(NGAYAN.quanty * CHITIETMON.quanty * THUCPHAM.FAT / 100) AS TOTAL_FAT,
  SUM(NGAYAN.quanty * CHITIETMON.quanty * THUCPHAM.CHOCDF / 100) AS TOTAL_CHOCDF
  FROM NGAYAN
  INNER JOIN MONAN
  ON NGAYAN.time = curdate() AND NGAYAN.user_id = ${user_id} AND MONAN.id_monan = NGAYAN.id_monan
  INNER JOIN CHITIETMON
  ON CHITIETMON.id_monan = MONAN.id_monan
  INNER JOIN THUCPHAM
  ON THUCPHAM.id_thucpham = CHITIETMON.id_thucpham
  GROUP BY NGAYAN.user_id`;

  try {
    const result = await sequelize.transaction(async (t) => {
      const mon_an_list = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
      return mon_an_list;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const randomNMonAn = async (n, user_id) => {
  let where = ""
  if(user_id){
    where =
      `(MONAN.user_id = ${user_id} OR MONAN.monan_status = 1) AND CHITIETMON.id_monan = MONAN.id_monan`;
  }else{
     where =
       "MONAN.monan_status = 1 AND CHITIETMON.id_monan = MONAN.id_monan";
  }
  const query = `SELECT MONAN.id_monan, MONAN.ten_mon, MONAN.image_url, MONAN.don_vi,
  TRUNCATE(SUM(CHITIETMON.quanty * THUCPHAM.ENERC / 100), 2) AS TOTAL_ENERC,
  TRUNCATE(SUM(CHITIETMON.quanty * THUCPHAM.PROCNT / 100), 2) AS TOTAL_PROCNT,
  TRUNCATE(SUM(CHITIETMON.quanty * THUCPHAM.FAT / 100), 2) AS TOTAL_FAT,
  TRUNCATE(SUM(CHITIETMON.quanty * THUCPHAM.CHOCDF / 100), 2) AS TOTAL_CHOCDF
  FROM MONAN
  INNER JOIN CHITIETMON
  ON ${where} AND CHITIETMON.id_monan = MONAN.id_monan
  INNER JOIN THUCPHAM
  ON THUCPHAM.id_thucpham = CHITIETMON.id_thucpham
  GROUP BY MONAN.id_monan
  ORDER BY RAND()
  LIMIT ${n}`;

  try {
    const result = await sequelize.transaction(async (t) => {
      const mon_an_list = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
      return mon_an_list;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const findQuanty = (n, matrix) => {
  let i, j, k;
  let result = [];
  for (i = 0; i < n; i++) {
    for (j = i + 1; j < n; j++) {
      if (Math.abs(matrix[i][i]) < Math.abs(matrix[j][i])) {
        for (k = 0; k < n + 1; k++) {
          matrix[i][k] = matrix[i][k] + matrix[j][k];
          matrix[j][k] = matrix[i][k] - matrix[j][k];
          matrix[i][k] = matrix[i][k] - matrix[j][k];
        }
      }
    }
  }

  for (i = 0; i < n - 1; i++) {
    for (j = i + 1; j < n; j++) {
      let f = matrix[j][i] / matrix[i][i];
      for (k = 0; k < n + 1; k++) {
        matrix[j][k] = matrix[j][k] - f * matrix[i][k];
      }
    }
  }

  for (i = n - 1; i >= 0; i--) {
    result[i] = matrix[i][n];

    for (j = i + 1; j < n; j++) {
      if (i !== j) {
        result[i] = result[i] - matrix[i][j] * result[j];
      }
    }
    result[i] = result[i] / matrix[i][i];
  }

  return result;
};

const getGoiY = async (n, user_id, con_thieu) => {
  let start = performance.now();
  let quantyCheck = false;
  // random n món ăn khác
  while (!quantyCheck) {
    let i, j;
    let matrix = [];
    const list_mon = await randomNMonAn(n, user_id);
    let goi_y_mon = [];
    if (!list_mon || list_mon.length !== n) {
      return {
        status: false,
        message: "Chưa có gợi ý món ăn phù hợp.",
      };
    }
    if (n === 1) {
      quantyCheck = true;
      const quanty = con_thieu.NangLuong / list_mon[0].TOTAL_ENERC;
      goi_y_mon = list_mon.map((item) => {
        return {
          id_monan: item.id_monan,
          ten_mon: item.ten_mon,
          don_vi: item.don_vi,
          TOTAL_ENERC: Number((item.TOTAL_ENERC * quanty).toFixed(2)),
          TOTAL_PROCNT: Number((item.TOTAL_PROCNT * quanty).toFixed(2)),
          TOTAL_FAT: Number((item.TOTAL_FAT * quanty).toFixed(2)),
          TOTAL_CHOCDF: Number((item.TOTAL_CHOCDF * quanty).toFixed(2)),
          quanty: Number(quanty.toFixed(2)),
        };
      });
      return {
        status: true,
        data: goi_y_mon,
      };
    } else {
      // thiết lập mảng 2D
      for (i = 0; i < n; i++) {
        let list = [];
        for (j = 0; j < n; j++) {
          if (i === 0) {
            list.push(Number(list_mon[j].TOTAL_ENERC));
            if (j === n - 1) {
              list.push(con_thieu.NangLuong);
            }
          } else if (i === 1) {
            list.push(Number(list_mon[j].TOTAL_PROCNT));
            if (j === n - 1) {
              list.push(con_thieu.Protein);
            }
          } else if (i === 2) {
            list.push(Number(list_mon[j].TOTAL_FAT));
            if (j === n - 1) {
              list.push(con_thieu.Lipid);
            }
          } else if (i === 3) {
            list.push(Number(list_mon[j].TOTAL_CHOCDF));
            if (j === n - 1) {
              list.push(con_thieu.Glucid);
            }
          }
        }
        matrix.push(list);
      }
      // tìm quanty
      console.log("matrix =", matrix);
      quantyList = findQuanty(n, matrix);
      console.log("Kết quả =");
      for (i = 0; i < n; i++) {
        console.log(quantyList[i]);
        if (
          quantyList[i] < 0 ||
          isNaN(quantyList[i]) ||
          quantyList[i] === Infinity
        ) {
          let end = performance.now();
          if (end - start > 2000 && end - start < 4000 && n > 1) {
            n--;
          } else if (end - start >= 4000 && end - start < 6000 && n > 1) {
            n--;
          } else if (end - start >= 6000 && n > 1) {
            n = 1;
          }
          quantyCheck = false;
          break;
        }
        if (i === n - 1 && quantyList[i] > 0) {
          quantyCheck = true;
          goi_y_mon = list_mon.map((item, index) => {
            return {
              id_monan: item.id_monan,
              ten_mon: item.ten_mon,
              don_vi: item.don_vi,
              image_url: item.image_url,
              TOTAL_ENERC: Number(
                (item.TOTAL_ENERC * quantyList[index]).toFixed(2)
              ),
              TOTAL_PROCNT: Number(
                (item.TOTAL_PROCNT * quantyList[index]).toFixed(2)
              ),
              TOTAL_FAT: Number(
                (item.TOTAL_FAT * quantyList[index]).toFixed(2)
              ),
              TOTAL_CHOCDF: Number(
                (item.TOTAL_CHOCDF * quantyList[index]).toFixed(2)
              ),
              quanty: Number(quantyList[index].toFixed(2)),
            };
          });
          return {
            status: true,
            data: goi_y_mon,
          };
        }
      }
      let end = performance.now();
      if (end - start > 10000) {
        return {
          status: false,
          message: "Chưa có gợi ý món ăn phù hợp.",
        };
      }
    }
  }
};

const customerGoiYMonAnService = async (user_id) => {
  let khuyen_nghi = null;
  let n = 4;
  let con_thieu = {};
  const mon_da_an = await getAllMonDaAnHomNay(user_id);
  console.log("mon_da_an", mon_da_an);
  if (mon_da_an.length >= 4) {
    n = 1;
  } else {
    n = n - mon_da_an.length;
  }
  const muc_tieu_hom_nay = await getMucTieuHomNay(user_id);
  if (!muc_tieu_hom_nay) {
    khuyen_nghi = await customerGetKhuyenNghiService(user_id);
    if (khuyen_nghi.data) {
      const NangLuong = Number(
        khuyen_nghi.data.ThanhPhanNhuCau["NangLuong"].match(/\d+/)
          ? khuyen_nghi.data.ThanhPhanNhuCau["NangLuong"].match(/\d+/)[0]
          : 0
      );
      const Protein = Number(
        khuyen_nghi.data.ThanhPhanNhuCau["Protein"].match(/\d+/)
          ? khuyen_nghi.data.ThanhPhanNhuCau["Protein"].match(/\d+/)[0]
          : 0
      );
      const Lipid = Number(
        khuyen_nghi.data.ThanhPhanNhuCau["Lipid"].match(/\d+/)
          ? khuyen_nghi.data.ThanhPhanNhuCau["Lipid"].match(/\d+/)[0]
          : 0
      );
      const Glucid = Number(
        khuyen_nghi.data.ThanhPhanNhuCau["Glucid"].match(/\d+/)
          ? khuyen_nghi.data.ThanhPhanNhuCau["Glucid"].match(/\d+/)[0]
          : 0
      );

      if (NangLuong === 0 || Lipid === 0 || Protein === 0 || Glucid === 0) {
        return {
          status: false,
          message: "Chưa có gợi ý món ăn phù hợp.",
        };
      }

      con_thieu = {
        NangLuong: Number(
          (
            NangLuong - (mon_da_an.length > 0 ? mon_da_an[0].TOTAL_ENERC : 0)
          ).toFixed(2)
        ),
        Protein: Number(
          (
            Protein - (mon_da_an.length > 0 ? mon_da_an[0].TOTAL_PROCNT : 0)
          ).toFixed(2)
        ),
        Lipid: Number(
          (Lipid - (mon_da_an.length > 0 ? mon_da_an[0].TOTAL_FAT : 0)).toFixed(
            2
          )
        ),
        Glucid: Number(
          (
            Glucid - (mon_da_an.length > 0 ? mon_da_an[0].TOTAL_CHOCDF : 0)
          ).toFixed(2)
        ),
      };
      console.log("con_thieu theo KN:", con_thieu);
    } else {
      // CHƯA CÓ THÔNG TIN DINH DƯỠNG ĐỂ GỢI Ý
      return {
        status: false,
        message: "Chưa có gợi ý món ăn phù hợp.",
      };
    }
  } else {
    con_thieu = {
      NangLuong: Number(
        (
          muc_tieu_hom_nay.ENERC -
          (mon_da_an.length > 0 ? mon_da_an[0].TOTAL_ENERC : 0)
        ).toFixed(2)
      ),
      Protein: Number(
        (
          muc_tieu_hom_nay.PROCNT -
          (mon_da_an.length > 0 ? mon_da_an[0].TOTAL_PROCNT : 0)
        ).toFixed(2)
      ),
      Lipid: Number(
        (
          muc_tieu_hom_nay.FAT -
          (mon_da_an.length > 0 ? mon_da_an[0].TOTAL_FAT : 0)
        ).toFixed(2)
      ),
      Glucid: Number(
        (
          muc_tieu_hom_nay.CHOCDF -
          (mon_da_an.length > 0 ? mon_da_an[0].TOTAL_CHOCDF : 0)
        ).toFixed(2)
      ),
    };
    console.log("con_thieu theo MT:", con_thieu);
  }
  let warning = "";
  if (con_thieu.NangLuong < 0) {
    warning += warning === "" ? "Lượng năng lượng" : ", năng lượng";
  }
  if (con_thieu.Protein < 0) {
    warning += warning === "" ? "Lượng chất đạm" : ", chất đạm";
  }
  if (con_thieu.Lipid < 0) {
    warning += warning === "" ? "Lượng chất béo" : ", chất béo";
  }
  if (con_thieu.Glucid < 0) {
    warning += warning === "" ? "Lượng Carbohydrate" : ", chất đạm";
  }

  if (warning !== "") {
    return {
      status: false,
      message:
        warning +
        " vượt quá mức" +
        (khuyen_nghi ? " khuyến nghị " : " mục tiêu ") +
        "cho phép.",
    };
  }

  if (con_thieu.NangLuong <= 5) {
    return {
      status: false,
      message: "Chưa có gợi ý món ăn phù hợp.",
    };
  }

  const quantyList = await getGoiY(n, user_id, con_thieu);
  if (quantyList.status) {
    const tong_thanh_phan = {
      TOTAL_ENERC: Number(mon_da_an[0]?.TOTAL_ENERC || 0),
      TOTAL_PROCNT: Number(mon_da_an[0]?.TOTAL_PROCNT || 0),
      TOTAL_FAT: Number(mon_da_an[0]?.TOTAL_FAT || 0),
      TOTAL_CHOCDF: Number(mon_da_an[0]?.TOTAL_CHOCDF || 0),
    };
    quantyList.data.forEach((item) => {
      tong_thanh_phan.TOTAL_ENERC += Number(item.TOTAL_ENERC);
      tong_thanh_phan.TOTAL_PROCNT += Number(item.TOTAL_PROCNT);
      tong_thanh_phan.TOTAL_FAT += Number(item.TOTAL_FAT);
      tong_thanh_phan.TOTAL_CHOCDF += Number(item.TOTAL_CHOCDF);
    });

    tong_thanh_phan.TOTAL_ENERC = Number(
      tong_thanh_phan.TOTAL_ENERC.toFixed(2)
    );
    tong_thanh_phan.TOTAL_PROCNT = Number(
      tong_thanh_phan.TOTAL_PROCNT.toFixed(2)
    );
    tong_thanh_phan.TOTAL_FAT = Number(tong_thanh_phan.TOTAL_FAT.toFixed(2));
    tong_thanh_phan.TOTAL_CHOCDF = Number(
      tong_thanh_phan.TOTAL_CHOCDF.toFixed(2)
    );
    return {
      status: true,
      data: quantyList.data,
      tong_thanh_phan: tong_thanh_phan,
    };
  } else {
    return quantyList;
  }
};

module.exports = {
  customerGetAllNgayAnService,
  customerAddNgayAnService,
  customerDeleteNgayAnService,
  customerUpdateNgayAnService,
  customerCopyNgayAnService,
  customerGoiYMonAnService,
  randomNMonAn,
};
