const {
  customerToggleFavouriteService,
  customerGetAllFavouriteService,
  customerCheckMonAnFavouriteService,
} = require("./customer.favourite.service");

const customerGetAllFavourite = async (req, res) => {
  const { userLogin } = req;
  const user_id = userLogin?.user_id;
  const result = await customerGetAllFavouriteService(user_id);
  res.status(200).send(result);
};

const customerCheckMonAnFavourite = async (req, res) => {
  const id_monan = req.params.id;
  const { userLogin } = req;
  const user_id = userLogin?.user_id;
  const result = await customerCheckMonAnFavouriteService(user_id, id_monan);
  res.status(200).send(result);
};

const customerToggleFavourite = async (req, res) => {
  const { userLogin } = req;
  const user_id = userLogin.user_id;
  const { id_monan } = req.body;
  const result = await customerToggleFavouriteService(user_id, id_monan);
  res.status(201).send(result);
};

module.exports = {
  customerGetAllFavourite,
  customerToggleFavourite,
  customerCheckMonAnFavourite,
};
