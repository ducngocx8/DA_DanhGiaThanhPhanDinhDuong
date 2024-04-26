import React, { Fragment, useState, useEffect } from "react";
import Header from "../SympleLayout/Header";
import Carousel from "../SympleLayout/Carousel";
import ReactPaginate from "react-paginate";
import Footer from "../SympleLayout/Footer";
import ChildHeader from "../SympleLayout/ChildHeader";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_HOME, BaiVietURL } from "../../../api";
import axios from "axios";
import { convertToDate, notify } from "../../../Utils/Title";
import RenderListChuyenMuc from "../ChuyenMucLayout/RenderListChuyenMuc";

export default function PostLayout() {
  let [page, setPage] = useState(1);
  let [baiVietList, setBaiVietList] = useState([]);
  const maxShow = 5;
  let navigate = useNavigate();
  let [count, setCount] = useState(0);

  useEffect(() => {
    async function getAll() {
      const response = await axios.get(
        `${BaiVietURL}/get/offset?offset=${
          (page - 1) * maxShow
        }&limit=${maxShow}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        setBaiVietList(response.data.data);
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    }
    getAll();
  }, [page, navigate]);

  useEffect(() => {
    async function getCount() {
      const response = await axios.get(
        `${BaiVietURL}/get/count?offset=${
          (page - 1) * maxShow
        }&limit=${maxShow}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        setCount(response.data.data);
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    }
    const getAll = async () => {
      await Promise.all([Promise.resolve(getCount())]);
    };
    getAll();
  }, [baiVietList, navigate, page]);

  const handlePageClick = (event) => {
    if (page !== event.selected + 1) setPage(event.selected + 1);
  };

  return (
    <Fragment>
      <Header productType={"THUCPHAM"} />
      <ChildHeader />
      <Carousel productType={"THUCPHAM"} />
      <div className="_100vw" style={{ marginBottom: 20 }}>
        <div
          className="_1200px"
          style={{
            marginTop: 20,
          }}
        >
          <div>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 8,
                  marginRight: 20,
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgb(33, 150, 243)",
                    color: "#fff",
                    padding: "10px 5px",
                    marginBottom: 20,
                  }}
                >
                  Bài viết mới
                </div>
                {baiVietList.map((post, index) => {
                  return (
                    <Link
                      key={index}
                      to={"/post/" + post.slug + ".htm"}
                      style={{
                        textDecoration: "none",
                        marginBottom: "10px",
                      }}
                    >
                      <div className="one_post" style={{ display: "flex" }}>
                        <div
                          style={{
                            width: 200,
                            height: 130,
                            marginRight: "10px",
                          }}
                        >
                          <img
                            style={{
                              width: 200,
                              height: 130,
                              objectFit: "cover",
                            }}
                            src={BACKEND_HOME + post.image_url}
                            alt="image_url"
                          />
                        </div>
                        <div
                          style={{
                            margin: "5px 0px",
                          }}
                        >
                          <div
                            className="post_title"
                            style={{
                              fontSize: 17,
                              color: "#222222",
                              fontWeight: "700",
                            }}
                          >
                            {post.tieu_de}
                          </div>
                          <div
                            className="post_date"
                            style={{
                              color: "#333333",
                              fontSize: 13,
                              marginTop: 5,
                            }}
                          >
                            {"Ngày đăng: " + convertToDate(post.createdAt)}
                          </div>
                          <div
                            className="post_date"
                            style={{
                              color: "#333333",
                              fontSize: 13,
                              marginTop: 5,
                            }}
                          >
                            {"Chuyên mục: " + post.ChuyenMuc.ten_chuyenmuc}
                          </div>
                          <div
                            className="mo_ta"
                            style={{
                              color: "#333333",
                              fontSize: 15,
                              marginTop: 5,
                            }}
                          >
                            {post.mo_ta.slice(0, 130) + "..."}
                          </div>
                        </div>
                      </div>
                      {index === baiVietList.length - 1 ? (
                        <div
                          style={{
                            marginBottom: 10,
                          }}
                        ></div>
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              height: 1,
                              backgroundColor: "#ccc",
                              marginTop: 10,
                              width: "90%",
                            }}
                          ></div>
                        </div>
                      )}
                    </Link>
                  );
                })}

                {/* Pagination */}
                <ReactPaginate
                  breakLabel="..."
                  nextLabel="Next"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={2}
                  pageCount={
                    count <= maxShow
                      ? 1
                      : count % maxShow === 0
                      ? Math.floor(count / maxShow)
                      : Math.floor(count / maxShow) + 1
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
              </div>
              <div
                style={{
                  flex: 2,
                }}
              >
                <div
                  className="category_title color-white"
                  style={{
                    padding: "10px 10px",
                    backgroundColor: "rgb(33, 150, 243)",
                  }}
                >
                  Chuyên mục
                </div>
                <RenderListChuyenMuc />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}
