import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../css/Fish.css";
import { noImage, notify } from "../../../Utils/Title";
import { BACKEND_HOME, DuongChatThucPhamOffset } from "../../../api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import BestThucPham from "./BestThucPham";
export default function ThucPhamNhieuCalo({ menuName, imageUrl, setLoading }) {
  let [monAnList, setMonAnList] = useState([]);

  useEffect(() => {
    async function getThucPhamNhieuCalo() {
      const response = await axios.get(
        `${DuongChatThucPhamOffset + "?code=ENERC&offset=0&limit=20"}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        setMonAnList(response.data.data);
      } else {
        notify(false, response.data.message);
      }
      console.log(response.data);
    }
    getThucPhamNhieuCalo();
  }, []);
  return (
    <div className="favorite_book_list flex_center mg-10_0">
      <div className="_1200px bg-white flex_col pd-10">
        <div
          className="favorite_book_list_icon_title"
          style={{ padding: "5px 0px", borderBottom: "1px solid #007bff" }}
        >
          <img src={imageUrl} className="icon_sach" alt={menuName} />
          <span className="favorite_book_list_title mg-l-10">{menuName}</span>
        </div>
        <div className="favorite_book_item flex_center mg-10_0">
          {monAnList.length < 4 ? (
            monAnList.map((product, index) => {
              return (
                <BestThucPham
                  key={index}
                  sizeComponent={"23%"}
                  setLoading={setLoading}
                  product_detail={{
                    product_id: product.id_thucpham,
                    product_name: product.TenTiengViet || product.TenTiengAnh,
                    product_image:
                      product?.image_url.length > 0
                        ? BACKEND_HOME + product.image_url
                        : noImage,
                    energy_index: Number(product.ENERC).toFixed(0),
                    don_vi: "calo",
                    category_name: product.ten_nhom,
                    productType: "THUCPHAM",
                  }}
                />
              );
            })
          ) : (
            <Swiper
              modules={[Navigation, A11y, FreeMode]}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
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
              {monAnList.map((product, index) => {
                return (
                  <SwiperSlide
                    className="swiper-fixed-width-23percent"
                    key={index}
                  >
                    <BestThucPham
                      key={index}
                      sizeComponent={"95%"}
                      setLoading={setLoading}
                      product_detail={{
                        product_id: product.id_thucpham,
                        product_name:
                          product.TenTiengViet || product.TenTiengAnh,
                        product_image:
                          product?.image_url.length > 0
                            ? BACKEND_HOME + product.image_url
                            : noImage,
                        energy_index: Number(product.ENERC).toFixed(0),
                        don_vi: "calo",
                        category_name: product.ten_nhom,
                        productType: "THUCPHAM",
                      }}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </div>
      </div>
    </div>
  );
}
