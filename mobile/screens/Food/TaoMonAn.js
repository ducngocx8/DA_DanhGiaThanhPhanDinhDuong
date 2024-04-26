import { View, Text, StyleSheet, Modal, TextInput, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES, FONTS, icons } from "../../constants";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import HeaderDrawerChild from "../../components/HeaderDrawerChild";
import axios from "axios";
import { MonAnURL, NhomMonAnURL } from "../../api";
import { BUILD_ANDROID, notify } from "../../utils/variable";
import { useIsFocused } from "@react-navigation/native";
import SeachTaoMonAn from "./SeachTaoMonAn";
import ModalNhapSoLuongTP from "./ModalNhapSoLuongTP";
import ModalRemoveChiTietMon from "./ModalRemoveChiTietMon";
import TongDinhDuongMonAn from "./TongDinhDuongMonAn";

export default function TaoMonAn({ navigation }) {
  const [loading, isLoading] = useState(true);
  const [showModalNhapSoLuongTP, setShowModalNhapSoLuongTP] = useState({
    show: false,
    status: "TAOMON_EDIT",
    chi_tiet_mon: null,
  });
  const [showModalRemoveChiTietMon, setShowModalRemoveChiTietMon] = useState({
    show: false,
    chi_tiet_mon: null,
    status: "TAOMON_REMOVE",
  });
  const [chiTietMonList, setChiTietMonList] = useState([]);
  const [nhomMonAnList, setNhomMonAnList] = useState([]);
  const [showModalChonNhomMonAn, setShowModalChonNhomMonAn] = useState(false);
  const [nhomMonAnChoose, setNhomMonAnChoose] = useState({
    id_nhommonan: -1,
    ten_nhom: "Chọn nhóm món ăn",
  });
  const [monAnInput, setMonAnInput] = useState({
    ten_mon: "",
    don_vi: "",
  });
  const isFocused = useIsFocused();

  useEffect(() => {
    async function getAllNhomMonAn() {
      const response = await axios.get(`${NhomMonAnURL}`, {
        withCredentials: true,
      });
      if (response.data.status) {
        setNhomMonAnList(response.data.data);
      } else {
        notify(false, response.data.message);
      }
    }
    const handleAPIAll = async () => {
      await Promise.all([Promise.resolve(getAllNhomMonAn())]);
      isLoading(false);
    };
    handleAPIAll();
  }, [isFocused]);

  const addToList = async (chi_tiet_mon) => {
    const newChiTietMonList = [...chiTietMonList];
    newChiTietMonList.push(chi_tiet_mon);
    newChiTietMonList.sort((a, b) =>
      b.ten_phannhom.localeCompare(a.ten_phannhom)
    );
    setChiTietMonList(newChiTietMonList);
    setShowModalNhapSoLuongTP({ ...showModalNhapSoLuongTP, show: false });
    return {
      status: true,
      message: "Thêm chi tiết món thành công",
    };
  };

  const updateChiTietMon = async (chiTietMonInput) => {
    const chi_tiet_mon_find = chiTietMonList.findIndex(
      (chi_tiet) =>
        chi_tiet.id_chitietmon ===
        showModalNhapSoLuongTP.chi_tiet_mon.id_chitietmon
    );
    if (chi_tiet_mon_find !== -1) {
      const newChiTietMonList = [...chiTietMonList];
      newChiTietMonList[chi_tiet_mon_find].quanty = Number(
        chiTietMonInput.quanty
      );
      newChiTietMonList[chi_tiet_mon_find].ten_phannhom =
        chiTietMonInput.ten_phannhom.trim();
      newChiTietMonList.sort((a, b) =>
        b.ten_phannhom.localeCompare(a.ten_phannhom)
      );
      setChiTietMonList(newChiTietMonList);
      return {
        status: true,
      };
    } else {
      return {
        status: false,
        message: "Không tìm thấy thực thẩm này trong chi tiết món ăn",
      };
    }
  };

  const handleRemoveChiTietMon = () => {
    const id_chi_tiet_mon_remove =
      showModalRemoveChiTietMon.chi_tiet_mon.id_chitietmon;
    const chi_tiet_mon_find = chiTietMonList.findIndex(
      (chi_tiet) => chi_tiet.id_chitietmon === id_chi_tiet_mon_remove
    );
    if (chi_tiet_mon_find !== -1) {
      const newChiTietMonList = [...chiTietMonList];
      newChiTietMonList.splice(chi_tiet_mon_find, 1);
      setChiTietMonList(newChiTietMonList);
      setShowModalRemoveChiTietMon({
        ...showModalRemoveChiTietMon,
        show: false,
        chi_tiet_mon: null,
      });
    } else {
      notify(false, "Không tìm thấy chi tiết món ăn");
    }
  };

  const addProduct = async (newProduct) => {
    const response = await axios.post(`${MonAnURL + "/by/user"}`, newProduct, {
      withCredentials: true,
    });
    notify(response.data.status, response.data.message);
    if (response.data.status) {
      setNhomMonAnChoose({
        id_nhommonan: -1,
        ten_nhom: "Chọn nhóm món ăn",
      });
      setMonAnInput({
        ten_mon: "",
        don_vi: "",
      });
      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    } else {
      if (response.data.must === "login") {
        return navigation.navigate("LoginViewMoreNonTab");
      }
    }
  };

  const handleAddMonAn = async () => {
    if (monAnInput.ten_mon.trim() === "") {
      notify(false, "Vui lòng điền tên món ăn");
      return;
    } else if (monAnInput.don_vi.trim() === "") {
      notify(false, "Vui lòng điền đơn vị món ăn");
      return;
    } else if (
      nhomMonAnChoose.id_nhommonan === "" ||
      Number(nhomMonAnChoose.id_nhommonan) === -1
    ) {
      notify(false, "Vui lòng chọn nhóm món ăn");
      return;
    } else if (chiTietMonList.length === 0) {
      notify(false, "Vui lòng thêm ít nhất một thực thẩm");
      return;
    }
    const listChiTietMon = chiTietMonList.map((item) => {
      return {
        ten_phannhom: item.ten_phannhom,
        quanty: item.quanty,
        id_thucpham: item.id_thucpham,
      };
    });

    const newProduct = {
      ten_mon: String(monAnInput.ten_mon).trim(),
      don_vi: String(monAnInput.don_vi).trim(),
      id_nhommonan: nhomMonAnChoose.id_nhommonan,
      listChiTietMon,
      image_url: "",
      monan_status: 0,
    };
    await addProduct(newProduct);
  };

  const renderModalChonNhomMonAn = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModalChonNhomMonAn}
      >
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
              height: SIZES.height / 3,
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
              <Text style={{ ...FONTS.h3 }}>Chọn nhóm món ăn</Text>
              <TouchableOpacity
                onPress={() => {
                  setShowModalChonNhomMonAn(false);
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
            {/* Lựa chọn */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                paddingTop: SIZES.base,
                marginTop: SIZES.radius,
              }}
            >
              {nhomMonAnList.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      if (item.id_nhommonan !== nhomMonAnChoose.id_nhommonan) {
                        setNhomMonAnChoose(item);
                      }
                      setShowModalChonNhomMonAn(false);
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          ...FONTS.body3,
                          marginLeft: 2,
                        }}
                      >
                        {item.ten_nhom}
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

  const renderInputMonAn = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              ...FONTS.body3,
              flex: 4,
            }}
          >
            Tên món:
          </Text>
          <TextInput
            onChangeText={(value) => {
              setMonAnInput({ ...monAnInput, ten_mon: value });
            }}
            maxLength={30}
            value={monAnInput.ten_mon}
            style={{
              flex: 6,
              borderWidth: 1,
              height: 40,
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
            flexDirection: "row",
            alignItems: "center",
            marginTop: SIZES.radius,
          }}
        >
          <Text
            style={{
              ...FONTS.body3,
              flex: 4,
            }}
          >
            Đơn vị:
          </Text>
          <TextInput
            onChangeText={(value) => {
              setMonAnInput({ ...monAnInput, don_vi: value });
            }}
            maxLength={30}
            value={monAnInput.don_vi}
            style={{
              flex: 6,
              borderWidth: 1,
              height: 40,
              ...FONTS.body3,
              borderColor: COLORS.lightGray1,
              paddingHorizontal: 10,
              borderRadius: SIZES.base,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: SIZES.radius,
          }}
        >
          <Text
            style={{
              ...FONTS.body3,
              flex: 4,
            }}
          >
            Nhóm món ăn:
          </Text>
          <TouchableOpacity
            onPress={() => {
              setShowModalChonNhomMonAn(true);
            }}
            style={{
              backgroundColor: COLORS.primary,
              paddingHorizontal: 3,
              paddingVertical: 3,
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.white,
              }}
            >
              {nhomMonAnChoose.ten_nhom}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      {loading ? (
        ""
      ) : (
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
              title={"Tạo món ăn mới"}
              disableRight={true}
            />
          </View>

          <View
            style={{
              backgroundColor: COLORS.white,
              paddingHorizontal: SIZES.padding,
              paddingVertical: SIZES.padding,
              flex: 1,
            }}
          >
            {/* Render Modal Nhap So Luong */}
            {showModalNhapSoLuongTP.show && (
              <ModalNhapSoLuongTP
                setShowModalNhapSoLuongTP={() => {
                  setShowModalNhapSoLuongTP({
                    ...showModalNhapSoLuongTP,
                    show: false,
                  });
                }}
                chi_tiet_mon={showModalNhapSoLuongTP.chi_tiet_mon}
                updateChiTietMon={updateChiTietMon}
                status={showModalNhapSoLuongTP.status}
              />
            )}
            {/* Render Modal Xóa Chi Tiết Món */}
            {showModalRemoveChiTietMon.show && (
              <ModalRemoveChiTietMon
                setShowModalRemoveChiTietMon={() => {
                  setShowModalRemoveChiTietMon({
                    ...showModalRemoveChiTietMon,
                    show: false,
                  });
                }}
                chi_tiet_mon={showModalRemoveChiTietMon.chi_tiet_mon}
                handleRemoveChiTietMon={handleRemoveChiTietMon}
              />
            )}
            {/* Render Modal chọn nhóm món ăn */}
            {showModalChonNhomMonAn && renderModalChonNhomMonAn()}
            {/* renderInputMonAn */}
            {renderInputMonAn()}
            {/* Render Search */}
            <SeachTaoMonAn addToList={addToList} />
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Render danh sách chi tiết món */}
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
                    Thực phẩm trong món ăn
                  </Text>
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
                    <Text style={styles.header_table20}>Nhóm</Text>
                    <Text style={styles.header_table50}>Tên thực phẩm</Text>
                    <Text style={styles.header_table10}>SL</Text>
                    <Text style={styles.header_tableEnd}>Cập nhật</Text>
                  </View>

                  {chiTietMonList.length > 0 ? (
                    chiTietMonList.map((item, index) => {
                      return (
                        <View key={index} style={styles.one_row_dd_thucpham}>
                          <Text style={styles.column20_thucpham}>
                            {item.ten_phannhom}
                          </Text>
                          <TouchableOpacity
                            style={styles.column50_thucpham}
                            onPress={() => {
                              navigation.navigate("ChiTietThucPham", {
                                id_thucpham: item.ThucPham.id_thucpham,
                              });
                            }}
                          >
                            <Text
                              style={{
                                flex: 1,
                                ...FONTS.body3,
                                textAlign: "center",
                              }}
                            >
                              {item.ThucPham.TenTiengViet ||
                                item.ThucPham.TenTiengAnh}
                            </Text>
                          </TouchableOpacity>
                          <View style={styles.column10_thucpham}>
                            <Text style={{ ...FONTS.body3 }}>
                              {Number(item.quanty) * 1}
                            </Text>
                          </View>
                          <View style={styles.columnEnd_thucpham}>
                            <TouchableOpacity
                              onPress={() => {
                                setShowModalNhapSoLuongTP({
                                  ...showModalNhapSoLuongTP,
                                  show: true,
                                  status: "TAOMON_EDIT",
                                  chi_tiet_mon: item,
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
                              <Text>{" | "}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => {
                                setShowModalRemoveChiTietMon({
                                  ...showModalRemoveChiTietMon,
                                  show: true,
                                  chi_tiet_mon: item,
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
                      Món ăn chưa có thực phẩm nào
                    </Text>
                  )}
                </View>
              </View>

              {/* Render tổng dinh dưỡng */}
              {chiTietMonList.length > 0 && (
                <TongDinhDuongMonAn chiTietMonList={chiTietMonList} />
              )}
            </ScrollView>
          </View>
          <TouchableOpacity
            onPress={() => {
              handleAddMonAn();
            }}
            style={{
              borderRadius: SIZES.radius,
              paddingVertical: SIZES.radius,
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                textAlign: "center",
                ...FONTS.h3,
              }}
            >
              Tạo món ăn
            </Text>
          </TouchableOpacity>
        </View>
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
    flex: 2.5,
    textAlign: "left",
    ...FONTS.h3,
  },
  header_table10: {
    color: COLORS.white,
    flex: 1.6,
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
    flex: 2.5,
    textAlign: "left",
    alignItems: "center",
    ...FONTS.body3,
  },

  column10_thucpham: {
    color: COLORS.black,
    flex: 1.6,
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
