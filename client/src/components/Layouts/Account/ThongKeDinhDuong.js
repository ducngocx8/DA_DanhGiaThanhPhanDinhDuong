import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import UserStatistic from "./UserStatistic";
import { Title, convertToDateOnly, notify } from "../../../Utils/Title";
import { useNavigate } from "react-router-dom";
import { ThongKeURL, khuyenNghiURL } from "../../../api";
export default function ThongKeDinhDuong({ username }) {
  let navigate = useNavigate();
  let [thongKeType, setThongKeType] = useState("7days");
  let [tpDinhDuong, setTPDinhDuong] = useState({
    code: "ENERC",
    text: "NangLuong",
    title: "Năng lượng",
    donvi: "Kcal",
  });
  let [titleTKDinhDuongChoose, setTitleTKDinhDuongChoose] =
    useState(" 7 ngày gần nhất");
  let [thongKeList, setThongKeList] = useState([]);
  let [timeChoose, setTimeChoose] = useState({
    startDate: "",
    endDate: "",
  });
  let [khuyenNghi, setKhuyenNghi] = useState(null);
  let [max, setMax] = useState(6);

  useEffect(() => {
    const getThongKeDinhDuong = async () => {
      const response = await axios.get(
        `${ThongKeURL + "/thong-ke-dinh-duong?thongKeType=7days"}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        setThongKeList(response.data.data);
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    };
    const getKhuyenNghi = async () => {
      const response = await axios.get(`${khuyenNghiURL}`, {
        withCredentials: true,
      });
      if (response.data.status) {
        setKhuyenNghi(response.data.data);
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigate("/account/login", { replace: true });
        }
      }
    };

    const handleAPIAll = async () => {
      await Promise.all([getThongKeDinhDuong(), getKhuyenNghi()]);
    };
    handleAPIAll();
  }, [navigate]);

   useEffect(() => {
     document.title = Title.user_thongke + Title.origin;
   }, []);

  useEffect(() => {
    let max_find = 6;
    thongKeList.forEach((item) => {
      if (Number(item[tpDinhDuong.code]) > max_find) {
        max_find = Number(item[tpDinhDuong.code]);
      }
    });
    if (max_find !== 6) {
      const max_distance = tpDinhDuong.code === "ENERC" ? 300 : 30;
      if (
        khuyenNghi &&
        khuyenNghi.ThanhPhanNhuCau &&
        khuyenNghi.ThanhPhanNhuCau[tpDinhDuong.text] &&
        khuyenNghi.ThanhPhanNhuCau[tpDinhDuong.text].match(/\d+/) &&
        !isNaN(
          Number(khuyenNghi.ThanhPhanNhuCau[tpDinhDuong.text].match(/\d+/)[0])
        )
      ) {
        if (
          max_find <=
          Number(khuyenNghi.ThanhPhanNhuCau[tpDinhDuong.text].match(/\d+/)[0])
        ) {
          setMax(
            Number(
              khuyenNghi.ThanhPhanNhuCau[tpDinhDuong.text].match(/\d+/)[0]
            ) + max_distance
          );
        } else {
          setMax(max_find + max_distance);
        }
      } else {
        setMax(max_find + max_distance);
      }
    }
  }, [thongKeList, khuyenNghi, tpDinhDuong]);

  const getTKDinhDuongBetweenTwoDay = async () => {
    if (timeChoose.startDate === "") {
      notify(false, "Vui lòng chọn ngày bắt đầu");
      return;
    } else if (timeChoose.endDate === "") {
      notify(false, "Vui lòng chọn ngày kết thúc");
      return;
    }
    const response = await axios.get(
      `${
        ThongKeURL +
        "/thong-ke-dinh-duong?startDate=" +
        timeChoose.startDate +
        "&endDate=" +
        timeChoose.endDate
      }`,
      {
        withCredentials: true,
      }
    );
    if (response.data.status) {
      setThongKeList(response.data.data);
      setThongKeType(-1);
      setTitleTKDinhDuongChoose(
        " từ " +
          convertToDateOnly(timeChoose.startDate) +
          " đến " +
          convertToDateOnly(timeChoose.endDate)
      );
    } else {
      notify(false, response.data.message);
      if (response.data.must === "login") {
        return navigate("/", { replace: true });
      } else if (response.data.must === "permission") {
        return navigate("/", { replace: true });
      }
    }
  };

  useEffect(() => {
    const getThongKeDinhDuongByType = async () => {
      const response = await axios.get(
        `${ThongKeURL + "/thong-ke-dinh-duong?thongKeType=" + thongKeType}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        setThongKeList(response.data.data);
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    };
    const handleAPIAll = async () => {
      await Promise.all([getThongKeDinhDuongByType()]);
    };
    if (["7days", "15days", "30days"].includes(thongKeType)) {
      handleAPIAll();
    }
  }, [thongKeType, navigate]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    if (name === "thongKeType") {
      if (value === "7days") {
        setTitleTKDinhDuongChoose(" 7 ngày gần nhất");
      } else if (value === "15days") {
        setTitleTKDinhDuongChoose(" 15 ngày gần nhất");
      } else if (value === "30days") {
        setTitleTKDinhDuongChoose(" 30 ngày gần nhất");
      }
      setThongKeType(value);
    } else if (name === "tpDinhDuong") {
      if (value === "ENERC") {
        setTPDinhDuong({
          code: value,
          text: "NangLuong",
          title: "Năng lượng",
          donvi: "Kcal",
        });
      } else if (value === "PROCNT") {
        setTPDinhDuong({
          code: value,
          text: "Protein",
          title: "Protein",
          donvi: "g",
        });
      } else if (value === "FAT") {
        setTPDinhDuong({
          code: value,
          text: "Lipid",
          title: "Chất béo",
          donvi: "g",
        });
      } else if (value === "CHOCDF") {
        setTPDinhDuong({
          code: value,
          text: "Glucid",
          title: "Carbohydrate",
          donvi: "g",
        });
      }
    }
  };

  const handleChangeTime = (e) => {
    const { value, name } = e.target;
    const date = new Date(Number(Date.parse(value)));
    const date_string =
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0");
    setTimeChoose({ ...timeChoose, [name]: date_string });
  };

  return (
    <Fragment>
      <div id="main">
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
                        <div>
                          <h4
                            className="card-title"
                            style={{ marginBottom: 20, textAlign: "center" }}
                          >
                            {"Thống kê dinh dưỡng" + titleTKDinhDuongChoose}
                          </h4>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            margin: "20px 0px",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>
                            <label
                              className="form-label"
                              htmlFor="basic-form-dob"
                            >
                              Thống kê theo
                            </label>
                            <select
                              style={{
                                width: "auto",
                              }}
                              onChange={(e) => handleOnChange(e)}
                              className="form-select noborderRadius"
                              name="thongKeType"
                              defaultValue={thongKeType}
                            >
                              <option value={-1}>Chọn thống kê</option>
                              <option value={"7days"}>7 ngày gần nhất</option>
                              <option value={"15days"}>15 ngày gần nhất</option>
                              <option value={"30days"}>30 ngày gần nhất</option>
                            </select>
                          </div>

                          <div>
                            <label
                              className="form-label"
                              htmlFor="basic-form-dob"
                            >
                              TP dinh dưỡng
                            </label>
                            <select
                              style={{
                                width: "auto",
                              }}
                              onChange={(e) => handleOnChange(e)}
                              className="form-select noborderRadius"
                              name="tpDinhDuong"
                              defaultValue={tpDinhDuong}
                            >
                              <option value={"ENERC"}>Năng lượng</option>
                              <option value={"PROCNT"}>Protein</option>
                              <option value={"FAT"}>Chất béo</option>
                              <option value={"CHOCDF"}>Carbohydrate</option>
                            </select>
                          </div>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div>
                              <label
                                className="form-label"
                                htmlFor="basic-form-dob"
                              >
                                Ngày bắt đầu
                              </label>
                              <input
                                className="form-control"
                                name="startDate"
                                type="date"
                                onChange={(e) => handleChangeTime(e)}
                              />
                            </div>
                            <div style={{ marginLeft: 15 }}>
                              <label
                                className="form-label"
                                htmlFor="basic-form-dob"
                              >
                                Ngày kết thúc
                              </label>
                              <input
                                className="form-control"
                                name="endDate"
                                type="date"
                                onChange={(e) => handleChangeTime(e)}
                              />
                            </div>
                            <button
                              onClick={() => getTKDinhDuongBetweenTwoDay()}
                              className="btn btn-success"
                              style={{
                                marginLeft: 10,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: 10,
                              }}
                            >
                              <i className="fas fa-search text-white" />
                            </button>
                          </div>
                        </div>
                        <div>
                          <Chart
                            series={[
                              {
                                name: tpDinhDuong.title,
                                data: thongKeList.map((item) => {
                                  return Number(item[tpDinhDuong.code]);
                                }),
                              },
                            ]}
                            options={{
                              chart: {
                                height: 350,
                                type: "area",
                              },
                              yaxis: {
                                max: Number(max),
                              },
                              annotations:
                                khuyenNghi &&
                                khuyenNghi.ThanhPhanNhuCau &&
                                khuyenNghi.ThanhPhanNhuCau[tpDinhDuong.text] &&
                                khuyenNghi.ThanhPhanNhuCau[
                                  tpDinhDuong.text
                                ].match(/\d+/) &&
                                !isNaN(
                                  Number(
                                    khuyenNghi.ThanhPhanNhuCau[
                                      tpDinhDuong.text
                                    ].match(/\d+/)[0]
                                  )
                                )
                                  ? {
                                      yaxis: [
                                        {
                                          y: Number(
                                            khuyenNghi.ThanhPhanNhuCau[
                                              tpDinhDuong.text
                                            ].match(/\d+/)[0]
                                          ),
                                          borderColor: "#00E396",
                                          label: {
                                            borderColor: "#00E396",
                                            style: {
                                              color: "#fff",
                                              background: "#00E396",
                                            },
                                            text: `Khuyến nghị ${Number(
                                              khuyenNghi.ThanhPhanNhuCau[
                                                tpDinhDuong.text
                                              ].match(/\d+/)[0]
                                            )} ${tpDinhDuong.donvi}`,
                                          },
                                        },
                                      ],
                                    }
                                  : {},
                              dataLabels: {
                                enabled: false,
                              },
                              stroke: {
                                curve: "smooth",
                              },
                              xaxis: {
                                type: "date",
                                categories: thongKeList.map((item) => {
                                  return convertToDateOnly(item.ngay);
                                }),
                              },
                              tooltip: {
                                x: {
                                  format: "dd/MM/yy HH:mm",
                                },
                              },
                            }}
                            type="area"
                            height={300}
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
    </Fragment>
  );
}
