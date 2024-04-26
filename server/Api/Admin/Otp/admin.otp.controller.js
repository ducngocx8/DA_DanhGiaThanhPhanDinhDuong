const {
  getAllOTPService,
  deleteAllOTPService,
  adminOffsetService,
} = require("./admin.otp.service");
const getAllOTP = async (req, res) => {
  const result = await getAllOTPService();
  res.status(200).send(result);
};

const deleteAllOTP = async (req, res) => {
  const queryParam = req.query;
  const result = await deleteAllOTPService(queryParam);
  res.status(201).send(result);
};

const adminOffset = async (req, res) => {
  const queryParam = req.query;
  const result = await adminOffsetService(queryParam);
  res.status(200).send(result);
};

module.exports = {
  getAllOTP,
  deleteAllOTP,
  adminOffset,
};
