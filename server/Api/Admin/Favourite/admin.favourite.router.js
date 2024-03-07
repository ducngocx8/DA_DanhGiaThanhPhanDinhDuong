const express = require("express");
const {
  adminGetAllFavourite,
  adminAddFavourite,
  adminDeleteFavourite,
} = require("./admin.favourite.controller");
const {
  FavouriteAdminValidation,
} = require("../../../middlewares/validations/favourite.validation");

const adminFavouriteRoute = express.Router();

adminFavouriteRoute.get("/", adminGetAllFavourite);
adminFavouriteRoute.post("/", FavouriteAdminValidation, adminAddFavourite);
adminFavouriteRoute.delete("/", FavouriteAdminValidation, adminDeleteFavourite);
module.exports = adminFavouriteRoute;
