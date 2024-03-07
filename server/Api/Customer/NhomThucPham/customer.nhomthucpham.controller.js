const {
  customerGetAllNhomThucPhamService,
  customerGetAllMonAnThuocNhomThucPhamService,
} = require("./customer.nhomthucpham.service");

const customerGetAllNhomThucPham = async (req, res) => {
  const result = await customerGetAllNhomThucPhamService();
  res.status(200).send(result);
};

const customerGetAllMonAnThuocNhomThucPham = async (req, res) => {
  const id_nhomthucpham = req.params.id;
  const result = await customerGetAllMonAnThuocNhomThucPhamService(id_nhomthucpham);
  res.status(200).send(result);
};

module.exports = {
  customerGetAllNhomThucPham,
  customerGetAllMonAnThuocNhomThucPham,
};
