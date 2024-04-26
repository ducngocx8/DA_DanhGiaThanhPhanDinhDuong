import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Switch,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES, images, FONTS, icons } from "../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { regexUsername } from "../../utils/validation";
import axios from "axios";

import { notify, ROLE_CUSTOMER, ROLE_ADMIN } from "../../utils/variable";
import { LoginGoogleURL, LoginURL } from "../../api";
import { setSelectedTab } from "../../stores/tab/tabAction";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId:
    "40528226647-82qjgdk15jhbgj5vcqdp54acg8500s9k.apps.googleusercontent.com",
  androidClientId:
    "40528226647-82qjgdk15jhbgj5vcqdp54acg8500s9k.apps.googleusercontent.com",
});

function SignIn({ navigation, selectedTab, setSelectedTab }) {
  const isFocused = useIsFocused();
  const [isSave, setIsSave] = useState(false);
  const [securePassword, setSecurePassword] = useState(true);
  const [loginInput, setLoginInput] = useState({
    // username: "ducngoc233",
    // password: "ducngoc233",
    username: "",
    password: "",
  });

  const [loginInputError, setLoginInputError] = useState({
    username: "",
    password: "",
  });

  async function onGoogleButtonPress() {
    try {
      await signOut();
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("userInfo", userInfo);
      if (userInfo && userInfo.idToken) {
        const result = await axios.post(
          `${LoginGoogleURL}`,
          {
            token: userInfo.idToken,
          },
          {
            withCredentials: true,
          }
        );
        notify(result.data.status, result.data.message);
        if (result.data.status) {
          setTimeout(() => {
            navigation.navigate("CustomDrawer");
          }, 1000);
        } else {
          await signOut();
        }
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        return false;
      } else if (error.code === statusCodes.IN_PROGRESS) {
        return false;
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        return false;
      } else {
        console.log(error);
        return false;
      }
    }
  }

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getUserLoginSave = async () => {
      const JSON_USER = await AsyncStorage.getItem("saveLogin");
      if (JSON_USER) {
        const saveLogin = JSON.parse(JSON_USER);
        console.log("saveLogin", saveLogin.username);
        if (saveLogin && saveLogin.username && saveLogin.password) {
          setLoginInput({
            username: saveLogin.username,
            password: saveLogin.password,
          });
        }
      }
    };
    const handleAPIAll = async () => {
      await Promise.all([Promise.resolve(getUserLoginSave())]);
    };
    handleAPIAll();
  }, [isFocused]);

  const loginApi = async (user) => {
    return await axios
      .post(`${LoginURL}`, user, {
        withCredentials: true,
      })
      .then((response) => {
        return response.data;
      });
  };

  const handleLoginButton = async () => {
    const { username, password } = loginInput;
    let newError = { ...loginInputError };
    let check = true;
    if (username.trim() === "") {
      newError.username = "Vui lòng điền username";
      check = false;
    } else if (!regexUsername.test(username)) {
      newError.username = "Username không hợp lệ";
      check = false;
    }
    if (password.trim() === "") {
      newError.password = "Vui lòng điền mật khẩu";
      check = false;
    }
    if (check === false) {
      setLoginInputError({ ...newError });
    } else {
      const result = await loginApi(loginInput);
      if (!result.status) {
        notify(false, result.message);
      } else {
        notify(true, result.message);
        if (isSave) {
          const saveLogin = {
            username: loginInput.username,
            password: loginInput.password,
          };
          const JSON_USER = JSON.stringify(saveLogin);
          await AsyncStorage.setItem("saveLogin", JSON_USER);
        } else {
          const saveLogin = {
            username: "",
            password: "",
          };
          const JSON_USER = JSON.stringify(saveLogin);
          await AsyncStorage.setItem("saveLogin", JSON_USER);
        }
        setLoginInput({
          username: "",
          password: "",
        });
        // console.log(result.userLogin.role);
        setTimeout(() => {
          navigation.navigate("CustomDrawer");
        }, 1000);
      }
    }
  };

  const handleChangeValueLogin = (key, value) => {
    if (key === "username") {
      if (!regexUsername.test(value) && value.trim().length !== 0) {
        setLoginInputError({
          ...loginInputError,
          [key]: "Username không hợp lệ",
        });
      } else {
        setLoginInputError({
          ...loginInputError,
          [key]: "",
        });
      }
    } else if (key === "password") {
      setLoginInputError({
        ...loginInputError,
        [key]: "",
      });
    }
    setLoginInput({ ...loginInput, [key]: value });
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: SIZES.padding,
        backgroundColor: COLORS.white,
        paddingTop: SIZES.padding * 2.5,
      }}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View style={{ alignItems: "center" }}>
          <Image
            resizeMode="contain"
            source={images.logov2}
            style={{ height: 60 }}
          />
        </View>

        {/* Title */}
        <View style={{ marginTop: SIZES.padding, alignItems: "center" }}>
          <Text style={{ ...FONTS.h2 }}>Đăng nhập</Text>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.gray,
              marginTop: SIZES.radius,
            }}
          >
            Chào mừng quay trở lại, đăng nhập
          </Text>
        </View>

        {/* Login content */}
        <View
          style={{
            marginTop: SIZES.padding * 1.5,
            flex: 1,
          }}
        >
          {/* Input Username */}
          <View style={{ borderRadius: SIZES.base }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: COLORS.gray,
                  ...FONTS.body4,
                }}
              >
                Username
              </Text>

              <Text
                style={{
                  color: COLORS.red,
                  ...FONTS.body4,
                }}
              >
                {loginInputError.username}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: COLORS.lightGray2,
                alignItems: "center",
                borderRadius: SIZES.radius,
              }}
            >
              <TextInput
                style={{
                  flex: 1,
                  backgroundColor: COLORS.lightGray2,
                  paddingHorizontal: SIZES.base,
                  paddingVertical: SIZES.radius,
                  borderRadius: SIZES.radius,
                  fontSize: 17,
                }}
                value={loginInput.username}
                maxLength={20}
                onChangeText={(value) => {
                  handleChangeValueLogin("username", value);
                }}
              />
              <Image
                source={
                  loginInput.username.length === 0
                    ? icons.correct
                    : loginInputError.username.length === 0
                    ? icons.correct
                    : icons.incorrect
                }
                style={{ width: 20, height: 20, marginRight: SIZES.radius }}
                tintColor={
                  loginInput.username.length === 0
                    ? COLORS.gray
                    : loginInputError.username.length === 0
                    ? COLORS.green
                    : COLORS.red
                }
              />
            </View>
          </View>

          {/* Input Password */}
          <View style={{ marginTop: SIZES.radius }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: COLORS.gray,
                  ...FONTS.body4,
                }}
              >
                Password
              </Text>

              <Text
                style={{
                  color: COLORS.red,
                  ...FONTS.body4,
                }}
              >
                {loginInputError.password}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: COLORS.lightGray2,
                alignItems: "center",
                borderRadius: SIZES.radius,
              }}
            >
              <TextInput
                style={{
                  flex: 1,
                  backgroundColor: COLORS.lightGray2,
                  paddingHorizontal: SIZES.base,
                  paddingVertical: SIZES.radius,
                  borderRadius: SIZES.radius,
                  fontSize: 17,
                }}
                secureTextEntry={securePassword}
                value={loginInput.password}
                maxLength={10}
                onChangeText={(value) => {
                  handleChangeValueLogin("password", value);
                }}
              />
              <TouchableOpacity
                style={{
                  marginRight: SIZES.radius,
                }}
                onPress={() => {
                  setSecurePassword(!securePassword);
                }}
              >
                <Image
                  source={securePassword ? icons.eye : icons.eye_close}
                  style={{ width: 20, height: 20 }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot Password */}
          <View
            style={{
              marginTop: SIZES.radius,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  borderRadius: 10,
                  borderWidth: 1,
                  height: 25,
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: COLORS.gray,
                  width: 46,
                  marginRight: 5,
                }}
              >
                <Switch
                  value={isSave}
                  trackColor={{
                    false: COLORS.transparent,
                    true: COLORS.transparent,
                  }}
                  thumbColor={isSave ? COLORS.primary : COLORS.gray}
                  onValueChange={() => {
                    setIsSave(!isSave);
                  }}
                />
              </View>
              <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>Lưu</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ForgotPassword");
                }}
              >
                <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>
                  Quên mật khẩu?
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Button */}
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.primary,
                alignItems: "center",
                paddingVertical: SIZES.radius,
                borderRadius: SIZES.radius,
                marginTop: SIZES.radius,
              }}
              onPress={() => {
                handleLoginButton();
              }}
            >
              <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                Đăng nhập
              </Text>
            </TouchableOpacity>
          </View>

          {/* Signup ref */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: SIZES.radius,
            }}
          >
            <Text
              style={{ color: COLORS.gray, ...FONTS.body4, marginRight: 5 }}
            >
              Bạn chưa có tài khoản?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text style={{ color: COLORS.primary, ...FONTS.h4 }}>
                Đăng ký
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Google, FaceBook Login */}

        <View style={{ marginVertical: SIZES.padding }}>
          {/* Facebook Login */}
          {/* <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              paddingVertical: SIZES.radius,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.blue,
            }}
          >
            <Image
              source={icons.fb}
              style={{ width: 20, height: 20, marginRight: SIZES.base }}
            />
            <Text style={{ color: COLORS.white, ...FONTS.body3 }}>
              Đăng nhập bằng FaceBook
            </Text>
          </TouchableOpacity> */}

          {/* Google Login */}
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              paddingVertical: SIZES.radius,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightGray2,
              marginTop: SIZES.radius,
            }}
            onPress={async () => {
              await onGoogleButtonPress();
            }}
          >
            <Image
              source={icons.google}
              style={{ width: 20, height: 20, marginRight: SIZES.base }}
            />
            <Text style={{ color: COLORS.black, ...FONTS.body3 }}>
              Đăng nhập bằng Google
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
