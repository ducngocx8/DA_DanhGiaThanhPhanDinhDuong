import React, { Fragment, useEffect } from "react";
import Header from "../../components/Layouts/SympleLayout/Header";
import Footer from "../../components/Layouts/SympleLayout/Footer";
import ChildHeader from "../../components/Layouts/SympleLayout/ChildHeader";
import ThucDonLayout from "../../components/Layouts/ThucDonLayout";
export default function ThucDonPage() {
  useEffect(() => {
    document.title = "Gợi ý thực đơn - Thành phần dinh dưỡng";
  }, []);

  return (
    <Fragment>
      <Header productType={"MONAN"} />
      <ChildHeader />
      <ThucDonLayout />
      <Footer />
    </Fragment>
  );
}
