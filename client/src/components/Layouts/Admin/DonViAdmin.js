import React, { useEffect, useState } from "react";
import axios from "axios";
import { notify } from "../../../Utils/Title";
import { useNavigate } from "react-router-dom";
import AdminThemeTop from "./AdminThemeTop";
import ReactPaginate from "react-paginate";
import SearchTheme from "./SearchTheme";
import FormConfirm from "./Form/FormConfirm";
import { CountAdminURL, DonViAdminURL } from "../../../api/Admin";

export default function DonViAdmin({ username }) {
  let navigate = useNavigate();
  let [addStatus, setAddStatus] = useState(false);
  let [editStatus, setEditStatus] = useState(false);
  let [deleteStatus, setDeleteStatus] = useState(false);
  let [tenDonViAdd, setTenDonViAdd] = useState("");
  let [tenDonViEdit, setTenDonViEdit] = useState("");
  let [itemEdit, setItemEdit] = useState(false);
  let [itemDelete, setItemDelete] = useState(false);
  let [nhomDonViList, setDonViList] = useState([]);
  let [page, setPage] = useState(1);
  let [sort, setSort] = useState("id_donvi");
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
    if (item.id_donvi !== itemEdit.id_donvi) {
      setEditStatus(true);
      setItemEdit(item);
      setTenDonViEdit(item.ten_donvi);
    } else if (editStatus) {
      setEditStatus(!editStatus);
      setItemEdit(false);
      setTenDonViEdit("");
    } else {
      setEditStatus(!editStatus);
      setItemEdit(item);
      setTenDonViEdit(item.ten_donvi);
    }
  };

  const handleEditSubmit = async () => {
    const don_vi = {
      ten_donvi: tenDonViEdit.trim(),
    };
    const response = await axios.put(
      `${DonViAdminURL + "/" + itemEdit.id_donvi}?offset=${
        (page - 1) * maxShow
      }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}`,
      don_vi,
      {
        withCredentials: true,
      }
    );
    notify(response.data.status, response.data.message);
    if (response.data.status) {
      setDonViList(response.data.data);
      if (response.data.page) {
        setPage(response.data.page);
      }
      setItemEdit(false);
      setTenDonViEdit("");
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
      ten_donvi: tenDonViAdd.trim(),
    };
    const response = await axios.post(
      `${DonViAdminURL}?offset=${
        (page - 1) * maxShow
      }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}`,
      don_vi,
      {
        withCredentials: true,
      }
    );
    notify(response.data.status, response.data.message);
    if (response.data.status) {
      setDonViList(response.data.data);
      setAddStatus(false);
      if (response.data.page) {
        setPage(response.data.page);
      }
      setTenDonViAdd("");
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
    setTenDonViAdd(value);
  };

  const handleChangeNameEdit = (e) => {
    const { value } = e.target;
    setTenDonViEdit(value);
  };

  useEffect(() => {
    async function getAllDonVi() {
      const response = await axios.get(
        `${DonViAdminURL}/get/offset?offset=${
          (page - 1) * maxShow
        }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        setDonViList(response.data.data);
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
      await Promise.all([Promise.resolve(getAllDonVi())]);
    };
    getAll();
  }, [page, navigate, sort, sortType, keyword]);

  useEffect(() => {
    async function getCount() {
      const response = await axios.get(
        `${CountAdminURL}/don-vi?keyword=${keyword}`,
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
  }, [page, navigate, sort, sortType, keyword, nhomDonViList]);

  const handleShowFormDelete = (item) => {
    setDeleteStatus(true);
    setItemDelete(item);
  };

  const loadData = async (data) => {
    setDonViList(data); // status, data
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
            status={"admin_delete_donvi"}
            content={
              "Bạn chắc chắn muốn xóa đơn vị " +
              itemDelete.ten_donvi +
              " với ID = "
            }
            params={`?offset=${
              (page - 1) * maxShow
            }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}`}
            id_handle={itemDelete.id_donvi}
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
              title={"Tìm kiếm thông tin đơn vị"}
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
                          Danh sách đơn vị
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
                                  name="ten_donvi"
                                  type="text"
                                  defaultValue={tenDonViAdd}
                                  placeholder="VD: Tô Vừa"
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
                                  handleChangeSort("id_donvi");
                                }}
                              >
                                ID đơn vị
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("ten_donvi");
                                }}
                                style={{ width: "40%" }}
                              >
                                Tên đơn vị
                              </th>
                              <th>Cập Nhật</th>
                            </tr>
                          </thead>
                          <tbody>
                            {nhomDonViList.map((don_vi, index) => {
                              return (
                                <tr key={index} className="table-white">
                                  <td>{don_vi.id_donvi}</td>
                                  <td>
                                    {itemEdit &&
                                    itemEdit.id_donvi === don_vi.id_donvi ? (
                                      <div className="flex_center">
                                        <input
                                          onChange={(e) =>
                                            handleChangeNameEdit(e)
                                          }
                                          className="form-control"
                                          name="ten_donvi"
                                          type="text"
                                          defaultValue={itemEdit.ten_donvi}
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
                                      <span>{don_vi.ten_donvi}</span>
                                    )}
                                  </td>
                                  <td>
                                    <button
                                      onClick={() => handleClickEdit(don_vi)}
                                      type="button"
                                      className="btn btn-warning m-1 btn_edit"
                                    >
                                      <i className="far fa-edit" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleShowFormDelete(don_vi)
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
