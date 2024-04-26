import { View, Text } from "react-native";
import React from "react";
import { COLORS } from "../constants";
import { toastConfig } from "../configs/toast.config";
import Toast from "react-native-toast-message";

export default function ToastComponent({ distance }) {
  return (
    // <View
    //   style={{
    //     zIndex: 1000,
    //     position: "absolute",
    //     bottom: distance,
    //     backgroundColor: COLORS.blue,
    //     width: "100%",
    //   }}
    // >
      <Toast config={toastConfig} />
    // </View>
  );
}
