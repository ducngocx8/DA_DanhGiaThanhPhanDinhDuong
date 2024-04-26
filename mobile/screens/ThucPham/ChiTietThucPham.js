import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES, icons, FONTS, images } from "../../constants";
import HeaderDrawerChild from "../../components/HeaderDrawerChild";
import { BACKEND_HOME, ThucPhamChonURL, ThucPhamURL } from "../../api";
import { BUILD_ANDROID, imageMonAnRandom, notify } from "../../utils/variable";
import axios from "axios";

export default function ChiTietThucPham({ navigation, route }) {
  if (!route.params) {
    return navigation.navigate("Result", {
      icon: images.not_found,
      resultText: "Không tìm thấy thực phẩm",
      resultMessage: "Thực phẩm không tồn tại trên hệ thống!",
      resultButtonText: "Quay lại",
      screenName: "CustomDrawer",
    });
  }
  const [quanty, setQuanty] = useState(
    route?.params?.quanty ? String(Number(route.params.quanty) * 1) : "100"
  );
  const [loading, isLoading] = useState(true);
  const [thucPhamChoose, setThucPhamChoose] = useState(null);

  const { id_thucpham } = route.params;

  const addThucPhamChonAPI = async (thuc_pham) => {
    return await axios
      .post(`${ThucPhamChonURL}`, thuc_pham, {
        withCredentials: true,
      })
      .then((response) => {
        return response.data;
      });
  };

  const handleAddThucPhamChon = async () => {
    if (Number(quanty) === NaN || Number(quanty) < 0) {
      notify(false, "Số lượng thêm không hợp lệ.");
    } else {
      const thuc_pham = {
        id_thucpham: id_thucpham,
        quanty: Number(quanty),
      };
      const result = await addThucPhamChonAPI(thuc_pham);
      notify(result.status, result.message);
      if (!result.status) {
        setTimeout(() => {
          if (result.must === "login") {
            return navigation.navigate("LoginViewMoreNonTab");
          }
        }, 500);
      }
    }
  };

  useEffect(() => {
    const getThucPhamChoose = async () => {
      const response = await axios.get(`${ThucPhamURL}/${id_thucpham}`);
      if (!response.data.status) {
        return navigation.navigate("Result", {
          icon: images.not_found,
          resultText: "Không tìm thấy thực phẩm",
          resultMessage: "Thực phẩm không tồn tại trên hệ thống!",
          resultButtonText: "Quay lại",
          screenName: "CustomDrawer",
        });
      }
      setThucPhamChoose(response.data.data);
      isLoading(false);
    };

    const handleAPIAll = async () => {
      await Promise.all([Promise.resolve(getThucPhamChoose())]);
    };
    handleAPIAll();
  }, []);

  const tongDinhDuongMotThucPham = (thucPham) => {
    let quantyInput = 1;
    if (typeof Number(quanty) === "number" && quanty !== ".") {
      quantyInput = Number(quanty);
    }
    const newThanhPhanThucPham = {
      PROCNT: null,
      FAT: null,
      CHOCDF: null,
      ENERC: null,
      EDIBLE: null,
      WATER: null,
      FIBC: null,
      ASH: null,
      CA: null,
      P: null,
      FE: null,
      ZN: null,
      NA: null,
      K: null,
      MG: null,
      MN: null,
      CU: null,
      SE: null,
      VITC: null,
      THIA: null,
      RIBF: null,
      NIA: null,
      PANTAC: null,
      VITB6: null,
      FOL: null,
      FOLAC: null,
      BIOT: null,
      VITB12: null,
      RETOL: null,
      VITA: null,
      VITD: null,
      VITE: null,
      VITK: null,
      CARTB: null,
      CARTA: null,
      CRYXB: null,
    };
    if (thucPham) {
      for (const [key, value] of Object.entries(thucPham)) {
        if (
          [
            "ENERC",
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
          ].includes(key) &&
          value !== null
        ) {
          newThanhPhanThucPham[key] =
            ((Number(value) * quantyInput) / 100).toFixed(0) * 1;
        } else if (["WATER"].includes(key) && value !== null) {
          newThanhPhanThucPham[key] =
            ((Number(value) * quantyInput) / 100).toFixed(1) * 1;
        } else if (["EDIBLE"].includes(key) && value !== null) {
          newThanhPhanThucPham[key] = Number(value).toFixed(0) * 1;
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
            "FAT",
            "PROCNT",
            "CHOCDF",
          ].includes(key) &&
          value !== null
        ) {
          newThanhPhanThucPham[key] =
            ((Number(value) * quantyInput) / 100).toFixed(2) * 1;
        } else if (
          ["MN", "CU", "THIA", "RIBF", "NIA", "PANTAC", "VITB6"].includes(
            key
          ) &&
          value !== null
        ) {
          newThanhPhanThucPham[key] =
            ((Number(value) * quantyInput) / 100).toFixed(3) * 1;
        }
      }
    }
    return newThanhPhanThucPham;
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
            maxLength={4}
            onChangeText={(value) => {
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
                setQuanty(String(Number(quanty) + 1));
              } else {
                notify(false, "Số lượng nhập vào không hợp lệ.");
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
            console.log("ADD SẢN PHẨM CHỌN");
            handleAddThucPhamChon();
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
            Thêm vào danh sách
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderCardImageProduct = () => {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          backgroundColor: COLORS.lightGray2,
          borderRadius: SIZES.radius,
          alignItems: "center",
          height: 190,
          padding: SIZES.radius,
          borderWidth: 1,
          borderColor: COLORS.blue,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={icons.calo}
              style={{
                width: 20,
                height: 20,
              }}
            />
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.gray,
                marginLeft: 2,
              }}
            >
              {sumDinhDuongThucPham.ENERC === null
                ? "-"
                : sumDinhDuongThucPham.ENERC}{" "}
              calories
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              console.log("Handle favourite");
            }}
          >
            <Image
              source={icons.love}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.red,
              }}
            />
          </TouchableOpacity>
        </View>
        <Image
          style={{
            height: 140,
            width: 140,
            borderRadius: 70,
          }}
          source={
            thucPhamChoose.image_url
              ? { uri: BACKEND_HOME + thucPhamChoose.image_url }
              : imageMonAnRandom[0]
          }
        />
      </View>
    );
  };
  const sumDinhDuongThucPham = tongDinhDuongMotThucPham(thucPhamChoose);
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
              title={"Chi tiết thực phẩm"}
              navigation={navigation}
              rightComponent={
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("TongThanhPhanTP");
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
                    source={icons.bag}
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
              flex: 1,
              backgroundColor: COLORS.lightGray2,
              paddingHorizontal: SIZES.padding,
            }}
          >
            {renderCardImageProduct()}
            {/* Render TEXT */}
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
                Thực phẩm: {thucPhamChoose.TenTiengViet}
              </Text>
              <Text
                style={{
                  ...FONTS.body3,
                  marginTop: 5,
                }}
              >
                Thành phần dinh dưỡng trong {Number(quanty).toFixed(0)}g phần ăn
                được
              </Text>
              <Text
                style={{
                  ...FONTS.body3,
                }}
              >
                Thái bỏ:{" "}
                {thucPhamChoose.EDIBLE === null
                  ? "-"
                  : 100 - Number(thucPhamChoose.EDIBLE) + "%"}
              </Text>
            </View>

            {/* Render thành phần dinh dưỡng của thực phẩm */}
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
                  <Text style={styles.header_tableEnd}>Hàm lượng</Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Tỷ lệ phần ăn được</Text>
                  <Text style={styles.column20}>%</Text>
                  <Text style={styles.columnEnd}>
                    {sumDinhDuongThucPham.EDIBLE === null
                      ? "-"
                      : sumDinhDuongThucPham.EDIBLE}
                  </Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Năng Lượng</Text>
                  <Text style={styles.column20}>KCal</Text>
                  <Text style={styles.columnEnd}>
                    {sumDinhDuongThucPham.ENERC === null
                      ? "-"
                      : sumDinhDuongThucPham.ENERC}
                  </Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Hàm lượng nước</Text>
                  <Text style={styles.column20}>g</Text>
                  <Text style={styles.columnEnd}>
                    {sumDinhDuongThucPham.WATER === null
                      ? "-"
                      : sumDinhDuongThucPham.WATER}
                  </Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Tổng protein</Text>
                  <Text style={styles.column20}>g</Text>
                  <Text style={styles.columnEnd}>
                    {sumDinhDuongThucPham.PROCNT === null
                      ? "-"
                      : sumDinhDuongThucPham.PROCNT}
                  </Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Tổng chất béo</Text>
                  <Text style={styles.column20}>g</Text>
                  <Text style={styles.columnEnd}>
                    {sumDinhDuongThucPham.FAT === null
                      ? "-"
                      : sumDinhDuongThucPham.FAT}
                  </Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Tổng Carbohydrate</Text>
                  <Text style={styles.column20}>g</Text>
                  <Text style={styles.columnEnd}>
                    {sumDinhDuongThucPham.CHOCDF === null
                      ? "-"
                      : sumDinhDuongThucPham.CHOCDF}
                  </Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Chất xơ</Text>
                  <Text style={styles.column20}>g</Text>
                  <Text style={styles.columnEnd}>
                    {sumDinhDuongThucPham.FIBC === null
                      ? "-"
                      : sumDinhDuongThucPham.FIBC}
                  </Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Tro</Text>
                  <Text style={styles.column20}>g</Text>
                  <Text style={styles.columnEnd}>
                    {sumDinhDuongThucPham.ASH === null
                      ? "-"
                      : sumDinhDuongThucPham.ASH}
                  </Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Canxi</Text>
                  <Text style={styles.column20}>mg</Text>
                  <Text style={styles.columnEnd}>
                    {sumDinhDuongThucPham.CA === null
                      ? "-"
                      : sumDinhDuongThucPham.CA}
                  </Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Phospho</Text>
                  <Text style={styles.column20}>mg</Text>
                  <Text style={styles.columnEnd}>
                    {sumDinhDuongThucPham.P === null
                      ? "-"
                      : sumDinhDuongThucPham.P}
                  </Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Sắt</Text>
                  <Text style={styles.column20}>mg</Text>
                  <Text style={styles.columnEnd}>
                    {sumDinhDuongThucPham.FE === null
                      ? "-"
                      : sumDinhDuongThucPham.FE}
                  </Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Kẽm</Text>
                  <Text style={styles.column20}>mg</Text>
                  <Text style={styles.columnEnd}>
                    {sumDinhDuongThucPham.ZN === null
                      ? "-"
                      : sumDinhDuongThucPham.ZN}
                  </Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Natri</Text>
                  <Text style={styles.column20}>mg</Text>
                  <Text style={styles.columnEnd}>
                    {sumDinhDuongThucPham.NA === null
                      ? "-"
                      : sumDinhDuongThucPham.NA}
                  </Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Kali</Text>
                  <Text style={styles.column20}>mg</Text>
                  <Text style={styles.columnEnd}>
                    {sumDinhDuongThucPham.K === null
                      ? "-"
                      : sumDinhDuongThucPham.K}
                  </Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Magie</Text>
                  <Text style={styles.column20}>mg</Text>
                  <Text style={styles.columnEnd}>
                    {sumDinhDuongThucPham.MG === null
                      ? "-"
                      : sumDinhDuongThucPham.MG}
                  </Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Mangan</Text>
                  <Text style={styles.column20}>mg</Text>
                  <Text style={styles.columnEnd}>
                    {sumDinhDuongThucPham.MN === null
                      ? "-"
                      : sumDinhDuongThucPham.MN}
                  </Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Đồng</Text>
                  <Text style={styles.column20}>mg</Text>
                  <Text style={styles.columnEnd}>
                    {sumDinhDuongThucPham.CU === null
                      ? "-"
                      : sumDinhDuongThucPham.CU}
                  </Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Selen</Text>
                  <Text style={styles.column20}>µg</Text>
                  <Text style={styles.columnEnd}>
                    {sumDinhDuongThucPham.SE === null
                      ? "-"
                      : sumDinhDuongThucPham.SE}
                  </Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Vitamin C</Text>
                  <Text style={styles.column20}>mg</Text>
                  <Text style={styles.columnEnd}>
                    {sumDinhDuongThucPham.VITC === null
                      ? "-"
                      : sumDinhDuongThucPham.VITC}
                  </Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Vitamin B1 (Thiamin)</Text>
                  <Text style={styles.column20}>mg</Text>
                  <Text style={styles.columnEnd}>
                    {sumDinhDuongThucPham.THIA === null
                      ? "-"
                      : sumDinhDuongThucPham.THIA}
                  </Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Vitamin B2 (Riboflavin)</Text>
                  <Text style={styles.column20}>mg</Text>
                  <Text style={styles.columnEnd}>
                    {sumDinhDuongThucPham.RIBF === null
                      ? "-"
                      : sumDinhDuongThucPham.RIBF}
                  </Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Niacin</Text>
                  <Text style={styles.column20}>mg</Text>
                  <Text style={styles.columnEnd}>
                    {sumDinhDuongThucPham.NIA === null
                      ? "-"
                      : sumDinhDuongThucPham.NIA}
                  </Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Acid pantothenic</Text>
                  <Text style={styles.column20}>mg</Text>
                  <Text style={styles.columnEnd}>
                    {sumDinhDuongThucPham.PANTAC === null
                      ? "-"
                      : sumDinhDuongThucPham.PANTAC}
                  </Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Vitamin B6</Text>
                  <Text style={styles.column20}>mg</Text>
                  <Text style={styles.columnEnd}>
                    {sumDinhDuongThucPham.VITB6 === null
                      ? "-"
                      : sumDinhDuongThucPham.VITB6}
                  </Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Vitamin A</Text>
                  <Text style={styles.column20}>µg</Text>
                  <Text style={styles.columnEnd}>
                    {sumDinhDuongThucPham.VITA === null
                      ? "-"
                      : sumDinhDuongThucPham.VITA}
                  </Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Vitamin D</Text>
                  <Text style={styles.column20}>µg</Text>
                  <Text style={styles.columnEnd}>
                    {sumDinhDuongThucPham.VITD === null
                      ? "-"
                      : sumDinhDuongThucPham.VITD}
                  </Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Vitamin E</Text>
                  <Text style={styles.column20}>mg</Text>
                  <Text style={styles.columnEnd}>
                    {sumDinhDuongThucPham.VITE === null
                      ? "-"
                      : sumDinhDuongThucPham.VITE}
                  </Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Vitamin K</Text>
                  <Text style={styles.column20}>µg</Text>
                  <Text style={styles.columnEnd}>
                    {sumDinhDuongThucPham.VITK === null
                      ? "-"
                      : sumDinhDuongThucPham.VITK}
                  </Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Vitamin B12</Text>
                  <Text style={styles.column20}>µg</Text>
                  <Text style={styles.columnEnd}>
                    {sumDinhDuongThucPham.VITB12 === null
                      ? "-"
                      : sumDinhDuongThucPham.VITB12}
                  </Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Tổng FOL</Text>
                  <Text style={styles.column20}>µg</Text>
                  <Text style={styles.columnEnd}>
                    {sumDinhDuongThucPham.FOL === null
                      ? "-"
                      : sumDinhDuongThucPham.FOL}
                  </Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Acid Folic</Text>
                  <Text style={styles.column20}>µg</Text>
                  <Text style={styles.columnEnd}>
                    {sumDinhDuongThucPham.FOLAC === null
                      ? "-"
                      : sumDinhDuongThucPham.FOLAC}
                  </Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Biotin</Text>
                  <Text style={styles.column20}>µg</Text>
                  <Text style={styles.columnEnd}>
                    {sumDinhDuongThucPham.BIOT === null
                      ? "-"
                      : sumDinhDuongThucPham.BIOT}
                  </Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Retinol</Text>
                  <Text style={styles.column20}>µg</Text>
                  <Text style={styles.columnEnd}>
                    {sumDinhDuongThucPham.RETOL === null
                      ? "-"
                      : sumDinhDuongThucPham.RETOL}
                  </Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Beta Carotene Alpha</Text>
                  <Text style={styles.column20}>µg</Text>
                  <Text style={styles.columnEnd}>
                    {sumDinhDuongThucPham.CARTB === null
                      ? "-"
                      : sumDinhDuongThucPham.CARTB}
                  </Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>Alpha Carotene</Text>
                  <Text style={styles.column20}>µg</Text>
                  <Text style={styles.columnEnd}>
                    {sumDinhDuongThucPham.CARTA === null
                      ? "-"
                      : sumDinhDuongThucPham.CARTA}
                  </Text>
                </View>

                <View style={styles.one_row_dd}>
                  <Text style={styles.column50}>CRYXB</Text>
                  <Text style={styles.column20}>µg</Text>
                  <Text style={styles.columnEnd}>
                    {sumDinhDuongThucPham.CRYXB === null
                      ? "-"
                      : sumDinhDuongThucPham.CRYXB}
                  </Text>
                </View>
              </View>
            </View>
            {/* Pagination */}
            <View
              style={{
                marginTop: 85,
              }}
            ></View>
          </ScrollView>
          {renderAddToCart()}
        </View>
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
