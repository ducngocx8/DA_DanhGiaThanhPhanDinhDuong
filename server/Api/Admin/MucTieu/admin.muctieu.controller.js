const {
  adminGetAllMucTieuService,
  adminDeleteMucTieuService,
  adminOffsetService,
} = require("./admin.muctieu.service");

const adminGetAllMucTieu = async (req, res) => {
  const result = await adminGetAllMucTieuService();
  res.status(200).send(result);
};

const adminDeleteMucTieu = async (req, res) => {
  const id_muctieu = req.params.id;
  const queryParam = req.query;
  const result = await adminDeleteMucTieuService(id_muctieu, queryParam);
  res.status(201).send(result);
};

const adminOffset = async (req, res) => {
  const queryParam = req.query;
  const result = await adminOffsetService(queryParam);
  res.status(200).send(result);
};

module.exports = {
  adminGetAllMucTieu,
  adminDeleteMucTieu,
  adminOffset,
};
