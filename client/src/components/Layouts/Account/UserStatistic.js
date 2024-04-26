import React, { useEffect, useState, memo } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { notify } from "../../../Utils/Title";
import { ThongKeURL } from "../../../api";

function Statistic({ username }) {
  let [loading, setLoading] = useState(true);
  let [thongKeTop, setThongKeTop] = useState({
    COUNT_FOOD: null,
    weight: null,
    ENERC: null,
  });
  let navigate = useNavigate();

  useEffect(() => {
    async function getThongKeTop() {
      const response = await axios.get(`${ThongKeURL + "/thong-ke-top"}`, {
        withCredentials: true,
      });
      if (response.data.status) {
        setThongKeTop(response.data.data[0]);
        setLoading(false);
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigate("/account/login", { replace: true });
        }
      }
    }
    getThongKeTop();
  }, [navigate]);

  return (
    <>
      {loading ? (
        ""
      ) : (
        <div className="row">
          <div className="col-6 col-lg-3 col-md-6">
            <div className="card">
              <div className="card-body px-3 py-4-5">
                <div className="row">
                  <div className="col-md-4">
                    <div className="stats-icon purple">
                      <i className="fas fa-battery-half text-c-red f-18" />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <h6 className="text-muted font-semibold">Năng lượng</h6>
                    <h6 className="mb-0">
                      {thongKeTop.ENERC
                        ? Number(thongKeTop.ENERC).toLocaleString("vi")
                        : ""}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 col-lg-3 col-md-6">
            <div className="card">
              <div className="card-body px-3 py-4-5">
                <div className="row">
                  <div className="col-md-4">
                    <div className="stats-icon blue">
                      <i className="fas fa-weight text-c-blue f-18" />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <h6 className="text-muted font-semibold">Cân nặng</h6>
                    {thongKeTop.weight
                      ? Number(thongKeTop.weight).toLocaleString("vi")
                      : "-"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 col-lg-3 col-md-6">
            <div className="card">
              <div className="card-body px-3 py-4-5">
                <div className="row">
                  <div className="col-md-4">
                    <div className="stats-icon green">
                      <i className="fas fa-utensils text-c-green f-18" />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <h6 className="text-muted font-semibold">Món đã tạo</h6>
                    {thongKeTop.COUNT_FOOD
                      ? Number(thongKeTop.COUNT_FOOD).toLocaleString("vi")
                      : "-"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 col-lg-3 col-md-6">
            <div className="card">
              <div className="card-body px-3 py-4-5">
                <div className="row">
                  <div className="col-md-4">
                    <div className="stats-icon red">
                      <i className="fas fa-user text-c-yellow f-18" />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <h6 className="text-muted font-semibold">Login Info</h6>
                    <h6 className="mb-0" style={{ fontSize: 14 }}>
                      <Link to="/account/login">{username}</Link> |{" "}
                      <span>
                        <Link to="/account/logout">Logout</Link>
                      </span>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(Statistic);
