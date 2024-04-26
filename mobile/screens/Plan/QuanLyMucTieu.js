import { View, Text, StyleSheet, Image, Modal, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES, FONTS, icons } from "../../constants";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import HeaderDrawerChild from "../../components/HeaderDrawerChild";
import axios from "axios";
import { BACKEND_BASE, MucTieuURL } from "../../api";
import Toast from "react-native-toast-message";
import { toastConfig } from "../../configs/toast.config";
import { BUILD_ANDROID, notify } from "../../utils/variable";
import { useIsFocused } from "@react-navigation/native";
import { convertToDateOnly } from "../../utils/date";
import LoginViewMoreNonTab from "../../components/LoginViewMoreNonTab";

export default function QuanLyMucTieu({ navigation }) {
  const [loading, isLoading] = useState(true);
  const [login, setLogin] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mucTieuList, setMucTieuList] = useState([]);
  const [itemViewChoose, setItemViewChoose] = useState(false);
  const [itemDeleteChoose, setItemDeleteChoose] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isVisible) {
    }
  }, [isVisible]);

  useEffect(() => {
    async function checkPermission() {
      const response = await axios.get(`${BACKEND_BASE + "/check/all"}`, {
        withCredentials: true,
      });
      if (!response.data.status) {
        return false;
      } else return true;
    }

    const getAllMucTieu = async () => {
      const response = await axios.get(`${MucTieuURL}`);
      if (response.data.status) {
        setMucTieuList(response.data.data);
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
        await Promise.all([Promise.resolve(getAllMucTieu())]);
        setLogin(true);
        isLoading(false);
      } else {
        setLogin(false);
        isLoading(false);
      }
    };

    handleAPIAll();
  }, [isFocused]);

  const handleXoaMucTieu = async () => {
    const response = await axios.delete(
      `${MucTieuURL + "/" + itemDeleteChoose.muctieu_id}`,
      {
        withCredentials: true,
      }
    );
    notify(response.data.status, response.data.message);
    if (response.data.status) {
      setMucTieuList(response.data.data);
      setItemDeleteChoose(false);
      setShowModalDelete(false);
    } else {
      if (response.data.must === "login") {
        return navigation.navigate("LoginViewMoreNonTab");
      }
    }
  };

  const ModalXoaMucTieu = () => {
    return (
      <Modal animationType="slide" transparent={true} visible={showModalDelete}>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.transparentBlack7,
            justifyContent: "center",
          }}
        >
          {/* Toast */}
          <Toast config={toastConfig} />
          <View
            style={{
              backgroundColor: COLORS.white,
              marginHorizontal: SIZES.padding,
              paddingHorizontal: SIZES.radius,
              paddingVertical: SIZES.radius,
              borderRadius: SIZES.radius,
            }}
          >
            {/* Header Modal */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ ...FONTS.h3 }}>
                Xóa mục tiêu ngày {convertToDateOnly(itemDeleteChoose.time)}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowModalDelete(false);
                }}
              >
                <Image
                  style={{
                    tintColor: COLORS.primary,
                    width: 30,
                    height: 30,
                    borderWidth: 2,
                    borderColor: COLORS.primary,
                    borderRadius: 10,
                  }}
                  source={icons.cross}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => {
                handleXoaMucTieu();
              }}
              style={{
                backgroundColor: COLORS.primary,
                paddingVertical: SIZES.radius,
                borderRadius: SIZES.radius,
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h3,
                  textAlign: "center",
                }}
              >
                Xác nhận
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const ModalXemChiTietMucTieu = () => {
    return (
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.transparentBlack7,
            justifyContent: "center",
          }}
        >
          {/* Toast */}
          <Toast config={toastConfig} />
          <View
            style={{
              backgroundColor: COLORS.white,
              marginHorizontal: SIZES.padding,
              paddingHorizontal: SIZES.radius,
              paddingVertical: SIZES.radius,
              borderRadius: SIZES.radius,
              height: SIZES.height / 3.5,
            }}
          >
            {/* Header Modal */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ ...FONTS.h3 }}>
                Mục tiêu ngày {convertToDateOnly(itemViewChoose.time)}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setIsVisible(false);
                }}
              >
                <Image
                  style={{
                    tintColor: COLORS.primary,
                    width: 30,
                    height: 30,
                    borderWidth: 2,
                    borderColor: COLORS.primary,
                    borderRadius: 10,
                  }}
                  source={icons.cross}
                />
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                paddingTop: SIZES.base,
                marginTop: SIZES.radius,
              }}
            >
              <Text
                style={{
                  ...FONTS.h4,
                  marginBottom: 5,
                }}
              >
                + Năng lượng:{" "}
                <Text
                  style={{
                    color: COLORS.blue,
                  }}
                >
                  {Number(itemViewChoose.ENERC) * 1} KCal
                </Text>
              </Text>
              <Text
                style={{
                  ...FONTS.h4,
                  marginVertical: 5,
                }}
              >
                + Protein:{" "}
                <Text
                  style={{
                    color: COLORS.blue,
                  }}
                >
                  {Number(itemViewChoose.PROCNT) * 1}g
                </Text>
              </Text>
              <Text
                style={{
                  ...FONTS.h4,
                  marginVertical: 5,
                }}
              >
                + Chất béo:{" "}
                <Text
                  style={{
                    color: COLORS.blue,
                  }}
                >
                  {Number(itemViewChoose.FAT) * 1}g
                </Text>
              </Text>
              <Text
                style={{
                  ...FONTS.h4,
                  marginVertical: 5,
                }}
              >
                + Carbohydrate:{" "}
                <Text
                  style={{
                    color: COLORS.blue,
                  }}
                >
                  {Number(itemViewChoose.CHOCDF) * 1}g
                </Text>
              </Text>
              <Text
                style={{
                  ...FONTS.h4,
                  marginVertical: 5,
                }}
              >
                + Ghi chú:{" "}
                <Text
                  style={{
                    color: COLORS.blue,
                  }}
                >
                  {itemViewChoose.note}
                </Text>
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
              navigation={navigation}
              title={"Quản lý mục tiêu"}
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
            {/* Render Modal Xem mục tiêu */}
            {isVisible && ModalXemChiTietMucTieu()}
            {/* Render Modal Xóa mục tiêu */}
            {showModalDelete && ModalXoaMucTieu()}
            {/* Render danh sách thực phẩm đã chọn - Tiêu đề */}
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
                  Danh sách mục tiêu
                </Text>

                {/* <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Plan");
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.h3,
                      color: COLORS.blue,
                    }}
                  >
                    Mục tiêu hôm nay
                  </Text>
                </TouchableOpacity> */}
              </View>
              {/* Render danh sách thực phẩm đã chọn - List */}
              <View
                style={{
                  marginTop: SIZES.padding,
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
                  <Text style={styles.header_table50}>Thời gian</Text>
                  <Text style={styles.header_table20}>Hiển thị</Text>
                  <Text style={styles.header_tableEnd}>Cập nhật</Text>
                </View>

                {mucTieuList.map((item, index) => {
                  return (
                    <View key={index} style={styles.one_row_dd_thucpham}>
                      <View style={styles.column50_thucpham}>
                        <Text style={{ flex: 1, ...FONTS.body3 }}>
                          {convertToDateOnly(item.time)}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          setIsVisible(true);
                          setItemViewChoose(item);
                        }}
                      >
                        <Text style={styles.column20_thucpham}>Xem</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setShowModalDelete(true);
                          setItemDeleteChoose(item);
                        }}
                      >
                        <Text style={styles.columnEnd_thucpham}>Xóa</Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
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
    fontWeight: "600",
    width: SIZES.width / 3,
    ...FONTS.h3,
  },

  header_table20: {
    color: COLORS.white,
    fontWeight: "600",
    width: SIZES.width / 4,
    textAlign: "center",
    ...FONTS.h3,
  },

  header_tableEnd: {
    flex: 1,
    color: COLORS.white,
    textAlign: "right",
    fontWeight: "600",
    ...FONTS.h3,
  },

  column50_thucpham: {
    color: COLORS.black,
    width: SIZES.width / 3,
    flexDirection: "row",
    alignItems: "center",
    height: 30,
  },

  one_row_dd_thucpham: {
    flexDirection: "row",
    marginVertical: 3,
    alignItems: "center",
  },

  column20_thucpham: {
    color: COLORS.blue,
    width: SIZES.width / 4,
    textAlign: "center",
    marginLeft: SIZES.radius,
    ...FONTS.body3,
  },

  columnEnd_thucpham: {
    color: COLORS.red,
    textAlign: "center",
    marginRight: SIZES.base,
    width: SIZES.width / 4,
    ...FONTS.body3,
  },

  column50: {
    color: COLORS.black,
    width: SIZES.width / 3,
    ...FONTS.body3,
  },

  one_row_dd: {
    flexDirection: "row",
    paddingHorizontal: SIZES.radius,
    marginVertical: 3,
  },

  column20: {
    color: COLORS.black,
    width: SIZES.width / 4,
    textAlign: "center",
    ...FONTS.body3,
  },

  columnEnd: {
    flex: 1,
    color: COLORS.black,
    textAlign: "center",
    ...FONTS.body3,
  },
});
