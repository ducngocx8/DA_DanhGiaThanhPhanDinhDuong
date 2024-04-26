import React, { memo } from "react";
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { COLORS, SIZES, icons, FONTS } from "../constants";
import { imageMonAnRandom } from "../utils/variable";
import { BACKEND_HOME } from "../api";

function VerticalFoodCard({
  monAnList,
  navigation,
  handleLoadMore,
  endList,
  bua_an_id,
}) {
  return (
    <FlatList
      contentContainerStyle={{
        marginTop: SIZES.base,
        marginHorizontal: SIZES.padding,
        paddingBottom: 340,
      }}
      data={monAnList}
      horizontal={false}
      keyExtractor={(item) => `${item.id_monan}`}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={150}
      onEndReachedThreshold={0.01}
      onEndReached={endList ? null : handleLoadMore}
      ListFooterComponent={() =>
        endList ? (
          <Text
            style={{
              textAlign: "center",
              ...FONTS.body4,
            }}
          >
            Đã tới cuối danh sách
          </Text>
        ) : (
          <ActivityIndicator size="small" color="#00ff00" />
        )
      }
      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              navigation.navigate("FoodDetail", {
                id_monan: item.id_monan,
                bua_an_id,
              });
            }}
            style={{
              flexDirection: "row",
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightGray2,
              height: 130,
              alignItems: "center",
              marginBottom: SIZES.radius,
            }}
          >
            {/* Image  */}
            <Image
              source={
                item.image_url
                  ? { uri: BACKEND_HOME + item.image_url }
                  : imageMonAnRandom[0]
              }
              style={{
                height: 80,
                width: 80,
                marginLeft: 10,
                borderRadius: 40,
              }}
            />
            {/* Info */}
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={{ ...FONTS.h3 }}>{item.ten_mon}</Text>
              <Text style={{ color: COLORS.gray, ...FONTS.body5 }}>
                Protein: {Number(item.TOTAL_PROCNT).toFixed(0)}g
              </Text>
              <Text style={{ color: COLORS.gray, ...FONTS.body5 }}>
                Carbohydrate: {Number(item.TOTAL_CHOCDF).toFixed(0)}g
              </Text>
              <Text style={{ color: COLORS.gray, ...FONTS.body5 }}>
                Fat: {Number(item.TOTAL_FAT).toFixed(0)}g
              </Text>
            </View>

            {/* Calo  */}
            <View
              style={{
                flexDirection: "row",
                position: "absolute",
                top: 2,
                right: 30,
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 20, height: 20 }}
                source={icons.calories}
              />
              <Text
                style={{
                  color: COLORS.primary,
                  ...FONTS.body5,
                }}
              >
                {Number(item.TOTAL_ENERC).toFixed(0)} Calories
              </Text>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}

export default memo(VerticalFoodCard);
