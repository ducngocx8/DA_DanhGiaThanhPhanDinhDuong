const {
  adminGetAllLichSuLogService,
  adminDeleteLichSuLogService,
  adminOffsetService,
} = require("./admin.lichsulog.service");

const adminGetAllLichSuLog = async (req, res) => {
  const result = await adminGetAllLichSuLogService();
  res.status(200).send(result);
};

const adminDeleteLichSuLog = async (req, res) => {
  const id_lichsu = req.params.id;
  const queryParam = req.query;
  const result = await adminDeleteLichSuLogService(id_lichsu, queryParam);
  res.status(201).send(result);
};

const adminOffset = async (req, res) => {
  const queryParam = req.query;
  const result = await adminOffsetService(queryParam);
  res.status(200).send(result);
};

module.exports = {
  adminGetAllLichSuLog,
  adminDeleteLichSuLog,
  adminOffset,
};
