import React, { useEffect, useRef, useState } from "react";
import { RangeSlider, MantineProvider } from "@mantine/core";
import "@mantine/core/styles/Slider.css";
import "../../../css/Global.css";
import axios from "axios";
import { NhomThucPhamURL, ThucPhamChonURL, ThucPhamURL } from "../../../api";
import { notify } from "../../../Utils/Title";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import ThucPhamDaChon from "./ThucPhamDaChon";

export default function ThucPhamLayout() {
  let dispatch = useDispatch();
  const maxShow = 5;
  let [page, setPage] = useState(1);
  let [showTimTheoMuc, setShowTimTheoMuc] = useState(false);
  const calo_ref = useRef([0, 2000]);
  const protein_ref = useRef([0, 500]);
  const fat_ref = useRef([0, 500]);
  const cabs_ref = useRef([0, 500]);
  let [sortType, setSortType] = useState("");
  let [categories, setCategories] = useState([]);
  let [cateSelected, setCateSelected] = useState(-1);
  let [keyword, setKeyword] = useState("");
  let [thucPhamList, setThucPhamList] = useState([]);

  useEffect(() => {
    async function getAllNhomThucPham() {
      const response = await axios.get(`${NhomThucPhamURL}`);
      setCategories(response.data.data);
      return response.data.data;
    }
    getAllNhomThucPham();
  }, []);

  useEffect(() => {
    const handleGetResultSearch = async () => {
      const category_id =
        cateSelected === -1 ? "" : "&category_id=" + cateSelected;
      const params = `/search?keyword=${keyword}&sort_type=${sortType}&energy_from=${calo_ref.current[0]}&energy_to=${calo_ref.current[1]}&protein_from=${protein_ref.current[0]}&protein_to=${protein_ref.current[1]}&fat_from=${fat_ref.current[0]}&fat_to=${fat_ref.current[1]}&cabs_from=${cabs_ref.current[0]}&cabs_to=${cabs_ref.current[1]}${category_id}`;
      const response = await axios.get(`${ThucPhamURL + "/" + params}`);
      if (response.data.status) {
        setThucPhamList(response.data.data);
      } else {
        notify(false, response.data.message);
        setThucPhamList([]);
      }
    };

    if (keyword.trim() !== "") {
      handleGetResultSearch();
    } else {
      setThucPhamList([]);
    }
  }, [keyword, cateSelected, sortType]);

  const handleApDungTimTheoMuc = async () => {
    const category_id =
      cateSelected === -1 ? "" : "&category_id=" + cateSelected;
    const params = `/search?keyword=${keyword}&sort_type=${sortType}&energy_from=${calo_ref.current[0]}&energy_to=${calo_ref.current[1]}&protein_from=${protein_ref.current[0]}&protein_to=${protein_ref.current[1]}&fat_from=${fat_ref.current[0]}&fat_to=${fat_ref.current[1]}&cabs_from=${cabs_ref.current[0]}&cabs_to=${cabs_ref.current[1]}${category_id}`;
    const response = await axios.get(`${ThucPhamURL + "/" + params}`);
    if (response.data.status) {
      setThucPhamList(response.data.data);
    } else {
      notify(false, response.data.message);
      setThucPhamList([]);
    }
  };

  const handleChangeSearchInput = (e) => {
    const { value } = e.target;
    setKeyword(value);
  };

  const handlePageClick = (event) => {
    if (page !== event.selected + 1) setPage(event.selected + 1);
  };

  const getScaleCalories = (v) => 1 * v;
  function valueLabelCaloriesFormat(value) {
    return `${value} ${"Calo"}`;
  }
  function valueLabelProteinFormat(value) {
    return `${value} ${"g"}`;
  }

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    if (name === "sortType") {
      setSortType(value);
    } else if (name === "category_id") {
      setCateSelected(Number(value));
    }
  };

  const handleAddToThucPhamChon = async (id_thucpham) => {
    const thuc_pham_chon = {
      id_thucpham: id_thucpham,
      quanty: 100,
    };
    const response = await axios.post(`${ThucPhamChonURL}`, thuc_pham_chon, {
      withCredentials: true,
    });
    notify(response.data.status, response.data.message);
    if (response.data.status) {
      dispatch({
        type: "load_cart",
        value: response.data.data,
      });
    }
  };

  return (
    <div className="favorite_book_list flex_center mg-10_0">
      <div className="_1200px bg-white pd-10" style={{ display: "flex" }}>
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
              Trung tâm dữ liệu thực phẩm
            </span>
          </div>
          <div className="favorite_book_item mg-10_0">
            {/* Content */}
            <div style={{ marginBottom: 10 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <label className="form-label">
                  Tra cứu thành phần dinh dưỡng thực phẩm:
                </label>
                <div>
                  <select
                    onChange={(e) => handleOnChange(e)}
                    className="form-select noborderRadius"
                    name="category_id"
                    defaultValue={cateSelected}
                  >
                    <option value={"-1"}>Chọn danh mục</option>
                    {categories.map((item, index) => {
                      return (
                        <option key={index} value={item.id_nhomthucpham}>
                          {item.ten_nhom}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <input
                  style={{
                    flex: 2,
                  }}
                  onChange={(e) => handleChangeSearchInput(e)}
                  className="form-control"
                  name="keyword"
                  type="text"
                  defaultValue={keyword}
                  placeholder="VD: Gạo nếp cái"
                />

                {/* Lọc theo mức */}
                <div
                  style={{
                    border: "#eee 1px solid",
                    cursor: "pointer",
                    position: "relative",
                    marginLeft: 10,
                  }}
                >
                  <div
                    style={{
                      padding: "5px 10px",
                      whiteSpace: "nowrap",
                    }}
                    onClick={() => {
                      setShowTimTheoMuc(!showTimTheoMuc);
                    }}
                  >
                    Lọc theo mức
                  </div>
                  {showTimTheoMuc && (
                    <div
                      style={{
                        position: "absolute",
                        backgroundColor: "#fff",
                        top: "50px",
                        boxShadow:
                          "0 4px 8px #62b0fd, 0 4px 12px rgb(0 0 0 / 8%)",
                        padding: "10px",
                        borderRadius: "10px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 100,
                      }}
                    >
                      <MantineProvider>
                        <div>Mức năng lượng:</div>
                        {/* Calories */}
                        <RangeSlider
                          style={{
                            width: 300,
                          }}
                          color="green"
                          mt={10}
                          scale={getScaleCalories}
                          step={1}
                          min={0}
                          max={2000}
                          labelAlwaysOn={false}
                          defaultValue={calo_ref.current}
                          label={valueLabelCaloriesFormat}
                          onChange={(value) => {
                            calo_ref.current = value;
                          }}
                        />

                        <div
                          style={{
                            marginTop: 10,
                          }}
                        >
                          Mức protein:
                        </div>
                        {/* protein */}
                        <RangeSlider
                          style={{
                            width: 300,
                          }}
                          onChange={(value) => {
                            protein_ref.current = value;
                          }}
                          color="green"
                          mt={10}
                          scale={getScaleCalories}
                          step={1}
                          min={0}
                          max={500}
                          labelAlwaysOn={false}
                          defaultValue={protein_ref.current}
                          label={valueLabelProteinFormat}
                        />

                        <div
                          style={{
                            marginTop: 10,
                          }}
                        >
                          Mức chất béo:
                        </div>
                        {/* FAT */}
                        <RangeSlider
                          onChange={(value) => {
                            fat_ref.current = value;
                          }}
                          style={{
                            width: 300,
                          }}
                          color="green"
                          mt={10}
                          scale={getScaleCalories}
                          step={1}
                          min={0}
                          max={500}
                          labelAlwaysOn={false}
                          defaultValue={fat_ref.current}
                          label={valueLabelProteinFormat}
                        />

                        <div
                          style={{
                            marginTop: 10,
                          }}
                        >
                          Mức carbohydrate:
                        </div>
                        {/* Carbohydrate */}
                        <RangeSlider
                          onChange={(value) => {
                            cabs_ref.current = value;
                          }}
                          style={{
                            width: 300,
                          }}
                          color="green"
                          mt={10}
                          scale={getScaleCalories}
                          step={1}
                          min={0}
                          max={300}
                          labelAlwaysOn={false}
                          defaultValue={cabs_ref.current}
                          label={valueLabelProteinFormat}
                        />
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: 10,
                          }}
                        >
                          <button
                            className="btn btn-success"
                            onClick={() => {
                              setShowTimTheoMuc(false);
                              handleApDungTimTheoMuc();
                            }}
                          >
                            Áp dụng
                          </button>
                        </div>
                      </MantineProvider>
                    </div>
                  )}
                </div>
                {/* Kết thúc lọc theo mức */}

                {/* Sắp xếp theo */}
                <div
                  style={{
                    marginLeft: 10,
                  }}
                >
                  <select
                    onChange={(e) => handleOnChange(e)}
                    className="form-select noborderRadius"
                    name="sortType"
                    defaultValue={sortType}
                  >
                    <option value={""}>Sắp xếp theo mặc định</option>
                    <option value={"AZ"}>Sắp xếp theo tên A-Z</option>
                    <option value={"ZA"}>Sắp xếp theo tên Z-A</option>
                    <option value={"NUM09"}>Calo từ thấp đến cao</option>
                    <option value={"NUM90"}>Calo từ cao đến thấp</option>
                  </select>
                </div>
                {/* Kết thúc sắp xếp */}
              </div>
            </div>

            {/* Bảng thực phẩm */}
            <table className="table table-bordered text-center">
              <thead style={{ whiteSpace: "nowrap" }}>
                <tr>
                  <th>Mã thực phẩm</th>
                  <th>Tên thực phẩm</th>
                  <th>Nhóm thực phẩm</th>
                  <th>Năng lượng</th>
                  <th>Tính toán</th>
                </tr>
              </thead>
              <tbody>
                {thucPhamList.map((item, index) => {
                  if (index >= (page - 1) * maxShow && index < page * maxShow) {
                    return (
                      <tr key={index} className="table-white">
                        <td>{item.id_thucpham}</td>
                        <td>
                          <Link
                            style={{
                              textDecoration: "none",
                            }}
                            to={"/dinh-duong/" + item.id_thucpham}
                          >
                            {item.TenTiengViet || item.TenTiengAnh}
                          </Link>
                        </td>
                        <td>{item.ten_nhom}</td>
                        <td>{Number(item.TOTAL_ENERC) * 1}</td>
                        <td
                          onClick={() => {
                            handleAddToThucPhamChon(item.id_thucpham);
                          }}
                        >
                          <button className="btn_buynow">Thêm</button>
                        </td>
                      </tr>
                    );
                  } else {
                    return "";
                  }
                })}
              </tbody>
            </table>

            {/* Phân trang */}
            <div className="flex_center">
              <div>Tổng số: {thucPhamList.length}</div>
              <ReactPaginate
                breakLabel="..."
                nextLabel="Next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={
                  thucPhamList.length <= maxShow
                    ? 1
                    : thucPhamList.length % maxShow === 0
                    ? Math.floor(thucPhamList.length / maxShow)
                    : Math.floor(thucPhamList.length / maxShow) + 1
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

            <div>
              <ThucPhamDaChon />
            </div>
          </div>
        </div>

        {/* Flex 1 */}
        <div style={{ flex: 1, marginLeft: 30 }}>
          <div
            className="favorite_book_list_icon_title"
            style={{ padding: "5px 0px", borderBottom: "1px solid #007bff" }}
          >
            <span className="favorite_book_list_title">Nhóm thực phẩm</span>
          </div>
          <div style={{ marginTop: 10 }}>
            {categories.map((item, index) => {
              return (
                <p key={index}>
                  <Link
                    style={{
                      textDecoration: "none",
                    }}
                    to={`/dinh-duong/category/${item.id_nhomthucpham}`}
                  >
                    {item.ten_nhom}
                  </Link>
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
