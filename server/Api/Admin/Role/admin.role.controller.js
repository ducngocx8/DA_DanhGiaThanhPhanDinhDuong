const {
  adminGetAllRoleService,
  adminAddRoleService,
  adminDeleteRoleService,
  adminUpdateRoleService,
  adminOffsetService,
} = require("./admin.role.service");

const adminGetAllRole = async (req, res) => {
  const result = await adminGetAllRoleService();
  res.status(200).send(result);
};

const adminAddRole = async (req, res) => {
  let { role_code, role_name } = req.body;
  role_name = String(role_name).trim();
  role_code = String(role_code).trim();
  const queryParam = req.query;
  const result = await adminAddRoleService(role_code, role_name, queryParam);
  res.status(201).send(result);
};

const adminDeleteRole = async (req, res) => {
  const role_id = req.params.id;
  const queryParam = req.query;
  const result = await adminDeleteRoleService(role_id, queryParam);
  res.status(201).send(result);
};

const adminUpdateRole = async (req, res) => {
  const role_id = req.params.id;
  let { role_code, role_name } = req.body;
  role_name = String(role_name).trim();
  role_code = String(role_code).trim();
  const queryParam = req.query;
  const result = await adminUpdateRoleService(
    role_id,
    role_code,
    role_name,
    queryParam
  );
  res.status(201).send(result);
};

const adminOffset = async (req, res) => {
  const queryParam = req.query;
  const result = await adminOffsetService(queryParam);
  res.status(200).send(result);
};

module.exports = {
  adminGetAllRole,
  adminDeleteRole,
  adminAddRole,
  adminUpdateRole,
  adminOffset,
};
