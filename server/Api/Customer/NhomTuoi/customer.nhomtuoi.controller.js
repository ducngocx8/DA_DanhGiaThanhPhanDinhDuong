const {
  customerGetAllNhomTuoiService,
} = require("./customer.nhomtuoi.service");

const customerGetAllNhomTuoi = async (req, res) => {
  const result = await customerGetAllNhomTuoiService();
  res.status(200).send(result);
};

module.exports = {
  customerGetAllNhomTuoi,
};
