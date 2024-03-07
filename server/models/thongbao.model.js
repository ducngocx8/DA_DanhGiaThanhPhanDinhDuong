const { DataTypes } = require("Sequelize");

const createThongBaoModel = (sequelize) => {
  return sequelize.define(
    "ThongBao",
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      expo_key: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: "thongbao",
    }
  );
};

module.exports = { createThongBaoModel };
