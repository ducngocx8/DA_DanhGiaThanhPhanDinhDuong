import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminThemeTop from "./AdminThemeTop";
import ReactPaginate from "react-paginate";
import SearchTheme from "./SearchTheme";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../Utils/Title";
import {
  AdminUploadImageMonAnURL,
  CountAdminURL,
  MonAnAdminURL,
  UploadImageWebURL,
} from "../../../api/Admin";
import { BACKEND_HOME } from "../../../api";
import FormEditMonAn from "./Form/FormEditMonAn";
import FormAddMonAn from "./Form/FormAddMonAn";
import MonAnFilter from "./MonAnFilter";
import FormConfirm from "./Form/FormConfirm";

export default function MonAnAdmin({ username }) {
  let [monAnList, setMonAnList] = useState([]);
  let [page, setPage] = useState(1);
  const maxShow = 7;
  let navigate = useNavigate();
  let [itemEdit, setItemEdit] = useState(false);
  let [itemAdd, setItemAdd] = useState(false);
  let [itemDelete, setItemDelete] = useState(false);
  let [keyword, setKeyword] = useState("");
  let [sort, setSort] = useState("id_monan");
  let [count, setCount] = useState(0);
  let [sortType, setSortType] = useState("ASC");
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

  const handleShowFormDelete = (item) => {
    setItemDelete(item);
  };

  useEffect(() => {
    async function getAllProduct() {
      const response = await axios.get(
        `${MonAnAdminURL}/get/offset?offset=${
          (page - 1) * maxShow
        }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}&status=${status}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        setMonAnList(response.data.data);
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    }
    getAllProduct();
  }, [page, navigate, sort, sortType, keyword, status]);

  useEffect(() => {
    async function getCount() {
      const response = await axios.get(
        `${CountAdminURL}/mon-an?keyword=${keyword}&status=${status}`,
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
  }, [page, navigate, sort, sortType, keyword, status, monAnList]);

  const handlePageClick = (event) => {
    if (page !== event.selected + 1) setPage(event.selected + 1);
  };

  const loadData = async (data) => {
    setMonAnList(data);
  };

  const reloadData = async () => {
    const response = await axios.get(
      `${MonAnAdminURL}/get/offset?offset=${
        (page - 1) * maxShow
      }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}&status=${status}`,
      {
        withCredentials: true,
      }
    );
    if (response.data.status) {
      setMonAnList(response.data.data);
    } else {
      notify(false, response.data.message);
      if (response.data.must === "login") {
        return navigate("/", { replace: true });
      } else if (response.data.must === "permission") {
        return navigate("/", { replace: true });
      }
    }
  };

  const handleCloseFormAdd = async (add_edit, result) => {
    if (result & !add_edit) {
      // reload_data
      await reloadData();
    }
    setItemAdd(false);
    setItemEdit(false);
    setItemDelete(false);
  };

  const handleChangeImage = async (e, id_monan) => {
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
      `${AdminUploadImageMonAnURL + "/" + id_monan}?offset=${
        (page - 1) * maxShow
      }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}&status=${status}`,
      image,
      {
        withCredentials: true,
      }
    );
    notify(update_response.data.message, update_response.data.message);
    if (update_response.data.status) {
      setMonAnList(update_response.data.data);
    } else {
      if (update_response.data.must === "login") {
        return navigate("/", { replace: true });
      } else if (update_response.data.must === "permission") {
        return navigate("/", { replace: true });
      }
    }
  };

  const handleSearch = (keyword) => {
    setKeyword(keyword.toLowerCase().trim());
  };

  return (
    <div id="main">
      {itemAdd || itemEdit || itemDelete ? (
        <div
          className="background_black"
          id="background_black"
          style={{ display: "block" }}
        >
          {itemEdit ? (
            <FormEditMonAn
              itemChoose={itemEdit}
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

          {itemAdd ? (
            <FormAddMonAn
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

          {itemDelete ? (
            <FormConfirm
              status={"admin_delete_monan"}
              content={
                "Bạn chắc chắn muốn xóa món ăn " +
                itemDelete.ten_mon +
                " với ID = "
              }
              params={`?offset=${
                (page - 1) * maxShow
              }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}&status=${status}`}
              id_handle={itemDelete.id_monan}
              closeFormConfirm={handleCloseFormAdd}
              loadData={loadData}
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
            <MonAnFilter setStatus={setStatus} status={status} />
            <SearchTheme
              title={"Tìm kiếm món ăn"}
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
                          Danh sách món ăn
                        </h4>

                        <div style={{ display: "flex" }}>
                          <button
                            id="info"
                            className="btn btn-success btn_add"
                            onClick={() => handleShowFormAdd()}
                          >
                            <i className="fas fa-plus" />{" "}
                            <span>Thêm món ăn</span>
                          </button>
                          <div
                            className="form_add display_none"
                            style={{ marginLeft: 20 }}
                          >
                            <div style={{ display: "flex" }}>
                              <input
                                className="form-control"
                                name="authorName"
                                type="text"
                                defaultValue
                                id="input_add_author"
                                placeholder="VD: Nguyễn Đức Ngọc"
                              />
                              <button
                                id="btn_add_submit"
                                style={{ marginLeft: 5 }}
                                type="submit"
                                className="btn btn-success btn_add_submit"
                              >
                                Thêm
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="table-responsive pt-3">
                        <table className="table table-bordered text-center">
                          <thead>
                            <tr>
                              <th
                                onClick={() => {
                                  handleChangeSort("id_monan");
                                }}
                              >
                                ID món ăn
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("ten_mon");
                                }}
                              >
                                Tên món ăn
                              </th>
                              <th>Hình ảnh</th>
                              <th
                                onClick={() => {
                                  // handleChangeSort("id_donvi");
                                }}
                              >
                                Đơn vị
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("id_nhommonan");
                                }}
                              >
                                Nhóm món ăn
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("user_id");
                                }}
                              >
                                Người tạo
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("monan_status");
                                }}
                              >
                                Trạng thái
                              </th>
                              <th>Cập nhật</th>
                            </tr>
                          </thead>
                          <tbody>
                            {monAnList.map((mon_an, index) => {
                              return (
                                <tr key={index} className="table-white">
                                  <td>{mon_an.id_monan}</td>
                                  <td>
                                    <a
                                      href={"/product/" + mon_an.id_monan}
                                      target="_blank"
                                      rel="nofollow noreferrer"
                                    >
                                      {mon_an.ten_mon}
                                    </a>
                                  </td>
                                  <td>
                                    {mon_an.image_url.trim() === "" ? (
                                      "Chưa có hình ảnh"
                                    ) : (
                                      <img
                                        style={{ width: 80 }}
                                        src={BACKEND_HOME + mon_an.image_url}
                                        alt="anh_mon_an"
                                      />
                                    )}
                                  </td>
                                  <td>{mon_an.don_vi}</td>
                                  <td>
                                    <a
                                      href={"/category/" + mon_an.id_nhommonan}
                                      target="_blank"
                                      rel="nofollow noreferrer"
                                    >
                                      {mon_an.NhomMonAn.ten_nhom}
                                    </a>
                                  </td>
                                  <td>
                                    {mon_an.user_id === null
                                      ? "Admin"
                                      : mon_an.User.username}
                                  </td>
                                  {mon_an.monan_status === 1 ? (
                                    <td
                                      style={{
                                        color: "#28a745",
                                        fontWeight: 700,
                                      }}
                                    >
                                      Hiện
                                    </td>
                                  ) : mon_an.monan_status === 0 ? (
                                    <td
                                      style={{
                                        color: "#dc3545",
                                        fontWeight: 700,
                                      }}
                                    >
                                      Ẩn
                                    </td>
                                  ) : (
                                    <td
                                      style={{
                                        color: "#007bff",
                                        fontWeight: 700,
                                      }}
                                    >
                                      Cho phép Public
                                    </td>
                                  )}
                                  <td>
                                    <button
                                      onClick={() => handleShowFormEdit(mon_an)}
                                      type="button"
                                      className="btn btn-warning m-1 btn_edit"
                                    >
                                      <i className="far fa-edit" />
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
                                          handleChangeImage(e, mon_an.id_monan);
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
                                    <button
                                      onClick={() =>
                                        handleShowFormDelete(mon_an)
                                      }
                                      type="button"
                                      className="btn btn-danger m-1 btn_delete"
                                    >
                                      <i
                                        style={{ color: "white" }}
                                        className="fa fa-trash-alt"
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
