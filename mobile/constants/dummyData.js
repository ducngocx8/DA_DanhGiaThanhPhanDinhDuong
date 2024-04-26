const myProfile = {
  name: "Người dùng",
  profile_image: require("../assets/images/profile.png"),
  address: "No. 88, Jln Padungan, Kuching",
};

const categories = [
  {
    id: 1,
    name: "Cơm, thức ăn",
    icon: require("../assets/icons/burger.png"),
  },
  {
    id: 2,
    name: "Món nước, món khô, bánh mì",
    icon: require("../assets/icons/cherry.png"),
  },
  {
    id: 3,
    name: "Xôi, Chè, Bánh",
    icon: require("../assets/icons/rice.png"),
  },
];

const hamburger = {
  id: 1,
  name: "Hamburger",
  description: "Chicken patty hamburger",
  categories: [1, 2],
  price: 15.99,
  calories: 78,
  isFavourite: true,
  image: require("../assets/dummyData/hamburger.png"),
};

const hotTacos = {
  id: 2,
  name: "Hot Tacos",
  description: "Mexican tortilla & tacos",
  categories: [1, 3],
  price: 10.99,
  calories: 78,
  isFavourite: false,
  image: require("../assets/dummyData/hot_tacos.png"),
};

const vegBiryani = {
  id: 3,
  name: "Veg Biryani",
  description: "Indian Vegetable Biryani",
  categories: [1, 2, 3],
  price: 10.99,
  calories: 78,
  isFavourite: true,
  image: require("../assets/dummyData/veg_biryani.png"),
};

const wrapSandwich = {
  id: 4,
  name: "Wrap Sandwich",
  description: "Grilled vegetables sandwich",
  categories: [1, 2],
  price: 10.99,
  calories: 78,
  isFavourite: true,
  image: require("../assets/dummyData/wrap_sandwich.png"),
};

const foodList = [
  {
    id: 1,
    name: "Cơm tấm chả",
    description: "Chicken patty hamburger",
    categories: [1, 2],
    price: 15.99,
    calories: 35,
    isFavourite: true,
    image: require("../assets/dummyData/hamburger.png"),
  },

  {
    id: 2,
    name: "Cơm tấm sườn",
    description: "Mexican tortilla & tacos",
    categories: [1, 3],
    price: 10.99,
    calories: 78,
    isFavourite: false,
    image: require("../assets/dummyData/hot_tacos.png"),
  },
  {
    id: 3,
    name: "Bánh canh cua",
    description:
      "A popular spice and vegetables mixed favoured rice dish which is typically prepared by layering the biryani gravy and basmati rice in flat bottom vessel.",
    categories: [1, 2, 3],
    price: 10.99,
    calories: 78,
    isFavourite: true,
    image: require("../assets/dummyData/veg_biryani.png"),
  },

  {
    id: 4,
    name: "Bánh Canh Giò Heo",
    description: "Grilled vegetables sandwich",
    categories: [1, 2],
    price: 10.99,
    calories: 64,
    isFavourite: true,
    image: require("../assets/dummyData/wrap_sandwich.png"),
  },

  {
    id: 5,
    name: "Hot Tacos",
    description: "Mexican tortilla & tacos",
    categories: [1, 3],
    price: 10.99,
    calories: 14,
    isFavourite: false,
    image: require("../assets/dummyData/hot_tacos.png"),
  },

  {
    id: 6,
    name: "Veg Biryani",
    description: "Indian Vegetable Biryani",
    categories: [1, 2, 3],
    price: 10.99,
    calories: 78,
    isFavourite: true,
    image: require("../assets/dummyData/veg_biryani.png"),
  },

  {
    id: 7,
    name: "Wrap Sandwich",
    description: "Grilled vegetables sandwich",
    categories: [1, 2],
    price: 10.99,
    calories: 34,
    isFavourite: true,
    image: require("../assets/dummyData/wrap_sandwich.png"),
  },
  {
    id: 8,
    name: "Hamburger",
    description: "Chicken patty hamburger",
    categories: [1, 2],
    price: 15.99,
    calories: 35,
    isFavourite: true,
    image: require("../assets/dummyData/hamburger.png"),
  },

  {
    id: 9,
    name: "Hot Tacos",
    description: "Mexican tortilla & tacos",
    categories: [1, 3],
    price: 10.99,
    calories: 78,
    isFavourite: false,
    image: require("../assets/dummyData/hot_tacos.png"),
  },
  {
    id: 10,
    name: "Veg Biryani",
    description:
      "A popular spice and vegetables mixed favoured rice dish which is typically prepared by layering the biryani gravy and basmati rice in flat bottom vessel.",
    categories: [1, 2, 3],
    price: 10.99,
    calories: 78,
    isFavourite: true,
    image: require("../assets/dummyData/veg_biryani.png"),
  },

  {
    id: 11,
    name: "Wrap Sandwich",
    description: "Grilled vegetables sandwich",
    categories: [1, 2],
    price: 10.99,
    calories: 64,
    isFavourite: true,
    image: require("../assets/dummyData/wrap_sandwich.png"),
  },

  {
    id: 12,
    name: "Hot Tacos",
    description: "Mexican tortilla & tacos",
    categories: [1, 3],
    price: 10.99,
    calories: 14,
    isFavourite: false,
    image: require("../assets/dummyData/hot_tacos.png"),
  },

  {
    id: 13,
    name: "Veg Biryani",
    description: "Indian Vegetable Biryani",
    categories: [1, 2, 3],
    price: 10.99,
    calories: 78,
    isFavourite: true,
    image: require("../assets/dummyData/veg_biryani.png"),
  },

  {
    id: 14,
    name: "Wrap Sandwich",
    description: "Grilled vegetables sandwich",
    categories: [1, 2],
    price: 10.99,
    calories: 34,
    isFavourite: true,
    image: require("../assets/dummyData/wrap_sandwich.png"),
  },
];

const menu = [
  {
    id: 1,
    name: "Featured",
    list: [hamburger, hotTacos, vegBiryani],
  },
  {
    id: 2,
    name: "Nearby you",
    list: [hamburger, vegBiryani, wrapSandwich],
  },
  {
    id: 3,
    name: "Popular",
    list: [hamburger, hotTacos, wrapSandwich],
  },
  {
    id: 4,
    name: "Newest",
    list: [hamburger, hotTacos, vegBiryani],
  },
  {
    id: 5,
    name: "Trending",
    list: [hamburger, vegBiryani, wrapSandwich],
  },
  {
    id: 6,
    name: "Recommended",
    list: [hamburger, hotTacos, wrapSandwich],
  },
];

export default {
  myProfile,
  categories,
  menu,
  foodList,
};
