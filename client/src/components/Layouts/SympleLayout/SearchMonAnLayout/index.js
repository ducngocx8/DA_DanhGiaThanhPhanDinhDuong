import React, { Fragment, useEffect } from "react";
import Header from "../Header";
import Carousel from "../Carousel";
import Footer from "../Footer";
import { Title } from "../../../../Utils/Title";
import SearchMonAnResult from "../../Product/SearchMonAnResult";

export default function SearchMonAnLayout({ productList, keyword }) {
  useEffect(() => {
    document.title = Title.search + keyword.trim() + Title.origin;
  }, [keyword]);
  return (
    <Fragment>
      <Header keyword={keyword} productType="MONAN" />
      <Carousel productType="MONAN" />
      <SearchMonAnResult
        productList={productList}
        imageUrl={"/images/top-buy.png"}
        isPagination={true}
        keyword={keyword}
      />
      <Footer />
    </Fragment>
  );
}
