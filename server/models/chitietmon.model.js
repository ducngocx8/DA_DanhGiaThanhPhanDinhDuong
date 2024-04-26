const { DataTypes } = require("sequelize");

const createChiTietMonModel = (sequelize) => {
  return sequelize.define(
    "ChiTietMon",
    {
      id_chitietmon: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      //   id_monan: {
      //     type: DataTypes.INTEGER,
      //     allowNull: false,
      //   },
      //   id_thucpham: {
      //     type: DataTypes.INTEGER,
      //     allowNull: false,
      //   },
      ten_phannhom: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      quanty: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: "chitietmon",
    }
  );
};

module.exports = { createChiTietMonModel };
