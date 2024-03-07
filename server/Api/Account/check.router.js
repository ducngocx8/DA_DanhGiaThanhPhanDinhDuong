const express = require("express");
const {
  verifyToken,
  checkUserToken,
} = require("../../middlewares/validations/account.validation");
const {
  adminPermission,
  customerPermission,
  allPermission,
} = require("../../middlewares/permission");
const checkRoute = express.Router();

checkRoute.get(
  "/admin",
  verifyToken,
  checkUserToken,
  adminPermission,
  (req, res) => {
    const { username, image_url } = req.userLogin;
    res.status(200).send({ status: true, username, image_url });
  }
);

checkRoute.get(
  "/customer",
  verifyToken,
  checkUserToken,
  customerPermission,
  (req, res) => {
    const { username, image_url } = req.userLogin;
    res.status(200).send({ status: true, username, image_url });
  }
);

checkRoute.get(
  "/all",
  verifyToken,
  checkUserToken,
  allPermission,
  (req, res) => {
    const { username, image_url, role } = req.userLogin;
    res.status(200).send({ status: true, username, image_url, role });
  }
);


module.exports = checkRoute;
