const { DataTypes } = require("Sequelize");

const createMonAnModel = (sequelize) => {
  return sequelize.define(
    "MonAn",
    {
      id_monan: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      ten_mon: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      don_vi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      monan_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // 0: Hide, 1: Show: 2: Request Public
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
    },
    {
      timestamps: false,
      tableName: "monan",
    }
  );
};

module.exports = { createMonAnModel };
