import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS, SIZES, FONTS } from "../../constants";
import axios from "axios";
import { BACKEND_BASE, MucTieuHomNayURL, MucTieuURL } from "../../api";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { convertToDateOnly } from "../../utils/date";
import { useIsFocused } from "@react-navigation/native";
import LoginViewMore from "../../components/LoginViewMore";
import { notify } from "../../utils/variable";

export default function Plan({ HeaderBottomBar, navigation }) {
  const isFocused = useIsFocused();
  const [loading, isLoading] = useState(true);
  const [login, setLogin] = useState(false);
  const dateNow = new Date();
  const [mucTieuHomNay, setMucTieuHomNay] = useState({
    muctieu_id: "",
    ENERC: "",
    PROCNT: "",
    FAT: "",
    CHOCDF: "",
    note: "",
    time: "",
  });
  useEffect(() => {
    async function checkPermission() {
      const response = await axios.get(`${BACKEND_BASE + "/check/customer"}`, {
        withCredentials: true,
      });
      if (!response.data.status) {
        return false;
      } else return true;
    }

    const getMucTieuHomNay = async () => {
      const response = await axios.get(`${MucTieuHomNayURL}`);
      if (response.data.status) {
        if (response.data.data) {
          const { muctieu_id, ENERC, PROCNT, FAT, CHOCDF, note, time } =
            response.data.data;
          setMucTieuHomNay({
            muctieu_id,
            ENERC: String(Number(ENERC) * 1),
            PROCNT: String(Number(PROCNT) * 1),
            FAT: String(Number(FAT) * 1),
            CHOCDF: String(Number(CHOCDF) * 1),
            note,
            time,
          });
        }
      } else {
        notify(false, response.data.message);
        setTimeout(() => {
          if (response.data.must === "login") {
            return navigation.navigate("SignIn");
          }
        });
      }
    };

    const handleAPIAll = async () => {
      const check = await checkPermission();
      if (check) {
        await Promise.all([Promise.resolve(getMucTieuHomNay())]);
        setLogin(true);
        isLoading(false);
      } else {
        setLogin(false);
        isLoading(false);
      }
    };
    handleAPIAll();
  }, [isFocused]);

  const updateMucTieuUser = async (muc_tieu) => {
    return await axios
      .post(`${MucTieuURL}`, muc_tieu, {
        withCredentials: true,
      })
      .then((response) => {
        return response.data;
      });
  };

  const handleUpdateMucTieu = async () => {
    if (
      mucTieuHomNay.ENERC === "" ||
      isNaN(Number(mucTieuHomNay.ENERC)) ||
      Number(mucTieuHomNay.ENERC) < 0
    ) {
      notify(false, "Năng lượng không hợp lệ.");
      return;
    } else if (
      mucTieuHomNay.PROCNT === "" ||
      isNaN(Number(mucTieuHomNay.PROCNT)) ||
      Number(mucTieuHomNay.PROCNT) < 0
    ) {
      notify(false, "Lượng chất đạm (Protein) không hợp lệ.");
      return;
    } else if (
      mucTieuHomNay.FAT === "" ||
      isNaN(Number(mucTieuHomNay.FAT)) ||
      Number(mucTieuHomNay.FAT) < 0
    ) {
      notify(false, "Lượng chất béo (FAT) không hợp lệ.");
      return;
    } else if (
      mucTieuHomNay.CHOCDF === "" ||
      isNaN(Number(mucTieuHomNay.CHOCDF)) ||
      Number(mucTieuHomNay.CHOCDF) < 0
    ) {
      notify(false, "Lượng Carbohydrate không hợp lệ.");
      return;
    } else {
      const muc_tieu = {
        ENERC: Number(mucTieuHomNay.ENERC),
        PROCNT: Number(mucTieuHomNay.PROCNT),
        FAT: Number(mucTieuHomNay.FAT),
        CHOCDF: Number(mucTieuHomNay.CHOCDF),
        note: mucTieuHomNay.note,
      };
      const response = await updateMucTieuUser(muc_tieu);
      notify(response.status, response.message);
      if (response.status) {
        const { muctieu_id, ENERC, PROCNT, FAT, CHOCDF, note, time } =
          response.data;
        setMucTieuHomNay({
          muctieu_id,
          ENERC: String(Number(ENERC) * 1),
          PROCNT: String(Number(PROCNT) * 1),
          FAT: String(Number(FAT) * 1),
          CHOCDF: String(Number(CHOCDF) * 1),
          note,
          time,
        });
      } else {
        setTimeout(() => {
          if (response.must === "login") {
            return navigation.navigate("SignIn");
          }
        }, 500);
      }
    }
  };
  const renderMucTieuHienTai = () => {
    return (
      <View
        style={{
          marginHorizontal: SIZES.padding,
          marginVertical: SIZES.base,
          paddingHorizontal: SIZES.radius,
        }}
      >
        <View>
          <Text
            style={{
              ...FONTS.body3,
              textAlign: "center",
            }}
          >
            Mục tiêu ngày {convertToDateOnly(dateNow)}
          </Text>
        </View>
        <View
          style={{
            marginTop: SIZES.radius,
          }}
        >
          <Text style={{ ...FONTS.body3, color: COLORS.blue }}>
            Năng lượng (KCal)
          </Text>
          <TextInput
            value={mucTieuHomNay.ENERC}
            maxLength={5}
            keyboardType="decimal-pad"
            onChangeText={(value) => {
              setMucTieuHomNay({ ...mucTieuHomNay, ENERC: value });
            }}
            style={{
              borderWidth: 1,
              height: 45,
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
            marginTop: SIZES.radius,
          }}
        >
          <Text style={{ ...FONTS.body3, color: COLORS.blue }}>
            Chất đạm (g)
          </Text>
          <TextInput
            value={mucTieuHomNay.PROCNT}
            maxLength={5}
            keyboardType="decimal-pad"
            onChangeText={(value) => {
              setMucTieuHomNay({ ...mucTieuHomNay, PROCNT: value });
            }}
            style={{
              borderWidth: 1,
              height: 45,
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
            marginTop: SIZES.radius,
          }}
        >
          <Text style={{ ...FONTS.body3, color: COLORS.blue }}>
            Chất béo (g)
          </Text>
          <TextInput
            onChangeText={(value) => {
              setMucTieuHomNay({ ...mucTieuHomNay, FAT: value });
            }}
            maxLength={5}
            keyboardType="decimal-pad"
            value={mucTieuHomNay.FAT}
            style={{
              borderWidth: 1,
              height: 45,
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
            marginTop: SIZES.radius,
          }}
        >
          <Text style={{ ...FONTS.body3, color: COLORS.blue }}>
            Carbohydrate (g)
          </Text>
          <TextInput
            onChangeText={(value) => {
              setMucTieuHomNay({ ...mucTieuHomNay, CHOCDF: value });
            }}
            maxLength={5}
            value={mucTieuHomNay.CHOCDF}
            keyboardType="decimal-pad"
            style={{
              borderWidth: 1,
              height: 45,
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
            marginTop: SIZES.radius,
          }}
        >
          <Text style={{ ...FONTS.body3, color: COLORS.blue }}>
            Ghi chú (Nếu có)
          </Text>
          <TextInput
            value={mucTieuHomNay.note}
            onChangeText={(value) => {
              setMucTieuHomNay({ ...mucTieuHomNay, note: value });
            }}
            maxLength={255}
            style={{
              borderWidth: 1,
              height: 45,
              ...FONTS.body3,
              borderColor: COLORS.lightGray1,
              paddingHorizontal: 10,
              borderRadius: SIZES.base,
              marginTop: SIZES.base,
            }}
          />
        </View>

        {/* Button */}
        <TouchableOpacity
          onPress={() => {
            handleUpdateMucTieu();
          }}
          style={{
            backgroundColor: COLORS.primary,
            marginTop: 20,
            paddingVertical: SIZES.radius,
            borderRadius: SIZES.radius,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              textAlign: "center",
              ...FONTS.h3,
            }}
          >
            {mucTieuHomNay.muctieu_id ? "Cập nhật mục tiêu" : "Tạo mục tiêu"}
          </Text>
        </TouchableOpacity>
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
          {HeaderBottomBar}

          <KeyboardAwareScrollView
            contentContainerStyle={{
              flexGrow: 1,
            }}
            showsVerticalScrollIndicator={false}
          >
            {/* Render mục tiêu hôm nay */}
            {renderMucTieuHienTai()}
          </KeyboardAwareScrollView>
        </View>
      ) : (
        <LoginViewMore navigation={navigation} />
      )}
    </>
  );
}
