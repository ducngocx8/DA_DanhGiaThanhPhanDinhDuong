import React, { useState } from "react";
import axios from "axios";
import { notify } from "../../../../Utils/Title";
import { useNavigate } from "react-router-dom";
import { NhomTuoiAdminURL } from "../../../../api/Admin";
export default function FormEditNhomTuoi({
  status,
  closeFormConfirm,
  loadData,
  itemChoose,
  params,
  setPage,
}) {
  let [inputValue, setInputValue] = useState({
    TenNhomTuoi: itemChoose ? itemChoose.TenNhomTuoi : "",
    strAge: itemChoose ? itemChoose.strAge : "",
    endAge: itemChoose ? itemChoose.endAge : "",
  });
  let navigate = useNavigate();
  const handleEvent = async () => {
    if (status === "admin_edit_nhomtuoi") {
      const new_nhomtuoi = {
        TenNhomTuoi: inputValue.TenNhomTuoi,
        strAge: inputValue.strAge,
        endAge: inputValue.endAge,
      };
      const response = await axios.put(
        `${NhomTuoiAdminURL + "/" + itemChoose.id_nhomtuoi}${params}`,
        new_nhomtuoi,
        {
          withCredentials: true,
        }
      );
      notify(response.data.status, response.data.message);
      if (response.data.status) {
        loadData(response.data.data);
        if (response.data.page) {
          setPage(response.data.page);
        }
        closeFormConfirm();
      } else {
        if (response.data.must === "login") {
          return navigate("/account/login", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    } else if (status === "admin_add_nhomtuoi") {
      const new_nhomtuoi = {
        TenNhomTuoi: inputValue.TenNhomTuoi,
        strAge: inputValue.strAge,
        endAge: inputValue.endAge,
      };
      const response = await axios.post(
        `${NhomTuoiAdminURL}${params}`,
        new_nhomtuoi,
        {
          withCredentials: true,
        }
      );
      notify(response.data.status, response.data.message);
      if (response.data.status) {
        loadData(response.data.data);
        if (response.data.page) {
          setPage(response.data.page);
        }
        closeFormConfirm();
      } else {
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    }
  };

  const handleCloseEvent = () => {
    closeFormConfirm();
  };

  const handleChangeRole = (e) => {
    let { name, value } = e.target;
    if (name === "strAge" || name === "endAge") {
      value = Number(value);
    }
    setInputValue({ ...inputValue, [name]: value });
  };

  return (
    <div className="confirm_container remove_customer_class bg-white">
      <div
        className="confirm_header text-white bg-primary"
        style={{ padding: 10, fontWeight: 700 }}
      >
        <i className="fas fa-check-circle" style={{ color: "#47f764" }} />
        <span style={{ marginLeft: 3 }}>
          {" "}
          {status === "admin_add_nhomtuoi"
            ? "Thêm Nhóm tuổi"
            : "Cập Nhật Nhóm tuổi"}
        </span>
      </div>
      <div
        className="confirm_content"
        style={{ padding: 10, textAlign: "center" }}
      >
        <div style={{ textAlign: "left" }}>
          <label className="form-label">Tên nhóm tuổi:</label>
          <input
            className="form-control showordisable"
            placeholder="Tên nhóm tuổi"
            type="text"
            name="TenNhomTuoi"
            defaultValue={inputValue.TenNhomTuoi}
            onInput={(e) => handleChangeRole(e)}
          ></input>
        </div>
        <div style={{ textAlign: "left", marginTop: 10 }}>
          <label className="form-label">Số tháng tuổi bắt đầu:</label>
          <input
            className="form-control showordisable"
            placeholder="Số tháng tuổi bắt đầu"
            type="number"
            defaultValue={inputValue.strAge}
            name="strAge"
            onInput={(e) => handleChangeRole(e)}
          ></input>
        </div>
        <div style={{ textAlign: "left", marginTop: 10 }}>
          <label className="form-label">Số tháng tuổi kết thúc:</label>
          <input
            className="form-control showordisable"
            placeholder="Số tháng tuổi kết thúc"
            type="number"
            defaultValue={inputValue.endAge}
            name="endAge"
            onInput={(e) => handleChangeRole(e)}
          ></input>
        </div>
      </div>
      <div className="confirm_buttons">
        <div id="formDelete">
          <button
            onClick={() => handleEvent()}
            className="btn btn-success me-1 mb-2 btn_xacnhan_xoa"
            style={{ margin: "0px 10px" }}
            type="button"
          >
            {status === "admin_add_nhomtuoi" ? "Thêm" : "Lưu"}
          </button>
        </div>
        <button
          onClick={() => handleCloseEvent()}
          className="btn btn-danger me-1 mb-2 btn_huy_xoa"
          style={{ margin: "0px 10px" }}
          type="button"
        >
          Hủy
        </button>
      </div>
    </div>
  );
}
