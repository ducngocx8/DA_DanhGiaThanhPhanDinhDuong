const screens = {
  home: {
    code: "Home",
    title: "Trang chủ",
  },
  progess: {
    code: "Progress",
    title: "Thống kê",
  },
  nutrition: {
    code: "Nutrition",
    title: "Thực phẩm",
  },
  food: {
    code: "Food",
    title: "Món ăn",
  },
  plan: {
    code: "Plan",
    title: "Mục tiêu",
  },
};

const bottom_tabs = [
  {
    id: 0,
    label: screens.home,
  },
  {
    id: 1,
    label: screens.search,
  },
  {
    id: 2,
    label: screens.cart,
  },
  {
    id: 3,
    label: screens.favourite,
  },
  {
    id: 4,
    label: screens.notification,
  },
];

const delivery_time = [
  {
    id: 1,
    label: "10 Mins",
  },
  {
    id: 2,
    label: "20 Mins",
  },
  {
    id: 3,
    label: "30 Mins",
  },
];

const onboarding_screens = [
  {
    id: 1,
    backgroundImage: require("../assets/images/background_01.png"),
    bannerImage: require("../assets/images/favourite_food.png"),
    title: "Choose a Favourite Food",
    description:
      "When you oder Eat Steet, we’ll hook you up with exclusive coupon, specials and rewards",
  },
  {
    id: 2,
    backgroundImage: require("../assets/images/background_02.png"),
    bannerImage: require("../assets/images/hot_delivery.png"),
    title: "Hot Delivery to Home",
    description:
      "We make food ordering fasr, simple and free-no matter if you order online or cash",
  },
  {
    id: 3,
    backgroundImage: require("../assets/images/background_01.png"),
    bannerImage: require("../assets/images/great_food.png"),
    title: "Receive the Great Food",
    description:
      "You’ll receive the great food within a hour. And get free delivery credits for every order.",
  },
];

export default {
  screens,
  bottom_tabs,
  delivery_time,
  onboarding_screens,
};
