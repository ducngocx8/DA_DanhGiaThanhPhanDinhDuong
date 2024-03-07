const {
  adminGetAllDoiTuongService,
  adminAddDoiTuongService,
  adminDeleteDoiTuongService,
  adminUpdateDoiTuongService,
  adminOffsetService,
} = require("./admin.doituong.service");

const adminGetAllDoiTuong = async (req, res) => {
  const result = await adminGetAllDoiTuongService();
  res.status(200).send(result);
};

const adminAddDoiTuong = async (req, res) => {
  let { TenDoiTuong } = req.body;
  TenDoiTuong = String(TenDoiTuong).trim();
  const queryParam = req.query;
  const result = await adminAddDoiTuongService(TenDoiTuong, queryParam);
  res.status(201).send(result);
};

const adminDeleteDoiTuong = async (req, res) => {
  const id_doituong = req.params.id;
  const queryParam = req.query;
  const result = await adminDeleteDoiTuongService(id_doituong, queryParam);
  res.status(201).send(result);
};

const adminUpdateDoiTuong = async (req, res) => {
  const id_doituong = req.params.id;
  let { TenDoiTuong } = req.body;
  TenDoiTuong = String(TenDoiTuong).trim();
  const queryParam = req.query;
  const result = await adminUpdateDoiTuongService(
    id_doituong,
    TenDoiTuong,
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
  adminGetAllDoiTuong,
  adminDeleteDoiTuong,
  adminAddDoiTuong,
  adminUpdateDoiTuong,
  adminOffset,
};
