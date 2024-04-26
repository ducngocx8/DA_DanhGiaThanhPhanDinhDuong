const {
  adminGetAllBaiVietService,
  adminAddBaiVietService,
  adminDeleteBaiVietService,
  adminUpdateBaiVietService,
  adminUpdateImageService,
  adminOffsetService,
} = require("./admin.baiviet.service");

const adminGetAllBaiViet = async (req, res) => {
  const result = await adminGetAllBaiVietService();
  res.status(200).send(result);
};

const adminAddBaiViet = async (req, res) => {
  const { userLogin } = req;
  const user_id = userLogin.user_id;
  const baiVietBody = req.body;
  const queryParam = req.query;
  const result = await adminAddBaiVietService(baiVietBody, queryParam, user_id);
  res.status(201).send(result);
};

const adminDeleteBaiViet = async (req, res) => {
  const id_baiviet = req.params.id;
  const queryParam = req.query;
  const result = await adminDeleteBaiVietService(id_baiviet, queryParam);
  res.status(201).send(result);
};

const adminUpdateBaiViet = async (req, res) => {
  const id_baiviet = req.params.id;
  const baiVietBody = req.body;
  const queryParam = req.query;
  const result = await adminUpdateBaiVietService(
    id_baiviet,
    baiVietBody,
    queryParam
  );
  res.status(201).send(result);
};

const adminUpdateImage = async (req, res) => {
  const id_baiviet = req.params.id;
  let { image_url } = req.body;
  const queryParam = req.query;
  image_url = String(image_url).trim();
  const result = await adminUpdateImageService(
    id_baiviet,
    image_url,
    queryParam
  );
  res.status(201).send(result);
};

const adminOffset = async (req, res) => {
  const queryParam = req.query;
  const result = await adminOffsetService(queryParam);
  res.status(200).send(result);
};

module.exports = {
  adminGetAllBaiViet,
  adminDeleteBaiViet,
  adminAddBaiViet,
  adminUpdateBaiViet,
  adminUpdateImage,
  adminOffset,
};
