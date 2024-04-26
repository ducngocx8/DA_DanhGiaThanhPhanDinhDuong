import React, { Fragment, useState, useEffect } from "react";
import PostDetailLayout from "../../components/Layouts/PostDetailLayout";
import NotFound from "../../components/Layouts/SympleLayout/NotFound";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BaiVietURL } from "../../api";

export default function PostDetail() {
  const { slug } = useParams();
  let [loading, isLoading] = useState(true);
  let [baiVietDetail, setBaiVietDetail] = useState(false);

  useEffect(() => {
    if (typeof slug === "string") {
      async function getProductDetail() {
        const response = await axios.get(`${BaiVietURL + "/" + slug}`, {
          withCredentials: true,
        });
        setBaiVietDetail(response.data.data);
        isLoading(false);
      }
      getProductDetail();
    } else {
      isLoading(false);
      setBaiVietDetail(false);
    }
  }, [slug]);
  return (
    <Fragment>
      {loading ? (
        ""
      ) : baiVietDetail ? (
        <PostDetailLayout baiVietDetail={baiVietDetail} />
      ) : (
        <NotFound />
      )}
    </Fragment>
  );
}
