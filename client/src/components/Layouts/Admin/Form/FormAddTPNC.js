import React, { useState } from "react";
import axios from "axios";
import { notify } from "../../../../Utils/Title";
import { useNavigate } from "react-router-dom";
import { ThanhPhanNhuCauAdminURL } from "../../../../api/Admin";
export default function FormAddTPNC({
  status,
  closeFormConfirm,
  loadData,
  itemChoose,
  setPage,
  params,
}) {
  let [inputTPNC, setInputTPNC] = useState({
    DienGiai: itemChoose ? itemChoose.DienGiai : "",
    NangLuong: itemChoose ? itemChoose.NangLuong : "",
    Protein: itemChoose ? itemChoose.Protein : "",
    Lipid: itemChoose ? itemChoose.Lipid : "",
    Glucid: itemChoose ? itemChoose.Glucid : "",
    Xo: itemChoose ? itemChoose.Xo : "",
    CanXi: itemChoose ? itemChoose.CanXi : "",
    Phospho: itemChoose ? itemChoose.Phospho : "",
    Magie: itemChoose ? itemChoose.Magie : "",
    Iod: itemChoose ? itemChoose.Iod : "",
    Cu: itemChoose ? itemChoose.Cu : "",
    Mangan: itemChoose ? itemChoose.Mangan : "",
    Fluo: itemChoose ? itemChoose.Fluo : "",
    Fe: itemChoose ? itemChoose.Fe : "",
    Zn: itemChoose ? itemChoose.Zn : "",
    Selen: itemChoose ? itemChoose.Selen : "",
    Crom: itemChoose ? itemChoose.Crom : "",
    VitaminA: itemChoose ? itemChoose.VitaminA : "",
    VitaminE: itemChoose ? itemChoose.VitaminE : "",
    VitaminK: itemChoose ? itemChoose.VitaminK : "",
    VitaminD: itemChoose ? itemChoose.VitaminD : "",
    VitaminB1: itemChoose ? itemChoose.VitaminB1 : "",
    VitaminB2: itemChoose ? itemChoose.VitaminB2 : "",
    Niacin: itemChoose ? itemChoose.Niacin : "",
    Pantothenic: itemChoose ? itemChoose.Pantothenic : "",
    VitaminB6: itemChoose ? itemChoose.VitaminB6 : "",
    Folate: itemChoose ? itemChoose.Folate : "",
    B12: itemChoose ? itemChoose.B12 : "",
    Bitotin: itemChoose ? itemChoose.Bitotin : "",
    VitaminC: itemChoose ? itemChoose.VitaminC : "",
    Choline: itemChoose ? itemChoose.Choline : "",
    NaMuoi: itemChoose ? itemChoose.NaMuoi : "",
    Kali: itemChoose ? itemChoose.Kali : "",
    Clo: itemChoose ? itemChoose.Clo : "",
  });
  let navigate = useNavigate();
  const handleEvent = async () => {
    if (status === "admin_edit_tpnc") {
      const new_item = {
        DienGiai: inputTPNC.DienGiai,
        NangLuong: inputTPNC.NangLuong,
        Protein: inputTPNC.Protein,
        Lipid: inputTPNC.Lipid,
        Glucid: inputTPNC.Glucid,
        Xo: inputTPNC.Xo,
        CanXi: inputTPNC.CanXi,
        Phospho: inputTPNC.Phospho,
        Magie: inputTPNC.Magie,
        Iod: inputTPNC.Iod,
        Cu: inputTPNC.Cu,
        Mangan: inputTPNC.Mangan,
        Fluo: inputTPNC.Fluo,
        Fe: inputTPNC.Fe,
        Zn: inputTPNC.Zn,
        Selen: inputTPNC.Selen,
        Crom: inputTPNC.Crom,
        VitaminA: inputTPNC.VitaminA,
        VitaminE: inputTPNC.VitaminE,
        VitaminK: inputTPNC.VitaminK,
        VitaminD: inputTPNC.VitaminD,
        VitaminB1: inputTPNC.VitaminB1,
        VitaminB2: inputTPNC.VitaminB2,
        Niacin: inputTPNC.Niacin,
        Pantothenic: inputTPNC.Pantothenic,
        VitaminB6: inputTPNC.VitaminB6,
        Folate: inputTPNC.Folate,
        B12: inputTPNC.B12,
        Bitotin: inputTPNC.Bitotin,
        VitaminC: inputTPNC.VitaminC,
        Choline: inputTPNC.Choline,
        NaMuoi: inputTPNC.NaMuoi,
        Kali: inputTPNC.Kali,
        Clo: inputTPNC.Clo,
      };
      console.log(new_item);
      const response = await axios.put(
        `${ThanhPhanNhuCauAdminURL + "/" + itemChoose.id_nhucau}${params}`,
        new_item,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        notify(true, response.data.message);
        loadData(response.data.data);
        if (response.data.page) {
          setPage(response.data.page);
        }
        closeFormConfirm();
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigate("/account/login", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    } else if (status === "admin_add_tpnc") {
      const new_item = {
        DienGiai: inputTPNC.DienGiai,
        NangLuong: inputTPNC.NangLuong,
        Protein: inputTPNC.Protein,
        Lipid: inputTPNC.Lipid,
        Glucid: inputTPNC.Glucid,
        Xo: inputTPNC.Xo,
        CanXi: inputTPNC.CanXi,
        Phospho: inputTPNC.Phospho,
        Magie: inputTPNC.Magie,
        Iod: inputTPNC.Iod,
        Cu: inputTPNC.Cu,
        Mangan: inputTPNC.Mangan,
        Fluo: inputTPNC.Fluo,
        Fe: inputTPNC.Fe,
        Zn: inputTPNC.Zn,
        Selen: inputTPNC.Selen,
        Crom: inputTPNC.Crom,
        VitaminA: inputTPNC.VitaminA,
        VitaminE: inputTPNC.VitaminE,
        VitaminK: inputTPNC.VitaminK,
        VitaminD: inputTPNC.VitaminD,
        VitaminB1: inputTPNC.VitaminB1,
        VitaminB2: inputTPNC.VitaminB2,
        Niacin: inputTPNC.Niacin,
        Pantothenic: inputTPNC.Pantothenic,
        VitaminB6: inputTPNC.VitaminB6,
        Folate: inputTPNC.Folate,
        B12: inputTPNC.B12,
        Bitotin: inputTPNC.Bitotin,
        VitaminC: inputTPNC.VitaminC,
        Choline: inputTPNC.Choline,
        NaMuoi: inputTPNC.NaMuoi,
        Kali: inputTPNC.Kali,
        Clo: inputTPNC.Clo,
      };
      const response = await axios.post(
        `${ThanhPhanNhuCauAdminURL}${params}`,
        new_item,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        notify(true, response.data.message);
        loadData(response.data.data);
        if (response.data.page) {
          setPage(response.data.page);
        }
        closeFormConfirm();
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    }
  };

  const handleCloseEvent = () => {
    closeFormConfirm();
  };

  const handleChangeValueTPNC = (e) => {
    const { name, value } = e.target;
    setInputTPNC({ ...inputTPNC, [name]: value });
  };

  return (
    <div className=" remove_customer_class bg-white">
      <div
        className="confirm_header text-white bg-primary"
        style={{
          padding: 10,
          fontWeight: 700,
          display: "flex",
          justifyContent: "space-between",
          width: "55vw",
        }}
      >
        <div>
          <i className="fas fa-check-circle" style={{ color: "#47f764" }} />
          <span style={{ marginLeft: 3 }}>
            {status === "admin_add_tpnc"
              ? "Thêm Thành Phần Nhu Cầu"
              : "Cập Nhật Thành Phần Nhu Cầu"}
          </span>
        </div>
        <i
          onClick={() => closeFormConfirm()}
          className="far fa-times-circle btn_close_form"
          style={{ color: "white", fontSize: 25 }}
        />
      </div>
      <div
        className="confirm_content"
        id="style-14"
        style={{
          padding: 10,
          textAlign: "center",
          display: "flex",
          justifyContent: "space-between",
          overflow: "auto",
          height: "50vh",
        }}
      >
        <div
          className="input_tpnc"
          style={{ flex: 1, marginRight: 10, fontSize: 11 }}
        >
          <div style={{ textAlign: "left" }}>
            <label className="form-label">Diễn giải:</label>
            <textarea
              className="form-control showordisable"
              placeholder="Diễn giải"
              type="text"
              name="DienGiai"
              defaultValue={inputTPNC.DienGiai}
              onInput={(e) => handleChangeValueTPNC(e)}
              rows={1}
            ></textarea>
          </div>
          <div style={{ textAlign: "left", marginTop: 5 }}>
            <label className="form-label">Năng lượng:</label>
            <textarea
              className="form-control showordisable"
              placeholder="Năng lượng"
              type="text"
              defaultValue={inputTPNC.NangLuong}
              name="NangLuong"
              rows={1}
              onInput={(e) => handleChangeValueTPNC(e)}
            ></textarea>
          </div>

          <div style={{ textAlign: "left", marginTop: 5 }}>
            <label className="form-label">Protein:</label>
            <textarea
              className="form-control showordisable"
              placeholder="Protein"
              type="text"
              defaultValue={inputTPNC.Protein}
              name="Protein"
              rows={1}
              onInput={(e) => handleChangeValueTPNC(e)}
            ></textarea>
          </div>

          <div style={{ textAlign: "left", marginTop: 5 }}>
            <label className="form-label">Lipid:</label>
            <textarea
              className="form-control showordisable"
              placeholder="Lipid"
              defaultValue={inputTPNC.Lipid}
              name="Lipid"
              rows={1}
              onInput={(e) => handleChangeValueTPNC(e)}
            ></textarea>
          </div>

          <div style={{ textAlign: "left", marginTop: 5 }}>
            <label className="form-label">Glucid:</label>
            <textarea
              className="form-control showordisable"
              placeholder="Glucid"
              type="text"
              defaultValue={inputTPNC.Glucid}
              name="Glucid"
              rows={1}
              onInput={(e) => handleChangeValueTPNC(e)}
            ></textarea>
          </div>

          <div style={{ textAlign: "left", marginTop: 5 }}>
            <label className="form-label">Chất xơ:</label>
            <textarea
              className="form-control showordisable"
              placeholder="Chất xơ"
              type="text"
              defaultValue={inputTPNC.Xo}
              name="Xo"
              rows={1}
              onInput={(e) => handleChangeValueTPNC(e)}
            ></textarea>
          </div>

          <div style={{ textAlign: "left", marginTop: 5 }}>
            <label className="form-label">CanXi:</label>
            <textarea
              className="form-control showordisable"
              placeholder="CanXi"
              type="text"
              defaultValue={inputTPNC.CanXi}
              name="CanXi"
              rows={1}
              onInput={(e) => handleChangeValueTPNC(e)}
            ></textarea>
          </div>

          <div style={{ textAlign: "left", marginTop: 5 }}>
            <label className="form-label">Phospho:</label>
            <textarea
              className="form-control showordisable"
              placeholder="Phospho"
              type="text"
              defaultValue={inputTPNC.Phospho}
              name="Phospho"
              rows={1}
              onInput={(e) => handleChangeValueTPNC(e)}
            ></textarea>
          </div>

          <div style={{ textAlign: "left", marginTop: 5 }}>
            <label className="form-label">Magie:</label>
            <textarea
              className="form-control showordisable"
              placeholder="Magie"
              type="text"
              defaultValue={inputTPNC.Magie}
              name="Magie"
              rows={1}
              onInput={(e) => handleChangeValueTPNC(e)}
            ></textarea>
          </div>

          <div style={{ textAlign: "left", marginTop: 5 }}>
            <label className="form-label">Iod:</label>
            <textarea
              className="form-control showordisable"
              placeholder="Iod"
              type="text"
              defaultValue={inputTPNC.Iod}
              name="Iod"
              rows={1}
              onInput={(e) => handleChangeValueTPNC(e)}
            ></textarea>
          </div>

          <div style={{ textAlign: "left", marginTop: 5 }}>
            <label className="form-label">Cu:</label>
            <textarea
              className="form-control showordisable"
              placeholder="Cu"
              type="text"
              defaultValue={inputTPNC.Cu}
              name="Cu"
              rows={1}
              onInput={(e) => handleChangeValueTPNC(e)}
            ></textarea>
          </div>

          <div style={{ textAlign: "left", marginTop: 5 }}>
            <label className="form-label">Mangan:</label>
            <textarea
              className="form-control showordisable"
              placeholder="Mangan"
              type="text"
              defaultValue={inputTPNC.Mangan}
              name="Mangan"
              rows={1}
              onInput={(e) => handleChangeValueTPNC(e)}
            ></textarea>
          </div>
        </div>

        <div
          className="input_tpnc"
          style={{ flex: 1, marginLeft: 10, fontSize: 11 }}
        >
          <div style={{ textAlign: "left" }}>
            <label className="form-label">Fluo:</label>
            <textarea
              className="form-control showordisable"
              placeholder="Fluo"
              type="text"
              defaultValue={inputTPNC.Fluo}
              name="Fluo"
              rows={1}
              onInput={(e) => handleChangeValueTPNC(e)}
            ></textarea>
          </div>

          <div style={{ textAlign: "left", marginTop: 5 }}>
            <label className="form-label">Fe:</label>
            <textarea
              className="form-control showordisable"
              placeholder="Fe"
              type="text"
              defaultValue={inputTPNC.Fe}
              name="Fe"
              rows={1}
              onInput={(e) => handleChangeValueTPNC(e)}
            ></textarea>
          </div>

          <div style={{ textAlign: "left", marginTop: 5 }}>
            <label className="form-label">Zn:</label>
            <textarea
              className="form-control showordisable"
              placeholder="Zn"
              type="text"
              defaultValue={inputTPNC.Zn}
              name="Zn"
              rows={1}
              onInput={(e) => handleChangeValueTPNC(e)}
            ></textarea>
          </div>

          <div style={{ textAlign: "left", marginTop: 5 }}>
            <label className="form-label">Selen:</label>
            <textarea
              className="form-control showordisable"
              placeholder="Selen"
              type="text"
              defaultValue={inputTPNC.Selen}
              name="Selen"
              rows={1}
              onInput={(e) => handleChangeValueTPNC(e)}
            ></textarea>
          </div>

          <div style={{ textAlign: "left", marginTop: 5 }}>
            <label className="form-label">Crom:</label>
            <textarea
              className="form-control showordisable"
              placeholder="Crom"
              type="text"
              defaultValue={inputTPNC.Crom}
              name="Crom"
              rows={1}
              onInput={(e) => handleChangeValueTPNC(e)}
            ></textarea>
          </div>

          <div style={{ textAlign: "left", marginTop: 5 }}>
            <label className="form-label">Vitamin A:</label>
            <textarea
              className="form-control showordisable"
              placeholder="VitaminA"
              type="text"
              defaultValue={inputTPNC.VitaminA}
              name="VitaminA"
              rows={1}
              onInput={(e) => handleChangeValueTPNC(e)}
            ></textarea>
          </div>

          <div style={{ textAlign: "left", marginTop: 5 }}>
            <label className="form-label">Vitamin E:</label>
            <textarea
              className="form-control showordisable"
              placeholder="VitaminE"
              type="text"
              defaultValue={inputTPNC.VitaminE}
              name="VitaminE"
              rows={1}
              onInput={(e) => handleChangeValueTPNC(e)}
            ></textarea>
          </div>

          <div style={{ textAlign: "left", marginTop: 5 }}>
            <label className="form-label">Vitamin K:</label>
            <textarea
              className="form-control showordisable"
              placeholder="VitaminK"
              type="text"
              defaultValue={inputTPNC.VitaminK}
              name="VitaminK"
              rows={1}
              onInput={(e) => handleChangeValueTPNC(e)}
            ></textarea>
          </div>

          <div style={{ textAlign: "left", marginTop: 5 }}>
            <label className="form-label">Vitamin D:</label>
            <textarea
              className="form-control showordisable"
              placeholder="VitaminD"
              type="text"
              defaultValue={inputTPNC.VitaminD}
              name="VitaminD"
              rows={1}
              onInput={(e) => handleChangeValueTPNC(e)}
            ></textarea>
          </div>

          <div style={{ textAlign: "left", marginTop: 5 }}>
            <label className="form-label">Vitamin B1:</label>
            <textarea
              className="form-control showordisable"
              placeholder="VitaminB1"
              type="text"
              defaultValue={inputTPNC.VitaminB1}
              name="VitaminB1"
              rows={1}
              onInput={(e) => handleChangeValueTPNC(e)}
            ></textarea>
          </div>

          <div style={{ textAlign: "left", marginTop: 5 }}>
            <label className="form-label">Vitamin B2:</label>
            <textarea
              className="form-control showordisable"
              placeholder="VitaminB2"
              type="text"
              defaultValue={inputTPNC.VitaminB2}
              name="VitaminB2"
              rows={1}
              onInput={(e) => handleChangeValueTPNC(e)}
            ></textarea>
          </div>

          <div style={{ textAlign: "left", marginTop: 5 }}>
            <label className="form-label">Niacin:</label>
            <textarea
              className="form-control showordisable"
              placeholder="Niacin"
              type="text"
              defaultValue={inputTPNC.Niacin}
              name="Niacin"
              rows={1}
              onInput={(e) => handleChangeValueTPNC(e)}
            ></textarea>
          </div>
        </div>

        <div
          className="input_tpnc"
          style={{ flex: 1, marginLeft: 20, fontSize: 11 }}
        >
          <div style={{ textAlign: "left" }}>
            <label className="form-label">Pantothenic:</label>
            <textarea
              className="form-control showordisable"
              placeholder="Pantothenic"
              type="text"
              defaultValue={inputTPNC.Pantothenic}
              name="Pantothenic"
              rows={1}
              onInput={(e) => handleChangeValueTPNC(e)}
            ></textarea>
          </div>

          <div style={{ textAlign: "left", marginTop: 5 }}>
            <label className="form-label">Vitamin B6:</label>
            <textarea
              className="form-control showordisable"
              placeholder="VitaminB6"
              defaultValue={inputTPNC.VitaminB6}
              name="VitaminB6"
              rows={1}
              type="text"
              onInput={(e) => handleChangeValueTPNC(e)}
            ></textarea>
          </div>

          <div style={{ textAlign: "left", marginTop: 5 }}>
            <label className="form-label">Folate:</label>
            <textarea
              className="form-control showordisable"
              placeholder="Folate"
              type="text"
              defaultValue={inputTPNC.Folate}
              name="Folate"
              rows={1}
              onInput={(e) => handleChangeValueTPNC(e)}
            ></textarea>
          </div>

          <div style={{ textAlign: "left", marginTop: 5 }}>
            <label className="form-label">Vitamin B12:</label>
            <textarea
              className="form-control showordisable"
              placeholder="B12"
              type="text"
              defaultValue={inputTPNC.B12}
              name="B12"
              rows={1}
              onInput={(e) => handleChangeValueTPNC(e)}
            ></textarea>
          </div>

          <div style={{ textAlign: "left", marginTop: 5 }}>
            <label className="form-label">Bitotin:</label>
            <textarea
              className="form-control showordisable"
              placeholder="Bitotin"
              type="text"
              defaultValue={inputTPNC.Bitotin}
              name="Bitotin"
              rows={1}
              onInput={(e) => handleChangeValueTPNC(e)}
            ></textarea>
          </div>

          <div style={{ textAlign: "left", marginTop: 5 }}>
            <label className="form-label">Vitamin C:</label>
            <textarea
              className="form-control showordisable"
              placeholder="VitaminC"
              type="text"
              defaultValue={inputTPNC.VitaminC}
              name="VitaminC"
              rows={1}
              onInput={(e) => handleChangeValueTPNC(e)}
            ></textarea>
          </div>

          <div style={{ textAlign: "left", marginTop: 5 }}>
            <label className="form-label">Choline:</label>
            <textarea
              className="form-control showordisable"
              placeholder="Choline"
              type="text"
              defaultValue={inputTPNC.Choline}
              name="Choline"
              rows={1}
              onInput={(e) => handleChangeValueTPNC(e)}
            ></textarea>
          </div>

          <div style={{ textAlign: "left", marginTop: 5 }}>
            <label className="form-label">Natri:</label>
            <textarea
              className="form-control showordisable"
              placeholder="NaMuoi"
              type="text"
              defaultValue={inputTPNC.NaMuoi}
              name="NaMuoi"
              rows={1}
              onInput={(e) => handleChangeValueTPNC(e)}
            ></textarea>
          </div>

          <div style={{ textAlign: "left", marginTop: 5 }}>
            <label className="form-label">Kali:</label>
            <textarea
              className="form-control showordisable"
              placeholder="Kali"
              type="text"
              defaultValue={inputTPNC.Kali}
              name="Kali"
              rows={1}
              onInput={(e) => handleChangeValueTPNC(e)}
            ></textarea>
          </div>

          <div style={{ textAlign: "left", marginTop: 5 }}>
            <label className="form-label">Clo:</label>
            <textarea
              className="form-control showordisable"
              placeholder="Clo"
              type="text"
              defaultValue={inputTPNC.Clo}
              name="Clo"
              rows={1}
              onInput={(e) => handleChangeValueTPNC(e)}
            ></textarea>
          </div>
        </div>
      </div>
      <div
        className="confirm_buttons"
        style={{
          marginTop: 10,
        }}
      >
        <div id="formDelete">
          <button
            onClick={() => handleEvent()}
            className="btn btn-success me-1 mb-2 btn_xacnhan_xoa"
            style={{ margin: "0px 10px", padding: "5px 20px" }}
            type="button"
          >
            {status === "admin_add_tpnc" ? "Thêm" : "Lưu"}
          </button>
        </div>
        <button
          onClick={() => handleCloseEvent()}
          className="btn btn-danger me-1 mb-2 btn_huy_xoa"
          style={{ margin: "0px 10px", padding: "5px 20px" }}
          type="button"
        >
          Hủy
        </button>
      </div>
    </div>
  );
}
