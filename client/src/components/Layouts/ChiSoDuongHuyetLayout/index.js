import React, { useEffect, useState } from "react";
import { ChiSoDuongHuyetURL} from "../../../api";
import axios from "axios";
import { notify } from "../../../Utils/Title";
import ReactPaginate from "react-paginate";
import RenderNhomThucPham from "../Product/RenderNhomThucPham";
export default function ChiSoDuongHuyetLayout() {
  const maxShow = 20;
  let [page, setPage] = useState(1);
  let [sortType, setSortType] = useState("NUM90");
  let [level, setLevel] = useState(0);
  const [thucphamList, setThucPhamList] = useState([]);

  const handlePageClick = (event) => {
    if (page !== event.selected + 1) setPage(event.selected + 1);
  };

  useEffect(() => {
    const getAllGIINDEX = async () => {
      const response = await axios.get(
        `${ChiSoDuongHuyetURL + "?level=" + level + "&sortType=" + sortType}`
      );
      if (response.data.status) {
        setThucPhamList(response.data.data);
      } else {
        notify(false, response.data.message);
      }
    };
    //   const find_select = duongChatList.find(
    //     (item) => item.column_code === duongChatSelected
    //   );
    //   if (find_select) {
    //     setDuongChatSelectedDetail(find_select);
    //   }
    getAllGIINDEX();
  }, [sortType, level]);

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
              Chỉ số đường huyết (GI)
            </span>
          </div>
          <div className="favorite_book_item mg-10_0">
            {/* Content */}
            <div style={{ marginBottom: 20 }}>
              <label className="form-label">Chọn mức độ</label>
              <div
                style={{
                  display: "flex",
                }}
              >
                <select
                  onChange={(e) => {
                    setLevel(e.target.value);
                  }}
                  className="form-select"
                  name="level"
                  value={level}
                >
                  <option value={0}>Chọn mức độ</option>
                  <option value={1}>Chỉ số đường huyết thấp (0 - 55)</option>
                  <option value={2}>
                    Chỉ số đường huyết trung bình (55 - 69)
                  </option>
                  <option value={3}>Chỉ số đường huyết cao ({">"}= 70)</option>
                </select>

                <select
                  style={{
                    margin: "0px 20px",
                  }}
                  onChange={(e) => {
                    setSortType(e.target.value);
                  }}
                  className="form-select"
                  name="sortType"
                  value={sortType}
                >
                  <option value={"NUM90"}>Sắp xếp từ cao đến thấp</option>
                  <option value={"NUM09"}>Sắp xếp từ thấp đến cao</option>
                  <option value={"AZ"}>Sắp xếp theo tên A-Z</option>
                  <option value={"ZA"}>Sắp xếp theo tên Z-A</option>
                </select>

                <button
                  style={{
                    whiteSpace: "nowrap",
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
                Chỉ số GI của một số thực phẩm
                <span
                  style={{
                    color: "#b30086",
                  }}
                >
                  {" "}
                  thông dụng tại Việt Nam
                </span>
              </div>
            </p>

            {/* Table */}
            <div className="table-responsive pt-1">
              <table className="table table-bordered text-center">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Mã thực phẩm</th>
                    <th>Tên thực phẩm</th>
                    <th>Chỉ số đường huyết</th>
                  </tr>
                </thead>
                <tbody>
                  {thucphamList.map((item, index) => {
                    if (
                      index >= (page - 1) * maxShow &&
                      index < page * maxShow
                    ) {
                      return (
                        <tr className="table-white">
                          <td>{index + 1}</td>
                          <td>{item.id_thucpham}</td>
                          <td>{item.TenThucPham}</td>
                          <td>{Number(item.GI) * 1}</td>
                        </tr>
                      );
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
                  thucphamList.length <= maxShow
                    ? 1
                    : thucphamList.length % maxShow === 0
                    ? Math.floor(thucphamList.length / maxShow)
                    : Math.floor(thucphamList.length / maxShow) + 1
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
            Nhóm thực phẩm
          </div>
          <RenderNhomThucPham />
        </div>
      </div>
    </div>
  );
}
