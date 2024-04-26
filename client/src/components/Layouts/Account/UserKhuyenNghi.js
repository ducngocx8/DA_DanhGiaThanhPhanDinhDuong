import React, { useEffect, useState } from "react";
import UserStatistic from "./UserStatistic";
import axios from "axios";
import { khuyenNghiURL } from "../../../api";
import { Title, notify } from "../../../Utils/Title";
import { Link, useNavigate } from "react-router-dom";
import SearchKhuyenNghi from "./SearchKhuyenNghi";

export default function UserKhuyenNghi({ username }) {
  let [keyword, setKeyword] = useState("");
  let [khuyenNghi, setKhuyenNghi] = useState({
    data: null,
    must: "",
    type: "",
    message: "",
  });
  let navigate = useNavigate();

   useEffect(() => {
     document.title = Title.user_khuyennghi + Title.origin;
   }, []);

  useEffect(() => {
    const getKhuyenNghi = async () => {
      const response = await axios.get(`${khuyenNghiURL}`, {
        withCredentials: true,
      });
      if (response.data.status) {
        setKhuyenNghi({
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
    getKhuyenNghi();
  }, [navigate]);

  const handleSearch = (keyword) => {
    setKeyword(keyword.toLowerCase().trim());
  };

  const filterSearch = () => {
    const keyword_search = keyword.trim().toLocaleLowerCase();
    if (khuyenNghi.data) {
      const newKhuyenNghi = {};
      for (const [key, value] of Object.entries(
        khuyenNghi.data.ThanhPhanNhuCau
      )) {
        if (
          String(String(value).trim().toLocaleLowerCase()).includes(
            keyword_search
          ) ||
          String(String(key).trim().toLocaleLowerCase()).includes(
            keyword_search
          )
        ) {
          newKhuyenNghi[key] = value === null ? "-" : value;
        }
      }
      return newKhuyenNghi;
    } else {
      return khuyenNghi;
    }
  };

  const renderKhuyenNghi = () => {
    if (khuyenNghi.must !== "") {
      // return <div>{khuyenNghi.message}</div>;
      return (
        <p style={{ textAlign: "center", color: "red", margin: "10px 0" }}>
          {khuyenNghi.message}{" "}
          <Link style={{ textDecoration: "none" }} to={"/account/index"}>
            Tại đây
          </Link>
        </p>
      );
    } else {
      if (khuyenNghi.type === "KHUYEN_NGHI") {
        if (khuyenNghi.data === null) {
          return (
            <p style={{ textAlign: "center", color: "red", margin: "10px 0" }}>
              {khuyenNghi.message}
            </p>
          );
        } else {
          const thanhPhanNhuCauList = [];
          const thanhPhanNhuCauObject = filterSearch();

          for (const [key, value] of Object.entries(thanhPhanNhuCauObject)) {
            if (key !== "id_nhucau") {
              thanhPhanNhuCauList.push(
                <tr key={key} className="table-white">
                  <td>
                    {key === "DienGiai"
                      ? "Diễn giải"
                      : key === "NangLuong"
                      ? "Năng lượng"
                      : key}
                  </td>
                  <td>{value}</td>
                </tr>
              );
            }
          }
          return (
            <div
              className="table-responsive"
              style={{
                overflow: "hidden",
              }}
            >
              <p
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  marginTop: 10,
                }}
              >
                {"(Đối tượng là " +
                  khuyenNghi.data.DoiTuong.TenDoiTuong +
                  ", nhóm tuổi từ " +
                  khuyenNghi.data.NhomTuoi.TenNhomTuoi +
                  ", với mức độ " +
                  khuyenNghi.data.LaoDong.TenLaoDong +
                  ")"}
              </p>
              <SearchKhuyenNghi
                title={"Lọc theo thành phần dinh dưỡng"}
                handleSearch={handleSearch}
              />
              <table className="table table-bordered text-center">
                <thead>
                  <tr
                    style={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    <th
                      style={{
                        width: "20%",
                      }}
                    >
                      Thành phần
                    </th>
                    <th>Nội dung</th>
                  </tr>
                </thead>
                <tbody>
                  {thanhPhanNhuCauList}
                  {/* <tr className="table-white">
                    <td>Diễn giải</td>
                    <td>
                      {khuyenNghi.data.ThanhPhanNhuCau.DienGiai === null
                        ? ""
                        : khuyenNghi.data.ThanhPhanNhuCau.DienGiai}
                    </td>
                  </tr>
                  <tr className="table-white">
                    <td>Năng lượng</td>
                    <td>
                      {khuyenNghi.data.ThanhPhanNhuCau.NangLuong === null
                        ? ""
                        : khuyenNghi.data.ThanhPhanNhuCau.NangLuong}
                    </td>
                  </tr>
                  <tr className="table-white">
                    <td>Protein</td>
                    <td>
                      {khuyenNghi.data.ThanhPhanNhuCau.Protein === null
                        ? ""
                        : khuyenNghi.data.ThanhPhanNhuCau.Protein}
                    </td>
                  </tr>
                  <tr className="table-white">
                    <td>Lipid</td>
                    <td>
                      {khuyenNghi.data.ThanhPhanNhuCau.Lipid === null
                        ? ""
                        : khuyenNghi.data.ThanhPhanNhuCau.Lipid}
                    </td>
                  </tr>
                  <tr className="table-white">
                    <td>Glucid</td>
                    <td>
                      {khuyenNghi.data.ThanhPhanNhuCau.Glucid === null
                        ? ""
                        : khuyenNghi.data.ThanhPhanNhuCau.Glucid}
                    </td>
                  </tr>
                  <tr className="table-white">
                    <td>Xo</td>
                    <td>
                      {khuyenNghi.data.ThanhPhanNhuCau.Xo === null
                        ? ""
                        : khuyenNghi.data.ThanhPhanNhuCau.Xo}
                    </td>
                  </tr>
                  <tr className="table-white">
                    <td>CanXi</td>
                    <td>
                      {khuyenNghi.data.ThanhPhanNhuCau.CanXi === null
                        ? ""
                        : khuyenNghi.data.ThanhPhanNhuCau.CanXi}
                    </td>
                  </tr>
                  <tr className="table-white">
                    <td>Phospho</td>
                    <td>
                      {khuyenNghi.data.ThanhPhanNhuCau.Phospho === null
                        ? ""
                        : khuyenNghi.data.ThanhPhanNhuCau.Phospho}
                    </td>
                  </tr>
                  <tr className="table-white">
                    <td>Magie</td>
                    <td>
                      {khuyenNghi.data.ThanhPhanNhuCau.Magie === null
                        ? ""
                        : khuyenNghi.data.ThanhPhanNhuCau.Magie}
                    </td>
                  </tr>
                  <tr className="table-white">
                    <td>Iod</td>
                    <td>
                      {khuyenNghi.data.ThanhPhanNhuCau.Iod === null
                        ? ""
                        : khuyenNghi.data.ThanhPhanNhuCau.Iod}
                    </td>
                  </tr>
                  <tr className="table-white">
                    <td>Cu</td>
                    <td>
                      {khuyenNghi.data.ThanhPhanNhuCau.Cu === null
                        ? ""
                        : khuyenNghi.data.ThanhPhanNhuCau.Cu}
                    </td>
                  </tr>
                  <tr className="table-white">
                    <td>Mangan</td>
                    <td>
                      {khuyenNghi.data.ThanhPhanNhuCau.Mangan === null
                        ? ""
                        : khuyenNghi.data.ThanhPhanNhuCau.Mangan}
                    </td>
                  </tr>
                  <tr className="table-white">
                    <td>Fluo</td>
                    <td>
                      {khuyenNghi.data.ThanhPhanNhuCau.Fluo === null
                        ? ""
                        : khuyenNghi.data.ThanhPhanNhuCau.Fluo}
                    </td>
                  </tr>
                  <tr className="table-white">
                    <td>Fe</td>
                    <td>
                      {khuyenNghi.data.ThanhPhanNhuCau.Fe === null
                        ? ""
                        : khuyenNghi.data.ThanhPhanNhuCau.Fe}
                    </td>
                  </tr>
                  <tr className="table-white">
                    <td>Zn</td>
                    <td>
                      {khuyenNghi.data.ThanhPhanNhuCau.Zn === null
                        ? ""
                        : khuyenNghi.data.ThanhPhanNhuCau.Zn}
                    </td>
                  </tr>
                  <tr className="table-white">
                    <td>Selen</td>
                    <td>
                      {khuyenNghi.data.ThanhPhanNhuCau.Selen === null
                        ? ""
                        : khuyenNghi.data.ThanhPhanNhuCau.Selen}
                    </td>
                  </tr>
                  <tr className="table-white">
                    <td>Crom</td>
                    <td>
                      {khuyenNghi.data.ThanhPhanNhuCau.Crom === null
                        ? ""
                        : khuyenNghi.data.ThanhPhanNhuCau.Crom}
                    </td>
                  </tr>
                  <tr className="table-white">
                    <td>Vitamin A</td>
                    <td>
                      {khuyenNghi.data.ThanhPhanNhuCau.VitaminA === null
                        ? ""
                        : khuyenNghi.data.ThanhPhanNhuCau.VitaminA}
                    </td>
                  </tr>
                  <tr className="table-white">
                    <td>Vitamin E</td>
                    <td>
                      {khuyenNghi.data.ThanhPhanNhuCau.VitaminE === null
                        ? ""
                        : khuyenNghi.data.ThanhPhanNhuCau.VitaminE}
                    </td>
                  </tr>
                  <tr className="table-white">
                    <td>Vitamin K</td>
                    <td>
                      {khuyenNghi.data.ThanhPhanNhuCau.VitaminK === null
                        ? ""
                        : khuyenNghi.data.ThanhPhanNhuCau.VitaminK}
                    </td>
                  </tr>
                  <tr className="table-white">
                    <td>Vitamin D</td>
                    <td>
                      {khuyenNghi.data.ThanhPhanNhuCau.VitaminD === null
                        ? ""
                        : khuyenNghi.data.ThanhPhanNhuCau.VitaminD}
                    </td>
                  </tr>
                  <tr className="table-white">
                    <td>Vitamin B1</td>
                    <td>
                      {khuyenNghi.data.ThanhPhanNhuCau.VitaminB1 === null
                        ? ""
                        : khuyenNghi.data.ThanhPhanNhuCau.VitaminB1}
                    </td>
                  </tr>
                  <tr className="table-white">
                    <td>Vitamin B2</td>
                    <td>
                      {khuyenNghi.data.ThanhPhanNhuCau.VitaminB2 === null
                        ? ""
                        : khuyenNghi.data.ThanhPhanNhuCau.VitaminB2}
                    </td>
                  </tr>
                  <tr className="table-white">
                    <td>Niacin</td>
                    <td>
                      {khuyenNghi.data.ThanhPhanNhuCau.Niacin === null
                        ? ""
                        : khuyenNghi.data.ThanhPhanNhuCau.Niacin}
                    </td>
                  </tr>
                  <tr className="table-white">
                    <td>Pantothenic</td>
                    <td>
                      {khuyenNghi.data.ThanhPhanNhuCau.Pantotdenic === null
                        ? ""
                        : khuyenNghi.data.ThanhPhanNhuCau.Pantotdenic}
                    </td>
                  </tr>
                  <tr className="table-white">
                    <td>Vitamin B6</td>
                    <td>
                      {khuyenNghi.data.ThanhPhanNhuCau.VitaminB6 === null
                        ? ""
                        : khuyenNghi.data.ThanhPhanNhuCau.VitaminB6}
                    </td>
                  </tr>
                  <tr className="table-white">
                    <td>Folate</td>
                    <td>
                      {khuyenNghi.data.ThanhPhanNhuCau.Folate === null
                        ? ""
                        : khuyenNghi.data.ThanhPhanNhuCau.Folate}
                    </td>
                  </tr>
                  <tr className="table-white">
                    <td>B12</td>
                    <td>
                      {khuyenNghi.data.ThanhPhanNhuCau.B12 === null
                        ? ""
                        : khuyenNghi.data.ThanhPhanNhuCau.B12}
                    </td>
                  </tr>
                  <tr className="table-white">
                    <td>Bitotin</td>
                    <td>
                      {khuyenNghi.data.ThanhPhanNhuCau.Bitotin === null
                        ? ""
                        : khuyenNghi.data.ThanhPhanNhuCau.Bitotin}
                    </td>
                  </tr>
                  <tr className="table-white">
                    <td>Vitamin C</td>
                    <td>
                      {khuyenNghi.data.ThanhPhanNhuCau.VitaminC === null
                        ? ""
                        : khuyenNghi.data.ThanhPhanNhuCau.VitaminC}
                    </td>
                  </tr>
                  <tr className="table-white">
                    <td>Choline</td>
                    <td>
                      {khuyenNghi.data.ThanhPhanNhuCau.Choline === null
                        ? ""
                        : khuyenNghi.data.ThanhPhanNhuCau.Choline}
                    </td>
                  </tr>
                  <tr className="table-white">
                    <td>Natri</td>
                    <td>
                      {khuyenNghi.data.ThanhPhanNhuCau.NaMuoi === null
                        ? ""
                        : khuyenNghi.data.ThanhPhanNhuCau.NaMuoi}
                    </td>
                  </tr>
                  <tr className="table-white">
                    <td>Kali</td>
                    <td>
                      {khuyenNghi.data.ThanhPhanNhuCau.Kali === null
                        ? ""
                        : khuyenNghi.data.ThanhPhanNhuCau.Kali}
                    </td>
                  </tr>
                  <tr className="table-white">
                    <td>Clo</td>
                    <td>
                      {khuyenNghi.data.ThanhPhanNhuCau.Clo === null
                        ? ""
                        : khuyenNghi.data.ThanhPhanNhuCau.Clo}
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          );
        }
      }
    }
  };
  return (
    <div id="main">
      <div className="page-content">
        <section className="row">
          <div className="col-12 col-lg-12">
            {<UserStatistic username={username} />}
            <div className="row">
              <div className="col-12">
                <div className="col-lg-12 stretch-card" style={{ padding: 0 }}>
                  <div className="card">
                    <div className="card-body">
                      <h4
                        className="card-title"
                        style={{ marginBottom: 20, textAlign: "center" }}
                      >
                        Nhu cầu khuyến nghị
                      </h4>

                      <div
                        className="col-12"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        {renderKhuyenNghi()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
