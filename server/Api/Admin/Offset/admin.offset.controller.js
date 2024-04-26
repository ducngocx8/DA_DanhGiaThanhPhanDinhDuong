const { adminOffsetNhomThucPhamService } = require("./admin.offset.service");

const adminOffsetNhomThucPham = async (req, res) => {
   const queryParam = req.query;
  const result = await adminOffsetNhomThucPhamService(queryParam);
  res.status(200).send(result);
};

module.exports = {
  adminOffsetNhomThucPham,
};
