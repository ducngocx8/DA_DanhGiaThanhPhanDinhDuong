import React from "react";
import { BACKEND_HOME } from "../../../../api";

export default function FormUserDetail({ itemChoose, closeForm }) {
  const userState = {
    username: itemChoose.username,
    password: itemChoose.password,
    email: itemChoose.email,
    address: itemChoose.address,
    firstname: itemChoose.firstname,
    lastname: itemChoose.lastname,
    phonenumber: itemChoose.phonenumber,
    user_status: itemChoose.user_status,
    role_name: itemChoose.Role.role_name,
    image_url: itemChoose.image_url,
  };

  return (
    <div
      className="row col-6 add_edit_class"
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
          Chi Tiết Người Dùng
        </div>
        <i
          onClick={() => closeForm(false, false)}
          className="far fa-times-circle btn_close_form"
          style={{ color: "white", fontSize: 25 }}
        />
      </div>
      <div className="sroll_form" id="style-14">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          {userState.image_url.trim() !== "" && (
            <img alt="hinh_anh"
              style={{
                width: 80,
                height: 80,
                backgroundColor: "white",
                borderRadius: "50%",
                objectFit: "cover",
              }}
              src={BACKEND_HOME + userState.image_url}
            />
          )}
        </div>
        <div style={{ padding: 20, display: "flex" }}>
          <div className="col-6">
            <div style={{ marginBottom: 20 }}>
              <label className="form-label">Tên Đăng Nhập</label>
              <input
                disabled
                className="form-control showordisable"
                name="username"
                defaultValue={userState.username}
                type="text"
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label className="form-label">First Name</label>
              <input
                disabled
                className="form-control"
                name="firstname"
                defaultValue={userState.firstname}
                type="text"
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label className="form-label">Số Điện Thoại</label>
              <input
                disabled
                className="form-control"
                name="phonenumber"
                type="number"
                defaultValue={userState.phonenumber}
              />
            </div>

            <div>
              <label className="form-label">Quyền hạn</label>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <div className="one_role">{userState.role_name}</div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div style={{ marginBottom: 20 }}>
              <label className="form-label">Email</label>
              <input
                disabled
                className="form-control"
                name="email"
                type="email"
                defaultValue={userState.email}
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label className="form-label">Last Name</label>
              <input
                disabled
                className="form-control"
                name="lastname"
                type="text"
                defaultValue={userState.lastname}
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label className="form-label">Mật Khẩu</label>
              <input
                disabled
                className="form-control showordisable"
                name="password"
                type="password"
                defaultValue={userState.password}
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label className="form-label">Trạng thái</label>
              <select
                disabled
                className="form-select"
                name="user_status"
                defaultValue={userState.user_status}
                aria-label="Default select example"
              >
                <option value={1}>Chưa xác thực</option>
                <option value={2}>Đang hoạt động</option>
                <option value={3}>Tạm Khóa</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
