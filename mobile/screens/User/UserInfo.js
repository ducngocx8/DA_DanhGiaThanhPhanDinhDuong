import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES, dummyData, FONTS, icons } from "../../constants";
import HeaderDrawerChild from "../../components/HeaderDrawerChild";
import { TouchableOpacity } from "react-native";
import { BACKEND_BASE, BACKEND_HOME, UserInfoURL } from "../../api";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { BUILD_ANDROID, notify } from "../../utils/variable";
import LoginViewMoreNonTab from "../../components/LoginViewMoreNonTab";

export default function UserInfo({ navigation }) {
  const [loading, isLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [login, setLogin] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await axios.get(`${UserInfoURL}`, {
        withCredentials: true,
      });
      if (response.data.status) {
        setUserInfo(response.data.data);
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
        await Promise.all([Promise.resolve(getUserInfo())]);
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
              title={"Tài khoản của tôi"}
              navigation={navigation}
              rightComponent={
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ChangeUserInfo");
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
            {/* Logo, name, xác thực */}
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Image
                source={
                  userInfo?.image_url
                    ? { uri: BACKEND_HOME + userInfo.image_url }
                    : icons.user_no_image
                }
                style={{ width: 40, height: 40, borderRadius: SIZES.radius }}
              />
              <View
                style={{
                  marginLeft: SIZES.radius,
                }}
              >
                <Text
                  style={{
                    ...FONTS.h3,
                  }}
                >
                  {userInfo?.lastname && userInfo?.firstname
                    ? userInfo?.lastname + " " + userInfo?.firstname
                    : "Chưa cập nhật"}
                </Text>
                <Text style={{ ...FONTS.body4, color: COLORS.primary }}>
                  {Number(userInfo?.user_status) === 2
                    ? "Đã xác thực"
                    : Number(userInfo?.user_status) === 1
                    ? "Chưa kích hoạt"
                    : "Đã bị khóa"}
                </Text>
              </View>
            </View>
            {/* End Logo, name, xác thực  */}

            {/* Info */}
            <View
              style={{
                marginTop: SIZES.padding,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ ...FONTS.body3 }}>Họ và tên</Text>
                <Text style={{ ...FONTS.body3 }}>
                  {userInfo?.lastname && userInfo?.firstname
                    ? userInfo?.lastname + " " + userInfo?.firstname
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
                <Text style={{ ...FONTS.body3 }}>Username</Text>
                <Text style={{ ...FONTS.body3 }}>
                  {userInfo?.username || "Chưa cập nhật"}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: SIZES.radius,
                }}
              >
                <Text style={{ ...FONTS.body3 }}>Địa chỉ email</Text>
                <Text style={{ ...FONTS.body3 }}>
                  {userInfo?.email || "Chưa cập nhật"}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: SIZES.radius,
                }}
              >
                <Text style={{ ...FONTS.body3 }}>Số điện thoại</Text>
                <Text style={{ ...FONTS.body3 }}>
                  {userInfo?.phonenumber || "Chưa cập nhật"}
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
