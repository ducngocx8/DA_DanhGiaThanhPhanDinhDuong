const { DataTypes } = require("sequelize");

const createThanhPhanNhuCauModel = (sequelize) => {
  return sequelize.define(
    "ThanhPhanNhuCau",
    {
      id_nhucau: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      DienGiai: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },
      NangLuong: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },
      Protein: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },
      Lipid: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },
      Glucid: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },
      Xo: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },
      CanXi: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },
      Phospho: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },
      Magie: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },
      Iod: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },
      Cu: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },
      Mangan: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },

      Fluo: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },
      Fe: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },
      Zn: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },
      Selen: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },

      Crom: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },

      VitaminA: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },
      VitaminE: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },
      VitaminK: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },
      VitaminD: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },
      VitaminB1: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },
      VitaminB2: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },

      Niacin: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },
      Pantothenic: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },
      VitaminB6: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      Folate: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },

      B12: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },
      Bitotin: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },
      VitaminC: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },

      Choline: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },
      NaMuoi: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },
      Kali: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },
      Clo: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },
    },
    {
      timestamps: false,
      tableName: "thanhphannhucau",
    }
  );
};

module.exports = { createThanhPhanNhuCauModel };

