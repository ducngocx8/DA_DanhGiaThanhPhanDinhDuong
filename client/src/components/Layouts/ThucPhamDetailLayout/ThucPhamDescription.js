import React from "react";
import Chart from "react-apexcharts";
export default function ThucPhamDescription({
  tongThanhPhanChinh,
  tenMon,
  don_vi,
  quantyInput,
}) {
  const renderChartArray = () => {
    const protein =
      tongThanhPhanChinh.PROCNT === "-" ? 0 : tongThanhPhanChinh.PROCNT;
    const fat = tongThanhPhanChinh.FAT === "-" ? 0 : tongThanhPhanChinh.FAT;
    const cabs =
      tongThanhPhanChinh.CHOCDF === "-" ? 0 : tongThanhPhanChinh.CHOCDF;
    let khac = Number(quantyInput) - protein - fat - cabs;
    khac = Number(khac.toFixed(2));
    return [protein, cabs, fat, khac];
  };

  return (
    <div className="book_description flex_center mg-20_0">
      <div className="_1200px bg-white pd-10">
        <p>
          Thành phần dinh dưỡng trong {Number(quantyInput) * 1 + "g "}
          <strong>{tenMon}</strong>:
        </p>
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
