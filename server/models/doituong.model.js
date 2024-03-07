const { DataTypes } = require("sequelize");

const createDoiTuongModel = (sequelize) => {
  return sequelize.define(
    "DoiTuong",
    {
      id_doituong: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      TenDoiTuong: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: "doituong",
    }
  );
};

module.exports = { createDoiTuongModel };
