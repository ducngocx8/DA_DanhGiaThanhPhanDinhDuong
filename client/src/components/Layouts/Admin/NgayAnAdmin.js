import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminThemeTop from "./AdminThemeTop";
import ReactPaginate from "react-paginate";
import SearchTheme from "./SearchTheme";
import { useNavigate } from "react-router-dom";
import { convertToDateOnly, notify } from "../../../Utils/Title";
import { CountAdminURL, NgayAnAdminURL } from "../../../api/Admin";
import FormConfirm from "./Form/FormConfirm";

export default function NgayAnAdmin({ username }) {
  let [ngayAnList, setNgayAnList] = useState([]);
  let [page, setPage] = useState(1);
  const maxShow = 7;
  let navigate = useNavigate();
  let [itemDelete, setItemDelete] = useState(false);
  let [keyword, setKeyword] = useState("");
  let [sort, setSort] = useState("ngayan_id");
  let [count, setCount] = useState(0);
  let [sortType, setSortType] = useState("DESC");

  const handleShowFormDelete = (ngay_an) => {
    setItemDelete(ngay_an);
  };

  const handleChangeSort = (newSort) => {
    setSort(newSort);
    if (sortType === "ASC") {
      setSortType("DESC");
    } else if (sortType === "DESC") {
      setSortType("ASC");
    }
  };

  useEffect(() => {
    async function getAllNgayAn() {
      const response = await axios.get(
        `${NgayAnAdminURL}/get/offset?offset=${
          (page - 1) * maxShow
        }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        setNgayAnList(response.data.data);
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    }
    getAllNgayAn();
  }, [page, navigate, sort, sortType, keyword]);

  useEffect(() => {
    async function getCount() {
      const response = await axios.get(
        `${CountAdminURL}/ngay-an?keyword=${keyword}`,
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
  }, [page, navigate, sort, sortType, keyword, ngayAnList]);

  const handlePageClick = (event) => {
    if (page !== event.selected + 1) setPage(event.selected + 1);
  };

  const loadData = async (data) => {
    setNgayAnList(data);
  };

  const closeFormConfirm = () => {
    setItemDelete(false);
  };

  const handleSearch = (keyword) => {
    setKeyword(keyword.toLowerCase().trim());
  };

  return (
    <div id="main">
      {itemDelete ? (
        <div
          className="background_black"
          id="background_black"
          style={{ display: "block" }}
        >
          {itemDelete ? (
            <FormConfirm
              status={"admin_delete_ngayan"}
              content={
                "Bạn chắc chắn muốn xóa món ăn của người dùng " +
                itemDelete.User.username +
                " với ngày ăn ID = "
              }
              id_handle={itemDelete.ngayan_id}
              closeFormConfirm={closeFormConfirm}
              loadData={loadData}
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
              title={"Tìm kiếm thông tin ngày ăn"}
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
                          Danh sách món ăn hàng ngày
                        </h4>
                      </div>
                      <div className="table-responsive pt-3">
                        <table className="table table-bordered text-center">
                          <thead>
                            <tr>
                              <th
                                onClick={() => {
                                  handleChangeSort("ngayan_id");
                                }}
                              >
                                ID
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("user_id");
                                }}
                              >
                                Username
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("bua_an_id");
                                }}
                              >
                                Bữa ăn
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("id_monan");
                                }}
                              >
                                Món ăn
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("quanty");
                                }}
                              >
                                Số lượng
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("time");
                                }}
                              >
                                Thời gian
                              </th>
                              <th>Cập nhật</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ngayAnList.map((ngay_an, index) => {
                              return (
                                <tr key={index} className="table-white">
                                  <td>{ngay_an.ngayan_id}</td>
                                  <td>{ngay_an.User.username}</td>
                                  <td>{ngay_an.BuaAn.ten_bua_an}</td>
                                  <td>
                                    <a
                                      href={"/product/" + ngay_an.id_monan}
                                      target="_blank"
                                      rel="nofollow noreferrer"
                                    >
                                      {ngay_an.MonAn.ten_mon}
                                    </a>
                                  </td>
                                  <td>
                                    {Number(ngay_an.quanty) * 1 +
                                      " " +
                                      ngay_an.MonAn.don_vi}
                                  </td>
                                  <td>{convertToDateOnly(ngay_an.time)}</td>
                                  <td>
                                    <button
                                      onClick={() =>
                                        handleShowFormDelete(ngay_an)
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