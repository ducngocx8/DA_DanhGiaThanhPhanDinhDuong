import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React, { memo, useState, useEffect } from "react";
import { SIZES, icons, FONTS, COLORS, images } from "../constants";
import { BUILD_ANDROID, imageMonAnRandom } from "../utils/variable";
import { BACKEND_HOME, MonAnURL } from "../api";
import axios from "axios";

function FoodSearchValue({ navigation, searchInput, rangeFilter, bua_an_id }) {
  let [monAnSearchList, setMonAnSearchList] = useState([]);
  useEffect(() => {
    const handleGetResultSearch = async () => {
      let cateSelected = -1;
      const category_id =
        cateSelected === -1 ? "" : "&category_id=" + cateSelected;
      const params = `/search?keyword=${searchInput}&sort_type=${rangeFilter.sortType}&energy_from=${rangeFilter.energy[0]}&energy_to=${rangeFilter.energy[1]}&protein_from=${rangeFilter.protein[0]}&protein_to=${rangeFilter.protein[1]}&fat_from=${rangeFilter.fat[0]}&fat_to=${rangeFilter.fat[1]}&cabs_from=${rangeFilter.carb[0]}&cabs_to=${rangeFilter.carb[1]}${category_id}`;
      const response = await axios.get(`${MonAnURL + "/" + params}`);
      if (response.data.status) {
        setMonAnSearchList(response.data.data);
      } else {
        notify(false, response.data.message);
        setMonAnSearchList([]);
      }
    };

    if (searchInput.trim() !== "") {
      handleGetResultSearch();
    } else {
      setMonAnSearchList([]);
    }
  }, [searchInput, rangeFilter]);

  return (
    <View
      style={{
        position: "absolute",
        backgroundColor: COLORS.white,
        top: BUILD_ANDROID ? 100 : 150,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 200,
      }}
    >
      <FlatList
        data={monAnSearchList}
        horizontal={false}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
          marginTop: SIZES.radius,
          paddingBottom: 10,
        }}
        keyExtractor={(item) => `${item.id_monan}`}
        showsHorizontalScrollIndicator={false}
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
                marginBottom: 5,
              }}
            >
              <Image
                source={
                  item.image_url
                    ? { uri: BACKEND_HOME + item.image_url }
                    : images.com_tam_cha
                }
                style={{ width: 50, height: 50, borderRadius: 50 }}
              />
              <View
                style={{
                  marginLeft: 5,
                }}
              >
                <Text
                  style={{
                    ...FONTS.h4,
                  }}
                >
                  {item.ten_mon}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={icons.calories}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                  <Text
                    style={{
                      ...FONTS.body5,
                    }}
                  >
                    {Number(item.TOTAL_ENERC).toFixed(0)} Kcal
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <View
        style={{
          marginBottom: 65,
        }}
      ></View>
    </View>
  );
}

export default memo(FoodSearchValue);