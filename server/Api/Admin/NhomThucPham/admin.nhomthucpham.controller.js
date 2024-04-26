const {
  adminGetAllNhomThucPhamService,
  adminAddNhomThucPhamService,
  adminDeleteNhomThucPhamService,
  adminUpdateNhomThucPhamService,
  adminUpdateImageService,
  adminOffsetService,
} = require("./admin.nhomthucpham.service");

const adminGetAllNhomThucPham = async (req, res) => {
  const result = await adminGetAllNhomThucPhamService();
  res.status(200).send(result);
};

const adminAddNhomThucPham = async (req, res) => {
  let { ten_nhom, image_url } = req.body;
  ten_nhom = String(ten_nhom).trim();
  const queryParam = req.query;
  const result = await adminAddNhomThucPhamService(
    ten_nhom,
    image_url,
    queryParam
  );
  res.status(201).send(result);
};

const adminDeleteNhomThucPham = async (req, res) => {
  const id_NhomThucPham = req.params.id;
  const queryParam = req.query;
  const result = await adminDeleteNhomThucPhamService(
    id_NhomThucPham,
    queryParam
  );
  res.status(201).send(result);
};

const adminUpdateNhomThucPham = async (req, res) => {
  const id_NhomThucPham = req.params.id;
  let { ten_nhom } = req.body;
  ten_nhom = String(ten_nhom).trim();
  const queryParam = req.query;
  const result = await adminUpdateNhomThucPhamService(
    id_NhomThucPham,
    ten_nhom,
    queryParam
  );
  res.status(201).send(result);
};

const adminUpdateImage = async (req, res) => {
  const id_NhomThucPham = req.params.id;
  let { image_url } = req.body;
  image_url = String(image_url).trim();
  const queryParam = req.query;
  const result = await adminUpdateImageService(
    id_NhomThucPham,
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
  adminGetAllNhomThucPham,
  adminDeleteNhomThucPham,
  adminAddNhomThucPham,
  adminUpdateNhomThucPham,
  adminUpdateImage,
  adminOffset,
};
