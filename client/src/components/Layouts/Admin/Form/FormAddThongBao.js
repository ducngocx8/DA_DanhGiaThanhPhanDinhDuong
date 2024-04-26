import React, { useState } from "react";
import axios from "axios";
import { notify } from "../../../../Utils/Title";
import { useNavigate } from "react-router-dom";
import { ThongBaoAdminURL } from "../../../../api/Admin";
export default function FormAddThongBao({ closeFormConfirm }) {
  let [message, setMessage] = useState({
    title: "",
    body: "",
  });
  let navigate = useNavigate();
  const handleEvent = async () => {
    const new_role = {
      title: message.title,
      body: message.body,
    };
    const response = await axios.post(`${ThongBaoAdminURL + "/"}`, new_role, {
      withCredentials: true,
    });
    if (response.data.status) {
      notify(true, response.data.message);
      closeFormConfirm();
    } else {
      notify(false, response.data.message);
      if (response.data.must === "login") {
        return navigate("/account/login", { replace: true });
      } else if (response.data.must === "permission") {
        return navigate("/", { replace: true });
      }
    }
  };

  const handleCloseEvent = () => {
    closeFormConfirm();
  };

  const handleChangeRole = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setMessage({ ...message, [name]: value });
  };

  return (
    <div className="confirm_container remove_customer_class bg-white">
      <div
        className="confirm_header text-white bg-primary"
        style={{ padding: 10, fontWeight: 700 }}
      >
        <i className="fas fa-check-circle" style={{ color: "#47f764" }} />
        <span style={{ marginLeft: 3 }}>Tạo thông báo mới</span>
      </div>
      <div
        className="confirm_content"
        style={{ padding: 10, textAlign: "center" }}
      >
        <div style={{ textAlign: "left", marginTop: 10 }}>
          <label className="form-label">Tiêu đề:</label>
          <input
            className="form-control showordisable"
            placeholder="Tiêu đề"
            type="text"
            name="title"
            defaultValue={message.title}
            onInput={(e) => handleChangeRole(e)}
          ></input>
        </div>
        <div style={{ textAlign: "left", marginTop: 10 }}>
          <label className="form-label">Nội dung:</label>
          <textarea
            className="form-control showordisable"
            placeholder="Nội dung"
            type="text"
            defaultValue={message.body}
            name="body"
            onInput={(e) => handleChangeRole(e)}
            rows={3}
          ></textarea>
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
            Tạo mới
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
