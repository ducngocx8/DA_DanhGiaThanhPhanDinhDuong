const {
  adminGetAllNgayAnService,
  adminDeleteNgayAnService,
  adminOffsetService,
} = require("./admin.ngayan.service");

const adminGetAllNgayAn = async (req, res) => {
  const result = await adminGetAllNgayAnService();
  res.status(200).send(result);
};

const adminDeleteNgayAn = async (req, res) => {
  const ngayan_id = req.params.id;
  const queryParam = req.query;
  const result = await adminDeleteNgayAnService(ngayan_id, queryParam);
  res.status(201).send(result);
};

const adminOffset = async (req, res) => {
  const queryParam = req.query;
  const result = await adminOffsetService(queryParam);
  res.status(200).send(result);
};

module.exports = {
  adminGetAllNgayAn,
  adminDeleteNgayAn,
  adminOffset,
};
