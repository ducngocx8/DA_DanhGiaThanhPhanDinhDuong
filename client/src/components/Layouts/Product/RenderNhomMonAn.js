import React, { useEffect, useState } from "react";
import { NhomMonAnURL } from "../../../api";
import axios from "axios";
import { Link } from "react-router-dom";

export default function RenderNhomMonAn() {
  let [categories, setCategories] = useState([]);
  useEffect(() => {
    async function getAllNhomMonAn() {
      const response = await axios.get(`${NhomMonAnURL}`);
      setCategories(response.data.data);
      return response.data.data;
    }
    getAllNhomMonAn();
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
              to={`/category/${item.id_nhommonan}`}
            >
              {item.ten_nhom}
            </Link>
          </p>
        );
      })}
    </div>
  );
}
