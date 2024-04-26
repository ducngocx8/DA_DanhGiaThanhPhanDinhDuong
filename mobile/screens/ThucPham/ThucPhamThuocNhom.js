import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES, icons, FONTS, images } from "../../constants";
import HeaderDrawerChild from "../../components/HeaderDrawerChild";
import FilterModalThucPham from "./FilterModalThucPham";
import { NhomThucPhamURL, ThucPhamURL } from "../../api";
import axios from "axios";
import { imageMonAnRandom } from "../../utils/variable";

export default function ThucPhamThuocNhom({ navigation, route }) {
  const [searchInput, setSearchInput] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [loading, isLoading] = useState(true);
  const [thucPhamList, setThucPhamList] = useState([]);
  const [thucPhamThuocNhomList, setThucPhamThuocNhomList] = useState([]);

  console.log("thucPhamThuocNhomList =", thucPhamThuocNhomList);

  if (!route.params) {
    return navigation.navigate("Result", {
      icon: images.success,
      resultText: "Không tìm thấy nhóm thực phẩm",
      resultMessage: "Nhóm thực phẩm không tồn tại trên hệ thống!",
      resultButtonText: "Done",
      screenName: "NhomThucPham",
    });
  }

  const { id_nhomthucpham } = route.params;
  console.log("id_nhomthucpham:", id_nhomthucpham);

  useEffect(() => {
    const getAllThucPham = async () => {
      const response = await axios.get(`${ThucPhamURL}`);
      setThucPhamList(response.data.data);
    };

    const getThucPhamThuocNhom = async () => {
      const response = await axios.get(`${NhomThucPhamURL}/${id_nhomthucpham}`);
      if (!response.data.status) {
        return navigation.navigate("Result", {
          icon: images.success,
          resultText: "Không tìm thấy nhóm thực phẩm",
          resultMessage: "Nhóm thực phẩm không tồn tại trên hệ thống!",
          resultButtonText: "Done",
          screenName: "NhomThucPham",
        });
      }
      setThucPhamThuocNhomList(response.data.data);
    };

    const handleAPIAll = async () => {
      await Promise.all([
        Promise.resolve(getThucPhamThuocNhom()),
        Promise.resolve(getAllThucPham()),
      ]);
      isLoading(false);
    };
    handleAPIAll();
  }, []);

  const renderSearch = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 44,
          alignItems: "center",
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
            console.log("Filter");
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
      {!loading ? (
        <View
          style={{
            flex: 1,
            paddingTop: SIZES.padding * 2,
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
              title={
                thucPhamThuocNhomList.ten_nhom.length > 30
                  ? thucPhamThuocNhomList.ten_nhom.slice(0, 30)+ "..."
                  : thucPhamThuocNhomList.ten_nhom
              }
              disableRight={true}
            />
          </View>

          {/* Render List Thực Phẩm Trong 1 Nhom */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              backgroundColor: COLORS.white,
              paddingHorizontal: SIZES.padding,
              paddingVertical: SIZES.padding,
              flex: 1,
            }}
          >
            {/* Render Search */}
            {renderSearch()}
            {/* Render Filter Modal */}
            {showFilterModal && (
              <FilterModalThucPham
                isVisible={showFilterModal}
                onClose={() => {
                  setShowFilterModal(false);
                }}
              />
            )}
            {/* Render Danh Sách Thực Phẩm Thuộc Nhóm */}
            {thucPhamThuocNhomList.ThucPhams.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    console.log("SELECT THỰC PHẨM");
                    navigation.navigate("ChiTietThucPham", {
                      id_thucpham: item.id_thucpham,
                      id_nhomthucpham: id_nhomthucpham,
                    });
                  }}
                  style={{
                    flexDirection: "row",
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.lightGray2,
                    height: 145,
                    alignItems: "center",
                    marginTop: SIZES.radius,
                  }}
                >
                  {/* Image  */}
                  <Image
                    source={imageMonAnRandom[0]}
                    style={{ marginTop: 20, height: 110, width: 110 }}
                  />
                  {/* Info */}
                  <View style={{ flex: 1 }}>
                    <Text style={{ ...FONTS.h3, color: COLORS.blue }}>
                      {item.TenTiengViet}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.gray,
                        ...FONTS.body5,
                        fontSize: 13.2,
                      }}
                    >
                      Chất đạm:{" "}
                      {item.PROCNT === null ? "-" : Number(item.PROCNT) * 1}
                    </Text>
                    <Text
                      style={{
                        ...FONTS.body5,
                        color: COLORS.gray,
                        fontSize: 13.2,
                      }}
                    >
                      Chất béo: {item.FAT === null ? "-" : Number(item.FAT) * 1}
                    </Text>
                    <Text
                      style={{
                        ...FONTS.body5,
                        color: COLORS.gray,
                        fontSize: 13.2,
                      }}
                    >
                      Carbohydrate:{" "}
                      {item.CHOCDF === null ? "-" : Number(item.CHOCDF) * 1}
                    </Text>
                  </View>

                  {/* Calo  */}
                  <View
                    style={{
                      flexDirection: "row",
                      position: "absolute",
                      top: 0,
                      right: 15,
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{ width: 15, height: 15 }}
                      source={icons.calo}
                      resizeMode="center"
                    />
                    <Text
                      style={{
                        color: COLORS.primary,
                        ...FONTS.body5,
                        marginLeft: 2,
                      }}
                    >
                      {item.ENERC === null ? "-" : Number(item.ENERC) * 1}{" "}
                      Calories
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
            <View
              style={{
                marginTop: SIZES.padding * 1.5,
              }}
            ></View>
          </ScrollView>
        </View>
      ) : (
        ""
      )}
    </>
  );
}
