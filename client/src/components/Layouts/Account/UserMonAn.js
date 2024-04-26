import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { Title, notify } from "../../../Utils/Title";
import { UploadImageWebURL } from "../../../api/Admin";
import {
  BACKEND_HOME,
  CustomerUploadImageMonAnURL,
  MonAnURL,
} from "../../../api";
import SearchTheme from "../Admin/SearchTheme";
import UserStatistic from "./UserStatistic";
import FormUserAddMonAn from "./Form/FormUserAddMonAn";
import FormUserEditMonAn from "./Form/FormUserEditMonAn";
import FormConfirm from "../Admin/Form/FormConfirm";

export default function UserMonAn({ username }) {
  let [monAnList, setMonAnList] = useState([]);
  let [page, setPage] = useState(1);
  const maxShow = 7;
  let navigate = useNavigate();
  let [itemEdit, setItemEdit] = useState(false);
  let [itemAdd, setItemAdd] = useState(false);
  let [itemDelete, setItemDelete] = useState(false);
  let [keyword, setKeyword] = useState("");

  const handleShowFormEdit = (item) => {
    setItemEdit(item);
  };

  const handleShowFormAdd = () => {
    setItemAdd(true);
  };

  const handleShowFormDelete = (mon_an) => {
    setItemDelete(mon_an);
  };

  
  useEffect(() => {
    document.title = Title.user_monan + Title.origin;
  }, []);

  useEffect(() => {
    async function getAllMonAnUser() {
      const response = await axios.get(`${MonAnURL + "/by/user"}`, {
        withCredentials: true,
      });
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
    getAllMonAnUser();
  }, [navigate]);

  const handlePageClick = (event) => {
    if (page !== event.selected + 1) setPage(event.selected + 1);
  };

  const loadData = async (data) => {
    setMonAnList(data);
  };

  const reloadData = async () => {
    const response = await axios.get(`${MonAnURL + "/by/user"}`, {
      withCredentials: true,
    });
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
      `${CustomerUploadImageMonAnURL + "/" + id_monan}`,
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

  const filterSearch = () => {
    return monAnList.filter((item) => {
      return (
        item.ten_mon.toLowerCase().includes(keyword) ||
        item.don_vi.toLowerCase().includes(keyword) ||
        item.NhomMonAn.ten_nhom.toLowerCase().includes(keyword) ||
        Number(item.id_monan) === Number(keyword)
      );
    });
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
            <FormUserEditMonAn
              itemChoose={itemEdit}
              closeFormAdd={handleCloseFormAdd}
              loadData={loadData}
            />
          ) : (
            ""
          )}

          {itemDelete ? (
            <FormConfirm
              status={"customer_delete_monan"}
              content={
                "Bạn chắc chắn muốn xóa món " +
                itemDelete.ten_mon +
                " với ID = "
              }
              id_handle={itemDelete.id_monan}
              closeFormConfirm={() => {
                setItemDelete(false);
              }}
              loadData={loadData}
            />
          ) : (
            ""
          )}

          {itemAdd ? (
            <FormUserAddMonAn
              closeFormAdd={handleCloseFormAdd}
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
            <UserStatistic username={username} />
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
                        </div>
                      </div>
                      <div className="table-responsive pt-3">
                        <table className="table table-bordered text-center">
                          <thead>
                            <tr>
                              <th>ID món ăn</th>
                              <th>Tên món ăn</th>
                              <th>Hình ảnh</th>
                              <th>Đơn vị</th>
                              <th>Nhóm món ăn</th>
                              <th>Trạng thái</th>
                              <th>Cập nhật</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filterSearch().map((mon_an, index) => {
                              if (
                                index >= (page - 1) * maxShow &&
                                index < page * maxShow
                              ) {
                                return (
                                  <tr key={index} className="table-white">
                                    <td>{mon_an.id_monan}</td>
                                    <td>
                                      <a
                                        style={{
                                          fontWeight: 700,
                                          textDecoration: "none",
                                        }}
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
                                        style={{
                                          fontWeight: 700,
                                          textDecoration: "none",
                                        }}
                                        href={
                                          "/category/" + mon_an.id_nhommonan
                                        }
                                        target="_blank"
                                        rel="nofollow noreferrer"
                                      >
                                        {mon_an.NhomMonAn.ten_nhom}
                                      </a>
                                    </td>
                                    {mon_an.monan_status === 0 ? (
                                      <td
                                        style={{
                                          color: "#dc3545",
                                          fontWeight: 700,
                                        }}
                                      >
                                        Chỉ mình tôi
                                      </td>
                                    ) : mon_an.monan_status === 1 ? (
                                      <td
                                        style={{
                                          color: "#28a745",
                                          fontWeight: 700,
                                        }}
                                      >
                                        Công khai
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
                                        onClick={() =>
                                          handleShowFormEdit(mon_an)
                                        }
                                        type="button"
                                        className="btn btn-warning m-1 btn_edit"
                                      >
                                        <i className="far fa-edit" />
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleShowFormDelete(mon_an)
                                        }
                                        type="button"
                                        className="btn btn-primary m-1"
                                      >
                                        <i className="far fa-trash-alt" />
                                      </button>
                                      <button
                                        style={{
                                          position: "relative",
                                        }}
                                        type="button"
                                        className="btn btn-success m-1"
                                      >
                                        <input
                                          onChange={(e) => {
                                            handleChangeImage(
                                              e,
                                              mon_an.id_monan
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
                              } else return "";
                            })}
                          </tbody>
                        </table>
                      </div>
                      <div className="flex_center">
                        <div>Tổng số: {filterSearch().length}</div>
                        <ReactPaginate
                          breakLabel="..."
                          nextLabel="Next"
                          onPageChange={handlePageClick}
                          pageRangeDisplayed={2}
                          pageCount={
                            filterSearch().length <= maxShow
                              ? 1
                              : filterSearch().length % maxShow === 0
                              ? Math.floor(filterSearch().length / maxShow)
                              : Math.floor(filterSearch().length / maxShow) + 1
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
