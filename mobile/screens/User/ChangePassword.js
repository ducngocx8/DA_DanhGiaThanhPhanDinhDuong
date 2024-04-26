import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES, FONTS, icons } from "../../constants";
import HeaderDrawerChild from "../../components/HeaderDrawerChild";
import { BACKEND_BASE, UpdatePasswordURL } from "../../api";
import { BUILD_ANDROID, notify } from "../../utils/variable";
import axios from "axios";
import LoginViewMoreNonTab from "../../components/LoginViewMoreNonTab";
import { useIsFocused } from "@react-navigation/native";

export default function ChangePassword({ navigation }) {
  const isFocused = useIsFocused();
  const [loading, isLoading] = useState(true);
  const [login, setLogin] = useState(false);
  const [inputPassword, setInputPassword] = useState({
    oldPassword: "",
    newPassword: "",
    reNewPassword: "",
  });

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showReNewPassword, setShowReNewPassword] = useState(false);

  useEffect(() => {
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
        setLogin(true);
        isLoading(false);
      } else {
        setLogin(false);
        isLoading(false);
      }
    };

    handleAPIAll();
  }, [isFocused]);

  const updatePasswordAPI = async (password) => {
    console.log("password = ", password);
    return await axios
      .post(`${UpdatePasswordURL}`, password, {
        withCredentials: true,
      })
      .then((response) => {
        return response.data;
      });
  };

  const handleUpdatePassword = async () => {
    console.log(inputPassword);
    if (inputPassword.oldPassword.trim() === "") {
      notify(false, "Bạn chưa nhập mật khẩu cũ.");
    } else if (inputPassword.newPassword.trim() === "") {
      notify(false, "Bạn chưa nhập mật khẩu mới.");
    } else if (inputPassword.reNewPassword !== inputPassword.newPassword) {
      notify(false, "Hai mật khẩu không giống nhau.");
    } else {
      const password = {
        oldpassword: inputPassword.oldPassword,
        newpassword: inputPassword.newPassword,
      };
      const result = await updatePasswordAPI(password);
      if (!result.status) {
        notify(false, result.message);
        if (result.must === "login") {
          return navigation.navigate("LoginViewMoreNonTab");
        }
      } else {
        notify(true, result.message);
        setInputPassword({
          oldPassword: "",
          newPassword: "",
          reNewPassword: "",
        });
      }
    }
  };

  const renderInputPassword = () => {
    return (
      <View
        style={{
          paddingVertical: SIZES.radius,
          borderRadius: SIZES.base,
        }}
      >
        {/* Current Password */}
        <View
          style={{
            marginVertical: SIZES.base,
          }}
        >
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.blue,
              marginBottom: SIZES.base,
            }}
          >
            Nhập mật khẩu cũ
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderRadius: SIZES.base,
              backgroundColor: COLORS.white,
              borderWidth: 1,
              borderColor: COLORS.lightGray1,
            }}
          >
            <TextInput
              onChangeText={(value) => {
                setInputPassword({ ...inputPassword, oldPassword: value });
              }}
              value={inputPassword.oldPassword}
              maxLength={20}
              secureTextEntry={showOldPassword ? false : true}
              style={{
                flex: 1,
                height: 50,
                paddingHorizontal: SIZES.radius,
                ...FONTS.body3,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setShowOldPassword(!showOldPassword);
              }}
              style={{
                marginHorizontal: SIZES.radius,
              }}
            >
              <Image
                source={showOldPassword ? icons.eye_close : icons.eye}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* New Password */}
        <View
          style={{
            marginVertical: SIZES.base,
          }}
        >
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.blue,
              marginBottom: SIZES.base,
            }}
          >
            Nhập mật khẩu mới
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderRadius: SIZES.base,
              backgroundColor: COLORS.white,
              borderWidth: 1,
              borderColor: COLORS.lightGray1,
            }}
          >
            <TextInput
              onChangeText={(value) => {
                setInputPassword({ ...inputPassword, newPassword: value });
              }}
              value={inputPassword.newPassword}
              maxLength={20}
              secureTextEntry={showNewPassword ? false : true}
              style={{
                flex: 1,
                height: 50,
                paddingHorizontal: SIZES.radius,
                ...FONTS.body3,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setShowNewPassword(!showNewPassword);
                console.log("SHOW/CLOSE NEW Password");
              }}
              style={{
                marginHorizontal: SIZES.radius,
              }}
            >
              <Image
                source={showNewPassword ? icons.eye_close : icons.eye}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Retype New Password */}
        <View
          style={{
            marginVertical: SIZES.base,
          }}
        >
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.blue,
              marginBottom: SIZES.base,
            }}
          >
            Nhập lại mật khẩu mới
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderRadius: SIZES.base,
              backgroundColor: COLORS.white,
              borderWidth: 1,
              borderColor: COLORS.lightGray1,
            }}
          >
            <TextInput
              onChangeText={(value) => {
                setInputPassword({ ...inputPassword, reNewPassword: value });
              }}
              value={inputPassword.reNewPassword}
              maxLength={20}
              secureTextEntry={showReNewPassword ? false : true}
              style={{
                flex: 1,
                height: 50,
                paddingHorizontal: SIZES.radius,
                ...FONTS.body3,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setShowReNewPassword(!showReNewPassword);
              }}
              style={{
                marginHorizontal: SIZES.radius,
              }}
            >
              <Image
                source={showReNewPassword ? icons.eye_close : icons.eye}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
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
              title={"Cập nhật mật khẩu"}
              navigation={navigation}
              disableRight={true}
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
            {renderInputPassword()}

            {/* Render FLEX1 */}
            <View
              style={{
                flex: 1,
              }}
            ></View>

            {/* Render Button Submit */}
            <TouchableOpacity
              style={{
                paddingVertical: SIZES.radius * 1.2,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primary,
                alignItems: "center",
                marginBottom: SIZES.padding,
              }}
              onPress={() => {
                handleUpdatePassword();
              }}
            >
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.white,
                }}
              >
                Change Password
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <LoginViewMoreNonTab navigation={navigation} />
      )}
    </>
  );
}
