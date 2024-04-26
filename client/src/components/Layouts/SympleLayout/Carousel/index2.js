import React, { Fragment, useEffect, useState } from "react";
import "../../../../css/Carousel.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { NhomMonAnURL, NhomThucPhamURL } from "../../../../api";

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

    let findItem = document.getElementById("carousel_pro");
    if (!findItem) {
      const script = document.createElement("script");
      script.src = "/carousel_pro.js";
      script.async = true;
      script.id = "carousel_pro";
      document.body.appendChild(script);
    }
    return () => {
      findItem = document.getElementById("carousel_pro");
      if (findItem) {
        findItem.remove();
      }
    };
  }, [productType]);

  return (
    <Fragment>
      <div className="category_carousel _100vw mg-10_0">
        <div className="_1200px flex_between">
          <div className="category_carousel_left bg-white" id="style-15">
            <div
              className="category_title bg-primary color-white pd-10_35"
              style={{ position: "absolute" }}
            >
              Danh Mục Sản Phẩm
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
            <div className="carousel_images">
              <Link to="/product/5">
                <img src="/images/carousel/di-cho-online.jpg" alt="sale" />
              </Link>
              <Link to="/product/6">
                <img src="/images/carousel/banner-v3.jpg" alt="sale" />
              </Link>
              <Link to="/product/7">
                <img src="/images/carousel/banner-v2.png" alt="sale" />
              </Link>
              <Link to="/product/8">
                <img src="/images/carousel/banner-san-sale.png" alt="sale" />
              </Link>
            </div>
            <div className="carousel_pre_after">
              <div className="pre_bg-main" style={{ padding: "2px 10px" }}>
                <i id="pre" className="fa fa-angle-left" />
              </div>
              <div className="next_bg-main" style={{ padding: "2px 10px" }}>
                <i id="next" className="fa fa-angle-right" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Quảng cáo */}
      {/* <div className="banner flex_center">
        <div className="_1200px overflow_hidden">
          <Link to="/">
            <img src="/images/banner_qc_1.png" alt="banner" />
          </Link>
        </div>
      </div> */}
    </Fragment>
  );
}
