import { View, Text, StyleSheet, Image, Modal, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES, FONTS, icons } from "../../constants";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import HeaderDrawerChild from "../../components/HeaderDrawerChild";
import axios from "axios";
import { BACKEND_BASE, ThucPhamChonURL, ThucPhamURL } from "../../api";
import { BUILD_ANDROID, notify } from "../../utils/variable";
import { useIsFocused } from "@react-navigation/native";
import LoginViewMoreNonTab from "../../components/LoginViewMoreNonTab";

export default function TongThanhPhanTP({ navigation }) {
  const [loading, isLoading] = useState(true);
  const [login, setLogin] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [thucPhamList, setThucPhamList] = useState([]);
  const [thucPhamChonList, setThucPhamChonList] = useState([]);
  const [tongThanhPhanChinh, setTongThanhPhanChinh] = useState({});

  const isFocused = useIsFocused();

  useEffect(() => {
    if (thucPhamChonList.length > 0) {
      tinhtongThanhPhanChinh(thucPhamChonList);
    }
  }, [thucPhamChonList]);

  useEffect(() => {
    const getAllThucPhamChon = async () => {
      const response = await axios.get(`${ThucPhamChonURL}`);
      if (response.data.status) {
        setThucPhamChonList(response.data.data);
      } else {
        if (response.data.must === "login") {
          return navigation.navigate("LoginViewMoreNonTab");
        }
      }
    };

    const getAllThucPham = async () => {
      const response = await axios.get(`${ThucPhamURL}`, {
        withCredentials: true,
      });
      if (response.data.status) {
        setThucPhamList(response.data.data);
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
        await Promise.all([
          Promise.resolve(getAllThucPhamChon()),
          Promise.resolve(getAllThucPham()),
        ]);
        setLogin(true);
        isLoading(false);
      } else {
        setLogin(false);
        isLoading(false);
      }
    };
    handleAPIAll();
  }, [isFocused]);

  const addThucPhamChonAPI = async (thuc_pham) => {
    return await axios
      .post(`${ThucPhamChonURL}`, thuc_pham, {
        withCredentials: true,
      })
      .then((response) => {
        return response.data;
      });
  };

  const handleAddThucPhamChon = async (id_thucpham) => {
    const thuc_pham = {
      id_thucpham: id_thucpham,
      quanty: 100,
    };
    const result = await addThucPhamChonAPI(thuc_pham);
    if (!result.status) {
      notify(false, result.message);
      if (result.must === "login") {
        return navigation.navigate("LoginViewMoreNonTab");
      }
    } else {
      setThucPhamChonList(result.data);
      notify(true, result.message);
    }
  };

  const tinhtongThanhPhanChinh = () => {
    const newTongThanhPhanChinh = {
      PROCNT: 0,
      FAT: 0,
      CHOCDF: 0,
      ENERC: 0,
      EDIBLE: 0,
      WATER: 0,
      FIBC: 0,
      ASH: 0,
      CA: 0,
      P: 0,
      FE: 0,
      ZN: 0,
      NA: 0,
      K: 0,
      MG: 0,
      MN: 0,
      CU: 0,
      SE: 0,
      VITC: 0,
      THIA: 0,
      RIBF: 0,
      NIA: 0,
      PANTAC: 0,
      VITB6: 0,
      FOL: 0,
      FOLAC: 0,
      BIOT: 0,
      VITB12: 0,
      RETOL: 0,
      VITA: 0,
      VITD: 0,
      VITE: 0,
      VITK: 0,
      CARTB: 0,
      CARTA: 0,
      CRYXB: 0,
    };
    thucPhamChonList?.forEach((item) => {
      for (const [key, value] of Object.entries(item.ThucPham)) {
        if (
          ![
            "id_thucpham",
            "TenTiengAnh",
            "TenTiengViet",
            "DonViTinh",
            "id_nhomthucpham",
            "image_url",
            "createdAt",
            "updatedAt",
            "thucpham_status",
          ].includes(key)
        ) {
          if (typeof Number(value) === "number") {
            if (key === "EDIBLE") {
              newTongThanhPhanChinh[key] =
                Number(newTongThanhPhanChinh[key]) + Number(value);
            } else {
              newTongThanhPhanChinh[key] =
                Number(newTongThanhPhanChinh[key]) +
                (Number(value) * Number(item.quanty)) / 100;
            }
          }
        }
      }
    });
    for (const [key, value] of Object.entries(newTongThanhPhanChinh)) {
      if (
        [
          "ENERC",
          "FAT",
          "PROCNT",
          "CHOCDF",
          "EDIBLE",
          "CA",
          "P",
          "FE",
          "NA",
          "K",
          "MG",
          "FOL",
          "FOLAC",
          "RETOL",
          "VITA",
          "CARTB",
          "CARTA",
          "CRYXB",
        ].includes(key)
      ) {
        newTongThanhPhanChinh[key] = Number(value).toFixed(0) * 1;
      } else if (["WATER"].includes(key)) {
        newTongThanhPhanChinh[key] = Number(value).toFixed(1) * 1;
      } else if (
        [
          "FIBC",
          "ASH",
          "ZN",
          "SE",
          "VITC",
          "BIOT",
          "VITB12",
          "VITD",
          "VITE",
          "VITK",
        ].includes(key)
      ) {
        newTongThanhPhanChinh[key] = Number(value).toFixed(2) * 1;
      } else if (
        ["MN", "CU", "THIA", "RIBF", "NIA", "PANTAC", "VITB6"].includes(key)
      ) {
        newTongThanhPhanChinh[key] = Number(value).toFixed(3) * 1;
      }
    }
    // console.log(newTongThanhPhanChinh);
    setTongThanhPhanChinh({ ...newTongThanhPhanChinh });
  };

  const ModalAddThucPham = () => {
    return (
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.transparentBlack7,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.white,
              marginHorizontal: SIZES.padding,
              paddingHorizontal: SIZES.radius,
              paddingVertical: SIZES.radius,
              borderRadius: SIZES.radius,
              height: SIZES.height / 2.5,
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
              <Text style={{ ...FONTS.h3 }}>Tìm kiếm thực phẩm</Text>
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
            {/* Search */}
            <View
              style={{
                flexDirection: "row",
                borderRadius: SIZES.base,
                borderWidth: 1,
                borderColor: COLORS.lightGray1,
                alignItems: "center",
                marginTop: SIZES.radius,
              }}
            >
              <TextInput
                placeholder="Nhập tên thực phẩm"
                style={{
                  paddingHorizontal: 5,
                  height: 45,
                  flex: 1,
                  ...FONTS.body3,
                }}
              />
            </View>

            {/* Search Result */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                paddingTop: SIZES.base,
                marginTop: SIZES.radius,
              }}
            >
              {thucPhamList.slice(0, 20).map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      handleAddThucPhamChon(item.id_thucpham);
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={icons.carb}
                        style={{
                          width: 20,
                          height: 20,
                        }}
                      />
                      <Text
                        style={{
                          ...FONTS.body3,
                          marginLeft: 2,
                        }}
                      >
                        {item.TenTiengViet || item.TenTiengAnh}
                      </Text>
                    </View>
                    <View
                      style={{
                        height: 1,
                        backgroundColor: COLORS.lightGray1,
                        marginVertical: SIZES.base,
                      }}
                    ></View>
                  </TouchableOpacity>
                );
              })}
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
              title={"Tổng giá trị dinh dưỡng"}
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
            {/* Render Modal Add Thực phẩm */}
            {setIsVisible && ModalAddThucPham()}
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
                  Danh sách thực phẩm
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setIsVisible(true);
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.h3,
                      color: COLORS.blue,
                    }}
                  >
                    Thêm
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("CapNhatSLThucPham");
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.h3,
                      color: COLORS.blue,
                    }}
                  >
                    Chỉnh sửa
                  </Text>
                </TouchableOpacity>
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
                  <Text style={styles.header_table50}>Tên thực phẩm</Text>
                  <Text style={styles.header_table20}>Đơn vị</Text>
                  <Text style={styles.header_tableEnd}>Số lượng</Text>
                </View>

                {thucPhamChonList.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={styles.one_row_dd_thucpham}
                      onPress={() => {
                        navigation.navigate("ChiTietThucPham", {
                          id_thucpham: item.ThucPham.id_thucpham,
                          id_nhomthucpham: item.ThucPham.id_nhomthucpham,
                          quanty: item.quanty * 1,
                        });
                      }}
                    >
                      <View style={styles.column50_thucpham}>
                        <Image
                          source={icons.carb}
                          style={{ width: 40, height: 40 }}
                          resizeMode="center"
                        />
                        <Text style={{ flex: 1, ...FONTS.body3 }}>
                          {item.ThucPham.TenTiengViet ||
                            item.ThucPham.TenTiengAnh}
                        </Text>
                      </View>
                      <Text style={styles.column20_thucpham}>gram</Text>
                      <Text style={styles.columnEnd_thucpham}>
                        {item.quanty * 1}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            {/* Render Kết quả tính toán */}
            {thucPhamChonList.length > 0 && (
              <View style={{ flex: 1, marginTop: SIZES.radius }}>
                <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.primary,
                  }}
                >
                  Kết quả
                </Text>

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
                    <Text style={styles.header_tableEnd}>Hàm lượng</Text>
                  </View>

                  <View style={styles.one_row_dd}>
                    <Text style={styles.column50}>Tỷ lệ phần ăn được</Text>
                    <Text style={styles.column20}>%</Text>
                    <Text style={styles.columnEnd}>
                      {tongThanhPhanChinh.EDIBLE}
                    </Text>
                  </View>

                  <View style={styles.one_row_dd}>
                    <Text style={styles.column50}>Năng Lượng</Text>
                    <Text style={styles.column20}>KCal</Text>
                    <Text style={styles.columnEnd}>
                      {tongThanhPhanChinh.ENERC}
                    </Text>
                  </View>

                  <View style={styles.one_row_dd}>
                    <Text style={styles.column50}>Hàm lượng nước</Text>
                    <Text style={styles.column20}>g</Text>
                    <Text style={styles.columnEnd}>
                      {tongThanhPhanChinh.WATER}
                    </Text>
                  </View>

                  <View style={styles.one_row_dd}>
                    <Text style={styles.column50}>Tổng protein</Text>
                    <Text style={styles.column20}>g</Text>
                    <Text style={styles.columnEnd}>
                      {tongThanhPhanChinh.PROCNT}
                    </Text>
                  </View>

                  <View style={styles.one_row_dd}>
                    <Text style={styles.column50}>Tổng chất béo</Text>
                    <Text style={styles.column20}>g</Text>
                    <Text style={styles.columnEnd}>
                      {tongThanhPhanChinh.FAT}
                    </Text>
                  </View>

                  <View style={styles.one_row_dd}>
                    <Text style={styles.column50}>Tổng Carbohydrate</Text>
                    <Text style={styles.column20}>g</Text>
                    <Text style={styles.columnEnd}>
                      {tongThanhPhanChinh.CHOCDF}
                    </Text>
                  </View>

                  <View style={styles.one_row_dd}>
                    <Text style={styles.column50}>Chất xơ</Text>
                    <Text style={styles.column20}>g</Text>
                    <Text style={styles.columnEnd}>
                      {tongThanhPhanChinh.FIBC}
                    </Text>
                  </View>

                  <View style={styles.one_row_dd}>
                    <Text style={styles.column50}>Tro</Text>
                    <Text style={styles.column20}>g</Text>
                    <Text style={styles.columnEnd}>
                      {tongThanhPhanChinh.ASH}
                    </Text>
                  </View>

                  <View style={styles.one_row_dd}>
                    <Text style={styles.column50}>Canxi</Text>
                    <Text style={styles.column20}>mg</Text>
                    <Text style={styles.columnEnd}>
                      {tongThanhPhanChinh.CA}
                    </Text>
                  </View>

                  <View style={styles.one_row_dd}>
                    <Text style={styles.column50}>Phospho</Text>
                    <Text style={styles.column20}>mg</Text>
                    <Text style={styles.columnEnd}>{tongThanhPhanChinh.P}</Text>
                  </View>

                  <View style={styles.one_row_dd}>
                    <Text style={styles.column50}>Sắt</Text>
                    <Text style={styles.column20}>mg</Text>
                    <Text style={styles.columnEnd}>
                      {tongThanhPhanChinh.FE}
                    </Text>
                  </View>

                  <View style={styles.one_row_dd}>
                    <Text style={styles.column50}>Kẽm</Text>
                    <Text style={styles.column20}>mg</Text>
                    <Text style={styles.columnEnd}>
                      {tongThanhPhanChinh.ZN}
                    </Text>
                  </View>

                  <View style={styles.one_row_dd}>
                    <Text style={styles.column50}>Natri</Text>
                    <Text style={styles.column20}>mg</Text>
                    <Text style={styles.columnEnd}>
                      {tongThanhPhanChinh.NA}
                    </Text>
                  </View>

                  <View style={styles.one_row_dd}>
                    <Text style={styles.column50}>Kali</Text>
                    <Text style={styles.column20}>mg</Text>
                    <Text style={styles.columnEnd}>{tongThanhPhanChinh.K}</Text>
                  </View>

                  <View style={styles.one_row_dd}>
                    <Text style={styles.column50}>Magie</Text>
                    <Text style={styles.column20}>mg</Text>
                    <Text style={styles.columnEnd}>
                      {tongThanhPhanChinh.MG}
                    </Text>
                  </View>

                  <View style={styles.one_row_dd}>
                    <Text style={styles.column50}>Mangan</Text>
                    <Text style={styles.column20}>mg</Text>
                    <Text style={styles.columnEnd}>
                      {tongThanhPhanChinh.MN}
                    </Text>
                  </View>

                  <View style={styles.one_row_dd}>
                    <Text style={styles.column50}>Đồng</Text>
                    <Text style={styles.column20}>mg</Text>
                    <Text style={styles.columnEnd}>
                      {tongThanhPhanChinh.CU}
                    </Text>
                  </View>

                  <View style={styles.one_row_dd}>
                    <Text style={styles.column50}>Selen</Text>
                    <Text style={styles.column20}>µg</Text>
                    <Text style={styles.columnEnd}>
                      {tongThanhPhanChinh.SE}
                    </Text>
                  </View>

                  <View style={styles.one_row_dd}>
                    <Text style={styles.column50}>Vitamin C</Text>
                    <Text style={styles.column20}>mg</Text>
                    <Text style={styles.columnEnd}>
                      {tongThanhPhanChinh.VITC}
                    </Text>
                  </View>

                  <View style={styles.one_row_dd}>
                    <Text style={styles.column50}>Vitamin B1 (Thiamin)</Text>
                    <Text style={styles.column20}>mg</Text>
                    <Text style={styles.columnEnd}>
                      {tongThanhPhanChinh.THIA}
                    </Text>
                  </View>

                  <View style={styles.one_row_dd}>
                    <Text style={styles.column50}>Vitamin B2 (Riboflavin)</Text>
                    <Text style={styles.column20}>mg</Text>
                    <Text style={styles.columnEnd}>
                      {tongThanhPhanChinh.RIBF}
                    </Text>
                  </View>

                  <View style={styles.one_row_dd}>
                    <Text style={styles.column50}>Niacin</Text>
                    <Text style={styles.column20}>mg</Text>
                    <Text style={styles.columnEnd}>
                      {tongThanhPhanChinh.NIA}
                    </Text>
                  </View>

                  <View style={styles.one_row_dd}>
                    <Text style={styles.column50}>Acid pantothenic</Text>
                    <Text style={styles.column20}>mg</Text>
                    <Text style={styles.columnEnd}>
                      {tongThanhPhanChinh.PANTAC}
                    </Text>
                  </View>

                  <View style={styles.one_row_dd}>
                    <Text style={styles.column50}>Vitamin B6</Text>
                    <Text style={styles.column20}>mg</Text>
                    <Text style={styles.columnEnd}>
                      {tongThanhPhanChinh.VITB6}
                    </Text>
                  </View>

                  <View style={styles.one_row_dd}>
                    <Text style={styles.column50}>Vitamin A</Text>
                    <Text style={styles.column20}>µg</Text>
                    <Text style={styles.columnEnd}>
                      {tongThanhPhanChinh.VITA}
                    </Text>
                  </View>

                  <View style={styles.one_row_dd}>
                    <Text style={styles.column50}>Vitamin D</Text>
                    <Text style={styles.column20}>µg</Text>
                    <Text style={styles.columnEnd}>
                      {tongThanhPhanChinh.VITD}
                    </Text>
                  </View>

                  <View style={styles.one_row_dd}>
                    <Text style={styles.column50}>Vitamin E</Text>
                    <Text style={styles.column20}>mg</Text>
                    <Text style={styles.columnEnd}>
                      {tongThanhPhanChinh.VITE}
                    </Text>
                  </View>

                  <View style={styles.one_row_dd}>
                    <Text style={styles.column50}>Vitamin K</Text>
                    <Text style={styles.column20}>µg</Text>
                    <Text style={styles.columnEnd}>
                      {tongThanhPhanChinh.VITK}
                    </Text>
                  </View>

                  <View style={styles.one_row_dd}>
                    <Text style={styles.column50}>Vitamin B12</Text>
                    <Text style={styles.column20}>µg</Text>
                    <Text style={styles.columnEnd}>
                      {tongThanhPhanChinh.VITB12}
                    </Text>
                  </View>

                  <View style={styles.one_row_dd}>
                    <Text style={styles.column50}>Tổng FOL</Text>
                    <Text style={styles.column20}>µg</Text>
                    <Text style={styles.columnEnd}>
                      {tongThanhPhanChinh.FOL}
                    </Text>
                  </View>

                  <View style={styles.one_row_dd}>
                    <Text style={styles.column50}>Acid Folic</Text>
                    <Text style={styles.column20}>µg</Text>
                    <Text style={styles.columnEnd}>
                      {tongThanhPhanChinh.FOLAC * 1}
                    </Text>
                  </View>

                  <View style={styles.one_row_dd}>
                    <Text style={styles.column50}>Biotin</Text>
                    <Text style={styles.column20}>µg</Text>
                    <Text style={styles.columnEnd}>
                      {tongThanhPhanChinh.BIOT * 1}
                    </Text>
                  </View>

                  <View style={styles.one_row_dd}>
                    <Text style={styles.column50}>Retinol</Text>
                    <Text style={styles.column20}>µg</Text>
                    <Text style={styles.columnEnd}>
                      {tongThanhPhanChinh.RETOL * 1}
                    </Text>
                  </View>

                  <View style={styles.one_row_dd}>
                    <Text style={styles.column50}>Beta Carotene Alpha</Text>
                    <Text style={styles.column20}>µg</Text>
                    <Text style={styles.columnEnd}>
                      {tongThanhPhanChinh.CARTB * 1}
                    </Text>
                  </View>

                  <View style={styles.one_row_dd}>
                    <Text style={styles.column50}>Alpha Carotene</Text>
                    <Text style={styles.column20}>µg</Text>
                    <Text style={styles.columnEnd}>
                      {tongThanhPhanChinh.CARTA * 1}
                    </Text>
                  </View>

                  <View style={styles.one_row_dd}>
                    <Text style={styles.column50}>CRYXB</Text>
                    <Text style={styles.column20}>µg</Text>
                    <Text style={styles.columnEnd}>
                      {tongThanhPhanChinh.CRYXB * 1}
                    </Text>
                  </View>
                </View>
              </View>
            )}

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
    width: SIZES.width / 2.2,
    ...FONTS.h3,
  },

  header_table20: {
    color: COLORS.white,
    fontWeight: "600",
    width: SIZES.width / 8,
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
    width: SIZES.width / 2.2,
    flexDirection: "row",
    alignItems: "center",
  },

  one_row_dd_thucpham: {
    flexDirection: "row",
    marginVertical: 3,
    alignItems: "center",
  },

  column20_thucpham: {
    color: COLORS.black,
    width: SIZES.width / 8,
    textAlign: "center",
    marginLeft: SIZES.radius,
    ...FONTS.body3,
  },

  columnEnd_thucpham: {
    flex: 1,
    color: COLORS.black,
    textAlign: "right",
    alignItems: "center",
    marginRight: SIZES.base,
    ...FONTS.body3,
  },

  column50: {
    color: COLORS.black,
    width: SIZES.width / 2.2,
    ...FONTS.body3,
  },

  one_row_dd: {
    flexDirection: "row",
    paddingHorizontal: SIZES.radius,
    marginVertical: 3,
  },

  column20: {
    color: COLORS.black,
    width: SIZES.width / 8,
    textAlign: "center",
    ...FONTS.body3,
  },

  columnEnd: {
    flex: 1,
    color: COLORS.black,
    textAlign: "right",
    ...FONTS.body3,
  },
});
