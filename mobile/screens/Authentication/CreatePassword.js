import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { COLORS, SIZES, images, FONTS, icons } from "../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BACKEND_BASE } from "../../api";
import { notify } from "../../utils/variable";
import axios from "axios";

const CreatePassword = ({ navigation, route }) => {
  if (!route.params || route.parrams?.user) {
    return navigation.navigate("Result", {
      icon: images.success,
      resultText: "Đã có lỗi xảy ra",
      resultMessage: "Có lỗi xảy ra trong quá trình thực hiện!",
      resultButtonText: "Quay lại",
      screenName: "SignIn",
    });
  }

  const [reNewPasswordInput, setReNewPasswordInput] = useState("");
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [reNewPasswordInputError, setReNewPasswordInputError] = useState("");
  const [newPasswordInputError, setNewPasswordInputError] = useState("");
  const [securePassword, setSecurePassword] = useState(true);
  const [secureRePassword, setSecureRePassword] = useState(true);

  const { user } = route?.params;

  const handleChangeValueReNewPassword = (value) => {
    if (value !== newPasswordInput) {
      setReNewPasswordInputError("Chưa trùng khớp");
    } else {
      setReNewPasswordInputError("");
    }
    setReNewPasswordInput(value);
  };

  const handleChangeValueNewPassword = (value) => {
    if (value.length < 3) {
      setNewPasswordInputError("Mật khẩu mới phải từ 3 ký tự trở lên");
    } else {
      setNewPasswordInputError("");
    }
    setNewPasswordInput(value);
  };

  const handleCreatePasswordButton = async () => {
    let newErrorRePassword = reNewPasswordInputError;
    let newErrorPassword = newPasswordInputError;
    let check = true;
    if (newPasswordInput.length < 3) {
      newErrorPassword = "Mật khẩu mới phải từ 3 ký tự trở lên";
      check = false;
    } else if (newPasswordInput !== reNewPasswordInput) {
      newErrorRePassword = "Chưa trùng khớp";
      check = false;
    }

    if (check === false) {
      setReNewPasswordInputError(newErrorRePassword);
      setNewPasswordInputError(newErrorPassword);
    } else {
      const info = {
        email: user.email,
        otp_code: user.otp_code,
        password: newPasswordInput,
      };
      const response = await axios.post(
        `${BACKEND_BASE + "/account/forgot/password"}`,
        info,
        {
          withCredentials: true,
        }
      );
      notify(response.data.status, response.data.message);
      if (response.data.status) {
        setReNewPasswordInput("");
        setNewPasswordInput("");
        setTimeout(() => {
          navigation.navigate("SignIn");
        }, 1000);
      } else {
        setTimeout(() => {
          navigation.goBack();
        }, 1000);
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
          <Text style={{ ...FONTS.h2 }}>Khởi tạo mật khẩu</Text>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.gray,
              marginTop: SIZES.radius,
              textAlign: "center",
            }}
          >
            Tạo mật khẩu mới cho tài khoản
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

          {/* New Password */}
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
                Mật khẩu mới
              </Text>

              <Text
                style={{
                  color: COLORS.red,
                  ...FONTS.body4,
                }}
              >
                {newPasswordInputError}
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
                value={newPasswordInput}
                secureTextEntry={securePassword}
                maxLength={15}
                onChangeText={(value) => {
                  handleChangeValueNewPassword(value);
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

          {/* Input ReNew Pasword */}
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
                Tạo mật khẩu mới
              </Text>

              <Text
                style={{
                  color: COLORS.red,
                  ...FONTS.body4,
                }}
              >
                {reNewPasswordInputError}
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
                value={reNewPasswordInput}
                secureTextEntry={secureRePassword}
                maxLength={15}
                onChangeText={(value) => {
                  handleChangeValueReNewPassword(value);
                }}
              />
              <TouchableOpacity
                style={{
                  marginRight: SIZES.radius,
                }}
                onPress={() => {
                  setSecureRePassword(!secureRePassword);
                }}
              >
                <Image
                  source={secureRePassword ? icons.eye : icons.eye_close}
                  style={{ width: 20, height: 20 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Continue, Agree Option */}

        <View style={{ marginVertical: SIZES.padding }}>
          {/* Continue Button */}
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              alignItems: "center",
              paddingVertical: SIZES.radius,
              borderRadius: SIZES.radius,
              marginTop: SIZES.radius,
            }}
            onPress={() => {
              handleCreatePasswordButton();
            }}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
              Tạo mật khẩu
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default CreatePassword;
