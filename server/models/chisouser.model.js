const { DataTypes } = require("sequelize");
const createChiSoUserModel = (sequelize) => {
  return sequelize.define(
    "ChiSoUser",
    {
      id_chiso: {
        type: DataTypes.CHAR(20),
        primaryKey: true,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      weight: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM(["F", "M"]),
        allowNull: false,
      },
      time_update: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      //   id_laodong: {
      //     type: DataTypes.INTEGER,
      //     primaryKey: false,
      //     allowNull: false,
      //   },
      //   user_id: {
      //     type: DataTypes.INTEGER,
      //     primaryKey: false,
      //     allowNull: false,
      //   },
      //   id_doituong: {
      //     type: DataTypes.INTEGER,
      //     primaryKey: false,
      //     allowNull: false,
      //   },
    },
    {
      timestamps: false,
      tableName: "chisouser",
    }
  );
};

module.exports = { createChiSoUserModel };
