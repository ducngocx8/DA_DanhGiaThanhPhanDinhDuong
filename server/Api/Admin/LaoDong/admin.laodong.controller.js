const {
  adminGetAllLaoDongService,
  adminAddLaoDongService,
  adminDeleteLaoDongService,
  adminUpdateLaoDongService,
  adminOffsetService,
} = require("./admin.laodong.service");

const adminGetAllLaoDong = async (req, res) => {
  const result = await adminGetAllLaoDongService();
  res.status(200).send(result);
};

const adminAddLaoDong = async (req, res) => {
  let { TenLaoDong } = req.body;
  TenLaoDong = String(TenLaoDong).trim();
  const queryParam = req.query;
  const result = await adminAddLaoDongService(TenLaoDong, queryParam);
  res.status(201).send(result);
};

const adminDeleteLaoDong = async (req, res) => {
  const id_laodong = req.params.id;
  const queryParam = req.query;
  const result = await adminDeleteLaoDongService(id_laodong, queryParam);
  res.status(201).send(result);
};

const adminUpdateLaoDong = async (req, res) => {
  const id_laodong = req.params.id;
  let { TenLaoDong } = req.body;
  TenLaoDong = String(TenLaoDong).trim();
  const queryParam = req.query;
  const result = await adminUpdateLaoDongService(
    id_laodong,
    TenLaoDong,
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
  adminGetAllLaoDong,
  adminDeleteLaoDong,
  adminAddLaoDong,
  adminUpdateLaoDong,
  adminOffset,
};
