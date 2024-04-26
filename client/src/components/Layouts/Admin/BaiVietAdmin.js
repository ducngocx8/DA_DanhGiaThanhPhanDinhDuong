import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminThemeTop from "./AdminThemeTop";
import ReactPaginate from "react-paginate";
import SearchTheme from "./SearchTheme";
import { useNavigate } from "react-router-dom";
import { convertToDate, notify } from "../../../Utils/Title";
import {
  AdminUploadImageBaiVietURL,
  BaiVietAdminURL,
  CountAdminURL,
  UploadImageWebURL,
} from "../../../api/Admin";
import { BACKEND_HOME } from "../../../api";
import BaiVietFilter from "./BaiVietFilter";
import FormAddBaiViet from "./Form/FormAddBaiViet";
import FormEditBaiViet from "./Form/FormEditBaiViet";
import FormConfirm from "./Form/FormConfirm";

export default function BaiVietAdmin({ username }) {
  let [baiVietList, setBaiVietList] = useState([]);
  let [page, setPage] = useState(1);
  const maxShow = 7;
  let navigate = useNavigate();
  let [itemEdit, setItemEdit] = useState(false);
  let [itemAdd, setItemAdd] = useState(false);
  let [itemDelete, setItemDelete] = useState(false);
  let [keyword, setKeyword] = useState("");
  let [sort, setSort] = useState("id_chuyenmuc");
  let [count, setCount] = useState(0);
  let [sortType, setSortType] = useState("ASC");
  let [status, setStatus] = useState(1);

  const handleShowFormEdit = (item) => {
    setItemEdit(item);
  };

  const handleShowFormAdd = () => {
    setItemAdd(true);
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
    async function getAll() {
      const response = await axios.get(
        `${BaiVietAdminURL}/get/offset?offset=${
          (page - 1) * maxShow
        }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}&status=${status}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        setBaiVietList(response.data.data);
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
  }, [page, navigate, sort, sortType, keyword, status]);

  useEffect(() => {
    async function getCount() {
      const response = await axios.get(
        `${CountAdminURL}/bai-viet?keyword=${keyword}&status=${status}`,
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
  }, [page, navigate, sort, sortType, keyword, status, baiVietList]);

  const handlePageClick = (event) => {
    if (page !== event.selected + 1) setPage(event.selected + 1);
  };

  const loadData = async (data) => {
    setBaiVietList(data);
  };

  const handleCloseFormAdd = async () => {
    setItemAdd(false);
    setItemEdit(false);
    setItemDelete(false);
  };

  const handleSearch = (keyword) => {
    setKeyword(keyword.toLowerCase().trim());
  };

  const handleChangeImage = async (e, id_baiviet) => {
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
      `${AdminUploadImageBaiVietURL + "/" + id_baiviet}?offset=${
        (page - 1) * maxShow
      }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}&status=${status}`,
      image,
      {
        withCredentials: true,
      }
    );
    notify(update_response.data.message, update_response.data.message);
    if (update_response.data.status) {
      setBaiVietList(update_response.data.data);
    } else {
      if (update_response.data.must === "login") {
        return navigate("/", { replace: true });
      } else if (update_response.data.must === "permission") {
        return navigate("/", { replace: true });
      }
    }
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
            <FormEditBaiViet
              itemChoose={itemEdit}
              closeFormAdd={handleCloseFormAdd}
              loadData={loadData}
              params={`?offset=${
                (page - 1) * maxShow
              }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}&status=${status}`}
            />
          ) : (
            ""
          )}

          {itemAdd ? (
            <FormAddBaiViet
              closeFormAdd={handleCloseFormAdd}
              loadData={loadData}
              username={username}
              params={`?offset=${
                (page - 1) * maxShow
              }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}&status=${status}`}
            />
          ) : (
            ""
          )}

          {itemDelete ? (
            <FormConfirm
              itemChoose={itemDelete}
              status={"admin_delete_baiviet"}
              closeFormConfirm={handleCloseFormAdd}
              loadData={loadData}
              id_handle={itemDelete.tieu_de}
              content="Bạn có chắc chắc muốn xóa bài viết: "
              params={`?offset=${
                (page - 1) * maxShow
              }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}&status=${status}`}
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
            <BaiVietFilter setStatus={setStatus} status={status} />
            <SearchTheme
              title={"Tìm kiếm bài viết"}
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
                          Danh sách bài viết
                        </h4>

                        <div style={{ display: "flex" }}>
                          <button
                            id="info"
                            className="btn btn-success btn_add"
                            onClick={() => handleShowFormAdd()}
                          >
                            <i className="fas fa-plus" />{" "}
                            <span>Thêm bài viết</span>
                          </button>
                        </div>
                      </div>
                      <div
                        className="table-responsive pt-3"
                        id="style-14"
                        style={{
                          position: "relative",
                        }}
                      >
                        <table className="table table-bordered text-center">
                          <thead>
                            <tr className="white_space_nowrap">
                              <th
                                onClick={() => {
                                  handleChangeSort("id_baiviet");
                                }}
                                className="sticky-col first-col-sticky"
                              >
                                ID
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("tieu_de");
                                }}
                                className="sticky-col second-col-sticky"
                              >
                                Tiêu đề
                              </th>
                              <th>Hình Ảnh</th>
                              <th
                                onClick={() => {
                                  handleChangeSort("user_id");
                                }}
                              >
                                Tác giả
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("id_chuyenmuc");
                                }}
                              >
                                Chuyên mục
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("createdAt");
                                }}
                              >
                                Ngày viết
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("updatedAt");
                                }}
                              >
                                Ngày cập nhật
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("luot_xem");
                                }}
                              >
                                Trạng thái
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("luot_xem");
                                }}
                              >
                                Lượt xem
                              </th>
                              <th>Cập nhật</th>
                            </tr>
                          </thead>
                          <tbody>
                            {baiVietList.map((item, index) => {
                              return (
                                <tr key={index} className="table-white">
                                  <td className="sticky-col first-col-sticky">
                                    {item.id_baiviet}
                                  </td>
                                  <td className="sticky-col second-col-sticky">
                                    <a
                                      style={{
                                        textDecoration: "none",
                                      }}
                                      href={"/post/" + item.slug + ".htm"}
                                      target="_blank"
                                      rel="nofollow noreferrer"
                                    >
                                      {item.tieu_de}
                                    </a>
                                  </td>
                                  <td>
                                    {item.image_url.trim() === "" ? (
                                      "Chưa có hình ảnh"
                                    ) : (
                                      <img
                                        style={{ width: 80 }}
                                        src={BACKEND_HOME + item.image_url}
                                        alt="anh_dai-dien"
                                      />
                                    )}
                                  </td>
                                  <td>{item.User.username}</td>
                                  <td>
                                    <a
                                      style={{
                                        textDecoration: "none",
                                      }}
                                      href={"/chuyen-muc/" + item.id_chuyenmuc}
                                      target="_blank"
                                      rel="nofollow noreferrer"
                                    >
                                      {item.ChuyenMuc.ten_chuyenmuc}
                                    </a>
                                  </td>
                                  <td>{convertToDate(item.createdAt)}</td>
                                  <td>
                                    {item.updatedAt
                                      ? convertToDate(item.updatedAt)
                                      : "-"}
                                  </td>
                                  {item.hien_thi ? (
                                    <td
                                      style={{
                                        color: "#28a745",
                                        fontWeight: 700,
                                      }}
                                    >
                                      Hiện
                                    </td>
                                  ) : (
                                    <td
                                      style={{
                                        color: "#dc3545",
                                        fontWeight: 700,
                                      }}
                                    >
                                      Ẩn
                                    </td>
                                  )}
                                  <td>
                                    {Number(item.luot_xem).toLocaleString("vi")}
                                  </td>
                                  <td>
                                    <button
                                      onClick={() => handleShowFormEdit(item)}
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
                                          handleChangeImage(e, item.id_baiviet);
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
                                      onClick={() => setItemDelete(item)}
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
                      <div
                        className="flex_center"
                        style={{
                          marginTop: 15,
                        }}
                      >
                        <div>Tổng số: {count}</div>
                        <ReactPaginate
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
