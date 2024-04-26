import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import AdminHeaderLeft from "../Admin/AdminHeaderLeft";
import { CUSTOMER_CODE } from "../../../Utils/Title";
export default function AccountLeft({ active_id, role }) {
  return (
    <div id="sidebar" className="active">
      <div className="sidebar-wrapper active">
        <AdminHeaderLeft />
        <div className="sidebar-menu">
          <ul className="menu">
            <li className="sidebar-title">Danh Mục Khách Hàng</li>
            <li className={`sidebar-item ${active_id === 1 ? "active" : ""} `}>
              <Link to="/account/info" className="sidebar-link">
                <i className="fas fa-user" />
                <span>Thông tin tài khoản</span>
              </Link>
            </li>
            {role === CUSTOMER_CODE && (
              <Fragment>
                <li
                  className={`sidebar-item ${active_id === 2 ? "active" : ""} `}
                >
                  <Link to="/account/index" className="sidebar-link">
                    <i className="fas fa-address-book" />
                    <span>Chỉ số cơ thể</span>
                  </Link>
                </li>
                <li
                  className={`sidebar-item ${active_id === 3 ? "active" : ""} `}
                >
                  <Link to="/account/muc-tieu" className="sidebar-link">
                    <i className="fas fa-bullseye" />
                    <span>Quản lý mục tiêu</span>
                  </Link>
                </li>
                <li
                  className={`sidebar-item ${active_id === 4 ? "active" : ""} `}
                >
                  <Link to="/account/nutrition" className="sidebar-link">
                    <i className="fas fa-utensils" />
                    <span>Quản lý dinh dưỡng</span>
                  </Link>
                </li>
                <li
                  className={`sidebar-item ${active_id === 5 ? "active" : ""} `}
                >
                  <Link to="/account/khuyen-nghi" className="sidebar-link">
                    <i className="fas fa-bars" />
                    <span>Khuyến nghị</span>
                  </Link>
                </li>
                <li
                  className={`sidebar-item ${active_id === 6 ? "active" : ""} `}
                >
                  <Link to="/account/mon-an" className="sidebar-link">
                    <i className="fa fa-hamburger" />
                    <span>Món ăn</span>
                  </Link>
                </li>
                <li
                  className={`sidebar-item ${active_id === 7 ? "active" : ""} `}
                >
                  <Link
                    to="/account/thong-ke-dinh-duong"
                    className="sidebar-link"
                  >
                    <i className="fas fa-chart-bar" />
                    <span>Thống kê dinh dưỡng</span>
                  </Link>
                </li>
              </Fragment>
            )}
          </ul>
        </div>
        <button className="sidebar-toggler btn x">
          <i data-feather="x" />
        </button>
      </div>
    </div>
  );
}
