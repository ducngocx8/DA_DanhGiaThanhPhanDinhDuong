import React, { Fragment, useEffect } from "react";
import Header from "../../components/Layouts/SympleLayout/Header";
// import ProductBestSeller from "../../components/Layouts/Product/ProductBestSeller";
// import ProductRecomment from "../../components/Layouts/Product/ProductRecomment";
import Footer from "../../components/Layouts/SympleLayout/Footer";
// import ListNewProduct from "../../components/Layouts/Product/ListNewProduct";
import ChildHeader from "../../components/Layouts/SympleLayout/ChildHeader";
import ThucPhamLayout from "../../components/Layouts/ThucPhamLayout";
export default function ThucPhamPage() {
  useEffect(() => {
    document.title = "Thực phẩm - Thành phần dinh dưỡng";
  }, []);
  return (
    <Fragment>
      <Header productType={"THUCPHAM"} />
      <ChildHeader />
      <ThucPhamLayout />
      <Footer />
    </Fragment>
  );
}
