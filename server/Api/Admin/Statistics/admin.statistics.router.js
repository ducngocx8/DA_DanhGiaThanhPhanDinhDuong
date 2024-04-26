const express = require("express");
const {
  adminCountTop,
  customerGetThongKeUser,
  customerGetThongKeMonAn,
  customerGetThongKeTruyCap,
} = require("./admin.statistics.controller");
const { filterThongKeUserValidation, filterThongKeMonAnValidation, filterThongKeTruyCapValidation } = require("../../../middlewares/validations/search.validation");

const adminStatisticsRoute = express.Router();

adminStatisticsRoute.get("/count/top", adminCountTop);
adminStatisticsRoute.get(
  "/thong-ke-user",
  filterThongKeUserValidation,
  customerGetThongKeUser
);

adminStatisticsRoute.get(
  "/thong-ke-mon-an",
  filterThongKeMonAnValidation,
  customerGetThongKeMonAn
);

adminStatisticsRoute.get(
  "/thong-ke-truy-cap",
  filterThongKeTruyCapValidation,
  customerGetThongKeTruyCap
);

module.exports = adminStatisticsRoute;
