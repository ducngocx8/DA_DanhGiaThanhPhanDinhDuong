import { View, Text } from "react-native";
import React from "react";

export default function ChonBuaAn({ buaAnList }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{
        flexDirection: "row",
        marginTop: SIZES.padding,
      }}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            ...FONTS.h3,
          }}
        >
          Bữa ăn:
        </Text>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          {buaAnList.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor:
                    item.bua_an_id === buaAnChoose
                      ? COLORS.primary
                      : COLORS.white,
                  padding: SIZES.radius,
                  borderRadius: SIZES.radius,
                  borderWidth: 1,
                  borderColor: COLORS.lightGray1,
                  marginLeft: SIZES.radius,
                }}
                onPress={() => {
                  setBuaAnChoose(item.bua_an_id);
                }}
              >
                <Text
                  style={{
                    ...FONTS.body3,
                    color:
                      item.bua_an_id === buaAnChoose
                        ? COLORS.white
                        : COLORS.gray,
                  }}
                >
                  {item.ten_bua_an}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}
