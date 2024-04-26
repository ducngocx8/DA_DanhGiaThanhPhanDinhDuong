import { Image, Text } from "react-native";
import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home/Home";
import Food from "./Food/Food";
import Progress from "./Progress/Progress";
import Plan from "./Plan/Plan";
import { connect } from "react-redux";
import { setSelectedTab } from "../stores/tab/tabAction";
import { COLORS, FONTS, SIZES, icons } from "../constants";
import { Header } from "../components";
import { TouchableOpacity } from "react-native";
import ThucPham from "./ThucPham/ThucPham";
import { BACKEND_HOME } from "../api";
import { useIsFocused } from "@react-navigation/native";
import { BUILD_ANDROID } from "../utils/variable";

const Tab = createBottomTabNavigator();

function MainScreen({ selectedTab, setSelectedTab, navigation, userLogin }) {
  console.log("selectedTab P1 =", selectedTab.title);
  const isFocused = useIsFocused();
  useEffect(() => {}, [isFocused]);
  const HeaderBottomBar = (navigation) => {
    return (
      <Header
        title={selectedTab.title.toUpperCase()}
        containerStyle={{
          height: 50,
          paddingHorizontal: SIZES.padding,
          marginTop: BUILD_ANDROID ? 0: 40,
          alignItems: "center",
        }}
        leftComponent={
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: COLORS.gray2,
              borderRadius: SIZES.radius,
            }}
            onPress={() => {
              navigation.openDrawer();
            }}
          >
            <Image
              source={icons.menu}
              style={{
                width: 20,
                height: 20,
              }}
            />
          </TouchableOpacity>
        }
        rightComponent={
          <TouchableOpacity
            onPress={() => {
              if (userLogin) {
                navigation.navigate("UserInfo");
              } else {
                navigation.navigate("SignIn");
              }
            }}
            style={{
              alignItems: "center",
              justifyContent: "center",
              borderRadius: SIZES.radius,
            }}
          >
            <Image
              style={{
                width: 40,
                height: 40,
                borderRadius: SIZES.radius,
              }}
              source={
                userLogin && userLogin.image_url.trim() !== ""
                  ? { uri: BACKEND_HOME + userLogin.image_url }
                  : icons.user_no_image
              }
            />
          </TouchableOpacity>
        }
      />
    );
  };

  return (
    <Tab.Navigator
      initialRouteName={selectedTab.title}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          position: "absolute",
          bottom: 0,
          height: 65,
          marginHorizontal: 0,
          shadowColor: "#000",
          shadowOpacity: 0.06,
          shadowOffset: {
            width: 10,
            height: 10,
          },
        },
        tabBarIcon: ({ focused }) => {
          if (route.name === "Thực phẩm") {
            return (
              <Image
                source={icons.duong_chat_thuc_pham_bold}
                tintColor={focused ? COLORS.primary : COLORS.gray}
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            );
          } else if (route.name === "Món ăn") {
            return (
              <Image
                source={icons.recipe}
                tintColor={focused ? COLORS.primary : COLORS.gray}
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            );
          } else if (route.name === "Dinh dưỡng") {
            return (
              <Image
                source={icons.house}
                tintColor={focused ? COLORS.primary : COLORS.gray}
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            );
          } else if (route.name === "Thống kê") {
            return (
              <Image
                source={icons.progress}
                tintColor={focused ? COLORS.primary : COLORS.gray}
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            );
          } else if (route.name === "Mục tiêu") {
            return (
              <Image
                source={icons.plan}
                tintColor={focused ? COLORS.primary : COLORS.gray}
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            );
          }
        },
        tabBarLabel: ({ focused }) => {
          if (route.name === "Thực phẩm") {
            return (
              <Text
                style={{
                  ...FONTS.body5,
                  color: focused ? COLORS.primary : COLORS.gray,
                }}
              >
                {route.name}
              </Text>
            );
          } else if (route.name === "Món ăn") {
            return (
              <Text
                style={{
                  ...FONTS.body5,
                  color: focused ? COLORS.primary : COLORS.gray,
                }}
              >
                {route.name}
              </Text>
            );
          } else if (route.name === "Dinh dưỡng") {
            return (
              <Text
                style={{
                  ...FONTS.body5,
                  color: focused ? COLORS.primary : COLORS.gray,
                }}
              >
                {route.name}
              </Text>
            );
          } else if (route.name === "Thống kê") {
            return (
              <Text
                style={{
                  ...FONTS.body5,
                  color: focused ? COLORS.primary : COLORS.gray,
                }}
              >
                {route.name}
              </Text>
            );
          } else if (route.name === "Mục tiêu") {
            return (
              <Text
                style={{
                  ...FONTS.body5,
                  color: focused ? COLORS.primary : COLORS.gray,
                }}
              >
                {route.name}
              </Text>
            );
          }
        },
      })}
      activeColor={COLORS.red}
      inactiveColor="#3e2465"
      backBehavior="initialRoute"
    >
      <Tab.Screen
        name="Thực phẩm"
        children={() => (
          <ThucPham
            HeaderBottomBar={HeaderBottomBar(navigation)}
            navigation={navigation}
          />
        )}
        listeners={{
          tabPress: (e) => {
            setSelectedTab({
              code: "Nutrition",
              title: "Thực phẩm",
            });
          },
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Món ăn"
        children={() => (
          <Food
            HeaderBottomBar={HeaderBottomBar(navigation)}
            navigation={navigation}
          />
        )}
        listeners={{
          tabPress: (e) => {
            setSelectedTab({
              code: "Food",
              title: "Món ăn",
            });
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Dinh dưỡng"
        children={() => (
          <Home
            HeaderBottomBar={HeaderBottomBar(navigation)}
            navigation={navigation}
          />
        )}
        listeners={{
          tabPress: (e) => {
            setSelectedTab({
              code: "Home",
              title: "Trang chủ",
            });
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Thống kê"
        children={() => (
          <Progress
            HeaderBottomBar={HeaderBottomBar(navigation)}
            navigation={navigation}
          />
        )}
        listeners={{
          tabPress: (e) => {
            setSelectedTab({
              code: "Progress",
              title: "Thống kê",
            });
          },
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Mục tiêu"
        children={() => (
          <Plan
            HeaderBottomBar={HeaderBottomBar(navigation)}
            navigation={navigation}
          />
        )}
        listeners={{
          tabPress: (e) => {
            setSelectedTab({
              code: "Plan",
              title: "Mục tiêu",
            });
          },
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}

const mapStateToProps = (state) => {
  return {
    selectedTab: state.tabReducer.selectedTab,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedTab: (selectedTab) => {
      dispatch(setSelectedTab(selectedTab));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
