import React, { useEffect, useState } from "react";
import axios from "axios";
import { notify } from "../../../Utils/Title";
import { useNavigate } from "react-router-dom";
import AdminThemeTop from "./AdminThemeTop";
import ReactPaginate from "react-paginate";
import SearchTheme from "./SearchTheme";
import FormConfirm from "./Form/FormConfirm";
import {
  AdminUploadImageBuaAnURL,
  BuaAnAdminURL,
  CountAdminURL,
  UploadImageWebURL,
} from "../../../api/Admin";
import { BACKEND_HOME } from "../../../api";

export default function BuaAnAdmin({ username }) {
  let navigate = useNavigate();
  let [addStatus, setAddStatus] = useState(false);
  let [editStatus, setEditStatus] = useState(false);
  let [deleteStatus, setDeleteStatus] = useState(false);
  let [tenBuaAnAdd, setTenBuaAnAdd] = useState("");
  let [tenBuaAnEdit, setTenBuaAnEdit] = useState("");
  let [itemEdit, setItemEdit] = useState(false);
  let [itemDelete, setItemDelete] = useState(false);
  let [buaAnList, setBuaAnList] = useState([]);
  let [imageSelected, setImageSelected] = useState(false);
  let [page, setPage] = useState(1);
  let [keyword, setKeyword] = useState("");
  let [sort, setSort] = useState("bua_an_id");
  let [count, setCount] = useState(0);
  let [sortType, setSortType] = useState("ASC");
  const maxShow = 7;

  const handleClickAdd = () => {
    setAddStatus(!addStatus);
  };

  const handleChangeSort = (newSort) => {
    setSort(newSort);
    if (sortType === "ASC") {
      setSortType("DESC");
    } else if (sortType === "DESC") {
      setSortType("ASC");
    }
  };

  const handleClickEdit = (item) => {
    console.log(editStatus);
    if (item.bua_an_id !== itemEdit.bua_an_id) {
      setEditStatus(true);
      setItemEdit(item);
      setTenBuaAnEdit(item.ten_bua_an);
    } else if (editStatus) {
      setEditStatus(!editStatus);
      setItemEdit(false);
      setTenBuaAnEdit("");
    } else {
      setEditStatus(!editStatus);
      setItemEdit(item);
      setTenBuaAnEdit(item.ten_bua_an);
    }
  };

  const handleEditSubmit = async () => {
    const bua_an = {
      ten_bua_an: tenBuaAnEdit.trim(),
    };
    const response = await axios.put(
      `${BuaAnAdminURL + "/" + itemEdit.bua_an_id}?offset=${
        (page - 1) * maxShow
      }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}`,
      bua_an,
      {
        withCredentials: true,
      }
    );
    notify(response.data.status, response.data.message);
    if (response.data.status) {
      setBuaAnList(response.data.data);
      setItemEdit(false);
      if (response.data.page) {
        setPage(response.data.page);
      }
      setTenBuaAnEdit("");
    } else {
      if (response.data.must === "login") {
        return navigate("/", { replace: true });
      } else if (response.data.must === "permission") {
        return navigate("/", { replace: true });
      }
    }
  };

  const handleAddSubmit = async () => {
    let formData = new FormData();
    let filename = "";
    if (imageSelected) {
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
    const bua_an = {
      ten_bua_an: tenBuaAnAdd.trim(),
      image_url: filename || "",
    };
    const response = await axios.post(
      `${BuaAnAdminURL}?offset=${
        (page - 1) * maxShow
      }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}`,
      bua_an,
      {
        withCredentials: true,
      }
    );
    notify(response.data.status, response.data.message);
    if (response.data.status) {
      setBuaAnList(response.data.data);
      setAddStatus(false);
      if (response.data.page) {
        setPage(response.data.page);
      }
      setTenBuaAnAdd("");
      setImageSelected(false);
    } else {
      if (response.data.must === "login") {
        return navigate("/", { replace: true });
      } else if (response.data.must === "permission") {
        return navigate("/", { replace: true });
      }
    }
  };

  const handleUploadImage = async (e) => {
    const fileImage = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImageSelected(fileImage);
  };

  const handleChangeImage = async (e, bua_an_id) => {
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
      `${AdminUploadImageBuaAnURL + "/" + bua_an_id}?offset=${
        (page - 1) * maxShow
      }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}`,
      image,
      {
        withCredentials: true,
      }
    );
    notify(update_response.data.message, update_response.data.message);
    if (update_response.data.status) {
      setBuaAnList(update_response.data.data);
    } else {
      if (update_response.data.must === "login") {
        return navigate("/", { replace: true });
      } else if (update_response.data.must === "permission") {
        return navigate("/", { replace: true });
      }
    }
  };

  const closeFormConfirm = () => {
    setDeleteStatus(false);
    setItemDelete(false);
  };

  const handleChangeNameAdd = (e) => {
    const { value } = e.target;
    setTenBuaAnAdd(value);
  };

  const handleChangeNameEdit = (e) => {
    const { value } = e.target;
    setTenBuaAnEdit(value);
  };

  useEffect(() => {
    async function getAllBuaAn() {
      const response = await axios.get(
        `${BuaAnAdminURL}/get/offset?offset=${
          (page - 1) * maxShow
        }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        setBuaAnList(response.data.data);
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          window.localStorage.clear();
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    }
    getAllBuaAn();
  }, [page, navigate, sort, sortType, keyword]);

  useEffect(() => {
    async function getCount() {
      const response = await axios.get(
        `${CountAdminURL}/bua-an?keyword=${keyword}`,
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
  }, [page, navigate, sort, sortType, keyword, buaAnList]);

  const handleShowFormDelete = (item) => {
    setDeleteStatus(true);
    setItemDelete(item);
  };

  const loadData = async (data) => {
    setBuaAnList(data); // status, data
  };

  const handlePageClick = (event) => {
    if (page !== event.selected + 1) setPage(event.selected + 1);
  };

  const handleSearch = (keyword) => {
    setKeyword(keyword.toLowerCase().trim());
  };

  return (
    <div id="main">
      {deleteStatus ? (
        <div
          className="background_black"
          id="background_black"
          style={{ display: "block" }}
        >
          <FormConfirm
            status={"admin_delete_bua_an"}
            content={
              "Bạn chắc chắn muốn xóa bữa ăn " +
              itemDelete.ten_bua_an +
              " với ID = "
            }
            id_handle={itemDelete.bua_an_id}
            closeFormConfirm={closeFormConfirm}
            loadData={loadData}
            params={`?offset=${
              (page - 1) * maxShow
            }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}`}
          />
        </div>
      ) : (
        ""
      )}
      <div className="page-content">
        <section className="row">
          <div className="col-12 col-lg-12">
            <AdminThemeTop username={username} />
            <SearchTheme
              title={"Tìm kiếm thông tin bữa ăn"}
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
                          Danh sách Bữa Ăn
                        </h4>

                        <div style={{ display: "flex", alignItems: "center" }}>
                          <button
                            id="info"
                            className="btn btn-success btn_add"
                            onClick={() => handleClickAdd()}
                          >
                            <i className="fas fa-plus" />{" "}
                            <span>Thêm Bữa Ăn</span>
                          </button>
                          {addStatus ? (
                            <div
                              className="form_add"
                              style={{ marginLeft: 20 }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <input
                                  onChange={(e) => handleChangeNameAdd(e)}
                                  className="form-control"
                                  name="ten_bua_an"
                                  type="text"
                                  defaultValue={tenBuaAnAdd}
                                  placeholder="VD: Sáng"
                                />
                                <button
                                  className="btn btn-success"
                                  style={{
                                    position: "relative",
                                    whiteSpace: "nowrap",
                                    marginLeft: 20,
                                  }}
                                >
                                  Thêm hình ảnh
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
                                <div
                                  style={{
                                    whiteSpace: "nowrap",
                                    marginLeft: 20,
                                  }}
                                >
                                  Xem trước:{" "}
                                  {imageSelected ? (
                                    <img
                                      style={{ width: 80 }}
                                      src={imageSelected.preview}
                                      alt="anh_dai_dien"
                                    />
                                  ) : (
                                    "Chưa chọn ảnh"
                                  )}
                                </div>
                                <button
                                  onClick={() => handleAddSubmit()}
                                  id="btn_add_submit"
                                  style={{ marginLeft: 15 }}
                                  type="submit"
                                  className="btn btn-success btn_add_submit"
                                >
                                  Thêm
                                </button>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="table-responsive pt-3">
                        <table className="table table-bordered text-center">
                          <thead>
                            <tr>
                              <th
                                onClick={() => {
                                  handleChangeSort("bua_an_id");
                                }}
                              >
                                ID Bữa Ăn
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("ten_bua_an");
                                }}
                                style={{ width: "40%" }}
                              >
                                Tên Bữa Ăn
                              </th>
                              <th>Hình Ảnh</th>
                              <th>Cập Nhật</th>
                            </tr>
                          </thead>
                          <tbody>
                            {buaAnList.map((bua_an, index) => {
                              return (
                                <tr key={index} className="table-white">
                                  <td>{bua_an.bua_an_id}</td>
                                  <td>
                                    {itemEdit &&
                                    itemEdit.bua_an_id === bua_an.bua_an_id ? (
                                      <div className="flex_center">
                                        <input
                                          onChange={(e) =>
                                            handleChangeNameEdit(e)
                                          }
                                          className="form-control"
                                          name="ten_bua_an"
                                          type="text"
                                          defaultValue={itemEdit.ten_bua_an}
                                          placeholder="VD: Sáng"
                                        />{" "}
                                        <button
                                          onClick={() => handleEditSubmit()}
                                          className="btn btn-success btn_add"
                                          style={{ margin: "0px 10px" }}
                                        >
                                          Lưu
                                        </button>
                                      </div>
                                    ) : (
                                      <span>{bua_an.ten_bua_an}</span>
                                    )}
                                  </td>
                                  <td>
                                    {bua_an.image_url.trim().length === 0 ? (
                                      "Chưa có hình ảnh"
                                    ) : (
                                      <img
                                        style={{ width: 100 }}
                                        src={BACKEND_HOME + bua_an.image_url}
                                        alt="anh_dai_dien"
                                      />
                                    )}
                                  </td>
                                  <td>
                                    <button
                                      onClick={() => handleClickEdit(bua_an)}
                                      type="button"
                                      className="btn btn-warning m-1 btn_edit"
                                    >
                                      <i className="far fa-edit" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleShowFormDelete(bua_an)
                                      }
                                      type="button"
                                      className="btn btn-danger m-1 btn_delete"
                                    >
                                      <i
                                        style={{ color: "white" }}
                                        className="fa fa-trash-alt"
                                      />
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
                                          handleChangeImage(
                                            e,
                                            bua_an.bua_an_id
                                          );
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
