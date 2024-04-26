const express = require("express");
const { uploadPhoto } = require("../../middlewares/upload");
const { uploadImageWebsite, uploadImageCkeditor } = require("./upload.controller");
const uploadRoute = express.Router();

uploadRoute.post("/image/web", uploadPhoto.single("photo"), uploadImageWebsite);
uploadRoute.post(
  "/image/ckeditor",
  uploadPhoto.single("upload"),
  uploadImageCkeditor
);

module.exports = uploadRoute;
