import { BaseToast, ErrorToast } from "react-native-toast-message";
import { COLORS, FONTS } from "../constants";
export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: COLORS.primary,
        position: "absolute",
      }}
      contentContainerStyle={{
        paddingHorizontal: 8,
      }}
      text1Style={{
        ...FONTS.h3,
      }}
      text2Style={{
        ...FONTS.body5,
        fontSize: 14,
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: COLORS.red,
        position: "absolute",
      }}
      contentContainerStyle={{
        paddingHorizontal: 8,
      }}
      text1Style={{
        ...FONTS.h3,
      }}
      text2Style={{
        ...FONTS.body5,
        fontSize: 14,
      }}
    />
  ),
};
