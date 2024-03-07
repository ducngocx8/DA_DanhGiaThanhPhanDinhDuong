const { DataTypes } = require("sequelize");

const createFavouriteModel = (sequelize) => {
  return sequelize.define(
    "Favourite",
    {
    //   id_monan: {
    //     type: DataTypes.INTEGER,
    //     primaryKey: true,
    //     allowNull: false,
    //   },
    //   user_id: {
    //     type: DataTypes.INTEGER,
    //     primaryKey: true,
    //     allowNull: false,
    //   },
    },
    {
      timestamps: false,
      tableName: "favourite",
    }
  );
};

module.exports = { createFavouriteModel };
