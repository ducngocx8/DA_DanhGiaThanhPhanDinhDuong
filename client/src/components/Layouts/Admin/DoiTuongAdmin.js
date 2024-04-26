import React, { useEffect, useState } from "react";
import axios from "axios";
import { notify } from "../../../Utils/Title";
import { useNavigate } from "react-router-dom";
import AdminThemeTop from "./AdminThemeTop";
import ReactPaginate from "react-paginate";
import SearchTheme from "./SearchTheme";
import FormConfirm from "./Form/FormConfirm";
import { CountAdminURL, DoiTuongAdminURL } from "../../../api/Admin";

export default function DoiTuongAdmin({ username }) {
  let navigate = useNavigate();
  let [addStatus, setAddStatus] = useState(false);
  let [editStatus, setEditStatus] = useState(false);
  let [deleteStatus, setDeleteStatus] = useState(false);
  let [nameAdd, setNameAdd] = useState("");
  let [nameEdit, setNameEdit] = useState("");
  let [itemEdit, setItemEdit] = useState(false);
  let [itemDelete, setItemDelete] = useState(false);
  let [doiTuongList, setDoiTuongList] = useState([]);
  let [page, setPage] = useState(1);
  let [sort, setSort] = useState("id_doituong");
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
    if (item.id_doituong !== itemEdit.id_doituong) {
      setEditStatus(true);
      setItemEdit(item);
      setNameEdit(item.TenDoiTuong);
    } else if (editStatus) {
      setEditStatus(!editStatus);
      setItemEdit(false);
      setNameEdit("");
    } else {
      setEditStatus(!editStatus);
      setItemEdit(item);
      setNameEdit(item.TenDoiTuong);
    }
  };

  const handleEditSubmit = async () => {
    const doi_tuong = {
      TenDoiTuong: nameEdit.trim(),
    };
    const response = await axios.put(
      `${DoiTuongAdminURL + "/" + itemEdit.id_doituong}?offset=${
        (page - 1) * maxShow
      }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}`,
      doi_tuong,
      {
        withCredentials: true,
      }
    );
    notify(response.data.status, response.data.message);
    if (response.data.status) {
      setDoiTuongList(response.data.data);
      if (response.data.page) {
        setPage(response.data.page);
      }
      setItemEdit(false);
      setNameEdit("");
    } else {
      if (response.data.must === "login") {
        return navigate("/", { replace: true });
      } else if (response.data.must === "permission") {
        return navigate("/", { replace: true });
      }
    }
  };

  const handleAddSubmit = async () => {
    const doi_tuong = {
      TenDoiTuong: nameAdd.trim(),
    };
    const response = await axios.post(
      `${DoiTuongAdminURL}?offset=${
        (page - 1) * maxShow
      }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}`,
      doi_tuong,
      {
        withCredentials: true,
      }
    );
    notify(response.data.status, response.data.message);
    if (response.data.status) {
      setDoiTuongList(response.data.data);
      if (response.data.page) {
        setPage(response.data.page);
      }
      setAddStatus(false);
      setNameAdd("");
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
    setNameAdd(value);
  };

  const handleChangeNameEdit = (e) => {
    const { value } = e.target;
    setNameEdit(value);
  };

  const handleSearch = (keyword) => {
    setKeyword(keyword.toLowerCase().trim());
  };

  useEffect(() => {
    async function getAll() {
      const response = await axios.get(
        `${DoiTuongAdminURL}/get/offset?offset=${
          (page - 1) * maxShow
        }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        setDoiTuongList(response.data.data);
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    }
    getAll();
  }, [page, navigate, sort, sortType, keyword]);

  useEffect(() => {
    async function getCount() {
      const response = await axios.get(
        `${CountAdminURL}/doi-tuong?keyword=${keyword}`,
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
  }, [page, navigate, sort, sortType, keyword, doiTuongList]);

  const handleShowFormDelete = (item) => {
    setDeleteStatus(true);
    setItemDelete(item);
  };

  const loadData = async (data) => {
    setDoiTuongList(data); // status, data
  };

  const handlePageClick = (event) => {
    if (page !== event.selected + 1) setPage(event.selected + 1);
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
            status={"admin_delete_doituong"}
            content={
              "Bạn chắc chắn muốn xóa Nhóm Đối Tượng " +
              itemDelete.TenDoiTuong +
              " với ID = "
            }
            id_handle={itemDelete.id_doituong}
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
              title={"Tìm kiếm Nhóm Đối Tượng"}
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
                          Danh sách nhóm đối tượng
                        </h4>

                        <div style={{ display: "flex" }}>
                          <button
                            id="info"
                            className="btn btn-success btn_add"
                            onClick={() => handleClickAdd()}
                          >
                            <i className="fas fa-plus" />{" "}
                            <span>Thêm Nhóm Đối Tượng</span>
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
                                  name="categoryName"
                                  type="text"
                                  defaultValue={nameAdd}
                                  placeholder="VD: Nam"
                                />
                                <button
                                  onClick={() => handleAddSubmit()}
                                  style={{ marginLeft: 5 }}
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
                                  handleChangeSort("id_doituong");
                                }}
                              >
                                ID nhóm đối tượng
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("TenDoiTuong");
                                }}
                                style={{ width: "40%" }}
                              >
                                Tên đối tượng
                              </th>
                              <th>Cập nhật</th>
                            </tr>
                          </thead>
                          <tbody>
                            {doiTuongList.map((doi_tuong, index) => {
                              return (
                                <tr key={index} className="table-white">
                                  <td>{doi_tuong.id_doituong}</td>
                                  <td>
                                    {itemEdit &&
                                    itemEdit.id_doituong ===
                                      doi_tuong.id_doituong ? (
                                      <div className="flex_center">
                                        <input
                                          onChange={(e) =>
                                            handleChangeNameEdit(e)
                                          }
                                          className="form-control"
                                          name="TenDoiTuong"
                                          type="text"
                                          defaultValue={itemEdit.TenDoiTuong}
                                          placeholder="VD: Lao động nhẹ"
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
                                      <span>{doi_tuong.TenDoiTuong}</span>
                                    )}
                                  </td>
                                  <td>
                                    <button
                                      onClick={() => handleClickEdit(doi_tuong)}
                                      type="button"
                                      className="btn btn-warning m-1 btn_edit"
                                    >
                                      <i className="far fa-edit" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleShowFormDelete(doi_tuong)
                                      }
                                      type="button"
                                      className="btn btn-danger btn_delete"
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
