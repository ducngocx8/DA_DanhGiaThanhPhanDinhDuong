import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BuaAnURL, NgayAnURL, searchMonAnURL } from "../../../api";
import { notify } from "../../../Utils/Title";

export default function UserSearchMonAn({ reloadData, time }) {
  let navigate = useNavigate();
  const [ngayAnInput, setNgayAnInput] = useState({
    quanty: "",
    bua_an_id: -1,
  });
  const [keyword, setKeyword] = useState("");
  const [thucPhamList, setThucPhamList] = useState([]);
  const [buaAnList, setBuaAnList] = useState([]);
  const [showFormInputQuanty, setShowFormInputQuanty] = useState(false);
  const handleChangeChiTietMonInput = (e) => {
    let { value, name } = e.target;
    if (name === "quanty" && value.trim() !== "") {
      value = Number(value);
    }
    setNgayAnInput({ ...ngayAnInput, [name]: value });
  };

  useEffect(() => {
    const getAllBuaAn = async () => {
      const response = await axios.get(`${BuaAnURL}`);
      if (response.data.status) {
        if (response.data.data.length !== 0) {
          setNgayAnInput({
            quanty: "",
            bua_an_id: Number(response.data.data[0].bua_an_id),
          });
        }
        setBuaAnList(response.data.data);
      }
    };
    getAllBuaAn();
  }, []);

  const getThucPhamList = async (keyword) => {
    const response = await axios.get(
      `${searchMonAnURL + "?keyword=" + keyword}`,
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

  const handleShowFormInputQuanty = (mon_an) => {
    if (
      showFormInputQuanty &&
      showFormInputQuanty.id_monan === mon_an.id_monan
    ) {
      setShowFormInputQuanty(false);
    } else {
      setShowFormInputQuanty(mon_an);
    }
  };

  const handleAdd = async () => {
    const ngay_an = {
      bua_an_id: Number(ngayAnInput.bua_an_id),
      quanty: Number(ngayAnInput.quanty),
      id_monan: Number(showFormInputQuanty.id_monan),
      time: time,
    };
    const response = await axios.post(`${NgayAnURL}`, ngay_an, {
      withCredentials: true,
    });
    notify(response.data.status, response.data.message);
    if (response.data.status) {
      reloadData(response.data.data);
      setShowFormInputQuanty(false);
      setNgayAnInput({ ...ngayAnInput, quanty: "" });
    } else {
      if (response.data.must === "login") {
        return navigate("/account/login", { replace: true });
      } else if (response.data.must === "permission") {
        return;
      }
    }
  };

  const handleAddThucPhamToMonAn = () => {
    if (
      typeof ngayAnInput.bua_an_id !== "number" ||
      isNaN(Number(ngayAnInput.bua_an_id)) ||
      Number(ngayAnInput.bua_an_id) <= 0
    ) {
      notify(false, "Bữa ăn không hợp lệ.");
      return;
    }
    if (
      typeof ngayAnInput.quanty !== "number" ||
      isNaN(Number(ngayAnInput.quanty)) ||
      Number(ngayAnInput.quanty) <= 0
    ) {
      notify(false, "Phần ăn nhập vào không hợp lệ.");
      return;
    }
    handleAdd();
  };
  return (
    <>
      <div style={{ marginBottom: 10, marginTop: 10 }}>
        <label className="form-label">Tìm kiếm món ăn</label>
        <input
          onChange={(e) => handleChangeSearchInput(e)}
          className="form-control"
          name="keyword"
          type="text"
          defaultValue={keyword}
          placeholder="VD: Bún Bò Huế"
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
              right: "100px",
              top: "-170px",
              padding: "10px 10px",
              borderRadius: 10,
              minWidth: "300px",
              backgroundColor: "aliceblue",
            }}
          >
            <div style={{ textAlign: "center", color: "#007bff" }}>
              {showFormInputQuanty.ten_mon}
            </div>

            <div>
              <label className="form-label">Chọn bữa ăn</label>
              <select
                onChange={(e) =>
                  setNgayAnInput({
                    ...ngayAnInput,
                    bua_an_id: Number(e.target.value),
                  })
                }
                className="form-select"
                name="bua_an_id"
                value={ngayAnInput.bua_an_id}
              >
                {buaAnList.map((bua_an, index) => {
                  return (
                    <option key={index} value={bua_an.bua_an_id}>
                      {bua_an.ten_bua_an}
                    </option>
                  );
                })}
              </select>
            </div>

            <div
              style={{
                marginTop: 10,
              }}
            >
              <label className="form-label">Nhập phần ăn</label>
              <input
                onChange={(e) => handleChangeChiTietMonInput(e)}
                className="form-control"
                name="quanty"
                type="number"
                defaultValue={ngayAnInput.quanty}
                placeholder="VD: 2"
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
          maxHeight: 120,
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
                    handleShowFormInputQuanty({
                      id_monan: item.id_monan,
                      ten_mon: item.ten_mon,
                    });
                  }}
                  className="table-white"
                  style={{ cursor: "pointer" }}
                >
                  <td>{index + 1}</td>
                  <td>{item.ten_mon}</td>
                  <td>{item.ten_nhom}</td>
                  <td>{Number(item.TOTAL_ENERC).toFixed(0) + " calo"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
