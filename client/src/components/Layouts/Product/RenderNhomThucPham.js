import React, { useEffect, useState } from "react";
import { NhomThucPhamURL } from "../../../api";
import axios from "axios";
import { Link } from "react-router-dom";

export default function RenderNhomThucPham() {
  let [categories, setCategories] = useState([]);
  useEffect(() => {
    async function getAllNhomThucPham() {
      const response = await axios.get(`${NhomThucPhamURL}`);
      setCategories(response.data.data);
      return response.data.data;
    }
    getAllNhomThucPham();
  }, []);
  return (
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
  );
}
