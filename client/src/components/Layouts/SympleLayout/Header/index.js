import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../../css/Header.css";
import "../../../../css/App.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import ThucPhamChonLayout from "./ThucPhamChonLayout";
import { NgayAnURL, ThucPhamChonURL } from "../../../../api";
export default function Header({ productType, keyword }) {
  console.log(productType);
  const [showThucPhamChon, setShowThucPhamChon] = useState(false);
  const [thucPhamChonList, setThucPhamChonList] = useState([]);

  const closeShowThucPhamChon = () => {
    setShowThucPhamChon(false);
  };
  let dispatch = useDispatch();
  useEffect(() => {
    if (productType === "THUCPHAM") {
      const loadCart = async () => {
        const response = await axios.get(`${ThucPhamChonURL}`, {
          withCredentials: true,
        });
        if (response.data.status) {
          setThucPhamChonList(response.data.data);
          dispatch({
            type: "load_cart",
            value: response.data.data,
          });
        }
      };
      loadCart();
    } else {
      const loadCart = async () => {
        const response = await axios.get(`${NgayAnURL}`, {
          withCredentials: true,
        });
        if (response.data.status) {
          setThucPhamChonList(response.data.data);
          dispatch({
            type: "load_cart",
            value: response.data.data,
          });
        }
      };
      loadCart();
    }
  }, [dispatch, productType, showThucPhamChon]);
  let cart = useSelector((state) => state.cartReducer);
  return (
    <header className="_100vw">
      {productType === "THUCPHAM" && showThucPhamChon && (
        <div
          className="background_black"
          id="background_black"
          style={{ display: "block" }}
        >
          {showThucPhamChon && (
            <ThucPhamChonLayout
              closeForm={closeShowThucPhamChon}
              thucPhamChonList={thucPhamChonList}
              setThucPhamChonList={setThucPhamChonList}
              dispatch={dispatch}
            />
          )}
        </div>
      )}
      <div className="_1200px flex_between pd-15_0">
        <div className="nav_left">
          <div className="logo">
            <Link to="/">
              <img src="/logo.png" alt="Logo" />
              <span className="logo_title">DINHDUONG</span>
            </Link>
          </div>
          <div className="search">
            <form
              action={
                productType === "MONAN" ? "/search" : "/dinh-duong/search"
              }
            >
              <input
                className="input_keyword"
                type="text"
                name="keyword"
                placeholder={
                  productType === "MONAN"
                    ? "Nhập món ăn cần tìm kiếm..."
                    : "Nhập thực phẩm cần tìm kiếm..."
                }
                defaultValue={keyword || ""}
              />
              <button className="btn_search">
                <i className="fa fa-search" />
              </button>
            </form>
          </div>
        </div>
        <div className="nav_right">
          <Link to="/account/login">
            <i className="fa fa-user" />
          </Link>
          {productType === "THUCPHAM" ? (
            <Link onClick={() => setShowThucPhamChon(true)}>
              <i
                style={{
                  fontSize: 20,
                }}
                className="fa fa-seedling"
              />{" "}
              <span
                style={{
                  position: "absolute",
                  top: 15,
                  color: "#FFEB3B",
                  fontWeight: "bold",
                }}
              >
                {cart.length}
              </span>
            </Link>
          ) : (
            <Link to="/account/nutrition">
              <i
                style={{
                  fontSize: 20,
                }}
                className="fa fa-hamburger"
                // className="fa fa-apple-alt"
              />
              <span
                style={{
                  position: "absolute",
                  top: 15,
                  color: "#FFEB3B",
                  fontWeight: "bold",
                }}
              >
                {cart.length}
              </span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
