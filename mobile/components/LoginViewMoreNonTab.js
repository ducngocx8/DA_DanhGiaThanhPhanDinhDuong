import { View, Text, Image, TouchableOpacity, BackHandler } from "react-native";
import React from "react";
import { icons, SIZES, FONTS, COLORS } from "../constants";
import { setSelectedTab } from "../stores/tab/tabAction";
import { connect } from "react-redux";

function LoginViewMoreNonTab({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: SIZES.padding,
        backgroundColor: COLORS.white,
        paddingTop: SIZES.padding * 2.5,
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={icons.login_view_more}
            style={{
              width: 300,
              height: 300,
            }}
          />
        </View>
        <View
          style={{
            marginTop: SIZES.padding,
          }}
        >
          <Text
            style={{
              ...FONTS.body3,
              textAlign: "center",
              fontSize: 18,
            }}
          >
            Vui lòng đăng nhập
          </Text>
          <Text
            style={{
              ...FONTS.body3,
              textAlign: "center",
              fontSize: 18,
              marginTop: SIZES.base,
            }}
          >
            để sử dụng đầy đủ tính năng
          </Text>
        </View>

        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            marginTop: SIZES.padding,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
            style={{
              paddingVertical: SIZES.radius,
              marginHorizontal: SIZES.radius,
              backgroundColor: COLORS.primary,
              paddingHorizontal: SIZES.padding,
              borderRadius: SIZES.radius,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.white,
                textAlign: "center",
              }}
            >
              Đăng ký
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
            style={{
              paddingVertical: SIZES.radius,
              marginHorizontal: SIZES.radius,
              paddingHorizontal: SIZES.padding,
              backgroundColor: COLORS.blue,
              borderRadius: SIZES.radius,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.white,
                textAlign: "center",
              }}
            >
              Đăng nhập
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => {
        navigation.navigate("CustomDrawer");
      }}
        style={{
          backgroundColor: COLORS.primary,
          paddingVertical: SIZES.radius,
          marginBottom: SIZES.radius,
          borderRadius: SIZES.radius,
        }}
      >
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.white,
            textAlign: "center",
          }}
        >
          Quay lại
        </Text>
      </TouchableOpacity>
    </View>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginViewMoreNonTab);
