import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { noImage, notify } from "../../../Utils/Title";
import ThucPhamDescription from "./ThucPhamDescription";
import { BACKEND_HOME, ThucPhamChonURL } from "../../../api";

export default function ThucPhamInfo({ productDetail }) {
  let [loading, isLoading] = useState(true);
  let [amount_buy, setAmountBuy] = useState(100);
  const [tongThanhPhanChinh, setTongThanhPhanChinh] = useState({});
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const handleAddToCartHasAmount = async () => {
    const value = Number(amount_buy);
    if (value <= 0 || isNaN(Number(value))) {
      notify(false, "Số lượng không hợp lệ.");
      return;
    }
    const thuc_pham_chon = {
      id_thucpham: productDetail.id_thucpham,
      quanty: value,
    };
    const response = await axios.post(`${ThucPhamChonURL}`, thuc_pham_chon, {
      withCredentials: true,
    });
    notify(response.data.status, response.data.message);
    if (response.data.status) {
      dispatch({
        type: "load_cart",
        value: response.data.data,
      });
    } else {
      if (response.data.must === "login") {
        return navigate("/account/login", { replace: true });
      }
    }
  };

  useEffect(() => {
    const newtongThanhPhanChinh = {
      PROCNT: 0,
      FAT: 0,
      CHOCDF: 0,
      ENERC: 0,
      EDIBLE: 0,
      WATER: 0,
      FIBC: 0,
      ASH: 0,
      CA: 0,
      P: 0,
      FE: 0,
      ZN: 0,
      NA: 0,
      K: 0,
      MG: 0,
      MN: 0,
      CU: 0,
      SE: 0,
      VITC: 0,
      THIA: 0,
      RIBF: 0,
      NIA: 0,
      PANTAC: 0,
      VITB6: 0,
      FOL: 0,
      FOLAC: 0,
      BIOT: 0,
      VITB12: 0,
      RETOL: 0,
      VITA: 0,
      VITD: 0,
      VITE: 0,
      VITK: 0,
      CARTB: 0,
      CARTA: 0,
      CRYXB: 0,
      ThanhPhan: [],
    };
    let quantyInput = 0;
    if (typeof Number(amount_buy) === "number" && Number(amount_buy) >= 0) {
      quantyInput = Number(amount_buy);
    }
    for (const [key, value] of Object.entries(productDetail)) {
      if (value === null) {
        newtongThanhPhanChinh[key] = "-";
      } else if (
        [
          "ENERC",
          "FAT",
          "PROCNT",
          "CHOCDF",
          "EDIBLE",
          "CA",
          "P",
          "FE",
          "NA",
          "K",
          "MG",
          "FOL",
          "FOLAC",
          "RETOL",
          "VITA",
          "CARTB",
          "CARTA",
          "CRYXB",
        ].includes(key)
      ) {
        newtongThanhPhanChinh[key] =
          ((Number(value) * quantyInput).toFixed(0) / 100) * 1;
      } else if (["WATER"].includes(key)) {
        newtongThanhPhanChinh[key] =
          ((Number(value) * quantyInput).toFixed(1) / 100) * 1;
      } else if (
        [
          "FIBC",
          "ASH",
          "ZN",
          "SE",
          "VITC",
          "BIOT",
          "VITB12",
          "VITD",
          "VITE",
          "VITK",
        ].includes(key)
      ) {
        newtongThanhPhanChinh[key] =
          ((Number(value) * quantyInput).toFixed(2) / 100) * 1;
      } else if (
        ["MN", "CU", "THIA", "RIBF", "NIA", "PANTAC", "VITB6"].includes(key)
      ) {
        newtongThanhPhanChinh[key] =
          ((Number(value) * quantyInput).toFixed(3) / 100) * 1;
      }
    }
    setTongThanhPhanChinh({ ...newtongThanhPhanChinh });
    isLoading(false);
  }, [amount_buy, productDetail]);

  return (
    <Fragment>
      <div className="product_book flex_center mg-20_0">
        <div className="_1200px bg-white pd-10" style={{ display: "flex" }}>
          <div className="product_image flex-4">
            <img
              src={
                productDetail.image_url.length > 0
                  ? BACKEND_HOME + productDetail.image_url
                  : noImage
              }
              alt="Anh"
            />
          </div>
          <div className="product_book_info flex-6">
            <h2
              style={{
                fontWeight: 600,
              }}
              className="product_book_title"
            >
              {productDetail.TenTiengViet || productDetail.TenTiengAnh}
            </h2>
            <div className="row_product">
              <div className="flex flex-1cham5">
                <span className="text">Danh mục: </span>
                <p className="product_book_author mg-l-10">
                  <strong>
                    <Link
                      to={
                        "/dinh-duong/category/" +
                        productDetail.NhomThucPham.id_nhomthucpham
                      }
                    >
                      {productDetail.NhomThucPham.ten_nhom}
                    </Link>
                  </strong>
                </p>
              </div>
              <div className="flex flex-1">
                <span className="text">Chất đạm: </span>
                <p className="product_book_category mg-l-10">
                  <strong>
                    {productDetail.PROCNT === null
                      ? "Đang cập nhật"
                      : tongThanhPhanChinh.PROCNT + "g"}
                  </strong>
                </p>
              </div>
            </div>
            <div className="row_product">
              <div className="flex-1cham5 flex">
                <span className="text">Chất béo: </span>
                <p className="product_book_nxb mg-l-10">
                  <strong>
                    {productDetail.FAT === null
                      ? "Đang cập nhật"
                      : tongThanhPhanChinh.FAT + "g"}
                  </strong>
                </p>
              </div>
              <div className="flex flex-1">
                <span className="text">Carbohydrate: </span>
                <p className="product_book_ngayxb mg-l-10">
                  <strong>
                    {productDetail.CHOCDF === null
                      ? "Đang cập nhật"
                      : tongThanhPhanChinh.CHOCDF + "g"}
                  </strong>
                </p>
              </div>
            </div>

            <div className="row_product">
              <div className="flex-1cham5 flex">
                <span className="text">Hàm lượng nước: </span>
                <p className="product_book_nxb mg-l-10">
                  <strong>
                    {productDetail.WATER === null
                      ? "Đang cập nhật"
                      : tongThanhPhanChinh.WATER + "g"}
                  </strong>
                </p>
              </div>
              <div className="flex flex-1">
                <span className="text">Canxi: </span>
                <p className="product_book_ngayxb mg-l-10">
                  <strong>
                    {productDetail.CA === null
                      ? "Đang cập nhật"
                      : tongThanhPhanChinh.CA}
                  </strong>
                </p>
              </div>
            </div>

            <div className="product_book_price">
              <div>
                {productDetail.ENERC === null
                  ? "Đang cập nhật"
                  : Number(tongThanhPhanChinh.ENERC).toLocaleString("vi") +
                    " Calo"}
              </div>
            </div>

            <div>
              <table className="table" style={{ width: "50%" }}>
                <thead className="thead-dark">
                  <tr style={{ textAlign: "center" }}>
                    <th scope="col" style={{ fontWeight: 400 }}>
                      Số lượng (g)
                    </th>
                    <th scope="col" style={{ fontWeight: 400 }}>
                      Thêm
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      style={{ display: "inline-block", padding: "10px 0px" }}
                    >
                      <div id="form_add">
                        <input
                          type="number"
                          id="quanty_input"
                          name="quanty"
                          className="form-control"
                          style={{ width: "100%" }}
                          defaultValue={100}
                          min={1}
                          max={2000}
                          onInput={(e) => setAmountBuy(e.target.value)}
                        />
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "8px 0px",
                      }}
                    >
                      <button
                        onClick={() => handleAddToCartHasAmount()}
                        type="button"
                        id="btn_add_to_cart"
                        className="btn btn-success"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                          justifyContent: "center",
                          padding: "7px 0",
                        }}
                      >
                        <i
                          className="fas fa-plus-circle"
                          style={{ margin: "0px 5px" }}
                        />
                        <span style={{ fontWeight: 400 }}>
                          Thêm vào danh sách
                        </span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>{" "}
            </div>
          </div>
        </div>
      </div>
      {!loading && (
        <ThucPhamDescription
          tenMon={productDetail.TenTiengViet || productDetail.TenTiengAnh}
          tongThanhPhanChinh={tongThanhPhanChinh}
          quantyInput={amount_buy}
        />
      )}
    </Fragment>
  );
}
