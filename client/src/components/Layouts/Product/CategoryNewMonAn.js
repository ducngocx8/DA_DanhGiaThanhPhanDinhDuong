import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { noImage } from "../../../Utils/Title";
import NewProduct from "./NewProduct";
import { BACKEND_HOME } from "../../../api";

export default function CategoryNewMonAn({
  productList,
  ten_nhom,
  imageUrl,
  isPagination,
}) {
  let [page, setPage] = useState(1);
  const maxShow = 8;

  const handlePageClick = (event) => {
    if (page !== event.selected + 1) setPage(event.selected + 1);
  };

  const tinhTongThanhPhanMonAn = (product) => {
    const thanhPhanChinh = {
      PROCNT: 0,
      FAT: 0,
      CHOCDF: 0,
      ENERC: 0,
    };
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
    return thanhPhanChinh;
  };

  return (
    <div className="favorite_book_list flex_center mg-10_0">
      <div className="_1200px bg-white flex_col pd-10">
        <div
          className="favorite_book_list_icon_title"
          style={{ padding: "5px 0px", borderBottom: "1px solid #007bff" }}
        >
          <img src={imageUrl} className="icon_sach" alt={ten_nhom} />
          <span className="favorite_book_list_title mg-l-10">{ten_nhom}</span>
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
                  <NewProduct
                    key={index}
                    setLoading={() => {}}
                    product_detail={{
                      product_id: product.id_monan,
                      product_name: product.ten_mon,
                      product_image:
                        product?.image_url.length > 0
                          ? BACKEND_HOME + product.image_url
                          : noImage,
                      energy_index: tinhTongThanhPhanMonAn(product).ENERC,
                      category_name: ten_nhom,
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
