import React, { Fragment, useEffect } from "react";
import Header from "../../components/Layouts/SympleLayout/Header";
import Footer from "../../components/Layouts/SympleLayout/Footer";
import ChildHeader from "../../components/Layouts/SympleLayout/ChildHeader";
import ChiSoDuongHuyetLayout from "../../components/Layouts/ChiSoDuongHuyetLayout";
export default function ChiSoDuongHuyetPage() {
  useEffect(() => {
    document.title = "Chỉ số đường huyết - Thành phần dinh dưỡng";
  }, []);

  return (
    <Fragment>
      <Header productType={"THUCPHAM"} />
      <ChildHeader />
      <ChiSoDuongHuyetLayout />
      <Footer />
    </Fragment>
  );
}
