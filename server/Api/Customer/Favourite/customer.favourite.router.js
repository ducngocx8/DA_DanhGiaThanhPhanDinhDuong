const express = require("express");
const {
  customerGetAllFavourite,
  customerToggleFavourite,
  customerCheckMonAnFavourite,
} = require("./customer.favourite.controller");
const {
  IDMonAnUserValidation,
  IDMonAnParamValidation,
} = require("../../../middlewares/validations/favourite.validation");
const {
  checkUserIDCookie,
  verifyToken,
  checkUserToken,
} = require("../../../middlewares/validations/account.validation");
const { customerPermission } = require("../../../middlewares/permission");

const customerFavouriteRoute = express.Router();

customerFavouriteRoute.get("/", checkUserIDCookie, customerGetAllFavourite);
customerFavouriteRoute.get(
  "/check/:id",
  checkUserIDCookie,
  IDMonAnParamValidation,
  customerCheckMonAnFavourite
);
customerFavouriteRoute.post(
  "/",
  verifyToken,
  checkUserToken,
  customerPermission,
  IDMonAnUserValidation,
  customerToggleFavourite
);
module.exports = customerFavouriteRoute;
