const { DataTypes } = require("Sequelize");

const createThucPhamChonModel = (sequelize) => {
  return sequelize.define(
    "ThucPhamChon",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      //   id_thucpham: {
      //     type: DataTypes.INTEGER,
      //     primaryKey: true,
      //     allowNull: false,
      //   },
      //   user_id: {
      //     type: DataTypes.INTEGER,
      //     primaryKey: true,
      //     allowNull: false,
      //   },
      quanty: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: "thucphamchon",
    }
  );
};

module.exports = { createThucPhamChonModel };
