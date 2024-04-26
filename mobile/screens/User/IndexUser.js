import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES, FONTS } from "../../constants";
import HeaderDrawerChild from "../../components/HeaderDrawerChild";
import { TouchableOpacity } from "react-native";
import { BACKEND_BASE, ChiSoUserLastURL } from "../../api";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { convertToDate } from "../../utils/date";
import { BUILD_ANDROID, notify } from "../../utils/variable";
import LoginViewMoreNonTab from "../../components/LoginViewMoreNonTab";
export default function IndexUser({ navigation }) {
  const [loading, isLoading] = useState(true);
  const [login, setLogin] = useState(false);
  const [indexInfo, setIndexInfo] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getIndexInfo = async () => {
      const response = await axios.get(`${ChiSoUserLastURL}`);
      if (response.data.status) {
        setIndexInfo(response.data.data);
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigation.navigate("LoginViewMoreNonTab");
        }
      }
    };

    async function checkPermission() {
      const response = await axios.get(`${BACKEND_BASE + "/check/all"}`, {
        withCredentials: true,
      });
      if (!response.data.status) {
        return false;
      } else return true;
    }

    const handleAPIAll = async () => {
      const check = await checkPermission();
      if (check) {
        await Promise.all([Promise.resolve(getIndexInfo())]);
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
            paddingTop: BUILD_ANDROID ? 8 : SIZES.padding * 2,
            backgroundColor: COLORS.primary,
          }}
        >
          <View
            style={{
              paddingHorizontal: SIZES.padding,
            }}
          >
            <HeaderDrawerChild
              title={"Chỉ số cá nhân"}
              navigation={navigation}
              rightComponent={
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ChangeIndex");
                  }}
                  style={{}}
                >
                  <Text style={{ ...FONTS.h3, color: COLORS.white }}>
                    Chỉnh sửa
                  </Text>
                </TouchableOpacity>
              }
            />
          </View>
          <View
            style={{
              paddingHorizontal: SIZES.padding,
              backgroundColor: COLORS.white,
              paddingVertical: SIZES.radius,
              flex: 1,
            }}
          >
            {/* Info */}
            <View
              style={{
                marginTop: SIZES.radius,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ ...FONTS.body3 }}>Chiều cao (cm)</Text>
                <Text style={{ ...FONTS.body3 }}>
                  {indexInfo?.height || "Chưa cập nhật"}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: SIZES.radius,
                }}
              >
                <Text style={{ ...FONTS.body3 }}>Cân nặng (kg)</Text>
                <Text style={{ ...FONTS.body3 }}>
                  {Number(indexInfo?.weight) * 1 || "Chưa cập nhật"}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: SIZES.radius,
                }}
              >
                <Text style={{ ...FONTS.body3 }}>Độ tuổi</Text>
                <Text style={{ ...FONTS.body3 }}>
                  {indexInfo?.age || "Chưa cập nhật"}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: SIZES.radius,
                }}
              >
                <Text style={{ ...FONTS.body3 }}>Giới tính</Text>
                <Text style={{ ...FONTS.body3 }}>
                  {indexInfo?.gender === "M"
                    ? "Nam"
                    : indexInfo?.gender === "F"
                    ? "Nữ"
                    : "Chưa cập nhật"}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: SIZES.radius,
                }}
              >
                <Text style={{ ...FONTS.body3 }}>Mức độ vận động</Text>
                <Text style={{ ...FONTS.body3 }}>
                  {indexInfo?.LaoDong.TenLaoDong || "Chưa cập nhật"}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: SIZES.radius,
                }}
              >
                <Text style={{ ...FONTS.body3 }}>Đối tượng</Text>
                <Text style={{ ...FONTS.body3 }}>
                  {indexInfo?.DoiTuong.TenDoiTuong || "Chưa cập nhật"}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: SIZES.radius,
                }}
              >
                <Text style={{ ...FONTS.body3 }}>Cập nhật lần cuối</Text>
                <Text style={{ ...FONTS.body3 }}>
                  {indexInfo?.time_update
                    ? convertToDate(indexInfo?.time_update)
                    : "Chưa cập nhật"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <LoginViewMoreNonTab navigation={navigation} />
      )}
    </>
  );
}
