import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { noImage, notify } from "../../../Utils/Title";
import {
  BACKEND_HOME,
  BuaAnURL,
  MonAnYeuThichURL,
  NgayAnURL,
} from "../../../api";
import ProductDescription from "./ProductDescription";

export default function ProductInfo({ productDetail }) {
  let [loading, isLoading] = useState(true);
  let [amount_buy, setAmountBuy] = useState(1);
  let [buaAnList, setBuaAnList] = useState([]);
  let [time, setTime] = useState(() => {
    const date = new Date();
    const date_string =
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0");
    return date_string;
  });

  let [buaAnChoose, setBuaAnChoose] = useState(false);
  let [favourite, setFavourite] = useState(false);
  const [tongThanhPhanChinh, setTongThanhPhanChinh] = useState({});
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const handleAddToCartHasAmount = async () => {
    if (!buaAnChoose) {
      notify(false, "Vui lòng chọn bữa ăn.");
      return;
    }
    const value = Number(amount_buy);
    if (value <= 0 || isNaN(Number(value))) {
      notify(false, "Số lượng không hợp lệ.");
      return;
    }
    if (time.includes("a")) {
      notify(false, "Vui lòng chọn ngày ăn");
      return;
    }
    const ngay_an = {
      bua_an_id: buaAnChoose,
      id_monan: productDetail.id_monan,
      time: time,
      quanty: value,
    };
    const response = await axios.post(`${NgayAnURL}`, ngay_an, {
      withCredentials: true,
    });
    if (response.data.status) {
      notify(true, response.data.message);
      dispatch({
        type: "load_cart",
        value: response.data.data,
      });
    } else {
      notify(false, response.data.message);
      if (response.data.must === "login") {
        return navigate("/account/login", { replace: true });
      }
    }
  };

  const handleChangeTime = (e) => {
    const { value } = e.target;
    const date = new Date(Number(Date.parse(value)));
    const date_string =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    console.log(date_string);
    setTime(date_string);
  };

  const handleYeuThichMonAn = async () => {
    const yeu_thich = {
      id_monan: productDetail.id_monan,
    };
    const response = await axios.post(`${MonAnYeuThichURL}`, yeu_thich, {
      withCredentials: true,
    });
    if (response.data.status) {
      if (response.data.type === "ADD") {
        setFavourite(true);
      } else {
        setFavourite(false);
      }
    }
    notify(response.data.status, response.data.message);
  };

  useEffect(() => {
    const getAllBuaAn = async () => {
      const response = await axios.get(`${BuaAnURL}`, {
        withCredentials: true,
      });
      setBuaAnList(response.data.data);
    };

    const checkFavourite = async () => {
      const response = await axios.get(
        `${MonAnYeuThichURL + "/check/" + productDetail.id_monan}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        if (response.data.data) {
          setFavourite(true);
        } else {
          setFavourite(false);
        }
      } else {
        setFavourite(false);
      }
    };

    const handleAPIAll = async () => {
      await Promise.all([Promise.resolve(getAllBuaAn())]);
      await Promise.all([Promise.resolve(checkFavourite())]);
    };
    handleAPIAll();
  }, [productDetail]);

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
    let quantyInput = 1;
    if (typeof Number(amount_buy) === "number") {
      quantyInput = Number(amount_buy);
    }
    productDetail?.ChiTietMons?.forEach((item) => {
      newtongThanhPhanChinh["ThanhPhan"].push({
        ten_phannhom: item.ten_phannhom,
        quanty: item.quanty,
        id_thucpham: item.id_thucpham,
        TenTiengAnh: item.ThucPham.TenTiengAnh,
        TenTiengViet: item.ThucPham.TenTiengViet,
      });
      for (const [key, value] of Object.entries(item.ThucPham)) {
        if (
          ![
            "id_thucpham",
            "TenTiengAnh",
            "TenTiengViet",
            "DonViTinh",
            "id_nhomthucpham",
            "image_url",
            "thucpham_status",
            "createdAt",
            "updatedAt",
          ].includes(key)
        ) {
          if (typeof Number(value) === "number") {
            newtongThanhPhanChinh[key] =
              Number(newtongThanhPhanChinh[key]) +
              (Number(value) * Number(item.quanty)) / 100;
          }
        }
      }
    });
    for (const [key, value] of Object.entries(newtongThanhPhanChinh)) {
      if (
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
          (Number(value) * quantyInput).toFixed(0) * 1;
      } else if (["WATER"].includes(key)) {
        newtongThanhPhanChinh[key] =
          (Number(value) * quantyInput).toFixed(1) * 1;
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
          (Number(value) * quantyInput).toFixed(2) * 1;
      } else if (
        ["MN", "CU", "THIA", "RIBF", "NIA", "PANTAC", "VITB6"].includes(key)
      ) {
        newtongThanhPhanChinh[key] =
          (Number(value) * quantyInput).toFixed(3) * 1;
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <h2
                style={{
                  fontWeight: 600,
                  margin: 0,
                }}
                className="product_book_title"
              >
                {productDetail.ten_mon}
              </h2>
              <i
                onClick={() => {
                  handleYeuThichMonAn();
                }}
                style={{
                  color: favourite ? "red" : "gray",
                  fontSize: 25,
                  marginLeft: 10,
                  cursor: "pointer",
                }}
                className="fa fa-heart"
              />
            </div>
            <div className="row_product">
              <div className="flex flex-1cham5">
                <span className="text">Danh mục: </span>
                <p className="product_book_author mg-l-10">
                  <strong>
                    <Link
                      to={"/category/" + productDetail.NhomMonAn.id_nhommonan}
                    >
                      {productDetail.NhomMonAn.ten_nhom}
                    </Link>
                  </strong>
                </p>
              </div>
              <div className="flex flex-1">
                <span className="text">Chất đạm: </span>
                <p className="product_book_category mg-l-10">
                  <strong>{tongThanhPhanChinh.PROCNT + "g"}</strong>
                </p>
              </div>
            </div>
            <div className="row_product">
              <div className="flex-1cham5 flex">
                <span className="text">Chất béo: </span>
                <p className="product_book_nxb mg-l-10">
                  <strong>{tongThanhPhanChinh.FAT}g</strong>
                </p>
              </div>
              <div className="flex flex-1">
                <span className="text">Carbohydrate: </span>
                <p className="product_book_ngayxb mg-l-10">
                  <strong>{tongThanhPhanChinh.CHOCDF}g</strong>
                </p>
              </div>
            </div>

            <div className="row_product">
              <div className="flex-1cham5 flex">
                <span className="text">Hàm lượng nước: </span>
                <p className="product_book_nxb mg-l-10">
                  <strong>{tongThanhPhanChinh.WATER}g</strong>
                </p>
              </div>
              <div className="flex flex-1">
                <span className="text">Canxi: </span>
                <p className="product_book_ngayxb mg-l-10">
                  <strong>{tongThanhPhanChinh.CA}</strong>
                </p>
              </div>
            </div>

            <div className="product_book_price">
              <div>
                {Number(tongThanhPhanChinh.ENERC).toLocaleString("vi") +
                  " Calo"}
              </div>
            </div>

            <div className="product_size">
              <span>Bữa ăn: </span>
              <div className="size_items">
                {buaAnList.map((buaAn, index) => {
                  return (
                    <div
                      style={{}}
                      key={index}
                      className={
                        Number(buaAnChoose) === Number(buaAn.bua_an_id)
                          ? "size_selected"
                          : ""
                      }
                      onClick={() => setBuaAnChoose(buaAn.bua_an_id)}
                    >
                      {buaAn.ten_bua_an}
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className="product_ngayan"
              style={{
                display: "flex",
                alignItems: "center",
                margin: "10px 0px",
              }}
            >
              <span
                style={{
                  whiteSpace: "nowrap",
                  marginRight: 10,
                }}
              >
                Ngày ăn:
              </span>
              <input
                style={{
                  width: "auto",
                }}
                className="form-control"
                type="date"
                onChange={(e) => handleChangeTime(e)}
                defaultValue={time}
              />
            </div>
            <div>
              <table className="table" style={{ width: "50%" }}>
                <thead className="thead-dark">
                  <tr style={{ textAlign: "center" }}>
                    <th scope="col" style={{ fontWeight: 400 }}>
                      Phần ăn
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
                          defaultValue={1}
                          min={1}
                          max={200}
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
                          padding: "7px 20px",
                        }}
                      >
                        <i
                          className="fas fa-plus-circle"
                          style={{ margin: "0px 5px" }}
                        />
                        <span style={{ fontWeight: 400 }}>Thêm vào bữa ăn</span>
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
        <ProductDescription
          tenMon={productDetail.ten_mon}
          tongThanhPhanChinh={tongThanhPhanChinh}
          don_vi={productDetail.don_vi}
          quantyInput={amount_buy}
        />
      )}
    </Fragment>
  );
}
