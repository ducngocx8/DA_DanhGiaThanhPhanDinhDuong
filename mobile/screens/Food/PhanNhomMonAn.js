import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import { SIZES, FONTS, COLORS } from "../../constants";

function PhanNhomMonAn({ monAnChoose, navigation }) {
  /* Render Chi Tiết Của Món Ăn + Thực Phẩm Có Trong Món */
  return (
    <>
      <Text
        style={{
          marginTop: SIZES.padding,
          ...FONTS.h3,
        }}
      >
        Nguyên liệu:
      </Text>
      {monAnChoose.ChiTietMons?.map((chiTietMonAn, index) => {
        return (
          <View
            key={index}
            style={{
              marginTop: index === 0 ? SIZES.radius : 0,
            }}
          >
            {(chiTietMonAn.ten_phannhom.trim() && index === 0) ||
            (chiTietMonAn.ten_phannhom.trim() &&
              chiTietMonAn.ten_phannhom.trim().toLowerCase() !==
                monAnChoose.ChiTietMons[index - 1].ten_phannhom
                  .trim()
                  .toLowerCase()) ? (
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.blue,
                }}
              >
                Phân nhóm món: {chiTietMonAn.ten_phannhom}
              </Text>
            ) : (
              ""
            )}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 5,
              }}
            >
              <Text
                style={{
                  ...FONTS.h4,
                }}
              >
                + {chiTietMonAn?.ThucPham?.TenTiengViet} (
                {Number(chiTietMonAn?.quanty) * 1}g)
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ChiTietThucPham", {
                    id_thucpham: chiTietMonAn?.ThucPham?.id_thucpham,
                    quanty: Number(chiTietMonAn?.quanty) * 1,
                  });
                }}
              >
                <Text
                  style={{
                    ...FONTS.h4,
                    color: COLORS.primary,
                  }}
                >
                  Details
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </>
  );
}

export default memo(PhanNhomMonAn);

const styles = StyleSheet.create({
  header_table50: {
    color: COLORS.white,
    width: SIZES.width / 2.2,
    ...FONTS.h4,
  },

  header_table20: {
    color: COLORS.white,
    ...FONTS.body4,
    width: SIZES.width / 8,
    textAlign: "center",
    ...FONTS.h4,
  },

  header_tableEnd: {
    flex: 1,
    color: COLORS.white,
    textAlign: "right",
    ...FONTS.h4,
  },

  column50: {
    color: COLORS.black,
    width: SIZES.width / 2.2,
    ...FONTS.body4,
    fontSize: 14.5,
  },

  one_row_dd: {
    flexDirection: "row",
    paddingHorizontal: SIZES.radius,
    marginVertical: 3,
  },

  column20: {
    color: COLORS.black,
    width: SIZES.width / 8,
    textAlign: "center",
    ...FONTS.body4,
    fontSize: 14.5,
  },

  columnEnd: {
    flex: 1,
    color: COLORS.black,
    textAlign: "right",
    ...FONTS.body4,
    fontSize: 14.5,
  },
});
