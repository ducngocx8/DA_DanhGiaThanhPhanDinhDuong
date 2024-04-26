import { View, Text, StyleSheet, Image, Modal, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES, FONTS, icons } from "../../constants";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import HeaderDrawerChild from "../../components/HeaderDrawerChild";
import axios from "axios";
import { ThucPhamURL, headercolumnURL } from "../../api";
import { BUILD_ANDROID, notify } from "../../utils/variable";
import { useIsFocused } from "@react-navigation/native";

export default function DuongChatThucPham({ navigation }) {
  let limit = 30;
  const [startOffset, setStartOffset] = useState(0);
  const [endList, setEndList] = useState(false);
  const [loading, isLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [duongChatList, setDuongChatList] = useState([]);
  const [duongChatSelected, setDuongChatSelected] = useState("");
  const [thucPhamList, setThucPhamList] = useState([]);
  const [duongChatSelectedDetail, setDuongChatSelectedDetail] = useState("");
  const [showModalSapXep, setShowModalSapXep] = useState(false);
  const [sortType, setSortType] = useState("NUM90");

  const isFocused = useIsFocused();

  const list_sapxep = [
    { id: "NUM90", text: "Từ cao đến thấp" },
    { id: "NUM09", text: "Từ thấp đến cao" },
  ];

  useEffect(() => {
    if (isVisible) {
    }
  }, [isVisible]);

  useEffect(() => {
    async function getAllDuongChat() {
      const response = await axios.get(`${headercolumnURL}`);
      let duong_chat_list = [];
      if (response.data.status) {
        response.data.data.forEach((item) => {
          if (
            item.don_vi !== "" &&
            item.lam_tron !== null &&
            item.column_code !== "EDIBLE"
          ) {
            duong_chat_list.push(item);
          }
        });
        if (duong_chat_list.length > 0) {
          setDuongChatSelected(duong_chat_list[0].column_code);
          setDuongChatList(duong_chat_list);
        }
      } else {
        notify(false, response.data.message);
      }
    }

    const handleAPIAll = async () => {
      await Promise.all([Promise.resolve(getAllDuongChat())]);
      isLoading(false);
    };
    handleAPIAll();
  }, [isFocused]);

  useEffect(() => {
    if (duongChatSelected !== "") {
      const getAllThucPhamDuongChat = async () => {
        const response = await axios.get(
          `${ThucPhamURL}/tra-cuu/duong-chat/offset?code=${duongChatSelected}&sort=${sortType}&offset=${startOffset}&limit=${limit}`
        );
        if (response.data.status) {
          if (response.data.data.length === 0) {
            setEndList(true);
          }
          setThucPhamList(response.data.data);
        } else {
          notify(false, response.data.message);
        }
      };
      const find_select = duongChatList.find(
        (item) => item.column_code === duongChatSelected
      );
      if (find_select) {
        setDuongChatSelectedDetail(find_select);
      }
      getAllThucPhamDuongChat();
    }
  }, [duongChatSelected, duongChatList, sortType]);

  const handleLoadMore = async () => {
    if (!endList) {
      const newOffset = (startOffset + 1) * limit;
      const response = await axios.get(
        `${ThucPhamURL}/tra-cuu/duong-chat/offset?code=${duongChatSelected}&sort=${sortType}&offset=${newOffset}&limit=${limit}`
      );
      if (response.data.data.length === 0) {
        setEndList(true);
      } else {
        setStartOffset(startOffset + 1);
        setThucPhamList([...thucPhamList, ...response.data.data]);
      }
    }
  };

  const ModalChonDuongChat = () => {
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
              <Text style={{ ...FONTS.h3 }}>Chọn dưỡng chất</Text>
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
            {/* Lựa chọn */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                paddingTop: SIZES.base,
                marginTop: SIZES.radius,
              }}
            >
              {duongChatList.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      if (item.column_code !== duongChatSelected) {
                        setDuongChatSelected(item.column_code);
                        setStartOffset(0);
                        setThucPhamList([]);
                      }
                      setIsVisible(false);
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
                        {item.column_name}
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
              height: SIZES.height / 5,
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
              title={"Thực phẩm giàu dưỡng chất"}
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
            {/* Render Modal Add Thực phẩm */}
            {isVisible && ModalChonDuongChat()}
            {showModalSapXep && ModalChonSapXep()}
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
                  Chọn dưỡng chất
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
                    {duongChatSelectedDetail.column_name}
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
                  Danh sách thực phẩm giàu{" "}
                  <Text
                    style={{
                      color: "rgb(179, 0, 134)",
                    }}
                  >
                    {duongChatSelectedDetail.column_name}
                  </Text>
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    ...FONTS.body4,
                  }}
                >
                  (hàm lượng có trong 100g thực phẩm)
                </Text>
              </View>
              {/* Render danh sách thực phẩm */}
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
                  <Text style={styles.header_table20}>STT</Text>
                  <Text style={styles.header_table50}>Tên thực phẩm</Text>
                  <Text style={styles.header_tableEnd}>
                    H.Lượng ({duongChatSelectedDetail.don_vi})
                  </Text>
                </View>

                {thucPhamList.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={styles.one_row_dd_thucpham}
                      onPress={() => {
                        navigation.navigate("ChiTietThucPham", {
                          id_thucpham: item.id_thucpham,
                          id_nhomthucpham: item.id_nhomthucpham,
                        });
                      }}
                    >
                      <Text style={styles.column20_thucpham}>{index + 1}</Text>
                      <Text style={styles.column50_thucpham}>
                        {item.TenTiengViet
                          ? item.TenTiengViet.length > 15
                            ? item.TenTiengViet.slice(0, 15) + "..."
                            : item.TenTiengViet
                          : item.TenTiengAnh.length > 15
                          ? item.TenTiengAnh.slice(0, 15) + "..."
                          : item.TenTiengAnh}
                      </Text>
                      <Text style={styles.columnEnd_thucpham}>
                        {item[duongChatSelected]
                          ? Number(item[duongChatSelected]) * 1
                          : "-"}
                      </Text>
                    </TouchableOpacity>
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
    flex: 2,
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
    flex: 2,
    color: COLORS.black,
    textAlign: "right",
    alignItems: "center",
    ...FONTS.body3,
  },
});
