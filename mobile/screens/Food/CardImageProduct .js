import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import { COLORS, SIZES, icons, FONTS } from "../../constants";
import { imageMonAnRandom } from "../../utils/variable";
import { BACKEND_HOME } from "../../api";

function CardImageProduct({
  tongThanhPhanChinh,
  favourite,
  setFavourite,
  image_url,
}) {
  return (
    <View
      style={{
        marginTop: SIZES.padding,
        backgroundColor: COLORS.lightGray2,
        borderRadius: SIZES.radius,
        alignItems: "center",
        height: 190,
        padding: SIZES.radius,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={icons.calo}
            style={{
              width: 20,
              height: 20,
            }}
          />
          <Text
            style={{
              ...FONTS.body4,
              color: COLORS.gray,
              marginLeft: 2,
            }}
          >
            {tongThanhPhanChinh.ENERC} calories
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            setFavourite();
          }}
        >
          <Image
            source={icons.love}
            style={{
              width: 20,
              height: 20,
              tintColor: favourite ? COLORS.red : COLORS.gray,
            }}
          />
        </TouchableOpacity>
      </View>

      <Image
        style={{
          height: 140,
          width: 140,
          borderRadius: 70
        }}
        source={
          image_url
            ? { uri: BACKEND_HOME + image_url }
            : imageMonAnRandom[0]
        }
      />
    </View>
  );
}

export default memo(CardImageProduct);
