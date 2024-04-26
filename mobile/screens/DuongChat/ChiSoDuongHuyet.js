import { View, Text, StyleSheet, Image, Modal, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES, FONTS, icons } from "../../constants";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import HeaderDrawerChild from "../../components/HeaderDrawerChild";
import axios from "axios";
import { ChiSoDuongHuyetOffsetURL, ThucPhamURL } from "../../api";
import { BUILD_ANDROID, notify } from "../../utils/variable";
import { useIsFocused } from "@react-navigation/native";

export default function ChiSoDuongHuyet({ navigation }) {
  let limit = 30;
  const [startOffset, setStartOffset] = useState(0);
  const [endList, setEndList] = useState(false);
  const [loading, isLoading] = useState(true);
  const [showModalMucDo, setShowModalMucDo] = useState(false);
  const [showModalSapXep, setShowModalSapXep] = useState(false);
  const [thucPhamList, setThucPhamList] = useState([]);
  const [sortType, setSortType] = useState("NUM90");
  const [level, setLevel] = useState(0);

  const list_mucdo = [
    {
      id: 0,
      text: "Chọn mức độ",
    },
    {
      id: 1,
      text: "Thấp (0 - 55)",
    },
    {
      id: 2,
      text: "Trung bình (55 - 69)",
    },
    {
      id: 3,
      text: "Cao (>= 70)",
    },
  ];
  const list_sapxep = [
    { id: "NUM90", text: "Từ cao đến thấp" },
    { id: "NUM09", text: "Từ thấp đến cao" },
    { id: "AZ", text: "Theo tên A-Z" },
    { id: "ZA", text: "Theo tên Z-A" },
  ];

  const isFocused = useIsFocused();

  useEffect(() => {
    if (showModalMucDo) {
    }
  }, [showModalMucDo]);

  useEffect(() => {}, [isFocused]);

  useEffect(() => {
    const getAllThucPhamDuongChat = async () => {
      const response = await axios.get(
        `${ChiSoDuongHuyetOffsetURL}?sortType=${sortType}&level=${level}&offset=${startOffset}&limit=${limit}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        if (response.data.data.length === 0) {
          setEndList(true);
        }
        setThucPhamList(response.data.data);
        isLoading(false);
      } else {
        notify(false, response.data.message);
      }
    };
    getAllThucPhamDuongChat();
  }, [level, sortType]);

  const handleLoadMore = async () => {
    if (!endList) {
      const newOffset = (startOffset + 1) * limit;
      const response = await axios.get(
        `${ChiSoDuongHuyetOffsetURL}?sortType=${sortType}&level=${level}&offset=${newOffset}&limit=${limit}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.data.length === 0) {
        setEndList(true);
      } else {
        setStartOffset(startOffset + 1);
        setThucPhamList([...thucPhamList, ...response.data.data]);
      }
    }
  };

  const ModalChonMucDo = () => {
    return (
      <Modal animationType="slide" transparent={true} visible={showModalMucDo}>
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
              <Text style={{ ...FONTS.h3 }}>Chọn mức độ</Text>
              <TouchableOpacity
                onPress={() => {
                  setShowModalMucDo(false);
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
              {list_mucdo.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      if (item.id !== level) {
                        setLevel(item.id);
                        setStartOffset(0);
                        setThucPhamList([]);
                        setEndList(false);
                      }
                      setShowModalMucDo(false);
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
                        {item.text}
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

  const ModalChonSapXep = () => {
    return (
      <Modal animationType="slide" transparent={true} visible={showModalSapXep}>
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
              <Text style={{ ...FONTS.h3 }}>Chọn thứ tự sắp xếp</Text>
              <TouchableOpacity
                onPress={() => {
                  setShowModalSapXep(false);
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
              {list_sapxep.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      if (item.id !== sortType) {
                        setSortType(item.id);
                        setStartOffset(0);
                        setThucPhamList([]);
                        setEndList(false);
                      }
                      setShowModalSapXep(false);
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
                        {item.text}
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

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 2;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
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
              title={"Chỉ số đường huyết thực phẩm"}
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
            scrollEventThrottle={400}
            onScroll={({ nativeEvent }) => {
              if (isCloseToBottom(nativeEvent)) {
                if (!endList) {
                  handleLoadMore();
                }
              }
            }}
          >
            {/* Render Modal */}
            {showModalSapXep && ModalChonSapXep()}
            {showModalMucDo && ModalChonMucDo()}
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
                  Chọn mức độ
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    setShowModalMucDo(true);
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.h3,
                      color: COLORS.blue,
                    }}
                  >
                    {list_mucdo.find((item) => item.id === level).text}
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
                  Sắp xếp
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    setShowModalSapXep(true);
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.h3,
                      color: COLORS.blue,
                    }}
                  >
                    {list_sapxep.find((item) => item.id === sortType).text}
                  </Text>
                </TouchableOpacity>
              </View>

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
                  Chỉ số GI của một số thực phẩm{" "}
                  <Text
                    style={{
                      color: "rgb(179, 0, 134)",
                    }}
                  >
                    thông dụng tại Việt Nam
                  </Text>
                </Text>
              </View>
              {/* Render danh sách thực phẩm */}
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
                  <Text style={styles.header_table20}>STT</Text>
                  <Text style={styles.header_table50}>Tên thực phẩm</Text>
                  <Text style={styles.header_tableEnd}>Chỉ số GI</Text>
                </View>

                {thucPhamList.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={styles.one_row_dd_thucpham}
                    >
                      <Text style={styles.column20_thucpham}>{index + 1}</Text>
                      <Text style={styles.column50_thucpham}>
                        {item.TenThucPham
                          ? item.TenThucPham.length > 23
                            ? item.TenThucPham.slice(0, 23) + "..."
                            : item.TenThucPham
                          : "Chưa có tên"}
                      </Text>
                      <Text style={styles.columnEnd_thucpham}>
                        {item.GI ? Number(item.GI) * 1 : "-"}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            {/* Pagination */}
            {endList ? (
              <Text
                style={{
                  ...FONTS.body4,
                  textAlign: "center",
                }}
              >
                Đã tới cuối danh sách
              </Text>
            ) : (
              ""
            )}
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
    flex: 1,
    textAlign: "center",
    ...FONTS.h3,
  },

  header_tableEnd: {
    flex: 1,
    color: COLORS.white,
    textAlign: "right",
    ...FONTS.h3,
  },

  one_row_dd_thucpham: {
    flexDirection: "row",
    marginVertical: 3,
    alignItems: "center",
    paddingHorizontal: SIZES.radius,
    flex: 1,
  },

  column50_thucpham: {
    color: COLORS.black,
    flex: 3,
    flexDirection: "row",
    ...FONTS.body3,
    textAlign: "center",
  },

  column20_thucpham: {
    color: COLORS.black,
    textAlign: "center",
    ...FONTS.body3,
    flex: 1,
  },

  columnEnd_thucpham: {
    flex: 1,
    color: COLORS.black,
    textAlign: "right",
    alignItems: "center",
    ...FONTS.body3,
  },
});
