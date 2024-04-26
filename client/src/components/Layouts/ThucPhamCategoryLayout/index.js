import React, { Fragment, useEffect } from "react";
import CategoryNewThucPham from "../Product/CategoryNewThucPham";
import ChildHeader from "../SympleLayout/ChildHeader";
import Header from "../SympleLayout/Header";
import Footer from "../SympleLayout/Footer";
import { Title } from "../../../Utils/Title";

export default function ThucPhamCategoryLayout({
  productList,
  ten_nhom,
  image_url,
}) {
  useEffect(() => {
    document.title = ten_nhom + Title.origin;
  }, [ten_nhom]);
  return (
    <Fragment>
      <Header productType={"THUCPHAM"} />
      <ChildHeader />
      <CategoryNewThucPham
        productList={productList}
        ten_nhom={ten_nhom}
        imageUrl={"/images/top-buy.png"}
        isPagination={true}
      />
      <Footer />
    </Fragment>
  );
}
