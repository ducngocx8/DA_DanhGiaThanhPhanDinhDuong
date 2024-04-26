import React, { Fragment, useEffect, useState } from "react";
import {
  DoiTuongURL,
  LaoDongURL,
  NhomTuoiURL,
  NhuCauDinhDuongURL,
} from "../../../api";
import axios from "axios";
import { notify } from "../../../Utils/Title";
import RenderNhomThucPham from "../Product/RenderNhomThucPham";
export default function NhuCauDinhDuongLayout() {
  const [laoDongList, setLaoDongList] = useState([]);
  const [nhomTuoiList, setNhomTuoiList] = useState([]);
  const [doiTuongList, setDoiTuongList] = useState([]);
  const [laoDongChoose, setLaoDongChoose] = useState(-1);
  const [doiTuongChoose, setDoiTuongChoose] = useState(-1);
  const [nhomTuoiChoose, setNhomTuoiChoose] = useState(-1);
  const [nhuCauDinhDuongOB, setNhuCauDinhDuongOB] = useState(null);

  useEffect(() => {
    const getAllNhomTuoi = async () => {
      const response = await axios.get(`${NhomTuoiURL}`);
      if (response.data.status) {
        setNhomTuoiList(response.data.data);
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

    const getAllLaoDong = async () => {
      const response = await axios.get(`${LaoDongURL}`);
      if (response.data.status) {
        setLaoDongList(response.data.data);
      } else {
        notify(false, response.data.message);
      }
    };

    const getAll = async () => {
      await Promise.all([
        Promise.resolve(getAllDoiTuong()),
        Promise.resolve(getAllLaoDong()),
        Promise.resolve(getAllNhomTuoi()),
      ]);
    };
    getAll();
  }, []);

  const handleTraCuuNhuCau = async () => {
    if (Number(doiTuongChoose) === -1) {
      notify(false, "Vui lòng chọn đối tượng.");
      return;
    }
    if (Number(nhomTuoiChoose) === -1) {
      notify(false, "Vui lòng chọn nhóm tuổi.");
      return;
    }
    if (Number(laoDongChoose) === -1) {
      notify(false, "Vui lòng chọn lao động.");
      return;
    }
    const response = await axios.get(
      `${
        NhuCauDinhDuongURL +
        "/doi-tuong?id_doituong=" +
        doiTuongChoose +
        "&id_nhomtuoi=" +
        nhomTuoiChoose +
        "&id_laodong=" +
        laoDongChoose
      }`
    );
    setNhuCauDinhDuongOB(response.data);
  };

  return (
    <div className="favorite_book_list flex_center mg-10_0">
      <div
        className="_1200px bg-white pd-10"
        style={{ display: "flex", minHeight: "85vh" }}
      >
        {/* Flex 3 */}
        <div style={{ flex: 3 }}>
          <div
            className="favorite_book_list_icon_title"
            style={{ padding: "5px 0px", borderBottom: "1px solid #007bff" }}
          >
            <img
              src={"./icons/data_thucpham.png"}
              className="icon_sach"
              alt={"icon_du_lieu_thuc_pham"}
            />
            <span className="favorite_book_list_title mg-l-10">
              Nhu cầu dinh dưỡng khuyến nghị
            </span>
          </div>
          <div className="favorite_book_item mg-10_0">
            {/* Content */}
            <p>
              Chọn đối tượng, nhóm tuổi, mức độ lao động rồi nhấn "
              <b>Tra cứu</b>"
            </p>
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    width: "30%",
                  }}
                >
                  <label className="form-label">Đối tượng</label>
                  <select
                    onChange={(e) => {
                      setDoiTuongChoose(e.target.value);
                    }}
                    name="id_doituong"
                    className="form-select"
                    value={doiTuongChoose}
                  >
                    <option value={-1}>Chọn đối tượng</option>
                    {doiTuongList.map((item, index) => {
                      return (
                        <option key={index} value={item.id_doituong}>
                          {item.TenDoiTuong}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div
                  style={{
                    width: "30%",
                  }}
                >
                  <label className="form-label">Nhóm tuổi</label>
                  <select
                    onChange={(e) => {
                      setNhomTuoiChoose(e.target.value);
                    }}
                    name="id_nhomtuoi"
                    className="form-select"
                    value={nhomTuoiChoose}
                  >
                    <option value={-1}>Chọn nhóm tuổi</option>
                    {nhomTuoiList.map((item, index) => {
                      return (
                        <option key={index} value={item.id_nhomtuoi}>
                          {item.TenNhomTuoi}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div
                  style={{
                    width: "30%",
                  }}
                >
                  <label className="form-label">Mức độ lao động</label>
                  <select
                    onChange={(e) => {
                      setLaoDongChoose(e.target.value);
                    }}
                    name="id_laodong"
                    className="form-select"
                    value={laoDongChoose}
                  >
                    <option value={-1}>Chọn mức độ lao động</option>
                    {laoDongList.map((item, index) => {
                      return (
                        <option key={index} value={item.id_laodong}>
                          {item.TenLaoDong}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div
                style={{
                  marginTop: 10,
                  textAlign: "center",
                }}
              >
                <button
                  onClick={() => {
                    handleTraCuuNhuCau();
                  }}
                  style={{
                    whiteSpace: "nowrap",
                    marginLeft: 10,
                    marginTop: 0,
                  }}
                  className="btn_buynow"
                >
                  Tra cứu
                </button>
              </div>
            </div>

            {nhuCauDinhDuongOB && nhuCauDinhDuongOB.status && (
              <Fragment>
                <div
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      color: "#333399",
                    }}
                  >
                    Đối tượng là
                    <span
                      style={{
                        color: "#b30086",
                      }}
                    >
                      {" " +
                        nhuCauDinhDuongOB.data.DoiTuong.TenDoiTuong +
                        ", nhóm tuổi từ " +
                        nhuCauDinhDuongOB.data.NhomTuoi.TenNhomTuoi +
                        " với mức độ " +
                        nhuCauDinhDuongOB.data.LaoDong.TenLaoDong}
                    </span>
                  </div>
                  <div>
                    (Bảng khuyến nghị mức tiêu thụ dinh dưỡng theo đối tượng)
                  </div>
                </div>

                {/* Table */}
                <div className="table-responsive pt-1">
                  <table className="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th>Nhu cầu</th>
                        <th>Mức tiêu thụ</th>
                        <th>Nhu cầu</th>
                        <th>Mức tiêu thụ</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="table-white">
                        <td
                          style={{
                            color: "#007bff",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Năng lượng
                        </td>
                        <td>
                          {nhuCauDinhDuongOB.data.ThanhPhanNhuCau.NangLuong ||
                            "-"}
                        </td>
                        <td
                          style={{
                            color: "#007bff",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Protein
                        </td>
                        <td>
                          {nhuCauDinhDuongOB.data.ThanhPhanNhuCau.Protein ||
                            "-"}
                        </td>
                      </tr>
                      <tr className="table-white">
                        <td
                          style={{
                            color: "#007bff",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Lipid
                        </td>
                        <td>
                          {nhuCauDinhDuongOB.data.ThanhPhanNhuCau.Lipid || "-"}
                        </td>
                        <td
                          style={{
                            color: "#007bff",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Glucid
                        </td>
                        <td>
                          {nhuCauDinhDuongOB.data.ThanhPhanNhuCau.Glucid || "-"}
                        </td>
                      </tr>
                      <tr className="table-white">
                        <td
                          style={{
                            color: "#007bff",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Chất xơ
                        </td>
                        <td>
                          {nhuCauDinhDuongOB.data.ThanhPhanNhuCau.Xo || "-"}
                        </td>
                        <td
                          style={{
                            color: "#007bff",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Canxi
                        </td>
                        <td>
                          {nhuCauDinhDuongOB.data.ThanhPhanNhuCau.CanXi || "-"}
                        </td>
                      </tr>
                      <tr className="table-white">
                        <td
                          style={{
                            color: "#007bff",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Phospho
                        </td>
                        <td>
                          {nhuCauDinhDuongOB.data.ThanhPhanNhuCau.Phospho ||
                            "-"}
                        </td>
                        <td
                          style={{
                            color: "#007bff",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Magie
                        </td>
                        <td>
                          {nhuCauDinhDuongOB.data.ThanhPhanNhuCau.Magie || "-"}
                        </td>
                      </tr>
                      <tr className="table-white">
                        <td
                          style={{
                            color: "#007bff",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Muối Iot
                        </td>
                        <td>
                          {nhuCauDinhDuongOB.data.ThanhPhanNhuCau.Iod || "-"}
                        </td>
                        <td
                          style={{
                            color: "#007bff",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Đồng
                        </td>
                        <td>
                          {nhuCauDinhDuongOB.data.ThanhPhanNhuCau.Cu || "-"}
                        </td>
                      </tr>
                      <tr className="table-white">
                        <td
                          style={{
                            color: "#007bff",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Mangan
                        </td>
                        <td>
                          {nhuCauDinhDuongOB.data.ThanhPhanNhuCau.Mangan || "-"}
                        </td>
                        <td
                          style={{
                            color: "#007bff",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Fluo
                        </td>
                        <td>
                          {nhuCauDinhDuongOB.data.ThanhPhanNhuCau.Fluo || "-"}
                        </td>
                      </tr>
                      <tr className="table-white">
                        <td
                          style={{
                            color: "#007bff",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Sắt
                        </td>
                        <td>
                          {nhuCauDinhDuongOB.data.ThanhPhanNhuCau.Fe || "-"}
                        </td>
                        <td
                          style={{
                            color: "#007bff",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Kẽm
                        </td>
                        <td>
                          {nhuCauDinhDuongOB.data.ThanhPhanNhuCau.Zn || "-"}
                        </td>
                      </tr>
                      <tr className="table-white">
                        <td
                          style={{
                            color: "#007bff",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Selen
                        </td>
                        <td>
                          {nhuCauDinhDuongOB.data.ThanhPhanNhuCau.Selen || "-"}
                        </td>
                        <td
                          style={{
                            color: "#007bff",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Crom
                        </td>
                        <td>
                          {nhuCauDinhDuongOB.data.ThanhPhanNhuCau.Crom || "-"}
                        </td>
                      </tr>
                      <tr className="table-white">
                        <td
                          style={{
                            color: "#007bff",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Vitamin A
                        </td>
                        <td>
                          {nhuCauDinhDuongOB.data.ThanhPhanNhuCau.VitaminA ||
                            "-"}
                        </td>
                        <td
                          style={{
                            color: "#007bff",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Vitamin E
                        </td>
                        <td>
                          {nhuCauDinhDuongOB.data.ThanhPhanNhuCau.VitaminE ||
                            "-"}
                        </td>
                      </tr>
                      <tr className="table-white">
                        <td
                          style={{
                            color: "#007bff",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Vitamin K
                        </td>
                        <td>
                          {nhuCauDinhDuongOB.data.ThanhPhanNhuCau.VitaminK ||
                            "-"}
                        </td>
                        <td
                          style={{
                            color: "#007bff",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Vitamin D
                        </td>
                        <td>
                          {nhuCauDinhDuongOB.data.ThanhPhanNhuCau.VitaminD ||
                            "-"}
                        </td>
                      </tr>
                      <tr className="table-white">
                        <td
                          style={{
                            color: "#007bff",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Vitamin B1
                        </td>
                        <td>
                          {nhuCauDinhDuongOB.data.ThanhPhanNhuCau.VitaminB1 ||
                            "-"}
                        </td>
                        <td
                          style={{
                            color: "#007bff",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Vitamin B2
                        </td>
                        <td>
                          {nhuCauDinhDuongOB.data.ThanhPhanNhuCau.VitaminB2 ||
                            "-"}
                        </td>
                      </tr>
                      <tr className="table-white">
                        <td
                          style={{
                            color: "#007bff",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Niacin
                        </td>
                        <td>
                          {nhuCauDinhDuongOB.data.ThanhPhanNhuCau.Niacin || "-"}
                        </td>
                        <td
                          style={{
                            color: "#007bff",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Pantothenic
                        </td>
                        <td>
                          {nhuCauDinhDuongOB.data.ThanhPhanNhuCau.Pantothenic ||
                            "-"}
                        </td>
                      </tr>
                      <tr className="table-white">
                        <td
                          style={{
                            color: "#007bff",
                            whiteSpace: "nowrap",
                          }}
                        >
                          VitaminB6
                        </td>
                        <td>
                          {nhuCauDinhDuongOB.data.ThanhPhanNhuCau.VitaminB6 ||
                            "-"}
                        </td>
                        <td
                          style={{
                            color: "#007bff",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Folate
                        </td>
                        <td>
                          {nhuCauDinhDuongOB.data.ThanhPhanNhuCau.Folate || "-"}
                        </td>
                      </tr>
                      <tr className="table-white">
                        <td
                          style={{
                            color: "#007bff",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Vitamin B12
                        </td>
                        <td>
                          {nhuCauDinhDuongOB.data.ThanhPhanNhuCau.B12 || "-"}
                        </td>
                        <td
                          style={{
                            color: "#007bff",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Bitotin
                        </td>
                        <td>
                          {nhuCauDinhDuongOB.data.ThanhPhanNhuCau.Bitotin ||
                            "-"}
                        </td>
                      </tr>
                      <tr className="table-white">
                        <td
                          style={{
                            color: "#007bff",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Vitamin C
                        </td>
                        <td>
                          {nhuCauDinhDuongOB.data.ThanhPhanNhuCau.VitaminC ||
                            "-"}
                        </td>
                        <td
                          style={{
                            color: "#007bff",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Choline
                        </td>
                        <td>
                          {nhuCauDinhDuongOB.data.ThanhPhanNhuCau.Choline ||
                            "-"}
                        </td>
                      </tr>
                      <tr className="table-white">
                        <td
                          style={{
                            color: "#007bff",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Natri
                        </td>
                        <td>
                          {nhuCauDinhDuongOB.data.ThanhPhanNhuCau.NaMuoi || "-"}
                        </td>
                        <td
                          style={{
                            color: "#007bff",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Kali
                        </td>
                        <td>
                          {nhuCauDinhDuongOB.data.ThanhPhanNhuCau.Kali || "-"}
                        </td>
                      </tr>
                      <tr className="table-white">
                        <td
                          style={{
                            color: "#007bff",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Clo
                        </td>
                        <td>
                          {nhuCauDinhDuongOB.data.ThanhPhanNhuCau.Clo || "-"}
                        </td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* Kết thúc Table */}
              </Fragment>
            )}
            {nhuCauDinhDuongOB && !nhuCauDinhDuongOB.status && (
              <p
                style={{
                  textAlign: "center",
                }}
              >
                {nhuCauDinhDuongOB.message + "."}
              </p>
            )}
          </div>
        </div>
        {/* FLEX 1 */}
        <div
          style={{
            flex: 1,
            marginLeft: 20,
          }}
        >
          {/* Right */}
          <div
            className="category_title bg-primary color-white"
            style={{
              padding: "5px 10px",
            }}
          >
            Nhóm thực phẩm
          </div>
          <RenderNhomThucPham />
        </div>
      </div>
    </div>
  );
}
