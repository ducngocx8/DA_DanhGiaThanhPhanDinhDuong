const { DataTypes } = require("sequelize");

const createBuaAnModel = (sequelize) => {
  return sequelize.define(
    "BuaAn",
    {
      bua_an_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      ten_bua_an: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
    },
    {
      timestamps: false,
      tableName: "buaan",
    }
  );
};

module.exports = { createBuaAnModel };
