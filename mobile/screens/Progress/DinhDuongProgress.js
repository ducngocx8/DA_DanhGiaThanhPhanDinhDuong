import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BarChart } from "react-native-chart-kit";
import { COLORS, SIZES, FONTS, icons } from "../../constants";
import { notify } from "../../utils/variable";
import { KhuyenNghiURL, ThongKeURL } from "../../api";
import { convertToDateOnly, convertToNgayThang } from "../../utils/date";
import axios from "axios";
export default function DinhDuongProgress({ navigation }) {
  const [loading, isLoading] = useState(true);
  const [showModalChonThanhPhan, setShowModalChonThanhPhan] = useState(false);
  const [thongKeType, setThongKeType] = useState("7days");
  const [thongKeList, setThongKeList] = useState([]);
  let [khuyenNghi, setKhuyenNghi] = useState(null);
  let [max, setMax] = useState(6);
  const duongChatOption = [
    {
      id: "ENERC",
      khuyen_nghi: "NangLuong",
      text: "Năng lượng",
      don_vi: "KCal",
    },
    {
      id: "PROCNT",
      khuyen_nghi: "Protein",
      text: "Protein",
      don_vi: "g",
    },
    {
      id: "FAT",
      text: "Chất béo",
      khuyen_nghi: "Lipid",
      don_vi: "g",
    },
    {
      id: "CHOCDF",
      khuyen_nghi: "Glucid",
      text: "Carbohydrate",
      don_vi: "g",
    },
  ];
  const [duongChatChoose, setDuongChatChoose] = useState({
    id: "ENERC",
    khuyen_nghi: "NangLuong",
    text: "Năng lượng",
    don_vi: "KCal",
  });

  const tinhTrungBinh = () => {
    if (thongKeList.length === 0) {
      return "0 " + duongChatChoose.don_vi;
    }
    let sum = 0;
    for (let i = 0; i < thongKeList.length; i++) {
      sum += Number(thongKeList[i][duongChatChoose.id]);
    }
    const average = Number(sum) / Number(thongKeList.length);
    return average.toFixed(0) + " " + duongChatChoose.don_vi;
  };

  useEffect(() => {
    const getThongKeDinhDuong = async () => {
      const response = await axios.get(
        `${ThongKeURL + "/thong-ke-dinh-duong?thongKeType=" + thongKeType}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        setThongKeList(response.data.data);
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigation.navigate("SignUp");
        } else if (response.data.must === "permission") {
          return navigation.goBack();
        }
      }
    };

    const getKhuyenNghi = async () => {
      const response = await axios.get(`${KhuyenNghiURL}`, {
        withCredentials: true,
      });
      if (response.data.status) {
        setKhuyenNghi(response.data.data);
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigate("/account/login", { replace: true });
        }
      }
    };

    const handleAPIAll = async () => {
      await Promise.all([getThongKeDinhDuong(), getKhuyenNghi()]);
      isLoading(false);
    };
    handleAPIAll();
  }, [thongKeType, duongChatChoose]);

  useEffect(() => {
    let max_find = 6;
    thongKeList.forEach((item) => {
      if (Number(item[duongChatChoose.id]) > max_find) {
        max_find = Number(item[duongChatChoose.id]);
      }
    });
    if (max_find !== 6) {
      if (
        khuyenNghi &&
        khuyenNghi?.ThanhPhanNhuCau &&
        khuyenNghi?.ThanhPhanNhuCau[duongChatChoose.khuyen_nghi] &&
        khuyenNghi?.ThanhPhanNhuCau[duongChatChoose.khuyen_nghi].match(/\d+/) &&
        !isNaN(
          Number(
            khuyenNghi?.ThanhPhanNhuCau[duongChatChoose.khuyen_nghi].match(
              /\d+/
            )[0]
          )
        )
      ) {
        if (
          max_find <=
          Number(
            khuyenNghi?.ThanhPhanNhuCau[duongChatChoose.khuyen_nghi].match(
              /\d+/
            )[0]
          )
        ) {
          setMax(
            Number(
              khuyenNghi.ThanhPhanNhuCau[duongChatChoose.khuyen_nghi].match(
                /\d+/
              )[0]
            ) + 200
          );
        } else {
          setMax(max_find + 200);
        }
      } else {
        setMax(max_find + 200);
      }
    }
  }, [thongKeList, khuyenNghi, duongChatChoose]);

  const handleRenderChartDinhDuong = () => {
    const data = {
      labels: thongKeList.map((item) => convertToNgayThang(item.ngay)),
      datasets: [
        {
          data: thongKeList.map((item) => Number(item[duongChatChoose.id])),
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          colors: new Array(thongKeList.length).fill(() => `#28a745`),
          strokeWidth: 2,
        },
      ],
    };

    return (
      <ScrollView
        style={{
          marginTop: SIZES.padding,
          // backgroundColor: COLORS.blue,
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {khuyenNghi &&
        khuyenNghi.ThanhPhanNhuCau &&
        khuyenNghi.ThanhPhanNhuCau[duongChatChoose.khuyen_nghi] &&
        khuyenNghi.ThanhPhanNhuCau[duongChatChoose.khuyen_nghi].match(/\d+/) &&
        !isNaN(
          Number(
            khuyenNghi.ThanhPhanNhuCau[duongChatChoose.khuyen_nghi].match(
              /\d+/
            )[0]
          )
        ) ? (
          <View
            style={{
              position: "absolute",
              bottom:
                45 +
                (190 / Number(max)) *
                  Number(
                    khuyenNghi.ThanhPhanNhuCau[
                      duongChatChoose.khuyen_nghi
                    ].match(/\d+/)[0]
                  ),
              // bottom: "18%",
              // bottom: "45",
              left: 30,
              zIndex: 1000,
              width: "100%",
            }}
          >
            <Text
              style={{
                color: COLORS.gray,
                ...FONTS.body4,
                fontSize: 13,
                textAlign: "center",
              }}
            >
              {`Khuyến nghị ${
                khuyenNghi.ThanhPhanNhuCau[duongChatChoose.khuyen_nghi].match(
                  /\d+/
                )[0]
              } ${duongChatChoose.don_vi}`}
            </Text>
            <View
              style={{
                height: 1,
                backgroundColor: COLORS.blue,
                opacity: 0.5,
              }}
            ></View>
          </View>
        ) : (
          ""
        )}

        <BarChart
          fromNumber={max}
          data={data}
          width={
            data.labels.length < 9
              ? SIZES.width
              : (SIZES.width / 9) * data.labels.length
          }
          height={250}
          fromZero={true}
          flatColor={true}
          withCustomBarColorFromData={true}
          showValuesOnTopOfBars={true}
          yAxisLabel=""
          chartConfig={{
            decimalPlaces: 0,
            backgroundGradientFrom: COLORS.white,
            backgroundGradientFromOpacity: 1,
            backgroundGradientTo: COLORS.white,
            backgroundGradientToOpacity: 1,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            strokeWidth: 2,
            barPercentage: 0.5,
            useShadowColorFromDataset: false,
            propsForBackgroundLines: {
              translateX: 30,
            },
          }}
          showBarTops={false}
          style={{
            paddingRight: 40,
          }}
        />
      </ScrollView>
    );
  };

  const ModalChonThanhPhan = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModalChonThanhPhan}
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
              <Text style={{ ...FONTS.h3 }}>Chọn thành phần</Text>
              <TouchableOpacity
                onPress={() => {
                  setShowModalChonThanhPhan(false);
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
              {duongChatOption.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      if (item.id !== duongChatChoose.id) {
                        setDuongChatChoose(item);
                      }
                      setShowModalChonThanhPhan(false);
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

  return (
    <>
      {loading ? (
        ""
      ) : (
        <View>
          {/* Toast */}
          {showModalChonThanhPhan && ModalChonThanhPhan()}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: SIZES.radius,
            }}
          >
            <Text
              style={{
                ...FONTS.body3,
              }}
            >
              Trung bình: {tinhTrungBinh()}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowModalChonThanhPhan(true);
              }}
            >
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.primary,
                }}
              >
                {duongChatOption.find((item) => item.id === duongChatChoose.id)
                  ?.text || ""}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightGray2,
              marginTop: SIZES.radius,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if (thongKeType !== "7days") {
                  setThongKeType("7days");
                }
              }}
              style={{
                backgroundColor:
                  thongKeType === "7days" ? COLORS.primary : COLORS.lightGray2,
                borderRadius: SIZES.radius,
                flex: 1,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: thongKeType === "7days" ? COLORS.white : COLORS.gray2,
                  ...FONTS.body3,
                  textAlign: "center",
                }}
              >
                7 ngày
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (thongKeType !== "15days") {
                  setThongKeType("15days");
                }
              }}
              style={{
                flex: 1,
                backgroundColor:
                  thongKeType === "15days" ? COLORS.primary : COLORS.lightGray2,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: SIZES.radius,
              }}
            >
              <Text
                style={{
                  color: thongKeType === "15days" ? COLORS.white : COLORS.gray2,
                  ...FONTS.body3,
                  textAlign: "center",
                }}
              >
                15 ngày
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (thongKeType !== "30days") {
                  setThongKeType("30days");
                }
              }}
              style={{
                flex: 1,
                backgroundColor:
                  thongKeType === "30days" ? COLORS.primary : COLORS.lightGray2,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: SIZES.radius,
              }}
            >
              <Text
                style={{
                  color: thongKeType === "30days" ? COLORS.white : COLORS.gray2,
                  ...FONTS.body3,
                  textAlign: "center",
                }}
              >
                30 ngày
              </Text>
            </TouchableOpacity>
          </View>

          {/* Chart dinh dưỡng */}
          {handleRenderChartDinhDuong()}
          {/* History */}
          <View>
            <Text
              style={{
                ...FONTS.h3,
              }}
            >
              Lịch sử
            </Text>
            <View>
              {thongKeList.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginVertical: SIZES.base,
                    }}
                  >
                    <Text
                      style={{
                        ...FONTS.body4,
                        color: COLORS.gray,
                      }}
                    >
                      {convertToDateOnly(item.ngay)}
                    </Text>
                    <Text
                      style={{
                        ...FONTS.body4,
                        color: COLORS.gray,
                      }}
                    >
                      {Number(item[duongChatChoose.id]).toLocaleString("vi") +
                        " " +
                        duongChatChoose.don_vi}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      )}
    </>
  );
}
