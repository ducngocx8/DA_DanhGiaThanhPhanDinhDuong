const {
  adminGetAllThongBaoService,
  adminDeleteThongBaoService,
  adminOffsetService,
  adminCreateThongBaoService,
} = require("./admin.thongbao.service");

const adminGetAllThongBao = async (req, res) => {
  const result = await adminGetAllThongBaoService();
  res.status(200).send(result);
};

const adminDeleteThongBao = async (req, res) => {
  const user_id = req.params.id;
  const queryParam = req.query;
  const result = await adminDeleteThongBaoService(user_id, queryParam);
  res.status(201).send(result);
};

const adminCreateThongBao = async (req, res) => {
  const thongBaoBody = req.body;
  const result = await adminCreateThongBaoService(thongBaoBody);
  res.status(201).send(result);
};

const adminOffset = async (req, res) => {
  const queryParam = req.query;
  const result = await adminOffsetService(queryParam);
  res.status(200).send(result);
};

module.exports = {
  adminGetAllThongBao,
  adminDeleteThongBao,
  adminOffset,
  adminCreateThongBao,
};
