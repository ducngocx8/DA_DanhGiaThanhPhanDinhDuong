import React from "react";

export default function FoodCaculateDetail({ tongThanhPhanChinh, closeForm }) {
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
        {/* Table tổng thành phần */}
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
      </div>
    </div>
  );
}
