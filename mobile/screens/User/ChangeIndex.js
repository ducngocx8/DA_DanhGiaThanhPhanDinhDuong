import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES, FONTS } from "../../constants";
import HeaderDrawerChild from "../../components/HeaderDrawerChild";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import {
  BACKEND_BASE,
  ChiSoUserLastURL,
  ChiSoUserURL,
  DoiTuongURL,
  LaoDongURL,
} from "../../api";
import { BUILD_ANDROID, notify } from "../../utils/variable";
import LoginViewMoreNonTab from "../../components/LoginViewMoreNonTab";
import { useIsFocused } from "@react-navigation/native";

// Người ít vận động (làm việc văn phòng, chỉ ăn và ngủ)
// Người vận động nhẹ (luyện tập thể dục 1 – 3 lần/tuần)
// Người vận động vừa (tập luyện 3 – 5 lần/tuần, vận động mỗi ngày)
// Người vận động nặng (thường xuyên vận động , chơi thể dục thể thao và tập luyện 6 – 7 lần/tuần)
// Người vận động rất nặng (tập luyện thể dục 2 lần/ngày, lao động phổ thông)

export default function ChangeIndex({ navigation }) {
  const isFocused = useIsFocused();
  const [loading, isLoading] = useState(true);
  const [login, setLogin] = useState(false);
  const [laoDongList, setLaoDongList] = useState([]);
  const [doituongList, setDoiTuongList] = useState([]);
  const [visibleLaoDong, setVisibleLaoDong] = useState(false);
  const [visibleDoiTuong, setVisibleDoiTuong] = useState(false);
  const [indexIput, setIndexInput] = useState({
    height: 0,
    weight: 0,
    age: 0,
    gender: "M",
    id_laodong: -1,
    laodong_text: "Chọn cường độ vận động",
    id_doituong: -1,
    doituong_text: "Chọn đối tượng",
  });

  useEffect(() => {
    const getIndexInfo = async () => {
      const response = await axios.get(`${ChiSoUserLastURL}`);
      if (response.data.status) {
        if (response.data.data) {
          setIndexInput({
            ...indexIput,
            height: String(response.data.data.height),
            weight: String(Number(response.data.data.weight) * 1),
            age: String(Number(response.data.data.age)),
            gender: response.data.data.gender,
            id_laodong: response.data.data.id_laodong,
            laodong_text: response.data.data.LaoDong.TenLaoDong,
            id_doituong: response.data.data.id_doituong,
            doituong_text: response.data.data.DoiTuong.TenDoiTuong,
          });
        }
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigation.navigate("LoginViewMoreNonTab");
        }
      }
    };

    const getAllLaoDong = async () => {
      const response = await axios.get(`${LaoDongURL}`);
      if (response.data.status) {
        setLaoDongList(response.data.data);
      } else {
        notify(false, result.message);
      }
    };

    const getAllDoiTuong = async () => {
      const response = await axios.get(`${DoiTuongURL}`);
      if (response.data.status) {
        setDoiTuongList(response.data.data);
      } else {
        notify(false, result.message);
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
          Promise.resolve(getAllLaoDong()),
          Promise.resolve(getAllDoiTuong()),
          Promise.resolve(getIndexInfo()),
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

  const updateInfoIndexAPI = async (chi_so_user) => {
    return await axios
      .post(`${ChiSoUserURL}`, chi_so_user, {
        withCredentials: true,
      })
      .then((response) => {
        return response.data;
      });
  };

  const handleChangeInfoIndex = async () => {
    console.log(indexIput);
    if (Number(indexIput.height) === NaN || Number(indexIput.height) <= 0) {
      notify(false, "Chiều cao không hợp lệ.");
    } else if (
      Number(indexIput.weight) === NaN ||
      Number(indexIput.weight) <= 0
    ) {
      notify(false, "Cân nặng không hợp lệ.");
    } else if (Number(indexIput.age) === NaN || Number(indexIput.age) <= 0) {
      notify(false, "Số tuổi không hợp lệ.");
    } else if (indexIput.gender !== "F" && indexIput.gender !== "M") {
      notify(false, "Bạn chưa chọn giới tính.");
    } else if (indexIput.id_laodong === -1) {
      notify(false, "Bạn chưa chọn cường độ lao động.");
    } else if (indexIput.id_doituong === -1) {
      notify(false, "Bạn chưa chọn đối tượng.");
    } else {
      const chi_so_user = {
        age: Number(indexIput.age),
        height: Number(indexIput.height),
        weight: Number(indexIput.weight),
        id_laodong: Number(indexIput.id_laodong),
        id_doituong: Number(indexIput.id_doituong),
        gender: indexIput.gender,
      };
      const result = await updateInfoIndexAPI(chi_so_user);
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

  const ModalChonLaoDong = () => {
    return (
      <Modal animationType="slide" transparent={true}>
        <View style={{ flex: 1, backgroundColor: COLORS.transparentBlack7 }}>
          {/* Transparent Background */}
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.white,
                padding: SIZES.radius,
                marginHorizontal: SIZES.radius,
                borderRadius: SIZES.radius,
                minWidth: "90%",
              }}
            >
              {laoDongList.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setIndexInput({
                        ...indexIput,
                        id_laodong: item.id_laodong,
                        laodong_text: item.TenLaoDong,
                      });
                      setVisibleLaoDong(false);
                    }}
                    style={{
                      marginVertical: SIZES.base,
                    }}
                  >
                    <Text style={{ ...FONTS.body3 }}>{item.TenLaoDong}</Text>
                  </TouchableOpacity>
                );
              })}

              {/* Button Close */}
              <TouchableOpacity
                onPress={() => {
                  setVisibleLaoDong(false);
                }}
                style={{
                  marginTop: SIZES.radius,
                  backgroundColor: COLORS.primary,
                  paddingVertical: SIZES.radius,
                  borderRadius: SIZES.radius,
                }}
              >
                <Text
                  style={{
                    ...FONTS.h3,
                    textAlign: "center",
                    color: COLORS.white,
                  }}
                >
                  Đóng
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const ModalChonDoiTuong = () => {
    return (
      <Modal animationType="slide" transparent={true}>
        <View style={{ flex: 1, backgroundColor: COLORS.transparentBlack7 }}>
          {/* Transparent Background */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: SIZES.height,
            }}
          >
            <View
              style={{
                height: SIZES.height * 0.4,
                marginHorizontal: SIZES.radius,
                backgroundColor: COLORS.white,
                borderRadius: SIZES.radius,
                paddingVertical: SIZES.radius,
                minWidth: "90%",
              }}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                  padding: SIZES.radius,
                  marginBottom: SIZES.radius,
                }}
              >
                {doituongList.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setIndexInput({
                          ...indexIput,
                          id_doituong: item.id_doituong,
                          doituong_text: item.TenDoiTuong,
                        });
                        setVisibleDoiTuong(false);
                      }}
                      style={{
                        marginVertical: SIZES.base,
                      }}
                    >
                      <Text style={{ ...FONTS.body3 }}>{item.TenDoiTuong}</Text>
                    </TouchableOpacity>
                  );
                })}
                {/* Pagination */}
                <View
                  style={{
                    marginTop: SIZES.radius,
                  }}
                ></View>
              </ScrollView>

              {/* Button Close */}
              <TouchableOpacity
                onPress={() => {
                  setVisibleDoiTuong(false);
                }}
                style={{
                  backgroundColor: COLORS.primary,
                  borderRadius: SIZES.radius,
                  paddingVertical: SIZES.radius,
                  marginHorizontal: SIZES.radius,
                }}
              >
                <Text
                  style={{
                    ...FONTS.h3,
                    textAlign: "center",
                    color: COLORS.white,
                  }}
                >
                  Đóng
                </Text>
              </TouchableOpacity>
            </View>
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
          {visibleLaoDong && ModalChonLaoDong()}
          {visibleDoiTuong && ModalChonDoiTuong()}
          <View
            style={{
              paddingHorizontal: SIZES.padding,
            }}
          >
            <HeaderDrawerChild
              title={"Chỉnh sửa thông số"}
              navigation={navigation}
              rightComponent={
                <TouchableOpacity
                  onPress={() => {
                    handleChangeInfoIndex();
                  }}
                  style={{}}
                >
                  <Text style={{ ...FONTS.h3, color: COLORS.white }}>Lưu</Text>
                </TouchableOpacity>
              }
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
            {/* Change INDEX */}
            <View>
              <View
                style={{
                  marginTop: SIZES.radius,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ ...FONTS.h3, color: COLORS.blue, width: "60%" }}>
                  Chiều cao (cm)
                </Text>
                <TextInput
                  value={indexIput.height}
                  onChangeText={(value) => {
                    setIndexInput({ ...indexIput, height: value });
                  }}
                  keyboardType="decimal-pad"
                  placeholder="170"
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    height: 45,
                    ...FONTS.body3,
                    borderColor: COLORS.lightGray1,
                    paddingHorizontal: 10,
                    borderRadius: SIZES.base,
                    marginTop: SIZES.base,
                    textAlign: "center",
                  }}
                />
              </View>
              <View
                style={{
                  marginTop: SIZES.radius,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ ...FONTS.h3, color: COLORS.blue, width: "60%" }}>
                  Cân nặng (kg)
                </Text>
                <TextInput
                  value={indexIput.weight}
                  onChangeText={(value) => {
                    setIndexInput({ ...indexIput, weight: value });
                  }}
                  keyboardType="decimal-pad"
                  placeholder="55"
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    height: 45,
                    ...FONTS.body3,
                    borderColor: COLORS.lightGray1,
                    paddingHorizontal: 10,
                    borderRadius: SIZES.base,
                    marginTop: SIZES.base,
                    textAlign: "center",
                  }}
                />
              </View>
              <View
                style={{
                  marginTop: SIZES.radius,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ ...FONTS.h3, color: COLORS.blue, width: "60%" }}>
                  Tuổi
                </Text>
                <TextInput
                  value={indexIput.age}
                  onChangeText={(value) => {
                    setIndexInput({ ...indexIput, age: value });
                  }}
                  keyboardType="decimal-pad"
                  placeholder="40"
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    height: 45,
                    ...FONTS.body3,
                    borderColor: COLORS.lightGray1,
                    paddingHorizontal: 10,
                    borderRadius: SIZES.base,
                    marginTop: SIZES.base,
                    textAlign: "center",
                  }}
                />
              </View>
              <View
                style={{
                  marginTop: SIZES.radius,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ ...FONTS.h3, color: COLORS.blue, width: "60%" }}>
                  Giới tính
                </Text>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    style={{
                      inputAndroid: {
                        color: COLORS.primary,
                        ...FONTS.body3,
                        borderColor: COLORS.lightGray1,
                        borderWidth: 1,
                        borderRadius: SIZES.base,
                        textAlign: "center",
                        height: 45,
                      },
                    }}
                    value={indexIput.gender}
                    onValueChange={(value) => console.log(value)} //underfined // M // F
                    placeholder={{ label: "Chọn" }}
                    items={[
                      { label: "Nam", value: "M" },
                      { label: "Nữ", value: "F" },
                    ]}
                  />
                </View>
              </View>

              {/* Chọn cường độ vận động */}
              <TouchableOpacity
                onPress={() => {
                  setVisibleLaoDong(true);
                }}
                style={{
                  marginTop: SIZES.radius,
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.blue,
                  paddingVertical: SIZES.radius,
                  paddingHorizontal: SIZES.radius,
                }}
              >
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.white,
                    textAlign: "center",
                  }}
                >
                  {indexIput.laodong_text}
                </Text>
              </TouchableOpacity>

              {/* Chọn đối tượng */}
              <TouchableOpacity
                onPress={() => {
                  setVisibleDoiTuong(true);
                }}
                style={{
                  marginTop: SIZES.radius,
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.primary,
                  paddingVertical: SIZES.radius,
                  paddingHorizontal: SIZES.radius,
                }}
              >
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.white,
                    textAlign: "center",
                  }}
                >
                  {indexIput.doituong_text}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <LoginViewMoreNonTab navigation={navigation} />
      )}
    </>
  );
}
