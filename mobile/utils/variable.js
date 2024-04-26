const ROLE_CUSTOMER = "ROLE_CUSTOMER";
const ROLE_ADMIN = "ROLE_ADMIN";
const BUILD_ANDROID = true;
import Toast from "react-native-toast-message";

const notify = (status, message) => {
  Toast.show({
    type: status ? "success" : "error",
    text1: status ? "Thành công" : "Thất bại",
    text2: message,
    position: "top",
    topOffset: BUILD_ANDROID ? 50 : 100,
    autoHide: true,
    visibilityTime: 4000,
  });
};

const notifyModal = (status, message) => {
  Toast.show({
    type: status ? "success" : "error",
    text1: status ? "Thành công" : "Thất bại",
    text2: message,
    position: "top",
    visibilityTime: 4000,
    topOffset: 50,
  });
};

const imageMonAnRandom = [
  require("../assets/dummyData/hamburger.png"),
  require("../assets/dummyData/hot_tacos.png"),
  require("../assets/dummyData/veg_biryani.png"),
  require("../assets/dummyData/wrap_sandwich.png"),
  require("../assets/dummyData/hot_tacos.png"),
  require("../assets/dummyData/veg_biryani.png"),
  require("../assets/dummyData/wrap_sandwich.png"),
  require("../assets/dummyData/hamburger.png"),
  require("../assets/dummyData/hot_tacos.png"),
  require("../assets/dummyData/veg_biryani.png"),
  require("../assets/dummyData/wrap_sandwich.png"),
  require("../assets/dummyData/hot_tacos.png"),
  require("../assets/dummyData/veg_biryani.png"),
  require("../assets/dummyData/wrap_sandwich.png"),
];

export {
  ROLE_CUSTOMER,
  ROLE_ADMIN,
  notify,
  notifyModal,
  imageMonAnRandom,
  BUILD_ANDROID,
};
