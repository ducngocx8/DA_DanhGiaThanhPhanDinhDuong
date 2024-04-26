import React, { Fragment, useEffect, useState } from "react";
import ProductCategoryLayout from "../../components/Layouts/SympleLayout/MonAnCategoryLayout";
import NotFound from "../../components/Layouts/SympleLayout/NotFound";
import { useParams } from "react-router-dom";
import axios from "axios";
import { NhomMonAnURL } from "../../api";

export default function FoodCategory() {
  const { id } = useParams();
  let [loading, isLoading] = useState(true);
  let [productListCategory, setproductListCategory] = useState(false);
  let [uid, setID] = useState(id);

  useEffect(() => {
    setID(uid);
  }, [uid]);

  useEffect(() => {
    if (Number.isInteger(Number(id))) {
      async function getProductCategory() {
        const response = await axios.get(`${NhomMonAnURL + "/" + id}`);
        setproductListCategory(response.data.data);
        isLoading(false);
      }
      getProductCategory();
    }
  }, [id]);
  return (
    <Fragment>
      {loading ? (
        ""
      ) : productListCategory ? (
        <ProductCategoryLayout
          productList={productListCategory.MonAns}
          ten_nhom={productListCategory.ten_nhom}
          image_url={productListCategory.image_url}
          productType="MONAN"
        />
      ) : (
        <NotFound />
      )}
    </Fragment>
  );
}
