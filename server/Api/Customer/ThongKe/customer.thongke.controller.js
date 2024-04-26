const {
  customerGetThongKeUserService,
  customerGetThongKeDinhDuongService,
} = require("./customer.thongke.service");

const customerGetThongKeUser = async (req, res) => {
  const { userLogin } = req;
  const user_id = userLogin.user_id;
  const result = await customerGetThongKeUserService(user_id);
  res.status(200).send(result);
};

const customerGetThongKeDinhDuong = async (req, res) => {
  const { userLogin } = req;
  const user_id = userLogin.user_id;
  const filterParam = req.query;
  const result = await customerGetThongKeDinhDuongService(user_id, filterParam);
  res.status(200).send(result);
};

module.exports = {
  customerGetThongKeUser,
  customerGetThongKeDinhDuong,
};
