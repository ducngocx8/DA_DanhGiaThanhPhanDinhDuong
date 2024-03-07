const {
  customerGetAllBaiVietService,
  customerOffsetService,
  customerCountService,
  customerGetChiTietService,
  customerGetCungChuyenMucService,
  customerGetBaiVietChuyenMucService,
  customerGetBaiVietTacGiaService,
} = require("./customer.baiviet.service");

const customerGetAllBaiViet = async (req, res) => {
  const result = await customerGetAllBaiVietService();
  res.status(200).send(result);
};

const customerOffset = async (req, res) => {
  const queryParam = req.query;
  const result = await customerOffsetService(queryParam);
  res.status(200).send(result);
};

const customerCount = async (req, res) => {
  const queryParam = req.query;
  const result = await customerCountService(queryParam);
  res.status(200).send(result);
};

const customerGetChiTiet = async (req, res) => {
  const slug = req.params.id;
  const result = await customerGetChiTietService(slug);
  res.status(200).send(result);
};

const customerGetCungChuyenMuc = async (req, res) => {
  const queryParam = req.query;
  let { id_chuyenmuc, id_baiviet } = queryParam;
  const result = await customerGetCungChuyenMucService(
    id_chuyenmuc,
    id_baiviet
  );
  res.status(200).send(result);
};

const customerGetBaiVietChuyenMuc = async (req, res) => {
  const id_chuyenmuc = req.params.id;
  const result = await customerGetBaiVietChuyenMucService(id_chuyenmuc);
  res.status(200).send(result);
};

const customerGetBaiVietTacGia = async (req, res) => {
  const user_id = req.params.id;
  const result = await customerGetBaiVietTacGiaService(user_id);
  res.status(200).send(result);
};

module.exports = {
  customerGetAllBaiViet,
  customerOffset,
  customerCount,
  customerGetChiTiet,
  customerGetCungChuyenMuc,
  customerGetBaiVietChuyenMuc,
  customerGetBaiVietTacGia,
};
