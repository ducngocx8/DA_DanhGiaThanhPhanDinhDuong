import React, { Fragment, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Title } from "../../../../Utils/Title";
import ChildHeader from "../ChildHeader";
import CategoryNewMonAn from "../../Product/CategoryNewMonAn";
import Carousel from "../Carousel";

export default function MonAnCategoryLayout({ productList, ten_nhom, image_url, }) {
  useEffect(() => {
    document.title = ten_nhom + Title.origin;
  }, [ten_nhom]);
  return (
    <Fragment>
      <Header productType={"MONAN"} />
      <ChildHeader />
      <Carousel productType={"MONAN"} />
      <CategoryNewMonAn
        productList={productList}
        ten_nhom={ten_nhom}
        imageUrl={"/images/top-buy.png"}
        isPagination={true}
      />
      <Footer />
    </Fragment>
  );
}
