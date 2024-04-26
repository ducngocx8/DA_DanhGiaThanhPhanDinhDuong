import React, { Fragment, useEffect, useState } from "react";
import { MonAnURL, headercolumnURL } from "../../../api";
import axios from "axios";
import { notify } from "../../../Utils/Title";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import RenderNhomMonAn from "../Product/RenderNhomMonAn";
export default function DinhDuongMonAnLayout() {
  const maxShow = 30;
  let [page, setPage] = useState(1);
  const [duongChatList, setDuongChatList] = useState([]);
  const [duongChatSelected, setDuongChatSelected] = useState("");
  const [thucphamList, setThucPhamList] = useState([]);
  const [sortType, setSortType] = useState("NUM90");
  const [duongChatSelectedDetail, setDuongChatSelectedDetail] = useState("");

  const handlePageClick = (event) => {
    if (page !== event.selected + 1) setPage(event.selected + 1);
  };

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    if (name === "sortType") {
      setSortType(value);
    }
  };

  useEffect(() => {
    async function getAllDuongChat() {
      const response = await axios.get(`${headercolumnURL}`, {
        withCredentials: true,
      });
      let duong_chat_list = [];
      if (response.data.status) {
        response.data.data.forEach((item) => {
          if (
            item.don_vi !== "" &&
            item.lam_tron !== null &&
            item.column_code !== "EDIBLE"
          ) {
            duong_chat_list.push(item);
          }
        });
        if (duong_chat_list.length > 0) {
          setDuongChatSelected(duong_chat_list[0].column_code);
          setDuongChatList(duong_chat_list);
        }
      }
    }
    getAllDuongChat();
  }, []);

  useEffect(() => {
    if (duongChatSelected !== "") {
      const getAllThucPhamDuongChat = async () => {
        const response = await axios.get(
          `${
            MonAnURL + "/tra-cuu/duong-chat?code=" + duongChatSelected
          }&sort=${sortType}`,
          {
            withCredentials: true,
          }
        );
        if (response.data.status) {
          setThucPhamList(response.data.data);
        } else {
          notify(false, response.data.message);
        }
      };
      const find_select = duongChatList.find(
        (item) => item.column_code === duongChatSelected
      );
      if (find_select) {
        setDuongChatSelectedDetail(find_select);
      }
      getAllThucPhamDuongChat();
    }
  }, [duongChatSelected, duongChatList, sortType]);

  const renderTable = () => {
    const listRow = [];
    thucphamList.forEach((item, index) => {
      if (index % 2 === 0) {
        if (index + 1 < thucphamList.length) {
          listRow.push(
            <tr className="table-white">
              <td>{index + 1}</td>
              <td>
                {
                  <Link
                    style={{
                      textDecoration: "none",
                    }}
                    to={"/product/" + item.id_monan}
                  >
                    {item.ten_mon}
                  </Link>
                }
              </td>
              <td>
                {item[duongChatSelected]
                  ? Number(item[duongChatSelected]) * 1
                  : "-"}
              </td>
              <td>{index + 2}</td>
              <td>
                <Link
                  style={{
                    textDecoration: "none",
                  }}
                  to={"/product/" + thucphamList[index + 1].id_monan}
                >
                  {thucphamList[index + 1].ten_mon}
                </Link>
              </td>
              <td>
                {thucphamList[index + 1][duongChatSelected]
                  ? Number(thucphamList[index + 1][duongChatSelected]) * 1
                  : "-"}
              </td>
            </tr>
          );
        } else {
          listRow.push(
            <tr className="table-white">
              <td>{index + 1}</td>
              <td>
                {
                  <Link
                    style={{
                      textDecoration: "none",
                    }}
                    to={"/product/" + item.id_monan}
                  >
                    {item.ten_mon}
                  </Link>
                }
              </td>
              <td>
                {item[duongChatSelected]
                  ? Number(item[duongChatSelected]) * 1
                  : "-"}
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          );
        }
      }
    });
    return listRow;
  };
  return (
    <div className="favorite_book_list flex_center mg-10_0">
      <div className="_1200px bg-white pd-10" style={{ display: "flex" }}>
        {/* Flex 3 */}
        <div style={{ flex: 3 }}>
          <div
            className="favorite_book_list_icon_title"
            style={{ padding: "5px 0px", borderBottom: "1px solid #007bff" }}
          >
            <img
              src={"./icons/data_thucpham.png"}
              className="icon_sach"
              alt={"icon_du_lieu_thuc_pham"}
            />
            <span className="favorite_book_list_title mg-l-10">
              Danh sách món ăn giàu dưỡng chất
            </span>
          </div>
          <div className="favorite_book_item mg-10_0">
            {/* Content */}
            <p>
              Chọn dưỡng chất cần tra cứu rồi nhấn "<b>Xem chi tiết</b>"
            </p>
            <div style={{ marginBottom: 20 }}>
              <label className="form-label">Dưỡng chất</label>
              <div
                style={{
                  display: "flex",
                }}
              >
                <select
                  onChange={(e) => {
                    setDuongChatSelected(e.target.value);
                  }}
                  className="form-select"
                  value={duongChatSelected}
                >
                  {duongChatList.map((item, index) => {
                    return (
                      <option key={index} value={item.column_code}>
                        {item.column_name}
                      </option>
                    );
                  })}
                </select>

                <select
                  style={{
                    marginLeft: 10,
                    width: "25%",
                  }}
                  onChange={(e) => handleOnChange(e)}
                  className="form-select noborderRadius"
                  name="sortType"
                  defaultValue={sortType}
                >
                  <option value={"NUM09"}>Từ thấp đến cao</option>
                  <option value={"NUM90"}>Từ cao đến thấp</option>
                </select>

                <button
                  style={{
                    whiteSpace: "nowrap",
                    marginLeft: 10,
                    marginTop: 0,
                  }}
                  className="btn_buynow"
                >
                  Xem chi tiết
                </button>
              </div>
            </div>

            <p
              style={{
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  color: "#333399",
                }}
              >
                Danh sách món ăn giàu{" "}
                <span
                  style={{
                    color: "#b30086",
                  }}
                >
                  {duongChatSelectedDetail.column_name
                    ? `${duongChatSelectedDetail.column_name}`
                    : ""}
                </span>
              </div>
              <div>(hàm lượng có trong 1 phần ăn)</div>
            </p>

            {/* Table */}
            <div className="table-responsive pt-1">
              <table className="table table-bordered text-center">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th style={{ width: "30%" }}>Tên thực phẩm</th>
                    <th style={{ width: "15%" }}>
                      Hàm lượng{" "}
                      {duongChatSelectedDetail.don_vi
                        ? `(${duongChatSelectedDetail.don_vi})`
                        : ""}
                    </th>
                    <th>STT</th>
                    <th style={{ width: "30%" }}>Tên thực phẩm</th>
                    <th style={{ width: "15%" }}>
                      Hàm lượng{" "}
                      {duongChatSelectedDetail.don_vi
                        ? `(${duongChatSelectedDetail.don_vi})`
                        : ""}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {renderTable().map((item, index) => {
                    if (
                      index >= (page - 1) * maxShow &&
                      index < page * maxShow
                    ) {
                      return <Fragment key={index}> {item} </Fragment>;
                    } else {
                      return "";
                    }
                  })}
                </tbody>
              </table>
            </div>
            {/* Kết thúc Table */}

            {/* Phân trang */}
            <div className="flex_center">
              <div>Tổng số: {thucphamList.length}</div>
              <ReactPaginate
                breakLabel="..."
                nextLabel="Next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={
                  thucphamList.length <= maxShow * 2
                    ? 1
                    : thucphamList.length % maxShow === 0
                    ? Math.floor(thucphamList.length / (maxShow * 2))
                    : Math.floor(thucphamList.length / (maxShow * 2)) + 1
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
          </div>
        </div>

        {/* FLEX 1 */}
        <div
          style={{
            flex: 1,
            marginLeft: 20,
          }}
        >
          {/* Right */}
          <div
            className="category_title bg-primary color-white"
            style={{
              padding: "5px 10px",
            }}
          >
            Nhóm món ăn
          </div>
          <RenderNhomMonAn />
        </div>
      </div>
    </div>
  );
}
