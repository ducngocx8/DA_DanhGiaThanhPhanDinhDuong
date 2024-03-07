const {
  customerGetAllMonAnService,
  customerGetChiTietMonAnService,
  customerSearchMonAnService,
  customerGetMonAnOfUserService,
  customerAddMonAnService,
  customerDeleteMonAnService,
  customerUpdateMonAnService,
  customerUpdateImageService,
  customerGetMonAnGiauDuongChatService,
  customerGetAllMonAnByOffsetService,
  customerGetMonAnGiauDuongChatOffsetService,
  customerGetMonAnCungChuyenMucService,
  customerGetMonAnDungNhieuService,
  customerRandomMonAnService,
} = require("./customer.monan.service");

const customerGetAllMonAn = async (req, res) => {
  const { userLogin } = req;
  const user_id = userLogin?.user_id; // number or underfine
  const result = await customerGetAllMonAnService(user_id);
  res.status(200).send(result);
};

const customerGetChiTietMonAn = async (req, res) => {
  const id_monan = req.params.id;
  const { userLogin } = req;
  const user_id = userLogin?.user_id; // number or underfine
  const result = await customerGetChiTietMonAnService(id_monan, user_id);
  res.status(200).send(result);
};

const customerSearchMonAn = async (req, res) => {
  // const keyword = req.query.keyword;
  // const category_id = req.query.category_id;
  // const enery_from = req.query.enery_from;
  // const enery_to = req.query.enery_to;
  // const protein_from = req.query.protein_from;
  // const protein_to = req.query.protein_to;
  // const fat_to = req.query.fat_to;
  // const fat_from = req.query.fat_from;
  // const cabs_from = req.query.cabs_from;
  // const cabs_to = req.query.cabs_to;
  // const sort_type = req.query.sort_type;
  const queryParam = req.query;
  const { userLogin } = req;
  const user_id = userLogin?.user_id; // number or underfine
  const result = await customerSearchMonAnService(queryParam, user_id);
  res.status(200).send(result);
};

const customerGetMonAnOfUser = async (req, res) => {
  const { userLogin } = req;
  const user_id = userLogin.user_id;
  const result = await customerGetMonAnOfUserService(user_id);
  res.status(200).send(result);
};

const customerAddMonAn = async (req, res) => {
  const { userLogin } = req;
  const user_id = userLogin.user_id;
  const monAnBody = req.body;
  const result = await customerAddMonAnService(user_id, monAnBody);
  res.status(200).send(result);
};

const customerDeleteMonAn = async (req, res) => {
  const { userLogin } = req;
  const user_id = userLogin.user_id;
  const id_monan = req.params.id;
  const result = await customerDeleteMonAnService(user_id, id_monan);
  res.status(201).send(result);
};

const customerUpdateMonAn = async (req, res) => {
  const { userLogin } = req;
  const user_id = userLogin.user_id;
  const id_monan = req.params.id;
  const monAnBody = req.body;
  const result = await customerUpdateMonAnService(user_id, id_monan, monAnBody);
  res.status(201).send(result);
};

const customerUpdateImage = async (req, res) => {
  const { userLogin } = req;
  const user_id = userLogin.user_id;
  const id_monan = req.params.id;
  let { image_url } = req.body;
  image_url = String(image_url).trim();
  const result = await customerUpdateImageService(user_id, id_monan, image_url);
  res.status(201).send(result);
};

const customerGetMonAnGiauDuongChat = async (req, res) => {
  const queryParam = req.query;
  const { userLogin } = req;
  const user_id = userLogin?.user_id;
  const result = await customerGetMonAnGiauDuongChatService(
    queryParam,
    user_id
  );
  res.status(200).send(result);
};

const customerGetMonAnGiauDuongChatOffset = async (req, res) => {
  const queryParam = req.query;
  const { userLogin } = req;
  const user_id = userLogin?.user_id;
  const result = await customerGetMonAnGiauDuongChatOffsetService(
    queryParam,
    user_id
  );
  res.status(200).send(result);
};

const customerGetAllMonAnByOffset = async (req, res) => {
  const queryParam = req.query;
  const { userLogin } = req;
  const user_id = userLogin?.user_id;
  const result = await customerGetAllMonAnByOffsetService(queryParam, user_id);
  res.status(200).send(result);
};

const customerGetMonAnCungChuyenMuc = async (req, res) => {
  const queryParam = req.query;
  const { userLogin } = req;
  const user_id = userLogin?.user_id;
  const result = await customerGetMonAnCungChuyenMucService(
    queryParam,
    user_id
  );
  res.status(200).send(result);
};

const customerGetMonAnDungNhieu = async (req, res) => {
  const { userLogin } = req;
  const user_id = userLogin?.user_id;
  const result = await customerGetMonAnDungNhieuService(user_id);
  res.status(200).send(result);
};

const customerRandomMonAn = async (req, res) => {
  const queryParam = req.query;
  const { userLogin } = req;
  const user_id = userLogin?.user_id;
  const result = await customerRandomMonAnService(queryParam, user_id);
  res.status(200).send(result);
};

module.exports = {
  customerGetAllMonAn,
  customerGetChiTietMonAn,
  customerSearchMonAn,
  customerGetMonAnOfUser,
  customerAddMonAn,
  customerDeleteMonAn,
  customerUpdateMonAn,
  customerUpdateImage,
  customerGetMonAnGiauDuongChat,
  customerGetAllMonAnByOffset,
  customerGetMonAnGiauDuongChatOffset,
  customerGetMonAnCungChuyenMuc,
  customerGetMonAnDungNhieu,
  customerRandomMonAn,
};
