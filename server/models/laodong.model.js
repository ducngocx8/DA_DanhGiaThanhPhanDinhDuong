const { DataTypes } = require("sequelize");

const createLaoDongModel = (sequelize) => {
  return sequelize.define(
    "LaoDong",
    {
      id_laodong: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      TenLaoDong: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: "laodong",
    }
  );
};

module.exports = { createLaoDongModel };
