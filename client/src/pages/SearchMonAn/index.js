import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { searchMonAnURL } from "../../api";
import SearchMonAnLayout from "../../components/Layouts/SympleLayout/SearchMonAnLayout";

export default function SearchMonAn() {
  const [loading, isLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword").toLowerCase().trim();
  const param = window.location.search;
  let [productList, setProductList] = useState([]);

  console.log(productList);

  useEffect(() => {
    async function searchProduct() {
      const response = await axios.get(`${searchMonAnURL + param}`, {
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
    <SearchMonAnLayout productList={productList} keyword={keyword} />
  );
}
