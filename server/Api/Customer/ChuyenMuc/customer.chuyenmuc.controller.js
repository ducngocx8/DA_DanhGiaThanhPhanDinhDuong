const {
  customerGetAllChuyenMucService,
} = require("./customer.chuyenmuc.service");

const customerGetAllChuyenMuc = async (req, res) => {
  const result = await customerGetAllChuyenMucService();
  res.status(200).send(result);
};

module.exports = {
  customerGetAllChuyenMuc,
};
