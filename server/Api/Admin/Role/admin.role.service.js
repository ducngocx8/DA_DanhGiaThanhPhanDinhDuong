const {
  Role,
  sequelize,
  NhuCauHangNgay,
  ChiSoUser,
  User,
} = require("../../../models");
const { Op } = require("sequelize");
const getAll = async () => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const roleList = await Role.findAll({
        order: [["role_id", "ASC"]],
      });
      return roleList;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminGetAllRoleService = async () => {
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

const checkRole_code = async (role_code, status, role_id) => {
  // status 1: Add (không yêu cầu id), status 2: Update (yêu cầu id)
  let whereObject = {};
  if (status === "ADD") {
    whereObject = {
      role_code: role_code,
    };
  } else if (status === "UPDATE") {
    whereObject = {
      [Op.and]: [{ role_code: role_code }, { role_id: { [Op.not]: role_id } }],
    };
  }
  try {
    const result = await sequelize.transaction(async (t) => {
      const role = await Role.findOne({
        where: whereObject,
      });
      return role;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const AddRole = async (role_code, role_name) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const role = await Role.create(
        {
          role_code: String(role_code).trim(),
          role_name: String(role_name).trim(),
        },
        { transaction: t }
      );
      return role;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminAddRoleService = async (role_code, role_name, queryParam) => {
  role_code = String(role_code).trim();
  const check_name = await checkRole_code(role_code, "ADD", -1);
  if (check_name === null) {
    const add_result = await AddRole(role_code, role_name);
    if (add_result) {
       const roleList = await getAllOfset(queryParam);
       const page = await findItem(queryParam, role_code);
      return {
        status: true,
        data: roleList,
        page: page,
        message: "Thêm quyền hạn Role thành công",
      };
    } else {
      return {
        status: false,
        message: "Thêm quyền hạn Role thất bại",
      };
    }
  } else if (check_name !== null) {
    return {
      status: false,
      message: "Mã quyền hạn Role đã tồn tại trên hệ thống",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const checkRoleID = async (role_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const role = await Role.findOne({
        where: {
          role_id,
        },
      });
      return role;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const checkRoleHasUser = async (role_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const user = await User.findOne({
        where: {
          role_id,
        },
      });
      return user;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const deleteRole = async (role_id) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const role = await Role.destroy(
        {
          where: {
            role_id: Number(role_id),
          },
        },
        { transaction: t }
      );
      return role;
    });
    return result;
  } catch (error) {
    return false;
  }
};

const adminDeleteRoleService = async (role_id, queryParam) => {
  const check_role_id = await checkRoleID(role_id);
  if (check_role_id) {
    const checkList = await Promise.all([
      Promise.resolve(checkRoleHasUser(role_id)),
    ]);
    console.log("checkList", checkList);
    if (checkList[0] === null) {
      const delete_result = await deleteRole(role_id);
      if (delete_result) {
        const roleList = await getAllOfset(queryParam);
        return {
          status: true,
          data: roleList,
          page: null,
          message: "Xóa quyền hạn Role thành công",
        };
      } else {
        return {
          status: false,
          message: "Xóa quyền hạn Role thất bại",
        };
      }
    } else if (checkList[0] !== null) {
      return {
        status: false,
        message: "Đang có User nắm quyền hạn này. Không thể xóa",
      };
    } else {
      return {
        status: false,
        message: "Lỗi hệ thống, vui lòng thử lại sau.",
      };
    }
  } else if (check_role_id === null) {
    return {
      status: false,
      message: "Quyền hạn Role không tồn tại trên hệ thống.",
    };
  } else {
    return {
      status: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau.",
    };
  }
};

const updateRole = async (role_id, role_code, role_name) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const role = await Role.update(
        {
          role_code: String(role_code).trim(),
          role_name: String(role_name).trim(),
        },
        {
          where: {
            [Op.and]: [{ role_id }],
          },
        },
        { transaction: t }
      );
      return role;
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const adminUpdateRoleService = async (role_id, role_code, role_name, queryParam) => {
  const check_role_id = await checkRoleID(role_id);
  if (check_role_id) {
    const check_name = await checkRole_code(role_code, "UPDATE", role_id);
    if (check_name === null) {
      const update_result = await updateRole(role_id, role_code, role_name);
      if (update_result) {
        const roleList = await getAllOfset(queryParam);
        const page = await findItem(queryParam, role_code);
        return {
          status: true,
          data: roleList,
          page: page,
          message: "Cập nhật thông tin quyền hạn Role thành công",
        };
      } else {
        return {
          status: false,
          message: "Cập nhật thông tin quyền hạn Role thất bại",
        };
      }
    } else if (check_name !== null) {
      return {
        status: false,
        message: "Tên quyền hạn Role đã tồn tại trên hệ thống.",
      };
    } else {
      return {
        status: false,
        message: "Lỗi hệ thống, vui lòng thử lại sau.",
      };
    }
  } else if (check_role_id === null) {
    return {
      status: false,
      message: "Quyền hạn Role không tồn tại trên hệ thống.",
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
      const list = await Role.findAll({
        order: [[sort, type]],
        offset: Number(offset),
        limit: Number(limit),
        where: {
          [Op.or]: [
            {
              role_id: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              role_code: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              role_name: {
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
      const list = await Role.findAll({
        order: [[sort, type]],
        where: {
          [Op.or]: [
            {
              role_id: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              role_code: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              role_name: {
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
        String(item.role_code).trim().toLocaleLowerCase() ===
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
  adminGetAllRoleService,
  adminAddRoleService,
  adminDeleteRoleService,
  adminUpdateRoleService,
  adminOffsetService,
};
