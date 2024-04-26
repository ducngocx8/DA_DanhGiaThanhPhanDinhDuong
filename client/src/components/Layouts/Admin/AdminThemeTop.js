import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { notify } from "../../../Utils/Title";
import axios from "axios";
import { StatisticsAdminURL } from "../../../api/Admin";

export default function AdminThemeTop({ username }) {
  let navigate = useNavigate();
  let [countList, setCountList] = useState(false);

  useEffect(() => {
    async function getCount() {
      const response = await axios.get(`${StatisticsAdminURL + "/count/top"}`, {
        withCredentials: true,
      });
      if (response.data.status) {
        setCountList(response.data.data[0]);
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    }

    const list_promise = [Promise.resolve(getCount())];

    Promise.all(list_promise);
  }, [navigate]);
  return (
    <div className="row">
      <div className="col-6 col-lg-3 col-md-6">
        <div className="card">
          <div className="card-body px-3 py-4-5">
            <div className="row">
              <div className="col-md-4">
                <div className="stats-icon purple">
                  <i className="fas fa-seedling text-c-red f-18" />
                </div>
              </div>
              <div className="col-md-8">
                <h6 className="text-muted font-semibold">Thực phẩm</h6>
                <h6 className="font-bold mb-0">
                  {countList && countList.count_thucpham}
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
                  <i className="fas fa-utensils text-c-blue f-18" />
                </div>
              </div>
              <div className="col-md-8">
                <h6 className="text-muted font-semibold">Món ăn</h6>
                <h6 className="font-bold mb-0">
                  {countList && countList.count_monan}
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
                <div className="stats-icon green">
                  <i className="fas fa-house-user text-c-green f-18" />
                </div>
              </div>
              <div className="col-md-8">
                <h6 className="text-muted font-semibold">Tổng User</h6>
                <h6 className="font-bold mb-0">
                  {countList && countList.count_user}
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
  );
}
