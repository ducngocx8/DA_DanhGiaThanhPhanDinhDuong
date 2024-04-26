import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import "../../css/ProductDetail.css";
import { useParams } from "react-router-dom";
import NotFound from "../../components/Layouts/SympleLayout/NotFound";
import { ThucPhamURL } from "../../api";
import ThucPhamDetailLayout from "../../components/Layouts/ThucPhamDetailLayout";
export default function ThucPhamDetail() {
  const { id } = useParams();
  console.log("ID = ", id);
  let [loading, isLoading] = useState(true);
  let [productDetail, setProductDetail] = useState(false);
  let [uid, setID] = useState(id);

  const setLoading = (product_id) => {
    if (product_id !== uid) {
      isLoading(true);
      setID(product_id);
    } else {
      isLoading(false);
    }
  };

  useEffect(() => {
    async function getProductDetail() {
      const response = await axios.get(`${ThucPhamURL + "/" + uid}`);
      setProductDetail(response.data.data);
      isLoading(false);
    }
    getProductDetail();
  }, [uid]);
  return (
    <Fragment>
      {loading ? (
        ""
      ) : productDetail ? (
        <ThucPhamDetailLayout
          productDetail={productDetail}
          setLoading={setLoading}
        />
      ) : (
        <NotFound />
      )}
    </Fragment>
  );
}
