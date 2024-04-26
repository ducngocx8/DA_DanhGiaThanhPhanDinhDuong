const {
  adminGetAllBuaAnService,
  adminAddBuaAnService,
  adminDeleteBuaAnService,
  adminUpdateBuaAnService,
  adminUpdateImageService,
  adminOffsetService,
} = require("./admin.buaan.service");

const adminGetAllBuaAn = async (req, res) => {
  const result = await adminGetAllBuaAnService();
  res.status(200).send(result);
};

const adminAddBuaAn = async (req, res) => {
  let { ten_bua_an, image_url } = req.body;
  ten_bua_an = String(ten_bua_an).trim();
  const queryParam = req.query;
  const result = await adminAddBuaAnService(ten_bua_an, image_url, queryParam);
  res.status(201).send(result);
};

const adminDeleteBuaAn = async (req, res) => {
  const bua_an_id = req.params.id;
  const queryParam = req.query;
  const result = await adminDeleteBuaAnService(bua_an_id, queryParam);
  res.status(201).send(result);
};

const adminUpdateBuaAn = async (req, res) => {
  const bua_an_id = req.params.id;
  let { ten_bua_an } = req.body;
  ten_bua_an = String(ten_bua_an).trim();
  const queryParam = req.query;
  const result = await adminUpdateBuaAnService(
    bua_an_id,
    ten_bua_an,
    queryParam
  );
  res.status(201).send(result);
};

const adminUpdateImage = async (req, res) => {
  const bua_an_id = req.params.id;
  let { image_url } = req.body;
  image_url = String(image_url).trim();
  const queryParam = req.query;
  const result = await adminUpdateImageService(
    bua_an_id,
    image_url,
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
  adminGetAllBuaAn,
  adminDeleteBuaAn,
  adminAddBuaAn,
  adminUpdateBuaAn,
  adminUpdateImage,
  adminOffset,
};
