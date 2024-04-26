import { View, Text, StyleSheet, Image, Modal, TextInput } from "react-native";
import React, { useState } from "react";
import { COLORS, SIZES, FONTS } from "../../constants";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import HeaderDrawerChild from "../../components/HeaderDrawerChild";
import axios from "axios";
import { MonAnURL } from "../../api";
import { BUILD_ANDROID, notify } from "../../utils/variable";
import { useIsFocused } from "@react-navigation/native";

export default function GoiYThucDon({ navigation }) {
  const [thucDon, setThucDon] = useState([]);
  const [energy, setEnergy] = useState("");
  const isFocused = useIsFocused();

  const handleGetThucDon = async () => {
    if (isNaN(Number(energy)) || Number(energy) < 200) {
      notify(false, "Năng lượng không hợp lệ hoặc dưới 200.");
      return;
    }
    const response = await axios.get(
      `${MonAnURL + "/get/random?limit=12&energy=" + energy}`
    );
    if (response.data.status) {
      setThucDon(response.data.data);
    } else {
      notify(false, response.data.message);
      setThucDon([]);
    }
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          paddingTop: BUILD_ANDROID ? 8 : SIZES.padding * 2,
          backgroundColor: COLORS.primary,
        }}
      >
        <View
          style={{
            paddingHorizontal: SIZES.padding,
          }}
        >
          <HeaderDrawerChild
            navigation={navigation}
            title={"Thực phẩm giàu dưỡng chất"}
            disableRight={true}
          />
        </View>

        <ScrollView
          style={{
            backgroundColor: COLORS.white,
            paddingHorizontal: SIZES.padding,
            paddingVertical: SIZES.padding,
            flex: 1,
          }}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.primary,
                }}
              >
                Nhập năng lượng:
              </Text>

              <TextInput
                value={energy}
                maxLength={5}
                keyboardType="decimal-pad"
                onChangeText={(value) => {
                  setEnergy(value);
                }}
                style={{
                  borderWidth: 1,
                  height: 45,
                  ...FONTS.body3,
                  borderColor: COLORS.lightGray1,
                  paddingHorizontal: 10,
                  borderRadius: SIZES.base,
                  marginLeft: 20,
                  flex: 1,
                }}
              />
            </View>

            <View
              style={{
                marginTop: SIZES.base,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "rgb(51, 51, 153)",
                  ...FONTS.body3,
                }}
              >
                Danh sách thực đơn trong ngày
              </Text>
            </View>
            {/* Render danh sách thực phẩm */}
            <View
              style={{
                marginTop: SIZES.radius,
              }}
            >
              {thucDon.map((item, index) => {
                let T_ENERC = 0;
                let T_PROCNT = 0;
                let T_FAT = 0;
                let T_CHOCDF = 0;
                return (
                  <View
                    key={index}
                    style={{
                      marginTop: 10,
                    }}
                  >
                    <Text
                      style={{
                        ...FONTS.body3,
                      }}
                    >
                      Thực đơn số #{index + 1}
                    </Text>
                    <View
                      style={{
                        backgroundColor: COLORS.lightGray2,
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
                        <Text style={styles.header_table20}>Buổi</Text>
                        <Text style={styles.header_table50}>Tên món ăn</Text>
                        <Text style={styles.header_tableEnd}>
                          H.Lượng (KCal)
                        </Text>
                      </View>
                      {item.map((monan, ind) => {
                        T_ENERC += Number(monan.TOTAL_ENERC);
                        T_PROCNT += Number(monan.TOTAL_PROCNT);
                        T_FAT += Number(monan.TOTAL_FAT);
                        T_CHOCDF += Number(monan.TOTAL_CHOCDF);
                        return (
                          <View key={ind}>
                            <TouchableOpacity
                              style={styles.one_row_dd_thucpham}
                              onPress={() => {
                                navigation.navigate("FoodDetail", {
                                  id_monan: monan.id_monan,
                                  quanty: 1,
                                  // quanty: monan.quanty,
                                });
                              }}
                            >
                              <Text style={styles.column20_thucpham}>
                                {ind === 0
                                  ? "Sáng"
                                  : ind === 1
                                  ? "Trưa"
                                  : ind === 2
                                  ? "Tối"
                                  : "Phụ"}
                              </Text>
                              <Text style={styles.column50_thucpham}>
                                {monan.quanty +
                                  " " +
                                  monan.don_vi +
                                  " " +
                                  monan.ten_mon}
                              </Text>
                              <Text style={styles.columnEnd_thucpham}>
                                {monan.TOTAL_ENERC}
                              </Text>
                            </TouchableOpacity>
                            {ind === item.length - 1 && (
                              <>
                                <View
                                  style={{
                                    borderBottomWidth: 1,
                                    borderColor: COLORS.primary,
                                    marginHorizontal: SIZES.padding,
                                    marginVertical: SIZES.base,
                                  }}
                                ></View>
                                <Text
                                  style={{
                                    ...FONTS.h4,
                                    textAlign: "center",
                                  }}
                                >
                                  Tổng cộng: Protein: {T_PROCNT.toFixed(2)}g -
                                  Fat: {T_FAT.toFixed(2)}g - Carbohydrate:{" "}
                                  {T_CHOCDF.toFixed(2)}g - Calo:{" "}
                                  {T_ENERC.toFixed(0)} Kcal
                                </Text>
                              </>
                            )}
                          </View>
                        );
                      })}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
          {/* Pagination */}
          <View
            style={{
              marginTop: 80,
            }}
          ></View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            handleGetThucDon();
          }}
          style={{
            position: "absolute",
            bottom: 0,
            backgroundColor: COLORS.primary,
            left: 0,
            right: 0,
            paddingVertical: SIZES.base + 2,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: COLORS.white,
              ...FONTS.body3,
            }}
          >
            Lấy thực đơn
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
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
    flex: 1,
    textAlign: "center",
    ...FONTS.h3,
  },

  header_tableEnd: {
    flex: 2,
    color: COLORS.white,
    textAlign: "right",
    ...FONTS.h3,
  },

  one_row_dd_thucpham: {
    flexDirection: "row",
    marginVertical: 3,
    alignItems: "center",
    paddingHorizontal: SIZES.radius,
    flex: 1,
  },

  column50_thucpham: {
    color: COLORS.black,
    flex: 3,
    flexDirection: "row",
    ...FONTS.body3,
    textAlign: "center",
  },

  column20_thucpham: {
    color: COLORS.black,
    textAlign: "center",
    ...FONTS.body3,
    flex: 1,
  },

  columnEnd_thucpham: {
    flex: 2,
    color: COLORS.black,
    textAlign: "right",
    alignItems: "center",
    ...FONTS.body3,
  },
});
