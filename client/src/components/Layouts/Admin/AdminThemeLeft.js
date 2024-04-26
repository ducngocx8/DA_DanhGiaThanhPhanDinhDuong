import React from "react";
import { Link } from "react-router-dom";

export default function AdminThemeLeft({ active_id, role }) {
  // console.log(role);
  return (
    <div id="sidebar" className="active">
      <div className="sidebar-wrapper active">
        <div className="sidebar-header">
          <div className="d-flex justify-content-between">
            <div className="logo">
              <Link to="/admin/statistic" style={{ textDecoration: "none" }}>
                <img
                  src="/logo.png"
                  style={{ width: 75, height: "auto" }}
                  alt="Logo"
                />
                <span style={{ fontSize: 25, color: "#435ebe" }}>
                  DINH DƯỠNG
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div
          className="sidebar-menu"
          id="style-14"
          style={{
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          <ul className="menu">
            <li className="sidebar-title">Danh Mục Quản Lý</li>
            {/* <li
              className={`sidebar-item ${
                active_id === "ADMIN_DONVI" ? "active" : ""
              } `}
            >
              <Link to="/admin/don-vi" className="sidebar-link">
                <i className="fas fa-pencil-ruler" />
                <span>Đơn vị</span>
              </Link>
            </li> */}
            <li
              className={`sidebar-item ${
                active_id === "ADMIN_STATISTIC" ? "active" : ""
              } `}
            >
              <Link to="/admin/statistic" className="sidebar-link">
                <i className="fas fa-chart-bar" />
                <span>Thống kê</span>
              </Link>
            </li>
            <li
              className={`sidebar-item ${
                active_id === "ADMIN_THUCPHAM" ? "active" : ""
              } `}
            >
              <Link to="/admin/thuc-pham" className="sidebar-link">
                <i className="fas fa-seedling" />
                <span>Thực Phẩm</span>
              </Link>
            </li>
            <li
              className={`sidebar-item ${
                active_id === "ADMIN_NHOMTHUCPHAM" ? "active" : ""
              } `}
            >
              <Link to="/admin/nhom-thuc-pham" className="sidebar-link">
                <i className="fas fa-apple-alt" />
                <span>Nhóm Thực Phẩm</span>
              </Link>
            </li>
            <li
              className={`sidebar-item ${
                active_id === "ADMIN_MONAN" ? "active" : ""
              } `}
            >
              <Link to="/admin/mon-an" className="sidebar-link">
                <i className="fas fa-hamburger" />
                <span>Món Ăn</span>
              </Link>
            </li>

            <li
              className={`sidebar-item ${
                active_id === "ADMIN_NHOMMONAN" ? "active" : ""
              } `}
            >
              <Link to="/admin/nhom-mon-an" className="sidebar-link">
                <i className="fas fa-utensils" />
                <span>Nhóm Món Ăn</span>
              </Link>
            </li>

            <li
              className={`sidebar-item ${
                active_id === "ADMIN_CUSTOMER" ? "active" : ""
              } `}
            >
              <Link to="/admin/customer" className="sidebar-link">
                <i className="fas fa-user-circle" />
                <span>Customers</span>
              </Link>
            </li>

            <li
              className={`sidebar-item ${
                active_id === "ADMIN_CHUYENMUC" ? "active" : ""
              } `}
            >
              <Link to="/admin/chuyen-muc" className="sidebar-link">
                <i className="fas fa-bars" />
                <span>Chuyên mục</span>
              </Link>
            </li>
            <li
              className={`sidebar-item ${
                active_id === "ADMIN_BAIVIET" ? "active" : ""
              } `}
            >
              <Link to="/admin/bai-viet" className="sidebar-link">
                <i className="fas fa-newspaper" />
                <span>Bài viết</span>
              </Link>
            </li>

            <li
              className={`sidebar-item ${
                active_id === "ADMIN_NGAYAN" ? "active" : ""
              } `}
            >
              <Link to="/admin/ngay-an" className="sidebar-link">
                <i className="fas fa-book" />
                <span>Ngày Ăn</span>
              </Link>
            </li>

            <li
              className={`sidebar-item ${
                active_id === "ADMIN_CHISODUONGHUYET" ? "active" : ""
              } `}
            >
              <Link to="/admin/chi-so-duong-huyet" className="sidebar-link">
                <i className="fas fa-cheese" />
                <span>Chỉ Số Đường Huyết</span>
              </Link>
            </li>

            <li
              className={`sidebar-item ${
                active_id === "ADMIN_BUAAN" ? "active" : ""
              } `}
            >
              <Link to="/admin/bua-an" className="sidebar-link">
                <i className="fas fa-user-astronaut" />
                <span>Bữa Ăn</span>
              </Link>
            </li>
            <li
              className={`sidebar-item ${
                active_id === "ADMIN_LAODONG" ? "active" : ""
              } `}
            >
              <Link to="/admin/lao-dong" className="sidebar-link">
                <i className="fas fa-walking" />
                <span>Nhóm Lao Động</span>
              </Link>
            </li>

            <li
              className={`sidebar-item ${
                active_id === "ADMIN_DOITUONG" ? "active" : ""
              } `}
            >
              <Link to="/admin/doi-tuong" className="sidebar-link">
                <i className="fas fa-laugh-squint" />
                <span>Nhóm Đối Tượng</span>
              </Link>
            </li>
            <li
              className={`sidebar-item ${
                active_id === "ADMIN_NHOMTUOI" ? "active" : ""
              } `}
            >
              <Link to="/admin/nhom-tuoi" className="sidebar-link">
                <i className="fas fa-bookmark" />
                <span>Nhóm Tuổi</span>
              </Link>
            </li>
            <li
              className={`sidebar-item ${
                active_id === "ADMIN_THANHPHANNHUCAU" ? "active" : ""
              } `}
            >
              <Link to="/admin/thanh-phan-nhu-cau" className="sidebar-link">
                <i className="fas fa-heart" />
                <span>Thành Phần Nhu Cầu</span>
              </Link>
            </li>

            <li
              className={`sidebar-item ${
                active_id === "ADMIN_NHUCAUHANGNGAY" ? "active" : ""
              } `}
            >
              <Link to="/admin/nhu-cau-hang-ngay" className="sidebar-link">
                <i className="fas fa-database" />
                <span>Nhu Cầu Hàng Ngày</span>
              </Link>
            </li>

            <li
              className={`sidebar-item ${
                active_id === "ADMIN_CHISOUSER" ? "active" : ""
              } `}
            >
              <Link to="/admin/chi-so-user" className="sidebar-link">
                <i className="fas fa-address-book" />
                <span>Chỉ Số User</span>
              </Link>
            </li>
            <li
              className={`sidebar-item ${
                active_id === "ADMIN_MUCTIEU" ? "active" : ""
              } `}
            >
              <Link to="/admin/muc-tieu" className="sidebar-link">
                <i className="fas fa-bullseye" />
                <span>Mục Tiêu</span>
              </Link>
            </li>

            <li
              className={`sidebar-item ${
                active_id === "ADMIN_ROLE" ? "active" : ""
              } `}
            >
              <Link to="/admin/role" className="sidebar-link">
                <i className="fas fa-house-user" />
                <span>Roles</span>
              </Link>
            </li>

            <li
              className={`sidebar-item ${
                active_id === "ADMIN_LICHSULOG" ? "active" : ""
              } `}
            >
              <Link to="/admin/lich-su-log" className="sidebar-link">
                <i className="fas fa-history" />
                <span>Lịch sử login</span>
              </Link>
            </li>
            <li
              className={`sidebar-item ${
                active_id === "ADMIN_THONGBAO" ? "active" : ""
              } `}
            >
              <Link to="/admin/thong-bao" className="sidebar-link">
                <i className="fas fa-envelope"></i>
                <span>Thông báo</span>
              </Link>
            </li>
            <li
              className={`sidebar-item ${
                active_id === "ADMIN_OTP" ? "active" : ""
              } `}
            >
              <Link to="/admin/otp" className="sidebar-link">
                <i className="fas fa-code"></i>
                <span>OTP SMS</span>
              </Link>
            </li>
          </ul>
        </div>
        <button className="sidebar-toggler btn x">
          <i data-feather="x" />
        </button>
      </div>
    </div>
  );
}
