// id_monan int PK
// user_id int PK
const IDMonAnUserValidation = (req, res, next) => {
  let { id_monan } = req.body;

  if (!Number.isInteger(id_monan)) {
    return res.status(201).send({
      status: false,
      message: "ID Món ăn phải là số nguyên",
    });
  }
  next();
};

const IDMonAnParamValidation = (req, res, next) => {
  const id_monan = req.params.id;
  if (!Number.isInteger(Number(id_monan))) {
    return res.status(201).send({
      status: false,
      message: "ID Món ăn phải là số nguyên",
    });
  }
  next();
};

const FavouriteAdminValidation = (req, res, next) => {
  let { id_monan, user_id } = req.body;

  if (!Number.isInteger(user_id)) {
    return res.status(201).send({
      status: false,
      message: "ID User phải là số nguyên",
    });
  }

  if (!Number.isInteger(id_monan)) {
    return res.status(201).send({
      status: false,
      message: "ID Món ăn phải là số nguyên",
    });
  }
  next();
};

module.exports = {
  IDMonAnUserValidation,
  FavouriteAdminValidation,
  IDMonAnParamValidation,
};
