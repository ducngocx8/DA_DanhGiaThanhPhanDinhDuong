import React, { useState } from "react";
import axios from "axios";
import { notify } from "../../../../Utils/Title";
import { useNavigate } from "react-router-dom";
import { ChiSoDuongHuyetAdminURL } from "../../../../api/Admin";
export default function FormEditDuongHuyet({
  status,
  closeFormConfirm,
  loadData,
  itemChoose,
  setPage,
  params,
}) {
  let [inputDuongHuyet, setInputDuongHuyet] = useState({
    id_thucpham: itemChoose ? itemChoose.id_thucpham : "",
    TenThucPham: itemChoose ? itemChoose.TenThucPham : "",
    GI: itemChoose ? Number(itemChoose.GI) * 1 : "",
  });
  let navigate = useNavigate();
  const handleEvent = async () => {
    if (
      typeof inputDuongHuyet.id_thucpham !== "string" ||
      (typeof inputDuongHuyet.id_thucpham === "string" &&
        inputDuongHuyet.id_thucpham.trim() === "")
    ) {
      notify(false, "Mã thực phẩm không hợp lệ");
      return;
    }
    if (
      typeof inputDuongHuyet.TenThucPham !== "string" ||
      (typeof inputDuongHuyet.TenThucPham === "string" &&
        inputDuongHuyet.TenThucPham.trim() === "")
    ) {
      notify(false, "Tên thực phẩm không hợp lệ");
      return;
    }
    if (
      typeof inputDuongHuyet.GI !== "number" ||
      isNaN(Number(inputDuongHuyet.GI))
    ) {
      notify(false, "Chỉ số đường huyết GI không hợp lệ");
      return;
    }

    if (status === "admin_edit_chi_so_duong_huyet") {
      const new_item = {
        TenThucPham: inputDuongHuyet.TenThucPham,
        GI: inputDuongHuyet.GI,
      };
      const response = await axios.put(
        `${ChiSoDuongHuyetAdminURL + "/" + itemChoose.id_thucpham}${params}`,
        new_item,
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
    } else if (status === "admin_add_chi_so_duong_huyet") {
      const new_item = {
        id_thucpham: inputDuongHuyet.id_thucpham,
        TenThucPham: inputDuongHuyet.TenThucPham,
        GI: inputDuongHuyet.GI,
      };
      const response = await axios.post(
        `${ChiSoDuongHuyetAdminURL}${params}`,
        new_item,
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

  const handleChangeInput = (e) => {
    let { name, value } = e.target;
    if (name === "GI") {
      value = Number(value);
    }
    setInputDuongHuyet({ ...inputDuongHuyet, [name]: value });
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
          {status === "admin_add_chi_so_duong_huyet"
            ? "Thêm Chỉ Số Đường Huyết Thực Phẩm"
            : "Cập Nhật Chỉ Số Đường Huyết"}
        </span>
      </div>
      <div
        className="confirm_content"
        style={{ padding: 10, textAlign: "center" }}
      >
        <div style={{ textAlign: "left", marginTop: 10 }}>
          <label className="form-label">Mã thực phẩm:</label>
          <input
            className="form-control showordisable"
            placeholder="Mã thực phẩm"
            type="text"
            name="id_thucpham"
            defaultValue={inputDuongHuyet.id_thucpham}
            disabled={status === "admin_add_chi_so_duong_huyet" ? false : true}
            onInput={(e) => handleChangeInput(e)}
          ></input>
        </div>
        <div style={{ textAlign: "left", marginTop: 10 }}>
          <label className="form-label">Tên thực phẩm:</label>
          <input
            className="form-control showordisable"
            placeholder="Tên thực phẩm"
            type="text"
            name="TenThucPham"
            defaultValue={inputDuongHuyet.TenThucPham}
            onInput={(e) => handleChangeInput(e)}
          ></input>
        </div>
        <div style={{ textAlign: "left", marginTop: 10 }}>
          <label className="form-label">Chỉ số GI:</label>
          <input
            className="form-control showordisable"
            placeholder="Chỉ số đường huyết"
            type="number"
            defaultValue={inputDuongHuyet.GI}
            name="GI"
            onInput={(e) => handleChangeInput(e)}
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
            {status === "admin_add_chi_so_duong_huyet" ? "Thêm" : "Lưu"}
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
