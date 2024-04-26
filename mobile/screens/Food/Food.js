import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";

import { FONTS, SIZES, COLORS, icons } from "../../constants";
import FilterModal from "./FilterModal";
import { MonAnOffsetURL, NhomMonAnURL } from "../../api";
import axios from "axios";
import VerticalFoodCard from "../../components/VerticalFoodCard";
import FoodSearchValue from "../../components/FoodSearchValue";

const Food = ({ HeaderBottomBar, navigation, route }) => {
  const bua_an_id = route?.params?.bua_an_id
    ? Number(route.params.bua_an_id)
    : false;

  let limit = 10;
  const [startOffset, setStartOffset] = useState(0);
  const [endList, setEndList] = useState(false);
  const [categorySelected, setCategorySelected] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [nhomMonAnList, setNhomMonAnList] = useState([]);
  const [monAnList, setMonAnList] = useState([]);
  const [rangeFilter, setRangeFilter] = useState({
    protein: [0, 300],
    fat: [0, 300],
    carb: [0, 300],
    energy: [0, 1500],
    sortType: "",
  });

  const handleLoadMore = async () => {
    if (!endList) {
      const newOffset = (startOffset + 1) * limit;
      const response = await axios.get(
        `${MonAnOffsetURL}?offset=${newOffset}&limit=${limit}&category_id=${categorySelected}&sort_type=${rangeFilter.sortType}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.data.length === 0) {
        setEndList(true);
      } else {
        setStartOffset(startOffset + 1);
        setMonAnList([...monAnList, ...response.data.data]);
      }
    }
  };

  const VerticalFoodCardMemo = useMemo(
    () => (
      <VerticalFoodCard
        monAnList={monAnList}
        navigation={navigation}
        handleLoadMore={handleLoadMore}
        endList={endList}
        bua_an_id={bua_an_id}
      />
    ),
    [monAnList, categorySelected, rangeFilter, endList]
  );

  const FoodSearchValueMemo = useMemo(
    () => (
      <FoodSearchValue
        monAnList={monAnList}
        navigation={navigation}
        rangeFilter={rangeFilter}
        searchInput={searchInput}
        bua_an_id={bua_an_id}
      />
    ),
    [monAnList, rangeFilter, searchInput]
  );

  const handleApplyFilter = (energy, protein, fat, carb, sortType) => {
    const newRange = { ...rangeFilter, energy, protein, fat, carb, sortType };
    setStartOffset(0);
    setEndList(false);
    setRangeFilter(newRange);
  };

  useEffect(() => {
    const getAllCategoryMonAn = async () => {
      const response = await axios.get(`${NhomMonAnURL}`);
      setNhomMonAnList(response.data.data);
    };

    const handleAPIAll = async () => {
      await Promise.all([Promise.resolve(getAllCategoryMonAn())]);
    };
    handleAPIAll();
  }, []);

  useEffect(() => {
    const getAllMonAn = async () => {
      const response = await axios.get(
        `${MonAnOffsetURL}?offset=${startOffset}&limit=${limit}&category_id=${categorySelected}&sort_type=${rangeFilter.sortType}`,
        {
          withCredentials: true,
        }
      );
      setMonAnList(response.data.data);
    };

    const handleAPIAll = async () => {
      await Promise.all([Promise.resolve(getAllMonAn())]);
    };
    handleAPIAll();
  }, [categorySelected, rangeFilter]);

  const renderSearch = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 44,
          alignItems: "center",
          marginHorizontal: SIZES.padding,
          marginVertical: SIZES.base,
          paddingHorizontal: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
          borderRadius: SIZES.base,
        }}
      >
        {/* Icon  */}
        <Image
          style={{
            width: 20,
            height: 20,
            tintColor: COLORS.black,
          }}
          source={icons.search}
        />
        {/* Search Input  */}
        <TextInput
          placeholder="Tìm kiếm món ăn..."
          style={{ marginLeft: SIZES.radius, flex: 1, ...FONTS.body3 }}
          value={searchInput}
          onChangeText={(value) => {
            setSearchInput(value);
          }}
        />
        {/* Filter Button  */}
        <TouchableOpacity
          style={{
            marginLeft: SIZES.radius,
          }}
          onPress={() => {
            setShowFilterModal(true);
          }}
        >
          <Image
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.black,
            }}
            source={icons.filter}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      {/* Render Header */}
      {HeaderBottomBar}
      {/* Render Search */}
      {renderSearch()}
      {/* Filter Modal */}
      {showFilterModal && (
        <FilterModal
          isVisible={showFilterModal}
          rangeFilter={rangeFilter}
          handleApplyFilter={handleApplyFilter}
          onClose={() => {
            setShowFilterModal(false);
          }}
        />
      )}
      {/* Handle Result Search */}
      {searchInput.trim() === "" ? (
        <View>
          {/*Categories */}
          <View
            style={{
              paddingHorizontal: SIZES.padding,
              marginTop: SIZES.radius,
            }}
          >
            <Text style={{ ...FONTS.h3 }}>Danh mục món ăn</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View
              style={{
                flexDirection: "row",
                paddingVertical: SIZES.radius,
                paddingHorizontal: SIZES.padding,
                alignItems: "center",
              }}
            >
              {nhomMonAnList.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor:
                        categorySelected === item.id_nhommonan
                          ? COLORS.primary
                          : COLORS.lightGray2,
                      marginRight:
                        index === nhomMonAnList.length - 1 ? 0 : SIZES.radius,
                      borderRadius: SIZES.radius,
                      paddingHorizontal: SIZES.radius,
                      height: 50,
                    }}
                    onPress={() => {
                      categorySelected === item.id_nhommonan
                        ? setCategorySelected(false)
                        : setCategorySelected(item.id_nhommonan);
                      setStartOffset(0);
                      setEndList(false);
                    }}
                  >
                    <Image
                      source={icons.trangmieng_category}
                      style={{ height: 30, width: 30 }}
                      resizeMode="center"
                    />
                    <Text
                      style={{
                        ...FONTS.h4,
                        marginLeft: 5,
                        color:
                          item.id_nhommonan === categorySelected
                            ? COLORS.white
                            : COLORS.gray,
                      }}
                    >
                      {item.ten_nhom}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

          {/* FlatList Menu List Món Ăn Vertical */}
          {VerticalFoodCardMemo}
        </View>
      ) : (
        FoodSearchValueMemo
      )}
    </View>
  );
};

export default Food;
