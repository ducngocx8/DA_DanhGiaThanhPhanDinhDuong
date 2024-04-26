const {
  customerGetAllMucTieuService,
  customerAddMucTieuService,
  customerDeleteMucTieuService,
  customerGetMucTieuHomNayService,
  customerGetMucTieuTheoNgayService,
  // customerUpdateMucTieuService,
} = require("./customer.muctieu.service");

const customerGetAllMucTieu = async (req, res) => {
  const { userLogin } = req;
  const user_id = userLogin.user_id;
  const result = await customerGetAllMucTieuService(user_id);
  res.status(200).send(result);
};

const customerGetMucTieuHomNay = async (req, res) => {
  const { userLogin } = req;
  const user_id = userLogin.user_id;
  const result = await customerGetMucTieuHomNayService(user_id);
  res.status(200).send(result);
};

const customerGetMucTieuTheoNgay = async (req, res) => {
  const { userLogin } = req;
  const date_selected = req.query.date; // CHƯA CHECK HỢP LỆ HAY KHÔNG (CÓ THỂ KO CẦN VÌ SAI => KO CÓ KQ)
  const user_id = userLogin.user_id;
  const result = await customerGetMucTieuTheoNgayService(
    user_id,
    date_selected
  );
  res.status(200).send(result);
};

const customerAddMucTieu = async (req, res) => {
  const { userLogin } = req;
  const user_id = userLogin.user_id;
  let MucTieuBody = req.body;
  const result = await customerAddMucTieuService(MucTieuBody, user_id);
  res.status(201).send(result);
};

const customerDeleteMucTieu = async (req, res) => {
  const { userLogin } = req;
  const user_id = userLogin.user_id;
  const id_MucTieu = req.params.id;
  const result = await customerDeleteMucTieuService(id_MucTieu, user_id);
  res.status(201).send(result);
};

// const customerUpdateMucTieu = async (req, res) => {
//    const { userLogin } = req;
//    const user_id = userLogin.user_id;
//    let MucTieuBody = req.body;
//   const result = await customerUpdateMucTieuService(MucTieuBody, user_id);
//   res.status(201).send(result);
// };

module.exports = {
  customerGetAllMucTieu,
  customerDeleteMucTieu,
  customerAddMucTieu,
  customerGetMucTieuHomNay,
  customerGetMucTieuTheoNgay,
  // customerUpdateMucTieu,
};
