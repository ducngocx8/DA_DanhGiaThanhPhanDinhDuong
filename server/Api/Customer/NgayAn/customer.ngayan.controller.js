const {
  customerGetAllNgayAnService,
  customerAddNgayAnService,
  customerDeleteNgayAnService,
  customerUpdateNgayAnService,
  customerCopyNgayAnService,
  customerGoiYMonAnService,
} = require("./customer.ngayan.service");

const customerGetAllNgayAn = async (req, res) => {
  const { userLogin } = req;
  const user_id = userLogin.user_id;
  const date_selected = req.query.date;
  const result = await customerGetAllNgayAnService(user_id, date_selected);
  res.status(200).send(result);
};

const customerAddNgayAn = async (req, res) => {
  const { userLogin } = req;
  const user_id = userLogin.user_id;
  const ngayAnBody = req.body;
  const result = await customerAddNgayAnService(user_id, ngayAnBody);
  res.status(201).send(result);
};

const customerUpdateNgayAn = async (req, res) => {
  const { userLogin } = req;
  const user_id = userLogin.user_id;
  const ngayAnBody = req.body;
  const ngayan_id = req.params.id;
  const result = await customerUpdateNgayAnService(
    user_id,
    ngayan_id,
    ngayAnBody
  );
  res.status(201).send(result);
};

const customerDeleteNgayAn = async (req, res) => {
  const { userLogin } = req;
  const user_id = userLogin.user_id;
  const ngayan_id = req.params.id;
  const result = await customerDeleteNgayAnService(user_id, ngayan_id);
  res.status(201).send(result);
};

const customerCopyNgayAn = async (req, res) => {
  // body: {timeCopy}
  const { userLogin } = req;
  const user_id = userLogin.user_id;
  const { timeCopy } = req.body;
  const result = await customerCopyNgayAnService(user_id, timeCopy);
  res.status(201).send(result);
};

const customerGoiYMonAn = async (req, res) => {
  const { userLogin } = req;
  const user_id = userLogin.user_id;
  const result = await customerGoiYMonAnService(user_id);
  res.status(201).send(result);
};

module.exports = {
  customerGetAllNgayAn,
  customerAddNgayAn,
  customerDeleteNgayAn,
  customerUpdateNgayAn,
  customerCopyNgayAn,
  customerGoiYMonAn,
};
