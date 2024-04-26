import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import { COLORS, SIZES, FONTS } from "../constants";
import { BUILD_ANDROID } from "../utils/variable";

export default function CheckInternet({ connectStatus, setConnectStatus }) {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnectStatus(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const checkConnect = () => {
    NetInfo.fetch().then((state) => {
      setConnectStatus(state.isConnected);
    });
  };

  return (
    <>
      {connectStatus ? (
        ""
      ) : (
        <View
          style={{
            marginTop: BUILD_ANDROID ? 0 : 40,
            flex: 1,
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(52, 52, 52, 0.5)",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.white,
              borderRadius: SIZES.radius,
              paddingVertical: SIZES.radius,
              width: SIZES.width / 1.3,
              paddingHorizontal: SIZES.radius,
            }}
          >
            <Text
              style={{
                ...FONTS.h3,
                textAlign: "center",
                marginTop: SIZES.base,
              }}
            >
              Lỗi kết nối Internet
            </Text>
            <Text
              style={{
                ...FONTS.body4,
                textAlign: "center",
                color: COLORS.gray,
                marginTop: SIZES.radius,
              }}
            >
              Vui lòng kiểm tra kết nối Internet của bạn
            </Text>
            <TouchableOpacity
              onPress={() => {
                checkConnect();
              }}
              style={{
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primary,
                marginTop: SIZES.radius,
                paddingVertical: SIZES.base,
              }}
            >
              <Text
                style={{
                  ...FONTS.h3,
                  textAlign: "center",
                  color: COLORS.white,
                }}
              >
                Thử lại
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}
