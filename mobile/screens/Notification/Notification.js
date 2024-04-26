import { useState, useEffect, useRef } from "react";
import { Text, View, Platform, Switch } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { TouchableOpacity } from "react-native";
import { COLORS, SIZES, FONTS } from "../../constants";
import HeaderDrawerChild from "../../components/HeaderDrawerChild";
import { BUILD_ANDROID, notify } from "../../utils/variable";
import axios from "axios";
import { ThongBaoURL } from "../../api";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Notification({ navigation }) {
  const [loading, isLoading] = useState(true);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [notiSang, setNotiSang] = useState(false);
  const [repeat, setRepeat] = useState(true);
  const [showModalChonTimeSang, setShowModalChonTimeSang] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  let [timeSangSelected, setTimeSangSelected] = useState(() => {
    const date = new Date();
    return {
      hour: date.getHours(),
      minute: date.getMinutes(),
    };
  });

  console.log("expoPushToken", expoPushToken);

  const onChangeTime = (event, selectedDate) => {
    if (selectedDate) {
      setShowModalChonTimeSang(false);
      setTimeSangSelected({
        hour: selectedDate.getHours(),
        minute: selectedDate.getMinutes(),
      });
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    const getThongBaoHienTai = async () => {
      const response = await axios.get(`${ThongBaoURL}`);
      if (response.data.status) {
        if (response.data.data) {
          const { status } = response.data.data;
          setNotiSang(status);
        }
      }
    };

    const handleAPIAll = async () => {
      const list = await Notifications.getAllScheduledNotificationsAsync();
      console.log("list", list);
      if (list.length !== 0) {
        if (list[0].trigger.type === "daily") {
          setRepeat(true);
        } else {
          setRepeat(false);
        }
        setTimeSangSelected({
          hour: list[0].trigger.hour,
          minute: list[0].trigger.minute,
        });
      }
      await Promise.all([Promise.resolve(getThongBaoHienTai())]);
      isLoading(false);
    };
    handleAPIAll();

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <>
      {!loading ? (
        <View
          style={{
            flex: 1,
            paddingTop: BUILD_ANDROID ? 8 : SIZES.padding * 2,
            backgroundColor: COLORS.primary,
          }}
        >
          <View
            style={{
              paddingHorizontal: SIZES.padding,
            }}
          >
            <HeaderDrawerChild
              navigation={navigation}
              title={"Thông báo"}
              disableRight={true}
            />
          </View>

          {showModalChonTimeSang && (
            <DateTimePicker
              value={new Date()}
              is24Hour={true}
              mode="time"
              onChange={onChangeTime}
            />
          )}

          <View
            style={{
              backgroundColor: COLORS.white,
              paddingHorizontal: SIZES.padding,
              paddingVertical: SIZES.padding,
              flex: 1,
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
                  color: COLORS.primary,
                }}
              >
                Cho phép thông báo
              </Text>

              <View
                style={{
                  borderRadius: 10,
                  borderWidth: 1,
                  height: 25,
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: COLORS.gray,
                  width: 46,
                  marginRight: 5,
                }}
              >
                <Switch
                  value={notiSang}
                  trackColor={{
                    false: COLORS.transparent,
                    true: COLORS.transparent,
                  }}
                  thumbColor={notiSang ? COLORS.primary : COLORS.gray}
                  onValueChange={() => {
                    setNotiSang(!notiSang);
                  }}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.primary,
                }}
              >
                Lặp lại
              </Text>

              <View
                style={{
                  borderRadius: 10,
                  borderWidth: 1,
                  height: 25,
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: COLORS.gray,
                  width: 46,
                  marginRight: 5,
                }}
              >
                <Switch
                  value={repeat}
                  trackColor={{
                    false: COLORS.transparent,
                    true: COLORS.transparent,
                  }}
                  thumbColor={repeat ? COLORS.primary : COLORS.gray}
                  onValueChange={() => {
                    setRepeat(!repeat);
                  }}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.primary,
                }}
              >
                Thời gian
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setShowModalChonTimeSang(true);
                }}
                style={{
                  backgroundColor: COLORS.primary,
                  paddingHorizontal: 5,
                  paddingVertical: 3,
                  borderRadius: 5,
                  marginLeft: 5,
                }}
              >
                <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.white,
                  }}
                >
                  {timeSangSelected.hour +
                    " giờ " +
                    timeSangSelected.minute +
                    " phút"}
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.primary,
                  alignItems: "center",
                  paddingVertical: SIZES.radius,
                  borderRadius: SIZES.radius,
                  marginTop: SIZES.radius,
                }}
                onPress={async () => {
                  await schedulePushNotification(
                    timeSangSelected,
                    notiSang,
                    repeat,
                    expoPushToken.data
                  );
                }}
              >
                <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Lưu</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* <Text>Your expo push token: {expoPushToken.data}</Text>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>Title: {notification && notification.request.content.title}</Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>
          Data:
          {notification && JSON.stringify(notification.request.content.data)}
        </Text>
      </View>
      <Button
        title="Press to schedule"
        onPress={async () => {
          console.log("12333");
          await schedulePushNotification();
        }}
      /> */}
        </View>
      ) : (
        ""
      )}
    </>
  );
}

async function schedulePushNotification(
  timeSangSelected,
  notiSang,
  repeat,
  expo_key
) {
  await Notifications.cancelAllScheduledNotificationsAsync();
  if (notiSang) {
    const identifier = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Thông báo! ",
        body: "Mở ứng dụng để cập nhật khẩu phần ăn của bạn ngày hôm nay.",
        data: { data: "Xem ngay" },
      },
      trigger: {
        hour: timeSangSelected.hour,
        minute: timeSangSelected.minute,
        repeats: true,
      },
    });
    console.log("identifier", identifier);
  }
  const list = await Notifications.getAllScheduledNotificationsAsync();
  console.log("list", list);
  console.log("repeat", repeat);

  const thong_bao = {
    status: notiSang,
    expo_key: expo_key,
  };
  const response = await axios.post(`${ThongBaoURL}`, thong_bao, {
    withCredentials: true,
  });
  console.log(response.data.message);
  notify(true, "Cài đặt thông báo thành công!");
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Không nhận được mã thông báo cho thông báo đẩy!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log("token", token);
  } else {
    alert("Phải sử dụng thiết bị di động cho thông báo đẩy");
  }
  return token;
}
