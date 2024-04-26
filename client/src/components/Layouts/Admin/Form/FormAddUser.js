import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  notify,
  regexEmail,
  regexPhone,
  regexUsername,
} from "../../../../Utils/Title";
import { useNavigate } from "react-router-dom";
import {
  CustomerAdminURL,
  RoleAdminURL,
  UploadImageWebURL,
} from "../../../../api/Admin";

export default function FormAddUser({
  closeFormAdd,
  loadData,
  params,
  setPage,
}) {
  let [roleList, setRoleList] = useState([]);
  let [imageSelected, setImageSelected] = useState(false);
  let navigate = useNavigate();
  let [userState, setUserState] = useState({
    username: "",
    password: "",
    email: "",
    address: "",
    firstname: "",
    lastname: "",
    phonenumber: "",
    image_url: "",
    user_status: 1,
    role_id: -1,
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
    getAllRole();
  }, [navigate]);

  const handleOnChange = (e) => {
    let { name, value } = e.target;
    if (name === "role_id" || name === "user_status") {
      value = Number(value);
    }
    setUserState({ ...userState, [name]: value });
  };

  const handleUploadImage = async (e) => {
    const fileImage = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImageSelected(fileImage);
  };

  const addUser = async (newUser) => {
    const response = await axios.post(`${CustomerAdminURL}${params}`, newUser, {
      withCredentials: true,
    });
    notify(response.data.status, response.data.message);
    if (response.data.status) {
      loadData(response.data.data);
      if (response.data.page) {
        setPage(response.data.page);
      }
      closeFormAdd();
    } else {
      if (response.data.must === "login") {
        return navigate("/", { replace: true });
      } else if (response.data.must === "permission") {
        return navigate("/", { replace: true });
      }
    }
  };

  const uploadAnhBeforeAdd = async () => {
    // Upload ảnh đại diện
    let filename = "";
    if (imageSelected) {
      let formData = new FormData();
      formData.append("photo", imageSelected.data);
      const response_update = await fetch(UploadImageWebURL, {
        method: "POST",
        body: formData,
      });
      const result = await response_update.json();
      if (!result.status) {
        notify(false, result.message);
        return;
      }
      filename = result.filename;
    }
    return filename;
  };

  const handleAddUser = async () => {
    if (!regexUsername.test(userState.username.trim())) {
      notify(false, "Username không hợp lệ");
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

    // Upload ảnh đại diện
    const filename = await uploadAnhBeforeAdd();
    const newUser = {
      username: userState.username.trim(),
      password: userState.password.trim(),
      email: userState.email.trim(),
      firstname: userState.firstname.trim(),
      lastname: userState.lastname.trim(),
      phonenumber: userState.phonenumber.trim(),
      user_status: Number(userState.user_status),
      role_id: Number(userState.role_id),
      image_url: filename,
    };
    await addUser(newUser);
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
        <div className="text-white add_book_class_header">Thêm Người Dùng</div>
        <i
          onClick={() => closeFormAdd()}
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
          {imageSelected && (
            <img
              style={{
                width: 80,
                height: 80,
                backgroundColor: "red",
                borderRadius: "50%",
                objectFit: "cover",
              }}
              alt="xem_truoc"
              src={imageSelected.preview}
            />
          )}
          <button
            className="btn btn-success"
            style={{
              position: "relative",
              whiteSpace: "nowrap",
              marginTop: 10,
            }}
          >
            Thêm ảnh đại diện
            <input
              onChange={(e) => {
                handleUploadImage(e);
              }}
              style={{
                opacity: 0,
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              className="form-control"
              name="hinh_anh"
              type="file"
            />
          </button>
        </div>
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
        {/* <div className="col-12" style={{ padding: "0px 35px", margin: 0 }}>
          <label className="form-label">Địa chỉ</label>
          <textarea
            className="form-control"
            id="user-address"
            name="address"
            type="text"
            rows="3"
            placeholder="VD: Diễn Hoàng, Diễn Châu, Nghệ An"
          />
        </div> */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: 10,
          }}
        >
          <button
            onClick={() => handleAddUser()}
            className="btn btn-success btn_add_edit_customer_submit"
          >
            Xác Nhận
          </button>
        </div>
      </div>
    </div>
  );
}
