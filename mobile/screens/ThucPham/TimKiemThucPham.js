import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, SIZES, icons, FONTS } from "../../constants";
import HeaderDrawerChild from "../../components/HeaderDrawerChild";
import { TextInput } from "react-native";

export default function TimKiemThucPham({ navigation }) {
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
          title={"Tìm kiếm thực phẩm"}
          navigation={navigation}
        />
      </View>

      <View
        style={{
          backgroundColor: COLORS.lightGray2,
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.padding,
          flex: 1,
        }}
      >
        {/* Search */}
        <View
          style={{
            flexDirection: "row",
            borderRadius: SIZES.base,
            borderWidth: 1,
            borderColor: COLORS.lightGray1,
            alignItems: "center",
          }}
        >
          <TextInput
            placeholder="Nhập tên thực phẩm"
            style={{
              paddingHorizontal: 5,
              height: 45,
              flex: 1,
              ...FONTS.body3,
            }}
          />

          <Image
            source={icons.cross}
            style={{
              width: 20,
              height: 20,
              marginHorizontal: SIZES.base,
            }}
            tintColor={COLORS.gray}
          />
        </View>

        {/* Search Result */}
        <View
          style={{
            marginTop: SIZES.padding,
          }}
        >
          {/* One Result */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ChiTietThucPham");
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={icons.rice}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
              <Text
                style={{
                  ...FONTS.body3,
                }}
              >
                Gạo nếp cái
              </Text>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: COLORS.lightGray1,
                marginHorizontal: SIZES.base,
                marginVertical: SIZES.base,
              }}
            ></View>
          </TouchableOpacity>

          <TouchableOpacity style={{}}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={icons.burger}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
              <Text
                style={{
                  ...FONTS.body3,
                }}
              >
                Bánh đa nem
              </Text>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: COLORS.lightGray1,
                marginHorizontal: SIZES.base,
                marginVertical: SIZES.base,
              }}
            ></View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
