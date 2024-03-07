const { DataTypes } = require("sequelize");

const createNhomTuoiModel = (sequelize) => {
  return sequelize.define(
    "NhomTuoi",
    {
      id_nhomtuoi: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      TenNhomTuoi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      strAge: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      endAge: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: "nhomtuoi",
    }
  );
};

module.exports = { createNhomTuoiModel };
