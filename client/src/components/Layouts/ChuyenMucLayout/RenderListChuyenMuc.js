import React, { useEffect, useState } from "react";
import { ChuyenMucURL } from "../../../api";
import axios from "axios";
import { Link } from "react-router-dom";

export default function RenderListChuyenMuc() {
  let [categories, setCategories] = useState([]);
  useEffect(() => {
    async function getAllChuyenMuc() {
      const response = await axios.get(`${ChuyenMucURL}`);
      setCategories(response.data.data);
      return response.data.data;
    }
    getAllChuyenMuc();
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
              to={`/chuyen-muc/${item.id_chuyenmuc}`}
            >
              {`${item.ten_chuyenmuc} (${item.TOTAL})`}
            </Link>
          </p>
        );
      })}
    </div>
  );
}
