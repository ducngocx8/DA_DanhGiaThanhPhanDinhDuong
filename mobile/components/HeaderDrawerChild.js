import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, SIZES, icons, FONTS } from "../constants";

export default function HeaderDrawerChild({
  title,
  navigation,
  disableRight,
  rightComponent,
}) {
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
          source={icons.back}
          style={{
            width: 20,
            height: 20,
            tintColor: COLORS.white,
          }}
        />
      </TouchableOpacity>
      {/* Title */}
      <Text
        style={{
          flex: 1,
          textAlign: "center",
          ...FONTS.h3,
          color: COLORS.white,
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
       rightComponent
      // <TouchableOpacity
      //     style={{
      //       borderWidth: 1,
      //       borderColor: COLORS.white,
      //       width: 40,
      //       height: 40,
      //       alignItems: "center",
      //       justifyContent: "center",
      //       borderRadius: SIZES.radius,
      //     }}
      //   >
      //     <Image
      //       source={icons.info}
      //       style={{
      //         width: 20,
      //         height: 20,
      //         tintColor: COLORS.white,
      //       }}
      //     />
      //   </TouchableOpacity>
      )}
    </View>
  );
}
