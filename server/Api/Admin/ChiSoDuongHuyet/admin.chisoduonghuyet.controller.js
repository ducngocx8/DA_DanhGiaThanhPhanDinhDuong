const {
  adminGetAllChiSoDuongHuyetService,
  adminAddChiSoDuongHuyetService,
  adminDeleteChiSoDuongHuyetService,
  adminUpdateChiSoDuongHuyetService,
  adminOffsetService,
} = require("./admin.chisoduonghuyet.service");

const adminGetAllChiSoDuongHuyet = async (req, res) => {
  const result = await adminGetAllChiSoDuongHuyetService();
  res.status(200).send(result);
};

const adminAddChiSoDuongHuyet = async (req, res) => {
  const GIBody = req.body;
  const queryParam = req.query;
  const result = await adminAddChiSoDuongHuyetService(GIBody, queryParam);
  res.status(201).send(result);
};

const adminDeleteChiSoDuongHuyet = async (req, res) => {
  const id_thucpham = req.params.id;
  const queryParam = req.query;
  const result = await adminDeleteChiSoDuongHuyetService(
    id_thucpham,
    queryParam
  );
  res.status(201).send(result);
};

const adminUpdateChiSoDuongHuyet = async (req, res) => {
  const id_thucpham = req.params.id;
  const GIBody = req.body;
  const queryParam = req.query;
  const result = await adminUpdateChiSoDuongHuyetService(
    id_thucpham,
    GIBody,
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
  adminGetAllChiSoDuongHuyet,
  adminDeleteChiSoDuongHuyet,
  adminAddChiSoDuongHuyet,
  adminUpdateChiSoDuongHuyet,
  adminOffset,
};
