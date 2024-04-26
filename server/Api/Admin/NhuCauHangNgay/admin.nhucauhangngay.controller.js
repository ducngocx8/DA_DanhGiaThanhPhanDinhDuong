const {
  adminGetAllNhuCauHangNgayService,
  adminAddNhuCauHangNgayService,
  adminDeleteNhuCauHangNgayService,
  adminUpdateNhuCauHangNgayService,
  adminOffsetService,
} = require("./admin.nhucauhangngay.service");

const adminGetAllNhuCauHangNgay = async (req, res) => {
  const result = await adminGetAllNhuCauHangNgayService();
  res.status(200).send(result);
};

const adminAddNhuCauHangNgay = async (req, res) => {
  let { id_nhomtuoi, id_laodong, id_doituong, id_nhucau } = req.body;
  const queryParam = req.query;
  const result = await adminAddNhuCauHangNgayService(
    id_nhomtuoi,
    id_laodong,
    id_doituong,
    id_nhucau,
    queryParam
  );
  res.status(201).send(result);
};

const adminDeleteNhuCauHangNgay = async (req, res) => {
  let { id_nhomtuoi, id_laodong, id_doituong, id_nhucau } = req.body;
  const queryParam = req.query;
  const result = await adminDeleteNhuCauHangNgayService(
    id_nhomtuoi,
    id_laodong,
    id_doituong,
    id_nhucau,
    queryParam
  );
  res.status(201).send(result);
};

const adminUpdateNhuCauHangNgay = async (req, res) => {
  const {
    id_nhomtuoi,
    id_laodong,
    id_doituong,
    id_nhucau,
    id_nhomtuoi_old,
    id_laodong_old,
    id_doituong_old,
    id_nhucau_old,
  } = req.body;
  const queryParam = req.query;
  const result = await adminUpdateNhuCauHangNgayService(
    id_nhomtuoi,
    id_laodong,
    id_doituong,
    id_nhucau,
    id_nhomtuoi_old,
    id_laodong_old,
    id_doituong_old,
    id_nhucau_old,
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
  adminGetAllNhuCauHangNgay,
  adminDeleteNhuCauHangNgay,
  adminAddNhuCauHangNgay,
  adminUpdateNhuCauHangNgay,
  adminOffset,
};
