import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { memo, useState } from "react";
import { COLORS, SIZES, FONTS, icons } from "../../constants";

function ModalNhapSoLuongTP({
  status,
  setShowModalNhapSoLuongTP,
  thucPhamChoose,
  addToList,
  chi_tiet_mon,
  updateChiTietMon,
}) {
  const [chiTietMonInput, setChiTietMonInput] = useState({
    quanty:
      status === "TAOMON_ADD" || status === "SUAMON_ADD"
        ? ""
        : String(Number(chi_tiet_mon.quanty) * 1),
    ten_phannhom:
      status === "TAOMON_ADD" || status === "SUAMON_ADD"
        ? ""
        : chi_tiet_mon.ten_phannhom,
  });
  const [errorString, setErrorString] = useState("");

  const handleAdd = async () => {
    const chi_tiet_mon = {
      ten_phannhom: chiTietMonInput.ten_phannhom.trim(),
      quanty: Number(chiTietMonInput.quanty),
      id_thucpham: thucPhamChoose.id_thucpham,
      id_chitietmon: Date.now(),
      ThucPham: thucPhamChoose,
    };
    const result = await addToList(chi_tiet_mon);
    if (result.status) {
      setChiTietMonInput({ ...chiTietMonInput, quanty: "", ten_phannhom: "" });
      setShowModalNhapSoLuongTP(false);
      setErrorString("");
    } else {
      setErrorString(result.message);
    }
  };

  const handleAddThucPhamToMonAn = () => {
    if (
      isNaN(Number(chiTietMonInput.quanty)) ||
      Number(chiTietMonInput.quanty) <= 0
    ) {
      setErrorString("Khối lượng nhập vào không hợp lệ.");
      return;
    }

    if (typeof chiTietMonInput.ten_phannhom !== "string") {
      setErrorString("Kiểu dữ liệu phân nhóm món không hợp lệ.");
      return;
    }
    handleAdd();
  };

  const handleUpdate = async () => {
    const result = await updateChiTietMon(chiTietMonInput);
    if (result.status) {
      setChiTietMonInput({ ...chiTietMonInput, quanty: "", ten_phannhom: "" });
      setShowModalNhapSoLuongTP(false);
      setErrorString("");
    } else {
      setErrorString(result.message);
    }
  };

  const handleUpdateChiTietMon = async () => {
    if (
      Number(chiTietMonInput.quanty) <= 0 ||
      isNaN(Number(chiTietMonInput.quanty))
    ) {
      setErrorString("Khối lượng nhập vào không hợp lệ.");
      return;
    }
    if (typeof chiTietMonInput.ten_phannhom !== "string") {
      setErrorString("Kiểu dữ liệu phân nhóm món không hợp lệ.");
      return;
    }
    handleUpdate();
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
            <Text style={{ ...FONTS.h3 }}>
              {thucPhamChoose?.TenTiengViet ||
                thucPhamChoose?.TenTiengAnh ||
                chi_tiet_mon.ThucPham.TenTiengViet ||
                chi_tiet_mon.ThucPham.TenTiengAnh}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowModalNhapSoLuongTP(false);
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
              <Text
                style={{
                  ...FONTS.body3,
                }}
              >
                Phân nhóm món:
              </Text>
              <TextInput
                onChangeText={(value) => {
                  setChiTietMonInput({
                    ...chiTietMonInput,
                    ten_phannhom: value,
                  });
                }}
                maxLength={30}
                value={chiTietMonInput.ten_phannhom}
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
                marginTop: SIZES.base,
              }}
            >
              <Text
                style={{
                  ...FONTS.body3,
                }}
              >
                Số lượng:
              </Text>
              <TextInput
                onChangeText={(value) => {
                  setChiTietMonInput({
                    ...chiTietMonInput,
                    quanty: value,
                  });
                }}
                maxLength={30}
                value={chiTietMonInput.quanty}
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

            {errorString && (
              <View
                style={{
                  marginTop: SIZES.base,
                }}
              >
                <Text
                  style={{
                    color: COLORS.red,
                    ...FONTS.body4,
                    textAlign: "center",
                  }}
                >
                  {errorString}
                </Text>
              </View>
            )}
          </View>
          <TouchableOpacity
            onPress={() => {
              if (status === "TAOMON_ADD" || status === "SUAMON_ADD") {
                handleAddThucPhamToMonAn();
              } else if (status === "TAOMON_EDIT" || status === "SUAMON_EDIT") {
                handleUpdateChiTietMon();
              }
            }}
            style={{
              backgroundColor: COLORS.primary,
              paddingVertical: SIZES.base,
              borderRadius: SIZES.radius,
              marginTop: SIZES.radius,
            }}
          >
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.white,
                textAlign: "center",
              }}
            >
              {status === "TAOMON_ADD" || status === "SUAMON_ADD"
                ? "Thêm"
                : "Cập nhật"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default memo(ModalNhapSoLuongTP);
