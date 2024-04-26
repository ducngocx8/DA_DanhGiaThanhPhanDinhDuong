import React, { useEffect, useMemo, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
} from "react-native";
import {
  COLORS,
  SIZES,
  icons,
  FONTS,
  dummyData,
  images,
} from "../../constants";
import { BuaAnURL, MonAnURL, MonAnYeuThichURL, NgayAnURL } from "../../api";
import axios from "axios";
import { BUILD_ANDROID, notify } from "../../utils/variable";
import CardImageProduct from "./CardImageProduct ";
import PhanNhomMonAn from "./PhanNhomMonAn";
import HeaderDrawerChild from "../../components/HeaderDrawerChild";

const FoodDetail = ({ navigation, route }) => {
  if (!route.params) {
    return navigation.navigate("Result", {
      icon: images.not_found,
      resultText: "Không tìm thấy Món ăn",
      resultMessage: "Món ăn không tồn tại trên hệ thống!",
      resultButtonText: "Quay lại",
      screenName: "CustomDrawer",
    });
  }
  const [quanty, setQuanty] = useState(
    route?.params?.quanty ? String(Number(route.params.quanty) * 1) : "1"
  );
  let [loading, isLoading] = useState(true);
  const [buaAnList, setBuaAnList] = useState([]);
  let [favourite, setFavourite] = useState(false);
  const [monAnChoose, setMonAnChoose] = useState(null);
  const [buaAnChoose, setBuaAnChoose] = useState(
    route?.params?.bua_an_id ? Number(route.params.bua_an_id) : false
  );
  const [showModalChonNgay, setShowModalChonNgay] = useState(false);
  const [tongThanhPhanChinh, setTongThanhPhanChinh] = useState({});
  let [dateSelected, setDateSelected] = useState(() => {
    const date = new Date();
    const date_string =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return {
      date_string,
      date_title:
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
    };
  });

  const PhanNhomMonAnMemo = useMemo(
    () => (
      <PhanNhomMonAn
        monAnChoose={monAnChoose}
        quanty={quanty}
        navigation={navigation}
      />
    ),
    [monAnChoose, quanty]
  );

  const { id_monan } = route.params;

  const addMonAnVaoNgayAnAPI = async (ngay_an) => {
    return await axios
      .post(`${NgayAnURL}`, ngay_an, {
        withCredentials: true,
      })
      .then((response) => {
        return response.data;
      });
  };

  const handleAddMonAnVaoNgayAn = async () => {
    if (Number(quanty) === NaN || Number(quanty) < 0) {
      notify(false, "Số lượng thêm không hợp lệ.");
    } else if (buaAnChoose === false) {
      notify(false, "Vui lòng chọn bữa ăn.");
    } else {
      const ngay_an = {
        bua_an_id: Number(buaAnChoose),
        id_monan: Number(id_monan),
        quanty: Number(quanty),
        time: dateSelected.date_string,
      };
      const result = await addMonAnVaoNgayAnAPI(ngay_an);
      if (!result.status) {
        notify(false, result.message);
        if (result.must === "login") {
          return navigation.navigate("LoginViewMoreNonTab");
        }
      } else {
        notify(true, result.message);
      }
    }
  };

  useEffect(() => {
    const getAllBuaAn = async () => {
      const response = await axios.get(`${BuaAnURL}`);
      setBuaAnList(response.data.data);
    };

    const getChiTietMonAn = async () => {
      const response = await axios.get(`${MonAnURL}/${id_monan}`, {
        withCredentials: true,
      });
      if (!response.data.status) {
        navigation.navigate("Result", {
          icon: images.not_found,
          resultText: "Không tìm thấy Món ăn",
          resultMessage: "Món ăn không tồn tại trên hệ thống!",
          resultButtonText: "Quay lại",
          screenName: "CustomDrawer",
        });
        return false;
      }
      setMonAnChoose(response.data.data);
      return true;
    };

    const checkFavourite = async () => {
      const response = await axios.get(
        `${MonAnYeuThichURL + "/check/" + id_monan}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        if (response.data.data) {
          setFavourite(true);
        } else {
          setFavourite(false);
        }
      } else {
        setFavourite(false);
      }
    };

    const handleAPIAll = async () => {
      const result = await Promise.all([
        Promise.resolve(getChiTietMonAn()),
        Promise.resolve(getAllBuaAn()),
        Promise.resolve(checkFavourite()),
      ]);
      if (result[0]) {
        isLoading(false);
      }
    };
    handleAPIAll();
  }, []);

  useEffect(() => {
    tinhtongThanhPhanChinh(monAnChoose);
  }, [quanty, monAnChoose]);

  const handleYeuThichMonAn = async () => {
    const yeu_thich = {
      id_monan: id_monan,
    };
    const response = await axios.post(`${MonAnYeuThichURL}`, yeu_thich, {
      withCredentials: true,
    });
    if (response.data.status) {
      if (response.data.type === "ADD") {
        setFavourite(true);
      } else {
        setFavourite(false);
      }
    }
    notify(response.data.status, response.data.message);
  };

  const onChangeDate = (event, selectedDate) => {
    if (selectedDate) {
      setShowModalChonNgay(false);
      const currentDate =
        selectedDate.getFullYear() +
        "-" +
        (selectedDate.getMonth() + 1) +
        "-" +
        selectedDate.getDate();
      setDateSelected({
        date_string: currentDate,
        date_title:
          selectedDate.getDate() +
          "/" +
          (selectedDate.getMonth() + 1) +
          "/" +
          selectedDate.getFullYear(),
      });
    }
  };

  const tinhtongThanhPhanChinh = (dataMonAn) => {
    const newtongThanhPhanChinh = {
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
    let quantyInput = 1;
    if (typeof Number(quanty) === "number") {
      quantyInput = Number(quanty);
    }
    dataMonAn?.ChiTietMons?.forEach((item) => {
      for (const [key, value] of Object.entries(item.ThucPham)) {
        if (
          ![
            "id_thucpham",
            "TenTiengAnh",
            "TenTiengViet",
            "DonViTinh",
            "id_nhomthucpham",
            "image_url",
            "thucpham_status",
          ].includes(key)
        ) {
          if (typeof Number(value) === "number") {
            newtongThanhPhanChinh[key] =
              Number(newtongThanhPhanChinh[key]) +
              (Number(value) * Number(item.quanty)) / 100;
          }
        }
      }
    });
    for (const [key, value] of Object.entries(newtongThanhPhanChinh)) {
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
        newtongThanhPhanChinh[key] =
          (Number(value) * quantyInput).toFixed(0) * 1;
      } else if (["WATER"].includes(key)) {
        newtongThanhPhanChinh[key] =
          (Number(value) * quantyInput).toFixed(1) * 1;
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
        newtongThanhPhanChinh[key] =
          (Number(value) * quantyInput).toFixed(2) * 1;
      } else if (
        ["MN", "CU", "THIA", "RIBF", "NIA", "PANTAC", "VITB6"].includes(key)
      ) {
        newtongThanhPhanChinh[key] =
          (Number(value) * quantyInput).toFixed(3) * 1;
      }
    }
    setTongThanhPhanChinh({ ...newtongThanhPhanChinh });
  };

  const renderProductDescription = () => {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
        }}
      >
        <Text
          style={{
            ...FONTS.h2,
          }}
        >
          {monAnChoose.ten_mon}
        </Text>
      </View>
    );
  };

  const renderThanhPhanDinhDuongChinh = () => {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View
          style={{
            marginTop: SIZES.padding,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          {/* Protein */}
          <View
            style={{
              backgroundColor: COLORS.primary,
              padding: SIZES.base,
              borderRadius: SIZES.radius,
              flexDirection: "row",
            }}
          >
            <Image
              source={icons.protein}
              style={{
                width: 20,
                height: 20,
                marginRight: 5,
              }}
            />
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.white,
              }}
            >
              {tongThanhPhanChinh.PROCNT}g - Protein
            </Text>
          </View>

          {/* Carbs */}
          <View
            style={{
              padding: SIZES.base,
              borderRadius: SIZES.radius,
              flexDirection: "row",
              marginLeft: SIZES.base,
              backgroundColor: COLORS.primary,
            }}
          >
            <Image
              source={icons.carb}
              style={{
                width: 20,
                height: 20,
                marginRight: 5,
              }}
            />
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.white,
              }}
            >
              {tongThanhPhanChinh.CHOCDF}g - Carbs
            </Text>
          </View>

          {/* Fat */}
          <View
            style={{
              padding: SIZES.base,
              borderRadius: SIZES.radius,
              flexDirection: "row",
              backgroundColor: COLORS.primary,
              marginLeft: SIZES.base,
            }}
          >
            <Image
              source={icons.fat}
              style={{
                width: 20,
                height: 20,
                marginRight: 5,
              }}
            />
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.white,
              }}
            >
              {tongThanhPhanChinh.FAT}g - Fat
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  };

  const renderBuaAn = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          flexDirection: "row",
          marginTop: SIZES.padding,
        }}
      >
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              ...FONTS.h3,
            }}
          >
            Bữa ăn:
          </Text>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            {buaAnList.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    backgroundColor:
                      item.bua_an_id === buaAnChoose
                        ? COLORS.primary
                        : COLORS.white,
                    padding: SIZES.radius,
                    borderRadius: SIZES.radius,
                    borderWidth: 1,
                    borderColor: COLORS.lightGray1,
                    marginLeft: SIZES.radius,
                  }}
                  onPress={() => {
                    setBuaAnChoose(item.bua_an_id);
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.body3,
                      color:
                        item.bua_an_id === buaAnChoose
                          ? COLORS.white
                          : COLORS.gray,
                    }}
                  >
                    {item.ten_bua_an}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    );
  };

  const renderChonNgay = () => {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            ...FONTS.h3,
          }}
        >
          Chọn ngày:
        </Text>

        <TouchableOpacity
          onPress={() => {
            setShowModalChonNgay(true);
          }}
          style={{
            backgroundColor: COLORS.primary,
            paddingHorizontal: 5,
            paddingVertical: 3,
            borderRadius: 5,
            marginLeft: 5,
          }}
        >
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.white,
            }}
          >
            {dateSelected.date_title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderOwnerShop = () => {
    return (
      <View
        style={{
          alignItems: "center",
          marginTop: SIZES.padding,
        }}
      >
        <View
          style={{
            width: "120%",
            height: 1,
            backgroundColor: COLORS.lightGray2,
          }}
        ></View>
        <View
          style={{
            width: "120%",
            height: 1,
            backgroundColor: COLORS.lightGray2,
          }}
        ></View>
      </View>
    );
  };

  const renderAddToCart = () => {
    return (
      <View
        style={{
          position: "absolute",
          height: 80,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: COLORS.white,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderTopWidth: 1,
          borderTopColor: COLORS.lightGray1,
          paddingHorizontal: SIZES.padding,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: COLORS.lightGray2,
            height: 50,
            paddingHorizontal: SIZES.radius,
            borderRadius: SIZES.radius,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (Number(quanty) === 1) {
                return;
              } else if (typeof Number(quanty) && Number(quanty) > 1) {
                console.log("Trừ");
                setQuanty(String(Number(quanty) - 1));
              } else {
                console.log("Số lượng nhập vào không hợp lệ.");
              }
            }}
          >
            <Image
              source={icons.minus}
              style={{
                width: 25,
                height: 25,
              }}
            />
          </TouchableOpacity>

          <TextInput
            value={quanty}
            keyboardType="numeric"
            maxLength={3}
            onChangeText={(value) => {
              console.log("value =", value);
              setQuanty(value);
            }}
            style={{
              ...FONTS.h3,
              color: COLORS.green,
              marginHorizontal: SIZES.radius,
              lineHeight: 35,
              fontSize: 25,
              textAlign: "center",
            }}
          />

          <TouchableOpacity
            onPress={() => {
              if (typeof Number(quanty) && Number(quanty) > 0) {
                console.log("Cộng");
                setQuanty(String(Number(quanty) + 1));
              } else {
                console.log("Số lượng nhập vào không hợp lệ.");
              }
            }}
          >
            <Image
              source={icons.plus}
              style={{
                width: 25,
                height: 25,
              }}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => {
            console.log("THÊM MÓN VÀO BỮA/NGÀY ĂN");
            handleAddMonAnVaoNgayAn();
          }}
          style={{
            paddingHorizontal: SIZES.radius,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.primary,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: 50,
          }}
        >
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.white,
            }}
          >
            Thêm món
          </Text>
        </TouchableOpacity>
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
          <View style={{ paddingHorizontal: SIZES.padding }}>
            <HeaderDrawerChild
              title={"Chi tiết món ăn"}
              navigation={navigation}
              rightComponent={
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("FavouriteFood");
                  }}
                  style={{
                    borderWidth: 1,
                    borderColor: COLORS.white,
                    width: 40,
                    height: 40,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: SIZES.radius,
                  }}
                >
                  <Image
                    source={icons.favourite}
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: COLORS.white,
                    }}
                  />
                </TouchableOpacity>
              }
            />
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              backgroundColor: COLORS.white,
              paddingHorizontal: SIZES.padding,
            }}
          >
            {/* Image Product */}
            <CardImageProduct
              favourite={favourite}
              image_url={monAnChoose.image_url}
              setFavourite={() => {
                handleYeuThichMonAn();
              }}
              tongThanhPhanChinh={tongThanhPhanChinh}
            />

            {/* Product Description */}
            {renderProductDescription()}

            {/* Star, time, Ship price */}
            {renderThanhPhanDinhDuongChinh()}

            {/*Bữa ăn */}
            {renderBuaAn()}

            {/* Show Modal */}
            {showModalChonNgay && (
              <DateTimePicker value={new Date()} onChange={onChangeDate} />
            )}

            {/* Render chọn ngày */}
            {renderChonNgay()}

            {/* Render Chi Tiết Của Món Ăn + Thực Phẩm Có Trong Món */}
            {PhanNhomMonAnMemo}

            {/* Tổng thành phần dinh dưỡng của món ăn */}
            <View
              style={{
                marginTop: SIZES.padding,
              }}
            >
              <Text
                style={{
                  ...FONTS.h3,
                }}
              >
                Tổng thành phần dinh dưỡng:
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
                  <Text style={styles.columnEnd}>{tongThanhPhanChinh.FAT}</Text>
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
                  <Text style={styles.columnEnd}>{tongThanhPhanChinh.ASH}</Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Canxi</Text>
                  <Text style={styles.column20}>mg</Text>
                  <Text style={styles.columnEnd}>{tongThanhPhanChinh.CA}</Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Phospho</Text>
                  <Text style={styles.column20}>mg</Text>
                  <Text style={styles.columnEnd}>{tongThanhPhanChinh.P}</Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Sắt</Text>
                  <Text style={styles.column20}>mg</Text>
                  <Text style={styles.columnEnd}>{tongThanhPhanChinh.FE}</Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Kẽm</Text>
                  <Text style={styles.column20}>mg</Text>
                  <Text style={styles.columnEnd}>{tongThanhPhanChinh.ZN}</Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Natri</Text>
                  <Text style={styles.column20}>mg</Text>
                  <Text style={styles.columnEnd}>{tongThanhPhanChinh.NA}</Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Kali</Text>
                  <Text style={styles.column20}>mg</Text>
                  <Text style={styles.columnEnd}>{tongThanhPhanChinh.K}</Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Magie</Text>
                  <Text style={styles.column20}>mg</Text>
                  <Text style={styles.columnEnd}>{tongThanhPhanChinh.MG}</Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Mangan</Text>
                  <Text style={styles.column20}>mg</Text>
                  <Text style={styles.columnEnd}>{tongThanhPhanChinh.MN}</Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Đồng</Text>
                  <Text style={styles.column20}>mg</Text>
                  <Text style={styles.columnEnd}>{tongThanhPhanChinh.CU}</Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Selen</Text>
                  <Text style={styles.column20}>µg</Text>
                  <Text style={styles.columnEnd}>{tongThanhPhanChinh.SE}</Text>
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
                  <Text style={styles.columnEnd}>{tongThanhPhanChinh.NIA}</Text>
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
                  <Text style={styles.columnEnd}>{tongThanhPhanChinh.FOL}</Text>
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

            {/* Line Progress */}
            <View
              style={{
                height: 12,
                marginTop: SIZES.padding,
                backgroundColor: COLORS.lightGray1,
                marginHorizontal: SIZES.padding,
                borderRadius: SIZES.radius,
              }}
            >
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  height: "100%",
                  width: "70%",
                  backgroundColor: COLORS.primary,
                  borderRadius: SIZES.radius,
                }}
              ></View>
            </View>

            {/* Owner Created */}
            {renderOwnerShop()}

            <View
              style={{
                marginTop: 80,
              }}
            ></View>
          </ScrollView>
          {renderAddToCart()}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header_table50: {
    color: COLORS.white,
    width: SIZES.width / 2.2,
    ...FONTS.h4,
  },

  header_table20: {
    color: COLORS.white,
    ...FONTS.body4,
    width: SIZES.width / 8,
    textAlign: "center",
    ...FONTS.h4,
  },

  header_tableEnd: {
    flex: 1,
    color: COLORS.white,
    textAlign: "right",
    ...FONTS.h4,
  },

  column50: {
    color: COLORS.black,
    width: SIZES.width / 2.2,
    ...FONTS.body4,
    fontSize: 14.5,
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
    ...FONTS.body4,
    fontSize: 14.5,
  },

  columnEnd: {
    flex: 1,
    color: COLORS.black,
    textAlign: "right",
    ...FONTS.body4,
    fontSize: 14.5,
  },
});

export default FoodDetail;
