import React, { Fragment, useEffect } from "react";
import Header from "../Header";
import Carousel from "../Carousel";
import Footer from "../Footer";
import { Title } from "../../../../Utils/Title";
import SearchThucPhamResult from "../../Product/SearchThucPhamResult";
import ChildHeader from "../ChildHeader";

export default function SearchThucPhamLayout({ productList, keyword }) {
  useEffect(() => {
    document.title = Title.search + keyword.trim() + Title.origin;
  }, [keyword]);
  return (
    <Fragment>
      <Header keyword={keyword} productType="THUCPHAM" />
      <ChildHeader/>
      <Carousel productType="THUCPHAM" />
      <SearchThucPhamResult
        productList={productList}
        imageUrl={"/images/top-buy.png"}
        isPagination={true}
        keyword={keyword}
      />
      <Footer />
    </Fragment>
  );
}
