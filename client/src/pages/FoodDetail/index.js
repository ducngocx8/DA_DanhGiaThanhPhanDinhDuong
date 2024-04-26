import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import ProductDetailLayout from "../../components/Layouts/ProductDetail";
import "../../css/ProductDetail.css";
import { useParams } from "react-router-dom";
import NotFound from "../../components/Layouts/SympleLayout/NotFound";
import { ChiTietMonURL } from "../../api";
export default function FoodDetail() {
  const { id } = useParams();
  let [loading, isLoading] = useState(true);
  let [productDetail, setProductDetail] = useState(false);
  let [uid, setID] = useState(id);

  const setLoading = (fish_id) => {
    if (fish_id !== uid) {
      isLoading(true);
      setID(fish_id);
    } else {
      isLoading(false);
    }
  };

  useEffect(() => {
    if (Number.isInteger(Number(uid))) {
      async function getProductDetail() {
        const response = await axios.get(`${ChiTietMonURL + "/" + uid}`, {
          withCredentials: true,
        });
        setProductDetail(response.data.data);
        isLoading(false);
      }
      getProductDetail();
    }
  }, [uid]);
  return (
    <Fragment>
      {loading ? (
        ""
      ) : productDetail ? (
        <ProductDetailLayout
          productDetail={productDetail}
          setLoading={setLoading}
        />
      ) : (
        <NotFound />
      )}
    </Fragment>
  );
}
