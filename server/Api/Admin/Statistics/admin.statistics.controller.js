const {
  adminCountTopService,
  customerGetThongKeUserService,
  customerGetThongKeMonAnService,
  customerGetThongKeTruyCapService,
} = require("./admin.statistics.service");

const adminCountTop = async (req, res) => {
  const result = await adminCountTopService();
  res.status(200).send(result);
};

const customerGetThongKeUser = async (req, res) => {
  const filterParam = req.query;
  const result = await customerGetThongKeUserService(filterParam);
  res.status(200).send(result);
};

const customerGetThongKeMonAn = async (req, res) => {
  const filterParam = req.query;
  const result = await customerGetThongKeMonAnService(filterParam);
  res.status(200).send(result);
};

const customerGetThongKeTruyCap = async (req, res) => {
  const filterParam = req.query;
  const result = await customerGetThongKeTruyCapService(filterParam);
  res.status(200).send(result);
};

module.exports = {
  adminCountTop,
  customerGetThongKeUser,
  customerGetThongKeMonAn,
  customerGetThongKeTruyCap,
};
