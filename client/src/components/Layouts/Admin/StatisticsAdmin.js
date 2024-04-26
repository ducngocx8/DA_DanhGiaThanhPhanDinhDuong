import React, { useEffect, useState } from "react";
import AdminThemeTop from "./AdminThemeTop";
import Chart from "react-apexcharts";
import { convertToDateOnly, notify } from "../../../Utils/Title";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { StatisticsAdminURL } from "../../../api/Admin";

export default function StatisticsAdmin({ username }) {
  let [thongKeUserType, setThongKeUserType] = useState("7days");
  let [thongKeUserList, setThongKeUserList] = useState([]);
  let [titleTKUserChoose, setTitleTKUserChoose] = useState(" 7 ngày gần nhất");
  let [timeTKUserChoose, setTimeTKUserChoose] = useState({
    startDate: "",
    endDate: "",
  });

  let [thongKeMonAnType, setThongKeMonAnType] = useState("7days");
  let [thongKeMonAnList, setThongKeMonAnList] = useState([]);
  let [titleTKMonAnChoose, setTitleTKMonAnChoose] =
    useState(" 7 ngày gần nhất");
  let [timeTKMonAnChoose, setTimeTKMonAnChoose] = useState({
    startDate: "",
    endDate: "",
  });

  let [thongKeTruyCapType, setThongKeTruyCapType] = useState("7days");
  let [thongKeTruyCapList, setThongKeTruyCapList] = useState([]);
  let [titleTKTruyCapChoose, setTitleTKTruyCapChoose] =
    useState(" 7 ngày gần nhất");
  let [timeTKTruyCapChoose, setTimeTKTruyCapChoose] = useState({
    startDate: "",
    endDate: "",
  });

  let navigate = useNavigate();

  useEffect(() => {
    const getThongKeUserByType = async () => {
      const response = await axios.get(
        `${
          StatisticsAdminURL + "/thong-ke-user?thongKeType=" + thongKeUserType
        }`,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        setThongKeUserList(response.data.data);
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
      await Promise.all([getThongKeUserByType()]);
    };
    if (["7days", "15days", "30days"].includes(thongKeUserType)) {
      handleAPIAll();
    }
  }, [thongKeUserType, navigate]);

  useEffect(() => {
    const getThongKeMonAnByType = async () => {
      const response = await axios.get(
        `${
          StatisticsAdminURL +
          "/thong-ke-mon-an?thongKeType=" +
          thongKeMonAnType
        }`,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        setThongKeMonAnList(response.data.data);
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
      await Promise.all([getThongKeMonAnByType()]);
    };
    if (["7days", "15days", "30days"].includes(thongKeMonAnType)) {
      handleAPIAll();
    }
  }, [thongKeMonAnType, navigate]);

  useEffect(() => {
    const getThongKeTruyCapByType = async () => {
      const response = await axios.get(
        `${
          StatisticsAdminURL +
          "/thong-ke-truy-cap?thongKeType=" +
          thongKeTruyCapType
        }`,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        setThongKeTruyCapList(response.data.data);
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
      await Promise.all([getThongKeTruyCapByType()]);
    };
    if (["7days", "15days", "30days"].includes(thongKeTruyCapType)) {
      handleAPIAll();
    }
  }, [thongKeTruyCapType, navigate]);

  const handleOnChangeTypeTKUser = (e) => {
    const { value, name } = e.target;
    if (name === "thongKeUserType") {
      if (value === "7days") {
        setTitleTKUserChoose(" 7 ngày gần nhất");
      } else if (value === "15days") {
        setTitleTKUserChoose(" 15 ngày gần nhất");
      } else if (value === "30days") {
        setTitleTKUserChoose(" 30 ngày gần nhất");
      }
    }
    setThongKeUserType(value);
  };

  const handleOnChangeTypeTKTruyCap = (e) => {
    const { value, name } = e.target;
    if (name === "thongKeTruyCapType") {
      if (value === "7days") {
        setTitleTKTruyCapChoose(" 7 ngày gần nhất");
      } else if (value === "15days") {
        setTitleTKTruyCapChoose(" 15 ngày gần nhất");
      } else if (value === "30days") {
        setTitleTKTruyCapChoose(" 30 ngày gần nhất");
      }
    }
    setThongKeTruyCapType(value);
  };

  const handleOnChangeTypeTKMonAn = (e) => {
    const { value, name } = e.target;
    if (name === "thongKeUserType") {
      if (value === "7days") {
        setTitleTKMonAnChoose(" 7 ngày gần nhất");
      } else if (value === "15days") {
        setTitleTKMonAnChoose(" 15 ngày gần nhất");
      } else if (value === "30days") {
        setTitleTKMonAnChoose(" 30 ngày gần nhất");
      }
    }
    setThongKeMonAnType(value);
  };

  const handleChangeTKUserTime = (e) => {
    const { value, name } = e.target;
    const date = new Date(Number(Date.parse(value)));
    const date_string =
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0");
    setTimeTKUserChoose({ ...timeTKUserChoose, [name]: date_string });
  };

  const handleChangeTKTruyCapTime = (e) => {
    const { value, name } = e.target;
    const date = new Date(Number(Date.parse(value)));
    const date_string =
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0");
    setTimeTKTruyCapChoose({ ...timeTKTruyCapChoose, [name]: date_string });
  };

  const handleChangeTKMonAnTime = (e) => {
    const { value, name } = e.target;
    const date = new Date(Number(Date.parse(value)));
    const date_string =
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0");
    setTimeTKMonAnChoose({ ...timeTKMonAnChoose, [name]: date_string });
  };

  const getTKUserBetweenTwoDay = async () => {
    if (timeTKUserChoose.startDate === "") {
      notify(false, "Vui lòng chọn ngày bắt đầu");
      return;
    } else if (timeTKUserChoose.endDate === "") {
      notify(false, "Vui lòng chọn ngày kết thúc");
      return;
    }
    const response = await axios.get(
      `${
        StatisticsAdminURL +
        "/thong-ke-user?startDate=" +
        timeTKUserChoose.startDate +
        "&endDate=" +
        timeTKUserChoose.endDate
      }`,
      {
        withCredentials: true,
      }
    );
    if (response.data.status) {
      setThongKeUserList(response.data.data);
      setThongKeUserType(-1);
      setTitleTKUserChoose(
        " từ " +
          convertToDateOnly(timeTKUserChoose.startDate) +
          " đến " +
          convertToDateOnly(timeTKUserChoose.endDate)
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

  const getTKTruyCapBetweenTwoDay = async () => {
    if (timeTKTruyCapChoose.startDate === "") {
      notify(false, "Vui lòng chọn ngày bắt đầu");
      return;
    } else if (timeTKTruyCapChoose.endDate === "") {
      notify(false, "Vui lòng chọn ngày kết thúc");
      return;
    }
    const response = await axios.get(
      `${
        StatisticsAdminURL +
        "/thong-ke-truy-cap?startDate=" +
        timeTKTruyCapChoose.startDate +
        "&endDate=" +
        timeTKTruyCapChoose.endDate
      }`,
      {
        withCredentials: true,
      }
    );
    if (response.data.status) {
      setThongKeTruyCapList(response.data.data);
      setThongKeTruyCapType(-1);
      setTitleTKTruyCapChoose(
        " từ " +
          convertToDateOnly(timeTKTruyCapChoose.startDate) +
          " đến " +
          convertToDateOnly(timeTKTruyCapChoose.endDate)
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

  const getTKMonAnBetweenTwoDay = async () => {
    if (timeTKMonAnChoose.startDate === "") {
      notify(false, "Vui lòng chọn ngày bắt đầu");
      return;
    } else if (timeTKMonAnChoose.endDate === "") {
      notify(false, "Vui lòng chọn ngày kết thúc");
      return;
    }
    const response = await axios.get(
      `${
        StatisticsAdminURL +
        "/thong-ke-mon-an?startDate=" +
        timeTKMonAnChoose.startDate +
        "&endDate=" +
        timeTKMonAnChoose.endDate
      }`,
      {
        withCredentials: true,
      }
    );
    if (response.data.status) {
      setThongKeMonAnList(response.data.data);
      setThongKeMonAnType(-1);
      setTitleTKMonAnChoose(
        " từ " +
          convertToDateOnly(timeTKMonAnChoose.startDate) +
          " đến " +
          convertToDateOnly(timeTKMonAnChoose.endDate)
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

  return (
    <div id="main">
      <div className="page-content">
        <section className="row">
          <div className="col-12 col-lg-12">
            <AdminThemeTop username={username} />
            <div className="row">
              <div className="col-12" style={{ position: "relative" }}>
                <div className="card">
                  <div className="card-body">
                    <div>
                      <h4
                        className="card-title"
                        style={{ marginBottom: 20, textAlign: "center" }}
                      >
                        {"Thống kê món ăn mới" + titleTKMonAnChoose}
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
                        <label className="form-label" htmlFor="basic-form-dob">
                          Thống kê theo
                        </label>
                        <select
                          style={{
                            width: "auto",
                          }}
                          onChange={(e) => handleOnChangeTypeTKMonAn(e)}
                          className="form-select noborderRadius"
                          name="thongKeMonAnType"
                          defaultValue={thongKeMonAnType}
                        >
                          <option value={-1}>Chọn thống kê</option>
                          <option value={"7days"}>7 ngày gần nhất</option>
                          <option value={"15days"}>15 ngày gần nhất</option>
                          <option value={"30days"}>30 ngày gần nhất</option>
                        </select>
                      </div>

                      <div>-</div>
                      <div style={{ display: "flex", alignItems: "center" }}>
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
                            onChange={(e) => handleChangeTKMonAnTime(e)}
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
                            onChange={(e) => handleChangeTKMonAnTime(e)}
                          />
                        </div>
                        <button
                          onClick={() => getTKMonAnBetweenTwoDay()}
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
                            name: "Quản lý tạo",
                            data: thongKeMonAnList.map((item) =>
                              Number(item.total_admin)
                            ),
                          },
                          {
                            name: "Người dùng tạo",
                            data: thongKeMonAnList.map((item) =>
                              Number(item.total_user)
                            ),
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
                            categories: thongKeMonAnList.map((item) => {
                              return convertToDateOnly(item.ngay);
                            }),
                          },
                        }}
                        type="area"
                        height={300}
                      />
                    </div>
                  </div>
                </div>
                {/* Thống kê user */}
                <div className="card">
                  <div className="card-body">
                    <div>
                      <h4
                        className="card-title"
                        style={{ marginBottom: 20, textAlign: "center" }}
                      >
                        {"Thống kê người dùng mới" + titleTKUserChoose}
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
                        <label className="form-label" htmlFor="basic-form-dob">
                          Thống kê theo
                        </label>
                        <select
                          style={{
                            width: "auto",
                          }}
                          onChange={(e) => handleOnChangeTypeTKUser(e)}
                          className="form-select noborderRadius"
                          name="thongKeUserType"
                          defaultValue={thongKeUserType}
                        >
                          <option value={-1}>Chọn thống kê</option>
                          <option value={"7days"}>7 ngày gần nhất</option>
                          <option value={"15days"}>15 ngày gần nhất</option>
                          <option value={"30days"}>30 ngày gần nhất</option>
                        </select>
                      </div>

                      <div>-</div>
                      <div style={{ display: "flex", alignItems: "center" }}>
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
                            onChange={(e) => handleChangeTKUserTime(e)}
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
                            onChange={(e) => handleChangeTKUserTime(e)}
                          />
                        </div>
                        <button
                          onClick={() => getTKUserBetweenTwoDay()}
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
                            name: "Người dùng mới",
                            data: thongKeUserList.map((item) =>
                              Number(item.total)
                            ),
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
                            categories: thongKeUserList.map((item) => {
                              return convertToDateOnly(item.ngay);
                            }),
                          },
                        }}
                        type="area"
                        height={300}
                      />
                    </div>
                  </div>
                </div>
                {/* Thống kê truy cập */}
                <div className="card">
                  <div className="card-body">
                    <div>
                      <h4
                        className="card-title"
                        style={{ marginBottom: 20, textAlign: "center" }}
                      >
                        {"Thống kê số lượng truy cập" + titleTKTruyCapChoose}
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
                        <label className="form-label" htmlFor="basic-form-dob">
                          Thống kê theo
                        </label>
                        <select
                          style={{
                            width: "auto",
                          }}
                          onChange={(e) => handleOnChangeTypeTKTruyCap(e)}
                          className="form-select noborderRadius"
                          name="thongKeTruyCapType"
                          defaultValue={thongKeTruyCapType}
                        >
                          <option value={-1}>Chọn thống kê</option>
                          <option value={"7days"}>7 ngày gần nhất</option>
                          <option value={"15days"}>15 ngày gần nhất</option>
                          <option value={"30days"}>30 ngày gần nhất</option>
                        </select>
                      </div>

                      <div>-</div>
                      <div style={{ display: "flex", alignItems: "center" }}>
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
                            onChange={(e) => handleChangeTKTruyCapTime(e)}
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
                            onChange={(e) => handleChangeTKTruyCapTime(e)}
                          />
                        </div>
                        <button
                          onClick={() => getTKTruyCapBetweenTwoDay()}
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
                            name: "Số lượng truy cập",
                            data: thongKeTruyCapList.map((item) =>
                              Number(item.TOTAL)
                            ),
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
                            categories: thongKeTruyCapList.map((item) => {
                              return convertToDateOnly(item.ngay);
                            }),
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
        </section>
      </div>
    </div>
  );
}
