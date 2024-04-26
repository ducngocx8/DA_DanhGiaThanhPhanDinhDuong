import React, { memo, useEffect, useState } from "react";
import { TouchableOpacity, View, Image, Text, FlatList } from "react-native";
import { BACKEND_BASE, BACKEND_HOME, MonAnYeuThichURL } from "../../api";
import { COLORS, SIZES, icons, FONTS } from "../../constants";
import { BUILD_ANDROID, imageMonAnRandom, notify } from "../../utils/variable";
import axios from "axios";
import HeaderDrawerChild from "../../components/HeaderDrawerChild";
import { useIsFocused } from "@react-navigation/native";
import LoginViewMoreNonTab from "../../components/LoginViewMoreNonTab";

function FavouriteFood({ navigation }) {
  const isFocused = useIsFocused();
  const [login, setLogin] = useState(false);
  const [loading, isLoading] = useState(true);
  const [monAnList, setMonAnList] = useState([]);
  useEffect(() => {
    async function checkPermission() {
      const response = await axios.get(`${BACKEND_BASE + "/check/all"}`, {
        withCredentials: true,
      });
      if (!response.data.status) {
        return false;
      } else return true;
    }

    async function getMonAnYeuThich() {
      const response = await axios.get(`${MonAnYeuThichURL}`, {
        withCredentials: true,
      });
      if (response.data.status) {
        setMonAnList(response.data.data);
      } else {
        notify(false, response.data.message);
      }
    }

    const handleAPIAll = async () => {
      const check = await checkPermission();
      if (check) {
        await Promise.all([Promise.resolve(getMonAnYeuThich())]);
        setLogin(true);
        isLoading(false);
      } else {
        setLogin(false);
        isLoading(false);
      }
    };
    handleAPIAll();
  }, [isFocused]);
  return (
    <>
      {loading ? (
        ""
      ) : login ? (
        <View
          style={{
            flex: 1,
            paddingTop: BUILD_ANDROID ? 14 : SIZES.padding * 2,
            backgroundColor: COLORS.primary,
          }}
        >
          <View
            style={{
              paddingHorizontal: SIZES.padding,
            }}
          >
            <HeaderDrawerChild
              navigation={navigation}
              title={"Món ăn yêu thích"}
              disableRight={true}
            />
          </View>

          <View
            style={{
              marginTop: SIZES.base,
              backgroundColor: COLORS.white,
              paddingHorizontal: SIZES.padding,
              paddingVertical: SIZES.padding,
              flex: 1,
            }}
          >
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.blue,
              }}
            >
              Danh sách món ăn yêu thích:
            </Text>

            {monAnList.length === 0 ? (
              <Text
                style={{
                  textAlign: "center",
                  ...FONTS.body4,
                  marginTop: SIZES.radius,
                }}
              >
                Danh sách hiện đang trống
              </Text>
            ) : (
              <FlatList
                contentContainerStyle={{
                  marginTop: SIZES.radius,
                }}
                data={monAnList}
                horizontal={false}
                keyExtractor={(item) => `${item.id_monan}`}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        navigation.navigate("FoodDetail", {
                          id_monan: item.id_monan,
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
                          marginTop: 20,
                          height: 80,
                          width: 80,
                          borderRadius: 80,
                          marginLeft: 5,
                        }}
                      />
                      {/* Info */}
                      <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={{ ...FONTS.h3 }}>{item.ten_mon}</Text>
                        <Text style={{ color: COLORS.gray, ...FONTS.body5 }}>
                          Protein: {Number(item.PROCNT).toFixed(0)}g
                        </Text>
                        <Text style={{ color: COLORS.gray, ...FONTS.body5 }}>
                          Carbohydrate: {Number(item.CHOCDF).toFixed(0)}g
                        </Text>
                        <Text style={{ color: COLORS.gray, ...FONTS.body5 }}>
                          Fat: {Number(item.FAT).toFixed(0)}g
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
                          {Number(item.ENERC).toFixed(0)} Calories
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            )}
          </View>
        </View>
      ) : (
        <LoginViewMoreNonTab navigation={navigation} />
      )}
    </>
  );
}

export default memo(FavouriteFood);
