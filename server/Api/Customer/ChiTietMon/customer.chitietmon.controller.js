const {
  customerAddChiTietMonService,
  customerDeleteChiTietMonService,
  customerUpdateChiTietMonService,
  customerGetChiTietMonByIDMonService,
} = require("./customer.chitietmon.service");

const customerGetChiTietMonByIDMon = async (req, res) => {
  const id_monan = req.params.id;
  const { userLogin } = req;
  const user_id = userLogin.user_id;
  const result = await customerGetChiTietMonByIDMonService(user_id, id_monan);
  res.status(200).send(result);
};

const customerAddChiTietMon = async (req, res) => {
  const chiTietMonBody = req.body;
  const { userLogin } = req;
  const user_id = userLogin.user_id;
  const result = await customerAddChiTietMonService(user_id, chiTietMonBody);
  res.status(201).send(result);
};

const customerDeleteChiTietMon = async (req, res) => {
  const id_chitietmon = req.params.id;
  const { userLogin } = req;
  const user_id = userLogin.user_id;
  const result = await customerDeleteChiTietMonService(user_id, id_chitietmon);
  res.status(201).send(result);
};

const customerUpdateChiTietMon = async (req, res) => {
  const { userLogin } = req;
  const user_id = userLogin.user_id;
  const id_chitietmon = req.params.id;
  const chiTietMonBody = req.body;
  const result = await customerUpdateChiTietMonService(
    user_id,
    id_chitietmon,
    chiTietMonBody
  );
  res.status(201).send(result);
};

module.exports = {
  customerDeleteChiTietMon,
  customerAddChiTietMon,
  customerUpdateChiTietMon,
  customerGetChiTietMonByIDMon,
};
