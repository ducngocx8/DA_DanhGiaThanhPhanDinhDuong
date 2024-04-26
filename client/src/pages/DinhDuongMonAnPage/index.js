import React, { Fragment, useEffect } from "react";
import Header from "../../components/Layouts/SympleLayout/Header";
import Footer from "../../components/Layouts/SympleLayout/Footer";
import ChildHeader from "../../components/Layouts/SympleLayout/ChildHeader";
import DinhDuongMonAnLayout from "../../components/Layouts/DinhDuongMonAnLayout";
export default function DinhDuongMonAnPage() {
  useEffect(() => {
    document.title = "Dinh dưỡng món ăn - Thành phần dinh dưỡng";
  }, []);
  return (
    <Fragment>
      <Header productType={"THUCPHAM"} />
      <ChildHeader />
      <DinhDuongMonAnLayout />
      <Footer />
    </Fragment>
  );
}
