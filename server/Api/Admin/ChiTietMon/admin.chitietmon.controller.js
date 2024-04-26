const {
  adminGetAllChiTietMonService,
  adminAddChiTietMonService,
  adminDeleteChiTietMonService,
  adminUpdateChiTietMonService,
  adminGetChiTietMonByIDMonService,
} = require("./admin.chitietmon.service");

const adminGetAllChiTietMon = async (req, res) => {
  const result = await adminGetAllChiTietMonService();
  res.status(200).send(result);
};

const adminGetChiTietMonByIDMon = async (req, res) => {  
  const id_monan = req.params.id;
  const result = await adminGetChiTietMonByIDMonService(id_monan);
  res.status(200).send(result);
};

const adminAddChiTietMon = async (req, res) => {
  const chiTietMonBody = req.body;
  const result = await adminAddChiTietMonService(chiTietMonBody);
  res.status(201).send(result);
};

const adminDeleteChiTietMon = async (req, res) => {
  const id_chitietmon = req.params.id;
  const result = await adminDeleteChiTietMonService(id_chitietmon);
  res.status(201).send(result);
};

const adminUpdateChiTietMon = async (req, res) => {
  const id_chitietmon = req.params.id;
  const chiTietMonBody = req.body;
  const result = await adminUpdateChiTietMonService(id_chitietmon, chiTietMonBody);
  res.status(201).send(result);
};

module.exports = {
  adminGetAllChiTietMon,
  adminDeleteChiTietMon,
  adminAddChiTietMon,
  adminUpdateChiTietMon,
  adminGetChiTietMonByIDMon,
};
