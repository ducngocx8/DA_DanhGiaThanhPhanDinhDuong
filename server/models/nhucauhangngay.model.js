const { DataTypes } = require("sequelize");

const createNhuCauHangNgayModel = (sequelize) => {
  return sequelize.define(
    "NhuCauHangNgay",
    {
      id_nhomtuoi: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "nhomtuoi",
          key: "id_nhomtuoi",
        },
      },

      id_laodong: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "laodong",
          key: "id_laodong",
        },
      },

      id_doituong: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "doituong",
          key: "id_doituong",
        },
      },

      id_nhucau: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        references: {
          model: "thanhphannhucau",
          key: "id_nhucau",
        },
      },
    },
    {
      timestamps: false,
      tableName: "nhucauhangngay",
    }
  );
};

module.exports = { createNhuCauHangNgayModel };
