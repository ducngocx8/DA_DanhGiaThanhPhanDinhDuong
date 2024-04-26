import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../css/Fish.css";
import { noImage, notify } from "../../../Utils/Title";
import { BACKEND_HOME, MonAnURL } from "../../../api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import BestMonAn from "./BestMonAn";
export default function MonAnCungNhom({
  menuName,
  imageUrl,
  setLoading,
  id_monan,
  id_nhommonan,
}) {
  let [monAnList, setMonAnList] = useState([]);

  useEffect(() => {
    async function getMonAnCungChuyenMuc() {
      const response = await axios.get(
        `${
          MonAnURL +
          `/same/cung-chuyen-muc?id_monan=${id_monan}&id_nhommonan=${id_nhommonan}`
        }`,
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
    getMonAnCungChuyenMuc();
  }, [id_monan, id_nhommonan]);
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
                <BestMonAn
                  key={index}
                  sizeComponent={"23%"}
                  setLoading={setLoading}
                  product_detail={{
                    product_id: product.id_monan,
                    product_name: product.ten_mon,
                    product_image:
                      product?.image_url.length > 0
                        ? BACKEND_HOME + product.image_url
                        : noImage,
                    energy_index: Number(product.ENERC).toFixed(0),
                    don_vi: "calo",
                    category_name: product.ten_nhom,
                    productType: "MONAN",
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
                  <SwiperSlide key={index}>
                    <BestMonAn
                      sizeComponent={"95%"}
                      key={index}
                      setLoading={setLoading}
                      product_detail={{
                        product_id: product.id_monan,
                        product_name: product.ten_mon,
                        product_image:
                          product?.image_url.length > 0
                            ? BACKEND_HOME + product.image_url
                            : noImage,
                        energy_index: Number(product.ENERC).toFixed(0),
                        don_vi: "calo",
                        category_name: product.ten_nhom,
                        productType: "MONAN",
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
