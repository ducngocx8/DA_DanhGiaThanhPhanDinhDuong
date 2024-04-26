import { View, Text, Image, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES, FONTS, icons } from "../../constants";
import { TouchableOpacity } from "react-native";
import HeaderDrawerChild from "../../components/HeaderDrawerChild";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import {
  BACKEND_BASE,
  BACKEND_HOME,
  UpdateInfoURL,
  UserInfoURL,
} from "../../api";
import { regexPhone } from "../../utils/validation";
import { BUILD_ANDROID, notify } from "../../utils/variable";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useIsFocused } from "@react-navigation/native";
import LoginViewMoreNonTab from "../../components/LoginViewMoreNonTab";
export default function ChangeUserInfo({ navigation }) {
  const [imageSelect, setImageSelect] = useState("");
  const [loading, isLoading] = useState(true);
  const isFocused = useIsFocused();
  const [login, setLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    async function checkPermission() {
      const response = await axios.get(`${BACKEND_BASE + "/check/all"}`, {
        withCredentials: true,
      });
      console.log("response1", response);
      if (!response.data.status) {
        return false;
      } else return true;
    }

    const getUserInfo = async () => {
      const response = await axios.get(`${UserInfoURL}`, {
        withCredentials: true,
      });
      if (response.data.status) {
        setUserInfo(response.data.data);
        if (response.data.data.image_url.trim() !== "") {
          setImageSelect(response.data.data.image_url);
        }
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigation.navigate("LoginViewMoreNonTab");
        }
      }
    };

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

  const updateUserInfoAPI = async (user) => {
    console.log("userUpdate = ", user);
    return await axios
      .post(`${UpdateInfoURL}`, user, {
        withCredentials: true,
      })
      .then((response) => {
        return response.data;
      });
  };

  const handleChangeUserInfo = async () => {
    if (!regexPhone.test(userInfo.phonenumber)) {
      notify(false, "Số điện thoại không hợp lệ.");
    } else {
      const user = {
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        phonenumber: userInfo.phonenumber,
      };

      const result = await updateUserInfoAPI(user);
      if (!result.status) {
        notify(false, result.message);
        if (result.must === "login") {
          return navigation.navigate("LoginViewMoreNonTab");
        }
      } else {
        notify(true, result.message);
        setTimeout(() => {
          navigation.goBack();
        }, 1000);
      }
    }
  };

  const handleUploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaType: "photo",
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    });

    if (!result.canceled) {
      let localUri = result.assets[0].uri;
      let filename = localUri.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      console.log("localUri", localUri);
      console.log("filename", filename);
      console.log("type", type);
      let formData = new FormData();
      formData.append("photo", { uri: localUri, name: filename, type });
      const upload = await fetch(`${BACKEND_BASE}/upload/image/web`, {
        method: "POST",
        body: formData,
        withCredentials: true,
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      const response = await upload.json();
      if (!response.status) {
        notify(false, result.message);
        return;
      }
      const image = {
        image_url: response.filename,
      };

      const upload_result = await axios.put(
        `${UserInfoURL}/upload_image`,
        image,
        {
          withCredentials: true,
        }
      );
      if (upload_result.data.status) {
        setImageSelect(upload_result.data.data.image_url);
        notify(true, "Upload ảnh thành công");
      } else {
        notify(false, upload_result.data.message);
        if (upload_result.data.must === "login") {
          return navigation.navigate("LoginViewMoreNonTab");
        }
      }
    } else {
      notify(false, "Upload ảnh thất bại 👋");
    }
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
              title={"Chỉnh sửa thông tin cá nhân"}
              navigation={navigation}
              rightComponent={
                <TouchableOpacity
                  onPress={() => {
                    handleChangeUserInfo();
                  }}
                  style={{}}
                >
                  <Text style={{ ...FONTS.h3, color: COLORS.white }}>Lưu</Text>
                </TouchableOpacity>
              }
            />
          </View>

          <KeyboardAwareScrollView
            contentContainerStyle={{
              flexGrow: 1,
            }}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{
                paddingHorizontal: SIZES.padding,
                backgroundColor: COLORS.white,
                paddingVertical: SIZES.radius,
                flex: 1,
              }}
            >
              {/* Upload Image */}
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Image
                  source={
                    imageSelect.trim() === ""
                      ? icons.user_no_image
                      : { uri: BACKEND_HOME + imageSelect }
                  }
                  style={{ width: 60, height: 60, borderRadius: SIZES.radius }}
                />
                <TouchableOpacity
                  style={{
                    marginTop: SIZES.base,
                  }}
                  onPress={() => {
                    console.log("Upload");
                    handleUploadImage();
                  }}
                >
                  <Text style={{ ...FONTS.body3, color: COLORS.primary }}>
                    Thay đổi ảnh
                  </Text>
                </TouchableOpacity>
              </View>
              {/* Change Info */}
              <View>
                <View
                  style={{
                    marginTop: SIZES.radius,
                  }}
                >
                  <Text style={{ ...FONTS.body3, color: COLORS.blue }}>
                    Username
                  </Text>
                  <TextInput
                    value={userInfo?.username}
                    editable={false}
                    style={{
                      borderWidth: 1,
                      height: 45,
                      ...FONTS.body3,
                      borderColor: COLORS.lightGray1,
                      paddingHorizontal: 10,
                      borderRadius: SIZES.base,
                      marginTop: SIZES.base,
                    }}
                  />
                </View>
                <View
                  style={{
                    marginTop: SIZES.radius,
                  }}
                >
                  <Text style={{ ...FONTS.body3, color: COLORS.blue }}>
                    Email
                  </Text>
                  <TextInput
                    value={userInfo?.email}
                    editable={false}
                    style={{
                      borderWidth: 1,
                      height: 45,
                      ...FONTS.body3,
                      borderColor: COLORS.lightGray1,
                      paddingHorizontal: 10,
                      borderRadius: SIZES.base,
                      marginTop: SIZES.base,
                    }}
                  />
                </View>
                <View
                  style={{
                    marginTop: SIZES.radius,
                  }}
                >
                  <Text style={{ ...FONTS.body3, color: COLORS.blue }}>Họ</Text>
                  <TextInput
                    onChangeText={(value) => {
                      setUserInfo({ ...userInfo, lastname: value });
                    }}
                    maxLength={30}
                    value={userInfo.lastname}
                    style={{
                      borderWidth: 1,
                      height: 45,
                      ...FONTS.body3,
                      borderColor: COLORS.lightGray1,
                      paddingHorizontal: 10,
                      borderRadius: SIZES.base,
                      marginTop: SIZES.base,
                    }}
                  />
                </View>
                <View
                  style={{
                    marginTop: SIZES.radius,
                  }}
                >
                  <Text style={{ ...FONTS.body3, color: COLORS.blue }}>
                    Tên
                  </Text>
                  <TextInput
                    onChangeText={(value) => {
                      setUserInfo({ ...userInfo, firstname: value });
                    }}
                    maxLength={20}
                    value={userInfo.firstname}
                    style={{
                      borderWidth: 1,
                      height: 45,
                      ...FONTS.body3,
                      borderColor: COLORS.lightGray1,
                      paddingHorizontal: 10,
                      borderRadius: SIZES.base,
                      marginTop: SIZES.base,
                    }}
                  />
                </View>
                <View
                  style={{
                    marginTop: SIZES.radius,
                  }}
                >
                  <Text style={{ ...FONTS.body3, color: COLORS.blue }}>
                    Số điện thoại
                  </Text>
                  <TextInput
                    value={userInfo.phonenumber}
                    onChangeText={(value) => {
                      setUserInfo({ ...userInfo, phonenumber: value });
                    }}
                    maxLength={10}
                    style={{
                      borderWidth: 1,
                      height: 45,
                      ...FONTS.body3,
                      borderColor: COLORS.lightGray1,
                      paddingHorizontal: 10,
                      borderRadius: SIZES.base,
                      marginTop: SIZES.base,
                    }}
                  />
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
      ) : (
        <LoginViewMoreNonTab navigation={navigation} />
      )}
    </>
  );
}
