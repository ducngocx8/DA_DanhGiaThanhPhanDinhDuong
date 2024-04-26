import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { Title, noImage, notify } from "../../../Utils/Title";
import { Link, useNavigate } from "react-router-dom";
import {
  BACKEND_HOME,
  NgayAnURL,
  khuyenNghiURL,
  mucTieuTheoNgayURL,
} from "../../../api";
import { thanhPhanDinhDuongMonAn } from "../../../Utils/caculate";
import FoodCaculateDetail from "./FoodCaculateDetail";
import UserSearchMonAn from "./UserSearchMonAn";
export default function Nutrition() {
  let navigate = useNavigate();
  let [loading, isLoading] = useState(true);
  let [ngayAnList, setNgayAnList] = useState([]);
  let [goiYList, setGoiYList] = useState({
    data: null,
    message: "",
    tong_thanh_phan: {},
    run: false,
  });
  let [showBuaAnDetail, setShowBuaAnDetail] = useState(false);
  let [infoNgayAnEdit, setInfoNgayAnEdit] = useState(false);
  let [quantyNgayAnEdit, setQuantyNgayAnEdit] = useState("");
  let [dateSelected, setDateSelected] = useState(() => {
    const date = new Date();
    const date_string =
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0");
    return date_string;
  });
  let [tongThanhPhanDinhDuong, setTongThanhPhanDinhDuong] = useState({});
  let [khuyenNghi, setKhuyenNghi] = useState({
    data: null,
    must: "",
    type: "",
    message: "",
  });

  let [mucTieu, setMucTieu] = useState({
    data: null,
    must: "",
    type: "",
    show: false,
    message: "",
  });

  const handleSetInfoNgayAnEdit = (ngay_an) => {
    if (ngay_an.ngayan_id !== infoNgayAnEdit.ngayan_id) {
      setInfoNgayAnEdit(ngay_an);
      setQuantyNgayAnEdit(Number(ngay_an.quanty) * 1);
    }
  };

  const handleCopyMonAn = async () => {
    const ngay_an = {
      timeCopy: dateSelected,
    };
    const response = await axios.post(`${NgayAnURL + "/copy"}`, ngay_an, {
      withCredentials: true,
    });
    notify(response.data.status, response.data.message);
    if (response.data.status) {
      // const date = new Date();
      // const date_string =
      // date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      // setDateSelected(date_string);
      setNgayAnList(response.data.data);
    } else {
      if (response.data.must === "login") {
        return navigate("/account/login", { replace: true });
      }
    }
  };

  const handleDoiGoiYMonAn = async () => {
    const response = await axios.get(`${NgayAnURL}/goi-y`, {
      withCredentials: true,
    });
    if (response.data.status) {
      setGoiYList({
        data: response.data.data,
        tong_thanh_phan: response.data.tong_thanh_phan,
        message: "",
        run: true,
      });
    } else {
      setGoiYList({
        data: null,
        tong_thanh_phan: null,
        message: response.data.message,
        run: true,
      });
      if (response.data.must === "login") {
        return navigate("/account/login", { replace: true });
      }
    }
  };

  useEffect(() => {
    const newtongThanhPhanChinh = {
      ENERC: 0,
      PROCNT: 0,
      FAT: 0,
      CHOCDF: 0,
    };
    ngayAnList.forEach((ngay_an) => {
      ngay_an.MonAn?.ChiTietMons?.forEach((item) => {
        for (const [key, value] of Object.entries(item.ThucPham)) {
          if (["ENERC", "PROCNT", "FAT", "CHOCDF"].includes(key)) {
            if (typeof Number(value) === "number") {
              newtongThanhPhanChinh[key] =
                Number(newtongThanhPhanChinh[key]) +
                (Number(value) * Number(item.quanty) * Number(ngay_an.quanty)) /
                  100;
            }
          }
        }
      });
    });

    for (const [key, value] of Object.entries(newtongThanhPhanChinh)) {
      newtongThanhPhanChinh[key] = Number(value).toFixed(0) * 1;
    }
    setTongThanhPhanDinhDuong({ ...newtongThanhPhanChinh });
  }, [ngayAnList]);

  const closeShowBuaAnDetail = () => {
    setShowBuaAnDetail(false);
  };

  const handleChangeTime = (e) => {
    const { value } = e.target;
    const date = new Date(Number(Date.parse(value)));
    const date_string =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    setDateSelected(date_string);
  };

  const handleChangeAmount = async (e, item) => {
    let { value } = e.target;
    value = Number(value);
    if (dateSelected.includes("a")) {
      notify(false, "Ngày ăn không hợp lệ.");
      return;
    }
    if (!isNaN(value) && value > 0) {
      const ngayan_id = item.ngayan_id;
      const ngay_an = {
        bua_an_id: item.bua_an_id,
        id_monan: item.id_monan,
        quanty: value,
        time: dateSelected,
      };
      const response = await axios.put(
        `${NgayAnURL + "/" + ngayan_id}`,
        ngay_an,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        setNgayAnList(response.data.data);
        // notify(true, response.data.message);
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigate("/account/login", { replace: true });
        }
      }
    }
  };

  const handleRemoveItem = async (item) => {
    const ngayan_id = item.ngayan_id;
    const response = await axios.delete(`${NgayAnURL + "/" + ngayan_id}`, {
      withCredentials: true,
    });
    notify(response.data.status, response.data.message);
    if (response.data.status) {
      setNgayAnList(response.data.data);
    } else {
      if (response.data.must === "login") {
        return navigate("/account/login", { replace: true });
      }
    }
  };

  useEffect(() => {
    document.title = Title.user_nutrition + Title.origin;
  }, []);

  const getNgayAnSelected = async () => {
    if (!dateSelected) {
      notify(false, "Ngày xem không hợp lệ.");
      return;
    }

    const response = await axios.get(`${NgayAnURL + "?date=" + dateSelected}`, {
      withCredentials: true,
    });
    if (response.data.status) {
      setNgayAnList(response.data.data);
      setMucTieu({ ...mucTieu, show: false });
    } else {
      notify(false, response.data.message);
      if (response.data.must === "login") {
        return navigate("/account/login", { replace: true });
      }
    }
  };

  useEffect(() => {
    async function getNgayAnCurrent() {
      const response = await axios.get(`${NgayAnURL}`, {
        withCredentials: true,
      });
      if (response.data.status) {
        setNgayAnList(response.data.data);
        isLoading(false);
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigate("/account/login", { replace: true });
        }
      }
    }

    const getKhuyenNghi = async () => {
      const response = await axios.get(`${khuyenNghiURL}`, {
        withCredentials: true,
      });
      if (response.data.status) {
        setKhuyenNghi({
          // ...khuyenNghi,
          data: response.data.data,
          type: response.data.type,
          must: response.data.must || "",
          message: response.data.message || "",
        });
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigate("/account/login", { replace: true });
        }
      }
    };

    async function getGoiY() {
      const response = await axios.get(`${NgayAnURL}/goi-y`, {
        withCredentials: true,
      });
      if (response.data.status) {
        setGoiYList({
          data: response.data.data,
          tong_thanh_phan: response.data.tong_thanh_phan,
          message: "",
          run: true,
        });
      } else {
        setGoiYList({
          data: null,
          tong_thanh_phan: null,
          message: response.data.message,
          run: true,
        });
        if (response.data.must === "login") {
          return navigate("/account/login", { replace: true });
        }
      }
    }

    const getAll = async () => {
      await Promise.all([
        Promise.resolve(getKhuyenNghi()),
        Promise.resolve(getNgayAnCurrent()),
        Promise.resolve(getGoiY()),
      ]);
    };

    getAll();
  }, [navigate]);

  const reloadData = (data) => {
    setNgayAnList(data);
  };

  const getMucTieuTheoNgay = async () => {
    if (!dateSelected) {
      notify(false, "Ngày xem không hợp lệ.");
      return;
    }
    if (mucTieu.show) {
      setMucTieu({ ...mucTieu, show: false });
      return;
    }
    const response = await axios.get(
      `${mucTieuTheoNgayURL + "?date=" + dateSelected}`,
      {
        withCredentials: true,
      }
    );
    if (response.data.status) {
      setMucTieu({
        ...mucTieu,
        show: true,
        data: response.data.data,
        type: response.data.type,
        must: response.data.must || "",
        message: response.data.message || "",
      });
    } else {
      notify(false, response.data.message);
      if (response.data.must === "login") {
        return navigate("/account/login", { replace: true });
      }
    }
  };

  const renderMotBuaAn = (buaAn) => {
    let tongThanhPhanCuaBuaAn = {};

    return (
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>STT</th>
            <th style={{ width: 100 }}>Hình ảnh</th>
            <th>Tên món ăn</th>
            <th style={{ width: "10%" }}>Số lượng</th>
            <th>Cập nhật</th>
            <th>Năng lượng</th>
            <th>Chất đạm</th>
            <th>Chất béo</th>
            <th>Carbohydrate</th>
            <th>Chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {buaAn.map((item, index) => {
            const tpDinhDuongMonAn = thanhPhanDinhDuongMonAn(
              item.MonAn,
              Number(item.quanty)
            );
            for (const [key, value] of Object.entries(tpDinhDuongMonAn)) {
              tongThanhPhanCuaBuaAn[key] = (
                (Number(tongThanhPhanCuaBuaAn[key]) || 0) + Number(value)
              ).toFixed(3);
            }
            if (index === buaAn.length - 1) {
              return (
                <Fragment key={index}>
                  <tr className="table-white">
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={
                          item?.MonAn?.image_url
                            ? BACKEND_HOME + item?.MonAn?.image_url
                            : noImage
                        }
                        alt="product"
                        style={{ height: 100, width: "auto" }}
                      />
                    </td>
                    <td className="cart_book_name">{item.MonAn.ten_mon}</td>
                    <td>
                      {Number(infoNgayAnEdit.ngayan_id) ===
                      Number(item.ngayan_id) ? (
                        <div className="form_edit">
                          <input
                            style={{ textAlign: "center" }}
                            min={1}
                            max={10}
                            className="form-control edit_quanty_input"
                            type="number"
                            name="quanty"
                            defaultValue={quantyNgayAnEdit}
                            onChange={(e) => handleChangeAmount(e, item)}
                          />
                        </div>
                      ) : (
                        Number(item.quanty) * 1
                      )}
                    </td>
                    <td>
                      {Number(infoNgayAnEdit.ngayan_id) ===
                      Number(item.ngayan_id) ? (
                        <button
                          onClick={() => {
                            setInfoNgayAnEdit(false);
                            setQuantyNgayAnEdit("");
                          }}
                          type="button"
                          className="btn btn-success m-1 btn_edit"
                        >
                          <i className="far fa-save" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleSetInfoNgayAnEdit(item)}
                          type="button"
                          className="btn btn-warning m-1 btn_edit"
                        >
                          <i className="far fa-edit" />
                        </button>
                      )}
                    </td>
                    <td>{tpDinhDuongMonAn.ENERC.toLocaleString("vi")} KCal</td>
                    <td>
                      {Number(tpDinhDuongMonAn.PROCNT).toLocaleString("vi") +
                        "g"}
                    </td>
                    <td>
                      {Number(tpDinhDuongMonAn.FAT).toLocaleString("vi") + "g"}
                    </td>
                    <td className="cart_book_name">
                      {Number(tpDinhDuongMonAn.CHOCDF).toLocaleString("vi") +
                        "g"}
                    </td>
                    <td>
                      <button
                        style={{ marginRight: 5 }}
                        type="submit"
                        className="btn btn-danger btn_delete_cart"
                        onClick={() => handleRemoveItem(item)}
                      >
                        Xóa
                      </button>
                      <button className="btn btn-primary">
                        <Link
                          to={"/product/" + item.id_monan}
                          style={{
                            textDecoration: "none",
                            color: "#fff",
                          }}
                        >
                          Chi tiết
                        </Link>
                      </button>
                    </td>
                  </tr>

                  <tr className="table-white">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Tổng</td>
                    <td>
                      {(Number(tongThanhPhanCuaBuaAn.ENERC) * 1).toLocaleString(
                        "vi"
                      )}{" "}
                      KCal
                    </td>
                    <td>
                      {Number(tongThanhPhanCuaBuaAn.PROCNT * 1).toLocaleString(
                        "vi"
                      ) + "g"}
                    </td>
                    <td>
                      {Number(tongThanhPhanCuaBuaAn.FAT * 1).toLocaleString(
                        "vi"
                      ) + "g"}
                    </td>
                    <td className="cart_book_name">
                      {Number(tongThanhPhanCuaBuaAn.CHOCDF * 1).toLocaleString(
                        "vi"
                      ) + "g"}
                    </td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          setShowBuaAnDetail(tongThanhPhanCuaBuaAn);
                        }}
                      >
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                </Fragment>
              );
            } else {
              return (
                <tr key={index} className="table-white">
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={
                        item?.MonAn?.image_url
                          ? BACKEND_HOME + item?.MonAn?.image_url
                          : noImage
                      }
                      alt="product"
                      style={{ width: 140, height: "auto" }}
                    />
                  </td>
                  <td>{item.MonAn.ten_mon}</td>
                  <td>
                    {Number(infoNgayAnEdit.ngayan_id) ===
                    Number(item.ngayan_id) ? (
                      <div className="form_edit">
                        <input
                          style={{ textAlign: "center" }}
                          min={1}
                          max={10}
                          className="form-control edit_quanty_input"
                          type="number"
                          name="quanty"
                          defaultValue={quantyNgayAnEdit}
                          onChange={(e) => handleChangeAmount(e, item)}
                        />
                      </div>
                    ) : (
                      Number(item.quanty) * 1
                    )}
                  </td>
                  <td>
                    {Number(infoNgayAnEdit.ngayan_id) ===
                    Number(item.ngayan_id) ? (
                      <button
                        onClick={() => {
                          setInfoNgayAnEdit(false);
                          setQuantyNgayAnEdit("");
                        }}
                        type="button"
                        className="btn btn-success m-1 btn_edit"
                      >
                        <i className="far fa-save" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSetInfoNgayAnEdit(item)}
                        type="button"
                        className="btn btn-warning m-1 btn_edit"
                      >
                        <i className="far fa-edit" />
                      </button>
                    )}
                  </td>
                  <td>{tpDinhDuongMonAn.ENERC.toLocaleString("vi")} KCal</td>
                  <td>
                    {Number(tpDinhDuongMonAn.PROCNT).toLocaleString("vi") + "g"}
                  </td>

                  <td>
                    {Number(tpDinhDuongMonAn.FAT).toLocaleString("vi") + "g"}
                  </td>
                  <td className="cart_book_name">
                    {Number(tpDinhDuongMonAn.CHOCDF).toLocaleString("vi") + "g"}
                  </td>

                  <td>
                    <button
                      style={{ marginRight: 5 }}
                      type="submit"
                      className="btn btn-danger btn_delete_cart"
                      onClick={() => handleRemoveItem(item)}
                    >
                      Xóa
                    </button>
                    <button className="btn btn-primary">
                      <Link
                        to={"/product/" + item.id_monan}
                        style={{
                          textDecoration: "none",
                          color: "#fff",
                        }}
                      >
                        Chi tiết
                      </Link>
                    </button>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    );
  };

  const renderMucTieu = () => {
    if (mucTieu.must !== "") {
      return (
        <p style={{ textAlign: "center", color: "red", margin: "10px 0" }}>
          {mucTieu.message + ", "}{" "}
          <Link style={{ textDecoration: "none" }} to={"/account/muc-tieu"}>
            Tạo ngay
          </Link>
        </p>
      );
    } else {
      if (mucTieu.data === null) {
        return (
          <p style={{ textAlign: "center", color: "red", margin: "10px 0" }}>
            {mucTieu.message}
          </p>
        );
      } else {
        return (
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            {/* Năng lượng */}
            <div
              style={{
                width: "20%",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                }}
              >
                <div>Năng lượng</div>
                <div>
                  {tongThanhPhanDinhDuong.ENERC}/{mucTieu.data.ENERC} KCal
                </div>
              </div>
              <div
                style={{
                  position: "relative",
                  marginTop: 5,
                }}
              >
                <div
                  style={{
                    height: 15,
                    backgroundColor: "#eee",
                    borderRadius: 5,
                  }}
                ></div>
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right:
                      tongThanhPhanDinhDuong.ENERC - mucTieu.data.ENERC >= 0
                        ? 0
                        : 100 -
                          (tongThanhPhanDinhDuong.ENERC / mucTieu.data.ENERC) *
                            100 +
                          "%",
                    backgroundColor: "rgb(0, 227, 150)",
                    borderRadius: 5,
                  }}
                ></div>
              </div>
              <div
                style={{
                  textAlign: "center",
                  marginTop: 5,
                }}
              >
                {tongThanhPhanDinhDuong.ENERC - mucTieu.data.ENERC > 0
                  ? `Thừa: ${
                      tongThanhPhanDinhDuong.ENERC - mucTieu.data.ENERC
                    } KCal`
                  : tongThanhPhanDinhDuong.ENERC - mucTieu.data.ENERC < 0
                  ? `Thiếu: ${
                      mucTieu.data.ENERC - tongThanhPhanDinhDuong.ENERC
                    } KCal`
                  : "Đủ"}
              </div>
            </div>
            {/* Protein */}
            <div
              style={{
                width: "20%",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                }}
              >
                <div>Protein</div>
                <div>
                  {tongThanhPhanDinhDuong.PROCNT}/{mucTieu.data.PROCNT} g
                </div>
              </div>
              <div
                style={{
                  position: "relative",
                  marginTop: 5,
                }}
              >
                <div
                  style={{
                    height: 15,
                    backgroundColor: "#eee",
                    borderRadius: 5,
                  }}
                ></div>
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right:
                      tongThanhPhanDinhDuong.PROCNT - mucTieu.data.PROCNT >= 0
                        ? 0
                        : 100 -
                          (tongThanhPhanDinhDuong.PROCNT /
                            mucTieu.data.PROCNT) *
                            100 +
                          "%",
                    backgroundColor: "rgb(0, 227, 150)",
                    borderRadius: 5,
                  }}
                ></div>
              </div>
              <div
                style={{
                  textAlign: "center",
                  marginTop: 5,
                }}
              >
                {tongThanhPhanDinhDuong.PROCNT - mucTieu.data.PROCNT > 0
                  ? `Thừa: ${
                      tongThanhPhanDinhDuong.PROCNT - mucTieu.data.PROCNT
                    } g`
                  : tongThanhPhanDinhDuong.PROCNT - mucTieu.data.PROCNT < 0
                  ? `Thiếu: ${
                      mucTieu.data.PROCNT - tongThanhPhanDinhDuong.PROCNT
                    } g`
                  : "Đủ"}
              </div>
            </div>
            {/* Chất béo */}
            <div
              style={{
                width: "20%",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                }}
              >
                <div>Chất béo</div>
                <div>
                  {tongThanhPhanDinhDuong.FAT}/{mucTieu.data.FAT} g
                </div>
              </div>
              <div
                style={{
                  position: "relative",
                  marginTop: 5,
                }}
              >
                <div
                  style={{
                    height: 15,
                    backgroundColor: "#eee",
                    borderRadius: 5,
                  }}
                ></div>
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right:
                      tongThanhPhanDinhDuong.FAT - mucTieu.data.FAT >= 0
                        ? 0
                        : 100 -
                          (tongThanhPhanDinhDuong.FAT / mucTieu.data.FAT) *
                            100 +
                          "%",
                    backgroundColor: "rgb(0, 227, 150)",
                    borderRadius: 5,
                  }}
                ></div>
              </div>
              <div
                style={{
                  textAlign: "center",
                  marginTop: 5,
                }}
              >
                {tongThanhPhanDinhDuong.FAT - mucTieu.data.FAT > 0
                  ? `Thừa: ${tongThanhPhanDinhDuong.FAT - mucTieu.data.FAT} g`
                  : tongThanhPhanDinhDuong.FAT - mucTieu.data.FAT < 0
                  ? `Thiếu: ${mucTieu.data.FAT - tongThanhPhanDinhDuong.FAT} g`
                  : "Đủ"}
              </div>
            </div>
            {/* Carbohydrate */}
            <div
              style={{
                width: "20%",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                }}
              >
                <div>Carbohydrate</div>
                <div>
                  {tongThanhPhanDinhDuong.CHOCDF}/{mucTieu.data.CHOCDF} g
                </div>
              </div>
              <div
                style={{
                  position: "relative",
                  marginTop: 5,
                }}
              >
                <div
                  style={{
                    height: 15,
                    backgroundColor: "#eee",
                    borderRadius: 5,
                  }}
                ></div>
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right:
                      tongThanhPhanDinhDuong.CHOCDF - mucTieu.data.CHOCDF >= 0
                        ? 0
                        : 100 -
                          (tongThanhPhanDinhDuong.CHOCDF /
                            mucTieu.data.CHOCDF) *
                            100 +
                          "%",
                    backgroundColor: "rgb(0, 227, 150)",
                    borderRadius: 5,
                  }}
                ></div>
              </div>
              <div
                style={{
                  textAlign: "center",
                  marginTop: 5,
                }}
              >
                {tongThanhPhanDinhDuong.CHOCDF - mucTieu.data.CHOCDF > 0
                  ? `Thừa: ${
                      tongThanhPhanDinhDuong.CHOCDF - mucTieu.data.CHOCDF
                    } g`
                  : tongThanhPhanDinhDuong.CHOCDF - mucTieu.data.CHOCDF < 0
                  ? `Thiếu: ${
                      mucTieu.data.CHOCDF - tongThanhPhanDinhDuong.CHOCDF
                    } g`
                  : "Đủ"}
              </div>
            </div>
          </div>
        );
      }
    }
  };

  return (
    <>
      {!loading && (
        <div id="main">
          {showBuaAnDetail && (
            <div
              className="background_black"
              id="background_black"
              style={{ display: "block" }}
            >
              {showBuaAnDetail && (
                <FoodCaculateDetail
                  closeForm={closeShowBuaAnDetail}
                  tongThanhPhanChinh={showBuaAnDetail}
                />
              )}
            </div>
          )}
          <div className="page-content">
            <section className="row">
              <div className="col-12 col-lg-12">
                <div className="row">
                  <div className="col-12">
                    <div
                      className="col-lg-12 stretch-card"
                      style={{ padding: 0 }}
                    >
                      <div className="card">
                        <div className="card-body">
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <h4
                                className="card-title"
                                style={{ marginBottom: "0 !important" }}
                              >
                                Khẩu phần ăn trong ngày
                              </h4>
                              <div
                                style={{
                                  marginLeft: 10,
                                }}
                              >
                                <input
                                  className="form-control"
                                  id="datepickerfrom_start"
                                  type="date"
                                  onChange={(e) => handleChangeTime(e)}
                                  defaultValue={dateSelected}
                                />
                              </div>

                              <button
                                onClick={() => getNgayAnSelected()}
                                className="btn btn-success"
                                style={{
                                  marginLeft: 10,
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <i className="fas fa-search text-white" />
                              </button>
                            </div>

                            <div>
                              <button
                                className="btn btn-success"
                                onClick={() => {
                                  handleCopyMonAn();
                                }}
                              >
                                Copy món ăn
                              </button>
                              <button
                                className="btn btn-primary"
                                style={{
                                  marginLeft: 10,
                                }}
                                onClick={() => {
                                  getMucTieuTheoNgay();
                                }}
                              >
                                Xem mục tiêu
                              </button>
                            </div>
                          </div>
                          {/* Chart container */}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              margin: "10px 0px",
                            }}
                          >
                            {/* Chart Calo */}
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                marginRight: 40,
                              }}
                            >
                              <div
                                style={{
                                  width: 150,
                                  height: 150,
                                  borderRadius: "50%",
                                  border: "15px solid rgb(0, 227, 150)",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "column",
                                    width: "100%",
                                    height: "100%",
                                  }}
                                >
                                  <div
                                    style={{
                                      fontSize: 30,
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {tongThanhPhanDinhDuong.ENERC.toLocaleString(
                                      "vi"
                                    )}
                                  </div>
                                  <span>Năng Lượng</span>
                                </div>
                              </div>
                            </div>

                            {/* Chart khuyến nghị */}
                            {khuyenNghi?.data?.ThanhPhanNhuCau?.NangLuong && (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <div
                                  style={{
                                    width: 150,
                                    height: 150,
                                    borderRadius: "50%",
                                    border: "15px solid #007bff",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      flexDirection: "column",
                                      width: "100%",
                                      height: "100%",
                                    }}
                                  >
                                    <div
                                      style={{
                                        fontSize: 15,
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {khuyenNghi.data.ThanhPhanNhuCau.NangLuong.trim()}
                                    </div>
                                    <span
                                      style={{
                                        marginTop: 5,
                                      }}
                                    >
                                      Khuyến Nghị
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Render Mục tiêu */}
                          {mucTieu.show && renderMucTieu()}
                          {/* Render tìm kiếm món ăn */}
                          <UserSearchMonAn
                            time={dateSelected}
                            reloadData={reloadData}
                          />

                          <div>
                            {!goiYList.data && goiYList.run ? (
                              <div>
                                <p style={{ color: "red" }}>
                                  {"Thông báo: " + goiYList.message}
                                </p>
                                <button
                                  className="btn btn-success"
                                  onClick={() => {
                                    handleDoiGoiYMonAn();
                                  }}
                                >
                                  Tải lại
                                </button>
                              </div>
                            ) : goiYList.data && goiYList.run ? (
                              <div>
                                <p>Gợi ý hôm nay:</p>
                                <p>
                                  Tổng khẩu phần ăn:{" "}
                                  {goiYList.tong_thanh_phan.TOTAL_ENERC} KCal,{" "}
                                  {goiYList.tong_thanh_phan.TOTAL_PROCNT}g
                                  Protein, {goiYList.tong_thanh_phan.TOTAL_FAT}g
                                  Chất béo,{" "}
                                  {goiYList.tong_thanh_phan.TOTAL_CHOCDF}g
                                  Carbohydrate
                                </p>
                                <div>
                                  {goiYList.data.map((item, index) => {
                                    return (
                                      <p key={index}>
                                        + {item.quanty} {item.don_vi}{" "}
                                        <Link
                                          to={"/product/" + item.id_monan}
                                          style={{
                                            textDecoration: "none",
                                          }}
                                        >
                                          {item.ten_mon}
                                        </Link>
                                      </p>
                                    );
                                  })}
                                </div>
                                <button
                                  className="btn btn-success"
                                  onClick={() => {
                                    handleDoiGoiYMonAn();
                                  }}
                                >
                                  Đổi món
                                </button>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>

                          {/* Buổi sáng */}
                          <div id="table_load">
                            <div className="table-responsive pt-3">
                              <p>Buổi sáng</p>

                              {renderMotBuaAn(
                                ngayAnList.filter(
                                  (one) => one.BuaAn.bua_an_id === 1
                                )
                              )}
                            </div>
                          </div>
                          {/* Kết thúc buổi sáng */}

                          {/* Buổi trưa */}
                          <div id="table_load">
                            <div className="table-responsive pt-3">
                              <p>Buổi trưa</p>

                              {renderMotBuaAn(
                                ngayAnList.filter(
                                  (one) => one.BuaAn.bua_an_id === 2
                                )
                              )}
                            </div>
                          </div>
                          {/* Kết thúc buổi trưa */}

                          {/* Buổi tối */}
                          <div id="table_load">
                            <div className="table-responsive pt-3">
                              <p>Buổi tối</p>
                              {renderMotBuaAn(
                                ngayAnList.filter(
                                  (one) => one.BuaAn.bua_an_id === 3
                                )
                              )}
                            </div>
                          </div>
                          {/* Kết thúc buổi tối */}

                          {/* Buổi phụ */}
                          <div id="table_load">
                            <div className="table-responsive pt-3">
                              <p>Buổi phụ</p>
                              {renderMotBuaAn(
                                ngayAnList.filter(
                                  (one) => one.BuaAn.bua_an_id === 4
                                )
                              )}
                            </div>
                          </div>
                          {/* Kết thúc buổi phụ */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}
