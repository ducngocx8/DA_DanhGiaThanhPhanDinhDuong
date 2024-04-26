const { customerGetKhuyenNghiService } = require("./customer.khuyennghi.service");

const customerGetKhuyenNghi = async (req, res) => {
  const { userLogin } = req;
  const user_id = userLogin.user_id;
  const result = await customerGetKhuyenNghiService(user_id);
  res.status(200).send(result);
};

module.exports = {
  customerGetKhuyenNghi,
};
