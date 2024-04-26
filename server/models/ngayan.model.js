const { DataTypes } = require("sequelize");

const createNgayAnModel = (sequelize) => {
  return sequelize.define(
    "NgayAn",
    {
      ngayan_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      //   user_id: {
      //     type: DataTypes.INTEGER,
      //     allowNull: false,
      //   },
      //   bua_an_id: {
      //     type: DataTypes.INTEGER,
      //     allowNull: false,
      //   },
      //   id_monan: {
      //     type: DataTypes.INTEGER,
      //     allowNull: false,
      //   },
      time: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      quanty: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      timestamps: false,
      tableName: "ngayan",
    }
  );
};

module.exports = { createNgayAnModel };
