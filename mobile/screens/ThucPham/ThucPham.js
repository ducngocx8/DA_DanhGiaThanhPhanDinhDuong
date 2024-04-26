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
import { NhomThucPhamURL, ThucPhamOffsetURL } from "../../api";
import axios from "axios";
import VerticalThucPhamCard from "../../components/VerticalThucPhamCard";
import ThucPhamSearchValue from "../../components/ThucPhamSearchValue";
import FilterModal from "../Food/FilterModal";

const ThucPham = ({ HeaderBottomBar, navigation }) => {
  let limit = 10;
  const [loading, isLoading] = useState(true);
  const [startOffset, setStartOffset] = useState(0);
  const [endList, setEndList] = useState(false);
  const [categorySelected, setCategorySelected] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [nhomThucPhamList, setNhomThucPhamList] = useState([]);
  const [thucPhamList, setThucPhamList] = useState([]);
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
        `${ThucPhamOffsetURL}?offset=${newOffset}&limit=${limit}&category_id=${categorySelected}&sort_type=${rangeFilter.sortType}`
      );
      if (response.data.data.length === 0) {
        setEndList(true);
      } else {
        setStartOffset(startOffset + 1);
        setThucPhamList([...thucPhamList, ...response.data.data]);
      }
    }
  };

  const VerticalThucPhamCardMemo = useMemo(
    () => (
      <VerticalThucPhamCard
        thucPhamList={thucPhamList}
        navigation={navigation}
        handleLoadMore={handleLoadMore}
        endList={endList}
      />
    ),
    [thucPhamList, categorySelected, rangeFilter, endList]
  );

  const ThucPhamSearchValueMemo = useMemo(
    () => (
      <ThucPhamSearchValue
        thucPhamList={thucPhamList}
        navigation={navigation}
        rangeFilter={rangeFilter}
        searchInput={searchInput}
      />
    ),
    [thucPhamList, rangeFilter, searchInput]
  );

  const handleApplyFilter = (energy, protein, fat, carb, sortType) => {
    const newRange = { ...rangeFilter, energy, protein, fat, carb, sortType };
    setStartOffset(0);
    setEndList(false);
    setRangeFilter(newRange);
  };

  useEffect(() => {
    const getAllCategoryThucPham = async () => {
      const response = await axios.get(`${NhomThucPhamURL}`);
      setNhomThucPhamList(response.data.data);
    };

    const handleAPIAll = async () => {
      await Promise.all([Promise.resolve(getAllCategoryThucPham())]);
    };
    handleAPIAll();
  }, []);

  useEffect(() => {
    const getAllThucPham = async () => {
      const response = await axios.get(
        `${ThucPhamOffsetURL}?offset=${startOffset}&limit=${limit}&category_id=${categorySelected}&sort_type=${rangeFilter.sortType}`
      );
      if (response.data?.data?.length === 0) {
        setEndList(true);
      }
      setThucPhamList(response.data.data);
    };

    const handleAPIAll = async () => {
      await Promise.all([Promise.resolve(getAllThucPham())]);
      isLoading(false);
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
          placeholder="Tìm kiếm thực phẩm..."
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
    <>
      {loading ? (
        ""
      ) : (
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
                <Text style={{ ...FONTS.h3 }}>Nhóm thực phẩm</Text>
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
                  {nhomThucPhamList.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor:
                            categorySelected === item.id_nhomthucpham
                              ? COLORS.primary
                              : COLORS.lightGray2,
                          marginRight:
                            index === nhomThucPhamList.length - 1
                              ? 0
                              : SIZES.radius,
                          borderRadius: SIZES.radius,
                          paddingHorizontal: SIZES.radius,
                          height: 50,
                        }}
                        onPress={() => {
                          categorySelected === item.id_nhomthucpham
                            ? setCategorySelected(false)
                            : setCategorySelected(item.id_nhomthucpham);
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
                              item.id_nhomthucpham === categorySelected
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

              {/* FlatList Menu List Thực Pẩm Vertical */}
              {VerticalThucPhamCardMemo}
            </View>
          ) : (
            ThucPhamSearchValueMemo
          )}
        </View>
      )}
    </>
  );
};

export default ThucPham;
