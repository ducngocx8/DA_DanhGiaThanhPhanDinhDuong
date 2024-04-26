import axios from "axios";
import React, { useState } from "react";
import { searchTenThucPhamOFKey } from "../../../../api";
import { notify } from "../../../../Utils/Title";

export default function FormUserSearchThucPhamAdd({ reloadData, addToList }) {
  const [chiTietMonInput, setChiTietMonInput] = useState({
    quanty: "",
    ten_phannhom: "",
  });
  const [keyword, setKeyword] = useState("");
  const [thucPhamList, setThucPhamList] = useState([]);
  const [showFormInputQuanty, setShowFormInputQuanty] = useState(false);
  const handleChangeChiTietMonInput = (e) => {
    let { value, name } = e.target;
    if (name === "quanty" && value.trim() !== "") {
      value = Number(value);
    }
    setChiTietMonInput({ ...chiTietMonInput, [name]: value });
  };

  const getThucPhamList = async (keyword) => {
    const response = await axios.get(
      `${searchTenThucPhamOFKey + "?keyword=" + keyword}`,
      {
        withCredentials: true,
      }
    );
    if (response.data.status) {
      setThucPhamList(response.data.data);
    } else {
      setThucPhamList([]);
    }
  };

  const handleChangeSearchInput = (e) => {
    const { value } = e.target;
    setKeyword(value);
    getThucPhamList(value.trim());
  };

  const handelCloseFormAddQuanty = () => {
    setShowFormInputQuanty(false);
  };

  const handleShowFormInputQuanty = (thuc_pham) => {
    if (
      showFormInputQuanty &&
      showFormInputQuanty.id_thucpham === thuc_pham.id_thucpham
    ) {
      setShowFormInputQuanty(false);
    } else {
      setShowFormInputQuanty(thuc_pham);
    }
  };

  const handleAdd = async () => {
    const chi_tiet_mon = {
      ten_phannhom: chiTietMonInput.ten_phannhom.trim(),
      quanty: Number(chiTietMonInput.quanty),
      id_thucpham: showFormInputQuanty.id_thucpham,
      id_chitietmon: Date.now(),
      ThucPham: showFormInputQuanty,
    };
    const result = addToList(chi_tiet_mon);
    if (result) {
      setShowFormInputQuanty(false);
      setChiTietMonInput({ ...chiTietMonInput, quanty: "", ten_phannhom: "" });
    }
  };

  const handleAddThucPhamToMonAn = () => {
    if (
      typeof chiTietMonInput.quanty !== "number" ||
      isNaN(Number(chiTietMonInput.quanty)) ||
      Number(chiTietMonInput.quanty) <= 0
    ) {
      notify(false, "Khối lượng nhập vào không hợp lệ.");
      return;
    }

    if (typeof chiTietMonInput.ten_phannhom !== "string") {
      notify(false, "Kiểu dữ liệu phân nhóm món không hợp lệ.");
      return;
    }
    handleAdd();
  };
  return (
    <>
      <div style={{ marginBottom: 10 }}>
        <label className="form-label">Tìm kiếm thực phẩm</label>
        <input
          onChange={(e) => handleChangeSearchInput(e)}
          className="form-control"
          name="keyword"
          type="text"
          defaultValue={keyword}
          placeholder="VD: Gạo nếp cái"
        />
      </div>

      {showFormInputQuanty && (
        <div
          style={{
            position: "relative",
            zIndex: 10000,
          }}
        >
          <div
            style={{
              position: "absolute",
              right: "-310px",
              top: "-170px",
              backgroundColor: "white",
              padding: "10px 10px",
              borderRadius: 10,
              minWidth: "300px",
            }}
          >
            <div style={{ textAlign: "center", color: "#007bff" }}>
              {showFormInputQuanty.TenTiengViet ||
                showFormInputQuanty.TenTiengAnh}
            </div>

            <div>
              <label className="form-label">Tên phân nhóm</label>
              <input
                onChange={(e) => handleChangeChiTietMonInput(e)}
                className="form-control"
                name="ten_phannhom"
                type="text"
                defaultValue={chiTietMonInput.ten_phannhom}
                placeholder="VD: Gia vị"
              />
            </div>
            <div
              style={{
                marginTop: 10,
              }}
            >
              <label className="form-label">Nhập khối lượng (g)</label>
              <input
                onChange={(e) => handleChangeChiTietMonInput(e)}
                className="form-control"
                name="quanty"
                type="number"
                defaultValue={chiTietMonInput.quanty}
                placeholder="VD: 100"
              />
            </div>

            <div
              style={{
                textAlign: "center",
                marginTop: 10,
              }}
            >
              <button
                onClick={() => handleAddThucPhamToMonAn()}
                className="btn btn-success"
              >
                Thêm
              </button>

              <button
                style={{
                  marginLeft: 10,
                }}
                onClick={() => handelCloseFormAddQuanty()}
                className="btn btn-danger"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className="table-responsive"
        id="style-14"
        style={{
          height: 120,
        }}
      >
        <table
          className="table table-bordered text-center"
          style={{
            marginBottom: 0,
          }}
        >
          <tbody>
            {thucPhamList.map((item, index) => {
              return (
                <tr
                  key={index}
                  onClick={() => {
                    handleShowFormInputQuanty(item);
                  }}
                  className="table-white"
                  style={{ cursor: "pointer" }}
                >
                  <td>{item.id_thucpham}</td>
                  <td>{item.TenTiengViet || item.TenTiengAnh}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
