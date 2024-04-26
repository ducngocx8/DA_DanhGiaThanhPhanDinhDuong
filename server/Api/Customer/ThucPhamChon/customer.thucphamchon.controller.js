const {
  customerGetAllThucPhamChonService,
  customerAddThucPhamChonService,
  customerDeleteThucPhamChonService,
  customerUpdateThucPhamChonService,
} = require("./customer.thucphamchon.service");

const customerGetAllThucPhamChon = async (req, res) => {
  const { userLogin } = req;
  const user_id = userLogin.user_id;
  const result = await customerGetAllThucPhamChonService(user_id);
  res.status(200).send(result);
};

const customerAddThucPhamChon = async (req, res) => {
  const { userLogin } = req;
  const user_id = userLogin.user_id;
  const thucPhamChonBody = req.body;
  const result = await customerAddThucPhamChonService(
    user_id,
    thucPhamChonBody
  );
  res.status(201).send(result);
};

const customerUpdateThucPhamChon = async (req, res) => {
  const { userLogin } = req;
  const user_id = userLogin.user_id;
  const thucPhamChonBody = req.body;
  const id = req.params.id;
  const result = await customerUpdateThucPhamChonService(
    user_id,
    id,
    thucPhamChonBody
  );
  res.status(201).send(result);
};

const customerDeleteThucPhamChon = async (req, res) => {
  const { userLogin } = req;
  const user_id = userLogin.user_id;
  const id = req.params.id;
  const result = await customerDeleteThucPhamChonService(user_id, id);
  res.status(201).send(result);
};

module.exports = {
  customerGetAllThucPhamChon,
  customerAddThucPhamChon,
  customerDeleteThucPhamChon,
  customerUpdateThucPhamChon,
};
