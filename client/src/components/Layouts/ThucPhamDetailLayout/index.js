import React, { Fragment, useEffect } from "react";
import Header from "../SympleLayout/Header";
import Footer from "../SympleLayout/Footer";
import "../../../css/ProductDetail.css";
import { Title } from "../../../Utils/Title";
import ThucPhamInfo from "./ThucPhamInfo";
import ChildHeader from "../SympleLayout/ChildHeader";
import ThucPhamNhieuCalo from "../Product/ThucPhamNhieuCalo";
export default function ThucPhamDetailLayout({ productDetail, setLoading }) {
  useEffect(() => {
    document.title =
      (productDetail.TenTiengViet || productDetail.TenTiengAnh) + Title.origin;
  }, [productDetail.TenTiengViet, productDetail.TenTiengAnh]);
  return (
    <Fragment>
      <Header productType={"THUCPHAM"} />
      <ChildHeader />
      <ThucPhamInfo productDetail={productDetail} />
      <ThucPhamNhieuCalo
        menuName="Thực phẩm giàu năng lượng"
        imageUrl={"/images/bestseller.png"}
        setLoading={setLoading}
      />
      <Footer />
    </Fragment>
  );
}
