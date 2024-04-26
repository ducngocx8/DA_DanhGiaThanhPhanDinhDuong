const {
  adminGetAllChiSoUserService,
  adminDeleteChiSoUserService,
  adminOffsetService,
} = require("./admin.chisouser.service");


const adminGetAllChiSoUser = async (req, res) => {
  const result = await adminGetAllChiSoUserService();
  res.status(200).send(result);
};

const adminDeleteChiSoUser = async (req, res) => {
  const id_ChiSoUser = req.params.id;
  const queryParam = req.query;
  const result = await adminDeleteChiSoUserService(id_ChiSoUser, queryParam);
  res.status(201).send(result);
};

const adminOffset = async (req, res) => {
  const queryParam = req.query;
  const result = await adminOffsetService(queryParam);
  res.status(200).send(result);
};



module.exports = {
  adminGetAllChiSoUser,
  adminDeleteChiSoUser,
  adminOffset,
};
