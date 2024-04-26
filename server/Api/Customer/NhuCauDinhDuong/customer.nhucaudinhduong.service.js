const { sequelize, LaoDong, NhuCauHangNgay, NhomTuoi, DoiTuong, ThanhPhanNhuCau } = require("../../../models");
const getAll = async () => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const laoDongList = await LaoDong.findAll({
        order: [["id_laodong", "ASC"]],
      });
      return laoDongList;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const customerGetAllLaoDongService = async () => {
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

const handleTraCuuTheoDoiTuong = async (
  id_doituong,
  id_laodong,
  id_nhomtuoi
) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const nhu_cau = await NhuCauHangNgay.findOne({
        where: {
          id_doituong,
          id_laodong,
          id_nhomtuoi,
        },
        include: [{ model: NhomTuoi }, { model: DoiTuong }, {model: LaoDong}, {model: ThanhPhanNhuCau}],
      });
      return nhu_cau;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

customerTraCuuTheoDoiTuongService = async (queryParam) => {
  let { id_doituong, id_laodong, id_nhomtuoi } = queryParam;
  const tra_cuu = await handleTraCuuTheoDoiTuong(
    id_doituong,
    id_laodong,
    id_nhomtuoi
  );
  if (tra_cuu) {
    return {
      status: true,
      data: tra_cuu,
    };
  }else if(tra_cuu === null){
     return {
       status: false,
       message:
         "Chưa có dữ liệu nhu cầu dinh dưỡng khuyến nghị cho đối tượng trên",
     };
  }else{
     return {
       status: false,
       message: "Lỗi hệ thống, vui lòng thử lại sau.",
     };
  }
};

module.exports = {
  customerGetAllLaoDongService,
  customerTraCuuTheoDoiTuongService,
};
