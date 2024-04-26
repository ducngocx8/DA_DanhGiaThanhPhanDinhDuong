import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminThemeTop from "./AdminThemeTop";
import ReactPaginate from "react-paginate";
import SearchTheme from "./SearchTheme";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../Utils/Title";
import {
  AdminUploadImageThucPhamURL,
  CountAdminURL,
  ThucPhamAdminURL,
  UploadImageWebURL,
} from "../../../api/Admin";
import { BACKEND_HOME } from "../../../api";
import FormEditThucPham from "./Form/FormEditThucPham";
import FormAddThucPham from "./Form/FormAddThucPham";
import ThucPhamFilter from "./ThucPhamFilter";

export default function ThucPhamAdmin({ username }) {
  let [thucPhamList, setThucPhamList] = useState([]);
  let [page, setPage] = useState(1);
  const maxShow = 7;
  let navigate = useNavigate();
  let [itemEdit, setItemEdit] = useState(false);
  let [itemAdd, setItemAdd] = useState(false);
  let [keyword, setKeyword] = useState("");
  let [sort, setSort] = useState("id_thucpham");
  let [count, setCount] = useState(0);
  let [sortType, setSortType] = useState("ASC");
  let [status, setStatus] = useState(1);

  const handleChangeSort = (newSort) => {
    setSort(newSort);
    if (sortType === "ASC") {
      setSortType("DESC");
    } else if (sortType === "DESC") {
      setSortType("ASC");
    }
  };

  const handleShowFormEdit = (item) => {
    setItemEdit(item);
  };

  const handleShowFormAdd = () => {
    setItemAdd(true);
  };

  useEffect(() => {
    async function getAll() {
      const response = await axios.get(
        `${ThucPhamAdminURL}/get/offset?offset=${
          (page - 1) * maxShow
        }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}&status=${status}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        setThucPhamList(response.data.data); // status, data
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    }
    getAll();
  }, [page, navigate, sort, sortType, keyword, status]);

  useEffect(() => {
    async function getCount() {
      const response = await axios.get(
        `${CountAdminURL}/thuc-pham?keyword=${keyword}&status=${status}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        if (response.data.data === 0) {
          setPage(1);
        } else {
          const page_count = response.data.data % maxShow;
          if (page_count === 0) {
            if (response.data.data / maxShow < page) {
              setPage(response.data.data / maxShow);
            }
          } else {
            if (Math.floor(response.data.data / maxShow) + 1 < page) {
              setPage(Math.floor(response.data.data / maxShow) + 1);
            }
          }
        }
        setCount(response.data.data);
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    }
    const getAll = async () => {
      await Promise.all([Promise.resolve(getCount())]);
    };
    getAll();
  }, [page, navigate, sort, sortType, keyword, status, thucPhamList]);

  const handlePageClick = (event) => {
    if (page !== event.selected + 1) setPage(event.selected + 1);
  };

  const loadData = async (data) => {
    setThucPhamList(data);
  };

  const reloadData = async () => {
    const response = await axios.get(
      `${ThucPhamAdminURL}/get/offset?offset=${
        (page - 1) * maxShow
      }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}&status=${status}`,
      {
        withCredentials: true,
      }
    );
    if (response.data.status) {
      setThucPhamList(response.data.data);
    } else {
      notify(false, response.data.message);
      if (response.data.must === "login") {
        return navigate("/", { replace: true });
      } else if (response.data.must === "permission") {
        return navigate("/", { replace: true });
      }
    }
  };

  const handleCloseFormAdd = async (add_edit, result) => {
    if (result & !add_edit) {
      await reloadData();
    }
    setItemAdd(false);
    setItemEdit(false);
  };

  const handleSearch = (keyword) => {
    setKeyword(keyword.toLowerCase().trim());
  };

  const handleChangeImage = async (e, id_thucpham) => {
    // Upload image Server
    const fileImage = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    let formData = new FormData();
    formData.append("photo", fileImage.data);
    const response = await fetch(UploadImageWebURL, {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    if (!result.status) {
      notify(false, result.message);
      return;
    }
    // Change Path Database
    const image = {
      image_url: result.filename,
    };
    const update_response = await axios.put(
      `${AdminUploadImageThucPhamURL + "/" + id_thucpham}?offset=${
        (page - 1) * maxShow
      }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}&status=${status}`,
      image,
      {
        withCredentials: true,
      }
    );
    notify(update_response.data.status, update_response.data.message);
    if (update_response.data.status) {
      setThucPhamList(update_response.data.data);
      if (update_response.data.page) {
        setPage(update_response.data.page);
      }
    } else {
      if (update_response.data.must === "login") {
        return navigate("/", { replace: true });
      } else if (update_response.data.must === "permission") {
        return navigate("/", { replace: true });
      }
    }
  };

  // const filterSearch = () => {
  //   return thucPhamList.filter((item) => {
  //     return (
  //       String(item.TenTiengAnh).toLowerCase().includes(keyword) ||
  //       String(item.TenTiengViet).toLowerCase().includes(keyword) ||
  //       String(item.DonViTinh).toLowerCase().includes(keyword) ||
  //       String(item.EDIBLE).toLowerCase().includes(keyword) ||
  //       String(item.ENERC).toLowerCase().includes(keyword) ||
  //       String(item.WATER).toLowerCase().includes(keyword) ||
  //       String(item.PROCNT).toLowerCase().includes(keyword) ||
  //       String(item.FAT).toLowerCase().includes(keyword) ||
  //       String(item.CHOCDF).toLowerCase().includes(keyword) ||
  //       String(item.FIBC).toLowerCase().includes(keyword) ||
  //       String(item.ASH).toLowerCase().includes(keyword) ||
  //       String(item.CA).toLowerCase().includes(keyword) ||
  //       String(item.P).toLowerCase().includes(keyword) ||
  //       String(item.FE).toLowerCase().includes(keyword) ||
  //       String(item.ZN).toLowerCase().includes(keyword) ||
  //       String(item.NA).toLowerCase().includes(keyword) ||
  //       String(item.K).toLowerCase().includes(keyword) ||
  //       String(item.MG).toLowerCase().includes(keyword) ||
  //       String(item.MN).toLowerCase().includes(keyword) ||
  //       String(item.CU).toLowerCase().includes(keyword) ||
  //       String(item.SE).toLowerCase().includes(keyword) ||
  //       String(item.VITC).toLowerCase().includes(keyword) ||
  //       String(item.THIA).toLowerCase().includes(keyword) ||
  //       String(item.RIBF).toLowerCase().includes(keyword) ||
  //       String(item.NIA).toLowerCase().includes(keyword) ||
  //       String(item.PANTAC).toLowerCase().includes(keyword) ||
  //       String(item.VITB6).toLowerCase().includes(keyword) ||
  //       String(item.FOL).toLowerCase().includes(keyword) ||
  //       String(item.FOLAC).toLowerCase().includes(keyword) ||
  //       String(item.BIOT).toLowerCase().includes(keyword) ||
  //       String(item.VITB12).toLowerCase().includes(keyword) ||
  //       String(item.RETOL).toLowerCase().includes(keyword) ||
  //       String(item.VITA).toLowerCase().includes(keyword) ||
  //       String(item.VITD).toLowerCase().includes(keyword) ||
  //       String(item.VITE).toLowerCase().includes(keyword) ||
  //       String(item.VITK).toLowerCase().includes(keyword) ||
  //       String(item.CARTB).toLowerCase().includes(keyword) ||
  //       String(item.CARTA).toLowerCase().includes(keyword) ||
  //       String(item.CRYXB).toLowerCase().includes(keyword) ||
  //       String(item.id_thucpham).toLowerCase().includes(keyword) ||
  //       item.NhomThucPham.ten_nhom.toLowerCase().includes(keyword)
  //     );
  //   });
  // };

  return (
    <div id="main">
      {itemAdd || itemEdit ? (
        <div
          className="background_black"
          id="background_black"
          style={{ display: "block" }}
        >
          {itemEdit ? (
            <FormEditThucPham
              itemChoose={itemEdit}
              closeFormAdd={handleCloseFormAdd}
              loadData={loadData}
              params={`?offset=${
                (page - 1) * maxShow
              }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}&status=${status}`}
              setPage={setPage}
            />
          ) : (
            ""
          )}

          {itemAdd ? (
            <FormAddThucPham
              closeFormAdd={handleCloseFormAdd}
              loadData={loadData}
              params={`?offset=${
                (page - 1) * maxShow
              }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}&status=${status}`}
              setPage={setPage}
            />
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
      <div className="page-content">
        <section className="row">
          <div className="col-12 col-lg-12">
            <AdminThemeTop username={username} />
            <ThucPhamFilter setStatus={setStatus} status={status} />
            <SearchTheme
              title={"Tìm kiếm thực phẩm"}
              handleSearch={handleSearch}
            />
            <div className="row">
              <div className="col-12">
                <div className="col-lg-12 stretch-card" style={{ padding: 0 }}>
                  <div className="card">
                    <div className="card-body">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <h4
                          className="card-title"
                          style={{ marginBottom: "0 !important" }}
                        >
                          Danh sách thực phẩm
                        </h4>

                        <div style={{ display: "flex" }}>
                          <button
                            id="info"
                            className="btn btn-success btn_add"
                            onClick={() => handleShowFormAdd()}
                          >
                            <i className="fas fa-plus" />{" "}
                            <span>Thêm thực phẩm</span>
                          </button>
                          <div
                            className="form_add display_none"
                            style={{ marginLeft: 20 }}
                          >
                            <div style={{ display: "flex" }}>
                              <input
                                className="form-control"
                                name="authorName"
                                type="text"
                                defaultValue
                                placeholder="VD: Nguyễn Đức Ngọc"
                              />
                              <button
                                id="btn_add_submit"
                                style={{ marginLeft: 5 }}
                                type="submit"
                                className="btn btn-success btn_add_submit"
                              >
                                Thêm
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="table-responsive pt-3"
                        id="style-14"
                        style={{
                          position: "relative",
                        }}
                      >
                        <table className="table table-bordered text-center">
                          <thead>
                            <tr className="white_space_nowrap">
                              <th
                                onClick={() => {
                                  handleChangeSort("id_thucpham");
                                }}
                                className="sticky-col first-col-sticky"
                              >
                                ID
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("TenTiengViet");
                                }}
                                className="sticky-col second-col-sticky"
                              >
                                Tên Tiếng Việt
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("TenTiengAnh");
                                }}
                              >
                                Tên Tiếng Anh
                              </th>
                              <th>Hình Ảnh</th>
                              <th
                                onClick={() => {
                                  handleChangeSort("id_nhomthucpham");
                                }}
                              >
                                Thể loại
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("thucpham_status");
                                }}
                              >
                                Trạng thái
                              </th>
                              <th>Đơn vị tính</th>
                              <th
                                onClick={() => {
                                  handleChangeSort("EDIBLE");
                                }}
                              >
                                Tỉ lệ ăn được (%)
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("ENERC");
                                }}
                              >
                                Năng lượng (KCal)
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("WATER");
                                }}
                              >
                                Nước (g)
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("PROCNT");
                                }}
                              >
                                Chất đạm (g)
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("FAT");
                                }}
                              >
                                Chất béo (g)
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("CHOCDF");
                                }}
                              >
                                Carbohydrate (g)
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("FIBC");
                                }}
                              >
                                Chất Xơ (g)
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("ASH");
                                }}
                              >
                                Tro (g)
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("CA");
                                }}
                              >
                                Canxi (mg)
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("P");
                                }}
                              >
                                Phospho (mg)
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("FE");
                                }}
                              >
                                Sắt (mg)
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("ZN");
                                }}
                              >
                                Kẽm (mg)
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("NA");
                                }}
                              >
                                Natri (mg)
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("K");
                                }}
                              >
                                Kali (mg)
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("MG");
                                }}
                              >
                                Magie (mg)
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("MN");
                                }}
                              >
                                Mangan (mg)
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("CU");
                                }}
                              >
                                Đồng (mg)
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("SE");
                                }}
                              >
                                Selen (µg)
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("VITC");
                                }}
                              >
                                Vitamin C (mg)
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("THIA");
                                }}
                              >
                                Thiamin, Vitamin B1 (mg)
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("RIBF");
                                }}
                              >
                                Riboflavin, Vitamin B2 (mg)
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("NIA");
                                }}
                              >
                                Niacin (mg)
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("PANTAC");
                                }}
                              >
                                Acid pantothenic (mg)
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("VITB6");
                                }}
                              >
                                Vitamin B6 (mg)
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("FOL");
                                }}
                              >
                                Tổng FOL (µg)
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("FOLAC");
                                }}
                              >
                                Acid Folic (µg)
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("BIOT");
                                }}
                              >
                                Biotin (µg)
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("VITB12");
                                }}
                              >
                                Vitamin B12 (µg)
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("RETOL");
                                }}
                              >
                                Retinol (µg)
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("VITA");
                                }}
                              >
                                Vitamin A (µg)
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("VITD");
                                }}
                              >
                                Vitamin D (µg)
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("VITE");
                                }}
                              >
                                Vitamin E (µg)
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("VITK");
                                }}
                              >
                                Vitamin K (µg)
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("CARTB");
                                }}
                              >
                                Beta-Carotene (µg)
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("CARTA");
                                }}
                              >
                                Alpha - Carotene(µg)
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("CRYXB");
                                }}
                              >
                                CRYXB
                              </th>
                              <th>Cập nhật</th>
                            </tr>
                          </thead>
                          <tbody className="white_space_nowrap">
                            {thucPhamList.map((thuc_pham, index) => {
                              return (
                                <tr key={index} className="table-white">
                                  <td className="sticky-col first-col-sticky">
                                    {thuc_pham.id_thucpham}
                                  </td>
                                  <td className="sticky-col second-col-sticky">
                                    <a
                                      href={
                                        "/dinh-duong/" + thuc_pham.id_thucpham
                                      }
                                      target="_blank"
                                      rel="nofollow noreferrer"
                                    >
                                      {thuc_pham.TenTiengViet}
                                    </a>
                                  </td>
                                  <td>{thuc_pham.TenTiengAnh}</td>
                                  <td>
                                    {thuc_pham.image_url.trim() === "" ? (
                                      "Chưa có hình ảnh"
                                    ) : (
                                      <img
                                        style={{ width: 80 }}
                                        src={BACKEND_HOME + thuc_pham.image_url}
                                        alt="anh_dai-dien"
                                      />
                                    )}
                                  </td>
                                  <td>
                                    <a
                                      href={
                                        "/dinh-duong/category/" +
                                        thuc_pham.NhomThucPham.id_nhomthucpham
                                      }
                                      target="_blank"
                                      rel="nofollow noreferrer"
                                    >
                                      {thuc_pham.NhomThucPham.ten_nhom}
                                    </a>
                                  </td>
                                  {thuc_pham.thucpham_status ? (
                                    <td
                                      style={{
                                        color: "#28a745",
                                        fontWeight: 700,
                                      }}
                                    >
                                      Hiện
                                    </td>
                                  ) : (
                                    <td
                                      style={{
                                        color: "#dc3545",
                                        fontWeight: 700,
                                      }}
                                    >
                                      Ẩn
                                    </td>
                                  )}
                                  <td>{thuc_pham.DonViTinh || "100g"}</td>
                                  <td>
                                    {thuc_pham.EDIBLE === null
                                      ? "-"
                                      : Number(thuc_pham.EDIBLE) * 1}
                                  </td>
                                  <td>
                                    {thuc_pham.ENERC === null
                                      ? "-"
                                      : Number(thuc_pham.ENERC) * 1}
                                  </td>
                                  <td>
                                    {thuc_pham.WATER === null
                                      ? "-"
                                      : Number(thuc_pham.WATER) * 1}
                                  </td>
                                  <td>
                                    {thuc_pham.PROCNT === null
                                      ? "-"
                                      : Number(thuc_pham.PROCNT) * 1}
                                  </td>
                                  <td>
                                    {thuc_pham.FAT === null
                                      ? "-"
                                      : Number(thuc_pham.FAT) * 1}
                                  </td>
                                  <td>
                                    {thuc_pham.CHOCDF === null
                                      ? "-"
                                      : Number(thuc_pham.CHOCDF) * 1}
                                  </td>
                                  <td>
                                    {thuc_pham.FIBC === null
                                      ? "-"
                                      : Number(thuc_pham.FIBC) * 1}
                                  </td>
                                  <td>
                                    {thuc_pham.ASH === null
                                      ? "-"
                                      : Number(thuc_pham.ASH) * 1}
                                  </td>
                                  <td>
                                    {thuc_pham.CA === null
                                      ? "-"
                                      : Number(thuc_pham.CA) * 1}
                                  </td>
                                  <td>
                                    {thuc_pham.P === null
                                      ? "-"
                                      : Number(thuc_pham.P) * 1}
                                  </td>
                                  <td>
                                    {thuc_pham.FE === null
                                      ? "-"
                                      : Number(thuc_pham.FE) * 1}
                                  </td>
                                  <td>
                                    {thuc_pham.ZN === null
                                      ? "-"
                                      : Number(thuc_pham.ZN) * 1}
                                  </td>
                                  <td>
                                    {thuc_pham.NA === null
                                      ? "-"
                                      : Number(thuc_pham.NA) * 1}
                                  </td>
                                  <td>
                                    {thuc_pham.K === null
                                      ? "-"
                                      : Number(thuc_pham.K) * 1}
                                  </td>
                                  <td>
                                    {thuc_pham.MG === null
                                      ? "-"
                                      : Number(thuc_pham.MG) * 1}
                                  </td>
                                  <td>
                                    {thuc_pham.MN === null
                                      ? "-"
                                      : Number(thuc_pham.MN) * 1}
                                  </td>
                                  <td>
                                    {thuc_pham.CU === null
                                      ? "-"
                                      : Number(thuc_pham.CU) * 1}
                                  </td>
                                  <td>
                                    {thuc_pham.SE === null
                                      ? "-"
                                      : Number(thuc_pham.SE) * 1}
                                  </td>
                                  <td>
                                    {thuc_pham.VITC === null
                                      ? "-"
                                      : Number(thuc_pham.VITC) * 1}
                                  </td>
                                  <td>
                                    {thuc_pham.THIA === null
                                      ? "-"
                                      : Number(thuc_pham.THIA) * 1}
                                  </td>
                                  <td>
                                    {thuc_pham.RIBF === null
                                      ? "-"
                                      : Number(thuc_pham.RIBF) * 1}
                                  </td>
                                  <td>
                                    {thuc_pham.NIA === null
                                      ? "-"
                                      : Number(thuc_pham.NIA) * 1}
                                  </td>
                                  <td>
                                    {thuc_pham.PANTAC === null
                                      ? "-"
                                      : Number(thuc_pham.PANTAC) * 1}
                                  </td>
                                  <td>
                                    {thuc_pham.VITB6 === null
                                      ? "-"
                                      : Number(thuc_pham.VITB6) * 1}
                                  </td>
                                  <td>
                                    {thuc_pham.FOL === null
                                      ? "-"
                                      : Number(thuc_pham.FOL) * 1}
                                  </td>
                                  <td>
                                    {thuc_pham.FOLAC === null
                                      ? "-"
                                      : Number(thuc_pham.FOLAC) * 1}
                                  </td>
                                  <td>
                                    {thuc_pham.BIOT === null
                                      ? "-"
                                      : Number(thuc_pham.BIOT) * 1}
                                  </td>
                                  <td>
                                    {thuc_pham.VITB12 === null
                                      ? "-"
                                      : Number(thuc_pham.VITB12) * 1}
                                  </td>
                                  <td>
                                    {thuc_pham.RETOL === null
                                      ? "-"
                                      : Number(thuc_pham.RETOL) * 1}
                                  </td>
                                  <td>
                                    {thuc_pham.VITA === null
                                      ? "-"
                                      : Number(thuc_pham.VITA) * 1}
                                  </td>
                                  <td>
                                    {thuc_pham.VITD === null
                                      ? "-"
                                      : Number(thuc_pham.VITD) * 1}
                                  </td>
                                  <td>
                                    {thuc_pham.VITE === null
                                      ? "-"
                                      : Number(thuc_pham.VITE) * 1}
                                  </td>
                                  <td>
                                    {thuc_pham.VITK === null
                                      ? "-"
                                      : Number(thuc_pham.VITK) * 1}
                                  </td>
                                  <td>
                                    {thuc_pham.CARTB === null
                                      ? "-"
                                      : Number(thuc_pham.CARTB) * 1}
                                  </td>
                                  <td>
                                    {thuc_pham.CARTA === null
                                      ? "-"
                                      : Number(thuc_pham.CARTA) * 1}
                                  </td>
                                  <td>
                                    {thuc_pham.CRYXB === null
                                      ? "-"
                                      : Number(thuc_pham.CRYXB) * 1}
                                  </td>
                                  <td>
                                    <button
                                      onClick={() =>
                                        handleShowFormEdit(thuc_pham)
                                      }
                                      type="button"
                                      className="btn btn-warning m-1 btn_edit"
                                    >
                                      <i className="far fa-edit" />
                                    </button>
                                    <button
                                      style={{
                                        position: "relative",
                                      }}
                                      type="button"
                                      className="btn btn-success m-1 btn_delete"
                                    >
                                      <input
                                        onChange={(e) => {
                                          handleChangeImage(
                                            e,
                                            thuc_pham.id_thucpham
                                          );
                                        }}
                                        style={{
                                          opacity: 0,
                                          position: "absolute",
                                          top: 0,
                                          left: 0,
                                          right: 0,
                                          bottom: 0,
                                        }}
                                        className="form-control"
                                        name="hinh_anh"
                                        type="file"
                                      />
                                      <i
                                        style={{ color: "white" }}
                                        className="fa fa-upload"
                                      />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                      <div
                        className="flex_center"
                        style={{
                          marginTop: 15,
                        }}
                      >
                        <div>Tổng số: {count}</div>
                        <ReactPaginate
                          forcePage={page - 1}
                          breakLabel="..."
                          nextLabel="Next"
                          onPageChange={handlePageClick}
                          pageRangeDisplayed={2}
                          pageCount={
                            count <= maxShow
                              ? 1
                              : count % maxShow === 0
                              ? Math.floor(count / maxShow)
                              : Math.floor(count / maxShow) + 1
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
  );
}
