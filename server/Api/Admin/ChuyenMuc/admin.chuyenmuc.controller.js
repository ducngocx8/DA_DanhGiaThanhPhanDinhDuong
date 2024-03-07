const {
  adminGetAllChuyenMucService,
  adminAddChuyenMucService,
  adminDeleteChuyenMucService,
  adminUpdateChuyenMucService,
  adminOffsetService,
} = require("./admin.chuyenmuc.service");

const adminGetAllChuyenMuc = async (req, res) => {
  const result = await adminGetAllChuyenMucService();
  res.status(200).send(result);
};

const adminAddChuyenMuc = async (req, res) => {
  let { ten_chuyenmuc } = req.body;
  ten_chuyenmuc = String(ten_chuyenmuc).trim();
  const queryParam = req.query;
  const result = await adminAddChuyenMucService(ten_chuyenmuc, queryParam);
  res.status(201).send(result);
};

const adminDeleteChuyenMuc = async (req, res) => {
  const id_chuyenmuc = req.params.id;
   const queryParam = req.query;
  const result = await adminDeleteChuyenMucService(
    id_chuyenmuc,
    queryParam
  );
  res.status(201).send(result);
};

const adminUpdateChuyenMuc = async (req, res) => {
  const id_chuyenmuc = req.params.id;
  let { ten_chuyenmuc } = req.body;
  ten_chuyenmuc = String(ten_chuyenmuc).trim();
   const queryParam = req.query;
  const result = await adminUpdateChuyenMucService(
    id_chuyenmuc,
    ten_chuyenmuc, queryParam
  );
  res.status(201).send(result);
};

const adminOffset = async (req, res) => {
  const queryParam = req.query;
  const result = await adminOffsetService(queryParam);
  res.status(200).send(result);
};

module.exports = {
  adminGetAllChuyenMuc,
  adminDeleteChuyenMuc,
  adminAddChuyenMuc,
  adminUpdateChuyenMuc,
  adminOffset,
};
