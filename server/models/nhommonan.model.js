const { DataTypes } = require("sequelize");

const createNhomMonAnModel = (sequelize) => {
  return sequelize.define(
    "NhomMonAn",
    {
      id_nhommonan: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      ten_nhom: {
        type: DataTypes.STRING,
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
      tableName: "nhommonan",
    }
  );
};

module.exports = { createNhomMonAnModel };
