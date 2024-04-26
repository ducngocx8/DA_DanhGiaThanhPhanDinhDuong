import React, { Fragment, useEffect } from "react";
import Header from "../../components/Layouts/SympleLayout/Header";
import Footer from "../../components/Layouts/SympleLayout/Footer";
import ChildHeader from "../../components/Layouts/SympleLayout/ChildHeader";
import NhuCauDinhDuongLayout from "../../components/Layouts/NhuCauDinhDuongLayout";
export default function NhuCauDinhDuongPage() {
  useEffect(() => {
    document.title = "Nhu cầu dinh dưỡng - Thành phần dinh dưỡng";
  }, []);

  return (
    <Fragment>
      <Header productType={"THUCPHAM"} />
      <ChildHeader />
      <NhuCauDinhDuongLayout />
      <Footer />
    </Fragment>
  );
}
