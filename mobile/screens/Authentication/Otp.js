import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, SIZES, images, FONTS } from "../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native";
import { notify } from "../../utils/variable";
import axios from "axios";
import { BACKEND_BASE } from "../../api";

const Otp = ({ navigation, route }) => {
  if (!route.params || route.parrams?.user) {
    return navigation.navigate("Result", {
      icon: images.success,
      resultText: "Đã có lỗi xảy ra",
      resultMessage: "Có lỗi xảy ra trong quá trình thực hiện!",
      resultButtonText: "Quay lại",
      screenName: "SignIn",
    });
  }

  const { user } = route.params;
  const [time, setTime] = useState(60);
  const [click, isClick] = useState(true);
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const fivethInput = useRef();
  const sixthInput = useRef();
  const [otp, setOtp] = useState({ 1: "", 2: "", 3: "", 4: "", 5: "", 6: "" });

  useEffect(() => {
    if (!time) return;
    const intervalId = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [time]);

  const handleResentPassword = async () => {
    isClick(false);
    const email = user?.email;
    const username = user?.username;
    if (!email || !username) {
      notify(false, "Vui lòng thực hiện lại");
      setTimeout(() => {
        return navigation.goBack();
      }, 1000);
    }
    const info = {
      email: email,
      username: username,
    };
    const response = await axios.post(
      `${BACKEND_BASE + "/mail/forgot-password"}`,
      info,
      {
        withCredentials: true,
      }
    );
    notify(response.data.status, response.data.message);
    isClick(true);
    if (response.data.status) {
      setTime(60);
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
          <Text style={{ ...FONTS.h2 }}>Xác thực OTP</Text>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.gray,
              marginTop: SIZES.radius,
              textAlign: "center",
            }}
          >
            Một mã xác thực đã được gửi tới email
          </Text>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.gray,
              textAlign: "center",
            }}
          >
            {user.email}
          </Text>
        </View>

        {/* Login content */}
        <View
          style={{
            marginTop: SIZES.padding * 1.5,
            flex: 1,
          }}
        >
          {/* OTP CUSTOM */}
          <View style={styles.otpContainer}>
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={firstInput}
                onChangeText={(text) => {
                  setOtp({ ...otp, 1: text });
                  text && secondInput.current.focus();
                }}
              />
            </View>
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={secondInput}
                onChangeText={(text) => {
                  console.log("text2=", text);
                  setOtp({ ...otp, 2: text });
                  text
                    ? thirdInput.current.focus()
                    : firstInput.current.focus();
                }}
              />
            </View>
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={thirdInput}
                onChangeText={(text) => {
                  console.log("text3=", text);
                  setOtp({ ...otp, 3: text });
                  text
                    ? fourthInput.current.focus()
                    : secondInput.current.focus();
                }}
              />
            </View>
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={fourthInput}
                onChangeText={(text) => {
                  setOtp({ ...otp, 4: text });
                  text
                    ? fivethInput.current.focus()
                    : thirdInput.current.focus();
                }}
              />
            </View>
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={fivethInput}
                onChangeText={(text) => {
                  setOtp({ ...otp, 5: text });
                  text
                    ? sixthInput.current.focus()
                    : fourthInput.current.focus();
                }}
              />
            </View>
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={sixthInput}
                onChangeText={(text) => {
                  setOtp({ ...otp, 6: text });
                  !text && fivethInput.current.focus();
                }}
              />
            </View>
          </View>

          {/* Reset OTP Button */}
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
              Bạn chưa nhận được mã code?
            </Text>
            <TouchableOpacity
              onPress={() => {
                if (click) {
                  handleResentPassword();
                }
              }}
              disabled={time === 0 ? false : true}
            >
              <Text style={{ color: COLORS.primary, ...FONTS.h4 }}>
                {time > 0 ? `Gửi lại (${time}s)` : "Gửi lại"}
              </Text>
            </TouchableOpacity>
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
              console.log("Continue Submit", otp);
              let check = true;
              let otpCode = "";
              for (const [key, value] of Object.entries(otp)) {
                if (value.trim() === "" || !Number.isInteger(Number(value))) {
                  alert("Mã OTP nhập vào không hợp lệ.");
                  check = false;
                  break;
                }
                otpCode += value;
              }
              if (check) {
                const info = {
                  email: user.email,
                  otp_code: otpCode,
                };
                return navigation.navigate("CreatePassword", {
                  user: info,
                });
              }
            }}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Tiếp tục</Text>
          </TouchableOpacity>

          {/* Agree Option */}
          <View
            style={{
              alignItems: "center",
              marginTop: SIZES.padding,
            }}
          >
            <Text
              style={{ color: COLORS.gray, ...FONTS.body4, marginRight: 5 }}
            >
              By signing up, you agree to our.
            </Text>
            <TouchableOpacity
              onPress={() => {
                console.log("Terms and conditions");
                navigation.navigate("SignUp");
              }}
            >
              <Text style={{ color: COLORS.primary, ...FONTS.body4 }}>
                Terms and Conditions
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: SIZES.padding,
  },
  otpBox: {
    borderRadius: SIZES.radius,
    borderColor: COLORS.lightGray1,
    borderWidth: 1,
    backgroundColor: COLORS.lightGray2,
    marginHorizontal: 5,
  },
  otpText: {
    color: COLORS.black,
    ...FONTS.h3,
    textAlign: "center",
    width: 45,
    height: 45,
  },
});

export default Otp;
