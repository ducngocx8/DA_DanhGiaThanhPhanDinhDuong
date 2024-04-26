import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { Rect, Text as TextSVG, Svg } from "react-native-svg";
import { COLORS, SIZES, FONTS, icons } from "../../constants";
import { notify } from "../../utils/variable";
import { ChiSoUserURL } from "../../api";
import { convertToDate, convertToNgayThang } from "../../utils/date";
import axios from "axios";

export default function ChiSoUserProgress() {
  const [loading, isLoading] = useState(true);
  const [showModalChonThanhPhan, setShowModalChonThanhPhan] = useState(false);
  const thanhPhanOption = [
    {
      id: "height",
      text: "Chiều cao",
      don_vi: "cm",
    },
    {
      id: "weight",
      text: "Cân nặng",
      don_vi: "kg",
    },
  ];
  const [thanhPhanChoose, setThanhPhanChoose] = useState({
    id: "weight",
    text: "Cân nặng",
    don_vi: "kg",
  });
  const [chiSoUserList, setChiSoUserList] = useState([]);
  let [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
  });

  const tinhTrungBinh = () => {
    if (chiSoUserList.length === 0) {
      return "0" + thanhPhanChoose.don_vi;
    }
    let sum = 0;
    for (let i = 0; i < chiSoUserList.length; i++) {
      sum += Number(chiSoUserList[i][thanhPhanChoose.id]);
    }
    const average = Number(sum) / Number(chiSoUserList.length);
    return average.toFixed(2) * 1 + "" + thanhPhanChoose.don_vi;
  };

  useEffect(() => {
    const getAllChiSoUser = async () => {
      const response = await axios.get(`${ChiSoUserURL}`, {
        withCredentials: true,
      });
      if (response.data.status) {
        setChiSoUserList(response.data.data.reverse().slice(0, 30));
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigation.navigate("SignUp");
        } else if (response.data.must === "permission") {
          return navigation.goBack();
        }
      }
    };

    const handleAPIAll = async () => {
      await Promise.all([Promise.resolve(getAllChiSoUser())]);
      isLoading(false);
    };
    handleAPIAll();
  }, []);

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
              {thanhPhanOption.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      if (item.id !== thanhPhanChoose.id) {
                        setThanhPhanChoose(item);
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

  const handleRenderChartChiSoUser = () => {
    const data = {
      labels: chiSoUserList.map((item) => convertToNgayThang(item.time_update)),
      datasets: [
        {
          data: chiSoUserList.map((item) => Number(item[thanhPhanChoose.id])),
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          colors: new Array(chiSoUserList.length).fill(() => `#28a745`),
          strokeWidth: 2,
        },
      ],
      legend: ["Chỉ Số User"],
    };

    const chartConfig = {
      backgroundGradientFromOpacity: 0,
      backgroundGradientToOpacity: 0,
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      strokeWidth: 2,
      barPercentage: 0.5,
      useShadowColorFromDataset: false,
      propsForDots: {
        r: "6",
      },
    };

    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <LineChart
          data={data}
          width={300}
          showValuesOnTopOfBars={true}
          height={220}
          chartConfig={chartConfig}
          fromZero={true}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          decorator={() => {
            return tooltipPos.visible ? (
              <View>
                <Svg>
                  <Rect
                    x={tooltipPos.x - 15}
                    y={tooltipPos.y + 10}
                    width="40"
                    height="30"
                    fill="black"
                  />
                  <TextSVG
                    x={tooltipPos.x + 5}
                    y={tooltipPos.y + 30}
                    fill="white"
                    fontSize="16"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {tooltipPos.value}
                  </TextSVG>
                </Svg>
              </View>
            ) : null;
          }}
          onDataPointClick={(data) => {
            let isSamePoint =
              tooltipPos.x === data.x && tooltipPos.y === data.y;

            isSamePoint
              ? setTooltipPos((previousState) => {
                  return {
                    ...previousState,
                    value: data.value,
                    visible: !previousState.visible,
                  };
                })
              : setTooltipPos({
                  x: data.x,
                  value: data.value,
                  y: data.y,
                  visible: true,
                });
          }}
        />
      </ScrollView>
    );
  };

  return (
    <>
      {loading ? (
        ""
      ) : (
        <View>
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
                {thanhPhanOption.find((item) => item.id === thanhPhanChoose.id)
                  ?.text || ""}
              </Text>
            </TouchableOpacity>
          </View>
          {chiSoUserList.length > 0 && handleRenderChartChiSoUser()}
          <View>
            <Text
              style={{
                ...FONTS.h3,
              }}
            >
              Lịch sử
            </Text>
            <View>
              {chiSoUserList.length > 0 ? (
                chiSoUserList.map((item, index) => {
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
                        {convertToDate(item.time_update)}
                      </Text>
                      <Text
                        style={{
                          ...FONTS.body4,
                          color: COLORS.gray,
                        }}
                      >
                        {Number(item[thanhPhanChoose.id]).toLocaleString("vi") +
                          "" +
                          thanhPhanChoose.don_vi}
                      </Text>
                    </View>
                  );
                })
              ) : (
                <Text
                  style={{
                    textAlign: "center",
                    ...FONTS.body4,
                  }}
                >
                  Chưa có lịch sử
                </Text>
              )}
            </View>
          </View>
        </View>
      )}
    </>
  );
}
