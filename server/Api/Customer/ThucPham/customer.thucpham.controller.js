const {
  customerGetAllThucPhamService,
  customerGetChiTietThucPhamService,
  customerSearchThucPhamService,
  customerSearchTop10ThucPhamService,
  customerGetThucPhamGiauDuongChatService,
  customerGetAllThucPhamByOffsetService,
  customerGetThucPhamGiauDuongChatOffsetService,
} = require("./customer.thucpham.service");

const customerGetAllThucPham = async (req, res) => {
  const result = await customerGetAllThucPhamService();
  res.status(200).send(result);
};

const customerSearchThucPham = async (req, res) => {
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
  const result = await customerSearchThucPhamService(queryParam);
  res.status(200).send(result);
};

const customerSearchTop10ThucPham = async (req, res) => {
  const queryParam = req.query;
  const result = await customerSearchTop10ThucPhamService(queryParam);
  res.status(200).send(result);
};

const customerGetThucPhamGiauDuongChat = async (req, res) => {
  const queryParam = req.query;
  const result = await customerGetThucPhamGiauDuongChatService(queryParam);
  res.status(200).send(result);
};

const customerGetChiTietThucPham = async (req, res) => {
  const id_thucpham = req.params.id;
  const result = await customerGetChiTietThucPhamService(id_thucpham);
  res.status(200).send(result);
};

const customerGetThucPhamGiauDuongChatOffset = async (req, res) => {
  const queryParam = req.query;
  const result = await customerGetThucPhamGiauDuongChatOffsetService(
    queryParam
  );
  res.status(200).send(result);
};


const customerGetAllThucPhamByOffset = async (req, res) => {
  const queryParam = req.query;
  const result = await customerGetAllThucPhamByOffsetService(queryParam);
  res.status(200).send(result);
};

module.exports = {
  customerGetAllThucPham,
  customerGetChiTietThucPham,
  customerSearchThucPham,
  customerSearchTop10ThucPham,
  customerGetThucPhamGiauDuongChat,
  customerGetAllThucPhamByOffset,
  customerGetThucPhamGiauDuongChatOffset,
};
