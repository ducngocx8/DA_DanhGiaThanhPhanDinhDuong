import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES, icons, FONTS } from "../../constants";
import axios from "axios";
import { NhomThucPhamURL } from "../../api";
import HeaderDrawerChild from "../../components/HeaderDrawerChild";

export default function NhomThucPham({ navigation }) {
  let [loading, isLoading] = useState(true);
  const [nhomThucPhamList, setNhomThucPhamList] = useState([]);
  console.log("NhomThucPham", navigation);
  useEffect(() => {
    const getAllNhomThucPham = async () => {
      const response = await axios.get(`${NhomThucPhamURL}`);
      setNhomThucPhamList(response.data.data);
    };

    const handleAPIAll = async () => {
      await Promise.all([Promise.resolve(getAllNhomThucPham())]);
      isLoading(false);
    };
    handleAPIAll();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        paddingTop: SIZES.padding * 2,
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
          title={"Bảng giá trị dinh dưỡng - Nhóm"}
          disableRight={true}
        />
      </View>

      {/* Render List Nhóm Thực Phẩm */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: COLORS.lightGray2,
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.padding,
          flex: 1,
        }}
      >
        {/* One Element */}
        {nhomThucPhamList.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate("ThucPhamThuocNhom", {
                  id_nhomthucpham: item.id_nhomthucpham,
                });
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={icons.carb}
                  style={{
                    width: 20,
                    height: 20,
                    marginRight: SIZES.base,
                  }}
                />
                <Text
                  style={{
                    ...FONTS.body3,
                  }}
                >
                  {item.ten_nhom}
                </Text>
              </View>
              <View
                style={{
                  height: 1,
                  backgroundColor:
                    index === nhomThucPhamList.length - 1
                      ? COLORS.lightGray2
                      : COLORS.lightGray1,
                  marginVertical: SIZES.radius,
                }}
              ></View>
            </TouchableOpacity>
          );
        })}
        <View
          style={{
            marginTop: SIZES.padding,
          }}
        ></View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          console.log("SEARCH");
          navigation.navigate("TimKiemThucPham");
        }}
        style={{
          position: "absolute",
          bottom: 40,
          right: 20,
          padding: 10,
          borderRadius: 50,
          backgroundColor: COLORS.primary,
          zIndex: 1000,
        }}
      >
        <Image
          source={icons.search}
          style={{
            width: 30,
            height: 30,
          }}
          tintColor={COLORS.white}
        />
      </TouchableOpacity>
    </View>
  );
}
