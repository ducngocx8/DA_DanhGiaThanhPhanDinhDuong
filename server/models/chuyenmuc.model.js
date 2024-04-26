const { DataTypes } = require("sequelize");

const createChuyenMucModel = (sequelize) => {
  return sequelize.define(
    "ChuyenMuc",
    {
      id_chuyenmuc: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      ten_chuyenmuc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: "chuyenmuc",
    }
  );
};

module.exports = { createChuyenMucModel };
