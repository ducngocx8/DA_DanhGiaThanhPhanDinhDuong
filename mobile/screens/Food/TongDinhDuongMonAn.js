import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS, SIZES, FONTS } from "../../constants";

export default function TongDinhDuongMonAn({ chiTietMonList }) {
  const tinhTongDinhDuongMonAn = () => {
    const newTong = {
      PROCNT: 0,
      FAT: 0,
      CHOCDF: 0,
      ENERC: 0,
      WATER: 0,
      FIBC: 0,
      ASH: 0,
      CA: 0,
      P: 0,
      FE: 0,
      ZN: 0,
      NA: 0,
      K: 0,
      MG: 0,
      MN: 0,
      CU: 0,
      SE: 0,
      VITC: 0,
      THIA: 0,
      RIBF: 0,
      NIA: 0,
      PANTAC: 0,
      VITB6: 0,
      FOL: 0,
      FOLAC: 0,
      BIOT: 0,
      VITB12: 0,
      RETOL: 0,
      VITA: 0,
      VITD: 0,
      VITE: 0,
      VITK: 0,
      CARTB: 0,
      CARTA: 0,
      CRYXB: 0,
    };
    chiTietMonList?.forEach((item) => {
      for (const [key, value] of Object.entries(item.ThucPham)) {
        if (
          ![
            "id_thucpham",
            "TenTiengAnh",
            "TenTiengViet",
            "DonViTinh",
            "id_nhomthucpham",
            "image_url",
            "thucpham_status",
            "EDIBLE",
          ].includes(key)
        ) {
          if (typeof Number(value) === "number") {
            newTong[key] =
              Number(newTong[key]) +
              (Number(value) * Number(item.quanty)) / 100;
          }
        }
      }
    });
    for (const [key, value] of Object.entries(newTong)) {
      if (
        [
          "FAT",
          "PROCNT",
          "CHOCDF",
          "ENERC",
          "CA",
          "P",
          "FE",
          "NA",
          "K",
          "MG",
          "FOL",
          "FOLAC",
          "RETOL",
          "VITA",
          "CARTB",
          "CARTA",
          "CRYXB",
        ].includes(key)
      ) {
        newTong[key] = Number(value).toFixed(0) * 1;
      } else if (["WATER"].includes(key)) {
        newTong[key] = Number(value).toFixed(1) * 1;
      } else if (
        [
          "FIBC",
          "ASH",
          "ZN",
          "SE",
          "VITC",
          "BIOT",
          "VITB12",
          "VITD",
          "VITE",
          "VITK",
        ].includes(key)
      ) {
        newTong[key] = Number(value).toFixed(2) * 1;
      } else if (
        ["MN", "CU", "THIA", "RIBF", "NIA", "PANTAC", "VITB6"].includes(key)
      ) {
        newTong[key] = Number(value).toFixed(3) * 1;
      }
    }
    return newTong;
  };

  const renderCacThanhPhanDinhDuong = () => {
    const tongThanhPhanChinh = tinhTongDinhDuongMonAn();
    return (
      <View
        style={{
          marginTop: SIZES.padding,
        }}
      >
        <Text
          style={{
            ...FONTS.h3,
          }}
        >
          Tổng thành phần dinh dưỡng:
        </Text>
        <View
          style={{
            backgroundColor: COLORS.lightGray2,
            flex: 1,
            paddingBottom: SIZES.base,
            borderBottomLeftRadius: SIZES.radius,
            borderBottomRightRadius: SIZES.radius,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingVertical: SIZES.base,
              backgroundColor: COLORS.blue,
              paddingHorizontal: SIZES.radius,
            }}
          >
            <Text style={styles.header_table50}>TP dinh dưỡng</Text>
            <Text style={styles.header_table20}>Đơn vị</Text>
            <Text style={styles.header_tableEnd}>Hàm lượng</Text>
          </View>

          <View style={styles.one_row_dd}>
            <Text style={styles.column50}>Năng Lượng</Text>
            <Text style={styles.column20}>KCal</Text>
            <Text style={styles.columnEnd}>{tongThanhPhanChinh.ENERC}</Text>
          </View>

          <View style={styles.one_row_dd}>
            <Text style={styles.column50}>Hàm lượng nước</Text>
            <Text style={styles.column20}>g</Text>
            <Text style={styles.columnEnd}>{tongThanhPhanChinh.WATER}</Text>
          </View>

          <View style={styles.one_row_dd}>
            <Text style={styles.column50}>Tổng protein</Text>
            <Text style={styles.column20}>g</Text>
            <Text style={styles.columnEnd}>{tongThanhPhanChinh.PROCNT}</Text>
          </View>

          <View style={styles.one_row_dd}>
            <Text style={styles.column50}>Tổng chất béo</Text>
            <Text style={styles.column20}>g</Text>
            <Text style={styles.columnEnd}>{tongThanhPhanChinh.FAT}</Text>
          </View>

          <View style={styles.one_row_dd}>
            <Text style={styles.column50}>Tổng Carbohydrate</Text>
            <Text style={styles.column20}>g</Text>
            <Text style={styles.columnEnd}>{tongThanhPhanChinh.CHOCDF}</Text>
          </View>

          <View style={styles.one_row_dd}>
            <Text style={styles.column50}>Chất xơ</Text>
            <Text style={styles.column20}>g</Text>
            <Text style={styles.columnEnd}>{tongThanhPhanChinh.FIBC}</Text>
          </View>

          <View style={styles.one_row_dd}>
            <Text style={styles.column50}>Tro</Text>
            <Text style={styles.column20}>g</Text>
            <Text style={styles.columnEnd}>{tongThanhPhanChinh.ASH}</Text>
          </View>

          <View style={styles.one_row_dd}>
            <Text style={styles.column50}>Canxi</Text>
            <Text style={styles.column20}>mg</Text>
            <Text style={styles.columnEnd}>{tongThanhPhanChinh.CA}</Text>
          </View>

          <View style={styles.one_row_dd}>
            <Text style={styles.column50}>Phospho</Text>
            <Text style={styles.column20}>mg</Text>
            <Text style={styles.columnEnd}>{tongThanhPhanChinh.P}</Text>
          </View>

          <View style={styles.one_row_dd}>
            <Text style={styles.column50}>Sắt</Text>
            <Text style={styles.column20}>mg</Text>
            <Text style={styles.columnEnd}>{tongThanhPhanChinh.FE}</Text>
          </View>

          <View style={styles.one_row_dd}>
            <Text style={styles.column50}>Kẽm</Text>
            <Text style={styles.column20}>mg</Text>
            <Text style={styles.columnEnd}>{tongThanhPhanChinh.ZN}</Text>
          </View>

          <View style={styles.one_row_dd}>
            <Text style={styles.column50}>Natri</Text>
            <Text style={styles.column20}>mg</Text>
            <Text style={styles.columnEnd}>{tongThanhPhanChinh.NA}</Text>
          </View>

          <View style={styles.one_row_dd}>
            <Text style={styles.column50}>Kali</Text>
            <Text style={styles.column20}>mg</Text>
            <Text style={styles.columnEnd}>{tongThanhPhanChinh.K}</Text>
          </View>

          <View style={styles.one_row_dd}>
            <Text style={styles.column50}>Magie</Text>
            <Text style={styles.column20}>mg</Text>
            <Text style={styles.columnEnd}>{tongThanhPhanChinh.MG}</Text>
          </View>

          <View style={styles.one_row_dd}>
            <Text style={styles.column50}>Mangan</Text>
            <Text style={styles.column20}>mg</Text>
            <Text style={styles.columnEnd}>{tongThanhPhanChinh.MN}</Text>
          </View>

          <View style={styles.one_row_dd}>
            <Text style={styles.column50}>Đồng</Text>
            <Text style={styles.column20}>mg</Text>
            <Text style={styles.columnEnd}>{tongThanhPhanChinh.CU}</Text>
          </View>

          <View style={styles.one_row_dd}>
            <Text style={styles.column50}>Selen</Text>
            <Text style={styles.column20}>µg</Text>
            <Text style={styles.columnEnd}>{tongThanhPhanChinh.SE}</Text>
          </View>

          <View style={styles.one_row_dd}>
            <Text style={styles.column50}>Vitamin C</Text>
            <Text style={styles.column20}>mg</Text>
            <Text style={styles.columnEnd}>{tongThanhPhanChinh.VITC}</Text>
          </View>

          <View style={styles.one_row_dd}>
            <Text style={styles.column50}>Vitamin B1 (Thiamin)</Text>
            <Text style={styles.column20}>mg</Text>
            <Text style={styles.columnEnd}>{tongThanhPhanChinh.THIA}</Text>
          </View>

          <View style={styles.one_row_dd}>
            <Text style={styles.column50}>Vitamin B2 (Riboflavin)</Text>
            <Text style={styles.column20}>mg</Text>
            <Text style={styles.columnEnd}>{tongThanhPhanChinh.RIBF}</Text>
          </View>

          <View style={styles.one_row_dd}>
            <Text style={styles.column50}>Niacin</Text>
            <Text style={styles.column20}>mg</Text>
            <Text style={styles.columnEnd}>{tongThanhPhanChinh.NIA}</Text>
          </View>

          <View style={styles.one_row_dd}>
            <Text style={styles.column50}>Acid pantothenic</Text>
            <Text style={styles.column20}>mg</Text>
            <Text style={styles.columnEnd}>{tongThanhPhanChinh.PANTAC}</Text>
          </View>

          <View style={styles.one_row_dd}>
            <Text style={styles.column50}>Vitamin B6</Text>
            <Text style={styles.column20}>mg</Text>
            <Text style={styles.columnEnd}>{tongThanhPhanChinh.VITB6}</Text>
          </View>

          <View style={styles.one_row_dd}>
            <Text style={styles.column50}>Vitamin A</Text>
            <Text style={styles.column20}>µg</Text>
            <Text style={styles.columnEnd}>{tongThanhPhanChinh.VITA}</Text>
          </View>

          <View style={styles.one_row_dd}>
            <Text style={styles.column50}>Vitamin D</Text>
            <Text style={styles.column20}>µg</Text>
            <Text style={styles.columnEnd}>{tongThanhPhanChinh.VITD}</Text>
          </View>

          <View style={styles.one_row_dd}>
            <Text style={styles.column50}>Vitamin E</Text>
            <Text style={styles.column20}>mg</Text>
            <Text style={styles.columnEnd}>{tongThanhPhanChinh.VITE}</Text>
          </View>

          <View style={styles.one_row_dd}>
            <Text style={styles.column50}>Vitamin K</Text>
            <Text style={styles.column20}>µg</Text>
            <Text style={styles.columnEnd}>{tongThanhPhanChinh.VITK}</Text>
          </View>

          <View style={styles.one_row_dd}>
            <Text style={styles.column50}>Vitamin B12</Text>
            <Text style={styles.column20}>µg</Text>
            <Text style={styles.columnEnd}>{tongThanhPhanChinh.VITB12}</Text>
          </View>

          <View style={styles.one_row_dd}>
            <Text style={styles.column50}>Tổng FOL</Text>
            <Text style={styles.column20}>µg</Text>
            <Text style={styles.columnEnd}>{tongThanhPhanChinh.FOL}</Text>
          </View>

          <View style={styles.one_row_dd}>
            <Text style={styles.column50}>Acid Folic</Text>
            <Text style={styles.column20}>µg</Text>
            <Text style={styles.columnEnd}>{tongThanhPhanChinh.FOLAC * 1}</Text>
          </View>

          <View style={styles.one_row_dd}>
            <Text style={styles.column50}>Biotin</Text>
            <Text style={styles.column20}>µg</Text>
            <Text style={styles.columnEnd}>{tongThanhPhanChinh.BIOT * 1}</Text>
          </View>

          <View style={styles.one_row_dd}>
            <Text style={styles.column50}>Retinol</Text>
            <Text style={styles.column20}>µg</Text>
            <Text style={styles.columnEnd}>{tongThanhPhanChinh.RETOL * 1}</Text>
          </View>

          <View style={styles.one_row_dd}>
            <Text style={styles.column50}>Beta Carotene Alpha</Text>
            <Text style={styles.column20}>µg</Text>
            <Text style={styles.columnEnd}>{tongThanhPhanChinh.CARTB * 1}</Text>
          </View>

          <View style={styles.one_row_dd}>
            <Text style={styles.column50}>Alpha Carotene</Text>
            <Text style={styles.column20}>µg</Text>
            <Text style={styles.columnEnd}>{tongThanhPhanChinh.CARTA * 1}</Text>
          </View>

          <View style={styles.one_row_dd}>
            <Text style={styles.column50}>CRYXB</Text>
            <Text style={styles.column20}>µg</Text>
            <Text style={styles.columnEnd}>{tongThanhPhanChinh.CRYXB * 1}</Text>
          </View>
        </View>
      </View>
    );
  };

  return <>{chiTietMonList.length > 0 ? renderCacThanhPhanDinhDuong() : ""}</>;
}

const styles = StyleSheet.create({
  header_table50: {
    color: COLORS.white,
    flex: 3,
    ...FONTS.h3,
    textAlign: "center",
  },

  header_table20: {
    color: COLORS.white,
    ...FONTS.body4,
    flex: 2,
    textAlign: "center",
    ...FONTS.h3,
  },

  header_tableEnd: {
    flex: 2,
    color: COLORS.white,
    textAlign: "center",
    ...FONTS.h3,
  },

  column50: {
    color: COLORS.black,
    flex: 3,
    ...FONTS.body3,
  },

  one_row_dd: {
    flexDirection: "row",
    paddingHorizontal: SIZES.radius,
    marginVertical: 3,
  },

  column20: {
    color: COLORS.black,
    flex: 2,
    textAlign: "center",
    ...FONTS.body3,
  },

  columnEnd: {
    flex: 2,
    color: COLORS.black,
    textAlign: "center",
    ...FONTS.body3,
  },
});
