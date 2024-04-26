const {
  adminGetAllMonAnService,
  adminAddMonAnService,
  adminDeleteMonAnService,
  adminUpdateMonAnService,
  adminGetMonAnByIDMonAnService,
  adminUpdateImageService,
  adminGetByFilterMonAnService,
  adminOffsetService,
} = require("./admin.monan.service");

const adminGetAllMonAn = async (req, res) => {
  const result = await adminGetAllMonAnService();
  res.status(200).send(result);
};

const adminGetMonAnByIDMonAn = async (req, res) => {
  const id_monan = req.params.id;
  const result = await adminGetMonAnByIDMonAnService(id_monan);
  res.status(200).send(result);
};

const adminAddMonAn = async (req, res) => {
  const monAnBody = req.body;
  const queryParam = req.query;
  const result = await adminAddMonAnService(monAnBody, queryParam);
  res.status(201).send(result);
};

const adminDeleteMonAn = async (req, res) => {
  const id_MonAn = req.params.id;
  const queryParam = req.query;
  const result = await adminDeleteMonAnService(id_MonAn, queryParam);
  res.status(201).send(result);
};

const adminUpdateMonAn = async (req, res) => {
  const id_MonAn = req.params.id;
  const monAnBody = req.body;
  const queryParam = req.query;
  const result = await adminUpdateMonAnService(id_MonAn, monAnBody, queryParam);
  res.status(201).send(result);
};

const adminUpdateImage = async (req, res) => {
  const id_MonAn = req.params.id;
  let { image_url } = req.body;
  image_url = String(image_url).trim();
  const queryParam = req.query;
  const result = await adminUpdateImageService(id_MonAn, image_url, queryParam);
  res.status(201).send(result);
};

const adminGetByFilterMonAn = async (req, res) => {
  let status = req.query.status;
  status = Number(status);
  const result = await adminGetByFilterMonAnService(status);
  res.status(201).send(result);
};

const adminOffset = async (req, res) => {
  const queryParam = req.query;
  const result = await adminOffsetService(queryParam);
  res.status(200).send(result);
};

module.exports = {
  adminGetAllMonAn,
  adminGetMonAnByIDMonAn,
  adminDeleteMonAn,
  adminAddMonAn,
  adminUpdateMonAn,
  adminUpdateImage,
  adminGetByFilterMonAn,
  adminOffset,
};
