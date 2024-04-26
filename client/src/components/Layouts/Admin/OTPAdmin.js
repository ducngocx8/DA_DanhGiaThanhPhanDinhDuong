import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchTheme from "./SearchTheme";
import AdminThemeTop from "./AdminThemeTop";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { convertToDate, notify } from "../../../Utils/Title";
import FormConfirm from "./Form/FormConfirm";
import { CountAdminURL, OTPAdminURL } from "../../../api/Admin";

export default function OTPAdmin({ username }) {
  let [otpList, setOTPList] = useState([]);
  let [keyword, setKeyword] = useState("");
  let [sort, setSort] = useState("id");
  let [count, setCount] = useState(0);
  let [sortType, setSortType] = useState("ASC");
  let [page, setPage] = useState(1);
  let [confirm, setConfirm] = useState(false);
  const maxShow = 7;
  let navigate = useNavigate();

  const handleShowFormDetail = (token) => {
    alert(token);
  };

  const handleChangeSort = (newSort) => {
    setSort(newSort);
    if (sortType === "ASC") {
      setSortType("DESC");
    } else if (sortType === "DESC") {
      setSortType("ASC");
    }
  };

  const handleRemoveAllOTP = () => {
    setConfirm(true);
  };

  useEffect(() => {
    async function getAllOTP() {
      const response = await axios.get(
        `${OTPAdminURL}/get/offset?offset=${
          (page - 1) * maxShow
        }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        setOTPList(response.data.data); // status, data
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    }
    getAllOTP();
  }, [page, navigate, sort, sortType, keyword]);

  useEffect(() => {
    async function getCount() {
      const response = await axios.get(
        `${CountAdminURL}/otp?keyword=${keyword}`,
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
  }, [page, navigate, sort, sortType, keyword, otpList]);

  const handlePageClick = (event) => {
    if (page !== event.selected + 1) setPage(event.selected + 1);
  };

  const closeFormConfirm = () => {
    setConfirm(false);
  };

  const loadData = (data) => {
    setOTPList(data);
    setPage(1);
  };

  const handleSearch = (keyword) => {
    setKeyword(keyword.toLowerCase().trim());
  };

  return (
    <div id="main">
      {confirm ? (
        <div
          className="background_black"
          id="background_black"
          style={{ display: "block" }}
        >
          <FormConfirm
            status={"admin_delete_otp"}
            content={"Bạn chắc chắn muốn xóa tất cả các mã OTP"}
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
            <SearchTheme title={"Tìm kiếm OTP"} handleSearch={handleSearch} />
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
                          Danh sách mã OTP{" "}
                        </h4>
                        <div style={{ display: "flex" }}>
                          <button
                            id="info"
                            className="btn btn-success btn_add"
                            onClick={() => handleRemoveAllOTP()}
                          >
                            <i className="fas fa-trash" />{" "}
                            <span>Xóa Tất Cả</span>
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
                        <table className="table table-botped text-center">
                          <thead>
                            <tr>
                              <th
                                onClick={() => {
                                  handleChangeSort("id");
                                }}
                              >
                                ID
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("time_send");
                                }}
                              >
                                TIME
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("otp_code");
                                }}
                              >
                                OTP_CODE
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("otp_type");
                                }}
                              >
                                OTP_TYPE
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("status");
                                }}
                              >
                                STATUS
                              </th>
                              <th>Xem chi tiết</th>
                            </tr>
                          </thead>
                          <tbody>
                            {otpList.map((otp, index) => {
                              return (
                                <tr key={index} className="table-white">
                                  <td>{otp.id}</td>
                                  <td>{convertToDate(otp.time_send)}</td>
                                  <td
                                    style={{
                                      color: "#de1e95",
                                      fontWeight: 700,
                                    }}
                                  >
                                    {otp.otp_code.length < 7
                                      ? otp.otp_code
                                      : otp.otp_code.substr(0, 6)}
                                  </td>
                                  {otp.otp_type === 1 ? (
                                    <td
                                      style={{
                                        color: "#9694ff",
                                        fontWeight: 700,
                                      }}
                                    >
                                      Quên mật khẩu
                                    </td>
                                  ) : (
                                    <td
                                      style={{
                                        color: "#ff7976",
                                        fontWeight: 700,
                                      }}
                                    >
                                      Xác thực email
                                    </td>
                                  )}
                                  {otp.status === true ? (
                                    <td
                                      style={{
                                        color: "#28a745",
                                        fontWeight: 700,
                                      }}
                                    >
                                      Thành công
                                    </td>
                                  ) : (
                                    <td
                                      style={{
                                        color: "#ffc107",
                                        fontWeight: 700,
                                      }}
                                    >
                                      Chưa xác thực
                                    </td>
                                  )}

                                  <td>
                                    <button
                                      className="btn btn-success btn_change_status"
                                      onClick={() =>
                                        handleShowFormDetail(
                                          "OTP_CODE: " +
                                            otp.otp_code +
                                            "\nEmail: " +
                                            otp.email
                                        )
                                      }
                                    >
                                      Chi Tiết
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
