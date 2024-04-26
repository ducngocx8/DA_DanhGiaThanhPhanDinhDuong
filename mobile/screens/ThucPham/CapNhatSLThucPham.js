import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES, FONTS, icons } from "../../constants";
import HeaderDrawerChild from "../../components/HeaderDrawerChild";
import { ScrollView } from "react-native";
import axios from "axios";
import { BACKEND_BASE, ThucPhamChonURL } from "../../api";
import { notify } from "../../utils/variable";
import LoginViewMoreNonTab from "../../components/LoginViewMoreNonTab";

export default function CapNhatSLThucPham({ navigation }) {
  const [loading, isLoading] = useState(true);
  const [login, setLogin] = useState(false);
  const [thucPhamChonList, setThucPhamChonList] = useState([]);

  useEffect(() => {
    const getAllThucPhamChon = async () => {
      const response = await axios.get(`${ThucPhamChonURL}`, {
        withCredentials: true,
      });
      if (response.data.status) {
        setThucPhamChonList(response.data.data);
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigation.navigate("LoginViewMoreNonTab");
        }
      }
    };

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
        await Promise.all([Promise.resolve(getAllThucPhamChon())]);
        setLogin(true);
        isLoading(false);
      } else {
        setLogin(false);
        isLoading(false);
      }
    };

    handleAPIAll();
  }, []);

  const deleteThucPhamChonAPI = async (id_chon) => {
    return await axios
      .delete(`${ThucPhamChonURL}/${id_chon}`, {
        withCredentials: true,
      })
      .then((response) => {
        return response.data;
      });
  };

  const handleDeleteThucPhamChon = async (id_chon) => {
    const result = await deleteThucPhamChonAPI(id_chon);
    console.log(result);
    if (!result.status) {
      notify(false, result.message);
      if (result.must === "login") {
        return navigation.navigate("LoginViewMoreNonTab");
      }
    } else {
      notify(true, result.message);
      setThucPhamChonList(result.data);
    }
  };

  const updateQuantyThucPhamChonAPI = async (id_chon, thuc_pham) => {
    return await axios
      .put(`${ThucPhamChonURL}/${id_chon}`, thuc_pham, {
        withCredentials: true,
      })
      .then((response) => {
        return response.data;
      });
  };

  const handleUpdateQuantyThucPhamChon = async (
    id_chon,
    id_thucpham,
    quanty
  ) => {
    if (Number(quanty) === NaN || Number(quanty) <= 0) {
      return;
    }
    const thuc_pham = {
      id_thucpham,
      quanty: Number(quanty),
    };
    const result = await updateQuantyThucPhamChonAPI(id_chon, thuc_pham);
    console.log(result);
    if (!result.status) {
      notify(false, result.message);
      if (result.must === "login") {
        return navigation.navigate("LoginViewMoreNonTab");
      }
    } else {
      notify(true, result.message);
      setThucPhamChonList(result.data);
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
            paddingTop: SIZES.padding * 2,
            backgroundColor: COLORS.primary,
          }}
        >
          <View
            style={{
              paddingHorizontal: SIZES.padding,
            }}
          >
            <HeaderDrawerChild
              title={"Cập nhật/ Xóa thực phẩm"}
              navigation={navigation}
              disableRight={true}
            />
          </View>

          <ScrollView
            style={{
              flex: 1,
              backgroundColor: COLORS.lightGray2,
              paddingHorizontal: SIZES.padding,
            }}
          >
            <View
              style={{
                marginTop: SIZES.radius,
              }}
            >
              <Text
                style={{
                  ...FONTS.h3,
                }}
              >
                Danh sách thực phẩm
              </Text>
            </View>

            {/* Tiêu đề bảng */}
            <View
              style={{
                marginTop: SIZES.radius,
              }}
            >
              <View
                style={{
                  backgroundColor: COLORS.lightGray2,
                  flex: 1,
                  paddingBottom: SIZES.base,
                  borderBottomLeftRadius: SIZES.radius,
                  borderBottomRightRadius: SIZES.radius,
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
                  <Text style={styles.header_table50}>TP dinh dưỡng</Text>
                  <Text style={styles.header_table20}>Đơn vị</Text>
                  <Text style={styles.header_table30}>Số lượng</Text>
                  <Text style={styles.header_tableEnd}>Xóa</Text>
                </View>

                {thucPhamChonList.map((item, index) => {
                  return (
                    <View key={index} style={styles.one_row_dd}>
                      <Text style={styles.column50}>
                        {item.ThucPham.TenTiengViet ||
                          item.ThucPham.tenTiengAnh}
                      </Text>
                      <Text style={styles.column20}>gram</Text>
                      <TextInput
                        style={styles.column30}
                        keyboardType="decimal-pad"
                        defaultValue={String(Number(item.quanty) * 1)}
                        onChangeText={(value) => {
                          handleUpdateQuantyThucPhamChon(
                            item.id,
                            item.ThucPham.id_thucpham,
                            value
                          );
                        }}
                      />
                      <TouchableOpacity
                        style={styles.columnEnd}
                        onPress={() => {
                          handleDeleteThucPhamChon(item.id);
                        }}
                      >
                        <Image
                          source={icons.cross}
                          style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.red,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </View>
            {/* Paginatiom */}
            <View
              style={{
                marginTop: 65,
              }}
            ></View>
          </ScrollView>
          {/* Button Bottom */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("TongThanhPhanTP", {
                unmountOnBlur: true,
              });
            }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              paddingVertical: SIZES.base,
              backgroundColor: COLORS.white,
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                textAlign: "center",
                ...FONTS.h3,
                marginHorizontal: SIZES.padding,
                backgroundColor: COLORS.primary,
                paddingVertical: SIZES.radius,
                borderRadius: SIZES.radius,
              }}
            >
              Hoàn tất
            </Text>
          </TouchableOpacity>
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
    width: SIZES.width / 2.5,
    ...FONTS.h3,
  },

  header_table20: {
    color: COLORS.white,
    fontWeight: "600",
    width: SIZES.width / 8,
    textAlign: "center",
    ...FONTS.h3,
  },

  header_table30: {
    color: COLORS.white,
    fontWeight: "600",
    width: SIZES.width / 4.4,
    textAlign: "center",
    ...FONTS.h3,
  },

  header_tableEnd: {
    color: COLORS.white,
    textAlign: "right",
    fontWeight: "600",
    ...FONTS.h3,
  },

  column50: {
    color: COLORS.black,
    width: SIZES.width / 2.5,
    ...FONTS.body3,
  },

  one_row_dd: {
    flexDirection: "row",
    paddingHorizontal: SIZES.radius,
    alignItems: "center",
    marginVertical: 3,
  },

  column20: {
    color: COLORS.black,
    width: SIZES.width / 8,
    textAlign: "center",
    ...FONTS.body3,
  },

  column30: {
    color: COLORS.black,
    width: SIZES.width / 4.4,
    textAlign: "center",
    ...FONTS.body3,
    borderWidth: 1,
    borderRadius: SIZES.base,
    borderColor: COLORS.lightGray1,
    padding: 0,
  },

  columnEnd: {
    flex: 1,
    color: COLORS.black,
    textAlign: "center",
    ...FONTS.body3,
    marginLeft: 5,
  },
});
