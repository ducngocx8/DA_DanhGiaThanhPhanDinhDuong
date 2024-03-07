const {
  adminGetAllNhomMonAnService,
  adminAddNhomMonAnService,
  adminDeleteNhomMonAnService,
  adminUpdateNhomMonAnService,
  adminUpdateImageService,
  adminOffsetService,
} = require("./admin.nhommonan.service");

const adminGetAllNhomMonAn = async (req, res) => {
  const result = await adminGetAllNhomMonAnService();
  res.status(200).send(result);
};

const adminAddNhomMonAn = async (req, res) => {
  const queryParam = req.query;
  let { ten_nhom, image_url } = req.body;
  ten_nhom = String(ten_nhom).trim();
  const result = await adminAddNhomMonAnService(
    ten_nhom,
    image_url,
    queryParam
  );
  res.status(201).send(result);
};

const adminDeleteNhomMonAn = async (req, res) => {
  const queryParam = req.query;
  const id_NhomMonAn = req.params.id;
  const result = await adminDeleteNhomMonAnService(id_NhomMonAn, queryParam);
  res.status(201).send(result);
};

const adminUpdateNhomMonAn = async (req, res) => {
  const queryParam = req.query;
  const id_NhomMonAn = req.params.id;
  let { ten_nhom } = req.body;
  ten_nhom = String(ten_nhom).trim();
  const result = await adminUpdateNhomMonAnService(
    id_NhomMonAn,
    ten_nhom,
    queryParam
  );
  res.status(201).send(result);
};

const adminUpdateImage = async (req, res) => {
  const queryParam = req.query;
  const id_NhomMonAn = req.params.id;
  let { image_url } = req.body;
  image_url = String(image_url).trim();
  const result = await adminUpdateImageService(
    id_NhomMonAn,
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
  adminGetAllNhomMonAn,
  adminDeleteNhomMonAn,
  adminAddNhomMonAn,
  adminUpdateNhomMonAn,
  adminUpdateImage,
  adminOffset,
};
