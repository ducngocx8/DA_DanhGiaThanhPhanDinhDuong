const { DataTypes } = require("sequelize");
const createChiSoDuongHuyetModel = (sequelize) => {
  return sequelize.define(
    "ChiSoDuongHuyet",
    {
      id_thucpham: {
        type: DataTypes.CHAR(5),
        primaryKey: true,
        allowNull: false,
      },
      TenThucPham: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      GI: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: "chisoduonghuyet",
    }
  );
};

module.exports = { createChiSoDuongHuyetModel };
