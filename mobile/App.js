import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./stores/rootReducer";
import { useCallback, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  Food,
  ForgotPassword,
  Home,
  Otp,
  Plan,
  SignIn,
  SignUp,
} from "./screens";
import CustomDrawer from "./navigation/CustomDrawer";
import OnBoarding from "./screens/OnBoarding/OnBoarding";
import Result from "./screens/Result/Result";
import { COLORS, images } from "./constants";
import TestScreen from "./screens/TestScreen/TestScreen";
import FoodDetail from "./screens/Food/FoodDetail";
import NhomThucPham from "./screens/ThucPham/NhomThucPham";
import TimKiemThucPham from "./screens/ThucPham/TimKiemThucPham";
import ChiTietThucPham from "./screens/ThucPham/ChiTietThucPham";
import ThucPhamThuocNhom from "./screens/ThucPham/ThucPhamThuocNhom";
import TongThanhPhanTP from "./screens/ThucPham/TongThanhPhanTP";
import CapNhatSLThucPham from "./screens/ThucPham/CapNhatSLThucPham";
import UserInfo from "./screens/User/UserInfo";
import ChangeUserInfo from "./screens/User/ChangeUserInfo";
import ChangePassword from "./screens/User/ChangePassword";
import ChangeIndex from "./screens/User/ChangeIndex";
import IndexUser from "./screens/User/IndexUser";
import QuanLyMucTieu from "./screens/Plan/QuanLyMucTieu";
import DuongChatThucPham from "./screens/DuongChat/DuongChatThucPham";
import DuongChatMonAn from "./screens/DuongChat/DuongChatMonAn";
import ChiSoDuongHuyet from "./screens/DuongChat/ChiSoDuongHuyet";
import NhuCauDinhDuong from "./screens/DuongChat/NhuCauDinhDuong";
import QuanLyMonAn from "./screens/Food/QuanLyMonAn";
import TaoMonAn from "./screens/Food/TaoMonAn";
import UpdateMonAn from "./screens/Food/UpdateMonAn";
import FavouriteFood from "./screens/Food/FavouriteFood";
import ThucPham from "./screens/ThucPham/ThucPham";
import LoginViewMore from "./components/LoginViewMore";
import LoginViewMoreNonTab from "./components/LoginViewMoreNonTab";
import Toast from "react-native-toast-message";
import { toastConfig } from "./configs/toast.config";
import CreatePassword from "./screens/Authentication/CreatePassword";
import CheckInternet from "./components/CheckInternet";
import Notification from "./screens/Notification/Notification";
import { StatusBar } from "react-native";
import GoiYThucDon from "./screens/Food/GoiYThucDon";
const store = createStore(rootReducer, applyMiddleware(thunk));
const Stack = createStackNavigator();
export default function App() {
  const [connectStatus, setConnectStatus] = useState(true);
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("./assets/fonts/VAGRounded-Bold.otf"),
    "Poppins-SemiBold": require("./assets/fonts/VAGRounded-DemiBold.otf"),
    "Poppins-Regular": require("./assets/fonts/VAGRounded-Regular.otf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "rgb(3,91,150)" }}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

        <NavigationContainer onLayout={onLayoutRootView}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName={"CustomDrawer"}
            // initialRouteName={"Notification"}
          >
            <Stack.Screen name="CustomDrawer" component={CustomDrawer} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Otp" component={Otp} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="CreatePassword" component={CreatePassword} />
            <Stack.Screen name="OnBoarding" component={OnBoarding} />
            <Stack.Screen name="Notification" component={Notification} />
            <Stack.Screen
              name="Result"
              component={Result}
              initialParams={{
                icon: images.success,
                resultText: "Thành công",
                resultMessage:
                  "Tạo tài khoản thành công, vui lòng kiểm tra email để xác thực tài khoản!",
                resultButtonText: "Done",
                screenName: "SignIn",
              }}
            />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="TestScreen" component={TestScreen} />
            <Stack.Screen name="FoodDetail" component={FoodDetail} />
            <Stack.Screen name="ThucPham" component={ThucPham} />
            <Stack.Screen name="Plan" component={Plan} />
            <Stack.Screen name="Food" component={Food} />
            <Stack.Screen name="QuanLyMucTieu" component={QuanLyMucTieu} />
            <Stack.Screen name="NhomThucPham" component={NhomThucPham} />
            <Stack.Screen name="TimKiemThucPham" component={TimKiemThucPham} />
            <Stack.Screen name="ChiTietThucPham" component={ChiTietThucPham} />
            <Stack.Screen name="TongThanhPhanTP" component={TongThanhPhanTP} />
            <Stack.Screen name="LoginViewMore" component={LoginViewMore} />
            <Stack.Screen
              name="LoginViewMoreNonTab"
              component={LoginViewMoreNonTab}
            />
            <Stack.Screen
              name="DuongChatThucPham"
              component={DuongChatThucPham}
            />
            <Stack.Screen name="DuongChatMonAn" component={DuongChatMonAn} />
            <Stack.Screen name="ChiSoDuongHuyet" component={ChiSoDuongHuyet} />
            <Stack.Screen name="NhuCauDinhDuong" component={NhuCauDinhDuong} />
            <Stack.Screen name="GoiYThucDon" component={GoiYThucDon} />
            <Stack.Screen name="QuanLyMonAn" component={QuanLyMonAn} />
            <Stack.Screen name="TaoMonAn" component={TaoMonAn} />
            <Stack.Screen name="UpdateMonAn" component={UpdateMonAn} />
            <Stack.Screen name="FavouriteFood" component={FavouriteFood} />
            <Stack.Screen
              name="CapNhatSLThucPham"
              component={CapNhatSLThucPham}
            />
            <Stack.Screen
              name="ThucPhamThuocNhom"
              component={ThucPhamThuocNhom}
            />
            <Stack.Screen name="UserInfo" component={UserInfo} />
            <Stack.Screen name="ChangeUserInfo" component={ChangeUserInfo} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="IndexUser" component={IndexUser} />
            <Stack.Screen name="ChangeIndex" component={ChangeIndex} />
            {/* Demo */}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
      <CheckInternet
        connectStatus={connectStatus}
        setConnectStatus={setConnectStatus}
      />
      <Toast config={toastConfig} />
    </Provider>
  );
}
