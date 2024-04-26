import React, { useState, useEffect } from "react";
import axios from "axios";
import { notify } from "../../../../Utils/Title";
import { useNavigate } from "react-router-dom";
import {
  DoiTuongAdminURL,
  LaoDongAdminURL,
  NhomTuoiAdminURL,
  NhuCauHangNgayAdminURL,
  ThanhPhanNhuCauAdminURL,
} from "../../../../api/Admin";
export default function FormEditNhuCauHN({
  status,
  closeFormConfirm,
  loadData,
  itemChoose,
  params,
  setPage,
}) {
  let [inputValue, setInputValue] = useState({
    id_nhomtuoi: itemChoose ? itemChoose.id_nhomtuoi : -1,
    id_laodong: itemChoose ? itemChoose.id_laodong : -1,
    id_doituong: itemChoose ? itemChoose.id_doituong : -1,
    id_nhucau: itemChoose ? itemChoose.id_nhucau : -1,
  });
  let [nhomTuoiList, setNhomTuoiList] = useState([]);
  let [laoDongList, setLaoDongList] = useState([]);
  let [doiTuongList, setDoiTuongList] = useState([]);
  let [nhuCauList, setNhuCauList] = useState([]);
  let navigate = useNavigate();
  const handleEvent = async () => {
    if (inputValue.id_doituong === -1) {
      notify(false, "Vui lòng chọn đối tượng");
      return;
    }
    if (inputValue.id_doituong === -1) {
      notify(false, "Vui lòng chọn nhóm tuổi");
      return;
    }
    if (inputValue.id_laodong === -1) {
      notify(false, "Vui lòng chọn lao động");
      return;
    }
    if (inputValue.id_nhucau === -1) {
      notify(false, "Vui lòng chọn nhu cầu");
      return;
    }
    if (status === "admin_edit_nhucauhanggay") {
      const new_nhucauhangngay = {
        id_nhomtuoi: inputValue.id_nhomtuoi,
        id_laodong: inputValue.id_laodong,
        id_doituong: inputValue.id_doituong,
        id_nhucau: inputValue.id_nhucau,
        id_nhomtuoi_old: itemChoose.id_nhomtuoi,
        id_laodong_old: itemChoose.id_laodong,
        id_doituong_old: itemChoose.id_doituong,
        id_nhucau_old: itemChoose.id_nhucau,
      };
      const response = await axios.put(
        `${NhuCauHangNgayAdminURL}${params}`,
        new_nhucauhangngay,
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
    } else if (status === "admin_add_nhucauhanggay") {
      const new_nhucauhangngay = {
        id_nhomtuoi: inputValue.id_nhomtuoi,
        id_laodong: inputValue.id_laodong,
        id_doituong: inputValue.id_doituong,
        id_nhucau: inputValue.id_nhucau,
      };
      const response = await axios.post(
        `${NhuCauHangNgayAdminURL}${params}`,
        new_nhucauhangngay,
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

  useEffect(() => {
    const getAllNhomTuoi = async () => {
      const response = await axios.get(`${NhomTuoiAdminURL}`, {
        withCredentials: true,
      });
      setNhomTuoiList(response.data.data);
    };
    const getAllLaoDong = async () => {
      const response = await axios.get(`${LaoDongAdminURL}`, {
        withCredentials: true,
      });
      setLaoDongList(response.data.data);
    };
    const getAllDoiTuong = async () => {
      const response = await axios.get(`${DoiTuongAdminURL}`, {
        withCredentials: true,
      });
      setDoiTuongList(response.data.data);
    };
    const getAllNhuCau = async () => {
      const response = await axios.get(`${ThanhPhanNhuCauAdminURL}`, {
        withCredentials: true,
      });
      setNhuCauList(response.data.data);
    };

    const handleAPIAll = async () => {
      await Promise.all([Promise.resolve(getAllNhomTuoi())]);
      await Promise.all([Promise.resolve(getAllLaoDong())]);
      await Promise.all([Promise.resolve(getAllDoiTuong())]);
      await Promise.all([Promise.resolve(getAllNhuCau())]);
    };
    handleAPIAll();
  }, []);

  const handleCloseEvent = () => {
    closeFormConfirm();
  };

  const handleChangeInput = (e) => {
    let { name, value } = e.target;
    value = Number(value);
    setInputValue({ ...inputValue, [name]: value });
  };

  return (
    <div
      className="confirm_container remove_customer_class bg-white"
      style={{
        width: "500px",
      }}
    >
      <div
        className="confirm_header text-white bg-primary"
        style={{ padding: 10, fontWeight: 700 }}
      >
        <i className="fas fa-check-circle" style={{ color: "#47f764" }} />
        <span style={{ marginLeft: 3 }}>
          {" "}
          {status === "admin_add_nhucauhanggay"
            ? "Thêm Nhu Cầu Hàng Ngày"
            : "Cập Nhật Nhu Cầu Hàng Ngày"}
        </span>
      </div>
      <div
        className="confirm_content"
        style={{ padding: 10, textAlign: "center" }}
      >
        <div style={{ textAlign: "left" }}>
          <label className="form-label">Chọn nhóm đối tượng:</label>
          <select
            onChange={(e) => handleChangeInput(e)}
            className="form-select"
            name="id_doituong"
            value={inputValue.id_doituong}
          >
            <option value={-1}>Chọn nhóm đối tượng</option>
            {doiTuongList.map((doi_tuong, index) => {
              return (
                <option key={index} value={doi_tuong.id_doituong}>
                  {doi_tuong.TenDoiTuong}
                </option>
              );
            })}
          </select>
        </div>
        <div style={{ textAlign: "left", marginTop: 10 }}>
          <label className="form-label">Chọn nhóm tuổi:</label>
          <select
            onChange={(e) => handleChangeInput(e)}
            className="form-select"
            name="id_nhomtuoi"
            value={inputValue.id_nhomtuoi}
          >
            <option value={-1}>Chọn nhóm tuổi</option>
            {nhomTuoiList.map((nhom_tuoi, index) => {
              return (
                <option key={index} value={nhom_tuoi.id_nhomtuoi}>
                  {nhom_tuoi.TenNhomTuoi}
                </option>
              );
            })}
          </select>
        </div>
        <div style={{ textAlign: "left", marginTop: 10 }}>
          <label className="form-label">Chọn nhóm lao động:</label>
          <select
            onChange={(e) => handleChangeInput(e)}
            className="form-select"
            name="id_laodong"
            value={inputValue.id_laodong}
          >
            <option value={-1}>Chọn nhóm lao động</option>
            {laoDongList.map((lao_dong, index) => {
              return (
                <option key={index} value={lao_dong.id_laodong}>
                  {lao_dong.TenLaoDong}
                </option>
              );
            })}
          </select>
        </div>
        <div style={{ textAlign: "left", marginTop: 10 }}>
          <label className="form-label">Chọn thành phần nhu cầu:</label>
          <select
            onChange={(e) => handleChangeInput(e)}
            className="form-select"
            name="id_nhucau"
            value={inputValue.id_nhucau}
          >
            <option value={-1}>Chọn thành phần nhu cầu</option>
            {nhuCauList.map((nhu_cau, index) => {
              return (
                <option key={index} value={nhu_cau.id_nhucau}>
                  {nhu_cau.DienGiai}
                </option>
              );
            })}
          </select>
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
            {status === "admin_add_nhucauhanggay" ? "Thêm" : "Lưu"}
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
