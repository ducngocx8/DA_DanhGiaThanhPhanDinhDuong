import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, SIZES, icons, FONTS } from "../constants";

export default function HeaderDrawer({ title, navigation, disableRight }) {
  console.log("navigation Header = ", navigation);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        color: COLORS.white,
        marginBottom: SIZES.base,
      }}
    >
      {/* Back */}
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          borderWidth: 1,
          borderColor: COLORS.white,
          width: 40,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: SIZES.radius,
        }}
      >
        <Image
          source={icons.menu}
          style={{
            width: 20,
            height: 20,
            tintColor: COLORS.white
          }}
        />
      </TouchableOpacity>
      {/* Title */}
      <Text
        style={{
          flex: 1,
          textAlign: "center",
          ...FONTS.h3, color: COLORS.white
        }}
      >
        {title}
      </Text>
      {/* Cart Icon */}
      {disableRight === true ? (
        <View
          style={{
            width: 40,
            height: 40,
          }}
        ></View>
      ) : (
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: COLORS.gray2,
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.lightOrange2,
          }}
        >
          <View
            style={{
              position: "absolute",
              backgroundColor: COLORS.primary,
              borderRadius: SIZES.radius,
              width: 15,
              height: 15,
              alignItems: "center",
              justifyContent: "center",
              top: 2,
              right: 2,
              zIndex: 1000,
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.body5,
                lineHeight: 18,
                fontSize: 10,
              }}
            >
              3
            </Text>
          </View>
          <Image
            source={icons.info}
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.black,
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
