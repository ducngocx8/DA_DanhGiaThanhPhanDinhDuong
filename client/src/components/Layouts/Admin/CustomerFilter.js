import React from "react";

export default function CustomerFilter({ setStatus, status }) {
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
                Lọc nhanh danh sách người dùng
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
                  className={`btn btn-outline-success btn_outline_admin ${
                    status === 2 ? "active" : ""
                  } `}
                  onClick={() => setStatus(2)}
                >
                  Đang hoạt động
                </span>
                <span
                  className={`btn btn-outline-danger btn_outline_admin ${
                    status === 3 ? "active" : ""
                  } `}
                  onClick={() => setStatus(3)}
                >
                  Tạm khóa
                </span>
                <span
                  className={`btn btn-outline-info btn_outline_admin ${
                    status === 4 ? "active" : ""
                  } `}
                  onClick={() => setStatus(4)}
                >
                  Chưa kích hoạt
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
