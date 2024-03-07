const {
  NhuCauHangNgay,
  sequelize,
  NhomTuoi,
  LaoDong,
  ThanhPhanNhuCau,
  DoiTuong,
} = require("../../../models");
const { Op } = require("Sequelize");
const getAll = async () => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhuCauHangNgayList = await NhuCauHangNgay.findAll({
        order: [["id_nhomtuoi", "ASC"]],
        include: [
          { model: LaoDong },
          { model: NhomTuoi },
          { model: ThanhPhanNhuCau },
          { model: DoiTuong },
        ],
      });
      return nhuCauHangNgayList;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const adminGetAllNhuCauHangNgayService = async () => {
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

const checkNhomTuoiExist = async (id_nhomtuoi) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhom_tuoi = await NhomTuoi.findOne({
        where: {
          id_nhomtuoi,
        },
      });
      return nhom_tuoi;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const checkLaoDongExist = async (id_laodong) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const lao_dong = await LaoDong.findOne({
        where: {
          id_laodong,
        },
      });
      return lao_dong;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const checkNhuCauExist = async (id_nhucau) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhu_cau = await ThanhPhanNhuCau.findOne({
        where: {
          id_nhucau,
        },
      });
      return nhu_cau;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const checkDoiTuongExist = async (id_doituong) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const doi_tuong = await DoiTuong.findOne({
        where: {
          id_doituong,
        },
      });
      return doi_tuong;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const checkExistInfo = async (
  id_nhomtuoi,
  id_laodong,
  id_doituong,
  id_nhucau,
  status
) => {
  // status 1: Add (không yêu cầu id), status 2: Update (yêu cầu id)
  let whereObject = {};
  if (status === "ADD") {
    whereObject = {
      id_nhomtuoi,
      id_laodong,
      id_doituong,
    };
  } else if (status === "UPDATE") {
    whereObject = {
      [Op.and]: [
        { id_nhomtuoi: id_nhomtuoi },
        { id_laodong: id_laodong },
        { id_doituong: id_doituong },
      ],
    };
  }
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhu_cau_hang_ngay = await NhuCauHangNgay.findOne({
        where: whereObject,
      });

      console.log("nhu_cau_hang_ngay", nhu_cau_hang_ngay);
      return nhu_cau_hang_ngay;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const AddNhuCauHangNgay = async (
  id_nhomtuoi,
  id_laodong,
  id_doituong,
  id_nhucau
) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhu_cau_hang_ngay = await NhuCauHangNgay.create(
        {
          id_nhomtuoi: Number(id_nhomtuoi),
          id_laodong: Number(id_laodong),
          id_doituong: Number(id_doituong),
          id_nhucau: Number(id_nhucau),
        },
        { transaction: t }
      );
      return nhu_cau_hang_ngay;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminAddNhuCauHangNgayService = async (
  id_nhomtuoi,
  id_laodong,
  id_doituong,
  id_nhucau,
  queryParam
) => {
  const checkList = await Promise.all([
    Promise.resolve(checkNhomTuoiExist(id_nhomtuoi)),
    Promise.resolve(checkLaoDongExist(id_laodong)),
    Promise.resolve(checkDoiTuongExist(id_doituong)),
    Promise.resolve(checkNhuCauExist(id_nhucau)),
  ]);

  console.log("check List Nhu Cầu = ", checkList);

  if (checkList[0] === null) {
    return {
      status: false,
      message: "Nhóm Tuổi không tồn tại trên hệ thống.",
    };
  }

  if (checkList[1] === null) {
    return {
      status: false,
      message: "Nhóm Lao động không tồn tại trên hệ thống.",
    };
  }

  if (checkList[2] === null) {
    return {
      status: false,
      message: "Nhóm Đối tượng không tồn tại trên hệ thống.",
    };
  }

  if (checkList[3] === null) {
    return {
      status: false,
      message: "Nhóm Nhu cầu không tồn tại trên hệ thống.",
    };
  }

  if (
    checkList[0] === false ||
    checkList[1] === false ||
    checkList[2] === false ||
    checkList[3] === false
  ) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }

  const check_name = await checkExistInfo(
    id_nhomtuoi,
    id_laodong,
    id_doituong,
    id_nhucau,
    "ADD",
    -1
  );
  if (check_name === null) {
    const add_result = await AddNhuCauHangNgay(
      id_nhomtuoi,
      id_laodong,
      id_doituong,
      id_nhucau
    );
    if (add_result) {
      const nhuCauHangNgayList = await getAllOfset(queryParam);
      const page = await findItem(queryParam, {
        id_nhomtuoi,
        id_laodong,
        id_doituong,
        id_nhucau,
      });
      return {
        status: true,
        data: nhuCauHangNgayList,
        page: page,
        message: "Thêm Nhu cầu hàng ngày thành công",
      };
    } else {
      return {
        status: false,
        message: "Thêm Nhu cầu hàng ngày thất bại",
      };
    }
  } else if (check_name !== null) {
    return {
      status: false,
      message: "Thông tin Nhu cầu hàng ngày đã tồn tại trên hệ thống",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const checkNhuCauHangNgayID = async (
  id_nhomtuoi,
  id_laodong,
  id_doituong,
  id_nhucau
) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhu_cau_hang_ngay = await NhuCauHangNgay.findOne({
        where: {
          id_nhomtuoi,
          id_laodong,
          id_doituong,
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
const deleteNhuCauHangNgay = async (
  id_nhomtuoi,
  id_laodong,
  id_doituong,
  id_nhucau
) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhu_cau_hang_ngay = await NhuCauHangNgay.destroy(
        {
          where: {
            id_nhomtuoi: Number(id_nhomtuoi),
            id_laodong: Number(id_laodong),
            id_doituong: Number(id_doituong),
            id_nhucau: Number(id_nhucau),
          },
        },
        { transaction: t }
      );
      return nhu_cau_hang_ngay;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminDeleteNhuCauHangNgayService = async (
  id_nhomtuoi,
  id_laodong,
  id_doituong,
  id_nhucau,
  queryParam
) => {
  const check_id_NhuCauHangNgay = await checkNhuCauHangNgayID(
    id_nhomtuoi,
    id_laodong,
    id_doituong,
    id_nhucau
  );
  if (check_id_NhuCauHangNgay) {
    const delete_result = await deleteNhuCauHangNgay(
      id_nhomtuoi,
      id_laodong,
      id_doituong,
      id_nhucau
    );
    if (delete_result) {
      const nhuCauHangNgayList = await getAllOfset(queryParam);
      return {
        status: true,
        data: nhuCauHangNgayList,
        page: null,
        message: "Xóa Nhu cầu hàng ngày thành công",
      };
    } else {
      return {
        status: false,
        message: "Xóa Nhu cầu hàng ngày thất bại",
      };
    }
  } else if (check_id_NhuCauHangNgay === null) {
    return {
      status: false,
      message: "Nhu cầu hàng ngày không tồn tại trên hệ thống.",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const updateNhuCauHangNgay = async (
  id_nhomtuoi,
  id_laodong,
  id_doituong,
  id_nhucau,
  id_nhomtuoi_old,
  id_laodong_old,
  id_doituong_old,
  id_nhucau_old
) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhu_cau_hang_ngay = await NhuCauHangNgay.update(
        {
          id_nhomtuoi: Number(id_nhomtuoi),
          id_laodong: Number(id_laodong),
          id_doituong: Number(id_doituong),
          id_nhucau: Number(id_nhucau),
        },
        {
          where: {
            id_nhomtuoi: id_nhomtuoi_old,
            id_laodong: id_laodong_old,
            id_doituong: id_doituong_old,
            id_nhucau: id_nhucau_old,
          },
        },
        { transaction: t }
      );
      return nhu_cau_hang_ngay;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const adminUpdateNhuCauHangNgayService = async (
  id_nhomtuoi,
  id_laodong,
  id_doituong,
  id_nhucau,
  id_nhomtuoi_old,
  id_laodong_old,
  id_doituong_old,
  id_nhucau_old,
  queryParam
) => {
  if (
    id_doituong_old === id_doituong &&
    id_laodong === id_laodong_old &&
    id_nhomtuoi === id_nhomtuoi_old &&
    id_nhucau === id_nhucau_old
  ) {
    const nhuCauHangNgayList = await getAllOfset(queryParam);
    const page = await findItem(queryParam, {
      id_nhomtuoi,
      id_laodong,
      id_doituong,
      id_nhucau,
    });
    return {
      status: true,
      data: nhuCauHangNgayList,
      page: page,
      message: "Cập nhật thông tin Nhu cầu hàng ngày thành công",
    };
  }

  const checkList = await Promise.all([
    Promise.resolve(checkNhomTuoiExist(id_nhomtuoi)),
    Promise.resolve(checkLaoDongExist(id_laodong)),
    Promise.resolve(checkDoiTuongExist(id_doituong)),
    Promise.resolve(checkNhuCauExist(id_nhucau)),
  ]);

  console.log("check List Nhu Cầu = ", checkList);

  if (checkList[0] === null) {
    return {
      status: true,
      message: "Nhóm Tuổi mới không tồn tại trên hệ thống.",
    };
  }

  if (checkList[1] === null) {
    return {
      status: true,
      message: "Nhóm Lao động mới không tồn tại trên hệ thống.",
    };
  }

  if (checkList[2] === null) {
    return {
      status: true,
      message: "Nhóm Đối tượng mới không tồn tại trên hệ thống.",
    };
  }

  if (checkList[3] === null) {
    return {
      status: true,
      message: "Nhóm Nhu cầu mới không tồn tại trên hệ thống.",
    };
  }

  if (
    checkList[0] === false ||
    checkList[1] === false ||
    checkList[2] === false ||
    checkList[3] === false
  ) {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }

  const check_id_NhuCauHangNgay = await checkNhuCauHangNgayID(
    id_nhomtuoi_old,
    id_laodong_old,
    id_doituong_old,
    id_nhucau_old
  );

  if (check_id_NhuCauHangNgay) {
    const check_name = await checkExistInfo(
      id_nhomtuoi,
      id_laodong,
      id_doituong,
      id_nhucau,
      "UPDATE"
    );

    if (
      check_name === null ||
      (check_name &&
        id_doituong === id_doituong_old &&
        id_laodong === id_laodong_old &&
        id_nhomtuoi === id_nhomtuoi_old)
    ) {
      const update_result = await updateNhuCauHangNgay(
        id_nhomtuoi,
        id_laodong,
        id_doituong,
        id_nhucau,
        id_nhomtuoi_old,
        id_laodong_old,
        id_doituong_old,
        id_nhucau_old
      );
      if (update_result) {
        const nhuCauHangNgayList = await getAllOfset(queryParam);
        const page = await findItem(queryParam, {
          id_nhomtuoi,
          id_laodong,
          id_doituong,
          id_nhucau,
        });
        return {
          status: true,
          data: nhuCauHangNgayList,
          page: page,
          message: "Cập nhật thông tin Nhu cầu hàng ngày thành công",
        };
      } else {
        return {
          status: false,
          message: "Cập nhật thông tin Nhu cầu hàng ngày thất bại",
        };
      }
    } else if (check_name !== null) {
      return {
        status: false,
        message: "Thông tin Nhu cầu hàng ngày đã tồn tại trên hệ thống.",
      };
    } else {
      return {
        status: false,
        message: "Lỗi hệ thống, vui lòng thử lại sau.",
      };
    }
  } else if (check_id_NhuCauHangNgay === null) {
    return {
      status: false,
      message: "Nhu cầu hàng ngày không tồn tại trên hệ thống.",
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
      const list = await NhuCauHangNgay.findAll({
        order: [[sort, type]],
        offset: Number(offset),
        limit: Number(limit),
        include: [
          { model: NhomTuoi },
          { model: ThanhPhanNhuCau },
          { model: LaoDong },
          { model: DoiTuong },
        ],
        where: {
          [Op.or]: [
            {
              "$NhomTuoi.TenNhomTuoi$": {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              "$ThanhPhanNhuCau.DienGiai$": {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              "$LaoDong.TenLaoDong$": {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              "$DoiTuong.TenDoiTuong$": {
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
      const list = await NhuCauHangNgay.findAll({
        order: [[sort, type]],
        include: [
          { model: NhomTuoi },
          { model: ThanhPhanNhuCau },
          { model: LaoDong },
          { model: DoiTuong },
        ],
        where: {
          [Op.or]: [
            {
              "$NhomTuoi.TenNhomTuoi$": {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              "$ThanhPhanNhuCau.DienGiai$": {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              "$LaoDong.TenLaoDong$": {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              "$DoiTuong.TenDoiTuong$": {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
        },
      });
      return list;
    });

    const find_index = result.findIndex(
      (item) =>
        item.id_nhomtuoi === find_value.id_nhomtuoi &&
        item.id_laodong === find_value.id_laodong &&
        item.id_doituong === find_value.id_doituong &&
        item.id_nhucau === find_value.id_nhucau
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
  adminGetAllNhuCauHangNgayService,
  adminAddNhuCauHangNgayService,
  adminDeleteNhuCauHangNgayService,
  adminUpdateNhuCauHangNgayService,
  adminOffsetService,
};
