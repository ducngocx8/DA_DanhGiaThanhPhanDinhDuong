const { DataTypes } = require("sequelize");
const createLichSuLogModel = (sequelize) => {
  return sequelize.define(
    "LICHSULOG",
    {
      id_lichsu: {
        type: DataTypes.CHAR(20),
        primaryKey: true,
        allowNull: false,
      },
      time_cuoi: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      time_dau: {
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
      tableName: "lichsulog",
    }
  );
};

module.exports = { createLichSuLogModel };
