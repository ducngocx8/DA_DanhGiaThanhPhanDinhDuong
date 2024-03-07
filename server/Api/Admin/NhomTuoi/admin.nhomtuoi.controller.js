const {
  adminGetAllNhomTuoiService,
  adminAddNhomTuoiService,
  adminDeleteNhomTuoiService,
  adminUpdateNhomTuoiService,
  adminOffsetService,
} = require("./admin.nhomtuoi.service");

const adminGetAllNhomTuoi = async (req, res) => {
  const result = await adminGetAllNhomTuoiService();
  res.status(200).send(result);
};

const adminAddNhomTuoi = async (req, res) => {
  let { TenNhomTuoi, strAge, endAge } = req.body;
  TenNhomTuoi = String(TenNhomTuoi).trim();
  strAge = Number(strAge);
  endAge = Number(endAge);
  TenNhomTuoi = String(TenNhomTuoi).trim();
  const queryParam = req.query;
  const result = await adminAddNhomTuoiService(
    TenNhomTuoi,
    strAge,
    endAge,
    queryParam
  );
  res.status(201).send(result);
};

const adminDeleteNhomTuoi = async (req, res) => {
  const id_nhomtuoi = req.params.id;
  const queryParam = req.query;
  const result = await adminDeleteNhomTuoiService(id_nhomtuoi, queryParam);
  res.status(201).send(result);
};

const adminUpdateNhomTuoi = async (req, res) => {
  const id_nhomtuoi = req.params.id;
  let { TenNhomTuoi, strAge, endAge } = req.body;
  TenNhomTuoi = String(TenNhomTuoi).trim();
  strAge = Number(strAge);
  endAge = Number(endAge);
  const queryParam = req.query;
  const result = await adminUpdateNhomTuoiService(
    id_nhomtuoi,
    TenNhomTuoi,
    strAge,
    endAge,
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
  adminGetAllNhomTuoi,
  adminDeleteNhomTuoi,
  adminAddNhomTuoi,
  adminUpdateNhomTuoi,
  adminOffset,
};
