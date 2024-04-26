import React from "react";
import { Link } from "react-router-dom";

import Chart from "react-apexcharts";
export default function ProductDescription({
  tongThanhPhanChinh,
  tenMon,
  don_vi,
  quantyInput,
}) {
  // console.log(tongThanhPhanChinh);

  const sumThanhPhanKhac = () => {
    let sum = 0;
    for (const [key, value] of Object.entries(tongThanhPhanChinh)) {
      if (
        ![
          "ENERC",
          "FAT",
          "PROCNT",
          "CHOCDF",
          "EDIBLE",
          "ThanhPhan",
          "thucpham_status",
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

  const renderChartArray = () => {
    const protein =
      tongThanhPhanChinh.PROCNT === "-" ? 0 : tongThanhPhanChinh.PROCNT;
    const fat = tongThanhPhanChinh.FAT === "-" ? 0 : tongThanhPhanChinh.FAT;
    const cabs =
      tongThanhPhanChinh.CHOCDF === "-" ? 0 : tongThanhPhanChinh.CHOCDF;
    const khac = Number(sumThanhPhanKhac());
    return [protein, cabs, fat, khac];
  };

  const renderNguyenLieuV2 = () => {
    // [[], [], []]
    const listPhanMon = [];
    console.log(tongThanhPhanChinh.ThanhPhan);
    tongThanhPhanChinh.ThanhPhan.forEach((item, index) => {
      if (
        index === 0 ||
        (index > 0 &&
          item.ten_phannhom.trim() !==
            tongThanhPhanChinh.ThanhPhan[index - 1].ten_phannhom.trim())
      ) {
        listPhanMon.push([]);
        listPhanMon[listPhanMon.length - 1].push(item);
      } else {
        listPhanMon[listPhanMon.length - 1].push(item);
      }
    });

    return (
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        {listPhanMon.map((item, index) => {
          return (
            <div key={index}>
              <div>
                {item[0].ten_phannhom.trim()
                  ? "Phân nhóm món: " + item[0].ten_phannhom.trim()
                  : "Chưa phân nhóm:"}
              </div>
              <div>
                {item.map((thucpham, index) => {
                  return (
                    <li key={index}>
                      <Link style={{textDecoration: "none"}} to={"/dinh-duong/"+thucpham.id_thucpham}>
                        {thucpham.TenTiengViet || thucpham.TenTiengAnh}
                      </Link>
                      {` (${Number(thucpham.quanty) * 1 + "g"}) `}
                    </li>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // const renderNguyenLieu = () => {
  //   let divElement = ``;
  //   tongThanhPhanChinh.ThanhPhan &&
  //     tongThanhPhanChinh.ThanhPhan.forEach((item, index) => {
  //       if (
  //         index === 0 ||
  //         (index > 0 &&
  //           tongThanhPhanChinh.ThanhPhan[index - 1].ten_phannhom
  //             .trim()
  //             .toLowerCase() !== item.ten_phannhom.trim().toLowerCase())
  //       ) {
  //         if (index === 0) {
  //           divElement += ` 
  //               <div>${
  //                 item.ten_phannhom.trim()
  //                   ? "Phân nhóm món: " + item.ten_phannhom.trim()
  //                   : "Chưa phân nhóm:"
  //               }
  //               <li>
  //                 ${item.TenTiengViet || item.TenTiengAnh} (
  //                 ${Number(item.quanty) * 1}g)
  //               </li>`;
  //         } else {
  //           divElement += ` </div>
  //               <div>${
  //                 item.ten_phannhom.trim()
  //                   ? "Phân nhóm món: " + item.ten_phannhom.trim()
  //                   : "Chưa phân nhóm:"
  //               }
  //               <li>
  //                 ${item.TenTiengViet || item.TenTiengAnh} (
  //                 ${Number(item.quanty) * 1}g)
  //               </li>`;
  //         }
  //       } else {
  //         divElement += ` 
  //                <li>
  //               ${item.TenTiengViet || item.TenTiengAnh} (
  //               ${Number(item.quanty) * 1}g)
  //             </li>`;
  //       }
  //     });
  //   return divElement;
  // };
  return (
    <div className="book_description flex_center mg-20_0">
      <div className="_1200px bg-white pd-10">
        <p>
          Thành phần dinh dưỡng trong {quantyInput + " " + don_vi + "  của "}
          <strong>{tenMon}</strong>:
        </p>
        <p>Nguyên liệu:</p>
        {/* <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
          dangerouslySetInnerHTML={{ __html: renderNguyenLieu() }}
        /> */}

        {renderNguyenLieuV2()}

        {/* Render Chart */}
        <div id="chart">
          <Chart
            series={renderChartArray()}
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
        {/* End Render Chart */}
        <div className="table-responsive pt-3">
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
                <td>{tongThanhPhanChinh.WATER}</td>
                <td>Tỷ lệ phần ăn được (%)</td>
                <td>{tongThanhPhanChinh.EDIBLE}</td>
              </tr>

              <tr className="table-white">
                <td>Năng Lượng (KCal)</td>
                <td>{tongThanhPhanChinh.ENERC}</td>
                <td>Tổng protein (g)</td>
                <td>{tongThanhPhanChinh.PROCNT}</td>
              </tr>

              <tr className="table-white">
                <td>Tổng chất béo (g)</td>
                <td>{tongThanhPhanChinh.FAT}</td>
                <td>Tổng Carbohydrate (g)</td>
                <td>{tongThanhPhanChinh.CHOCDF}</td>
              </tr>

              <tr className="table-white">
                <td>Chất xơ (KCal)</td>
                <td>{tongThanhPhanChinh.FIBC}</td>
                <td>Tro (g)</td>
                <td>{tongThanhPhanChinh.ASH}</td>
              </tr>

              <tr className="table-white">
                <td>Canxi (mg)</td>
                <td>{tongThanhPhanChinh.CA}</td>
                <td>Phospho (mg)</td>
                <td>{tongThanhPhanChinh.P}</td>
              </tr>

              <tr className="table-white">
                <td>Sắt (mg)</td>
                <td>{tongThanhPhanChinh.FE}</td>
                <td>Kẽm (mg)</td>
                <td>{tongThanhPhanChinh.ZN}</td>
              </tr>

              <tr className="table-white">
                <td>Natri (mg)</td>
                <td>{tongThanhPhanChinh.NA}</td>
                <td>Kali (mg)</td>
                <td>{tongThanhPhanChinh.K}</td>
              </tr>

              <tr className="table-white">
                <td>Magie (mg)</td>
                <td>{tongThanhPhanChinh.MG}</td>
                <td>Mangan (mg)</td>
                <td>{tongThanhPhanChinh.MN}</td>
              </tr>

              <tr className="table-white">
                <td>Đồng (mg)</td>
                <td>{tongThanhPhanChinh.CU}</td>
                <td>Selen (µg)</td>
                <td>{tongThanhPhanChinh.MN}</td>
              </tr>

              <tr className="table-white">
                <td>Vitamin C (mg)</td>
                <td>{tongThanhPhanChinh.VITC}</td>
                <td>Vitamin B1 -Thiamin (mg)</td>
                <td>{tongThanhPhanChinh.THIA}</td>
              </tr>

              <tr className="table-white">
                <td>Vitamin B2 - Riboflavin (mg)</td>
                <td>{tongThanhPhanChinh.RIBF}</td>
                <td>Niacin (mg)</td>
                <td>{tongThanhPhanChinh.NIA}</td>
              </tr>

              <tr className="table-white">
                <td>Acid pantothenic (mg)</td>
                <td>{tongThanhPhanChinh.PANTAC}</td>
                <td>Vitamin B6 (mg)</td>
                <td>{tongThanhPhanChinh.VITB6}</td>
              </tr>

              <tr className="table-white">
                <td>Vitamin A (µg)</td>
                <td>{tongThanhPhanChinh.VITA}</td>
                <td>Vitamin D (µg)</td>
                <td>{tongThanhPhanChinh.VITD}</td>
              </tr>

              <tr className="table-white">
                <td>Vitamin E (mg)</td>
                <td>{tongThanhPhanChinh.VITE}</td>
                <td>Vitamin K (µg)</td>
                <td>{tongThanhPhanChinh.VITK}</td>
              </tr>

              <tr className="table-white">
                <td>Vitamin B12 (µg)</td>
                <td>{tongThanhPhanChinh.VITB12}</td>
                <td>Tổng FOL (µg)</td>
                <td>{tongThanhPhanChinh.FOL}</td>
              </tr>

              <tr className="table-white">
                <td>Acid Folic (µg)</td>
                <td>{tongThanhPhanChinh.FOLAC}</td>
                <td>Biotin (µg)</td>
                <td>{tongThanhPhanChinh.BIOT}</td>
              </tr>

              <tr className="table-white">
                <td>Retinol (µg)</td>
                <td>{tongThanhPhanChinh.RETOL}</td>
                <td>Beta Carotene Alpha (µg)</td>
                <td>{tongThanhPhanChinh.CARTB}</td>
              </tr>

              <tr className="table-white">
                <td>Alpha Carotene (µg)</td>
                <td>{tongThanhPhanChinh.CARTA}</td>
                <td>CRYXB (µg)</td>
                <td>{tongThanhPhanChinh.CRYXB}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
