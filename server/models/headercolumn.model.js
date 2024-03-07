const { DataTypes } = require("sequelize");

const createHeaderColumnModel = (sequelize) => {
  return sequelize.define(
    "HeaderColumn",
    {
      id_column: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      column_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      column_code: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      don_vi: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: "",
      },
      note: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: "",
      },
      lam_tron: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
      tableName: "headercolumn",
    }
  );
};

module.exports = { createHeaderColumnModel };
