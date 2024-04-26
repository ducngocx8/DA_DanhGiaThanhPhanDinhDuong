import React, { Fragment, useEffect } from "react";
import Header from "../../components/Layouts/SympleLayout/Header";
import Footer from "../../components/Layouts/SympleLayout/Footer";
import ChildHeader from "../../components/Layouts/SympleLayout/ChildHeader";
import TinhBMILayout from "../../components/Layouts/TinhBMILayout";
export default function BMIPage() {
  useEffect(() => {
    document.title = "Tính BMI - Thành phần dinh dưỡng";
  }, []);

  return (
    <Fragment>
      <Header productType={"THUCPHAM"} />
      <ChildHeader />
      <TinhBMILayout />
      <Footer />
    </Fragment>
  );
}
