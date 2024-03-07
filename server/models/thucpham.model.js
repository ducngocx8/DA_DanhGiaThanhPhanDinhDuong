const { DataTypes } = require("sequelize");

const createThucPhamModel = (sequelize) => {
  return sequelize.define(
    "ThucPham",
    {
      id_thucpham: {
        type: DataTypes.CHAR(5),
        primaryKey: true,
        allowNull: false,
      },
      TenTiengAnh: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      TenTiengViet: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      DonViTinh: {
        type: DataTypes.CHAR(10),
        allowNull: true,
        defaultValue: "g",
      },
      EDIBLE: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: true,
      },
      ENERC: {
        type: DataTypes.DECIMAL(10, 1),
        allowNull: true,
      },
      WATER: {
        type: DataTypes.DECIMAL(10, 1),
        allowNull: true,
      },
      PROCNT: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      FAT: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      CHOCDF: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      FIBC: {
        type: DataTypes.DECIMAL(10, 1),
        allowNull: true,
      },
      ASH: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      CA: {
        type: DataTypes.DECIMAL(10, 1),
        allowNull: true,
      },
      P: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: true,
      },
      FE: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      ZN: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      NA: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: true,
      },
      K: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: true,
      },
      MG: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: true,
      },
      MN: {
        type: DataTypes.DECIMAL(10, 3),
        allowNull: true,
      },
      CU: {
        type: DataTypes.DECIMAL(10, 3),
        allowNull: true,
      },
      SE: {
        type: DataTypes.DECIMAL(10, 1),
        allowNull: true,
      },
      VITC: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      THIA: {
        type: DataTypes.DECIMAL(10, 3),
        allowNull: true,
      },
      RIBF: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      NIA: {
        type: DataTypes.DECIMAL(10, 1),
        allowNull: true,
      },
      PANTAC: {
        type: DataTypes.DECIMAL(10, 3),
        allowNull: true,
      },
      VITB6: {
        type: DataTypes.DECIMAL(10, 3),
        allowNull: true,
      },
      FOL: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: true,
      },
      FOLAC: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: true,
      },
      BIOT: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      VITB12: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      RETOL: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: true,
      },
      VITA: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: true,
      },
      VITD: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      VITE: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      VITK: {
        type: DataTypes.DECIMAL(10, 1),
        allowNull: true,
      },
      CARTB: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: true,
      },
      CARTA: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: true,
      },
      CRYXB: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: true,
      },
      image_url: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: "",
      },
      thucpham_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
      tableName: "thucpham",
    }
  );
};

module.exports = { createThucPhamModel };
