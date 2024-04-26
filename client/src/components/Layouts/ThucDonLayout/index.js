import React, { Fragment, useState } from "react";
import { MonAnURL } from "../../../api";
import axios from "axios";
import { notify } from "../../../Utils/Title";
import RenderNhomThucPham from "../Product/RenderNhomThucPham";
import { Link } from "react-router-dom";
export default function ThucDonLayout() {
  const [thucDon, setThucDon] = useState([]);
  const [energy, setEnergy] = useState("");

  const handleGetThucDon = async () => {
    if (isNaN(Number(energy)) || Number(energy) <= 200) {
      notify(false, "Năng lượng không hợp lệ hoặc dưới 200.");
      return;
    }
    const response = await axios.get(
      `${MonAnURL + "/get/random?limit=12&energy=" + energy}`
    );
    if (response.data.status) {
      setThucDon(response.data.data);
    } else {
      notify(false, response.data.message);
      setThucDon([]);
    }
  };

  const handleChangeEnergyInput = (e) => {
    let { value } = e.target;
    value = Number(value);
    setEnergy(value);
  };

  const renderThucDon = () => {
    return thucDon.map((item, index) => {
      let T_ENERC = 0;
      let T_PROCNT = 0;
      let T_FAT = 0;
      let T_CHOCDF = 0;
      return (
        <div>
          <p>Thực đơn số #{index + 1}</p>
          <table className="table table-bordered text-center">
            <thead style={{ whiteSpace: "nowrap" }}>
              <tr>
                <th>Buổi</th>
                <th>Tên món ăn</th>
                <th>Số lượng</th>
                <th>Năng lượng (KCal)</th>
                <th>Chát đạm (g)</th>
                <th>Chất béo (g)</th>
                <th>Carbohydrate (g)</th>
              </tr>
            </thead>
            <tbody>
              {item.map((monan, ind) => {
                T_ENERC += Number(monan.TOTAL_ENERC);
                T_PROCNT += Number(monan.TOTAL_PROCNT);
                T_FAT += Number(monan.TOTAL_FAT);
                T_CHOCDF += Number(monan.TOTAL_CHOCDF);
                return (
                  <Fragment>
                    <tr key={index} className="table-white">
                      <td>
                        {ind === 0
                          ? "Sáng"
                          : ind === 1
                          ? "Trưa"
                          : ind === 2
                          ? "Tối"
                          : "Phụ"}
                      </td>
                      <td>
                        <Link
                          style={{
                            textDecoration: "none",
                          }}
                          to={"/product/" + monan.id_monan}
                        >
                          {monan.ten_mon}
                        </Link>
                      </td>
                      <td>{monan.quanty + " " + monan.don_vi}</td>
                      <td>{monan.TOTAL_ENERC}</td>
                      <td>{monan.TOTAL_PROCNT}</td>
                      <td>{monan.TOTAL_FAT}</td>
                      <td>{monan.TOTAL_CHOCDF}</td>
                    </tr>
                    {ind === item.length - 1 && (
                      <tr key={index} className="table-white">
                        <td></td>
                        <td></td>
                        <td>Tổng</td>
                        <td>{T_ENERC.toFixed(0)}</td>
                        <td>{T_PROCNT.toFixed(2)}</td>
                        <td>{T_FAT.toFixed(2)}</td>
                        <td>{T_CHOCDF.toFixed(2)}</td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    });
  };

  return (
    <div className="favorite_book_list flex_center mg-10_0">
      <div
        className="_1200px bg-white pd-10"
        style={{ display: "flex", minHeight: "85vh" }}
      >
        {/* Flex 3 */}
        <div style={{ flex: 3 }}>
          <div
            className="favorite_book_list_icon_title"
            style={{ padding: "5px 0px", borderBottom: "1px solid #007bff" }}
          >
            <img
              src={"./icons/data_thucpham.png"}
              className="icon_sach"
              alt={"icon_du_lieu_thuc_pham"}
            />
            <span className="favorite_book_list_title mg-l-10">
              Gợi ý thực đơn
            </span>
          </div>
          <div className="favorite_book_item mg-10_0">
            {/* Content */}
            <p>
              Nhập năng lượng rồi nhấn "<b>Lấy thực đơn</b>"
            </p>
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <label
                  style={{
                    margin: 0,
                  }}
                  className="form-label"
                >
                  Năng lượng
                </label>
                <input
                  style={{
                    width: 300,
                    marginLeft: 10,
                  }}
                  className="form-control showordisable"
                  name="energy"
                  defaultValue={energy}
                  type="number"
                  placeholder="Nhập năng lượng"
                  onInput={(e) => handleChangeEnergyInput(e)}
                />
              </div>

              <div
                style={{
                  marginTop: 10,
                  textAlign: "center",
                }}
              >
                <button
                  onClick={() => {
                    handleGetThucDon();
                  }}
                  style={{
                    whiteSpace: "nowrap",
                    marginLeft: 10,
                    marginTop: 0,
                  }}
                  className="btn_buynow"
                >
                  Lấy thực đơn
                </button>
              </div>
            </div>

            {/* Render list */}
            {renderThucDon()}
          </div>
        </div>
        {/* FLEX 1 */}
        <div
          style={{
            flex: 1,
            marginLeft: 20,
          }}
        >
          {/* Right */}
          <div
            className="category_title bg-primary color-white"
            style={{
              padding: "5px 10px",
            }}
          >
            Nhóm thực phẩm
          </div>
          <RenderNhomThucPham />
        </div>
      </div>
    </div>
  );
}
