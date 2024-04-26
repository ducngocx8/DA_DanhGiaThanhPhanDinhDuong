import React, { Fragment, useState, useEffect } from "react";
import NotFound from "../../components/Layouts/SympleLayout/NotFound";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BaiVietURL } from "../../api";
import TacGiaLayout from "../../components/Layouts/TacGiaLayout";

export default function TacGiaPage() {
  const { id } = useParams();
  let [loading, isLoading] = useState(true);
  let [tacGiaChoose, setTacGiaChoose] = useState(false);

  useEffect(() => {
    if (Number.isInteger(Number(id))) {
      async function getProductDetail() {
        const response = await axios.get(
          `${BaiVietURL + "/get/bai-viet-tac-gia/" + id}`,
          {
            withCredentials: true,
          }
        );
        setTacGiaChoose(response.data.data);
        isLoading(false);
      }
      getProductDetail();
    } else {
      isLoading(false);
      setTacGiaChoose(false);
    }
  }, [id]);
  return (
    <Fragment>
      {loading ? (
        ""
      ) : tacGiaChoose ? (
        <TacGiaLayout tacGiaChoose={tacGiaChoose} />
      ) : (
        <NotFound />
      )}
    </Fragment>
  );
}
