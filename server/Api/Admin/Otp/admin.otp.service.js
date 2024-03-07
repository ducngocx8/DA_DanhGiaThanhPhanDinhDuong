const { Op } = require("sequelize");
const { Otp, sequelize } = require("../../../models");

const getAllOTPService = async () => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const otps = await Otp.findAll({
        order: [["id", "DESC"]],
      });
      return otps;
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

const updateOTPService = async (email, otp_code, otp_type) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      let otp = await Otp.update(
        {
          status: true,
        },
        {
          where: {
            email,
            otp_code,
            otp_type,
          },
        },
        { transaction: t }
      );
      return otp;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const deleteAllOTPService = async (queryParam) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const xoa = await Otp.destroy({ where: {} }, { transaction: t });
      return xoa;
    });
    const otps = await getAllOfset(queryParam);
    return {
      status: true,
      message: "Xóa tất cả dữ liệu OTP thành công.",
      data: otps,
      page: null,
    };
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getAllOfset = async (queryParam) => {
  const { offset, limit, sort, type, keyword } = queryParam;
  try {
    const result = await sequelize.transaction(async (t) => {
      const list = await Otp.findAll({
        order: [[sort, type]],
        offset: Number(offset),
        limit: Number(limit),
        where: {
          [Op.or]: [
            {
              id: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              email: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              otp_code: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              time_send: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              status: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              otp_type: {
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

module.exports = {
  getAllOTPService,
  updateOTPService,
  deleteAllOTPService,
  adminOffsetService,
};
