const {
  customerTraCuuTheoDoiTuongService,
} = require("./customer.nhucaudinhduong.service");

const customerTraCuuTheoDoiTuong = async (req, res) => {
  const queryParam = req.query;
  const result = await customerTraCuuTheoDoiTuongService(queryParam);
  res.status(200).send(result);
};

module.exports = {
  customerTraCuuTheoDoiTuong,
};
