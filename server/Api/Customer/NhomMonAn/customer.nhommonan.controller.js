const {
  customerGetAllNhomMonAnService,
  customerGetAllMonAnThuocNhomMonAnService,
} = require("./customer.nhommonan.service");

const customerGetAllNhomMonAn = async (req, res) => {
  const result = await customerGetAllNhomMonAnService();
  res.status(200).send(result);
};

const customerGetAllMonAnThuocNhomMonAn = async (req, res) => {
  const id_nhommonan = req.params.id;
  const result = await customerGetAllMonAnThuocNhomMonAnService(id_nhommonan);
  res.status(200).send(result);
};

module.exports = {
  customerGetAllNhomMonAn,
  customerGetAllMonAnThuocNhomMonAn,
};
