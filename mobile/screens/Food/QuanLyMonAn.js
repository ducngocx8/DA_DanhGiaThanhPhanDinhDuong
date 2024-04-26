import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES, FONTS, icons } from "../../constants";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import HeaderDrawerChild from "../../components/HeaderDrawerChild";
import axios from "axios";
import { BACKEND_BASE, BACKEND_HOME, MonAnURL } from "../../api";
import { useIsFocused } from "@react-navigation/native";
import { BUILD_ANDROID, notify } from "../../utils/variable";
import ModalXoaMonAn from "./ModalXoaMonAn";
import LoginViewMoreNonTab from "../../components/LoginViewMoreNonTab";
import * as ImagePicker from "expo-image-picker";

export default function QuanLyMonAn({ navigation }) {
  const [loading, isLoading] = useState(true);
  const [login, setLogin] = useState(false);
  const [showModalXoaMonAn, setShowModalXoaMonAn] = useState({
    show: false,
    mon_an: null,
  });
  const [monAnList, setMonAnList] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function checkPermission() {
      const response = await axios.get(`${BACKEND_BASE + "/check/all"}`, {
        withCredentials: true,
      });
      if (!response.data.status) {
        return false;
      } else return true;
    }

    async function getAllMonAnUser() {
      const response = await axios.get(`${MonAnURL + "/by/user"}`, {
        withCredentials: true,
      });
      if (response.data.status) {
        setMonAnList(response.data.data);
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigation.navigate("LoginViewMoreNonTab");
        }
      }
    }
    const handleAPIAll = async () => {
      const check = await checkPermission();
      if (check) {
        await Promise.all([Promise.resolve(getAllMonAnUser())]);
        setLogin(true);
        isLoading(false);
      } else {
        setLogin(false);
        isLoading(false);
      }
    };
    handleAPIAll();
  }, [isFocused]);

  const handleRemoveMonAn = async () => {
    const response = await axios.delete(
      `${MonAnURL + "/by/user/" + showModalXoaMonAn.mon_an.id_monan}`,
      {
        withCredentials: true,
      }
    );
    notify(response.data.status, response.data.message);
    if (response.data.status) {
      setMonAnList(response.data.data);
      setShowModalXoaMonAn({
        show: false,
        mon_an: null,
      });
    } else {
      if (response.data.must === "login") {
        return navigation.navigate("LoginViewMoreNonTab");
      }
    }
  };

  const handleUploadImage = async (id_monan) => {
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
        `${MonAnURL}/upload/${id_monan}`,
        image,
        {
          withCredentials: true,
        }
      );
      if (upload_result.data.status) {
        notify(true, "Upload ảnh thành công");
        setMonAnList(upload_result.data.data);
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
              navigation={navigation}
              title={"Quản lý món ăn"}
              disableRight={true}
            />
          </View>

          <ScrollView
            style={{
              backgroundColor: COLORS.white,
              paddingHorizontal: SIZES.padding,
              paddingVertical: SIZES.padding,
              flex: 1,
            }}
          >
            {/* Render Modal Xóa Món Ăn */}
            {showModalXoaMonAn && showModalXoaMonAn.mon_an && (
              <ModalXoaMonAn
                setShowModalRemoveMonAn={() => {
                  setShowModalXoaMonAn({
                    mon_an: null,
                    show: false,
                  });
                }}
                handleRemoveMonAn={handleRemoveMonAn}
                mon_an={showModalXoaMonAn.mon_an}
              />
            )}
            {/* Render danh sách Món ăn đã tạo */}
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.primary,
                  }}
                >
                  Danh sách món ăn
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("TaoMonAn");
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.h3,
                      color: COLORS.blue,
                    }}
                  >
                    Tạo món mới
                  </Text>
                </TouchableOpacity>
              </View>
              {/* Render danh sách món đã tạo */}
              <View
                style={{
                  marginTop: SIZES.radius,
                  backgroundColor: COLORS.lightGray2,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    paddingVertical: SIZES.base,
                    backgroundColor: COLORS.blue,
                    paddingHorizontal: SIZES.radius,
                  }}
                >
                  <Text style={styles.header_table50}>Tên món ăn</Text>
                  <Text style={styles.header_table20}>Hình ảnh</Text>
                  <Text style={styles.header_tableEnd}>Cập nhật</Text>
                </View>

                {monAnList.length > 0 ? (
                  monAnList.map((item, index) => {
                    return (
                      <View key={index} style={styles.one_row_dd_thucpham}>
                        <TouchableOpacity
                          style={styles.column50_thucpham}
                          onPress={() => {
                            navigation.navigate("FoodDetail", {
                              id_monan: item.id_monan,
                            });
                          }}
                        >
                          <Text style={{ flex: 1, ...FONTS.body3 }}>
                            {item.ten_mon}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            handleUploadImage(item.id_monan);
                          }}
                          style={styles.column20_thucpham}
                        >
                          <Image
                            source={
                              item.image_url
                                ? { uri: BACKEND_HOME + item.image_url }
                                : icons.carb
                            }
                            style={{ width: 30, height: 30 }}
                            resizeMode="center"
                          />
                        </TouchableOpacity>
                        <View style={styles.columnEnd_thucpham}>
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate("UpdateMonAn", {
                                monAnChoose: item,
                              });
                            }}
                          >
                            <Text
                              style={{
                                ...FONTS.body3,
                                color: COLORS.blue,
                              }}
                            >
                              Sửa
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity>
                            <Text>{"  |  "}</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              setShowModalXoaMonAn({
                                show: true,
                                mon_an: item,
                              });
                            }}
                          >
                            <Text
                              style={{
                                ...FONTS.body3,
                                color: COLORS.red,
                              }}
                            >
                              Xóa
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  })
                ) : (
                  <Text
                    style={{
                      ...FONTS.body4,
                      textAlign: "center",
                      marginVertical: SIZES.base,
                    }}
                  >
                    Bạn chưa tạo món ăn nào
                  </Text>
                )}
              </View>
            </View>
            {/* Pagination */}
            <View
              style={{
                marginTop: 30,
              }}
            ></View>
          </ScrollView>
        </View>
      ) : (
        <LoginViewMoreNonTab navigation={navigation} />
      )}
    </>
  );
}
const styles = StyleSheet.create({
  header_table50: {
    color: COLORS.white,
    flex: 3,
    ...FONTS.h3,
  },

  header_table20: {
    color: COLORS.white,
    flex: 2,
    textAlign: "center",
    ...FONTS.h3,
  },

  header_tableEnd: {
    flex: 2,
    color: COLORS.white,
    textAlign: "center",
    ...FONTS.h3,
  },

  column50_thucpham: {
    color: COLORS.black,
    flex: 3,
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
  },

  one_row_dd_thucpham: {
    flexDirection: "row",
    marginVertical: 3,
    alignItems: "center",
    flex: 1,
    paddingHorizontal: SIZES.radius,
  },

  column20_thucpham: {
    color: COLORS.black,
    flex: 2,
    textAlign: "center",
    alignItems: "center",
    ...FONTS.body3,
  },

  columnEnd_thucpham: {
    flex: 2,
    color: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
    ...FONTS.body3,
    flexDirection: "row",
  },

  column50: {
    color: COLORS.black,
    flex: 3,
    ...FONTS.body3,
  },

  one_row_dd: {
    flexDirection: "row",
    paddingHorizontal: SIZES.radius,
    marginVertical: 3,
  },

  column20: {
    color: COLORS.black,
    flex: 2,
    textAlign: "center",
    ...FONTS.body3,
  },

  columnEnd: {
    flex: 2,
    color: COLORS.black,
    textAlign: "right",
    ...FONTS.body3,
  },
});
