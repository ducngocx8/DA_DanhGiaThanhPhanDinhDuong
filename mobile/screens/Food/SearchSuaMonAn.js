import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES, FONTS, icons } from "../../constants";
import { SearchTop10ThucPhamURL } from "../../api";
import axios from "axios";
import ModalNhapSoLuongTP from "./ModalNhapSoLuongTP";

export default function SeachSuaMonAn({ addToList }) {
  const [searchInput, setSearchInput] = useState("");
  const [thucPhamList, setThucPhamList] = useState([]);
  const [showModalNhapSoLuongTP, setShowModalNhapSoLuongTP] = useState({
    show: false,
    status: "SUAMON_ADD",
  });
  const [thucPhamChoose, setThucPhamChoose] = useState(false);

  useEffect(() => {
    const getThucPhamList = async () => {
      const response = await axios.get(
        `${SearchTop10ThucPhamURL + "?keyword=" + searchInput}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        setThucPhamList(response.data.data);
      } else {
        setThucPhamList([]);
      }
    };
    if (searchInput.trim() !== "") {
      getThucPhamList();
    } else {
      setThucPhamList([]);
    }
  }, [searchInput]);

  const renderSearchResult = () => {
    return (
      <ScrollView
        style={{
          height: 100,
          marginVertical: SIZES.base,
          borderRadius: SIZES.radius,
        }}
      >
        {thucPhamList.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setThucPhamChoose(item);
                setShowModalNhapSoLuongTP({
                  ...showModalNhapSoLuongTP,
                  show: true,
                });
              }}
              key={index}
              style={{
                flexDirection: "row",
                borderWidth: 0.3,
                borderColor: COLORS.gray,
                padding: 5,
              }}
            >
              <Text
                style={{
                  ...FONTS.body3,
                }}
              >
                {item.id_thucpham}
              </Text>
              <Text
                style={{
                  ...FONTS.body3,
                  marginLeft: SIZES.radius,
                }}
              >
                {item.TenTiengViet || item.TenTiengAnh}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  return (
    <View
      style={{
        marginTop: SIZES.base,
      }}
    >
      {/* Render Modal Nhap So Luong */}
      {showModalNhapSoLuongTP.show && thucPhamChoose && (
        <ModalNhapSoLuongTP
          setShowModalNhapSoLuongTP={() => {
            setShowModalNhapSoLuongTP({
              ...showModalNhapSoLuongTP,
              show: false,
            });
            setThucPhamChoose(null);
          }}
          status={showModalNhapSoLuongTP.status}
          thucPhamChoose={thucPhamChoose}
          addToList={addToList}
        />
      )}
      <View
        style={{
          flexDirection: "row",
          height: 44,
          alignItems: "center",
          marginBottom: SIZES.base,
          paddingHorizontal: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
          borderRadius: SIZES.base,
        }}
      >
        <Image
          style={{
            width: 20,
            height: 20,
            tintColor: COLORS.black,
          }}
          source={icons.search}
        />
        <TextInput
          placeholder="Tìm kiếm thực phẩm"
          style={{ marginLeft: SIZES.radius, flex: 1, ...FONTS.body3 }}
          value={searchInput}
          onChangeText={(value) => {
            setSearchInput(value);
          }}
        />
      </View>
      {/* Render Search */}
      {thucPhamList.length > 0 ? renderSearchResult() : ""}
    </View>
  );
}
