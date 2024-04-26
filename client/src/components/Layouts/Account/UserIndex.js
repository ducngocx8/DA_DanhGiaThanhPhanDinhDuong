import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import UserStatistic from "./UserStatistic";
import {
  Title,
  convertToDate,
  convertToDateOnly,
  notify,
} from "../../../Utils/Title";
import { useNavigate } from "react-router-dom";
import {
  ChiSoUserLastURL,
  ChiSoUserURL,
  DoiTuongURL,
  LaoDongURL,
  khuyenNghiURL,
} from "../../../api";
import ReactPaginate from "react-paginate";
import FormConfirm from "../Admin/Form/FormConfirm";
export default function UserIndex({ username }) {
  const [loading, isLoading] = useState(true);
  const [laoDongList, setLaoDongList] = useState([]);
  const [doituongList, setDoiTuongList] = useState([]);
  const [chiSoUserList, setChiSoUserList] = useState([]);
  const [caloKhuyenNghi, setCaloKhuyenNghi] = useState(null);
  let [indexInput, setIndexInput] = useState({
    age: "",
    weight: "",
    height: "",
    gender: "",
    id_laodong: -1,
    id_doituong: -1,
    time_update: null,
  });
  let [deleteChiSoUserStatus, setDeleteChiSoUserStatus] = useState(false);

  let [page, setPage] = useState(1);
  const maxShow = 7;

  const handlePageClick = (event) => {
    if (page !== event.selected + 1) setPage(event.selected + 1);
  };

  let navigate = useNavigate();

  useEffect(() => {
    document.title = Title.user_index + Title.origin;
  }, []);

  useEffect(() => {
    const getIndexindexInput = async () => {
      const response = await axios.get(`${ChiSoUserLastURL}`, {
        withCredentials: true,
      });
      if (response.data.status) {
        if (response.data.data) {
          const {
            height,
            weight,
            age,
            gender,
            id_laodong,
            id_doituong,
            time_update,
          } = response.data.data;
          setIndexInput({
            height,
            weight: Number(weight) * 1,
            age,
            gender,
            id_laodong,
            id_doituong,
            time_update,
          });
        }
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigate("/account/login", { replace: true });
        }
      }
    };

    const getAllLaoDong = async () => {
      const response = await axios.get(`${LaoDongURL}`);
      if (response.data.status) {
        setLaoDongList(response.data.data);
      } else {
        notify(false, response.data.message);
      }
    };

    const getAllDoiTuong = async () => {
      const response = await axios.get(`${DoiTuongURL}`);
      if (response.data.status) {
        setDoiTuongList(response.data.data);
      } else {
        notify(false, response.data.message);
      }
    };

    const getAllChiSoUser = async () => {
      const response = await axios.get(`${ChiSoUserURL}`, {
        withCredentials: true,
      });
      if (response.data.status) {
        setChiSoUserList(response.data.data);
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigate("/account/login", { replace: true });
        }
      }
    };

    const handleAPIAll = async () => {
      await Promise.all([
        Promise.resolve(getAllLaoDong()),
        Promise.resolve(getAllDoiTuong()),
        Promise.resolve(getIndexindexInput()),
        Promise.resolve(getAllChiSoUser()),
      ]);
      isLoading(false);
    };
    handleAPIAll();
  }, [navigate]);

  useEffect(() => {
    const getKhuyenNghi = async () => {
      const response = await axios.get(`${khuyenNghiURL}`, {
        withCredentials: true,
      });
      if (response.data.status) {
        setCaloKhuyenNghi(
          response.data?.data?.ThanhPhanNhuCau.NangLuong?.trim()
        );
      } else {
        setCaloKhuyenNghi(null);
      }
    };
    getKhuyenNghi();
  }, [indexInput]);

  const handleChangeIndexInput = (e) => {
    let { name, value } = e.target;
    if (name !== "gender") {
      value = Number(value);
    }
    setIndexInput({ ...indexInput, [name]: value });
  };

  const updateInfoIndexAPI = async (chi_so_user) => {
    return await axios
      .post(`${ChiSoUserURL}`, chi_so_user, {
        withCredentials: true,
      })
      .then((response) => {
        return response.data;
      });
  };

  const handleChangeIndexInputSubmit = async () => {
    console.log("SUBMIT", indexInput);
    if (isNaN(Number(indexInput.height)) || Number(indexInput.height) <= 0) {
      notify(false, "Chiều cao không hợp lệ.");
    } else if (isNaN(indexInput.weight) || Number(indexInput.weight) <= 0) {
      notify(false, "Cân nặng không hợp lệ.");
    } else if (isNaN(Number(indexInput.age)) || Number(indexInput.age) <= 0) {
      notify(false, "Số tuổi không hợp lệ.");
    } else if (indexInput.gender !== "F" && indexInput.gender !== "M") {
      notify(false, "Bạn chưa chọn giới tính.");
    } else if (indexInput.id_laodong === -1) {
      notify(false, "Bạn chưa chọn cường độ lao động.");
    } else if (indexInput.id_doituong === -1) {
      notify(false, "Bạn chưa chọn đối tượng.");
    } else {
      const chi_so_user = {
        age: Number(indexInput.age),
        height: Number(indexInput.height),
        weight: Number(indexInput.weight),
        id_laodong: Number(indexInput.id_laodong),
        id_doituong: Number(indexInput.id_doituong),
        gender: indexInput.gender,
      };
      const response = await updateInfoIndexAPI(chi_so_user);
      notify(response.status, response.message);
      if (response.status) {
        setIndexInput(response.data);
      } else {
        if (response.must === "login") {
          return navigate("/account/login", { replace: true });
        }
      }
    }
  };

  const closeFormConfirm = () => {
    setDeleteChiSoUserStatus(false);
  };

  const handleXoaChiSoUser = async (id_chiso) => {
    const response = await axios.delete(`${ChiSoUserURL + "/" + id_chiso}`, {
      withCredentials: true,
    });
    notify(response.data.status, response.data.message);
    if (response.data.status) {
      setChiSoUserList(response.data.data);
      setDeleteChiSoUserStatus(false);
    } else {
      if (response.data.must === "login") {
        return navigate("/account/login", { replace: true });
      }
    }
  };

  const getBMI = () => {
    const chieu_cao = Number(indexInput.height) / 100;
    let ketQua = Number(indexInput.weight) / (chieu_cao * chieu_cao);
    ketQua = ketQua.toFixed(2);

    const gay_binh_thuong = caloKhuyenNghi
      ? "Năng lượng khuyến nghị " +
        caloKhuyenNghi +
        ". Bạn có thể cộng thêm khoảng 200 kcal nếu muốn giảm 0.25kg/ tuần hoặc 500 kcal nếu muốn tăng 0.5kg/ tuần."
      : "Sau khi có được lượng calo cần thiết cho cơ thể, bạn có thể cộng thêm khoảng 200 kcal nếu muốn giảm 0.25kg/ tuần hoặc 500 kcal nếu muốn tăng 0.5kg/ tuần.";
    const beo_phi = caloKhuyenNghi
      ? "Năng lượng khuyến nghị " +
        caloKhuyenNghi +
        ". Bạn có thể trừ đi khoảng 200 kcal nếu muốn giảm 0.25kg/ tuần hoặc 500 kcal nếu muốn giảm 0.5kg/ tuần."
      : "Sau khi tính được lượng calo cần thiết cho cơ thể, bạn có thể trừ đi khoảng 200 kcal nếu muốn giảm 0.25kg/ tuần hoặc 500 kcal nếu muốn giảm 0.5kg/ tuần.";

    if (ketQua < 16) {
      return (
        <p>
          <span style={{ color: "green" }}>Chỉ số BMI: </span>{" "}
          <span style={{ color: "blue" }}>{ketQua}.</span>{" "}
          <span>Thuộc loại: Gầy độ 3.</span>
          <span>{" " + gay_binh_thuong}</span>
        </p>
      );
    } else if (ketQua >= 16 && ketQua < 17) {
      return (
        <p>
          <span style={{ color: "green" }}>Chỉ số BMI: </span>{" "}
          <span style={{ color: "blue" }}>{ketQua}.</span>{" "}
          <span>Thuộc loại: Gầy độ 2.</span>
          <span>{" " + gay_binh_thuong}</span>
        </p>
      );
    } else if (ketQua >= 17 && ketQua < 18.5) {
      return (
        <p>
          <span style={{ color: "green" }}>Chỉ số BMI: </span>{" "}
          <span style={{ color: "blue" }}>{ketQua}.</span>{" "}
          <span>Thuộc loại: Gầy độ 1.</span>
          <span>{" " + gay_binh_thuong}</span>
        </p>
      );
    } else if (ketQua >= 18.5 && ketQua < 25) {
      return (
        <p>
          <span style={{ color: "green" }}>Chỉ số BMI: </span>{" "}
          <span style={{ color: "blue" }}>{ketQua}.</span>{" "}
          <span>Thuộc loại: Bình thường.</span>
          <span>{" " + gay_binh_thuong}</span>
        </p>
      );
    } else if (ketQua >= 25 && ketQua < 30) {
      return (
        <p>
          <span style={{ color: "green" }}>Chỉ số BMI: </span>{" "}
          <span style={{ color: "blue" }}>{ketQua}.</span>{" "}
          <span>Thuộc loại: Tiền béo phì.</span>
          <span>{" " + beo_phi}</span>
        </p>
      );
    } else if (ketQua >= 30 && ketQua < 35) {
      return (
        <p>
          <span style={{ color: "green" }}>Chỉ số BMI: </span>{" "}
          <span style={{ color: "blue" }}>{ketQua}.</span>{" "}
          <span>Thuộc loại: Béo phì độ 1.</span>
          <span>{" " + beo_phi}</span>
        </p>
      );
    } else if (ketQua >= 35 && ketQua < 40) {
      return (
        <p>
          <span style={{ color: "green" }}>Chỉ số BMI: </span>{" "}
          <span style={{ color: "blue" }}>{ketQua}.</span>{" "}
          <span>Thuộc loại: Béo phì độ 2.</span>
          <span>{" " + beo_phi}</span>
        </p>
      );
    } else if (ketQua >= 40) {
      return (
        <p>
          <span style={{ color: "green" }}>Chỉ số BMI: </span>{" "}
          <span style={{ color: "blue" }}>{ketQua}.</span>{" "}
          <span> Thuộc loại: Béo phì độ 3.</span>
          <span>{" " + beo_phi}</span>
        </p>
      );
    }
  };

  return (
    <Fragment>
      {loading ? (
        ""
      ) : (
        <div id="main">
          {deleteChiSoUserStatus && (
            <div
              className="background_black"
              id="background_black"
              style={{ display: "block" }}
            >
              <FormConfirm
                status={"customer_delete_chisouser"}
                content={
                  "Bạn chắc chắn muốn xóa chỉ số user ngày " +
                  convertToDate(deleteChiSoUserStatus.time_update)
                }
                id_handle={""}
                closeFormConfirm={closeFormConfirm}
                loadData={() => {
                  handleXoaChiSoUser(deleteChiSoUserStatus.id_chiso);
                }}
              />
            </div>
          )}
          <div className="page-content">
            <section className="row">
              <div className="col-12 col-lg-12">
                {<UserStatistic username={username} />}
                <div className="row">
                  <div className="col-12">
                    <div
                      className="col-lg-12 stretch-card"
                      style={{ padding: 0 }}
                    >
                      <div className="card">
                        <div className="card-body">
                          <h4
                            className="card-title"
                            style={{ marginBottom: 20, textAlign: "center" }}
                          >
                            Chỉnh sửa thông tin chỉ số
                          </h4>
                          <div
                            className="col-12"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <div className="col-6">
                              <div id="form_edit_indexInput_submit">
                                <div style={{ marginBottom: 20 }}>
                                  <label className="form-label">
                                    Chiều cao (cm)
                                  </label>
                                  <input
                                    className="form-control showordisable"
                                    name="height"
                                    defaultValue={indexInput.height}
                                    type="number"
                                    placeholder="Nhập chiều cao"
                                    onInput={(e) => handleChangeIndexInput(e)}
                                  />
                                </div>
                                <div style={{ marginBottom: 20 }}>
                                  <label className="form-label">
                                    Cân nặng (kg)
                                  </label>
                                  <input
                                    className="form-control showordisable"
                                    name="weight"
                                    defaultValue={indexInput.weight}
                                    type="number"
                                    placeholder="Nhập cân nặng"
                                    onInput={(e) => handleChangeIndexInput(e)}
                                  />
                                </div>
                                <div style={{ marginBottom: 20 }}>
                                  <label className="form-label">Độ tuổi</label>
                                  <input
                                    className="form-control showordisable"
                                    name="age"
                                    defaultValue={indexInput.age}
                                    type="number"
                                    placeholder="Nhập số tuổi của bạn"
                                    onInput={(e) => handleChangeIndexInput(e)}
                                  />
                                </div>
                                <div style={{ marginBottom: 20 }}>
                                  <label className="form-label">
                                    Giới tính
                                  </label>
                                  <select
                                    onChange={(e) => handleChangeIndexInput(e)}
                                    className="form-select"
                                    name="gender"
                                    value={indexInput.gender}
                                  >
                                    <option value={-1}>Chọn giới tính</option>
                                    <option value="M">Nam</option>
                                    <option value="F">Nữ</option>
                                  </select>
                                </div>
                                <div style={{ marginBottom: 20 }}>
                                  <label className="form-label">
                                    Đối tượng
                                  </label>
                                  <select
                                    onChange={(e) => handleChangeIndexInput(e)}
                                    className="form-select"
                                    name="id_doituong"
                                    value={indexInput.id_doituong}
                                  >
                                    <option value={-1}>Chọn đối tượng</option>
                                    {doituongList.map((doi_tuong, index) => {
                                      return (
                                        <option
                                          key={index}
                                          value={doi_tuong.id_doituong}
                                        >
                                          {doi_tuong.TenDoiTuong}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>
                                <div style={{ marginBottom: 20 }}>
                                  <label className="form-label">
                                    Nhóm lao động
                                  </label>
                                  <select
                                    onChange={(e) => handleChangeIndexInput(e)}
                                    className="form-select"
                                    name="id_laodong"
                                    value={indexInput.id_laodong}
                                  >
                                    <option value={-1}>
                                      Chọn mức độ lao động
                                    </option>
                                    {laoDongList.map((lao_dong, index) => {
                                      return (
                                        <option
                                          key={index}
                                          value={lao_dong.id_laodong}
                                        >
                                          {lao_dong.TenLaoDong}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>
                                <div
                                  style={{
                                    marginBottom: 20,
                                    textAlign: "center",
                                  }}
                                >
                                  <button
                                    type="button"
                                    id="btn_edit_indexInput"
                                    className="btn btn-success"
                                    onClick={() =>
                                      handleChangeIndexInputSubmit()
                                    }
                                  >
                                    Cập nhật thông tin
                                  </button>
                                </div>
                                <p style={{ textAlign: "center" }}>
                                  (Cập nhật lần cuối:{" "}
                                  {indexInput?.time_update
                                    ? convertToDate(indexInput?.time_update)
                                    : "Chưa cập nhật"}
                                  )
                                </p>
                                <div>
                                  {indexInput.weight !== "" &&
                                    !isNaN(indexInput.weight) &&
                                    Number(indexInput.height) > 0 &&
                                    indexInput.height !== "" &&
                                    Number(indexInput.height) > 0 &&
                                    !isNaN(indexInput.height) &&
                                    getBMI()}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div id="chart">
                            <Chart
                              series={[
                                {
                                  name: "Cân nặng (kg)",
                                  data: chiSoUserList
                                    .reverse()
                                    .slice(0, 30)
                                    .map((item) => Number(item.weight)),
                                },
                              ]}
                              options={{
                                chart: {
                                  height: 350,
                                  type: "area",
                                },
                                dataLabels: {
                                  enabled: false,
                                },
                                stroke: {
                                  curve: "smooth",
                                },
                                xaxis: {
                                  type: "date",
                                  categories: chiSoUserList
                                    .reverse()
                                    .slice(0, 30)
                                    .map((item) =>
                                      convertToDateOnly(item.time_update)
                                    ),
                                },
                                tooltip: {
                                  x: {
                                    format: "dd/MM/yy HH:mm",
                                  },
                                },
                              }}
                              type="area"
                              height={200}
                            />
                          </div>

                          <div className="table-responsive pt-3">
                            <table className="table table-bordered text-center">
                              <thead>
                                <tr>
                                  <th>STT</th>
                                  <th>Chiều cao (cm)</th>
                                  <th>Cân nặng (kg)</th>
                                  <th>Đối tượng</th>
                                  <th>Lao động</th>
                                  <th>Giới tính</th>
                                  <th>Thời gian</th>
                                  <th>Cập nhật</th>
                                </tr>
                              </thead>
                              <tbody>
                                {chiSoUserList.map((chi_so_item, index) => {
                                  if (
                                    index >= (page - 1) * maxShow &&
                                    index < page * maxShow
                                  ) {
                                    return (
                                      <tr key={index} className="table-white">
                                        <td
                                          style={{
                                            color: "#007bff",
                                            fontWeight: 700,
                                          }}
                                        >
                                          {index + 1}
                                        </td>
                                        <td
                                          style={{
                                            color: "#007bff",
                                            fontWeight: 700,
                                          }}
                                        >
                                          {Number(chi_so_item.height) * 1}
                                        </td>
                                        <td
                                          style={{
                                            color: "#007bff",
                                            fontWeight: 700,
                                          }}
                                        >
                                          {Number(chi_so_item.weight) * 1}
                                        </td>

                                        <td
                                          style={{
                                            color: "#007bff",
                                            fontWeight: 700,
                                          }}
                                        >
                                          {chi_so_item.DoiTuong.TenDoiTuong}
                                        </td>

                                        <td
                                          style={{
                                            color: "#007bff",
                                            fontWeight: 700,
                                          }}
                                        >
                                          {chi_so_item.LaoDong.TenLaoDong}
                                        </td>
                                        <td
                                          style={{
                                            color: "#28a745",
                                            fontWeight: 700,
                                          }}
                                        >
                                          {chi_so_item.gender === "M"
                                            ? "Nam"
                                            : "Nữ"}
                                        </td>
                                        <td
                                          style={{
                                            color: "#28a745",
                                            fontWeight: 700,
                                          }}
                                        >
                                          {convertToDate(
                                            chi_so_item.time_update
                                          )}
                                        </td>

                                        <td>
                                          <button
                                            type="button"
                                            className="btn btn-warning m-1 btn_edit"
                                            onClick={() => {
                                              setDeleteChiSoUserStatus(
                                                chi_so_item
                                              );
                                            }}
                                          >
                                            Xóa
                                          </button>
                                        </td>
                                      </tr>
                                    );
                                  } else return "";
                                })}
                              </tbody>
                            </table>
                          </div>
                          <div
                            className="flex_center"
                            style={{
                              marginBottom: 20,
                            }}
                          >
                            <div>Tổng số: {chiSoUserList.length}</div>
                            <ReactPaginate
                              breakLabel="..."
                              nextLabel="Next"
                              onPageChange={handlePageClick}
                              pageRangeDisplayed={2}
                              pageCount={
                                chiSoUserList.length <= maxShow
                                  ? 1
                                  : chiSoUserList.length % maxShow === 0
                                  ? Math.floor(chiSoUserList / maxShow)
                                  : Math.floor(chiSoUserList / maxShow) + 1
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
      )}
    </Fragment>
  );
}
