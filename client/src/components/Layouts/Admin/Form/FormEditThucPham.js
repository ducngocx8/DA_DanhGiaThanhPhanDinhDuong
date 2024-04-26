import React, { useEffect, useState } from "react";
import axios from "axios";
import { notify } from "../../../../Utils/Title";
import { useNavigate } from "react-router-dom";
import { NhomThucPhamAdminURL, ThucPhamAdminURL } from "../../../../api/Admin";

export default function FormEditThucPham({
  closeFormAdd,
  loadData,
  itemChoose,
  params,
  setPage,
}) {
  console.log(itemChoose);
  let [CategoryList, setCategoryList] = useState([]);
  let navigate = useNavigate();
  let [productState, setProductState] = useState({
    TenTiengAnh: itemChoose.TenTiengViet === null ? "" : itemChoose.TenTiengAnh,
    TenTiengViet:
      itemChoose.TenTiengViet === null ? "" : itemChoose.TenTiengViet,
    DonViTinh: itemChoose.DonViTinh === null ? "" : itemChoose.DonViTinh,
    EDIBLE: itemChoose.EDIBLE === null ? "" : Number(itemChoose.EDIBLE) * 1,
    ENERC: itemChoose.ENERC === null ? "" : Number(itemChoose.ENERC) * 1,
    WATER: itemChoose.WATER === null ? "" : Number(itemChoose.WATER) * 1,
    PROCNT: itemChoose.PROCNT === null ? "" : Number(itemChoose.PROCNT) * 1,
    FAT: itemChoose.FAT === null ? "" : Number(itemChoose.FAT) * 1,
    CHOCDF: itemChoose.CHOCDF === null ? "" : Number(itemChoose.CHOCDF) * 1,
    FIBC: itemChoose.FIBC === null ? "" : Number(itemChoose.FIBC) * 1,
    ASH: itemChoose.ASH === null ? "" : Number(itemChoose.ASH) * 1,
    CA: itemChoose.CA === null ? "" : Number(itemChoose.CA) * 1,
    P: itemChoose.P === null ? "" : Number(itemChoose.P) * 1,
    FE: itemChoose.FE === null ? "" : Number(itemChoose.FE) * 1,
    ZN: itemChoose.ZN === null ? "" : Number(itemChoose.ZN) * 1,
    NA: itemChoose.NA === null ? "" : Number(itemChoose.NA) * 1,
    K: itemChoose.K === null ? "" : Number(itemChoose.K) * 1,
    MG: itemChoose.MG === null ? "" : Number(itemChoose.MG) * 1,
    MN: itemChoose.MN === null ? "" : Number(itemChoose.MN) * 1,
    CU: itemChoose.CU === null ? "" : Number(itemChoose.CU) * 1,
    SE: itemChoose.SE === null ? "" : Number(itemChoose.SE) * 1,
    VITC: itemChoose.VITC === null ? "" : Number(itemChoose.VITC) * 1,
    THIA: itemChoose.THIA === null ? "" : Number(itemChoose.THIA) * 1,
    RIBF: itemChoose.RIBF === null ? "" : Number(itemChoose.RIBF) * 1,
    NIA: itemChoose.NIA === null ? "" : Number(itemChoose.NIA) * 1,
    PANTAC: itemChoose.PANTAC === null ? "" : Number(itemChoose.PANTAC) * 1,
    VITB6: itemChoose.VITB6 === null ? "" : Number(itemChoose.VITB6) * 1,
    FOL: itemChoose.FOL === null ? "" : Number(itemChoose.FOL) * 1,
    FOLAC: itemChoose.FOLAC === null ? "" : Number(itemChoose.FOLAC) * 1,
    BIOT: itemChoose.BIOT === null ? "" : Number(itemChoose.BIOT) * 1,
    VITB12: itemChoose.VITB12 === null ? "" : Number(itemChoose.VITB12) * 1,
    RETOL: itemChoose.RETOL === null ? "" : Number(itemChoose.RETOL) * 1,
    VITA: itemChoose.VITA === null ? "" : Number(itemChoose.VITA) * 1,
    VITD: itemChoose.VITD === null ? "" : Number(itemChoose.VITD) * 1,
    VITE: itemChoose.VITE === null ? "" : Number(itemChoose.VITE) * 1,
    VITK: itemChoose.VITK === null ? "" : Number(itemChoose.VITK) * 1,
    CARTB: itemChoose.CARTB === null ? "" : Number(itemChoose.CARTB) * 1,
    CARTA: itemChoose.CARTA === null ? "" : Number(itemChoose.CARTA) * 1,
    CRYXB: itemChoose.CRYXB === null ? "" : Number(itemChoose.CRYXB) * 1,
    id_thucpham: itemChoose.id_thucpham,
    id_nhomthucpham: itemChoose.id_nhomthucpham,
    thucpham_status: itemChoose.thucpham_status ? true : false,
  });

  console.log("productState", productState);

  useEffect(() => {
    async function getAllNhomThucPham() {
      const response = await axios.get(`${NhomThucPhamAdminURL}`, {
        withCredentials: true,
      });
      if (response.data.status) {
        setCategoryList(response.data.data);
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigate("/account/login", { replace: true });
        } else if (response.data.must === "permission") {
          return;
        }
      }
    }
    const list_promise = [Promise.resolve(getAllNhomThucPham())];
    Promise.all(list_promise);
  }, [navigate]);

  const handleChangeProductValue = (e) => {
    let { name, value } = e.target;
    if (name === "id_nhomthucpham") {
      value = Number(value);
    } else if (name === "thucpham_status") {
      if (value === "true") {
        value = true;
      } else {
        value = false;
      }
    }
    setProductState({ ...productState, [name]: value });
  };

  const editProduct = async (newProduct) => {
    const response = await axios.put(
      `${ThucPhamAdminURL + "/" + itemChoose.id_thucpham}${params}`,
      newProduct,
      {
        withCredentials: true,
      }
    );
    notify(response.data.status, response.data.message);
    if (response.data.status) {
      loadData(response.data.data);
      if (response.data.page) {
        setPage(response.data.page);
      }
      closeFormAdd(true, true);
    } else {
      if (response.data.must === "login") {
        return navigate("/account/login", { replace: true });
      } else if (response.data.must === "permission") {
        return;
      }
    }
  };

  const handleEditProduct = async () => {
    if (productState.id_thucpham.trim() === "") {
      notify(false, "Vui lòng điền Mã thực phẩm");
      return;
    } else if (productState.TenTiengViet.trim() === "") {
      notify(false, "Vui lòng điền tên Tiếng Việt");
      return;
    } else if (
      productState.id_nhomthucpham === "" ||
      Number(productState.id_nhomthucpham) === -1
    ) {
      notify(false, "Vui lòng chọn nhóm thực phẩm");
      return;
    } else if (typeof productState.thucpham_status !== "boolean") {
      notify(false, "Vui lòng chọn trạng thái thực phẩm");
      return;
    }
    for (const [key, value] of Object.entries(productState)) {
      if (
        ![
          "id_thucpham",
          "TenTiengAnh",
          "TenTiengViet",
          "DonViTinh",
          "id_nhomthucpham",
          "image_url",
        ].includes(key)
      ) {
        if (isNaN(Number(value))) {
          notify(false, key + " phải là số.");
          return;
        }
      }
    }

    const newProduct = {
      TenTiengViet: String(productState.TenTiengViet).trim(),
      TenTiengAnh: String(productState.TenTiengAnh).trim(),
      DonViTinh: String(productState.DonViTinh).trim(),
      id_nhomthucpham: productState.id_nhomthucpham,
      thucpham_status: productState.thucpham_status,
      EDIBLE:
        String(productState.EDIBLE).trim() === ""
          ? ""
          : Number(productState.EDIBLE),
      ENERC:
        String(productState.ENERC).trim() === ""
          ? ""
          : Number(productState.ENERC),
      WATER:
        String(productState.WATER).trim() === ""
          ? ""
          : Number(productState.WATER),
      PROCNT:
        String(productState.PROCNT).trim() === ""
          ? ""
          : Number(productState.PROCNT),
      FAT:
        String(productState.FAT).trim() === "" ? "" : Number(productState.FAT),
      CHOCDF:
        String(productState.CHOCDF).trim() === ""
          ? ""
          : Number(productState.CHOCDF),
      FIBC:
        String(productState.FIBC).trim() === ""
          ? ""
          : Number(productState.FIBC),
      ASH:
        String(productState.ASH).trim() === "" ? "" : Number(productState.ASH),
      CA: String(productState.CA).trim() === "" ? "" : Number(productState.CA),
      P: String(productState.P).trim() === "" ? "" : Number(productState.P),
      FE: String(productState.FE).trim() === "" ? "" : Number(productState.FE),
      ZN: String(productState.ZN).trim() === "" ? "" : Number(productState.ZN),
      NA: String(productState.NA).trim() === "" ? "" : Number(productState.NA),
      K: String(productState.K).trim() === "" ? "" : Number(productState.K),
      MG: String(productState.MG).trim() === "" ? "" : Number(productState.MG),
      MN: String(productState.MN).trim() === "" ? "" : Number(productState.MN),
      CU: String(productState.CU).trim() === "" ? "" : Number(productState.CU),
      SE: String(productState.SE).trim() === "" ? "" : Number(productState.SE),
      VITC:
        String(productState.VITC).trim() === ""
          ? ""
          : Number(productState.VITC),
      THIA:
        String(productState.THIA).trim() === ""
          ? ""
          : Number(productState.THIA),
      RIBF:
        String(productState.RIBF).trim() === ""
          ? ""
          : Number(productState.RIBF),
      NIA:
        String(productState.NIA).trim() === "" ? "" : Number(productState.NIA),
      PANTAC:
        String(productState.PANTAC).trim() === ""
          ? ""
          : Number(productState.PANTAC),
      VITB6:
        String(productState.VITB6).trim() === ""
          ? ""
          : Number(productState.VITB6),
      FOL:
        String(productState.FOL).trim() === "" ? "" : Number(productState.FOL),
      FOLAC:
        String(productState.FOLAC).trim() === ""
          ? ""
          : Number(productState.FOLAC),
      BIOT:
        String(productState.BIOT).trim() === ""
          ? ""
          : Number(productState.BIOT),
      VITB12:
        String(productState.VITB12).trim() === ""
          ? ""
          : Number(productState.VITB12),
      RETOL:
        String(productState.RETOL).trim() === ""
          ? ""
          : Number(productState.RETOL),
      VITA:
        String(productState.VITA).trim() === ""
          ? ""
          : Number(productState.VITA),
      VITD:
        String(productState.VITD).trim() === ""
          ? ""
          : Number(productState.VITD),
      VITE:
        String(productState.VITE).trim() === ""
          ? ""
          : Number(productState.VITE),
      VITK:
        String(productState.VITK).trim() === ""
          ? ""
          : Number(productState.VITK),
      CARTB:
        String(productState.CARTB).trim() === ""
          ? ""
          : Number(productState.CARTB),
      CARTA:
        String(productState.CARTA).trim() === ""
          ? ""
          : Number(productState.CARTA),
      CRYXB:
        String(productState.CRYXB).trim() === ""
          ? ""
          : Number(productState.CRYXB),
    };
    await editProduct(newProduct);
  };

  return (
    <div
      className="row col-9 add_edit_class"
      style={{
        display: "block",
        backgroundColor: "rgb(242, 247, 255)",
        borderRadius: "3px 3px 0px 0px",
        boxShadow:
          "rgb(98, 176, 253) 0px 4px 8px, rgba(0, 0, 0, 0.08) 0px 4px 12px",
        padding: "0px !important",
        margin: 0,
      }}
    >
      <div
        className="bg-primary row"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "15px 20px",
          margin: 0,
        }}
      >
        <div className="text-white add_book_class_header">
          Cập Nhật Thông Tin Thực Phẩm
        </div>
        <i
          onClick={() => closeFormAdd(false, false)}
          className="far fa-times-circle btn_close_form"
          style={{ color: "white", fontSize: 25 }}
        />
      </div>

      <div className="scroll_form_80" id="style-14">
        <div
          className="row col-12"
          style={{
            padding: "0px !important",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            margin: 0,
          }}
        >
          <div className="row col-4">
            <div
              className="row col-12"
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 20,
                display: "flex",
              }}
            >
              <div className="col-12">
                <div style={{ marginBottom: 20 }}>
                  <label className="form-label">Mã Thực Phẩm</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control showordisable"
                    name="id_thucpham"
                    type="text"
                    disabled={true}
                    defaultValue={productState.id_thucpham}
                    placeholder="VD: 01001"
                  />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label className="form-label">Tên Tiếng Việt</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="TenTiengViet"
                    type="text"
                    defaultValue={productState.TenTiengViet}
                    placeholder="VD: Gạo nếp cái"
                  />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label className="form-label">Tên Tiếng Anh</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="TenTiengAnh"
                    type="text"
                    defaultValue={productState.TenTiengAnh}
                    placeholder="VD: Glutinous rice"
                  />
                </div>

                {/* <div style={{ marginBottom: 20 }}>
                  <label className="form-label">Đơn vị tính</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="DonViTinh"
                    type="text"
                    defaultValue={productState.DonViTinh}
                  />
                </div> */}

                <div style={{ marginBottom: 20 }}>
                  <label className="form-label">Danh mục</label>
                  <select
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-select"
                    aria-label="Default select example"
                    name="id_nhomthucpham"
                    value={productState.id_nhomthucpham}
                  >
                    {CategoryList.map((category, index) => {
                      return (
                        <option key={index} value={category.id_nhomthucpham}>
                          {category.ten_nhom}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label className="form-label">Trạng thái</label>
                  <select
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-select"
                    name="thucpham_status"
                    value={productState.thucpham_status}
                  >
                    <option value={true}>Hiển thị</option>
                    <option value={false}>Ẩn</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="row col-8">
            <div
              className="row col-12"
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 20,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div className="row">
                <div className="col-3" style={{ marginBottom: 20 }}>
                  <label className="form-label">Tỷ Lệ Ăn Được (%)</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control showordisable"
                    name="EDIBLE"
                    type="number"
                    defaultValue={productState.EDIBLE}
                  />
                </div>
                <div className="col-3" style={{ marginBottom: 20 }}>
                  <label className="form-label">Năng Lượng (KCal)</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control showordisable"
                    name="ENERC"
                    type="number"
                    defaultValue={productState.ENERC}
                  />
                </div>
                <div className="col-3" style={{ marginBottom: 20 }}>
                  <label className="form-label">Lượng Nước (g)</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="WATER"
                    type="number"
                    defaultValue={productState.WATER}
                  />
                </div>
                <div className="col-3" style={{ marginBottom: 20 }}>
                  <label className="form-label">Tổng Protein (g)</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="PROCNT"
                    type="number"
                    defaultValue={productState.PROCNT}
                  />
                </div>
                <div className="col-3" style={{ marginBottom: 20 }}>
                  <label className="form-label">Tổng Chất Béo (g)</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="FAT"
                    type="number"
                    defaultValue={productState.FAT}
                  />
                </div>
                <div className="col-3" style={{ marginBottom: 20 }}>
                  <label className="form-label">Carbohydrate (g)</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="CHOCDF"
                    type="number"
                    defaultValue={productState.CHOCDF}
                  />
                </div>
                <div className="col-3" style={{ marginBottom: 20 }}>
                  <label className="form-label">Chất Xơ (g)</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="FIBC"
                    type="number"
                    defaultValue={productState.FIBC}
                  />
                </div>
                <div className="col-3" style={{ marginBottom: 20 }}>
                  <label className="form-label">Tro (g)</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="ASH"
                    type="number"
                    defaultValue={productState.ASH}
                  />
                </div>
                <div className="col-3" style={{ marginBottom: 20 }}>
                  <label className="form-label">Canxi (mg)</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="CA"
                    type="number"
                    defaultValue={productState.CA}
                  />
                </div>
                <div className="col-3" style={{ marginBottom: 20 }}>
                  <label className="form-label">Phospho (mg)</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="P"
                    type="number"
                    defaultValue={productState.P}
                  />
                </div>
                <div className="col-3" style={{ marginBottom: 20 }}>
                  <label className="form-label">Sắt (mg)</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="FE"
                    type="number"
                    defaultValue={productState.FE}
                  />
                </div>
                <div className="col-3" style={{ marginBottom: 20 }}>
                  <label className="form-label">Kẽm (mg)</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="ZN"
                    type="number"
                    defaultValue={productState.ZN}
                  />
                </div>
                <div className="col-3" style={{ marginBottom: 20 }}>
                  <label className="form-label">Natri (mg)</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="NA"
                    type="number"
                    defaultValue={productState.NA}
                  />
                </div>
                <div className="col-3" style={{ marginBottom: 20 }}>
                  <label className="form-label">Kali (mg)</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="K"
                    type="number"
                    defaultValue={productState.K}
                  />
                </div>
                <div className="col-3" style={{ marginBottom: 20 }}>
                  <label className="form-label">Magie (mg)</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="MG"
                    type="number"
                    defaultValue={productState.MG}
                  />
                </div>
                <div className="col-3" style={{ marginBottom: 20 }}>
                  <label className="form-label">Mangan (mg)</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="MN"
                    type="number"
                    defaultValue={productState.MN}
                  />
                </div>
                <div className="col-3" style={{ marginBottom: 20 }}>
                  <label className="form-label">Đồng (mg)</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="CU"
                    type="number"
                    defaultValue={productState.CU}
                  />
                </div>
                <div className="col-3" style={{ marginBottom: 20 }}>
                  <label className="form-label">Selen (µg)</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="SE"
                    type="number"
                    defaultValue={productState.SE}
                  />
                </div>
                <div className="col-3" style={{ marginBottom: 20 }}>
                  <label className="form-label">Vitamin C (mg)</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="VITC"
                    type="number"
                    defaultValue={productState.VITC}
                  />
                </div>
                <div className="col-3" style={{ marginBottom: 20 }}>
                  <label className="form-label">Vitamin B1 (mg)</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="THIA"
                    type="number"
                    defaultValue={productState.THIA}
                  />
                </div>
                <div className="col-3" style={{ marginBottom: 20 }}>
                  <label className="form-label">Vitamin B2 (mg)</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="RIBF"
                    type="number"
                    defaultValue={productState.RIBF}
                  />
                </div>
                <div className="col-3" style={{ marginBottom: 20 }}>
                  <label className="form-label">Niacin (mg)</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="NIA"
                    type="number"
                    defaultValue={productState.NIA}
                  />
                </div>
                <div className="col-3" style={{ marginBottom: 20 }}>
                  <label className="form-label">Ac Pantothenic (mg)</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="PANTAC"
                    type="number"
                    defaultValue={productState.PANTAC}
                  />
                </div>
                <div className="col-3" style={{ marginBottom: 20 }}>
                  <label className="form-label">Vitamin B6 (mg)</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="VITB6"
                    type="number"
                    defaultValue={productState.VITB6}
                  />
                </div>
                <div className="col-3" style={{ marginBottom: 20 }}>
                  <label className="form-label">Tổng FOL (µg)</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="FOL"
                    type="number"
                    defaultValue={productState.FOL}
                  />
                </div>
                <div className="col-3" style={{ marginBottom: 20 }}>
                  <label className="form-label">Acid Folic (µg)</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="FOLAC"
                    type="number"
                    defaultValue={productState.FOLAC}
                  />
                </div>
                <div className="col-3" style={{ marginBottom: 20 }}>
                  <label className="form-label">Biotin (µg)</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="BIOT"
                    type="number"
                    defaultValue={productState.BIOT}
                  />
                </div>
                <div className="col-3" style={{ marginBottom: 20 }}>
                  <label className="form-label">Vitamin B12 (µg)</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="VITB12"
                    type="number"
                    defaultValue={productState.VITB12}
                  />
                </div>
                <div className="col-3" style={{ marginBottom: 20 }}>
                  <label className="form-label">Retinol (µg)</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="RETOL"
                    type="number"
                    defaultValue={productState.RETOL}
                  />
                </div>
                <div className="col-3" style={{ marginBottom: 20 }}>
                  <label className="form-label">Biotin (µg)</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="VITB12"
                    type="number"
                    defaultValue={productState.VITB12}
                  />
                </div>
                <div className="col-3" style={{ marginBottom: 20 }}>
                  <label className="form-label">Vitamin A (µg)</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="VITA"
                    type="number"
                    defaultValue={productState.VITA}
                  />
                </div>
                <div className="col-3" style={{ marginBottom: 20 }}>
                  <label className="form-label">Vitamin D (µg)</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="VITD"
                    type="number"
                    defaultValue={productState.VITD}
                  />
                </div>
                <div className="col-3" style={{ marginBottom: 20 }}>
                  <label className="form-label">Vitamin E (mg)</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="VITE"
                    type="number"
                    defaultValue={productState.VITE}
                  />
                </div>
                <div className="col-3" style={{ marginBottom: 20 }}>
                  <label className="form-label">Vitamin K (mg)</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="VITK"
                    type="number"
                    defaultValue={productState.VITK}
                  />
                </div>
                <div className="col-3" style={{ marginBottom: 20 }}>
                  <label className="form-label">Beta-Carotene (µg)</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="CARTB"
                    type="number"
                    defaultValue={productState.CARTB}
                  />
                </div>
                <div className="col-3" style={{ marginBottom: 20 }}>
                  <label className="form-label">α Carotene (µg)</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="CARTA"
                    type="number"
                    defaultValue={productState.CARTA}
                  />
                </div>
                <div className="col-3" style={{ marginBottom: 20 }}>
                  <label className="form-label">CRYXB (µg)</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="CRYXB"
                    type="number"
                    defaultValue={productState.CRYXB}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <button
            onClick={() => handleEditProduct()}
            className="btn btn-success btn_add_edit_customer_submit"
          >
            Cập nhật thực phẩm
          </button>
        </div>
      </div>
    </div>
  );
}
