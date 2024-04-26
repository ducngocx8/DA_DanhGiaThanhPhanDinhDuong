import React from "react";
import { Link } from "react-router-dom";
export default function NewProduct({ product_detail, setLoading }) {
  return (
    <div
      className="favorite_book flex_col_center"
      style={{
        width: product_detail.productType === "MONAN" ? "23%" : "30%",
      }}
    >
      <Link
        to={
          (product_detail.productType === "MONAN"
            ? "/product/"
            : "/dinh-duong/") + product_detail.product_id
        }
        onClick={() => setLoading(product_detail.product_id)}
      >
        <div className="book_logo">
          <img
            src={product_detail.product_image}
            alt={product_detail.product_name}
          />
        </div>
        <span className="info">
          <h3 className="book_name">
            {product_detail.product_name.length > 28
              ? product_detail.product_name.substr(0, 24) + "..."
              : product_detail.product_name}
          </h3>
          <span className="book_author">{product_detail.category_name}</span>
          <p className="book_price">
            {Number(product_detail.energy_index).toLocaleString("vi") + " calo"}
          </p>
          <p
            className="book_author"
            style={{
              marginTop: 10,
              color: "#fff",
              borderRadius: 17,
              padding: 0,
            }}
          >
            {product_detail.productType === "MONAN" ? (
              <button className="btn_buynow">Xem chi tiết món ăn</button>
            ) : (
              ""
            )}
          </p>
        </span>
      </Link>
    </div>
  );
}
