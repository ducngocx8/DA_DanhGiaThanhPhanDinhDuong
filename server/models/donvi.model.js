const { DataTypes } = require("sequelize");

const createDonViModel = (sequelize) => {
  return sequelize.define(
    "DONVI",
    {
      id_donvi: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      ten_donvi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: "donvi",
    }
  );
};

module.exports = { createDonViModel };
