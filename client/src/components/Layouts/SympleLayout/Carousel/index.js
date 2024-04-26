import React, { Fragment, useEffect, useState } from "react";
import "../../../../css/Carousel.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { NhomMonAnURL, NhomThucPhamURL } from "../../../../api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Carousel({ productType }) {
  let [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getAllNhomMonAn() {
      const response = await axios.get(`${NhomMonAnURL}`);
      setCategories(response.data.data); // status, data
      return response.data.data;
    }
    async function getAllNhomThucPham() {
      const response = await axios.get(`${NhomThucPhamURL}`);
      setCategories(response.data.data); // status, data
      return response.data.data;
    }
    if (productType === "THUCPHAM") {
      getAllNhomThucPham();
    } else {
      getAllNhomMonAn();
    }
  }, [productType]);

  return (
    <Fragment>
      <div className="category_carousel _100vw mg-10_0">
        <div className="_1200px flex_between">
          <div className="category_carousel_left bg-white" id="style-15">
            <div
              className="category_title bg-primary color-white pd-10_35"
              style={{ position: "absolute", width: 220 }}
            >
              {productType === "MONAN"
                ? "Danh Mục Món Ăn"
                : "Danh Mục Thực Phẩm"}
            </div>
            <ul className="category_ul">
              <li className="category_ui_item pd-10">
                <Link to="/">Home</Link>
              </li>
              {categories.map((category, index) => (
                <li key={index} className="category_ui_item pd-10">
                  <Link
                    to={
                      productType === "MONAN"
                        ? "/category/" + category.id_nhommonan
                        : "/dinh-duong/category/" + category.id_nhomthucpham
                    }
                  >
                    {category.ten_nhom}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="category_carousel_right">
            <Swiper
              style={{
                width: "960px",
                height: "312px",
                display: "flex",
              }}
              modules={[Navigation, Pagination, A11y, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              speed={1000}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              scrollbar={{ draggable: true }}
              onSwiper={(swiper) => {}}
            >
              <SwiperSlide>
                <Link to="/product/5">
                  <img
                    style={{
                      width: 960,
                      height: 312,
                      objectFit: "cover",
                    }}
                    alt="anh"
                    src="/banner/banner-ngay-luong-thuc.png"
                  />
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link to="/product/6">
                  <img
                    style={{
                      width: 960,
                      height: 312,
                      objectFit: "cover",
                    }}
                    alt="anh"
                    src="/banner/banner-thap-dinh-duong.webp"
                  />
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link to="/product/7">
                  <img
                    style={{
                      width: 960,
                      height: 312,
                      objectFit: "cover",
                    }}
                    alt="anh"
                    src="/banner/banner-vitamin-a.png"
                  />
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link to="/product/8">
                  <img
                    style={{
                      width: 960,
                      height: 312,
                      objectFit: "cover",
                    }}
                    alt="anh"
                    src="/banner/banner-vitamin-k.png"
                  />
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link to="/product/8">
                  <img
                    style={{
                      width: 960,
                      height: 312,
                      objectFit: "cover",
                    }}
                    alt="anh"
                    src="/banner/banner-thuc-pham-one.png"
                  />
                </Link>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
