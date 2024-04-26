import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, icons, FONTS, SIZES } from "../../constants";
import CircularProgress from "react-native-circular-progress-indicator";
import axios from "axios";
import { BACKEND_BASE, MucTieuTheoNgayURL, NgayAnURL } from "../../api";
import { notify } from "../../utils/variable";
import ModalCapNhatNgayAn from "./ModalCapNhatNgayAn";
import ModalXoaNgayAn from "./ModalXoaNgayAn";
import { useIsFocused } from "@react-navigation/native";
import { setSelectedTab } from "../../stores/tab/tabAction";
import { connect } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import LoginViewMore from "../../components/LoginViewMore";

function Home({ HeaderBottomBar, navigation, setSelectedTab }) {
  const isFocused = useIsFocused();
  const [loading, isLoading] = useState(true);
  const [login, setLogin] = useState(false);
  const [showModalChonNgay, setShowModalChonNgay] = useState(false);
  const [ngayAnList, setNgayAnList] = useState([]);
  const [showModalCapNhatNgayAn, setShowModalCapNhatNgayAn] = useState({
    show: false,
    ngayAnChoose: null,
  });
  let [goiYList, setGoiYList] = useState({
    data: null,
    message: "",
    tong_thanh_phan: {},
    run: false,
  });

  const [showModalXoaNgayAn, setShowModalXoaNgayAn] = useState({
    show: false,
    ngayAnChoose: null,
  });
  const [tongThanhPhanChinhNgay, setTongThanhPhanChinhNgay] = useState({});
  let [dateSelected, setDateSelected] = useState(() => {
    const date = new Date();
    const date_string =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return {
      date_string,
      date_title:
        date.getDate() +
        " tháng " +
        (date.getMonth() + 1) +
        " năm " +
        date.getFullYear(),
    };
  });
  let [mucTieu, setMucTieu] = useState({
    data: null,
    must: "",
    type: "",
    message: "",
  });

  const addNgay = () => {
    let nextDay = new Date(dateSelected.date_string);
    nextDay.setDate(nextDay.getDate() + 1);
    const nextDate_selected =
      nextDay.getFullYear() +
      "-" +
      (nextDay.getMonth() + 1) +
      "-" +
      nextDay.getDate();
    setDateSelected({
      date_string: nextDate_selected,
      date_title:
        nextDay.getDate() +
        " tháng " +
        (nextDay.getMonth() + 1) +
        " năm " +
        nextDay.getFullYear(),
    });
  };

  const subNgay = () => {
    let subDay = new Date(dateSelected.date_string);
    subDay.setDate(subDay.getDate() - 1);
    const nextDate_selected =
      subDay.getFullYear() +
      "-" +
      (subDay.getMonth() + 1) +
      "-" +
      subDay.getDate();
    setDateSelected({
      date_string: nextDate_selected,
      date_title:
        subDay.getDate() +
        " tháng " +
        (subDay.getMonth() + 1) +
        " năm " +
        subDay.getFullYear(),
    });
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
          " tháng " +
          (selectedDate.getMonth() + 1) +
          " năm " +
          selectedDate.getFullYear(),
      });
    }
  };

  const updateNgayAn = async (ngayAnInput) => {
    const ngayan_id = ngayAnInput.ngayan_id;
    const ngay_an = {
      bua_an_id: ngayAnInput.bua_an_id,
      id_monan: ngayAnInput.id_monan,
      quanty: Number(ngayAnInput.quanty),
      time: ngayAnInput.time,
    };
    const response = await axios.put(
      `${NgayAnURL + "/" + ngayan_id}`,
      ngay_an,
      {
        withCredentials: true,
      }
    );
    if (response.data.status) {
      setShowModalCapNhatNgayAn({
        show: false,
        ngayAnChoose: null,
      });
      notify(true, response.data.message);
      setNgayAnList(response.data.data);
    } else {
      notify(false, response.data.message);
      if (response.data.must === "login") {
        return navigation.navigate("LoginViewMore");
      }
    }
    return response.data;
  };

  const xoaNgayAn = async (ngayAnChoose) => {
    const ngayan_id = ngayAnChoose.ngayan_id;
    const response = await axios.delete(`${NgayAnURL + "/" + ngayan_id}`, {
      withCredentials: true,
    });
    if (response.data.status) {
      setShowModalXoaNgayAn({
        show: false,
        ngayAnChoose: null,
      });
      notify(true, response.data.message);
      setNgayAnList(response.data.data);
    } else {
      notify(false, response.data.message);
      if (response.data.must === "login") {
        return navigation.navigate("LoginViewMore");
      }
    }
    return response.data;
  };

  const handleXoaNgayAn = () => {
    const ngay_an_choose = showModalCapNhatNgayAn.ngayAnChoose;
    setShowModalCapNhatNgayAn({
      show: false,
      ngayAnChoose: null,
    });
    setShowModalXoaNgayAn({
      show: true,
      ngayAnChoose: ngay_an_choose,
    });
  };

  const handleCopyMonAn = async () => {
    const ngay_an = {
      timeCopy: dateSelected.date_string,
    };
    const response = await axios.post(`${NgayAnURL + "/copy"}`, ngay_an, {
      withCredentials: true,
    });
    notify(response.data.status, response.data.message);
    if (response.data.status) {
      setNgayAnList(response.data.data);
      const date = new Date();
      const date_string =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      setDateSelected({
        date_string,
        date_title:
          date.getDate() +
          " tháng " +
          (date.getMonth() + 1) +
          " năm " +
          date.getFullYear(),
      });
    } else {
      notify(false, response.data.message);
      if (response.data.must === "login") {
        return navigation.navigate("LoginViewMore");
      }
      return;
    }
  };

  useEffect(() => {
    const getAllMonAnOfNgayAn = async () => {
      const response = await axios.get(
        `${NgayAnURL + "?date=" + dateSelected.date_string}`
      );
      if (response.data.status) {
        setNgayAnList(response.data.data);
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigation.navigate("LoginViewMore");
        }
      }
    };

    const getMucTieuTheoNgay = async () => {
      if (!dateSelected.date_string) {
        notify(false, "Ngày xem không hợp lệ.");
        return;
      }
      const response = await axios.get(
        `${MucTieuTheoNgayURL + "?date=" + dateSelected.date_string}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        setMucTieu({
          ...mucTieu,
          data: response.data.data,
          type: response.data.type,
          must: response.data.must || "",
          message: response.data.message || "",
        });
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigation.navigate("LoginViewMore");
        }
      }
    };

    async function checkPermission() {
      const response = await axios.get(`${BACKEND_BASE + "/check/customer"}`, {
        withCredentials: true,
      });
      if (!response.data.status) {
        return false;
      } else return true;
    }

    async function getGoiY() {
      if (goiYList.run === false) {
        const response = await axios.get(`${NgayAnURL}/goi-y`, {
          withCredentials: true,
        });

        if (response.data.status) {
          setGoiYList({
            data: response.data.data,
            tong_thanh_phan: response.data.tong_thanh_phan,
            message: "",
            run: true,
          });
        } else {
          setGoiYList({
            data: null,
            tong_thanh_phan: null,
            message: response.data.message,
            run: true,
          });
          if (response.data.must === "login") {
            return navigate("/account/login", { replace: true });
          }
        }
      }
    }

    const handleAPIAll = async () => {
      const check = await checkPermission();
      if (check) {
        await Promise.all([
          Promise.resolve(getGoiY()),
          Promise.resolve(getAllMonAnOfNgayAn()),
          Promise.resolve(getMucTieuTheoNgay()),
        ]);
        setLogin(true);
        isLoading(false);
      } else {
        setLogin(false);
        isLoading(false);
      }
    };
    handleAPIAll();
  }, [dateSelected, isFocused]);

  const handleDoiGoiYMonAn = async () => {
    const response = await axios.get(`${NgayAnURL}/goi-y`, {
      withCredentials: true,
    });
    if (response.data.status) {
      setGoiYList({
        data: response.data.data,
        tong_thanh_phan: response.data.tong_thanh_phan,
        message: "",
        run: true,
      });
    } else {
      setGoiYList({
        data: null,
        tong_thanh_phan: null,
        message: response.data.message,
        run: true,
      });
      if (response.data.must === "login") {
        return navigate("/account/login", { replace: true });
      }
    }
  };

  useEffect(() => {
    tinhTongThanhPhanChinhNgay();
  }, [ngayAnList]);

  const tinhTongThanhPhanChinhNgay = () => {
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
    ngayAnList?.forEach((item) => {
      item.MonAn.ChiTietMons.forEach((chiTietMon) => {
        for (const [key, value] of Object.entries(chiTietMon.ThucPham)) {
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
                (Number(value) *
                  Number(item.quanty) *
                  Number(chiTietMon.quanty)) /
                  100;
            }
          }
        }
      });
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
        ].includes(key)
      ) {
        newtongThanhPhanChinh[key] = Number(value).toFixed(0) * 1;
      } else if (["WATER"].includes(key)) {
        newtongThanhPhanChinh[key] = Number(value).toFixed(1) * 1;
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
        newtongThanhPhanChinh[key] = Number(value).toFixed(2) * 1;
      } else if (
        ["MN", "CU", "THIA", "RIBF", "NIA", "PANTAC", "VITB6"].includes(key)
      ) {
        newtongThanhPhanChinh[key] = Number(value).toFixed(3) * 1;
      }
    }
    setTongThanhPhanChinhNgay({ ...newtongThanhPhanChinh });
  };

  const tinhThanhPhanDinhDuongMotMonAn = (ChiTietMonAns, quantyPhanAn) => {
    const newtongThanhPhanChinh = {
      PROCNT: 0,
      FAT: 0,
      CHOCDF: 0,
      ENERC: 0,
      EDIBLE: 0,
    };
    ChiTietMonAns.forEach((item) => {
      for (const [key, value] of Object.entries(item.ThucPham)) {
        if (
          ![
            "id_thucpham",
            "TenTiengAnh",
            "TenTiengViet",
            "DonViTinh",
            "id_nhomthucpham",
            "image_url",
          ].includes(key)
        ) {
          if (typeof Number(value) === "number") {
            newtongThanhPhanChinh[key] =
              Number(newtongThanhPhanChinh[key]) +
              (Number(value) * Number(item.quanty) * Number(quantyPhanAn)) /
                100;
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
        ].includes(key)
      ) {
        newtongThanhPhanChinh[key] = Number(value).toFixed(0) * 1;
      } else if (["WATER"].includes(key)) {
        newtongThanhPhanChinh[key] = Number(value).toFixed(1) * 1;
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
        newtongThanhPhanChinh[key] = Number(value).toFixed(2) * 1;
      } else if (
        ["MN", "CU", "THIA", "RIBF", "NIA", "PANTAC", "VITB6"].includes(key)
      ) {
        newtongThanhPhanChinh[key] = Number(value).toFixed(3) * 1;
      }
    }

    return newtongThanhPhanChinh;
  };

  const renderMonAnBuaAn = (ngayAn, tenBuaAn, bua_an_id, icon) => {
    let tongThanhPhanCuaBuaAn = {
      PROCNT: 0,
      FAT: 0,
      CHOCDF: 0,
      ENERC: 0,
      EDIBLE: 0,
    };
    return (
      <View
        style={{
          marginTop: SIZES.radius,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Image
              source={icon}
              style={{ width: 30, height: 30 }}
              resizeMode="center"
            />
            <Text style={{ ...FONTS.h3, color: COLORS.blue }}>{tenBuaAn}</Text>
          </View>
          {/* <TouchableOpacity onPress={() => {}} style={{}}>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.primary,
              }}
            >
              Thêm món
            </Text>
          </TouchableOpacity> */}
        </View>

        <View>
          {/* One Món Ăn */}
          {ngayAn.map((item, index) => {
            const thanhPhanMotMon = tinhThanhPhanDinhDuongMotMonAn(
              item.MonAn.ChiTietMons,
              item.quanty
            );
            tongThanhPhanCuaBuaAn.PROCNT += Number(thanhPhanMotMon.PROCNT);
            tongThanhPhanCuaBuaAn.FAT += Number(thanhPhanMotMon.FAT);
            tongThanhPhanCuaBuaAn.CHOCDF += Number(thanhPhanMotMon.CHOCDF);
            tongThanhPhanCuaBuaAn.ENERC += Number(thanhPhanMotMon.ENERC);
            return (
              <View key={index}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("FoodDetail", {
                        id_monan: item.MonAn.id_monan,
                        quanty: item.quanty,
                        bua_an_id: item.bua_an_id,
                      });
                    }}
                  >
                    <Text
                      style={{
                        ...FONTS.h4,
                      }}
                    >
                      + {item.MonAn.ten_mon} ({Number(item.quanty) * 1} phần)
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setShowModalCapNhatNgayAn({
                        show: true,
                        ngayAnChoose: item,
                      });
                    }}
                  >
                    <Text
                      style={{
                        ...FONTS.h4,
                        color: COLORS.blue,
                      }}
                    >
                      Cập nhật
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text
                  style={{
                    ...FONTS.body4,
                  }}
                >
                  Thành phần: Protein: {thanhPhanMotMon.PROCNT}g - Fat:{" "}
                  {thanhPhanMotMon.FAT}g - Carbohydrate:{" "}
                  {thanhPhanMotMon.CHOCDF}g - Calo: {thanhPhanMotMon.ENERC} Kcal
                </Text>
              </View>
            );
          })}
        </View>
        <View>
          <View
            style={{
              height: 1,
              width: "80%",
              backgroundColor: COLORS.gray,
              marginHorizontal: SIZES.padding,
              marginVertical: SIZES.base,
            }}
          ></View>
          <Text
            style={{
              ...FONTS.h4,
            }}
          >
            Tổng cộng: Protein: {tongThanhPhanCuaBuaAn.PROCNT}g - Fat:{" "}
            {tongThanhPhanCuaBuaAn.FAT}g - Carbohydrate:{" "}
            {tongThanhPhanCuaBuaAn.CHOCDF}g - Calo:{" "}
            {tongThanhPhanCuaBuaAn.ENERC} Kcal
          </Text>
        </View>
      </View>
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
            backgroundColor: COLORS.white,
          }}
        >
          {/* Render Header */}
          {HeaderBottomBar}

          {/* Show Modal Chọn Ngày */}
          {showModalChonNgay && (
            <DateTimePicker
              value={new Date(dateSelected.date_string)}
              onChange={onChangeDate}
            />
          )}

          {/* Modal Cap Nhat Ngay An */}
          {showModalCapNhatNgayAn.show &&
            showModalCapNhatNgayAn.ngayAnChoose && (
              <ModalCapNhatNgayAn
                ngayAnChoose={showModalCapNhatNgayAn.ngayAnChoose}
                updateNgayAn={updateNgayAn}
                handleRemoveNgayAn={handleXoaNgayAn}
                setShowModalCapNhatNgayAn={() => {
                  setShowModalCapNhatNgayAn({
                    show: false,
                    ngayAnChoose: null,
                  });
                }}
              />
            )}

          {/* Modal Xóa ngày ăn */}
          {showModalXoaNgayAn.show && showModalXoaNgayAn.ngayAnChoose && (
            <ModalXoaNgayAn
              ngayAnChoose={showModalXoaNgayAn.ngayAnChoose}
              xoaNgayAn={xoaNgayAn}
              setShowModalXoaNgayAn={() => {
                setShowModalXoaNgayAn({
                  show: false,
                  ngayAnChoose: null,
                });
              }}
            />
          )}

          <ScrollView>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: SIZES.base,
              }}
            >
              <TouchableOpacity
                onPress={() => subNgay()}
                style={{
                  padding: 10,
                  backgroundColor: COLORS.primary,
                  borderRadius: 10,
                }}
              >
                <Image
                  source={icons.pretime}
                  style={{ width: 20, height: 20, tintColor: COLORS.white }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setShowModalChonNgay(true);
                }}
                style={{
                  marginHorizontal: SIZES.radius,
                }}
              >
                <Text style={{ ...FONTS.h3 }}>{dateSelected.date_title}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => addNgay()}
                style={{
                  padding: 10,
                  backgroundColor: COLORS.primary,
                  borderRadius: 10,
                }}
              >
                <Image
                  source={icons.nexttime}
                  style={{ width: 20, height: 20, tintColor: COLORS.white }}
                />
              </TouchableOpacity>
            </View>

            {/* Render Circle */}
            <View
              style={{
                alignItems: "center",
                marginTop: SIZES.radius,
              }}
            >
              <CircularProgress
                title={tongThanhPhanChinhNgay.ENERC || "0"}
                titleStyle={{
                  ...FONTS.h1,
                }}
                subtitleStyle={{
                  ...FONTS.body4,
                }}
                showProgressValue={false}
                // subtitle={"calo còn lại"}
                subtitle={"Năng Lượng"}
                value={
                  mucTieu.data && tongThanhPhanChinhNgay.ENERC
                    ? Number(tongThanhPhanChinhNgay.ENERC) /
                        Number(mucTieu.data.ENERC) >=
                      1
                      ? 100
                      : (Number(tongThanhPhanChinhNgay.ENERC) /
                          Number(mucTieu.data.ENERC)) *
                        100
                    : 100
                }
                valuePrefix={""}
                inActiveStrokeColor={"#2ecc71"}
                inActiveStrokeOpacity={0.4}
              />
            </View>

            {/* Render mục tiêu /Nhu cầu */}
            <View
              style={{
                paddingHorizontal: SIZES.padding,
                paddingVertical: SIZES.base,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    ...FONTS.h3,
                  }}
                >
                  Tích lũy
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("NhuCauDinhDuong");
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.h3,
                      color: COLORS.primary,
                    }}
                  >
                    Khuyến nghị
                  </Text>
                </TouchableOpacity>
              </View>

              <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: SIZES.radius,
                    }}
                  >
                    {/* One  */}
                    <View
                      style={{
                        width: 100,
                        marginRight: SIZES.padding,
                      }}
                    >
                      <Text
                        style={{
                          ...FONTS.body3,
                          textAlign: "center",
                        }}
                      >
                        Protein
                      </Text>
                      <Text
                        style={{
                          ...FONTS.body3,
                          textAlign: "center",
                        }}
                      >
                        {mucTieu.data
                          ? tongThanhPhanChinhNgay.PROCNT +
                            "/" +
                            mucTieu.data.PROCNT +
                            "g"
                          : tongThanhPhanChinhNgay.PROCNT + "g"}
                      </Text>
                      {/* Line Progress */}
                      <View
                        style={{
                          height: 10,
                          width: 100,
                          marginTop: SIZES.base,
                          backgroundColor: COLORS.lightGray1,
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
                            width: mucTieu.data
                              ? Number(tongThanhPhanChinhNgay.PROCNT) /
                                  Number(mucTieu.data.PROCNT) >=
                                1
                                ? "100%"
                                : (Number(tongThanhPhanChinhNgay.PROCNT) /
                                    Number(mucTieu.data.PROCNT)) *
                                    100 +
                                  "%"
                              : "100%",
                            backgroundColor: COLORS.primary,
                            borderRadius: SIZES.radius,
                          }}
                        ></View>
                      </View>
                    </View>
                    {/* One  */}
                    <View
                      style={{
                        width: 100,
                        marginRight: SIZES.padding,
                      }}
                    >
                      <Text
                        style={{
                          ...FONTS.body3,
                          textAlign: "center",
                        }}
                      >
                        Fat
                      </Text>
                      <Text
                        style={{
                          ...FONTS.body3,
                          textAlign: "center",
                        }}
                      >
                        {mucTieu.data
                          ? tongThanhPhanChinhNgay.FAT +
                            "/" +
                            mucTieu.data.FAT +
                            "g"
                          : tongThanhPhanChinhNgay.FAT + "g"}
                      </Text>
                      {/* Line Progress */}
                      <View
                        style={{
                          height: 10,
                          width: 100,
                          marginTop: SIZES.base,
                          backgroundColor: COLORS.lightGray1,
                          borderRadius: SIZES.radius,
                        }}
                      >
                        <View
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            bottom: 0,
                            height: 10,
                            width: mucTieu.data
                              ? Number(tongThanhPhanChinhNgay.FAT) /
                                  Number(mucTieu.data.FAT) >=
                                1
                                ? "100%"
                                : (Number(tongThanhPhanChinhNgay.FAT) /
                                    Number(mucTieu.data.FAT)) *
                                    100 +
                                  "%"
                              : "100%",
                            backgroundColor: COLORS.primary,
                            borderRadius: SIZES.radius,
                          }}
                        ></View>
                      </View>
                    </View>
                    {/* One  */}
                    <View
                      style={{
                        width: 100,
                        marginRight: SIZES.padding,
                      }}
                    >
                      <Text
                        style={{
                          ...FONTS.body3,
                          textAlign: "center",
                        }}
                      >
                        Carbohydrate
                      </Text>
                      <Text
                        style={{
                          ...FONTS.body3,
                          textAlign: "center",
                        }}
                      >
                        {mucTieu.data
                          ? tongThanhPhanChinhNgay.CHOCDF +
                            "/" +
                            mucTieu.data.CHOCDF +
                            "g"
                          : tongThanhPhanChinhNgay.CHOCDF + "g"}
                      </Text>
                      {/* Line Progress */}
                      <View
                        style={{
                          height: 10,
                          width: 100,
                          marginTop: SIZES.base,
                          backgroundColor: COLORS.lightGray1,
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
                            width: mucTieu.data
                              ? Number(tongThanhPhanChinhNgay.CHOCDF) /
                                  Number(mucTieu.data.CHOCDF) >=
                                1
                                ? "100%"
                                : (Number(tongThanhPhanChinhNgay.CHOCDF) /
                                    Number(mucTieu.data.CHOCDF)) *
                                    100 +
                                  "%"
                              : "100%",
                            backgroundColor: COLORS.primary,
                            borderRadius: SIZES.radius,
                          }}
                        ></View>
                      </View>
                    </View>

                    {/* One  */}
                    <View
                      style={{
                        width: 100,
                        marginRight: SIZES.padding,
                      }}
                    >
                      <Text
                        style={{
                          ...FONTS.body3,
                          textAlign: "center",
                        }}
                      >
                        Năng lượng
                      </Text>
                      <Text
                        style={{
                          ...FONTS.body3,
                          textAlign: "center",
                        }}
                      >
                        {mucTieu.data
                          ? tongThanhPhanChinhNgay.ENERC +
                            "/" +
                            mucTieu.data.ENERC +
                            "cal"
                          : tongThanhPhanChinhNgay.ENERC + "Kcal"}
                      </Text>
                      {/* Line Progress */}
                      <View
                        style={{
                          height: 10,
                          width: 100,
                          marginTop: SIZES.base,
                          backgroundColor: COLORS.lightGray1,
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
                            width: mucTieu.data
                              ? Number(tongThanhPhanChinhNgay.ENERC) /
                                  Number(mucTieu.data.ENERC) >=
                                1
                                ? "100%"
                                : (Number(tongThanhPhanChinhNgay.ENERC) /
                                    Number(mucTieu.data.ENERC)) *
                                    100 +
                                  "%"
                              : "100%",
                            backgroundColor: COLORS.primary,
                            borderRadius: SIZES.radius,
                          }}
                        ></View>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>

            {/* Render Bữa ăn trong ngày */}
            <View
              style={{
                paddingHorizontal: SIZES.padding,
                marginTop: SIZES.padding,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    ...FONTS.h3,
                  }}
                >
                  Gợi ý món ăn hôm nay
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    handleCopyMonAn();
                  }}
                  style={{
                    backgroundColor: COLORS.primary,
                    paddingVertical: 3,
                    paddingHorizontal: 3,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.h3,
                      color: COLORS.white,
                    }}
                  >
                    Copy món ăn
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Render gợi ý */}
              <View
                style={{
                  marginTop: SIZES.base,
                }}
              >
                {!goiYList.data && goiYList.run ? (
                  <View>
                    <Text style={{ color: "red", ...FONTS.body4 }}>
                      {"Thông báo: " + goiYList.message}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: SIZES.base,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          backgroundColor: COLORS.primary,
                          paddingVertical: 3,
                          paddingHorizontal: 3,
                          borderRadius: 5,
                        }}
                        onPress={() => {
                          handleDoiGoiYMonAn();
                        }}
                      >
                        <Text
                          style={{
                            ...FONTS.h3,
                            color: COLORS.white,
                          }}
                        >
                          Đổi món
                        </Text>
                      </TouchableOpacity>
                      <View
                        style={{
                          flex: 1,
                        }}
                      ></View>
                    </View>
                  </View>
                ) : goiYList.data && goiYList.run ? (
                  <View>
                    {/* <Text
                      style={{
                        ...FONTS.body4,
                      }}
                    >
                      Gợi ý hôm nay:
                    </Text> */}
                    <Text
                      style={{
                        ...FONTS.body4,
                      }}
                    >
                      Tổng khẩu phần ăn: {goiYList.tong_thanh_phan.TOTAL_ENERC}{" "}
                      KCal, {goiYList.tong_thanh_phan.TOTAL_PROCNT}g Protein,{" "}
                      {goiYList.tong_thanh_phan.TOTAL_FAT}g Chất béo,{" "}
                      {goiYList.tong_thanh_phan.TOTAL_CHOCDF}g Carbohydrate
                    </Text>
                    <View>
                      {goiYList.data.map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              navigation.navigate("FoodDetail", {
                                id_monan: item.id_monan,
                                quanty: 1,
                                // quanty: item.quanty,
                              });
                            }}
                          >
                            <Text
                              style={{
                                ...FONTS.body4,
                              }}
                            >
                              + {item.quanty} {item.don_vi} {item.ten_mon}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: SIZES.base,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          backgroundColor: COLORS.primary,
                          paddingVertical: 3,
                          paddingHorizontal: 3,
                          borderRadius: 5,
                        }}
                        onPress={() => {
                          handleDoiGoiYMonAn();
                        }}
                      >
                        <Text
                          style={{
                            ...FONTS.h3,
                            color: COLORS.white,
                          }}
                        >
                          Đổi món
                        </Text>
                      </TouchableOpacity>
                      <View
                        style={{
                          flex: 1,
                        }}
                      ></View>
                    </View>
                  </View>
                ) : (
                  ""
                )}
              </View>

              {/* Render bữa sáng */}
              {renderMonAnBuaAn(
                ngayAnList.filter(
                  (buaan) =>
                    buaan.BuaAn.ten_bua_an.toLowerCase().includes("sáng") &&
                    buaan.bua_an_id === 1
                ),
                "Bữa sáng",
                1,
                icons.protein
              )}
              {/* Render bữa trưa */}
              {renderMonAnBuaAn(
                ngayAnList.filter(
                  (buaan) =>
                    buaan.BuaAn.ten_bua_an.toLowerCase().includes("trưa") &&
                    buaan.bua_an_id === 2
                ),
                "Bữa trưa",
                2,
                icons.carb
              )}

              {/* Render bữa tối */}
              {renderMonAnBuaAn(
                ngayAnList.filter(
                  (buaan) =>
                    buaan.BuaAn.ten_bua_an.toLowerCase().includes("tối") &&
                    buaan.bua_an_id === 3
                ),
                "Bữa tối",
                3,
                icons.fat
              )}

              {/* Render bữa phụ */}
              {renderMonAnBuaAn(
                ngayAnList.filter(
                  (buaan) =>
                    buaan.BuaAn.ten_bua_an.toLowerCase().includes("phụ") &&
                    buaan.bua_an_id === 4
                ),
                "Bữa phụ",
                4,
                icons.carb
              )}
              {/* Pagination */}
              <View
                style={{
                  marginTop: 80,
                }}
              ></View>
            </View>
          </ScrollView>
        </View>
      ) : (
        <LoginViewMore navigation={navigation} />
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    selectedTab: state.tabReducer.selectedTab,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedTab: (selectedTab) => {
      dispatch(setSelectedTab(selectedTab));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
