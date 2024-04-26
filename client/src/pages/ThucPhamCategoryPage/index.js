import React, { Fragment, useEffect, useState } from "react";
import NotFound from "../../components/Layouts/SympleLayout/NotFound";
import { useParams } from "react-router-dom";
import axios from "axios";
import { NhomThucPhamURL } from "../../api";
import ThucPhamCategoryLayout from "../../components/Layouts/ThucPhamCategoryLayout";

export default function ThucPhamCategoryPage() {
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
        const response = await axios.get(`${NhomThucPhamURL + "/" + id}`);
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
        <ThucPhamCategoryLayout
          productList={productListCategory.ThucPhams}
          ten_nhom={productListCategory.ten_nhom}
          image_url={productListCategory.image_url}
        />
      ) : (
        <NotFound />
      )}
    </Fragment>
  );
}
