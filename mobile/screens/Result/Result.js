import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES } from "../../constants";

export default function Result({ route, navigation }) {
  const {
    icon,
    resultText,
    resultMessage,
    resultButtonText,
    screenName,
    routeScreen,
  } = route.params;

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: SIZES.padding,
        backgroundColor: COLORS.white,
        paddingTop: SIZES.padding * 2.5,
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={icon}
          style={{
            width: 200,
            height: 200,
          }}
        />
        <Text
          style={{
            ...FONTS.h2,
            marginTop: SIZES.base,
            textAlign: "center",
          }}
        >
          {resultText}
        </Text>
        <Text
          style={{
            ...FONTS.body3,
            color: COLORS.gray,
            marginTop: SIZES.padding,
            textAlign: "center",
            lineHeight: 27,
          }}
        >
          {resultMessage}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          paddingVertical: SIZES.radius,
          backgroundColor: COLORS.primary,
          marginBottom: SIZES.padding,
          borderRadius: SIZES.radius,
        }}
        onPress={() => {
          screenName.trim()
            ? navigation.navigate(screenName, routeScreen)
            : navigation.goBack();
        }}
      >
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.white,
            textAlign: "center",
          }}
        >
          {resultButtonText}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
