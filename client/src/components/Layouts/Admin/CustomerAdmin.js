import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminThemeTop from "./AdminThemeTop";
import ReactPaginate from "react-paginate";
import SearchTheme from "./SearchTheme";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../Utils/Title";
import FormAddUser from "./Form/FormAddUser";
import FormUserDetail from "./Form/FormUserDetail";
import FormEditUser from "./Form/FormEditUser";
import {
  AdminUploadImageUserURL,
  CountAdminURL,
  CustomerAdminURL,
  UploadImageWebURL,
} from "../../../api/Admin";
import { BACKEND_HOME } from "../../../api";
import CustomerFilter from "./CustomerFilter";

export default function CustomerAdmin({ username }) {
  let [userList, setUserList] = useState([]);
  let [page, setPage] = useState(1);
  const maxShow = 7;
  let navigate = useNavigate();
  let [itemEdit, setItemEdit] = useState(false);
  let [itemAdd, setItemAdd] = useState(false);
  let [itemDetail, setItemDetail] = useState(false);
  let [sort, setSort] = useState("user_id");
  let [count, setCount] = useState(0);
  let [sortType, setSortType] = useState("ASC");
  let [keyword, setKeyword] = useState("");
  let [status, setStatus] = useState(1);

  const handleChangeSort = (newSort) => {
    setSort(newSort);
    if (sortType === "ASC") {
      setSortType("DESC");
    } else if (sortType === "DESC") {
      setSortType("ASC");
    }
  };

  const handleShowFormEdit = (item) => {
    setItemEdit(item);
  };

  const handleShowFormAdd = () => {
    setItemAdd(true);
  };

  const handleShowFormDetail = (user) => {
    setItemDetail(user);
  };

  const closeFormDetail = () => {
    setItemDetail(false);
  };

  const handleCloseFormEdit = async () => {
    setItemEdit(false);
  };

  useEffect(() => {
    async function getAllUser() {
      const response = await axios.get(
        `${CustomerAdminURL}/get/offset?offset=${
          (page - 1) * maxShow
        }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}&status=${status}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        setUserList(response.data.data);
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    }
    getAllUser();
  }, [page, navigate, sort, sortType, keyword, status]);

  useEffect(() => {
    async function getCount() {
      const response = await axios.get(
        `${CountAdminURL}/user?keyword=${keyword}&status=${status}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        if (response.data.data === 0) {
          setPage(1);
        } else {
          const page_count = response.data.data % maxShow;
          if (page_count === 0) {
            if (response.data.data / maxShow < page) {
              setPage(response.data.data / maxShow);
            }
          } else {
            if (Math.floor(response.data.data / maxShow) + 1 < page) {
              setPage(Math.floor(response.data.data / maxShow) + 1);
            }
          }
        }
        setCount(response.data.data);
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    }
    const getAll = async () => {
      await Promise.all([Promise.resolve(getCount())]);
    };
    getAll();
  }, [page, navigate, sort, sortType, keyword, userList, status]);

  const handleChangeImage = async (e, user_id) => {
    // Upload image Server
    const fileImage = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    let formData = new FormData();
    formData.append("photo", fileImage.data);
    const response = await fetch(UploadImageWebURL, {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    if (!result.status) {
      notify(false, result.message);
      return;
    }
    // Change Path Database
    const image = {
      image_url: result.filename,
    };
    const update_response = await axios.put(
      `${AdminUploadImageUserURL + "/" + user_id}?offset=${
        (page - 1) * maxShow
      }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}&status=${status}`,
      image,
      {
        withCredentials: true,
      }
    );
    notify(update_response.data.status, update_response.data.message);
    if (update_response.data.status) {
      setUserList(update_response.data.data);
    } else {
      if (update_response.data.must === "login") {
        return navigate("/", { replace: true });
      } else if (update_response.data.must === "permission") {
        return navigate("/", { replace: true });
      }
    }
  };

  const handlePageClick = (event) => {
    if (page !== event.selected + 1) setPage(event.selected + 1);
  };

  const loadData = (data) => {
    setUserList(data);
  };

  const handleCloseFormAdd = async () => {
    setItemAdd(false);
  };

  const handleSearch = (keyword) => {
    setKeyword(keyword.toLowerCase().trim());
  };

  return (
    <div id="main">
      {itemAdd || itemEdit || itemDetail ? (
        <div
          className="background_black"
          id="background_black"
          style={{ display: "block" }}
        >
          {itemEdit ? (
            <FormEditUser
              itemChoose={itemEdit}
              status={"admin_edit_order"}
              closeForm={handleCloseFormEdit}
              loadData={loadData}
              params={`?offset=${
                (page - 1) * maxShow
              }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}&status=${status}`}
              setPage={setPage}
            />
          ) : (
            ""
          )}

          {itemDetail ? (
            <FormUserDetail
              itemChoose={itemDetail}
              closeForm={closeFormDetail}
            />
          ) : (
            ""
          )}

          {itemAdd ? (
            <FormAddUser
              status={"admin_edit_user"}
              closeFormAdd={handleCloseFormAdd}
              loadData={loadData}
              params={`?offset=${
                (page - 1) * maxShow
              }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}&status=${status}`}
              setPage={setPage}
            />
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
      <div className="page-content">
        <section className="row">
          <div className="col-12 col-lg-12">
            <AdminThemeTop username={username} />
            <CustomerFilter setStatus={setStatus} status={status} />
            <SearchTheme
              title={"Tìm kiếm người dùng"}
              handleSearch={handleSearch}
            />
            <div className="row">
              <div className="col-12">
                <div className="col-lg-12 stretch-card" style={{ padding: 0 }}>
                  <div className="card">
                    <div className="card-body">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <h4
                          className="card-title"
                          style={{ marginBottom: "0 !important" }}
                        >
                          Danh sách người dùng
                        </h4>

                        <div style={{ display: "flex" }}>
                          <button
                            id="info"
                            className="btn btn-success btn_add"
                            onClick={() => handleShowFormAdd()}
                          >
                            <i className="fas fa-plus" />{" "}
                            <span>Thêm Người Dùng</span>
                          </button>
                        </div>
                      </div>
                      <div className="table-responsive pt-3">
                        <table className="table table-bordered text-center">
                          <thead>
                            <tr>
                              <th
                                onClick={() => {
                                  handleChangeSort("user_id");
                                }}
                              >
                                ID
                              </th>
                              <th>Ảnh đại diện</th>
                              <th
                                onClick={() => {
                                  handleChangeSort("username");
                                }}
                              >
                                Username
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("email");
                                }}
                              >
                                Email
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("phonenumber");
                                }}
                              >
                                Số điện thoại
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("role_id");
                                }}
                              >
                                Quyền
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("user_status");
                                }}
                              >
                                Trạng thái
                              </th>
                              <th>Cập nhật</th>
                            </tr>
                          </thead>
                          <tbody>
                            {userList.map((user, index) => {
                              return (
                                <tr key={index} className="table-white">
                                  <td>{user.user_id}</td>
                                  <td>
                                    {user.image_url.trim().length === 0 ? (
                                      "-"
                                    ) : (
                                      <img
                                        style={{
                                          width: 60,
                                          height: 60,
                                          objectFit: "cover",
                                          borderRadius: "50%",
                                        }}
                                        src={BACKEND_HOME + user.image_url}
                                        alt="anh_dai_dien"
                                      />
                                    )}
                                  </td>
                                  <td>{user.username}</td>
                                  <td>{user.email}</td>
                                  {user.phonenumber !== "" ? (
                                    <td
                                      style={{
                                        color: "#007bff",
                                        fontWeight: 700,
                                      }}
                                    >
                                      {user.phonenumber}
                                    </td>
                                  ) : (
                                    <td
                                      style={{
                                        color: "#ffc107",
                                        fontWeight: 700,
                                      }}
                                    >
                                      Chưa cập nhật
                                    </td>
                                  )}
                                  <td>{user.Role.role_name}</td>
                                  {user.user_status === 1 ? (
                                    <td
                                      style={{
                                        color: "#007bff",
                                        fontWeight: 700,
                                      }}
                                    >
                                      Chưa xác thực
                                    </td>
                                  ) : user.user_status === 2 ? (
                                    <td
                                      style={{
                                        color: "#28a745",
                                        fontWeight: 700,
                                      }}
                                    >
                                      Đang hoạt động
                                    </td>
                                  ) : (
                                    <td
                                      style={{
                                        color: "#dc3545",
                                        fontWeight: 700,
                                      }}
                                    >
                                      Tạm khóa
                                    </td>
                                  )}
                                  <td>
                                    <button
                                      onClick={() => handleShowFormEdit(user)}
                                      type="button"
                                      className="btn btn-warning m-1 btn_edit"
                                    >
                                      <i className="far fa-edit" />
                                    </button>

                                    <button
                                      className="btn btn-info btn_change_status"
                                      onClick={() => handleShowFormDetail(user)}
                                    >
                                      Chi Tiết
                                    </button>

                                    <button
                                      style={{
                                        position: "relative",
                                      }}
                                      type="button"
                                      className="btn btn-success m-1 btn_delete"
                                    >
                                      <input
                                        onChange={(e) => {
                                          handleChangeImage(e, user.user_id);
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
                                      <i
                                        style={{ color: "white" }}
                                        className="fa fa-upload"
                                      />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                      <div className="flex_center">
                        <div>Tổng số: {count}</div>
                        <ReactPaginate
                          forcePage={page - 1}
                          breakLabel="..."
                          nextLabel="Next"
                          onPageChange={handlePageClick}
                          pageRangeDisplayed={2}
                          pageCount={
                            count <= maxShow
                              ? 1
                              : count % maxShow === 0
                              ? Math.floor(count / maxShow)
                              : Math.floor(count / maxShow) + 1
                          }
                          previousLabel="Previous"
                          renderOnZeroPageCount={null}
                          pageClassName="page-item"
                          pageLinkClassName="page-link"
                          previousClassName="page-item"
                          previousLinkClassName="page-link"
                          nextClassName="page-item"
                          nextLinkClassName="page-link"
                          breakClassName="page-item"
                          breakLinkClassName="page-link"
                          containerClassName="pagination"
                          activeClassName="active"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
