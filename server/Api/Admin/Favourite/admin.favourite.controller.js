const {
  adminAddFavouriteService, 
  adminDeleteFavouriteService,
  adminGetAllFavouriteService,
} = require("./admin.favourite.service");

const adminGetAllFavourite = async (req, res) => {
  const result = await adminGetAllFavouriteService();
  res.status(200).send(result);
};

const adminAddFavourite = async (req, res) => {
  const { id_monan, user_id } = req.body;
  const result = await adminAddFavouriteService(user_id, id_monan);
  res.status(201).send(result);
};

const adminDeleteFavourite = async (req, res) => {
  const { id_monan, user_id } = req.body;
  const result = await adminDeleteFavouriteService(user_id, id_monan);
  res.status(201).send(result);
};

module.exports = {
  adminAddFavourite,
  adminDeleteFavourite,
  adminGetAllFavourite,
};
