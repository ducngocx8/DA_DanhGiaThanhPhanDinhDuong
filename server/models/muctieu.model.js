const { DataTypes } = require("sequelize");
const createMucTieuModel = (sequelize) => {
  return sequelize.define(
    "MucTieu",
    {
      muctieu_id: {
        type: DataTypes.CHAR(20),
        primaryKey: true,
        allowNull: false,
      },
      ENERC: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      PROCNT: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      FAT: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      CHOCDF: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      note: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: "",
      },
      time: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      //   user_id: {
      //     type: DataTypes.INTEGER,
      //     primaryKey: false,
      //     allowNull: false,
      //   },
    },
    {
      timestamps: false,
      tableName: "muctieu",
    }
  );
};

module.exports = { createMucTieuModel };
