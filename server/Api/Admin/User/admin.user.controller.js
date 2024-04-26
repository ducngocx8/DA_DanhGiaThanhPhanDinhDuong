const {
  adminGetAllUserService,
  adminAddUserService,
  adminUpdateUserService,
  adminUpdateImageService,
  adminOffsetService,
} = require("./admin.user.service");

const adminGetAllUser = async (req, res) => {
  const user_id = req.params.id;
  const result = await adminGetAllUserService(user_id);
  res.status(200).send(result);
};

const adminAddUser = async (req, res) => {
  let userBody = req.body;
  const queryParam = req.query;
  const result = await adminAddUserService(userBody, queryParam);
  res.status(201).send(result);
};

const adminUpdateUser = async (req, res) => {
  const user_id = req.params.id;
  const userBody = req.body;
  const queryParam = req.query;
  const result = await adminUpdateUserService(user_id, userBody, queryParam);
  res.status(201).send(result);
};

const adminUpdateImage = async (req, res) => {
  const user_id = req.params.id;
  let { image_url } = req.body;
  image_url = String(image_url).trim();
  const queryParam = req.query;
  const result = await adminUpdateImageService(user_id, image_url, queryParam);
  res.status(201).send(result);
};

const adminOffset = async (req, res) => {
  const queryParam = req.query;
  const result = await adminOffsetService(queryParam);
  res.status(200).send(result);
};

module.exports = {
  adminGetAllUser,
  adminAddUser,
  adminUpdateUser,
  adminUpdateImage,
  adminOffset,
};
