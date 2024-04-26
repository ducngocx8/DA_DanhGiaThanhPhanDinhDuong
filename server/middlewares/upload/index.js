const multer = require("multer");
const storagePhotos = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    let filetype = "";
    if (file.mimetype === "image/gif") {
      filetype = "gif";
    } else if (file.mimetype === "image/png") {
      filetype = "png";
    } else if (file.mimetype === "image/jpeg") {
      filetype = "jpg";
    } else if (file.mimetype === "image/webp") {
      filetype = "webp";
    } else {
      cb(new Error("ERR"));
    }
    if (file.size > 1024 * 1024) {
      cb(new Error("ERR"));
    }
    const currentDay = Date.now() + "_";
    cb(null, currentDay + file.originalname.split(".")[0] + "." + filetype);
  },
});

const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

const fileFilter = (req, file, cb) => {
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// MAX 1MB (SIZE 1024 * 1024 => 1KB)
const uploadPhoto = multer({
  storage: storagePhotos,
  limits: { fileSize: 1024 * 1024 },
  fileFilter,
});

module.exports = {
  uploadPhoto,
};
