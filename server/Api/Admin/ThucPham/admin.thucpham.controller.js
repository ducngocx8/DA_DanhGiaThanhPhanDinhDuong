const {
  adminGetAllThucPhamService,
  adminAddThucPhamService,
  adminUpdateThucPhamService,
  adminUpdateImageService,
  adminGetByFilterThucPhamService,
  adminOffsetService,
} = require("./admin.thucpham.service");

const adminGetAllThucPham = async (req, res) => {
  const result = await adminGetAllThucPhamService();
  res.status(200).send(result);
};

const adminAddThucPham = async (req, res) => {
  const thucPhamBody = req.body;
  const queryParam = req.query;
  const result = await adminAddThucPhamService(thucPhamBody, queryParam);
  res.status(201).send(result);
};

const adminUpdateThucPham = async (req, res) => {
  const id_ThucPham = req.params.id;
  const thucPhamBody = req.body;
  const queryParam = req.query;
  const result = await adminUpdateThucPhamService(
    id_ThucPham,
    thucPhamBody,
    queryParam
  );
  res.status(201).send(result);
};

const adminUpdateImage = async (req, res) => {
  const id_ThucPham = req.params.id;
  let { image_url } = req.body;
  image_url = String(image_url).trim();
  const queryParam = req.query;
  const result = await adminUpdateImageService(
    id_ThucPham,
    image_url,
    queryParam
  );
  res.status(201).send(result);
};

const adminGetByFilterThucPham = async (req, res) => {
  let status = req.query.status;
  status = Number(status);
  const result = await adminGetByFilterThucPhamService(status);
  res.status(201).send(result);
};

const adminOffset = async (req, res) => {
  const queryParam = req.query;
  const result = await adminOffsetService(queryParam);
  res.status(200).send(result);
};

module.exports = {
  adminGetAllThucPham,
  adminAddThucPham,
  adminUpdateThucPham,
  adminUpdateImage,
  adminGetByFilterThucPham,
  adminOffset,
};
