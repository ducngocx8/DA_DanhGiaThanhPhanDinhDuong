import React, { Fragment, useEffect, useState } from "react";
import Header from "../SympleLayout/Header";
import Footer from "../SympleLayout/Footer";
import ChildHeader from "../SympleLayout/ChildHeader";
import { convertToDate, notify } from "../../../Utils/Title";
import axios from "axios";
import { BACKEND_HOME, BaiVietURL } from "../../../api";
import { Link } from "react-router-dom";
import RenderListChuyenMuc from "../ChuyenMucLayout/RenderListChuyenMuc";

export default function PostDetailLayout({ baiVietDetail }) {
  const [baiVietLienQuan, setBaiVietLienQuan] = useState([]);

  useEffect(() => {
    async function getBaiVietLienQuan() {
      const response = await axios.get(
        `${BaiVietURL}/get/cung-chuyen-muc?id_baiviet=${baiVietDetail.id_baiviet}&id_chuyenmuc=${baiVietDetail.id_chuyenmuc}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        setBaiVietLienQuan(response.data.data);
      } else {
        notify(false, response.data.message);
      }
    }
    getBaiVietLienQuan();
  }, [baiVietDetail]);

  return (
    <Fragment>
      <Header productType={"THUCPHAM"} />
      <ChildHeader />
      <div className="_100vw" style={{ marginBottom: 20 }}>
        <div
          className="_1200px"
          style={{
            marginTop: 20,
            display: "flex",
          }}
        >
          {/* POST */}
          <div
            style={{
              flex: 8,
              marginRight: 25,
            }}
          >
            <h3
              style={{
                color: "#28a745",
                fontWeight: 700,
                fontSize: "160%",
                lineHeight: 1.4,
              }}
            >
              {baiVietDetail.tieu_de}
            </h3>
            <div
              style={{
                fontSize: "15px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <i
                style={{
                  color: "#007bff",
                  marginRight: 5,
                }}
                className="fas fa-user"
              />
              <span
                style={{
                  marginRight: 5,
                }}
              >
                Biên tập:
              </span>
              <span
                style={{
                  marginRight: 10,
                }}
              >
                <Link
                  style={{
                    textDecoration: "none",
                  }}
                  to={`/tac-gia/${baiVietDetail.user_id}`}
                >
                  <b>{baiVietDetail.User.username}</b>
                </Link>
              </span>
              <i
                style={{
                  color: "#007bff",
                  marginRight: 5,
                }}
                className="fas fa-calendar"
              />
              <span
                style={{
                  marginRight: 5,
                }}
              >
                Thời gian:
              </span>
              <span>{convertToDate(baiVietDetail.createdAt)}</span>
            </div>
            <div
              style={{
                marginTop: "15px",
                marginBottom: "15px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  height: 1,
                  backgroundColor: "gray",
                  width: "100%",
                }}
              ></div>
            </div>
            {/* Insert Content */}
            {
              <p
                className="post_content"
                dangerouslySetInnerHTML={{ __html: baiVietDetail.noi_dung }}
              />
            }

            {/* Bài viết liên quan */}
            <div>
              <h3
                style={{
                  backgroundColor: "rgb(33, 150, 243)",
                  color: "#fff",
                  padding: "10px 5px",
                  marginBottom: 20,
                }}
              >
                Bài viết liên quan
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 8,
                }}
              >
                {baiVietLienQuan.map((post, index) => {
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
                      {index === baiVietLienQuan.length - 1 ? (
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
              </div>
            </div>
          </div>
          {/* SIDE BAR */}
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
            <img
              style={{
                width: "100%",
              }}
              src="https://thucphamnhanh.com/wp-content/uploads/2023/04/trai-cay-rau-cu-2-344x800.jpg"
              alt="image_ads"
            />
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}
