import { View, Text, StyleSheet, Image, Modal, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES, FONTS, icons } from "../../constants";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import HeaderDrawerChild from "../../components/HeaderDrawerChild";
import axios from "axios";
import {
  ChiSoUserLastURL,
  DoiTuongURL,
  LaoDongURL,
  NhomTuoiURL,
  NhuCauDinhDuongURL,
} from "../../api";
import { BUILD_ANDROID, notify } from "../../utils/variable";
import { useIsFocused } from "@react-navigation/native";

export default function NhuCauDinhDuong({ navigation }) {
  let [keyword, setKeyword] = useState("");
  const [loading, isLoading] = useState(true);
  const [showModalDoiTuong, setShowModalDoiTuong] = useState(false);
  const [showModalNhomTuoi, setShowModalNhomTuoi] = useState(false);
  const [showModalLaoDong, setShowModalLaoDong] = useState(false);
  const [laoDongList, setLaoDongList] = useState([]);
  const [nhomTuoiList, setNhomTuoiList] = useState([]);
  const [doiTuongList, setDoiTuongList] = useState([]);
  const [laoDongChoose, setLaoDongChoose] = useState({
    id_laodong: -1,
    TenLaoDong: "Chọn mức độ",
  });
  const [doiTuongChoose, setDoiTuongChoose] = useState({
    id_doituong: -1,
    TenDoiTuong: "Chọn đối tượng",
  });
  const [nhomTuoiChoose, setNhomTuoiChoose] = useState({
    id_nhomtuoi: -1,
    TenNhomTuoi: "Chọn nhóm tuổi",
  });
  const [nhuCauDinhDuongOB, setNhuCauDinhDuongOB] = useState(null);
  const [indexInfo, setIndexInfo] = useState(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    const handleTraCuuNhuCau = async () => {
      const response = await axios.get(
        `${
          NhuCauDinhDuongURL +
          "/doi-tuong?id_doituong=" +
          doiTuongChoose.id_doituong +
          "&id_nhomtuoi=" +
          nhomTuoiChoose.id_nhomtuoi +
          "&id_laodong=" +
          laoDongChoose.id_laodong
        }`
      );
      setNhuCauDinhDuongOB(response.data);
    };
    if (
      laoDongChoose.id_laodong !== -1 &&
      doiTuongChoose.id_doituong !== -1 &&
      nhomTuoiChoose.id_nhomtuoi !== -1
    ) {
      handleTraCuuNhuCau();
    }
  }, [doiTuongChoose, laoDongChoose, nhomTuoiChoose]);

  useEffect(() => {
    let laodong = {
      id_laodong: -1,
      TenLaoDong: "Chọn mức độ",
    };
    let nhomtuoi = {
      id_nhomtuoi: -1,
      TenNhomTuoi: "Chọn nhóm tuổi",
    };
    let doituong = {
      id_doituong: -1,
      TenDoiTuong: "Chọn đối tượng",
    };
    if (indexInfo) {
      const find_laodong = laoDongList.find(
        (item) => item.id_laodong === indexInfo.id_laodong
      );
      if (find_laodong) {
        laodong = find_laodong;
      }
      const find_doituong = doiTuongList.find(
        (item) => item.id_doituong === indexInfo.id_doituong
      );
      if (find_doituong) {
        doituong = find_doituong;
      }
      const find_age = nhomTuoiList.find(
        (item) =>
          item.strAge <= indexInfo.age * 12 && item.endAge >= indexInfo.age * 12
      );
      if (find_age) {
        nhomtuoi = find_age;
      }
      setDoiTuongChoose(doituong);
      setLaoDongChoose(laodong);
      setNhomTuoiChoose(nhomtuoi);
    }
  }, [indexInfo]);

  useEffect(() => {
    const getIndexInfo = async () => {
      const response = await axios.get(`${ChiSoUserLastURL}`, {
        withCredentials: true,
      });
      if (response.data.status) {
        setIndexInfo(response.data.data);
      }
      isLoading(false);
    };

    const getAllNhomTuoi = async () => {
      const response = await axios.get(`${NhomTuoiURL}`);
      if (response.data.status) {
        setNhomTuoiList(response.data.data);
      } else {
        notify(false, response.data.message);
      }
    };

    const getAllDoiTuong = async () => {
      const response = await axios.get(`${DoiTuongURL}`);
      if (response.data.status) {
        setDoiTuongList(response.data.data);
      } else {
        notify(false, response.data.message);
      }
    };

    const getAllLaoDong = async () => {
      const response = await axios.get(`${LaoDongURL}`);
      if (response.data.status) {
        setLaoDongList(response.data.data);
      } else {
        notify(false, response.data.message);
      }
    };

    const getAll = async () => {
      await Promise.all([
        Promise.resolve(getAllDoiTuong()),
        Promise.resolve(getAllLaoDong()),
        Promise.resolve(getAllNhomTuoi()),
      ]);
      await getIndexInfo();
    };
    getAll();
  }, [isFocused]);

  const filterSearch = () => {
    const keyword_search = keyword.trim().toLocaleLowerCase();
    if (nhuCauDinhDuongOB.data) {
      const newKhuyenNghi = {};
      for (const [key, value] of Object.entries(
        nhuCauDinhDuongOB.data.ThanhPhanNhuCau
      )) {
        if (
          String(String(value).trim().toLocaleLowerCase()).includes(
            keyword_search
          ) ||
          String(String(key).trim().toLocaleLowerCase()).includes(
            keyword_search
          )
        ) {
          newKhuyenNghi[key] = value === null ? "-" : value;
        }
      }
      return newKhuyenNghi;
    } else {
      return nhuCauDinhDuongOB;
    }
  };

  const renderKhuyenNghi = () => {
    const thanhPhanNhuCauList = [];
    const thanhPhanNhuCauObject = filterSearch();
    for (const [key, value] of Object.entries(thanhPhanNhuCauObject)) {
      if (key !== "id_nhucau") {
        thanhPhanNhuCauList.push(
          <TouchableOpacity key={key} style={styles.one_row_dd_thucpham}>
            <Text style={styles.column20_thucpham}>
              {key === "DienGiai"
                ? "Diễn giải"
                : key === "NangLuong"
                ? "Năng lượng"
                : key}
            </Text>
            <Text style={styles.column50_thucpham}>{value}</Text>
          </TouchableOpacity>
        );
      }
    }
    return thanhPhanNhuCauList;
  };

  const ModalChonDoiTuong = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModalDoiTuong}
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
              <Text style={{ ...FONTS.h3 }}>Chọn đối tượng</Text>
              <TouchableOpacity
                onPress={() => {
                  setShowModalDoiTuong(false);
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
              {doiTuongList.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      if (item.id_doituong !== doiTuongChoose.id_doituong) {
                        setDoiTuongChoose(item);
                        setNhuCauDinhDuongOB(null);
                      }
                      setShowModalDoiTuong(false);
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
                        {item.TenDoiTuong}
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

  const ModalChonNhomTuoi = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModalNhomTuoi}
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
              <Text style={{ ...FONTS.h3 }}>Chọn nhóm tuổi</Text>
              <TouchableOpacity
                onPress={() => {
                  setShowModalNhomTuoi(false);
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
              {nhomTuoiList.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      if (item.id_nhomtuoi !== nhomTuoiChoose.id_nhomtuoi) {
                        setNhomTuoiChoose(item);
                        setNhuCauDinhDuongOB(null);
                      }
                      setShowModalNhomTuoi(false);
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
                        {item.TenNhomTuoi}
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

  const ModalChonLaoDong = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModalLaoDong}
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
              height: SIZES.height / 4,
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
              <Text style={{ ...FONTS.h3 }}>Chọn mức độ lao động</Text>
              <TouchableOpacity
                onPress={() => {
                  setShowModalLaoDong(false);
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
              {laoDongList.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      if (item.id_laodong !== laoDongChoose.id_laodong) {
                        setLaoDongChoose(item);
                        setNhuCauDinhDuongOB(null);
                      }
                      setShowModalLaoDong(false);
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
                        {item.TenLaoDong}
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
              title={"Nhu cầu khuyến nghị"}
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
            {/* Render Modal */}
            {showModalNhomTuoi && ModalChonNhomTuoi()}
            {showModalDoiTuong && ModalChonDoiTuong()}
            {showModalLaoDong && ModalChonLaoDong()}
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
                  Đối tượng
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    setShowModalDoiTuong(true);
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.h3,
                      color: COLORS.blue,
                    }}
                  >
                    {doiTuongChoose.TenDoiTuong.trim().length > 33
                      ? doiTuongChoose.TenDoiTuong.trim().slice(0, 33) + "..."
                      : doiTuongChoose.TenDoiTuong.trim()}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: SIZES.base,
                }}
              >
                <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.primary,
                  }}
                >
                  Nhóm tuổi
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    setShowModalNhomTuoi(true);
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.h3,
                      color: COLORS.blue,
                    }}
                  >
                    {nhomTuoiChoose.TenNhomTuoi.trim().length > 33
                      ? nhomTuoiChoose.TenNhomTuoi.trim().slice(0, 33)
                      : nhomTuoiChoose.TenNhomTuoi.trim()}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: SIZES.base,
                }}
              >
                <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.primary,
                  }}
                >
                  Mực độ lao động
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    setShowModalLaoDong(true);
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.h3,
                      color: COLORS.blue,
                    }}
                  >
                    {laoDongChoose.TenLaoDong.trim().length > 33
                      ? laoDongChoose.TenLaoDong.trim().slice(0, 33)
                      : laoDongChoose.TenLaoDong.trim()}
                  </Text>
                </TouchableOpacity>
              </View>

              {nhuCauDinhDuongOB && nhuCauDinhDuongOB.status && (
                <>
                  <View
                    style={{
                      marginTop: SIZES.base,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "rgb(51, 51, 153)",
                        ...FONTS.body3,
                      }}
                    >
                      Nhu cầu khuyến nghị cho{" "}
                      <Text
                        style={{
                          color: "rgb(179, 0, 134)",
                        }}
                      >
                        {`đối tượng là ${doiTuongChoose.TenDoiTuong.trim()}, nhóm tuổi ${nhomTuoiChoose.TenNhomTuoi.trim()}, với mức độ ${laoDongChoose.TenLaoDong.trim()}.`}
                      </Text>
                    </Text>
                  </View>
                  {/* Render danh khuyến nghị */}
                  <View
                    style={{
                      marginTop: SIZES.radius,
                      backgroundColor: COLORS.lightGray2,
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
                      <Text style={styles.header_table20}>Thành phần</Text>
                      <Text style={styles.header_table50}>
                        Nhu cầu khuyến nghị
                      </Text>
                    </View>
                    {renderKhuyenNghi()}
                  </View>
                </>
              )}
              {nhuCauDinhDuongOB && !nhuCauDinhDuongOB.status && (
                <Text
                  style={{
                    textAlign: "center",
                    ...FONTS.body3,
                    marginTop: SIZES.radius,
                  }}
                >
                  {nhuCauDinhDuongOB.message}
                </Text>
              )}
            </View>
            {/* Pagination */}
            <View
              style={{
                marginTop: 30,
              }}
            ></View>
          </ScrollView>
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
    textAlign: "center",
  },

  header_table20: {
    color: COLORS.white,
    flex: 1.5,
    textAlign: "left",
    ...FONTS.h3,
  },

  one_row_dd_thucpham: {
    flexDirection: "row",
    paddingHorizontal: SIZES.radius,
    borderColor: COLORS.gray,
    borderBottomWidth: 0.5,
    paddingVertical: 5,
    flex: 1,
  },

  one_row_dd_thucpham_last: {
    flexDirection: "row",
    paddingHorizontal: SIZES.radius,
    paddingVertical: 5,
    flex: 1,
  },

  column50_thucpham: {
    color: COLORS.black,
    flex: 3,
    flexDirection: "row",
    ...FONTS.body3,
    textAlign: "left",
  },

  column20_thucpham: {
    color: COLORS.black,
    textAlign: "left",
    ...FONTS.body3,
    flex: 1.5,
  },
});
