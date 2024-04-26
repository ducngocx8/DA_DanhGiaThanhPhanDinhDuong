import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminThemeTop from "./AdminThemeTop";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../Utils/Title";
import SearchTheme from "./SearchTheme";
import FormConfirm from "./Form/FormConfirm";
import { CountAdminURL, NhomTuoiAdminURL } from "../../../api/Admin";
import FormEditNhomTuoi from "./Form/FormEditNhomTuoi";

export default function NhomTuoiAdmin({ username }) {
  let [nhomTuoiList, setNhomTuoiList] = useState([]);
  let [page, setPage] = useState(1);
  const maxShow = 7;
  let navigate = useNavigate();
  let [itemEdit, setItemEdit] = useState(false);
  let [itemAdd, setItemAdd] = useState(false);
  let [itemDelete, setItemDelete] = useState(false);
  let [keyword, setKeyword] = useState("");
  let [sort, setSort] = useState("id_nhomtuoi");
  let [count, setCount] = useState(0);
  let [sortType, setSortType] = useState("ASC");

  const handleShowFormEdit = (item) => {
    setItemEdit(item);
  };

  const handleChangeSort = (newSort) => {
    setSort(newSort);
    if (sortType === "ASC") {
      setSortType("DESC");
    } else if (sortType === "DESC") {
      setSortType("ASC");
    }
  };

  const handleShowFormDelete = (item) => {
    setItemDelete(item);
  };

  const handleShowFormAdd = () => {
    setItemAdd(true);
  };

  useEffect(() => {
    async function getAll() {
      const response = await axios.get(
        `${NhomTuoiAdminURL}/get/offset?offset=${
          (page - 1) * maxShow
        }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        setNhomTuoiList(response.data.data);
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
        `${CountAdminURL}/nhom-tuoi?keyword=${keyword}`,
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
  }, [page, navigate, sort, sortType, keyword, nhomTuoiList]);

  const handlePageClick = (event) => {
    if (page !== event.selected + 1) setPage(event.selected + 1);
  };

  const closeFormConfirm = () => {
    setItemEdit(false);
    setItemAdd(false);
    setItemDelete(false);
  };

  const loadData = async (data) => {
    setNhomTuoiList(data);
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
            <FormEditNhomTuoi
              itemChoose={itemEdit}
              status={"admin_edit_nhomtuoi"}
              closeFormConfirm={closeFormConfirm}
              loadData={loadData}
              setPage={setPage}
              params={`?offset=${
                (page - 1) * maxShow
              }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}`}
            />
          ) : (
            ""
          )}

          {itemAdd ? (
            <FormEditNhomTuoi
              itemChoose={false}
              status={"admin_add_nhomtuoi"}
              closeFormConfirm={closeFormConfirm}
              loadData={loadData}
              setPage={setPage}
              params={`?offset=${
                (page - 1) * maxShow
              }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}`}
            />
          ) : (
            ""
          )}

          {itemDelete ? (
            <FormConfirm
              itemChoose={itemDelete}
              status={"admin_delete_nhomtuoi"}
              closeFormConfirm={closeFormConfirm}
              loadData={loadData}
              id_handle={itemDelete.id_nhomtuoi}
              content={
                "Bạn có chắc chắc muốn xóa nhóm tuổi: " +
                itemDelete.TenNhomTuoi +
                " với ID là "
              }
              params={`?offset=${
                (page - 1) * maxShow
              }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}`}
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
            <SearchTheme
              title={"Tìm kiếm nhóm tuổi"}
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
                          Danh sách nhóm tuổi{" "}
                        </h4>
                        <button
                          id="info"
                          className="btn btn-success btn_add"
                          onClick={() => handleShowFormAdd()}
                        >
                          <i className="fas fa-plus" />{" "}
                          <span>Thêm nhóm tuổi</span>
                        </button>
                      </div>
                      <div className="table-responsive pt-3">
                        <table className="table table-bordered text-center">
                          <thead>
                            <tr>
                              <th
                                onClick={() => {
                                  handleChangeSort("id_nhomtuoi");
                                }}
                              >
                                ID Nhóm tuổi
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("TenNhomTuoi");
                                }}
                              >
                                Tên nhóm tuổi
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("strAge");
                                }}
                              >
                                Số tháng tuổi bắt đầu
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("endAge");
                                }}
                              >
                                Số tháng tuổi kết thúc
                              </th>
                              <th>Cập nhật</th>
                            </tr>
                          </thead>
                          <tbody>
                            {nhomTuoiList.map((nhom_tuoi, index) => {
                              return (
                                <tr key={index} className="table-white">
                                  <td>{nhom_tuoi.id_nhomtuoi}</td>
                                  <td>{nhom_tuoi.TenNhomTuoi}</td>
                                  <td>{nhom_tuoi.strAge}</td>
                                  <td>{nhom_tuoi.endAge}</td>
                                  <td>
                                    <button
                                      className="btn btn-success btn_change_status"
                                      onClick={() =>
                                        handleShowFormEdit(nhom_tuoi)
                                      }
                                    >
                                      Chỉnh sửa
                                    </button>
                                    <button
                                      className="btn btn-info btn_change_status"
                                      onClick={() =>
                                        handleShowFormDelete(nhom_tuoi)
                                      }
                                    >
                                      Xóa
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
