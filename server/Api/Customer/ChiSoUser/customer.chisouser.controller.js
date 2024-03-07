const {
  customerGetAllChiSoUserService,
  customerAddChiSoUserService,
  customerDeleteChiSoUserService,
  customerGetLastUpdateChiSoUserService,
} = require("./customer.chisouser.service");

const customerGetAllChiSoUser = async (req, res) => {
  const { userLogin } = req;
  const user_id = userLogin.user_id;
  const result = await customerGetAllChiSoUserService(user_id);
  res.status(200).send(result);
};

const customerGetLastUpdateChiSoUser = async (req, res) => {
  const { userLogin } = req;
  const user_id = userLogin.user_id;
  const result = await customerGetLastUpdateChiSoUserService(user_id);
  res.status(200).send(result);
};

const customerAddChiSoUser = async (req, res) => {
  const { userLogin } = req;
  const user_id = userLogin.user_id;
  let chiSoUserBody = req.body;
  const result = await customerAddChiSoUserService(chiSoUserBody, user_id);
  res.status(201).send(result);
};

const customerDeleteChiSoUser = async (req, res) => {
  const { userLogin } = req;
  const user_id = userLogin.user_id;
  const id_ChiSoUser = req.params.id;
  const result = await customerDeleteChiSoUserService(id_ChiSoUser, user_id);
  res.status(201).send(result);
};

module.exports = {
  customerGetAllChiSoUser,
  customerDeleteChiSoUser,
  customerAddChiSoUser,
  customerGetLastUpdateChiSoUser,
};
