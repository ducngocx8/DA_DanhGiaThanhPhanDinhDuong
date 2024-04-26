import { View, Text, Modal, TouchableOpacity, Image } from "react-native";
import React from "react";
import { COLORS, SIZES, FONTS, icons } from "../../constants";

export default function ModalRemoveChiTietMon({
  handleRemoveChiTietMon,
  setShowModalRemoveChiTietMon,
  chi_tiet_mon,
}) {
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
            <Text style={{ ...FONTS.h3 }}>Xác nhận xóa thực phẩm</Text>
            <TouchableOpacity
              onPress={() => {
                setShowModalRemoveChiTietMon(false);
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
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.red,
                textAlign: "center",
              }}
            >
              {chi_tiet_mon.ThucPham.TenTiengViet ||
                chi_tiet_mon.ThucPham.TenTiengAnh}
              {chi_tiet_mon.ten_phannhom
                ? " (" + chi_tiet_mon.ten_phannhom + ")"
                : ""}
            </Text>
            <TouchableOpacity
              onPress={() => {
                handleRemoveChiTietMon();
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
                Xác nhận
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
