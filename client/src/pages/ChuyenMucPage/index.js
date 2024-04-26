import React, { Fragment, useState, useEffect } from "react";
import NotFound from "../../components/Layouts/SympleLayout/NotFound";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BaiVietURL } from "../../api";
import ChuyenMucLayout from "../../components/Layouts/ChuyenMucLayout";

export default function ChuyenMucPage() {
  const { id } = useParams();
  let [loading, isLoading] = useState(true);
  let [chuyenMucChoose, setChuyenMucChoose] = useState(false);

  useEffect(() => {
    if (Number.isInteger(Number(id))) {
      async function getProductDetail() {
        const response = await axios.get(
          `${BaiVietURL + "/get/bai-viet-chuyen-muc/" + id}`,
          {
            withCredentials: true,
          }
        );
        setChuyenMucChoose(response.data.data);
        isLoading(false);
      }
      getProductDetail();
    } else {
      isLoading(false);
      setChuyenMucChoose(false);
    }
  }, [id]);
  return (
    <Fragment>
      {loading ? (
        ""
      ) : chuyenMucChoose ? (
        <ChuyenMucLayout chuyenMucChoose={chuyenMucChoose} />
      ) : (
        <NotFound />
      )}
    </Fragment>
  );
}
