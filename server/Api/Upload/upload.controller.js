const { BACKEND_HOME } = require("../../Utils");
const uploadImageWebsite = async (req, res) => {
  console.log("file_upload", req.file);
  if (!req.file) {
    return res
      .status(400)
      .send({ message: "Định dạng file chưa được hỗ trợ hoặc file > 1MB." });
  }
  return res.status(201).send({
    status: true,
    uri: BACKEND_HOME + req.file.filename,
    detail: req.file,
    filename: req.file.filename,
  });
};

const uploadImageCkeditor = async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .send({ message: "Định dạng file chưa được hỗ trợ hoặc file > 1MB." });
  }
  return res.status(201).send({
    status: true,
    uri: BACKEND_HOME + req.file.filename,
    detail: req.file,
    filename: req.file.filename,
    uploaded: true,
    url: BACKEND_HOME + req.file.filename,
  });
};
module.exports = {
  uploadImageWebsite,
  uploadImageCkeditor,
};
