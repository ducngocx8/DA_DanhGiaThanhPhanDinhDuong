import React, { Fragment, useEffect } from "react";
import Header from "../SympleLayout/Header";
import ProductInfo from "../ProductDetail/ProductInfo";
import Footer from "../SympleLayout/Footer";
import "../../../css/ProductDetail.css";
import { Title } from "../../../Utils/Title";
import ChildHeader from "../SympleLayout/ChildHeader";
import MonAnYeuThich from "../Product/MonAnYeuThich";
import MonAnCungNhom from "../Product/MonAnCungNhom";
export default function ProductDetailLayout({ productDetail, setLoading }) {
  useEffect(() => {
    document.title = productDetail.ten_mon + Title.origin;
  }, [productDetail.ten_mon]);
  return (
    <Fragment>
      <Header productType={"MONAN"} />
      <ChildHeader />
      <ProductInfo productDetail={productDetail} />
      <MonAnCungNhom
        menuName="Món ăn cùng chuyên mục"
        imageUrl={"/images/bestseller.png"}
        setLoading={setLoading}
        id_monan={productDetail.id_monan}
        id_nhommonan={productDetail.id_nhommonan}
      />
      <MonAnYeuThich
        menuName="Món ăn yêu thích"
        imageUrl={"/icons/chay.png"}
        setLoading={setLoading}
      />
      <Footer />
    </Fragment>
  );
}
