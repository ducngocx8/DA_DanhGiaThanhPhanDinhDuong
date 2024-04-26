import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { MainScreen } from "../screens";
import { COLORS, FONTS, SIZES, icons } from "../constants";
import { connect } from "react-redux";
import { setSelectedTab } from "../stores/tab/tabAction";
import { BACKEND_BASE, BACKEND_HOME } from "../api";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { ROLE_CUSTOMER } from "../utils/variable";

const CustomDrawerItem = ({ label, icon, isFocused, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        height: 40,
        marginBottom: SIZES.base,
        alignItems: "center",
        paddingLeft: SIZES.base,
        borderRadius: SIZES.base,
        backgroundColor: isFocused ? COLORS.transparentBlack1 : null,
      }}
      onPress={onPress}
    >
      <Image
        source={icon}
        style={{ width: 20, height: 20, tintColor: COLORS.white }}
      />
      <Text style={{ marginLeft: 15, color: COLORS.white, ...FONTS.h3 }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const CustomDrawerContent = ({
  navigation,
  selectedTab,
  setSelectedTabFuction,
  userLogin,
  setUserLogin,
}) => {
  const handleLogout = async () => {
    const response = await axios.get(`${BACKEND_BASE + "/account/logout"}`, {
      withCredentials: true,
    });
    if (response.data.status) {
      setUserLogin(null);
      navigation.navigate("SignIn");
    }
  };
  return (
    <DrawerContentScrollView
      scrollEnabled={true}
      contentContainerStyle={{ flex: 1 }}
    >
      <View style={{ flex: 1, paddingHorizontal: SIZES.radius }}>
        {/* Close */}
        <View
          style={{
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <TouchableOpacity
            style={{ alignItems: "center", justifyContent: "center" }}
            onPress={() => navigation.closeDrawer()}
          >
            <Image
              source={icons.cross}
              style={{
                width: 35,
                height: 35,
                tintColor: COLORS.white,
              }}
            />
          </TouchableOpacity>
        </View>
        {/* Profile */}
        {userLogin ? (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              marginTop: SIZES.radius,
              alignItems: "center",
            }}
            onPress={() => {
              navigation.navigate("UserInfo");
            }}
          >
            <Image
              source={
                userLogin.image_url.trim() !== ""
                  ? { uri: BACKEND_HOME + userLogin.image_url }
                  : icons.user_no_image
              }
              style={{ width: 50, height: 50, borderRadius: 50 }}
            />
            <View style={{ marginLeft: SIZES.radius }}>
              <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                {userLogin.username}
              </Text>
              <Text style={{ color: COLORS.white, ...FONTS.body4 }}>
                Xem thông tin cá nhân
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              marginTop: SIZES.radius,
              alignItems: "center",
            }}
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Image
              source={icons.user_no_image}
              style={{ width: 50, height: 50, borderRadius: SIZES.radius }}
            />
            <View style={{ marginLeft: SIZES.radius }}>
              <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                Đăng nhập
              </Text>
            </View>
          </TouchableOpacity>
        )}

        {/* DrawItem */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: SIZES.padding, flex: 1 }}>
            {/* Line Divider */}
            <View
              style={{
                height: 1,
                marginBottom: SIZES.radius,
                marginLeft: SIZES.radius,
                backgroundColor: COLORS.lightGray1,
              }}
            ></View>

            <CustomDrawerItem
              label={"Dưỡng chất thực phẩm"}
              icon={icons.duong_chat_thuc_pham_bold}
              onPress={() => {
                navigation.navigate("DuongChatThucPham");
              }}
            />
            <CustomDrawerItem
              label={"Dưỡng chất món ăn"}
              icon={icons.duong_chat_mon_an_bold}
              onPress={() => {
                navigation.navigate("DuongChatMonAn");
              }}
            />
            <CustomDrawerItem
              label={"Chỉ số đường huyết"}
              icon={icons.gi_bold}
              onPress={() => {
                navigation.navigate("ChiSoDuongHuyet");
              }}
            />
            <CustomDrawerItem
              label={"Nhu cầu dinh dưỡng"}
              icon={icons.nhu_cau_dinh_duong_bold}
              onPress={() => {
                navigation.navigate("NhuCauDinhDuong");
              }}
            />

            <CustomDrawerItem
              label={"Gợi ý thực đơn"}
              icon={icons.menu_mon}
              onPress={() => {
                navigation.navigate("GoiYThucDon");
              }}
            />

            <CustomDrawerItem
              label={"Thông báo"}
              icon={icons.notification_light}
              onPress={() => {
                navigation.navigate("Notification");
              }}
            />

            {userLogin && (
              <>
                <View
                  style={{
                    height: 1,
                    marginVertical: SIZES.radius,
                    marginLeft: SIZES.radius,
                    backgroundColor: COLORS.lightGray1,
                  }}
                ></View>

                {userLogin.role === ROLE_CUSTOMER && (
                  <>
                    <CustomDrawerItem
                      label={"Tính tổng thành phần"}
                      icon={icons.coupon}
                      onPress={() => {
                        navigation.navigate("TongThanhPhanTP");
                      }}
                    />
                    <CustomDrawerItem
                      label={"Quản lý mục tiêu"}
                      icon={icons.goal_bold}
                      onPress={() => {
                        navigation.navigate("QuanLyMucTieu");
                      }}
                    />
                    <CustomDrawerItem
                      label={"Quản lý món ăn"}
                      icon={icons.food_bold}
                      onPress={() => {
                        navigation.navigate("QuanLyMonAn");
                      }}
                    />
                    <CustomDrawerItem
                      label={"Món ăn yêu thích"}
                      icon={icons.favourite}
                      onPress={() => {
                        navigation.navigate("FavouriteFood");
                      }}
                    />
                    <CustomDrawerItem
                      label={"Chỉ số cá nhân"}
                      icon={icons.user_index_bold}
                      onPress={() => {
                        navigation.navigate("IndexUser");
                      }}
                    />
                  </>
                )}

                <CustomDrawerItem
                  label={"Thay đổi mật khẩu"}
                  icon={icons.setting}
                  onPress={() => {
                    navigation.navigate("ChangePassword");
                  }}
                />
              </>
            )}
          </View>
        </ScrollView>

        {userLogin && (
          <View style={{ marginBottom: SIZES.padding }}>
            <CustomDrawerItem
              label={"Logout"}
              icon={icons.logout}
              onPress={() => {
                handleLogout();
              }}
            />
          </View>
        )}
      </View>
    </DrawerContentScrollView>
  );
};

const Drawer = createDrawerNavigator();

const CustomDrawer = ({ selectedTab, setSelectedTabFuction }) => {
  console.log("LALA");
  console.log("selectedTab", selectedTab);
  const isFocused = useIsFocused();
  let [loading, isLoading] = useState(true);
  const [userLogin, setUserLogin] = useState(null);
  useEffect(() => {
    console.log("CHECK PERMIT");
    async function checkPermission() {
      const response = await axios.get(`${BACKEND_BASE + "/check/all"}`, {
        withCredentials: true,
      });
      if (response.data.status) {
        setUserLogin({
          username: response.data.username,
          image_url: response.data.image_url,
          role: response.data.role,
        });
      } else {
        // setSelectedTabFuction({
        //   code: "Nutrition",
        //   title: "Thực phẩm",
        // });
      }
      isLoading(false);
    }
    checkPermission();
  }, [isFocused]);

  return (
    <>
      {loading ? (
        ""
      ) : (
        <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
          <Drawer.Navigator
            screenOptions={{
              drawerType: "slide",
              overlayColor: "transparent",
              drawerStyle: {
                flex: 1,
                width: "65%",
                paddingRight: 20,
                backgroundColor: "transparent",
              },
              headerShown: false,
              sceneContainerStyle: {
                backgroundColor: "transparent",
              },
            }}
            drawerContent={(props) => {
              return (
                <CustomDrawerContent
                  navigation={props.navigation}
                  selectedTab={selectedTab}
                  setSelectedTabFuction={setSelectedTabFuction}
                  userLogin={userLogin}
                  setUserLogin={(userLogin) => {
                    setUserLogin(userLogin);
                  }}
                />
              );
            }}
            initialRouteName="MainSCreen"
          >
            <Drawer.Screen name="MainSCreen">
              {(props) => (
                <MainScreen
                  {...props}
                  userLogin={userLogin}
                  setUserLogin={(userLogin) => {
                    setUserLogin(userLogin);
                  }}
                />
              )}
            </Drawer.Screen>
          </Drawer.Navigator>
        </View>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedTab: state.tabReducer.selectedTab,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedTabFuction: (selectedTab) => {
      dispatch(setSelectedTab(selectedTab));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);
