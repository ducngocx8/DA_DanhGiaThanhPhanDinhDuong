const { DataTypes } = require("sequelize");
const createUserModel = (sequelize) => {
  return sequelize.define(
    "Users",
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      firstname: {
        type: DataTypes.STRING(20),
        allowNull: true,
        defaultValue: "",
      },
      lastname: {
        type: DataTypes.STRING(30),
        allowNull: true,
        defaultValue: "",
      },
      phonenumber: {
        type: DataTypes.STRING(10),
        allowNull: true,
        defaultValue: "",
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      user_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, // 1: inActive, 2: Active, 3: Block
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
      //   role_id: {
      //     type: DataTypes.INTEGER,
      //     primaryKey: true,
      //     allowNull: false,
      //   },
    },
    {
      timestamps: false,
      tableName: "users",
    }
  );
};

module.exports = { createUserModel };
