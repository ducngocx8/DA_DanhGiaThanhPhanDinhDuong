import {
  View,
  Text,
  Modal,
  TouchableNativeFeedback,
  Animated,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, memo, useRef } from "react";
import { COLORS, SIZES, constants, icons, FONTS } from "../../constants";
import { TwoPointSlider } from "../../components";

const FilterModal = ({
  isVisible,
  onClose,
  rangeFilter,
  handleApplyFilter,
}) => {
  const [sortTypeSelected, setSortTypeSelected] = useState(
    rangeFilter.sortType
  );
  const [ratingStar, setRatingStar] = useState(5);
  const [tagSelected, setTagSelected] = useState([]);
  const energyRange = useRef(rangeFilter.energy);
  const proteinRange = useRef(rangeFilter.protein);
  const fatRange = useRef(rangeFilter.fat);
  const carbRange = useRef(rangeFilter.carb);

  const sortList = [
    {
      sortType: "",
      title: "Sắp xếp theo mặc định",
    },
    {
      sortType: "AZ",
      title: "Sắp xếp theo tên A-Z",
    },
    {
      sortType: "ZA",
      title: "Sắp xếp theo tên Z-A",
    },
    {
      sortType: "NUM09",
      title: "Sắp xếp theo tăng dần Energy",
    },
    {
      sortType: "NUM90",
      title: "Sắp xếp theo giảm dần Energy",
    },
  ];

  const handleSetTag = (tag_id) => {
    const result = tagSelected.includes(Number(tag_id));
    if (result) {
      const newTagList = tagSelected.filter((item) => item !== tag_id);
      setTagSelected(newTagList);
    } else {
      tagSelected.push(tag_id);
      setTagSelected([...tagSelected]);
    }
  };

  const handleSubmit = () => {
    console.log("SUBMIT");
    handleApplyFilter(
      energyRange.current,
      proteinRange.current,
      fatRange.current,
      carbRange.current,
      sortTypeSelected
    );
    onClose();
  };

  const Section = ({ containerStyle, title, children }) => {
    return (
      <View style={{ marginTop: SIZES.padding, ...containerStyle }}>
        <Text style={{ ...FONTS.h4 }}>{title}</Text>
        {children}
      </View>
    );
  };

  const renderCalo = () => {
    return (
      <Section title={"Lọc theo Energy"}>
        <View style={{ alignItems: "center" }}>
          <TwoPointSlider
            values={energyRange.current}
            min={0}
            max={1500}
            postfix={""}
            onChangeValue={(values) => {
              energyRange.current = values;
            }}
          />
        </View>
      </Section>
    );
  };

  const renderSortList = () => {
    return (
      <Section title={"Thứ tự sắp xếp"} containerStyle={{ marginTop: 40 }}>
        <View
          style={{
            alignItems: "center",
            flexWrap: "wrap",
            flexDirection: "row",
          }}
        >
          {sortList.map((sort, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  padding: SIZES.radius,
                  backgroundColor:
                    sort.sortType === sortTypeSelected
                      ? COLORS.primary
                      : COLORS.lightGray2,
                  marginRight: SIZES.radius,
                  marginTop: SIZES.radius,
                  borderRadius: SIZES.base,
                  alignItems: "center",
                  justifyContent: "center",
                  height: 50,
                }}
                onPress={() => handleChangesortTypeSelected(sort.sortType)}
              >
                <Text
                  style={{
                    color:
                      sort.sortType === sortTypeSelected
                        ? COLORS.white
                        : COLORS.gray,
                    ...FONTS.body3,
                  }}
                >
                  {sort.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Section>
    );
  };

  const renderTag = () => {
    return (
      <Section title={"Tags"} containerStyle={{ marginTop: 30 }}>
        <View
          style={{
            alignItems: "center",
            flexWrap: "wrap",
            flexDirection: "row",
          }}
        >
          {constants.tags.map((tag, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  padding: SIZES.radius,
                  backgroundColor: tagSelected.includes(tag.id)
                    ? COLORS.primary
                    : COLORS.lightGray2,
                  marginRight: SIZES.radius,
                  marginTop: SIZES.radius,
                  borderRadius: SIZES.base,
                  alignItems: "center",
                  justifyContent: "center",
                  height: 50,
                }}
                onPress={() => handleSetTag(tag.id)}
              >
                <Text
                  style={{
                    color: tagSelected.includes(tag.id)
                      ? COLORS.white
                      : COLORS.gray,
                    ...FONTS.body3,
                  }}
                >
                  {tag.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Section>
    );
  };

  const renderRating = () => {
    return (
      <Section title={"Ratings"} containerStyle={{ marginTop: 40 }}>
        <View
          style={{
            alignItems: "center",
            flexWrap: "wrap",
            flexDirection: "row",
          }}
        >
          {constants.ratings.map((rating, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  padding: SIZES.radius,
                  backgroundColor:
                    rating.id === ratingStar
                      ? COLORS.primary
                      : COLORS.lightGray2,
                  marginRight: SIZES.radius,
                  marginTop: SIZES.radius,
                  borderRadius: SIZES.base,
                  alignItems: "center",
                  justifyContent: "center",
                  height: 50,
                }}
                onPress={() => handleChangeRating(rating.id)}
              >
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      color:
                        rating.id === ratingStar ? COLORS.white : COLORS.gray,
                      ...FONTS.body3,
                    }}
                  >
                    {rating.label}
                  </Text>
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      tintColor:
                        index === ratingStar - 1 ? COLORS.white : COLORS.red,
                      marginLeft: 2,
                    }}
                    source={icons.star}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </Section>
    );
  };

  const renderProtein = () => {
    return (
      <Section title={"Lọc theo Protein"}>
        <View style={{ alignItems: "center" }}>
          <TwoPointSlider
            values={proteinRange.current}
            min={0}
            max={300}
            prefix={""}
            postfix={"g"}
            minMarkerOverlapDistance={0}
            onChangeValue={(values) => {
              proteinRange.current = values;
            }}
          />
        </View>
      </Section>
    );
  };

  const renderFat = () => {
    return (
      <Section title={"Lọc theo FAT"}>
        <View style={{ alignItems: "center" }}>
          <TwoPointSlider
            values={fatRange.current}
            min={0}
            max={300}
            prefix={""}
            postfix={"g"}
            minMarkerOverlapDistance={0}
            onChangeValue={(values) => {
              fatRange.current = values;
            }}
          />
        </View>
      </Section>
    );
  };

  const renderCarb = () => {
    return (
      <Section title={"Lọc theo Carbohydrate"}>
        <View style={{ alignItems: "center" }}>
          <TwoPointSlider
            values={carbRange.current}
            min={0}
            max={300}
            prefix={""}
            postfix={"g"}
            minMarkerOverlapDistance={0}
            onChangeValue={(values) => {
              carbRange.current = values;
            }}
          />
        </View>
      </Section>
    );
  };

  const handleChangesortTypeSelected = (sortType) => {
    setSortTypeSelected(sortType);
  };

  const handleChangeRating = (id_star) => {
    setRatingStar(id_star);
  };
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={{ flex: 1, backgroundColor: COLORS.transparentBlack7 }}>
        {/* Transparent Background */}
        <TouchableNativeFeedback onPress={onClose}>
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
          ></View>
        </TouchableNativeFeedback>

        <Animated.View
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            left: 0,
            top: SIZES.height * 0.3,
            backgroundColor: COLORS.white,
            borderTopLeftRadius: SIZES.padding,
            borderTopRightRadius: SIZES.padding,
            padding: SIZES.padding,
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ ...FONTS.h3 }}>Bộ lọc tìm kiếm</Text>
            <TouchableOpacity onPress={() => onClose()}>
              <Image
                style={{
                  tintColor: COLORS.gray2,
                  width: 30,
                  height: 30,
                  borderWidth: 2,
                  borderColor: COLORS.gray2,
                  borderRadius: 10,
                }}
                source={icons.cross}
              />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 300,
            }}
          >
            {renderCalo()}
            {renderProtein()}
            {renderFat()}
            {renderCarb()}
            {renderSortList()}
            {/* {renderRating()}
            {renderTag()} */}
          </ScrollView>
          {/* Apply Button */}
          <View
            style={{
              position: "absolute",
              bottom: 150,
              left: 0,
              right: 0,
              height: 160,
              paddingHorizontal: SIZES.padding,
              paddingVertical: 5,
              backgroundColor: COLORS.white,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                handleSubmit();
              }}
              style={{
                height: 50,
                backgroundColor: COLORS.primary,
                borderRadius: SIZES.base,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  ...FONTS.h3,
                  color: COLORS.white,
                }}
              >
                Áp dụng
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

//transparent = {true}

export default memo(FilterModal);
