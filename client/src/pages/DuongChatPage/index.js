import React, { Fragment, useEffect } from "react";
import Header from "../../components/Layouts/SympleLayout/Header";
import Footer from "../../components/Layouts/SympleLayout/Footer";
import ChildHeader from "../../components/Layouts/SympleLayout/ChildHeader";
import DuongChatLayout from "../../components/Layouts/DuongChatLayout";
export default function DuongChatPage() {
  useEffect(() => {
    document.title = "Dưỡng chất - Thành phần dinh dưỡng";
  }, []);

  return (
    <Fragment>
      <Header productType={"THUCPHAM"} />
      <ChildHeader />
      <DuongChatLayout />
      <Footer />
    </Fragment>
  );
}
