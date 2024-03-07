const {
  customerGetAllDoiTuongService,
} = require("./customer.doituong.service");

const customerGetAllDoiTuong = async (req, res) => {
  const result = await customerGetAllDoiTuongService();
  res.status(200).send(result);
};

module.exports = {
  customerGetAllDoiTuong,
};
