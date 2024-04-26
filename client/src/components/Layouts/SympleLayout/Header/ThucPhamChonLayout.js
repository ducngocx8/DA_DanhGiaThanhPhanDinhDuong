import React from "react";
import { noImage, notify } from "../../../../Utils/Title";
import { BACKEND_HOME, ThucPhamChonURL } from "../../../../api";
import axios from "axios";
import Chart from "react-apexcharts";
import { Link, useNavigate } from "react-router-dom";
import { tongThanhPhanDinhDuongThucPhamChon } from "../../../../Utils/caculate";
export default function ThucPhamChonLayout({
  thucPhamChonList,
  setThucPhamChonList,
  closeForm,
  dispatch,
}) {
  let navigate = useNavigate();
  const handleChangeAmount = async (e, item) => {
    let { value } = e.target;
    value = Number(value);
    if (!isNaN(value) && value > 0) {
      const id = item.id;
      const thuc_pham_chon = {
        id_thucpham: item.id_thucpham,
        quanty: value,
      };
      const response = await axios.put(
        `${ThucPhamChonURL + "/" + id}`,
        thuc_pham_chon,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        setThucPhamChonList(response.data.data);
        dispatch({
          type: "load_cart",
          value: response.data.data,
        });
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
    const id = item.id;
    const response = await axios.delete(`${ThucPhamChonURL + "/" + id}`, {
      withCredentials: true,
    });
    notify(response.data.status, response.data.message);
    if (response.data.status) {
      setThucPhamChonList(response.data.data);
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

  const sumThanhPhanKhac = (tongThanhPhanChinh) => {
    let sum = 0;
    for (const [key, value] of Object.entries(tongThanhPhanChinh)) {
      if (
        ![
          "ENERC",
          "FAT",
          "PROCNT",
          "CHOCDF",
          "EDIBLE",
          "thucpham_status",
          "createdAt",
          "updatedAt",
        ].includes(key)
      ) {
        if (["WATER", "FIBC", "ASH"].includes(key)) {
          sum += Number(value);
        } else if (
          [
            "CA",
            "P",
            "FE",
            "ZN",
            "NA",
            "K",
            "MG",
            "MN",
            "CU",
            "VITC",
            "THIA",
            "RIBF",
            "NIA",
            "PANTAC",
            "VITB6",
            "VITE",
          ].includes(key)
        ) {
          sum += Number(value) / 1000;
        } else {
          sum += Number(value) / Math.pow(10, 6);
        }
      }
    }
    return sum.toFixed(0);
  };

  const renderChartArray = (tongThanhPhanChinh) => {
    const protein =
      tongThanhPhanChinh.PROCNT === "-" ? 0 : tongThanhPhanChinh.PROCNT;
    const fat = tongThanhPhanChinh.FAT === "-" ? 0 : tongThanhPhanChinh.FAT;
    const cabs =
      tongThanhPhanChinh.CHOCDF === "-" ? 0 : tongThanhPhanChinh.CHOCDF;
    const khac = Number(sumThanhPhanKhac(tongThanhPhanChinh));
    return [protein, cabs, fat, khac];
  };

  const renderTongThanhPhanDinhDuong = () => {
    const tongThanhPhanChinh =
      tongThanhPhanDinhDuongThucPhamChon(thucPhamChonList);
    return (
      <>
        {/* Render chart */}
        {thucPhamChonList.length > 0 && (
          <div id="chart">
            <Chart
              series={renderChartArray(tongThanhPhanChinh)}
              options={{
                chart: {
                  width: 380,
                  type: "pie",
                },
                labels: [
                  "Chất đạm",
                  "Carbohydrate",
                  "Chất béo",
                  "Thành phần khác",
                ],
                responsive: [
                  {
                    breakpoint: 480,
                    options: {
                      chart: {
                        width: 200,
                      },
                      legend: {
                        position: "bottom",
                      },
                    },
                  },
                ],
              }}
              type="pie"
              height={250}
            />
          </div>
        )}

        {/* Kết thúc render chart */}
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th style={{ width: "30%" }}>Tên thành phần</th>
              <th style={{ width: "20%" }}>Giá trị dinh dưỡng</th>
              <th style={{ width: "30%" }}>Tên thành phần</th>
              <th style={{ width: "20%" }}>Giá trị dinh dưỡng</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-white">
              <td>Nước (g)</td>
              <td>{tongThanhPhanChinh.WATER * 1}</td>
              <td>Tỷ lệ phần ăn được (%)</td>
              <td>{tongThanhPhanChinh.EDIBLE * 1}</td>
            </tr>

            <tr className="table-white">
              <td>Năng Lượng (KCal)</td>
              <td>{tongThanhPhanChinh.ENERC * 1}</td>
              <td>Tổng protein (g)</td>
              <td>{tongThanhPhanChinh.PROCNT * 1}</td>
            </tr>

            <tr className="table-white">
              <td>Tổng chất béo (g)</td>
              <td>{tongThanhPhanChinh.FAT * 1}</td>
              <td>Tổng Carbohydrate (g)</td>
              <td>{tongThanhPhanChinh.CHOCDF * 1}</td>
            </tr>

            <tr className="table-white">
              <td>Chất xơ (KCal)</td>
              <td>{tongThanhPhanChinh.FIBC * 1}</td>
              <td>Tro (g)</td>
              <td>{tongThanhPhanChinh.ASH * 1}</td>
            </tr>

            <tr className="table-white">
              <td>Canxi (mg)</td>
              <td>{tongThanhPhanChinh.CA * 1}</td>
              <td>Phospho (mg)</td>
              <td>{tongThanhPhanChinh.P * 1}</td>
            </tr>

            <tr className="table-white">
              <td>Sắt (mg)</td>
              <td>{tongThanhPhanChinh.FE * 1}</td>
              <td>Kẽm (mg)</td>
              <td>{tongThanhPhanChinh.ZN * 1}</td>
            </tr>

            <tr className="table-white">
              <td>Natri (mg)</td>
              <td>{tongThanhPhanChinh.NA * 1}</td>
              <td>Kali (mg)</td>
              <td>{tongThanhPhanChinh.K * 1}</td>
            </tr>

            <tr className="table-white">
              <td>Magie (mg)</td>
              <td>{tongThanhPhanChinh.MG * 1}</td>
              <td>Mangan (mg)</td>
              <td>{tongThanhPhanChinh.MN * 1}</td>
            </tr>

            <tr className="table-white">
              <td>Đồng (mg)</td>
              <td>{tongThanhPhanChinh.CU * 1}</td>
              <td>Selen (µg)</td>
              <td>{tongThanhPhanChinh.MN * 1}</td>
            </tr>

            <tr className="table-white">
              <td>Vitamin C (mg)</td>
              <td>{tongThanhPhanChinh.VITC * 1}</td>
              <td>Vitamin B1 -Thiamin (mg)</td>
              <td>{tongThanhPhanChinh.THIA * 1}</td>
            </tr>

            <tr className="table-white">
              <td>Vitamin B2 - Riboflavin (mg)</td>
              <td>{tongThanhPhanChinh.RIBF * 1}</td>
              <td>Niacin (mg)</td>
              <td>{tongThanhPhanChinh.NIA * 1}</td>
            </tr>

            <tr className="table-white">
              <td>Acid pantothenic (mg)</td>
              <td>{tongThanhPhanChinh.PANTAC * 1}</td>
              <td>Vitamin B6 (mg)</td>
              <td>{tongThanhPhanChinh.VITB6 * 1}</td>
            </tr>

            <tr className="table-white">
              <td>Vitamin A (µg)</td>
              <td>{tongThanhPhanChinh.VITA * 1}</td>
              <td>Vitamin D (µg)</td>
              <td>{tongThanhPhanChinh.VITD * 1}</td>
            </tr>

            <tr className="table-white">
              <td>Vitamin E (mg)</td>
              <td>{tongThanhPhanChinh.VITE * 1}</td>
              <td>Vitamin K (µg)</td>
              <td>{tongThanhPhanChinh.VITK * 1}</td>
            </tr>

            <tr className="table-white">
              <td>Vitamin B12 (µg)</td>
              <td>{tongThanhPhanChinh.VITB12 * 1}</td>
              <td>Tổng FOL (µg)</td>
              <td>{tongThanhPhanChinh.FOL * 1}</td>
            </tr>

            <tr className="table-white">
              <td>Acid Folic (µg)</td>
              <td>{tongThanhPhanChinh.FOLAC * 1}</td>
              <td>Biotin (µg)</td>
              <td>{tongThanhPhanChinh.BIOT * 1}</td>
            </tr>

            <tr className="table-white">
              <td>Retinol (µg)</td>
              <td>{tongThanhPhanChinh.RETOL * 1}</td>
              <td>Beta Carotene Alpha (µg)</td>
              <td>{tongThanhPhanChinh.CARTB * 1}</td>
            </tr>

            <tr className="table-white">
              <td>Alpha Carotene (µg)</td>
              <td>{tongThanhPhanChinh.CARTA * 1}</td>
              <td>CRYXB (µg)</td>
              <td>{tongThanhPhanChinh.CRYXB * 1}</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  };
  return (
    <div
      className="row col-10 add_edit_class"
      style={{
        backgroundColor: "rgb(242, 247, 255)",
        borderRadius: "3px 3px 0px 0px",
        boxShadow:
          "rgb(98, 176, 253) 0px 4px 8px, rgba(0, 0, 0, 0.08) 0px 4px 12px",
        padding: "0px !important",
        display: "block",
      }}
    >
      <div
        className="bg-primary"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "15px 20px",
        }}
      >
        <div className="text-white add_book_class_header">
          Thành phần dinh dưỡng
        </div>
        <i
          onClick={() => closeForm(false, false)}
          className="far fa-times-circle btn_close_form"
          style={{ color: "white", fontSize: 25 }}
        />
      </div>
      <div className="table-responsive pt-3 sroll_form_v2" id="style-14">
        {/* Table render bảng thành phần chọn */}
        <div id="table_load">
          <div className="table-responsive pt-3">
            <p>Danh sách thực phẩm:</p>
            <table className="table table-bordered text-center">
              <thead>
                <tr>
                  <th>STT</th>
                  <th style={{ width: 100 }}>Hình ảnh</th>
                  <th>Tên thực phẩm</th>
                  <th style={{ width: "10%" }}>Số lượng (g)</th>
                  <th>Năng lượng</th>
                  <th>Chất đạm</th>
                  <th>Chất béo</th>
                  <th>Carbohydrate</th>
                  <th>Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {thucPhamChonList.map((item, index) => {
                  const PROCNT = (
                    ((Number(item.quanty) * Number(item.ThucPham.PROCNT)) /
                      100) *
                    1
                  ).toFixed(0);
                  const FAT = (
                    ((Number(item.quanty) * Number(item.ThucPham.FAT)) / 100) *
                    1
                  ).toFixed(0);
                  const CHOCDF = (
                    ((Number(item.quanty) * Number(item.ThucPham.CHOCDF)) /
                      100) *
                    1
                  ).toFixed(0);
                  const ENERC = (
                    ((Number(item.quanty) * Number(item.ThucPham.ENERC)) /
                      100) *
                    1
                  ).toFixed(0);
                  return (
                    <tr key={index} className="table-white">
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={
                            item?.ThucPham?.image_url
                              ? BACKEND_HOME + item?.ThucPham?.image_url
                              : noImage
                          }
                          alt="product"
                          style={{ height: "auto", width: 120 }}
                        />
                      </td>
                      <td className="cart_book_name">
                        {item.ThucPham.TenTiengViet ||
                          item.ThucPham.TenTiengAnh}
                      </td>
                      <td>
                        <div className="form_edit">
                          <input
                            style={{ textAlign: "center" }}
                            min={1}
                            max={10000}
                            className="form-control edit_quanty_input"
                            type="number"
                            name="quanty"
                            defaultValue={Number(item.quanty) * 1}
                            onChange={(e) => handleChangeAmount(e, item)}
                          />
                        </div>
                      </td>
                      <td>{ENERC.toLocaleString("vi")} KCal</td>
                      <td>{Number(PROCNT).toLocaleString("vi") + "g"}</td>
                      <td>{FAT.toLocaleString("vi") + "g"}</td>
                      <td className="cart_book_name">
                        {CHOCDF.toLocaleString("vi") + "g"}
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
                            to={"/dinh-duong/" + item.id_thucpham}
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
                })}
              </tbody>
            </table>
          </div>
        </div>
        {/* Kết thúc render thực phẩm chọn */}

        <p>Tổng giá trị dinh dinh dưỡng:</p>
        {renderTongThanhPhanDinhDuong()}
      </div>
    </div>
  );
}
