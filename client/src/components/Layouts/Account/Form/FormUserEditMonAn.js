import React, { useEffect, useState } from "react";
import axios from "axios";
import { noImage, notify } from "../../../../Utils/Title";
import { useNavigate } from "react-router-dom";
import {
  BACKEND_HOME,
  CustomerChiTietMonURL,
  MonAnURL,
  NhomMonAnURL,
} from "../../../../api";
import FormUserSearchThucPhamEdit from "./FormUserSearchThucPhamEdit";
import FormConfirm from "../../Admin/Form/FormConfirm";

export default function FormUserEditMonAn({
  closeFormAdd,
  loadData,
  itemChoose,
}) {
  let [CategoryList, setCategoryList] = useState([]);
  let [infoChiTietMonEdit, setInfoChiTietMonEdit] = useState(false);
  let [chiTietMonList, setChiTietMonList] = useState([]);
  let [showConfirmDeleteChiTietMon, setShowConfirmDeleteChiTietMon] =
    useState(false);
  let [chiTietMonEdit, setChiTietMonEdit] = useState({
    quanty_edit: "",
    ten_phannhom_edit: "",
  });
  let navigate = useNavigate();
  let [productState, setProductState] = useState({
    ten_mon: itemChoose.ten_mon === null ? "" : itemChoose.ten_mon,
    don_vi: itemChoose.don_vi === null ? "" : itemChoose.don_vi,
    id_nhommonan: itemChoose.id_nhommonan,
    monan_status: Number(itemChoose.monan_status),
  });

  console.log("productState", productState);

  const reloadData = (data) => {
    setChiTietMonList(data);
  };

  useEffect(() => {
    async function getAllNhomMonAn() {
      const response = await axios.get(`${NhomMonAnURL}`, {
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
    async function getAllChiTietMonOfMonAn() {
      const response = await axios.get(
        `${CustomerChiTietMonURL + "/" + itemChoose.id_monan}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        setChiTietMonList(response.data.data);
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigate("/account/login", { replace: true });
        } else if (response.data.must === "permission") {
          return;
        }
      }
    }
    const list_promise = [
      Promise.resolve(getAllNhomMonAn()),
      Promise.resolve(getAllChiTietMonOfMonAn()),
    ];
    Promise.all(list_promise);
  }, [navigate, itemChoose]);

  const handlesetInfoChiTietMonEdit = (chi_tiet) => {
    if (chi_tiet.id_chitietmon !== infoChiTietMonEdit.id_chitietmon) {
      setInfoChiTietMonEdit(chi_tiet);
      setChiTietMonEdit({
        ...chiTietMonEdit,
        quanty_edit: Number(chi_tiet.quanty) * 1,
        ten_phannhom_edit: chi_tiet.ten_phannhom,
      });
    }
  };

  const handleChangeChiTietMon = (e) => {
    let { value, name } = e.target;
    if (name === "quanty_edit") {
      value = Number(value);
    }
    setChiTietMonEdit({ ...chiTietMonEdit, [name]: value });
  };

  const handleUpdateChiTietMon = async () => {
    if (!infoChiTietMonEdit) {
      return;
    }
    if (
      Number(chiTietMonEdit.quanty_edit) <= 0 ||
      typeof chiTietMonEdit.quanty_edit !== "number"
    ) {
      notify(false, "Số lượng không hợp lệ");
      return;
    }
    const newChiTietMon = {
      id_monan: infoChiTietMonEdit.id_monan,
      id_thucpham: infoChiTietMonEdit.id_thucpham,
      quanty: Number(chiTietMonEdit.quanty_edit),
      ten_phannhom: chiTietMonEdit.ten_phannhom_edit.trim(),
    };
    const response = await axios.put(
      `${CustomerChiTietMonURL + "/" + infoChiTietMonEdit.id_chitietmon}`,
      newChiTietMon,
      {
        withCredentials: true,
      }
    );
    notify(response.data.status, response.data.message);
    if (response.data.status) {
      setChiTietMonList(response.data.data);
      setInfoChiTietMonEdit(false);
      setChiTietMonEdit({
        ...chiTietMonEdit,
        quanty_edit: "",
        ten_phannhom_edit: "",
      });
    } else {
      if (response.data.must === "login") {
        return navigate("/account/login", { replace: true });
      } else if (response.data.must === "permission") {
        return;
      }
    }
  };

  const loadDataChiTietMonList = (data) => {
    setChiTietMonList(data);
    if (
      showConfirmDeleteChiTietMon.id_chitietmon ===
      infoChiTietMonEdit.id_chitietmon
    ) {
      setInfoChiTietMonEdit(false);
      setChiTietMonEdit({
        ...chiTietMonEdit,
        quanty_edit: "",
        ten_phannhom_edit: "",
      });
    }
    setShowConfirmDeleteChiTietMon(false);
  };

  const closeFormConfirm = () => {
    setShowConfirmDeleteChiTietMon(false);
  };

  const handleDeleteChiTietMon = async (chi_tiet) => {
    setShowConfirmDeleteChiTietMon(chi_tiet);
  };

  const handleChangeProductValue = (e) => {
    let { name, value } = e.target;
    if (name === "id_nhommonan" || name === "monan_status") {
      value = Number(value);
    }
    setProductState({ ...productState, [name]: value });
  };

  const editProduct = async (newProduct) => {
    const response = await axios.put(
      `${MonAnURL + "/by/user/" + itemChoose.id_monan}`,
      newProduct,
      {
        withCredentials: true,
      }
    );
    notify(response.data.status, response.data.message);
    if (response.data.status) {
      loadData(response.data.data);
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
    if (productState.ten_mon.trim() === "") {
      notify(false, "Vui lòng điền tên món ăn");
      return;
    } else if (productState.don_vi.trim() === "") {
      notify(false, "Vui lòng điền đơn vị món ăn");
      return;
    } else if (
      productState.id_nhommonan === "" ||
      Number(productState.id_nhommonan) === -1
    ) {
      notify(false, "Vui lòng chọn nhóm món ăn");
      return;
    } else if (
      !Number.isInteger(productState.monan_status) ||
      Number(productState.monan_status) < 0 ||
      Number(productState.monan_status) > 2
    ) {
      notify(false, "Vui lòng chọn trạng thái món ăn");
      return;
    }

    const newProduct = {
      ten_mon: String(productState.ten_mon).trim(),
      don_vi: String(productState.don_vi).trim(),
      id_nhommonan: productState.id_nhommonan,
      monan_status: productState.monan_status,
    };
    await editProduct(newProduct);
  };

  const dinhDuongMotChiTietMon = (ThucPham, quanty) => {
    const newTongThanhPhanChinh = {};
    for (const [key, value] of Object.entries(ThucPham)) {
      if (
        ![
          "id_thucpham",
          "TenTiengAnh",
          "TenTiengViet",
          "DonViTinh",
          "id_nhomthucpham",
          "image_url",
          "thucpham_status",
          "EDIBLE",
        ].includes(key)
      ) {
        if (value && typeof Number(value) === "number") {
          newTongThanhPhanChinh[key] = (Number(value) * quanty) / 100;
        } else {
          newTongThanhPhanChinh[key] = "-";
        }
      }
    }
    for (const [key, value] of Object.entries(newTongThanhPhanChinh)) {
      if (
        [
          "FAT",
          "PROCNT",
          "CHOCDF",
          "EDIBLE",
          "CA",
          "P",
          "FE",
          "NA",
          "K",
          "MG",
          "FOL",
          "FOLAC",
          "RETOL",
          "VITA",
          "CARTB",
          "CARTA",
        ].includes(key)
      ) {
        if (typeof value === "number") {
          newTongThanhPhanChinh[key] = Number(value).toFixed(0) * 1;
        }
      } else if (["WATER"].includes(key)) {
        if (typeof value === "number") {
          newTongThanhPhanChinh[key] = Number(value).toFixed(1) * 1;
        }
      } else if (
        [
          "FIBC",
          "ASH",
          "ZN",
          "SE",
          "VITC",
          "BIOT",
          "VITB12",
          "VITD",
          "VITE",
          "VITK",
        ].includes(key)
      ) {
        if (typeof value === "number") {
          newTongThanhPhanChinh[key] = Number(value).toFixed(2) * 1;
        }
      } else if (
        ["MN", "CU", "THIA", "RIBF", "NIA", "PANTAC", "VITB6"].includes(key)
      ) {
        if (typeof value === "number") {
          newTongThanhPhanChinh[key] = Number(value).toFixed(3) * 1;
        }
      }
    }
    return newTongThanhPhanChinh;
  };

  return (
    <div
      className="row col-11 add_edit_class"
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
      {showConfirmDeleteChiTietMon && (
        <div className="background_black_child" style={{ display: "block" }}>
          <FormConfirm
            status={"customer_edit_delete_chitietmon"}
            content={
              "Xác nhận xóa " +
              Number(showConfirmDeleteChiTietMon.quanty) * 1 +
              "g thực phẩm " +
              showConfirmDeleteChiTietMon.ThucPham.TenTiengViet +
              " có ID chi tiết món ăn là "
            }
            id_handle={showConfirmDeleteChiTietMon.id_chitietmon}
            closeFormConfirm={closeFormConfirm}
            loadData={loadDataChiTietMonList}
          />
        </div>
      )}
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
          Cập Nhật Thông Tin Món Ăn
        </div>
        <i
          onClick={() => closeFormAdd(false, false)}
          className="far fa-times-circle btn_close_form"
          style={{ color: "white", fontSize: 25 }}
        />
      </div>

      <div className="scroll_form_86" id="style-14">
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
          <div
            className="row col-4"
            style={{
              paddingRight: 0,
              paddingLeft: 0,
            }}
          >
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
                <div style={{ marginBottom: 5 }}>
                  <label className="form-label">Tên món ăn</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control showordisable"
                    name="ten_mon"
                    type="text"
                    defaultValue={productState.ten_mon}
                    placeholder="VD: Bún Bò Huế"
                  />
                </div>
                <div style={{ marginBottom: 10 }}>
                  <label className="form-label">Đơn vị</label>
                  <input
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-control"
                    name="don_vi"
                    type="text"
                    defaultValue={productState.don_vi}
                    placeholder="VD: Tô vừa"
                  />
                </div>

                <div style={{ marginBottom: 10 }}>
                  <label className="form-label">Nhóm món ăn</label>
                  <select
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-select"
                    aria-label="Default select example"
                    name="id_nhommonan"
                    value={productState.id_nhommonan}
                  >
                    {CategoryList.map((category, index) => {
                      return (
                        <option key={index} value={category.id_nhommonan}>
                          {category.ten_nhom}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div style={{ marginBottom: 10 }}>
                  <label className="form-label">Trạng thái</label>
                  <select
                    onChange={(e) => handleChangeProductValue(e)}
                    className="form-select"
                    aria-label="Default select example"
                    name="monan_status"
                    value={productState.monan_status}
                  >
                    <option value={0}>Chỉ mình tôi</option>
                    <option value={2}>Cho phép Public</option>
                    {Number(productState.monan_status) === 1 && (
                      <option value={1}>Công khai</option>
                    )}
                  </select>
                </div>
                {/* Render Form search Thực Phẩm */}
                <FormUserSearchThucPhamEdit
                  reloadData={reloadData}
                  id_monan={itemChoose.id_monan}
                />
              </div>
            </div>
          </div>
          <div
            className="row col-8"
            style={{
              padding: 0,
            }}
          >
            <div
              className="row col-12"
              style={{
                paddingTop: 20,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div
                className="table-responsive"
                id="style-14"
                style={{
                  position: "relative",
                  height: "65vh",
                }}
              >
                <table className="table table-bordered text-center">
                  <thead>
                    <tr className="white_space_nowrap">
                      <th className="sticky-header_column_first_monan">
                        Phân Nhóm Món
                      </th>
                      <th className="sticky-header_column_second_monan">
                        ID Thực Phẩm
                      </th>
                      <th className="sticky-header_monan">Tên món</th>
                      <th className="sticky-header_monan">Hình ảnh</th>
                      <th className="sticky-header_monan">Số lượng (g)</th>
                      <th className="sticky-header_monan">Cập nhật</th>
                      <th className="sticky-header_monan">Tỉ lệ ăn được (%)</th>
                      <th className="sticky-header_monan">Năng lượng (KCal)</th>
                      <th className="sticky-header_monan">Nước (g)</th>
                      <th className="sticky-header_monan">Chất đạm (g)</th>
                      <th className="sticky-header_monan">Chất béo (g)</th>
                      <th className="sticky-header_monan">Carbohydrate (g)</th>
                      <th className="sticky-header_monan">Chất Xơ (g)</th>
                      <th className="sticky-header_monan">Tro (g)</th>
                      <th className="sticky-header_monan">Canxi (mg)</th>
                      <th className="sticky-header_monan">Phospho (mg)</th>
                      <th className="sticky-header_monan">Sắt (mg)</th>
                      <th className="sticky-header_monan">Kẽm (mg)</th>
                      <th className="sticky-header_monan">Natri (mg)</th>
                      <th className="sticky-header_monan">Kali (mg)</th>
                      <th className="sticky-header_monan">Magie (mg)</th>
                      <th className="sticky-header_monan">Mangan (mg)</th>
                      <th className="sticky-header_monan">Đồng (mg)</th>
                      <th className="sticky-header_monan">Selen (µg)</th>
                      <th className="sticky-header_monan">Vitamin C (mg)</th>
                      <th className="sticky-header_monan">
                        Thiamin, Vitamin B1 (mg)
                      </th>
                      <th className="sticky-header_monan">
                        Riboflavin, Vitamin B2 (mg)
                      </th>
                      <th className="sticky-header_monan">Niacin (mg)</th>
                      <th className="sticky-header_monan">
                        Acid pantothenic (mg)
                      </th>
                      <th className="sticky-header_monan">Vitamin B6 (mg)</th>
                      <th className="sticky-header_monan">Tổng FOL (µg)</th>
                      <th className="sticky-header_monan">Acid Folic (µg)</th>
                      <th className="sticky-header_monan">Biotin (µg)</th>
                      <th className="sticky-header_monan">Vitamin B12 (µg)</th>
                      <th className="sticky-header_monan">Retinol (µg)</th>
                      <th className="sticky-header_monan">Vitamin A (µg)</th>
                      <th className="sticky-header_monan">Vitamin D (µg)</th>
                      <th className="sticky-header_monan">Vitamin E (µg)</th>
                      <th className="sticky-header_monan">Vitamin K (µg)</th>
                      <th className="sticky-header_monan">
                        Beta-Carotene (µg)
                      </th>
                      <th className="sticky-header_monan">
                        Alpha - Carotene(µg)
                      </th>
                      <th className="sticky-header_monan">CRYXB</th>
                      <th className="sticky-header_monan">Cập nhật</th>
                    </tr>
                  </thead>
                  <tbody className="white_space_nowrap">
                    {chiTietMonList.map((chi_tiet, index) => {
                      const thuc_pham = chi_tiet.ThucPham;
                      const dinh_duong_ctm = dinhDuongMotChiTietMon(
                        thuc_pham,
                        chi_tiet.quanty
                      );
                      return (
                        <tr key={index} className="table-white">
                          <td className="sticky-col_monan first-col-sticky_monan">
                            {Number(infoChiTietMonEdit.id_chitietmon) ===
                            Number(chi_tiet.id_chitietmon) ? (
                              <input
                                className="form-control showordisable"
                                placeholder="Tên phân nhóm"
                                type="text"
                                name="ten_phannhom_edit"
                                defaultValue={chiTietMonEdit.ten_phannhom_edit}
                                onInput={(e) => handleChangeChiTietMon(e)}
                              ></input>
                            ) : index === 0 ||
                              (index > 0 &&
                                chiTietMonList[index - 1].ten_phannhom
                                  .trim()
                                  .toLowerCase() !==
                                  chi_tiet.ten_phannhom
                                    .trim()
                                    .toLowerCase()) ? (
                              chi_tiet.ten_phannhom.trim() === "" ? (
                                "Chưa phân nhóm"
                              ) : (
                                chi_tiet.ten_phannhom.trim()
                              )
                            ) : (
                              ""
                            )}
                          </td>
                          <td className="sticky-col_monan second-col-sticky_monan">
                            {thuc_pham.id_thucpham}
                          </td>
                          <td>
                            <a
                              href={"/dinh-duong/" + thuc_pham.id_thucpham}
                              target="_blank"
                              rel="nofollow noreferrer"
                            >
                              {thuc_pham.TenTiengViet || thuc_pham.TenTiengAnh}
                            </a>
                          </td>
                          <td>
                            <img
                              style={{ width: 40 }}
                              src={
                                thuc_pham.image_url.trim() === ""
                                  ? noImage
                                  : BACKEND_HOME + thuc_pham.image_url
                              }
                              alt="anh_dai-dien"
                            />
                          </td>
                          <td>
                            {Number(infoChiTietMonEdit.id_chitietmon) ===
                            Number(chi_tiet.id_chitietmon) ? (
                              <input
                                className="form-control showordisable"
                                placeholder="Số lượng"
                                type="number"
                                name="quanty_edit"
                                defaultValue={chiTietMonEdit.quanty_edit}
                                onInput={(e) => handleChangeChiTietMon(e)}
                              ></input>
                            ) : (
                              Number(chi_tiet.quanty) * 1
                            )}
                          </td>
                          <td>
                            {Number(infoChiTietMonEdit.id_chitietmon) ===
                            Number(chi_tiet.id_chitietmon) ? (
                              <button
                                onClick={() => handleUpdateChiTietMon()}
                                type="button"
                                className="btn btn-success m-1 btn_edit"
                              >
                                <i className="far fa-save" />
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handlesetInfoChiTietMonEdit(chi_tiet)
                                }
                                type="button"
                                className="btn btn-warning m-1 btn_edit"
                              >
                                <i className="far fa-edit" />
                              </button>
                            )}
                          </td>
                          <td>
                            {thuc_pham.EDIBLE === null
                              ? "-"
                              : Number(thuc_pham.EDIBLE) * 1}
                          </td>
                          <td>{dinh_duong_ctm.ENERC}</td>
                          <td>{dinh_duong_ctm.WATER}</td>
                          <td>{dinh_duong_ctm.PROCNT}</td>
                          <td>{dinh_duong_ctm.FAT}</td>
                          <td>{dinh_duong_ctm.CHOCDF}</td>
                          <td>{dinh_duong_ctm.FIBC}</td>
                          <td>{dinh_duong_ctm.ASH}</td>
                          <td>{dinh_duong_ctm.CA}</td>
                          <td>{dinh_duong_ctm.P}</td>
                          <td>{dinh_duong_ctm.FE}</td>
                          <td>{dinh_duong_ctm.ZN}</td>
                          <td>{dinh_duong_ctm.NA}</td>
                          <td>{dinh_duong_ctm.K}</td>
                          <td>{dinh_duong_ctm.MG}</td>
                          <td>{dinh_duong_ctm.MN}</td>
                          <td>{dinh_duong_ctm.CU}</td>
                          <td>{dinh_duong_ctm.SE}</td>
                          <td>{dinh_duong_ctm.VITC}</td>
                          <td>{dinh_duong_ctm.THIA}</td>
                          <td>{dinh_duong_ctm.RIBF}</td>
                          <td>{dinh_duong_ctm.NIA}</td>
                          <td>{dinh_duong_ctm.PANTAC}</td>
                          <td>{dinh_duong_ctm.VITB6}</td>
                          <td>{dinh_duong_ctm.FOL}</td>
                          <td>{dinh_duong_ctm.FOLAC}</td>
                          <td>{dinh_duong_ctm.BIOT}</td>
                          <td>{dinh_duong_ctm.VITB12}</td>
                          <td>{dinh_duong_ctm.RETOL1}</td>
                          <td>{dinh_duong_ctm.VITA}</td>
                          <td>{dinh_duong_ctm.VITD}</td>
                          <td>{dinh_duong_ctm.VITE}</td>
                          <td>{dinh_duong_ctm.VITK}</td>
                          <td>{dinh_duong_ctm.CARTB}</td>
                          <td>{dinh_duong_ctm.CARTA}</td>
                          <td>{dinh_duong_ctm.CRYXB}</td>
                          <td>
                            <button
                              onClick={() => handleDeleteChiTietMon(chi_tiet)}
                              type="button"
                              className="btn btn-primary m-1 btn_edit"
                            >
                              <i className="fa fa-trash-alt" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 10,
            marginTop: 20,
          }}
        >
          <button
            onClick={() => handleEditProduct()}
            className="btn btn-success btn_add_edit_customer_submit"
          >
            Cập nhật món ăn
          </button>
        </div>
      </div>
    </div>
  );
}
