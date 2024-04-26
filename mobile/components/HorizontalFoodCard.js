import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { COLORS, SIZES, icons, FONTS } from "../constants";

const HorizontalFoodCard = ({ containerStyle, imageStyle, item, onPress }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: "row",
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
          ...containerStyle,
        }}
      >
        {/* Image  */}
        <Image source={item.image} style={{ ...imageStyle }} />
        {/* Info */}
        <View style={{ flex: 1 }}>
          <Text style={{ ...FONTS.h3}}>
            {item.name}
          </Text>
          <Text style={{ color: COLORS.gray, ...FONTS.body5 }}>
            {item.description.slice(0, 30)}
          </Text>
          <Text
            style={{ marginTop: SIZES.base, ...FONTS.h3 }}
          >
            ${item.price}
          </Text>
        </View>

        {/* Calo  */}
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            top: 10,
            right: 30,
            alignItems: "center",
          }}
        >
          <Image style={{ width: 20, height: 20 }} source={icons.calories} />
          <Text
            style={{
              color: COLORS.primary,
              ...FONTS.body5,
            }}
          >
            {item.calories} Calories
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HorizontalFoodCard;
