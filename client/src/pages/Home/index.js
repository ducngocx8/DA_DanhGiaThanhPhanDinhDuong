import React, { Fragment, useEffect } from "react";
import Header from "../../components/Layouts/SympleLayout/Header";
import Carousel from "../../components/Layouts/SympleLayout/Carousel";
import Footer from "../../components/Layouts/SympleLayout/Footer";
import ListNewProduct from "../../components/Layouts/Product/ListNewProduct";
import ChildHeader from "../../components/Layouts/SympleLayout/ChildHeader";
import MonAnNhieuCalo from "../../components/Layouts/Product/MonAnNhieuCalo";
import MonAnNhieuProtein from "../../components/Layouts/Product/MonAnNhieuProtein";
import MonAnDungNhieu from "../../components/Layouts/Product/MonAnDungNhieu";
export default function Home() {
  useEffect(() => {
    document.title = "Trang chủ - Đánh Giá Thành Phần Dinh Dưỡng";
  }, []);

  const setLoading = () => {};
  return (
    <Fragment>
      <Header productType={"MONAN"} />
      <ChildHeader />
      <Carousel productType={"MONAN"} />
      <ListNewProduct
        menuName="Danh sách món ăn"
        imageUrl={"/images/newfish.png"}
        productType={"MONAN"}
        isPagination={true}
        setLoading={setLoading}
      />

      <MonAnNhieuCalo
        menuName="Món ăn nhiều Calo"
        imageUrl={"/icons/chay.png"}
        setLoading={setLoading}
      />

      <MonAnNhieuProtein
        menuName="Món ăn nhiều Protein"
        imageUrl={"/icons/trangmieng.png"}
        isPagination={false}
        setLoading={setLoading}
      />

      <MonAnDungNhieu
        menuName="Món ăn dùng nhiều"
        imageUrl={"/icons/trangmieng.png"}
        isPagination={false}
        setLoading={setLoading}
      />

      <Footer />
    </Fragment>
  );
}
