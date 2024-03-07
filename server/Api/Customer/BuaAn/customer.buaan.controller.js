const { customerGetAllBuaAnService } = require("./customer.buaan.service");

const customerGetAllBuaAn = async (req, res) => {
  const result = await customerGetAllBuaAnService();
  res.status(200).send(result);
};

module.exports = {
  customerGetAllBuaAn,
};
