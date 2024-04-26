const {
  adminGetAllDonViService,
  adminAddDonViService,
  adminDeleteDonViService,
  adminUpdateDonViService,
  adminOffsetService,
} = require("./admin.donvi.service");

const adminGetAllDonVi = async (req, res) => {
  const result = await adminGetAllDonViService();
  res.status(200).send(result);
};

const adminAddDonVi = async (req, res) => {
  let { ten_donvi } = req.body;
  ten_donvi = String(ten_donvi).trim();
  const queryParam = req.query;
  const result = await adminAddDonViService(ten_donvi, queryParam);
  res.status(201).send(result);
};

const adminDeleteDonVi = async (req, res) => {
  const id_donvi = req.params.id;
   const queryParam = req.query;
  const result = await adminDeleteDonViService(
    id_donvi,
    queryParam
  );
  res.status(201).send(result);
};

const adminUpdateDonVi = async (req, res) => {
  const id_donvi = req.params.id;
  let { ten_donvi } = req.body;
  ten_donvi = String(ten_donvi).trim();
   const queryParam = req.query;
  const result = await adminUpdateDonViService(
    id_donvi,
    ten_donvi, queryParam
  );
  res.status(201).send(result);
};

const adminOffset = async (req, res) => {
  const queryParam = req.query;
  const result = await adminOffsetService(queryParam);
  res.status(200).send(result);
};

module.exports = {
  adminGetAllDonVi,
  adminDeleteDonVi,
  adminAddDonVi,
  adminUpdateDonVi,
  adminOffset,
};
