const {
  customerGetAllChiSoDuongHuyetService,
  customerGetAllChiSoDuongHuyetOffsetService,
} = require("./customer.chisoduonghuyet.service");

const customerGetAllChiSoDuongHuyet = async (req, res) => {
  const queryParam = req.query;
  const result = await customerGetAllChiSoDuongHuyetService(queryParam);
  res.status(200).send(result);
};

const customerGetAllChiSoDuongHuyetOffset = async (req, res) => {
  const queryParam = req.query;
  const result = await customerGetAllChiSoDuongHuyetOffsetService(queryParam);
  res.status(200).send(result);
};

module.exports = {
  customerGetAllChiSoDuongHuyet,
  customerGetAllChiSoDuongHuyetOffset,
};
