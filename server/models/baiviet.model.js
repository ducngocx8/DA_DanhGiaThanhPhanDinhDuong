const { DataTypes } = require("sequelize");

const createBaiVietModel = (sequelize) => {
  return sequelize.define(
    "BaiViet",
    {
      id_baiviet: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      slug: {
        type: DataTypes.CHAR(100),
        allowNull: false,
      },
      tieu_de: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: "",
      },
      mo_ta: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: "",
      },
      noi_dung: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      hien_thi: {
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
        allowNull: true,
      },
      luot_xem: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      //   user_id: {
      //     type: DataTypes.INT,
      //     allowNull: false,
      //   },
      //   id_chuyenmuc: {
      //     type: DataTypes.INT,
      //     allowNull: false,
      //   },
    },
    {
      timestamps: false,
      tableName: "baiviet",
    }
  );
};

module.exports = { createBaiVietModel };
