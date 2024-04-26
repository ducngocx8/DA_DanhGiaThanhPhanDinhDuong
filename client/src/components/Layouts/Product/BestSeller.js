import React from "react";
import { Link } from "react-router-dom";

export default function BestSeller({ product_detail, setLoading }) {
  return (
    <div className="favorite_book flex_col_center">
      <Link
        to={"/product/" + product_detail.fish_id}
        onClick={() => setLoading(product_detail.fish_id)}
      >
        <div className="book_logo">
          <img src={product_detail.fish_image} alt={product_detail.fish_name} />
        </div>
        <span className="info">
          <h3 className="book_name">
            {product_detail.fish_name.length > 28
              ? product_detail.fish_name.substr(0, 24) + "..."
              : product_detail.fish_name}
          </h3>
          <span className="book_author">{product_detail.category_name}</span>
          <p className="book_price">{product_detail.price}</p>
          <p
            className="book_author"
            style={{
              marginTop: 10,
              backgroundColor: "#48bb78",
              color: "#fff",
              borderRadius: 17,
              padding: 0,
            }}
          >
            Đã bán {product_detail.fish_sold}
          </p>
        </span>
      </Link>
    </div>
  );
}
