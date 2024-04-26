import { View, StyleSheet, Text } from "react-native";
import React, { memo } from "react";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { COLORS, SIZES, FONTS } from "../constants";

const TwoPointSlider = ({
  values,
  min,
  max,
  postfix,
  onChangeValue,
  prefix,
  ref,
}) => {
  return (
    <MultiSlider
      values={values}
      ref={ref}
      min={min}
      max={max}
      step={1}
      markerOffsetY={20}
      selectedStyle={{
        backgroundColor: COLORS.primary,
      }}
      trackStyle={{
        height: 10,
        borderRadius: 10,
        backgroundColor: COLORS.lightGray2, // Phan khong duoc chon
      }}
      minMarkerOverlapDistance={50} // Min Khoang cach 2 marker
      customMarker={(e) => {
        return (
          <View
            style={{
              height: 60,
              width: 100,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                borderWidth: 4,
                borderColor: COLORS.white,
                backgroundColor: COLORS.primary,
                ...styles.shadow,
              }}
            ></View>
            <Text style={{ marginTop: 5, color: COLORS.darkGray, ...FONTS.h3 }}>
              {prefix}
              {e.currentValue} {postfix}
            </Text>
          </View>
        );
      }}
      sliderLength={SIZES.width - 2 * SIZES.padding - 60}
      onValuesChange={(values) => {
        onChangeValue(values);
      }}
    />
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 1,
    shadowOpacity: 0.2,
  },
});

export default memo(TwoPointSlider);
