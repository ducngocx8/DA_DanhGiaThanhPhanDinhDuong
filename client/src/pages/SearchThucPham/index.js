import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { searchThucPhamURL } from "../../api";
import SearchThucPhamLayout from "../../components/Layouts/SympleLayout/SearchThucPhamLayout";

export default function SearchThucPham() {
  const [loading, isLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword").toLowerCase().trim();
  const param = window.location.search;
  let [productList, setProductList] = useState([]);

  useEffect(() => {
    async function searchProduct() {
      const response = await axios.get(`${searchThucPhamURL + param}`, {
        withCredentials: true,
      });
      setProductList(response.data.data);
      isLoading(false);
    }
    searchProduct();
  }, [param]);
  return loading ? (
    ""
  ) : (
    <SearchThucPhamLayout productList={productList} keyword={keyword} />
  );
}
