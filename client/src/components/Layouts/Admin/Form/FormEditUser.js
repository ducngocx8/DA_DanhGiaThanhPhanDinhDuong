import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  notify,
  regexEmail,
  regexPhone,
  regexUsername,
} from "../../../../Utils/Title";
import { useNavigate } from "react-router-dom";
import { CustomerAdminURL, RoleAdminURL } from "../../../../api/Admin";

export default function FormEditUser({
  itemChoose,
  closeForm,
  loadData,
  params,
  setPage,
}) {
  let [roleList, setRoleList] = useState([]);
  let navigate = useNavigate();
  let [userState, setUserState] = useState({
    username: itemChoose.username,
    password: itemChoose.password,
    email: itemChoose.email,
    address: itemChoose.address,
    firstname: itemChoose.firstname,
    lastname: itemChoose.lastname,
    phonenumber: itemChoose.phonenumber,
    user_status: itemChoose.user_status,
    role_id: itemChoose.role_id,
  });
  useEffect(() => {
    async function getAllRole() {
      const response = await axios.get(`${RoleAdminURL}`, {
        withCredentials: true,
      });
      if (response.data.status) {
        setRoleList(response.data.data);
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    }
    const list_promise = [Promise.resolve(getAllRole())];
    Promise.all(list_promise);
  }, [navigate]);

  const handleOnChange = (e) => {
    let { name, value } = e.target;
    if (name === "role_id" || name === "user_status") {
      value = Number(value);
    }
    setUserState({ ...userState, [name]: value });
  };

  const editUser = async (newUser) => {
    const response = await axios.put(
      `${CustomerAdminURL + "/" + itemChoose.user_id}${params}`,
      newUser,
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
      closeForm();
    } else {
      if (response.data.must === "login") {
        return navigate("/", { replace: true });
      } else if (response.data.must === "permission") {
        return navigate("/", { replace: true });
      }
    }
  };

  const handleEditUser = async () => {
    if (!regexUsername.test(userState.username.trim())) {
      notify(false, "Vui lòng điền Username");
      return;
    }
    if (!regexEmail.test(userState.email.trim())) {
      notify(false, "Địa chỉ Email không hợp lệ");
      return;
    }

    if (userState.phonenumber.trim() !== "") {
      if (!regexPhone.test(userState.phonenumber.trim())) {
        notify(false, "Số điện thoại không hợp lệ");
        return;
      }
    }

    if (userState.password.trim() < 3) {
      notify(false, "Vui lòng điền password >= 3 ký tự");
      return;
    }
    if (
      !Number.isInteger(Number(userState.user_status)) ||
      Number(userState.user_status) > 3 ||
      userState.user_status < 1
    ) {
      notify(false, "Vui lòng chọn trạng thái người dùng");
      return;
    }
    if (
      Number(userState.role_id) === -1 ||
      typeof userState.role_id !== "number"
    ) {
      notify(false, "Vui lòng chọn quyền hạn");
      return;
    }
    const newUser = {
      username: userState.username.trim(),
      password: userState.password.trim(),
      email: userState.email.trim(),
      firstname: userState.firstname.trim(),
      lastname: userState.lastname.trim(),
      phonenumber: userState.phonenumber.trim(),
      user_status: Number(userState.user_status),
      role_id: Number(userState.role_id),
    };
    await editUser(newUser);
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
          Cập Nhật Thông Tin Người Dùng
        </div>
        <i
          onClick={() => closeForm()}
          className="far fa-times-circle btn_close_form"
          style={{ color: "white", fontSize: 25 }}
        />
      </div>
      <div className="sroll_form" id="style-14">
        <div style={{ padding: 20, display: "flex" }}>
          <div className="col-6">
            <div style={{ marginBottom: 20 }}>
              <label className="form-label">Tên Đăng Nhập</label>
              <input
                onChange={(e) => handleOnChange(e)}
                className="form-control showordisable"
                name="username"
                defaultValue={userState.username}
                type="text"
                placeholder="VD: NgocDZ"
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label className="form-label">First Name</label>
              <input
                onChange={(e) => handleOnChange(e)}
                className="form-control"
                name="firstname"
                defaultValue={userState.firstname}
                type="text"
                placeholder="VD: Ngọc"
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label className="form-label">Số Điện Thoại</label>
              <input
                onChange={(e) => handleOnChange(e)}
                className="form-control"
                name="phonenumber"
                type="number"
                placeholder="VD: 0378544081"
                defaultValue={userState.phonenumber}
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label className="form-label">Trạng thái</label>
              <select
                onChange={(e) => handleOnChange(e)}
                className="form-select"
                name="user_status"
                value={userState.user_status}
                aria-label="Default select example"
              >
                <option value={1}>Chưa xác thực</option>
                <option value={2}>Đang hoạt động</option>
                <option value={3}>Tạm Khóa</option>
              </select>
            </div>
          </div>
          <div className="col-6">
            <div style={{ marginBottom: 20 }}>
              <label className="form-label">Email</label>
              <input
                onChange={(e) => handleOnChange(e)}
                className="form-control"
                name="email"
                type="email"
                defaultValue={userState.email}
                placeholder="VD: admin@gmail.com"
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label className="form-label">Last Name</label>
              <input
                onChange={(e) => handleOnChange(e)}
                className="form-control"
                name="lastname"
                type="text"
                defaultValue={userState.lastname}
                placeholder="VD: Nguyễn"
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label className="form-label">Nhập Mật Khẩu</label>
              <input
                onChange={(e) => handleOnChange(e)}
                className="form-control showordisable"
                name="password"
                type="password"
                defaultValue={userState.password}
              />
            </div>

            <div>
              <label className="form-label">Quyền</label>
              <div className="flex_center">
                <select
                  onChange={(e) => handleOnChange(e)}
                  className="form-select noborderRadius"
                  name="role_id"
                  aria-label="Default select example"
                  value={userState.role_id}
                >
                  <option value={-1}>Vui lòng chọn Quyền</option>
                  {roleList.map((role, index) => {
                    return (
                      <option key={index} value={role.role_id}>
                        {role.role_name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: 10,
          }}
        >
          <input
            className="form-control"
            id="user-id"
            defaultValue={-1}
            name="user_id"
            type="hidden"
          />
          <input
            className="form-control"
            id="defaultPhone"
            name="defaultPhone"
            type="hidden"
          />
          <input
            className="form-control"
            id="defaultEmail"
            name="defaultEmail"
            type="hidden"
          />
          <button
            onClick={() => handleEditUser()}
            className="btn btn-success btn_add_edit_customer_submit"
          >
            Xác Nhận
          </button>
        </div>
      </div>
    </div>
  );
}
