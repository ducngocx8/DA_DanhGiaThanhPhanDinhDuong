const {
  adminGetAllThucPhamChonService,
  adminDeleteThucPhamChonService,
} = require("./admin.thucphamchon.service");

const adminGetAllThucPhamChon = async (req, res) => {
  const result = await adminGetAllThucPhamChonService();
  res.status(200).send(result);
};

const adminDeleteThucPhamChon = async (req, res) => {
  const id_thuc_pham_chon = req.params.id;
  const result = await adminDeleteThucPhamChonService(id_thuc_pham_chon);
  res.status(201).send(result);
};

module.exports = {
  adminGetAllThucPhamChon,
  adminDeleteThucPhamChon,
};
