import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES, FONTS } from "../../constants";
import DinhDuongProgress from "./DinhDuongProgress";
import ChiSoUserProgress from "./ChiSoUserProgress";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { BACKEND_BASE } from "../../api";
import LoginViewMore from "../../components/LoginViewMore";

// length > 5 =>  (SIZES.width / 5) * length
export default function Progress({ HeaderBottomBar, navigation }) {
  const isFocused = useIsFocused();
  const [itemChoose, setItemChoose] = useState("DINHDUONG");
  const [loading, isLoading] = useState(true);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    async function checkPermission() {
      const response = await axios.get(`${BACKEND_BASE + "/check/customer"}`, {
        withCredentials: true,
      });
      if (!response.data.status) {
        return false;
      } else return true;
    }

    const handleAPIAll = async () => {
      const check = await checkPermission();
      if (check) {
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
            backgroundColor: COLORS.white,
          }}
        >
          {/* Render Header */}
          {HeaderBottomBar}
          <View
            style={{
              paddingHorizontal: SIZES.padding,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginTop: SIZES.radius,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (itemChoose !== "DINHDUONG") {
                    setItemChoose("DINHDUONG");
                  }
                }}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor:
                    itemChoose === "DINHDUONG" ? COLORS.primary : COLORS.white,
                  paddingVertical: 5,
                }}
              >
                <Text
                  style={{
                    color: COLORS.gray,
                    ...FONTS.body3,
                  }}
                >
                  Thống kê dinh dưỡng
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (itemChoose !== "CANNANG") {
                    setItemChoose("CANNANG");
                  }
                }}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor:
                    itemChoose === "CANNANG" ? COLORS.primary : COLORS.white,
                  marginLeft: SIZES.radius,
                  paddingVertical: 5,
                }}
              >
                <Text
                  style={{
                    color: COLORS.gray,
                    ...FONTS.body3,
                  }}
                >
                  Thống kê cân nặng
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {itemChoose === "DINHDUONG" ? (
                <DinhDuongProgress navigation={navigation} />
              ) : (
                <ChiSoUserProgress navigation={navigation} />
              )}
              <View
                style={{
                  marginBottom: 200,
                }}
              ></View>
            </ScrollView>
          </View>
        </View>
      ) : (
        <LoginViewMore navigation={navigation} />
      )}
    </>
  );
}
