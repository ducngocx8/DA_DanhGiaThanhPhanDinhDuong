import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { COLORS, SIZES, images, FONTS, icons } from "../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { regexEmail, regexUsername } from "../../utils/validation";
import { notify } from "../../utils/variable";
import axios from "axios";
import { BACKEND_BASE, LoginGoogleURL } from "../../api";
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

export default function SignUp({ navigation }) {
  const [securePassword, setSecurePassword] = useState(true);
  const [signupInput, setSignupInput] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [signupInputError, setSignupInputError] = useState({
    username: "",
    password: "",
    email: "",
  });

  const signupAPI = async (user) => {
    let bodyUser = {
      username: user.username,
      email: user.email,
      password: user.password,
    };
    return await axios
      .post(`${BACKEND_BASE + "/account/signup"}`, bodyUser)
      .then((response) => {
        return response.data;
      });
  };

  const handleSignupButton = async () => {
    const { username, email, password } = signupInput;
    let newError = { ...signupInputError };
    let check = true;
    if (username.trim().length < 3) {
      newError.username = "Username phải từ 3 ký tự.";
      check = false;
    } else if (!regexUsername.test(username)) {
      newError.username = "Username không hợp lệ.";
      check = false;
    }
    if (!regexEmail.test(email)) {
      newError.email = "Địa chỉ email không hợp lệ.";
      check = false;
    }
    if (password.trim().length < 3) {
      newError.password = "Mật khẩu phải từ 3 ký tự.";
      check = false;
    }

    if (check === false) {
      setSignupInputError({ ...newError });
    } else {
      const result = await signupAPI(signupInput);
      if (!result.status) {
        notify(false, result.message);
      } else {
        navigation.navigate("Result", {
          icon: images.success,
          resultText: "Thành công",
          resultMessage:
            "Tạo tài khoản thành công, vui lòng kiểm tra email để xác thực tài khoản!",
          resultButtonText: "Done",
          screenName: "SignIn",
        });
      }
    }
  };

  const handleChangeValueSignup = (key, value) => {
    if (key === "username") {
      if (value.trim().length < 3 && value.trim().length !== 0) {
        setSignupInputError({
          ...signupInputError,
          [key]: "Username phải từ 3 ký tự trở lên",
        });
      } else if (!regexUsername.test(value) && value.trim().length !== 0) {
        setSignupInputError({
          ...signupInputError,
          [key]: "Username không hợp lệ",
        });
      } else {
        setSignupInputError({
          ...signupInputError,
          [key]: "",
        });
      }
    } else if (key === "password") {
      if (value.trim().length < 3 && value.trim().length !== 0) {
        setSignupInputError({
          ...signupInputError,
          [key]: "Mật khẩu phải từ 3 ký tự trở lên",
        });
      } else {
        setSignupInputError({
          ...signupInputError,
          [key]: "",
        });
      }
    } else if (key === "email") {
      if (!regexEmail.test(value) && value.trim().length !== 0) {
        setSignupInputError({
          ...signupInputError,
          [key]: "Địa chỉ email không hợp lệ",
        });
      } else {
        setSignupInputError({
          ...signupInputError,
          [key]: "",
        });
      }
    }
    setSignupInput({ ...signupInput, [key]: value });
  };

  async function onGoogleButtonPress() {
    try {
      await signOut();
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
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
          <Text style={{ ...FONTS.h2 }}>Đăng ký</Text>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.gray,
              marginTop: SIZES.radius,
            }}
          >
            Tạo tài khoản mới để tiếp tục!
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
                {signupInputError.username}
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
                value={signupInput.username}
                maxLength={20}
                onChangeText={(value) => {
                  handleChangeValueSignup("username", value);
                }}
              />
              <Image
                source={
                  signupInput.username.length === 0
                    ? icons.correct
                    : signupInputError.username.length === 0
                    ? icons.correct
                    : icons.incorrect
                }
                style={{ width: 20, height: 20, marginRight: SIZES.radius }}
                tintColor={
                  signupInput.username.length === 0
                    ? COLORS.gray
                    : signupInputError.username.length === 0
                    ? COLORS.green
                    : COLORS.red
                }
              />
            </View>
          </View>

          {/* Input Email */}
          <View style={{ borderRadius: SIZES.base, marginTop: SIZES.radius }}>
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
                Email
              </Text>

              <Text
                style={{
                  color: COLORS.red,
                  ...FONTS.body4,
                }}
              >
                {signupInputError.email}
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
                value={signupInput.email}
                maxLength={30}
                onChangeText={(value) => {
                  handleChangeValueSignup("email", value);
                }}
              />
              <Image
                source={
                  signupInput.email.length === 0
                    ? icons.correct
                    : signupInputError.email.length === 0
                    ? icons.correct
                    : icons.incorrect
                }
                style={{ width: 20, height: 20, marginRight: SIZES.radius }}
                tintColor={
                  signupInput.email.length === 0
                    ? COLORS.gray
                    : signupInputError.email.length === 0
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
                {signupInputError.password}
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
                value={signupInput.password}
                maxLength={10}
                onChangeText={(value) => {
                  handleChangeValueSignup("password", value);
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

          {/* Signup Button */}
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
                handleSignupButton();
              }}
            >
              <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Đăng ký</Text>
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
              Bạn đã có tài khoản?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <Text style={{ color: COLORS.primary, ...FONTS.h4 }}>
                Đăng nhập
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
            onPress={async () => {
              await onGoogleButtonPress();
            }}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              paddingVertical: SIZES.radius,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightGray2,
              marginTop: SIZES.radius,
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
