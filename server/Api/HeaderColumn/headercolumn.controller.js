const { getAllHeaderColumnService } = require("./headercolumn.service");

const getAllHeaderColumn = async (req, res) => {
  const result = await getAllHeaderColumnService();
  res.status(200).send(result);
};

module.exports = {
  getAllHeaderColumn,
};
