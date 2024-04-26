import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../css/Fish.css";
import ReactPaginate from "react-paginate";
import { noImage } from "../../../Utils/Title";
import { BACKEND_HOME, MonAnURL, ThucPhamURL } from "../../../api";
import NewProduct from "./NewProduct";
export default function ListNewProduct({
  menuName,
  imageUrl,
  isPagination,
  setLoading,
  productType,
}) {
  let [product, setProductList] = useState([]);
  let [page, setPage] = useState(1);
  const maxShow = 8;
  useEffect(() => {
    async function getAllThucPham() {
      const response = await axios.get(`${ThucPhamURL}`);
      setProductList(response.data.data); // status, data
      return response.data.data;
    }
    async function getAllMonAn() {
      const response = await axios.get(`${MonAnURL}`, {
        withCredentials: true,
      });
      setProductList(response.data.data); // status, data
      return response.data.data;
    }
    if (productType === "MONAN") {
      getAllMonAn();
    } else if (productType === "THUCPHAM") {
      getAllThucPham();
    }
  }, [productType]);

  const handlePageClick = (event) => {
    if (page !== event.selected + 1) setPage(event.selected + 1);
  };

  const tinhTongThanhPhanDinhDuong = (product) => {
    const thanhPhanChinh = {
      PROCNT: 0,
      FAT: 0,
      CHOCDF: 0,
      ENERC: 0,
    };
    if (productType === "MONAN") {
      product?.ChiTietMons?.forEach((item) => {
        for (const [key, value] of Object.entries(item.ThucPham)) {
          if (["PROCNT", "FAT", "CHOCDF", "ENERC"].includes(key)) {
            if (typeof Number(value) === "number") {
              thanhPhanChinh[key] =
                Number(thanhPhanChinh[key]) +
                (Number(value) * Number(item.quanty)) / 100;
            }
          }
        }
      });
      for (const [key, value] of Object.entries(thanhPhanChinh)) {
        thanhPhanChinh[key] = Number(value).toFixed(0) * 1;
      }
    } else if (productType === "THUCPHAM") {
      for (const [key, value] of Object.entries(product)) {
        thanhPhanChinh[key] = Number(value).toFixed(0) * 1;
      }
    }
    return thanhPhanChinh;
  };

  return (
    <div className="favorite_book_list flex_center mg-10_0">
      <div className="_1200px bg-white flex_col pd-10">
        <div
          className="favorite_book_list_icon_title"
          style={{ padding: "5px 0px", borderBottom: "1px solid #007bff" }}
        >
          <img src={imageUrl} className="icon_sach" alt={menuName} />
          <span className="favorite_book_list_title mg-l-10">{menuName}</span>
        </div>
        <div className="favorite_book_item flex_center mg-10_0">
          {product.map((product, index) => {
            if (
              !isPagination
                ? index < 4
                : index >= (page - 1) * maxShow && index < page * maxShow
            ) {
              return (
                <NewProduct
                  key={index}
                  setLoading={setLoading}
                  product_detail={{
                    product_id:
                      productType === "MONAN"
                        ? product.id_monan
                        : product.id_thucpham,
                    product_name:
                      productType === "MONAN"
                        ? product.ten_mon
                        : product.TenTiengViet || product.TenTiengAnh,
                    product_image:
                      product?.image_url.length > 0
                        ? BACKEND_HOME + product.image_url
                        : noImage,
                    energy_index: tinhTongThanhPhanDinhDuong(product).ENERC,
                    category_name:
                      productType === "MONAN"
                        ? product.NhomMonAn.ten_nhom
                        : product.NhomThucPham.ten_nhom,
                    productType: productType,
                  }}
                />
              );
            }
            return "";
          })}
        </div>
        {isPagination ? (
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            pageCount={
              product.length <= 8
                ? 1
                : product.length % 8 === 0
                ? Math.floor(product.length / 8)
                : Math.floor(product.length / 8) + 1
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
