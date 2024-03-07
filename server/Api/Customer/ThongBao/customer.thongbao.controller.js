const {
  customerGetThongBaoService,
  customerAddThongBaoService,
  customerDeleteThongBaoService,
} = require("./customer.thongbao.service");

const customerGetThongBao = async (req, res) => {
  const { userLogin } = req;
  const user_id = userLogin.user_id;
  const result = await customerGetThongBaoService(user_id);
  res.status(200).send(result);
};

const customerAddThongBao = async (req, res) => {
  const { userLogin } = req;
  const user_id = userLogin.user_id;
  let ThongBaoBody = req.body;
  const result = await customerAddThongBaoService(ThongBaoBody, user_id);
  res.status(201).send(result);
};

const customerDeleteThongBao = async (req, res) => {
  const { userLogin } = req;
  const user_id = userLogin.user_id;
  const result = await customerDeleteThongBaoService(user_id);
  res.status(201).send(result);
};

module.exports = {
  customerGetThongBao,
  customerDeleteThongBao,
  customerAddThongBao,
};
