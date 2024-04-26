import React from "react";

export default function MonAnFilter({ setStatus, status }) {
  return (
    <div className="row">
      <div className="col-12">
        <div className="col-lg-12 stretch-card" style={{ padding: 0 }}>
          <div className="card">
            <div className="card-body">
              <h4
                className="card-title"
                style={{ marginBottom: "0 !important" }}
              >
                Lọc nhanh danh sách món ăn
              </h4>
              <div style={{ padding: "10px 0px" }}>
                <span
                  className={`btn btn-outline-info  btn_outline_admin ${
                    status === 1 ? "active" : ""
                  } `}
                  onClick={() => setStatus(1)}
                >
                  Tất Cả
                </span>
                <span
                  className={`btn btn-outline-warning btn_outline_admin ${
                    status === 2 ? "active" : ""
                  } `}
                  onClick={() => setStatus(2)}
                >
                  Quản Lý Tạo
                </span>
                <span
                  className={`btn btn-outline-success btn_outline_admin ${
                    status === 3 ? "active" : ""
                  } `}
                  onClick={() => setStatus(3)}
                >
                  Người Dùng Tạo
                </span>
                <span
                  className={`btn btn-outline-success btn_outline_admin ${
                    status === 4 ? "active" : ""
                  } `}
                  onClick={() => setStatus(4)}
                >
                  Công Khai
                </span>
                <span
                  className={`btn btn-outline-primary btn_outline_admin ${
                    status === 7 ? "active" : ""
                  } `}
                  onClick={() => setStatus(7)}
                >
                  Cho phép Public
                </span>
                <span
                  className={`btn btn-outline-danger btn_outline_admin ${
                    status === 5 ? "active" : ""
                  } `}
                  onClick={() => setStatus(5)}
                >
                  Đang Bị Ẩn
                </span>

                <span
                  className={`btn btn-outline-info btn_outline_admin ${
                    status === 6 ? "active" : ""
                  } `}
                  onClick={() => setStatus(6)}
                >
                  Chưa Có Chi Tiết
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
