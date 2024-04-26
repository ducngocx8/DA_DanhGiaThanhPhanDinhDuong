import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import UserStatistic from "./UserStatistic";
import {
  Title,
  convertToDate,
  convertToDateOnly,
  notify,
} from "../../../Utils/Title";
import { useNavigate } from "react-router-dom";
import { mucTieuURL, mucTieuHomNayURL } from "../../../api";
import ReactPaginate from "react-paginate";
import FormConfirm from "../Admin/Form/FormConfirm";
export default function UserMucTieu({ username }) {
  let [mucTieuInput, setMucTieuInput] = useState({
    muctieu_id: "",
    ENERC: "",
    PROCNT: "",
    FAT: "",
    CHOCDF: "",
    note: "",
    time: "",
  });

  let [mucTieuList, setMucTieuList] = useState([]);
  let [deleteMucTieuStatus, setDeleteMucTieuStatus] = useState(false);
  let [page, setPage] = useState(1);
  const maxShow = 7;

  const handlePageClick = (event) => {
    if (page !== event.selected + 1) setPage(event.selected + 1);
  };

  let navigate = useNavigate();

  useEffect(() => {
    document.title = Title.user_muctieu + Title.origin;
  }, []);

  useEffect(() => {
    const getMucTieuHomNay = async () => {
      const response = await axios.get(`${mucTieuHomNayURL}`, {
        withCredentials: true,
      });
      if (response.data.status) {
        if (response.data.data) {
          const { muctieu_id, ENERC, PROCNT, FAT, CHOCDF, note, time } =
            response.data.data;
          setMucTieuInput({
            muctieu_id,
            ENERC: Number(ENERC) * 1,
            PROCNT: Number(PROCNT) * 1,
            FAT: Number(FAT) * 1,
            CHOCDF: Number(CHOCDF) * 1,
            note,
            time,
          });
        }
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigate("/account/login", { replace: true });
        }
      }
    };

    const handleAPIAll = async () => {
      await Promise.all([Promise.resolve(getMucTieuHomNay())]);
    };
    handleAPIAll();
  }, [navigate]);

  useEffect(() => {
    const getAllMucTieu = async () => {
      const response = await axios.get(`${mucTieuURL}`, {
        withCredentials: true,
      });
      if (response.data.status) {
        setMucTieuList(response.data.data);
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigate("/account/login", { replace: true });
        }
      }
    };

    const handleAPIAll = async () => {
      await Promise.all([Promise.resolve(getAllMucTieu())]);
    };
    handleAPIAll();
  }, [mucTieuInput, navigate]);

  const closeFormConfirm = () => {
    setDeleteMucTieuStatus(false);
  };

  const handleXoaMucTieu = async (muctieu_id) => {
    const response = await axios.delete(`${mucTieuURL + "/" + muctieu_id}`, {
      withCredentials: true,
    });
    notify(response.data.status, response.data.message);
    if (response.data.status) {
      setMucTieuList(response.data.data);
      setDeleteMucTieuStatus(false);
    } else {
      if (response.data.must === "login") {
        return navigate("/account/login", { replace: true });
      }
    }
  };

  const handleChangeMucTieuInput = (e) => {
    let { name, value } = e.target;
    if (name !== "note" && value.trim() !== "") {
      value = Number(value);
    }
    setMucTieuInput({ ...mucTieuInput, [name]: value });
  };

  const updateMucTieuUser = async (muc_tieu) => {
    return await axios
      .post(`${mucTieuURL}`, muc_tieu, {
        withCredentials: true,
      })
      .then((response) => {
        return response.data;
      });
  };

  const handleChangeMucTieuInputSubmit = async () => {
    if (
      mucTieuInput.ENERC === "" ||
      isNaN(Number(mucTieuInput.ENERC)) ||
      Number(mucTieuInput.ENERC) < 0
    ) {
      notify(false, "Năng lượng không hợp lệ.");
    } else if (
      mucTieuInput.PROCNT === "" ||
      isNaN(Number(mucTieuInput.PROCNT)) ||
      Number(mucTieuInput.PROCNT) < 0
    ) {
      notify(false, "Lượng chất đạm (Protein) không hợp lệ.");
    } else if (
      mucTieuInput.FAT === "" ||
      isNaN(Number(mucTieuInput.FAT)) ||
      Number(mucTieuInput.FAT) < 0
    ) {
      notify(false, "Lượng chất béo (FAT) không hợp lệ.");
    } else if (
      mucTieuInput.CHOCDF === "" ||
      isNaN(Number(mucTieuInput.CHOCDF)) ||
      Number(mucTieuInput.CHOCDF) < 0
    ) {
      notify(false, "Lượng Carbohydrate không hợp lệ.");
    } else {
      const muc_tieu = {
        ENERC: Number(mucTieuInput.ENERC),
        PROCNT: Number(mucTieuInput.PROCNT),
        FAT: Number(mucTieuInput.FAT),
        CHOCDF: Number(mucTieuInput.CHOCDF),
        note: mucTieuInput.note,
      };
      const response = await updateMucTieuUser(muc_tieu);
      notify(response.status, response.message);
      if (response.status) {
        setMucTieuInput(response.data);
      } else {
        if (response.must === "login") {
          return navigate("/account/login", { replace: true });
        }
      }
    }
  };

  return (
    <Fragment>
      <div id="main">
        {deleteMucTieuStatus && (
          <div
            className="background_black"
            id="background_black"
            style={{ display: "block" }}
          >
            <FormConfirm
              status={"customer_delete_muctieu"}
              content={
                "Bạn chắc chắn muốn xóa mục tiêu ngày " +
                convertToDateOnly(deleteMucTieuStatus.time)
              }
              id_handle={""}
              closeFormConfirm={closeFormConfirm}
              loadData={() => {
                handleXoaMucTieu(deleteMucTieuStatus.muctieu_id);
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
                          style={{
                            textAlign: "center",
                          }}
                        >
                          Tạo và cập nhật mục tiêu trong ngày
                        </h4>
                        <div
                          className="col-12"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: 20,
                          }}
                        >
                          <div className="col-6">
                            <div id="form_edit_mucTieuInput_submit">
                              <div style={{ marginBottom: 20 }}>
                                <label className="form-label">
                                  Năng lượng (KCal)
                                </label>
                                <input
                                  className="form-control showordisable"
                                  name="ENERC"
                                  defaultValue={mucTieuInput.ENERC}
                                  type="number"
                                  placeholder="Nhập năng lượng"
                                  onInput={(e) => handleChangeMucTieuInput(e)}
                                />
                              </div>
                              <div style={{ marginBottom: 20 }}>
                                <label className="form-label">
                                  Chất đạm (g)
                                </label>
                                <input
                                  className="form-control showordisable"
                                  name="PROCNT"
                                  defaultValue={mucTieuInput.PROCNT}
                                  type="number"
                                  placeholder="Nhập lượng chất đạm"
                                  onInput={(e) => handleChangeMucTieuInput(e)}
                                />
                              </div>
                              <div style={{ marginBottom: 20 }}>
                                <label className="form-label">
                                  Chất béo (g)
                                </label>
                                <input
                                  className="form-control showordisable"
                                  name="FAT"
                                  defaultValue={mucTieuInput.FAT}
                                  type="number"
                                  placeholder="Nhập lượng chất béo"
                                  onInput={(e) => handleChangeMucTieuInput(e)}
                                />
                              </div>
                              <div style={{ marginBottom: 20 }}>
                                <label className="form-label">
                                  Carbohydrate (g)
                                </label>
                                <input
                                  className="form-control showordisable"
                                  name="CHOCDF"
                                  defaultValue={mucTieuInput.CHOCDF}
                                  type="number"
                                  placeholder="Nhập lượng Carbohydrate"
                                  onInput={(e) => handleChangeMucTieuInput(e)}
                                />
                              </div>
                              <div style={{ marginBottom: 20 }}>
                                <label className="form-label">
                                  Ghi chú (Nếu có)
                                </label>
                                <input
                                  className="form-control showordisable"
                                  name="note"
                                  defaultValue={mucTieuInput.note}
                                  type="text"
                                  placeholder="Nhập ghi chú"
                                  onInput={(e) => handleChangeMucTieuInput(e)}
                                />
                              </div>
                              <div
                                style={{
                                  marginBottom: 20,
                                  textAlign: "center",
                                }}
                              >
                                <button
                                  type="button"
                                  id="btn_edit_mucTieuInput"
                                  className="btn btn-success"
                                  onClick={() =>
                                    handleChangeMucTieuInputSubmit()
                                  }
                                >
                                  {mucTieuInput.muctieu_id
                                    ? "Cập nhật mục tiêu"
                                    : "Tạo mục tiêu"}
                                </button>
                              </div>
                              <p style={{ textAlign: "center" }}>
                                (Cập nhật lần cuối:{" "}
                                {mucTieuInput?.time
                                  ? convertToDate(mucTieuInput?.time)
                                  : "Chưa cập nhật"}
                                )
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="table-responsive pt-3">
                          <table className="table table-bordered text-center">
                            <thead>
                              <tr>
                                <th>Mục tiêu ID</th>
                                <th>Năng lượng (KCal)</th>
                                <th>Protein (g)</th>
                                <th>Chất béo (g)</th>
                                <th>Carbohydrate (g)</th>
                                <th>Ghi chú</th>
                                <th>Thời gian</th>
                                <th>Cập nhật</th>
                              </tr>
                            </thead>
                            <tbody>
                              {mucTieuList.map((muc_tieu, index) => {
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
                                        {muc_tieu.muctieu_id}
                                      </td>
                                      <td
                                        style={{
                                          color: "#007bff",
                                          fontWeight: 700,
                                        }}
                                      >
                                        {muc_tieu.ENERC}
                                      </td>
                                      <td
                                        style={{
                                          color: "#007bff",
                                          fontWeight: 700,
                                        }}
                                      >
                                        {muc_tieu.PROCNT}
                                      </td>
                                      {muc_tieu.FAT !== "" ? (
                                        <td
                                          style={{
                                            color: "#007bff",
                                            fontWeight: 700,
                                          }}
                                        >
                                          {muc_tieu.FAT}
                                        </td>
                                      ) : (
                                        <td
                                          style={{
                                            color: "#ffc107",
                                            fontWeight: 700,
                                          }}
                                        >
                                          Chưa cập nhật
                                        </td>
                                      )}
                                      <td
                                        style={{
                                          color: "#007bff",
                                          fontWeight: 700,
                                        }}
                                      >
                                        {muc_tieu.CHOCDF}
                                      </td>
                                      <td
                                        style={{
                                          color: "#28a745",
                                          fontWeight: 700,
                                        }}
                                      >
                                        {muc_tieu.note}
                                      </td>
                                      <td
                                        style={{
                                          color: "#28a745",
                                          fontWeight: 700,
                                        }}
                                      >
                                        {convertToDateOnly(muc_tieu.time)}
                                      </td>

                                      <td>
                                        <button
                                          type="button"
                                          className="btn btn-warning m-1 btn_edit"
                                          onClick={() => {
                                            setDeleteMucTieuStatus(muc_tieu);
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
                          <div>Tổng số: {mucTieuList.length}</div>
                          <ReactPaginate
                            breakLabel="..."
                            nextLabel="Next"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={2}
                            pageCount={
                              mucTieuList.length <= maxShow
                                ? 1
                                : mucTieuList.length % maxShow === 0
                                ? Math.floor(mucTieuList / maxShow)
                                : Math.floor(mucTieuList / maxShow) + 1
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
    </Fragment>
  );
}
