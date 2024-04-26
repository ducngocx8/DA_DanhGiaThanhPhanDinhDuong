import React, { useEffect, useState } from "react";
import axios from "axios";
import { notify } from "../../../Utils/Title";
import { useNavigate } from "react-router-dom";
import AdminThemeTop from "./AdminThemeTop";
import ReactPaginate from "react-paginate";
import SearchTheme from "./SearchTheme";
import FormConfirm from "./Form/FormConfirm";
import { CountAdminURL, ChuyenMucAdminURL } from "../../../api/Admin";

export default function ChuyenMucAdmin({ username }) {
  let navigate = useNavigate();
  let [addStatus, setAddStatus] = useState(false);
  let [editStatus, setEditStatus] = useState(false);
  let [deleteStatus, setDeleteStatus] = useState(false);
  let [tenChuyenMucAdd, setTenChuyenMucAdd] = useState("");
  let [tenChuyenMucEdit, setTenChuyenMucEdit] = useState("");
  let [itemEdit, setItemEdit] = useState(false);
  let [itemDelete, setItemDelete] = useState(false);
  let [chuyenMucList, setChuyenMucList] = useState([]);
  let [page, setPage] = useState(1);
  let [sort, setSort] = useState("id_chuyenmuc");
  let [count, setCount] = useState(0);
  let [sortType, setSortType] = useState("ASC");
  let [keyword, setKeyword] = useState("");
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
    if (item.id_chuyenmuc !== itemEdit.id_chuyenmuc) {
      setEditStatus(true);
      setItemEdit(item);
      setTenChuyenMucEdit(item.ten_chuyenmuc);
    } else if (editStatus) {
      setEditStatus(!editStatus);
      setItemEdit(false);
      setTenChuyenMucEdit("");
    } else {
      setEditStatus(!editStatus);
      setItemEdit(item);
      setTenChuyenMucEdit(item.ten_chuyenmuc);
    }
  };

  const handleEditSubmit = async () => {
    const don_vi = {
      ten_chuyenmuc: tenChuyenMucEdit.trim(),
    };
    const response = await axios.put(
      `${ChuyenMucAdminURL + "/" + itemEdit.id_chuyenmuc}?offset=${
        (page - 1) * maxShow
      }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}`,
      don_vi,
      {
        withCredentials: true,
      }
    );
    notify(response.data.status, response.data.message);
    if (response.data.status) {
      setChuyenMucList(response.data.data);
      if (response.data.page) {
        setPage(response.data.page);
      }
      setItemEdit(false);
      setTenChuyenMucEdit("");
    } else {
      if (response.data.must === "login") {
        return navigate("/", { replace: true });
      } else if (response.data.must === "permission") {
        return navigate("/", { replace: true });
      }
    }
  };

  const handleAddSubmit = async () => {
    const don_vi = {
      ten_chuyenmuc: tenChuyenMucAdd.trim(),
    };
    const response = await axios.post(
      `${ChuyenMucAdminURL}?offset=${
        (page - 1) * maxShow
      }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}`,
      don_vi,
      {
        withCredentials: true,
      }
    );
    notify(response.data.status, response.data.message);
    if (response.data.status) {
      setChuyenMucList(response.data.data);
      setAddStatus(false);
      if (response.data.page) {
        setPage(response.data.page);
      }
      setTenChuyenMucAdd("");
    } else {
      if (response.data.must === "login") {
        return navigate("/", { replace: true });
      } else if (response.data.must === "permission") {
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
    setTenChuyenMucAdd(value);
  };

  const handleChangeNameEdit = (e) => {
    const { value } = e.target;
    setTenChuyenMucEdit(value);
  };

  useEffect(() => {
    async function getAllChuyenMuc() {
      const response = await axios.get(
        `${ChuyenMucAdminURL}/get/offset?offset=${
          (page - 1) * maxShow
        }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        setChuyenMucList(response.data.data);
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
      await Promise.all([Promise.resolve(getAllChuyenMuc())]);
    };
    getAll();
  }, [page, navigate, sort, sortType, keyword]);

  useEffect(() => {
    async function getCount() {
      const response = await axios.get(
        `${CountAdminURL}/chuyen-muc?keyword=${keyword}`,
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
  }, [page, navigate, sort, sortType, keyword, chuyenMucList]);

  const handleShowFormDelete = (item) => {
    setDeleteStatus(true);
    setItemDelete(item);
  };

  const loadData = async (data) => {
    setChuyenMucList(data); // status, data
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
            status={"admin_delete_chuyenmuc"}
            content={
              "Bạn chắc chắn muốn xóa chuyên mục " +
              itemDelete.ten_chuyenmuc +
              " với ID = "
            }
            params={`?offset=${
              (page - 1) * maxShow
            }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}`}
            id_handle={itemDelete.id_chuyenmuc}
            closeFormConfirm={closeFormConfirm}
            loadData={loadData}
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
              title={"Tìm kiếm thông tin chuyên mục"}
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
                          Danh sách chuyên mục
                        </h4>

                        <div style={{ display: "flex", alignItems: "center" }}>
                          <button
                            id="info"
                            className="btn btn-success btn_add"
                            onClick={() => handleClickAdd()}
                          >
                            <i className="fas fa-plus" /> <span>Thêm mới</span>
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
                                  name="ten_chuyenmuc"
                                  type="text"
                                  defaultValue={tenChuyenMucAdd}
                                  placeholder="VD: Dinh dưỡng"
                                />
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
                                  handleChangeSort("id_chuyenmuc");
                                }}
                              >
                                ID chuyên mục
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("ten_chuyenmuc");
                                }}
                                style={{ width: "40%" }}
                              >
                                Tên chuyên mục
                              </th>
                              <th>Cập Nhật</th>
                            </tr>
                          </thead>
                          <tbody>
                            {chuyenMucList.map((item, index) => {
                              return (
                                <tr key={index} className="table-white">
                                  <td>{item.id_chuyenmuc}</td>
                                  <td>
                                    {itemEdit &&
                                    itemEdit.id_chuyenmuc ===
                                      item.id_chuyenmuc ? (
                                      <div className="flex_center">
                                        <input
                                          onChange={(e) =>
                                            handleChangeNameEdit(e)
                                          }
                                          className="form-control"
                                          name="ten_chuyenmuc"
                                          type="text"
                                          defaultValue={itemEdit.ten_chuyenmuc}
                                          placeholder="VD: Ngũ cốc"
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
                                      <span>{item.ten_chuyenmuc}</span>
                                    )}
                                  </td>
                                  <td>
                                    <button
                                      onClick={() => handleClickEdit(item)}
                                      type="button"
                                      className="btn btn-warning m-1 btn_edit"
                                    >
                                      <i className="far fa-edit" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleShowFormDelete(item)
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
