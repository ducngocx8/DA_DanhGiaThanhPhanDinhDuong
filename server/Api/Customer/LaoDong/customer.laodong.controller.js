const {
  customerGetAllLaoDongService,
} = require("./customer.laodong.service");

const customerGetAllLaoDong = async (req, res) => {
  const result = await customerGetAllLaoDongService();
  res.status(200).send(result);
};

module.exports = {
  customerGetAllLaoDong,
};
