import React, { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import NewFish from "./NewProduct";
import { RangeSlider, MantineProvider } from "@mantine/core";
import "@mantine/core/styles/Slider.css";
import "../../../css/Global.css";
import { noImage } from "../../../Utils/Title";
import { BACKEND_HOME, NhomMonAnURL } from "../../../api";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function SearchMonAnResult({ productList, imageUrl, isPagination, keyword }) {
  const [searchParams] = useSearchParams();
  let navigate = useNavigate();
  let [page, setPage] = useState(1);
  const maxShow = 8;
  let [sortType, setSortType] = useState(searchParams.get("sort_type") || "");
  let [categories, setCategories] = useState([]);
  let [cateSelected, setCateSelected] = useState(
    Number(searchParams.get("category_id") || -1)
  );

  let [showTimTheoMuc, setShowTimTheoMuc] = useState(false);
  const calo_ref = useRef([
    Number(searchParams.get("energy_from")) || 0,
    Number(searchParams.get("energy_to")) || 2000,
  ]);
  const protein_ref = useRef([
    Number(searchParams.get("protein_from")) || 0,
    Number(searchParams.get("protein_to")) || 500,
  ]);
  const fat_ref = useRef([
    Number(searchParams.get("fat_from")) || 0,
    Number(searchParams.get("fat_to")) || 500,
  ]);
  const cabs_ref = useRef([
    Number(searchParams.get("cabs_from")) || 0,
    Number(searchParams.get("cabs_to")) || 500,
  ]);

  const handlePageClick = (event) => {
    if (page !== event.selected + 1) setPage(event.selected + 1);
  };

  useEffect(() => {
    async function getAllNhomMonAn() {
      const response = await axios.get(`${NhomMonAnURL}`);
      setCategories(response.data.data);
      return response.data.data;
    }
    getAllNhomMonAn();
  }, []);

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
      return navigatePage(value, cateSelected);
    } else if (name === "category_id") {
      setCateSelected(Number(value));
      return navigatePage(sortType, value);
    }
  };

  const navigatePage = (sort_type, category_id) => {
    let category_query = "";
    if (Number(category_id) !== -1) {
      category_query = `&category_id=${category_id}`;
    }
    return navigate(
      `/search?keyword=${keyword}&sort_type=${sort_type}&energy_from=${calo_ref.current[0]}&energy_to=${calo_ref.current[1]}&protein_from=${protein_ref.current[0]}&protein_to=${protein_ref.current[1]}&fat_from=${fat_ref.current[0]}&fat_to=${fat_ref.current[1]}&cabs_from=${cabs_ref.current[0]}&cabs_to=${cabs_ref.current[1]}${category_query}`,
      { replace: true }
    );
  };

  return (
    <div className="favorite_book_list flex_center mg-10_0">
      <div className="_1200px bg-white flex_col pd-10">
        <div
          className="favorite_book_list_icon_title"
          style={{
            padding: "5px 0px",
            borderBottom: "1px solid #007bff",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <img src={imageUrl} className="icon_sach" alt={"image_search"} />
            <span className="favorite_book_list_title mg-l-10">
              Kết quả tìm kiếm từ khóa: "{keyword}"
            </span>
          </div>

          <div
            style={{
              border: "#eee 1px solid",

              cursor: "pointer",
              position: "relative",
            }}
          >
            <div
              style={{
                padding: "5px 10px",
              }}
              onClick={() => {
                setShowTimTheoMuc(!showTimTheoMuc);
              }}
            >
              Tìm theo mức
            </div>
            {showTimTheoMuc && (
              <div
                style={{
                  position: "absolute",
                  backgroundColor: "#fff",
                  top: "50px",
                  boxShadow: "0 4px 8px #62b0fd, 0 4px 12px rgb(0 0 0 / 8%)",
                  padding: "10px",
                  borderRadius: "10px",
                  left: "50%",
                  transform: "translateX(-50%)",
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
                        return navigatePage(sortType, cateSelected);
                      }}
                    >
                      Áp dụng
                    </button>
                  </div>
                </MantineProvider>
              </div>
            )}
          </div>

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
                  <option key={index} value={item.id_nhommonan}>
                    {item.ten_nhom}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
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
        </div>
        <div className="favorite_book_item flex_center mg-10_0">
          {productList.length === 0 ? (
            <div>Không tìm thấy sản phẩm nào.</div>
          ) : (
            productList.map((product, index) => {
              if (
                !isPagination
                  ? index < 4
                  : index >= (page - 1) * maxShow && index < page * maxShow
              ) {
                return (
                  <NewFish
                    key={index}
                    setLoading={() => {}}
                    product_detail={{
                      product_id: product.id_monan,
                      product_name: product.ten_mon,
                      product_image:
                        product?.image_url.length > 0
                          ? BACKEND_HOME + product.image_url
                          : noImage,
                      energy_index: Number(product.TOTAL_ENERC).toFixed(0),
                      category_name: product.ten_nhom,
                      productType: "MONAN",
                    }}
                  />
                );
              }
              return "";
            })
          )}
        </div>
        {isPagination && productList.length > 0 ? (
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            pageCount={
              productList.length <= 8
                ? 1
                : productList.length % 8 === 0
                ? Math.floor(productList.length / 8)
                : Math.floor(productList.length / 8) + 1
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
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
