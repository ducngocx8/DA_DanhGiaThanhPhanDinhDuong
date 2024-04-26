import { View, Text, Modal, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { COLORS, SIZES, FONTS, icons } from "../../constants";
import { convertToDateOnly } from "../../utils/date";

export default function ModalXoaNgayAn({
  setShowModalXoaNgayAn,
  ngayAnChoose,
  xoaNgayAn,
}) {
  const [errorString, setErrorString] = useState("");

  const handleXoaNgayAn = async () => {
    const result = await xoaNgayAn(ngayAnChoose);
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
            <Text style={{ ...FONTS.h3 }}>Xóa món ăn trong khẩu phần</Text>
            <TouchableOpacity
              onPress={() => {
                setShowModalXoaNgayAn(false);
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
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    ...FONTS.body3,
                  }}
                >
                  Bữa ăn:
                </Text>

                <Text
                  style={{
                    ...FONTS.body3,
                  }}
                >
                  {" " + ngayAnChoose.BuaAn.ten_bua_an}
                </Text>
              </View>
              <View
                style={{
                  marginTop: SIZES.base,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    ...FONTS.body3,
                  }}
                >
                  Số phần ăn:
                </Text>
                <Text
                  style={{
                    ...FONTS.body3,
                  }}
                >
                  {" " + Number(ngayAnChoose.quanty) * 1}
                </Text>
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
              {/* Xóa */}
              <TouchableOpacity
                onPress={() => {
                  handleXoaNgayAn();
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
