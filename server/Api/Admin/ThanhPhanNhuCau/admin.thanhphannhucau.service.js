const {
  ThanhPhanNhuCau,
  sequelize,
  NhuCauHangNgay,
} = require("../../../models");
const { Op, Sequelize } = require("sequelize");
const getAll = async () => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const thanhPhanNhuCauList = await ThanhPhanNhuCau.findAll({
        order: [["id_nhucau", "ASC"]],
      });
      return thanhPhanNhuCauList;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminGetAllThanhPhanNhuCauService = async () => {
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

const AddThanhPhanNhuCau = async (obThanhPhanNhuCau) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const {
        DienGiai,
        NangLuong,
        Protein,
        Lipid,
        Glucid,
        Xo,
        CanXi,
        Phospho,
        Magie,
        Iod,
        Cu,
        Mangan,
        Fluo,
        Fe,
        Zn,
        Selen,
        Crom,
        VitaminA,
        VitaminE,
        VitaminK,
        VitaminD,
        VitaminB1,
        VitaminB2,
        Niacin,
        Pantothenic,
        VitaminB6,
        Folate,
        B12,
        Bitotin,
        VitaminC,
        Choline,
        NaMuoi,
        Kali,
        Clo,
      } = obThanhPhanNhuCau;
      const thanh_phan_nhu_cau = await ThanhPhanNhuCau.create(
        {
          DienGiai: String(DienGiai).trim(),
          NangLuong: typeof NangLuong === "string" ? NangLuong.trim() : "",
          Protein: typeof Protein === "string" ? Protein.trim() : "",
          Lipid: typeof Lipid === "string" ? Lipid.trim() : "",
          Glucid: typeof Glucid === "string" ? Glucid.trim() : "",
          Xo: typeof Xo === "string" ? Xo.trim() : "",
          CanXi: typeof CanXi === "string" ? CanXi.trim() : "",
          Phospho: typeof Phospho === "string" ? Phospho.trim() : "",
          Magie: typeof Magie === "string" ? Magie.trim() : "",
          Iod: typeof Iod === "string" ? Iod.trim() : "",
          Cu: typeof Cu === "string" ? Cu.trim() : "",
          Mangan: typeof Mangan === "string" ? Mangan.trim() : "",
          Fluo: typeof Fluo === "string" ? Fluo.trim() : "",
          Fe: typeof Fe === "string" ? Fe.trim() : "",
          Zn: typeof Zn === "string" ? Zn.trim() : "",
          Selen: typeof Selen === "string" ? Selen.trim() : "",
          Crom: typeof Crom === "string" ? Crom.trim() : "",
          VitaminA: typeof VitaminA === "string" ? VitaminA.trim() : "",
          VitaminE: typeof VitaminE === "string" ? VitaminE.trim() : "",
          VitaminK: typeof VitaminK === "string" ? VitaminK.trim() : "",
          VitaminD: typeof VitaminD === "string" ? VitaminD.trim() : "",
          VitaminB1: typeof VitaminB1 === "string" ? VitaminB1.trim() : "",
          VitaminB2: typeof VitaminB2 === "string" ? VitaminB2.trim() : "",
          Niacin: typeof Niacin === "string" ? Niacin.trim() : "",
          Pantothenic:
            typeof Pantothenic === "string" ? Pantothenic.trim() : "",
          VitaminB6: typeof VitaminB6 === "string" ? VitaminB6.trim() : "",
          Folate: typeof Folate === "string" ? Folate.trim() : "",
          B12: typeof B12 === "string" ? B12.trim() : "",
          Bitotin: typeof Bitotin === "string" ? Bitotin.trim() : "",
          VitaminC: typeof VitaminC === "string" ? VitaminC.trim() : "",
          Choline: typeof Choline === "string" ? Choline.trim() : "",
          NaMuoi: typeof NaMuoi === "string" ? NaMuoi.trim() : "",
          Kali: typeof Kali === "string" ? Kali.trim() : "",
          Clo: typeof Clo === "string" ? Clo.trim() : "",
        },
        { transaction: t }
      );
      return thanh_phan_nhu_cau;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminAddThanhPhanNhuCauService = async (obThanhPhanNhuCau, queryParam) => {
  const add_result = await AddThanhPhanNhuCau(obThanhPhanNhuCau);
  if (add_result) {
    const thanhPhanNhuCauList = await getAllOfset(queryParam);
    const page = await findItem(queryParam, add_result.id_nhucau);
    return {
      status: true,
      page: page,
      data: thanhPhanNhuCauList,
      message: "Thêm Thành phần nhu cầu thành công",
    };
  } else {
    return {
      status: false,
      message: "Thêm Thành phần nhu cầu thất bại",
    };
  }
};

const checkThanhPhanNhuCauID = async (id_nhucau) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const thanh_phan_nhu_cau = await ThanhPhanNhuCau.findOne({
        where: {
          id_nhucau,
        },
      });
      return thanh_phan_nhu_cau;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const checkThanhPhanNhuCauHasNhuCauHangNgay = async (id_nhucau) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhu_cau_hang_ngay = await NhuCauHangNgay.findOne({
        where: {
          id_nhucau,
        },
      });
      return nhu_cau_hang_ngay;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const deleteThanhPhanNhuCau = async (id_nhucau) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const thanh_phan_nhu_cau = await ThanhPhanNhuCau.destroy(
        {
          where: {
            id_nhucau: Number(id_nhucau),
          },
        },
        { transaction: t }
      );
      return thanh_phan_nhu_cau;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminDeleteThanhPhanNhuCauService = async (id_nhucau, queryParam) => {
  const check_id_nhucau = await checkThanhPhanNhuCauID(id_nhucau);
  if (check_id_nhucau) {
    const checkList = await Promise.all([
      Promise.resolve(checkThanhPhanNhuCauHasNhuCauHangNgay(id_nhucau)),
    ]);
    console.log("checkList", checkList);
    if (checkList[0] === null) {
      const delete_result = await deleteThanhPhanNhuCau(id_nhucau);
      if (delete_result) {
        const thanhPhanNhuCauList = await getAllOfset(queryParam);
        return {
          status: true,
          page: null,
          data: thanhPhanNhuCauList,
          message: "Xóa Thành phần nhu cầu thành công",
        };
      } else {
        return {
          status: false,
          message: "Xóa Thành phần nhu cầu thất bại",
        };
      }
    } else if (checkList[0] !== null) {
      return {
        status: false,
        message:
          "Thành phần nhu cầu đang tồn tại trong nhu cầu hàng ngày. Không thể xóa",
      };
    } else {
      return {
        status: false,
        message: "Lỗi hệ thống, vui lòng thử lại sau.",
      };
    }
  } else if (check_id_nhucau === null) {
    return {
      status: false,
      message: "Thành phần nhu cầu không tồn tại trên hệ thống.",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const updateThanhPhanNhuCau = async (id_nhucau, obThanhPhanNhuCau) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const {
        DienGiai,
        NangLuong,
        Protein,
        Lipid,
        Glucid,
        Xo,
        CanXi,
        Phospho,
        Magie,
        Iod,
        Cu,
        Mangan,
        Fluo,
        Fe,
        Zn,
        Selen,
        Crom,
        VitaminA,
        VitaminE,
        VitaminK,
        VitaminD,
        VitaminB1,
        VitaminB2,
        Niacin,
        Pantothenic,
        VitaminB6,
        Folate,
        B12,
        Bitotin,
        VitaminC,
        Choline,
        NaMuoi,
        Kali,
        Clo,
      } = obThanhPhanNhuCau;
      const thanh_phan_nhu_cau = await ThanhPhanNhuCau.update(
        {
          DienGiai: String(DienGiai).trim(),
          NangLuong:
            typeof NangLuong === "string"
              ? NangLuong.trim()
              : Sequelize.literal(`NangLuong`),
          Protein:
            typeof Protein === "string"
              ? Protein.trim()
              : Sequelize.literal(`Protein`),
          Lipid:
            typeof Lipid === "string"
              ? Lipid.trim()
              : Sequelize.literal(`Lipid`),
          Glucid:
            typeof Glucid === "string"
              ? Glucid.trim()
              : Sequelize.literal(`Glucid`),
          Xo: typeof Xo === "string" ? Xo.trim() : Sequelize.literal(`Xo`),
          CanXi:
            typeof CanXi === "string"
              ? CanXi.trim()
              : Sequelize.literal(`CanXi`),
          Phospho:
            typeof Phospho === "string"
              ? Phospho.trim()
              : Sequelize.literal(`Phospho`),
          Magie:
            typeof Magie === "string"
              ? Magie.trim()
              : Sequelize.literal(`Magie`),
          Iod: typeof Iod === "string" ? Iod.trim() : Sequelize.literal(`Iod`),
          Cu: typeof Cu === "string" ? Cu.trim() : Sequelize.literal(`Cu`),
          Mangan:
            typeof Mangan === "string"
              ? Mangan.trim()
              : Sequelize.literal(`Mangan`),
          Fluo:
            typeof Fluo === "string" ? Fluo.trim() : Sequelize.literal(`Fluo`),
          Fe: typeof Fe === "string" ? Fe.trim() : Sequelize.literal(`Fe`),
          Zn: typeof Zn === "string" ? Zn.trim() : Sequelize.literal(`Zn`),
          Selen:
            typeof Selen === "string"
              ? Selen.trim()
              : Sequelize.literal(`Selen`),
          Crom:
            typeof Crom === "string" ? Crom.trim() : Sequelize.literal(`Crom`),
          VitaminA:
            typeof VitaminA === "string"
              ? VitaminA.trim()
              : Sequelize.literal(`VitaminA`),
          VitaminE:
            typeof VitaminE === "string"
              ? VitaminE.trim()
              : Sequelize.literal(`VitaminE`),
          VitaminK:
            typeof VitaminK === "string"
              ? VitaminK.trim()
              : Sequelize.literal(`VitaminK`),
          VitaminD:
            typeof VitaminD === "string"
              ? VitaminD.trim()
              : Sequelize.literal(`VitaminD`),
          VitaminB1:
            typeof VitaminB1 === "string"
              ? VitaminB1.trim()
              : Sequelize.literal(`VitaminB1`),
          VitaminB2:
            typeof VitaminB2 === "string"
              ? VitaminB2.trim()
              : Sequelize.literal(`VitaminB2`),
          Niacin:
            typeof Niacin === "string"
              ? Niacin.trim()
              : Sequelize.literal(`Niacin`),
          Pantothenic:
            typeof Pantothenic === "string"
              ? Pantothenic.trim()
              : Sequelize.literal(`Pantothenic`),
          VitaminB6:
            typeof VitaminB6 === "string"
              ? VitaminB6.trim()
              : Sequelize.literal(`VitaminB6`),
          Folate:
            typeof Folate === "string"
              ? Folate.trim()
              : Sequelize.literal(`Folate`),
          B12: typeof B12 === "string" ? B12.trim() : Sequelize.literal(`B12`),
          Bitotin:
            typeof Bitotin === "string"
              ? Bitotin.trim()
              : Sequelize.literal(`Bitotin`),
          VitaminC:
            typeof VitaminC === "string"
              ? VitaminC.trim()
              : Sequelize.literal(`VitaminC`),
          Choline:
            typeof Choline === "string"
              ? Choline.trim()
              : Sequelize.literal(`Choline`),
          NaMuoi:
            typeof NaMuoi === "string"
              ? NaMuoi.trim()
              : Sequelize.literal(`NaMuoi`),
          Kali:
            typeof Kali === "string" ? Kali.trim() : Sequelize.literal(`Kali`),
          Clo: typeof Clo === "string" ? Clo.trim() : Sequelize.literal(`Clo`),
        },
        {
          where: {
            [Op.and]: [{ id_nhucau }],
          },
        },
        { transaction: t }
      );
      return thanh_phan_nhu_cau;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const adminUpdateThanhPhanNhuCauService = async (
  id_nhucau,
  obThanhPhanNhuCau,
  queryParam
) => {
  const check_id_nhucau = await checkThanhPhanNhuCauID(id_nhucau);
  if (check_id_nhucau) {
    const update_result = await updateThanhPhanNhuCau(
      id_nhucau,
      obThanhPhanNhuCau
    );
    if (update_result) {
      const thanhPhanNhuCauList = await getAllOfset(queryParam);
      const page = await findItem(queryParam, id_nhucau);
      return {
        status: true,
        page: page,
        data: thanhPhanNhuCauList,
        message: "Cập nhật thông tin Thành phần nhu cầu thành công",
      };
    } else {
      return {
        status: false,
        message: "Cập nhật thông tin Thành phần nhu cầu thất bại",
      };
    }
  } else if (check_id_nhucau === null) {
    return {
      status: false,
      message: "Thành phần nhu cầu không tồn tại trên hệ thống.",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const getAllOfset = async (queryParam) => {
  const { offset, limit, sort, type, keyword } = queryParam;
  try {
    const result = await sequelize.transaction(async (t) => {
      const list = await ThanhPhanNhuCau.findAll({
        order: [[sort, type]],
        offset: Number(offset),
        limit: Number(limit),
        where: {
          [Op.or]: [
            {
              DienGiai: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              NangLuong: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Protein: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Lipid: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Glucid: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Xo: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              CanXi: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Phospho: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Magie: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Iod: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Cu: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Mangan: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Fluo: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Fe: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Zn: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Selen: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Crom: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              VitaminA: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              VitaminE: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              VitaminK: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              VitaminD: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              VitaminB1: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              VitaminB2: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Niacin: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Pantothenic: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              VitaminB6: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Folate: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              B12: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Bitotin: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              VitaminC: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Choline: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              NaMuoi: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Kali: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Clo: {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
        },
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
  const { limit, sort, type, keyword } = queryParam;
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhomThucPhamList = await ThanhPhanNhuCau.findAll({
        order: [[sort, type]],
        where: {
          [Op.or]: [
            {
              DienGiai: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              NangLuong: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Protein: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Lipid: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Glucid: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Xo: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              CanXi: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Phospho: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Magie: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Iod: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Cu: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Mangan: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Fluo: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Fe: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Zn: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Selen: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Crom: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              VitaminA: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              VitaminE: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              VitaminK: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              VitaminD: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              VitaminB1: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              VitaminB2: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Niacin: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Pantothenic: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              VitaminB6: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Folate: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              B12: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Bitotin: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              VitaminC: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Choline: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              NaMuoi: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Kali: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              Clo: {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
        },
      });
      return nhomThucPhamList;
    });

    const find_index = result.findIndex(
      (item) => Number(item.id_nhucau) === Number(find_value)
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
  adminGetAllThanhPhanNhuCauService,
  adminAddThanhPhanNhuCauService,
  adminDeleteThanhPhanNhuCauService,
  adminUpdateThanhPhanNhuCauService,
  adminOffsetService,
};
