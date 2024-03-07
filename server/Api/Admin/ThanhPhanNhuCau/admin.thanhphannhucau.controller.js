const {
  adminGetAllThanhPhanNhuCauService,
  adminAddThanhPhanNhuCauService,
  adminDeleteThanhPhanNhuCauService,
  adminUpdateThanhPhanNhuCauService,
  adminOffsetService,
} = require("./admin.thanhphannhucau.service");

const adminGetAllThanhPhanNhuCau = async (req, res) => {
  const result = await adminGetAllThanhPhanNhuCauService();
  res.status(200).send(result);
};

const adminAddThanhPhanNhuCau = async (req, res) => {
  const obThanhPhanNhuCau = req.body;
  const queryParam = req.query;
  const result = await adminAddThanhPhanNhuCauService(
    obThanhPhanNhuCau,
    queryParam
  );
  res.status(201).send(result);
};

const adminDeleteThanhPhanNhuCau = async (req, res) => {
  const id_ThanhPhanNhuCau = req.params.id;
  const queryParam = req.query;
  const result = await adminDeleteThanhPhanNhuCauService(
    id_ThanhPhanNhuCau,
    queryParam
  );
  res.status(201).send(result);
};

const adminUpdateThanhPhanNhuCau = async (req, res) => {
  const id_nhucau = req.params.id;
  const obThanhPhanNhuCau = req.body;
  const queryParam = req.query;
  const result = await adminUpdateThanhPhanNhuCauService(
    id_nhucau,
    obThanhPhanNhuCau,
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
  adminGetAllThanhPhanNhuCau,
  adminDeleteThanhPhanNhuCau,
  adminAddThanhPhanNhuCau,
  adminUpdateThanhPhanNhuCau,
  adminOffset,
};
