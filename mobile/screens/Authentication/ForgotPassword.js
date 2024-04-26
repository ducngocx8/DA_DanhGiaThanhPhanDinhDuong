import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES, images, FONTS, icons } from "../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { regexEmail, regexUsername } from "../../utils/validation";
import { BACKEND_BASE } from "../../api";
import axios from "axios";
import { notify } from "../../utils/variable";

const ForgotPassword = ({ navigation }) => {
  const [emailInput, setEmailInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [emailInputError, setEmailInputError] = useState("");
  const [usernameInputError, setUsernameInputError] = useState("");
  const [click, isClick] = useState(true);

  useEffect(() => {}, []);

  const handleChangeValueEmail = (key, value) => {
    if (key === "email") {
      if (!regexEmail.test(value) && value.length !== 0) {
        setEmailInputError("Địa chỉ email không hợp lệ");
      } else {
        setEmailInputError("");
      }
    }
    setEmailInput(value);
  };

  const handleChangeValueUsername = (key, value) => {
    if (key === "username") {
      if (!regexUsername.test(value) && value.length !== 0) {
        setUsernameInputError("Username không hợp lệ");
      } else {
        setUsernameInputError("");
      }
    }
    setUsernameInput(value);
  };

  const handleRePasswordButton = async () => {
    let newErrorEmail = emailInputError;
    let newErrorUsername = usernameInputError;
    let check = true;
    if (usernameInput.trim().length < 3) {
      newErrorUsername = "Username phải từ 3 ký tự";
      check = false;
    } else if (!regexUsername.test(usernameInput)) {
      newErrorUsername = "Username không hợp lệ";
      check = false;
    }
    if (!regexEmail.test(emailInput)) {
      newErrorEmail = "Địa chỉ email không hợp lệ";
      check = false;
    }

    if (check === false) {
      setEmailInputError(newErrorEmail);
      setUsernameInputError(newErrorUsername);
    } else {
      isClick(false);
      const user = {
        email: emailInput,
        username: usernameInput,
      };
      const response = await axios.post(
        `${BACKEND_BASE + "/mail/forgot-password"}`,
        user,
        {
          withCredentials: true,
        }
      );
      notify(response.data.status, response.data.message);
      isClick(true);
      if (response.data.status) {
        setEmailInput("");
        setUsernameInput("");
        navigation.navigate("Otp", {
          user: user,
        });
      }
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
        <View style={{ marginTop: SIZES.padding * 2, alignItems: "center" }}>
          <Text style={{ ...FONTS.h2 }}>Khôi phục mật khẩu</Text>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.gray,
              marginTop: SIZES.radius,
              textAlign: "center",
            }}
          >
            Vui lòng điền địa chỉ email của bạn để lấy lại mật khẩu
          </Text>
        </View>

        {/* Login content */}
        <View
          style={{
            marginTop: SIZES.padding * 1.5,
            flex: 1,
          }}
        >
          {/* Input OTP code */}

          {/* Username */}
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
                Username
              </Text>

              <Text
                style={{
                  color: COLORS.red,
                  ...FONTS.body4,
                }}
              >
                {usernameInputError}
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
                value={usernameInput}
                maxLength={20}
                onChangeText={(value) => {
                  handleChangeValueUsername("username", value);
                }}
              />
              <Image
                source={
                  usernameInput.length === 0
                    ? icons.correct
                    : usernameInputError.length === 0
                    ? icons.correct
                    : icons.incorrect
                }
                style={{ width: 20, height: 20, marginRight: SIZES.radius }}
                tintColor={
                  usernameInput.length === 0
                    ? COLORS.gray
                    : usernameInputError.length === 0
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
                {emailInputError}
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
                value={emailInput}
                maxLength={30}
                onChangeText={(value) => {
                  handleChangeValueEmail("email", value);
                }}
              />
              <Image
                source={
                  emailInput.length === 0
                    ? icons.correct
                    : emailInputError.length === 0
                    ? icons.correct
                    : icons.incorrect
                }
                style={{ width: 20, height: 20, marginRight: SIZES.radius }}
                tintColor={
                  emailInput.length === 0
                    ? COLORS.gray
                    : emailInputError.length === 0
                    ? COLORS.green
                    : COLORS.red
                }
              />
            </View>
          </View>
        </View>

        {/* Continue, Agree Option */}

        <View style={{ marginVertical: SIZES.padding }}>
          {/* Continue Button */}
          <TouchableOpacity
            disabled={click ? false : true}
            style={{
              backgroundColor: COLORS.primary,
              alignItems: "center",
              paddingVertical: SIZES.radius,
              borderRadius: SIZES.radius,
              marginTop: SIZES.radius,
            }}
            onPress={() => {
              handleRePasswordButton();
            }}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Gửi email</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ForgotPassword;
