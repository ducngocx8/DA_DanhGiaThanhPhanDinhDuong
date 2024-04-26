import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES, FONTS, icons } from "../../constants";
import { BuaAnURL } from "../../api";
import axios from "axios";
import { convertToDateOnly } from "../../utils/date";

export default function ModalCapNhatNgayAn({
  handleRemoveNgayAn,
  setShowModalCapNhatNgayAn,
  ngayAnChoose,
  updateNgayAn,
}) {
  const [ngayAnInput, setNgayAnInput] = useState({
    ngayan_id: ngayAnChoose.ngayan_id,
    time: ngayAnChoose.time,
    quanty: String(Number(ngayAnChoose.quanty) * 1),
    bua_an_id: ngayAnChoose.bua_an_id,
    id_monan: ngayAnChoose.id_monan,
  });
  const [buaAnList, setBuaAnList] = useState([]);
  const [errorString, setErrorString] = useState("");
  useEffect(() => {
    const getAllBuaAn = async () => {
      const response = await axios.get(`${BuaAnURL}`);
      setBuaAnList(response.data.data);
    };

    const handleAPIAll = async () => {
      await Promise.all([Promise.resolve(getAllBuaAn())]);
    };
    handleAPIAll();
  }, []);

  const renderBuaAn = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          flexDirection: "row",
          marginTop: SIZES.base,
        }}
      >
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {buaAnList.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor:
                    item.bua_an_id === ngayAnInput.bua_an_id
                      ? COLORS.primary
                      : COLORS.white,
                  padding: SIZES.radius,
                  borderRadius: SIZES.radius,
                  borderWidth: 1,
                  borderColor: COLORS.lightGray1,
                  marginRight: SIZES.radius,
                }}
                onPress={() => {
                  setNgayAnInput({
                    ...ngayAnInput,
                    bua_an_id: item.bua_an_id,
                  });
                }}
              >
                <Text
                  style={{
                    ...FONTS.body3,
                    color:
                      item.bua_an_id === ngayAnInput.bua_an_id
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
      </ScrollView>
    );
  };

  const handleUpdateNgayAn = async () => {
    if (isNaN(Number(ngayAnInput.quanty)) || Number(ngayAnInput.quanty) <= 0) {
      setErrorString("Số phần ăn không hợp lệ");
      return;
    }
    if (typeof ngayAnInput.bua_an_id !== "number") {
      setErrorString("Bữa ăn không hợp lệ");
      return;
    }
    const result = await updateNgayAn(ngayAnInput);
    if (!result.status) {
      setErrorString(result.message);
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={true}>
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
            <Text style={{ ...FONTS.h3 }}>Cập nhật món ăn</Text>
            <TouchableOpacity
              onPress={() => {
                setShowModalCapNhatNgayAn(false);
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
          <View
            style={{
              paddingTop: SIZES.base,
              marginTop: SIZES.radius,
            }}
          >
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    ...FONTS.body3,
                  }}
                >
                  Món ăn:
                </Text>
                <Text
                  style={{
                    ...FONTS.body3,
                  }}
                >
                  {" " + ngayAnChoose.MonAn.ten_mon}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: SIZES.base,
                }}
              >
                <Text
                  style={{
                    ...FONTS.body3,
                  }}
                >
                  Thời gian:
                </Text>
                <Text
                  style={{
                    ...FONTS.body3,
                  }}
                >
                  {" " + convertToDateOnly(ngayAnChoose.time)}
                </Text>
              </View>
              <View
                style={{
                  marginTop: SIZES.base,
                }}
              >
                <Text
                  style={{
                    ...FONTS.body3,
                  }}
                >
                  Chọn bữa ăn:
                </Text>
                {renderBuaAn()}
              </View>
              <View
                style={{
                  marginTop: SIZES.base,
                }}
              >
                <Text
                  style={{
                    ...FONTS.body3,
                  }}
                >
                  Số phần ăn:
                </Text>
                <TextInput
                  onChangeText={(value) => {
                    setNgayAnInput({
                      ...ngayAnInput,
                      quanty: value,
                    });
                  }}
                  maxLength={4}
                  value={ngayAnInput.quanty}
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
            </View>
            {errorString && (
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.red,
                  textAlign: "center",
                }}
              >
                {errorString}
              </Text>
            )}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              {/* Update */}
              <TouchableOpacity
                onPress={() => {
                  handleUpdateNgayAn();
                }}
                style={{
                  backgroundColor: COLORS.primary,
                  paddingVertical: SIZES.base,
                  borderRadius: SIZES.radius,
                  marginTop: SIZES.radius,
                  minWidth: 100,
                }}
              >
                <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.white,
                    textAlign: "center",
                  }}
                >
                  Cập nhật
                </Text>
              </TouchableOpacity>
              {/* Xóa */}
              <TouchableOpacity
                onPress={() => {
                  handleRemoveNgayAn();
                }}
                style={{
                  backgroundColor: COLORS.orange,
                  paddingVertical: SIZES.base,
                  borderRadius: SIZES.radius,
                  marginTop: SIZES.radius,
                  minWidth: 100,
                }}
              >
                <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.white,
                    textAlign: "center",
                  }}
                >
                  Xóa
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
