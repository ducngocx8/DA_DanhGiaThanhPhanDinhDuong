const { DataTypes } = require("sequelize");

const createNhomThucPhamModel = (sequelize) => {
  return sequelize.define(
    "NhomThucPham",
    {
      id_nhomthucpham: {
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
        defaultValue: ""
      },
    },
    {
      timestamps: false,
      tableName: "nhomthucpham",
    }
  );
};

module.exports = { createNhomThucPhamModel };
