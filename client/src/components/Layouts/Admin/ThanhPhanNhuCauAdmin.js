import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminThemeTop from "./AdminThemeTop";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../Utils/Title";
import SearchTheme from "./SearchTheme";
import FormConfirm from "./Form/FormConfirm";
import { CountAdminURL, ThanhPhanNhuCauAdminURL } from "../../../api/Admin";
import FormAddTPNC from "./Form/FormAddTPNC";

export default function ThanhPhanNhuCauAdmin({ username }) {
  let [thanhPhanNhuCauList, setThanhPhanNhuCauList] = useState([]);
  let [page, setPage] = useState(1);
  const maxShow = 7;
  let navigate = useNavigate();
  let [itemEdit, setItemEdit] = useState(false);
  let [itemAdd, setItemAdd] = useState(false);
  let [itemDelete, setItemDelete] = useState(false);
  let [keyword, setKeyword] = useState("");
  let [sort, setSort] = useState("id_nhucau");
  let [count, setCount] = useState(0);
  let [sortType, setSortType] = useState("ASC");

  const handleChangeSort = (newSort) => {
    setSort(newSort);
    if (sortType === "ASC") {
      setSortType("DESC");
    } else if (sortType === "DESC") {
      setSortType("ASC");
    }
  };

  const handleShowFormEdit = (item) => {
    setItemEdit(item);
  };

  const handleShowFormDelete = (item) => {
    setItemDelete(item);
  };

  const handleShowFormAdd = () => {
    setItemAdd(true);
  };

  useEffect(() => {
    async function getAll() {
      const response = await axios.get(
        `${ThanhPhanNhuCauAdminURL}/get/offset?offset=${
          (page - 1) * maxShow
        }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        setThanhPhanNhuCauList(response.data.data);
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
  }, [page, navigate, sort, sortType, keyword]);

  useEffect(() => {
    async function getCount() {
      const response = await axios.get(
        `${CountAdminURL}/thanh-phan-nhu-cau?keyword=${keyword}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        if (response.data.data === 0) {
          setPage(1);
        } else {
          const page_count = response.data.data % maxShow;
          if (page_count === 0) {
            if (response.data.data / maxShow < page) {
              setPage(response.data.data / maxShow);
            }
          } else {
            if (Math.floor(response.data.data / maxShow) + 1 < page) {
              setPage(Math.floor(response.data.data / maxShow) + 1);
            }
          }
        }
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
  }, [page, navigate, sort, sortType, keyword, thanhPhanNhuCauList]);

  const handlePageClick = (event) => {
    if (page !== event.selected + 1) setPage(event.selected + 1);
  };

  const closeFormConfirm = () => {
    setItemEdit(false);
    setItemAdd(false);
    setItemDelete(false);
  };

  const loadData = async (data) => {
    setThanhPhanNhuCauList(data);
  };

  const handleSearch = (keyword) => {
    setKeyword(keyword.toLowerCase().trim());
  };

  return (
    <div id="main">
      {itemAdd || itemEdit || itemDelete ? (
        <div
          className="background_black"
          id="background_black"
          style={{ display: "block" }}
        >
          {itemEdit ? (
            <FormAddTPNC
              itemChoose={itemEdit}
              status={"admin_edit_tpnc"}
              closeFormConfirm={closeFormConfirm}
              loadData={loadData}
              params={`?offset=${
                (page - 1) * maxShow
              }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}`}
              setPage={setPage}
            />
          ) : (
            ""
          )}

          {itemAdd ? (
            <FormAddTPNC
              itemChoose={false}
              status={"admin_add_tpnc"}
              closeFormConfirm={closeFormConfirm}
              loadData={loadData}
              params={`?offset=${
                (page - 1) * maxShow
              }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}`}
              setPage={setPage}
            />
          ) : (
            ""
          )}

          {itemDelete ? (
            <FormConfirm
              itemChoose={itemDelete}
              status={"admin_delete_tpnc"}
              closeFormConfirm={closeFormConfirm}
              loadData={loadData}
              id_handle={itemDelete.id_nhucau}
              content={
                "Bạn có chắc chắc muốn xóa thành phần nhu cầu: với ID là "
              }
              params={`?offset=${
                (page - 1) * maxShow
              }&limit=${maxShow}&type=${sortType}&sort=${sort}&keyword=${keyword}`}
            />
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
      <div className="page-content">
        <section className="row">
          <div className="col-12 col-lg-12">
            <AdminThemeTop username={username} />
            <SearchTheme
              title={"Tìm kiếm thành phần nhu cầu"}
              handleSearch={handleSearch}
            />
            <div className="row">
              <div className="col-12">
                <div className="col-lg-12 stretch-card" style={{ padding: 0 }}>
                  <div className="card">
                    <div className="card-body">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <h4
                          className="card-title"
                          style={{ marginBottom: "0 !important" }}
                        >
                          Danh sách thành phần nhu cầu
                        </h4>
                        <button
                          id="info"
                          className="btn btn-success btn_add"
                          onClick={() => handleShowFormAdd()}
                        >
                          <i className="fas fa-plus" />
                          <span>Thêm thành phần nhu cầu</span>
                        </button>
                      </div>
                      <div className="table-responsive pt-3" id="style-14">
                        <table className="table table-bordered text-center">
                          <thead>
                            <tr>
                              <th
                                onClick={() => {
                                  handleChangeSort("id_nhucau");
                                }}
                                className="white_space_nowrap"
                              >
                                ID Nhu cầu
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("DienGiai");
                                }}
                              >
                                Diễn giải
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("NangLuong");
                                }}
                              >
                                Năng lượng
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("Protein");
                                }}
                              >
                                Protein
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("Lipid");
                                }}
                              >
                                Lipid
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("Glucid");
                                }}
                              >
                                Glucid
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("Xo");
                                }}
                              >
                                Xo
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("CanXi");
                                }}
                              >
                                CanXi
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("Phospho");
                                }}
                              >
                                Phospho
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("Magie");
                                }}
                              >
                                Magie
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("Iod");
                                }}
                              >
                                Iod
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("Cu");
                                }}
                              >
                                Cu
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("Mangan");
                                }}
                              >
                                Mangan
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("Fluo");
                                }}
                              >
                                Fluo
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("Fe");
                                }}
                              >
                                Fe
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("Zn");
                                }}
                              >
                                Zn
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("Selen");
                                }}
                              >
                                Selen
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("Crom");
                                }}
                              >
                                Crom
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("VitaminA");
                                }}
                              >
                                VitaminA
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("VitaminE");
                                }}
                              >
                                VitaminE
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("VitaminK");
                                }}
                              >
                                VitaminK
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("VitaminD");
                                }}
                              >
                                VitaminD
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("VitaminB1");
                                }}
                              >
                                VitaminB1
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("VitaminB2");
                                }}
                              >
                                VitaminB2
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("Niacin");
                                }}
                              >
                                Niacin
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("Pantothenic");
                                }}
                              >
                                Pantothenic
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("VitaminB6");
                                }}
                              >
                                VitaminB6
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("Folate");
                                }}
                              >
                                Folate
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("B12");
                                }}
                              >
                                B12
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("Bitotin");
                                }}
                              >
                                Bitotin
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("VitaminC");
                                }}
                              >
                                VitaminC
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("Choline");
                                }}
                              >
                                Choline
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("NaMuoi");
                                }}
                              >
                                NaMuoi
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("Kali");
                                }}
                              >
                                Kali
                              </th>
                              <th
                                onClick={() => {
                                  handleChangeSort("Clo");
                                }}
                              >
                                Clo
                              </th>
                              <th>Cập nhật</th>
                            </tr>
                          </thead>
                          <tbody>
                            {thanhPhanNhuCauList.map(
                              (thanh_phan_nhu_cau, index) => {
                                return (
                                  <tr key={index} className="table-white">
                                    <td>{thanh_phan_nhu_cau.id_nhucau}</td>
                                    <td className="white_space_nowrap">
                                      {thanh_phan_nhu_cau.DienGiai.length < 50
                                        ? thanh_phan_nhu_cau.DienGiai
                                        : thanh_phan_nhu_cau.DienGiai.slice(
                                            0,
                                            50
                                          ) + "..."}
                                    </td>
                                    <td className="white_space_nowrap">
                                      {thanh_phan_nhu_cau.NangLuong.length < 50
                                        ? thanh_phan_nhu_cau.NangLuong
                                        : thanh_phan_nhu_cau.NangLuong.slice(
                                            0,
                                            50
                                          ) + "..."}
                                    </td>
                                    <td className="white_space_nowrap">
                                      {thanh_phan_nhu_cau.Protein.length < 50
                                        ? thanh_phan_nhu_cau.Protein
                                        : thanh_phan_nhu_cau.Protein.slice(
                                            0,
                                            50
                                          ) + "..."}
                                    </td>
                                    <td className="white_space_nowrap">
                                      {thanh_phan_nhu_cau.Lipid.length < 50
                                        ? thanh_phan_nhu_cau.Lipid
                                        : thanh_phan_nhu_cau.Lipid.slice(
                                            0,
                                            50
                                          ) + "..."}
                                    </td>
                                    <td className="white_space_nowrap">
                                      {thanh_phan_nhu_cau.Glucid.length < 50
                                        ? thanh_phan_nhu_cau.Glucid
                                        : thanh_phan_nhu_cau.Glucid.slice(
                                            0,
                                            50
                                          ) + "..."}
                                    </td>
                                    <td className="white_space_nowrap">
                                      {thanh_phan_nhu_cau.Xo.length < 50
                                        ? thanh_phan_nhu_cau.Xo
                                        : thanh_phan_nhu_cau.Xo.slice(0, 50) +
                                          "..."}
                                    </td>
                                    <td className="white_space_nowrap">
                                      {thanh_phan_nhu_cau.CanXi.length < 50
                                        ? thanh_phan_nhu_cau.CanXi
                                        : thanh_phan_nhu_cau.CanXi.slice(
                                            0,
                                            50
                                          ) + "..."}
                                    </td>
                                    <td className="white_space_nowrap">
                                      {thanh_phan_nhu_cau.Phospho.length < 50
                                        ? thanh_phan_nhu_cau.Phospho
                                        : thanh_phan_nhu_cau.Phospho.slice(
                                            0,
                                            50
                                          ) + "..."}
                                    </td>
                                    <td className="white_space_nowrap">
                                      {thanh_phan_nhu_cau.Magie.length < 50
                                        ? thanh_phan_nhu_cau.Magie
                                        : thanh_phan_nhu_cau.Magie.slice(
                                            0,
                                            50
                                          ) + "..."}
                                    </td>
                                    <td className="white_space_nowrap">
                                      {thanh_phan_nhu_cau.Iod.length < 50
                                        ? thanh_phan_nhu_cau.Iod
                                        : thanh_phan_nhu_cau.Iod.slice(0, 50) +
                                          "..."}
                                    </td>
                                    <td className="white_space_nowrap">
                                      {thanh_phan_nhu_cau.Cu.length < 50
                                        ? thanh_phan_nhu_cau.Cu
                                        : thanh_phan_nhu_cau.Cu.slice(0, 50) +
                                          "..."}
                                    </td>
                                    <td className="white_space_nowrap">
                                      {thanh_phan_nhu_cau.Mangan.length < 50
                                        ? thanh_phan_nhu_cau.Mangan
                                        : thanh_phan_nhu_cau.Mangan.slice(
                                            0,
                                            50
                                          ) + "..."}
                                    </td>
                                    <td className="white_space_nowrap">
                                      {thanh_phan_nhu_cau.Fluo.length < 50
                                        ? thanh_phan_nhu_cau.Fluo
                                        : thanh_phan_nhu_cau.Fluo.slice(0, 50) +
                                          "..."}
                                    </td>
                                    <td className="white_space_nowrap">
                                      {thanh_phan_nhu_cau.Fe.length < 50
                                        ? thanh_phan_nhu_cau.Fe
                                        : thanh_phan_nhu_cau.Fe.slice(0, 50) +
                                          "..."}
                                    </td>
                                    <td className="white_space_nowrap">
                                      {thanh_phan_nhu_cau.Zn.length < 50
                                        ? thanh_phan_nhu_cau.Zn
                                        : thanh_phan_nhu_cau.Zn.slice(0, 50) +
                                          "..."}
                                    </td>
                                    <td className="white_space_nowrap">
                                      {thanh_phan_nhu_cau.Selen.length < 50
                                        ? thanh_phan_nhu_cau.Selen
                                        : thanh_phan_nhu_cau.Selen.slice(
                                            0,
                                            50
                                          ) + "..."}
                                    </td>
                                    <td className="white_space_nowrap">
                                      {thanh_phan_nhu_cau.Crom.length < 50
                                        ? thanh_phan_nhu_cau.Crom
                                        : thanh_phan_nhu_cau.Crom.slice(0, 50) +
                                          "..."}
                                    </td>
                                    <td className="white_space_nowrap">
                                      {thanh_phan_nhu_cau.VitaminA.length < 50
                                        ? thanh_phan_nhu_cau.VitaminA
                                        : thanh_phan_nhu_cau.VitaminA.slice(
                                            0,
                                            50
                                          ) + "..."}
                                    </td>
                                    <td className="white_space_nowrap">
                                      {thanh_phan_nhu_cau.VitaminE.length < 50
                                        ? thanh_phan_nhu_cau.VitaminE
                                        : thanh_phan_nhu_cau.VitaminE.slice(
                                            0,
                                            50
                                          ) + "..."}
                                    </td>
                                    <td className="white_space_nowrap">
                                      {thanh_phan_nhu_cau.VitaminK.length < 50
                                        ? thanh_phan_nhu_cau.VitaminK
                                        : thanh_phan_nhu_cau.VitaminK.slice(
                                            0,
                                            50
                                          ) + "..."}
                                    </td>
                                    <td className="white_space_nowrap">
                                      {thanh_phan_nhu_cau.VitaminD.length < 50
                                        ? thanh_phan_nhu_cau.VitaminD
                                        : thanh_phan_nhu_cau.VitaminD.slice(
                                            0,
                                            50
                                          ) + "..."}
                                    </td>
                                    <td className="white_space_nowrap">
                                      {thanh_phan_nhu_cau.VitaminB1.length < 50
                                        ? thanh_phan_nhu_cau.VitaminB1
                                        : thanh_phan_nhu_cau.VitaminB1.slice(
                                            0,
                                            50
                                          ) + "..."}
                                    </td>
                                    <td className="white_space_nowrap">
                                      {thanh_phan_nhu_cau.VitaminB2.length < 50
                                        ? thanh_phan_nhu_cau.VitaminB2
                                        : thanh_phan_nhu_cau.VitaminB2.slice(
                                            0,
                                            50
                                          ) + "..."}
                                    </td>
                                    <td className="white_space_nowrap">
                                      {thanh_phan_nhu_cau.Niacin.length < 50
                                        ? thanh_phan_nhu_cau.Niacin
                                        : thanh_phan_nhu_cau.Niacin.slice(
                                            0,
                                            50
                                          ) + "..."}
                                    </td>
                                    <td className="white_space_nowrap">
                                      {thanh_phan_nhu_cau.Pantothenic.length <
                                      50
                                        ? thanh_phan_nhu_cau.Pantothenic
                                        : thanh_phan_nhu_cau.Pantothenic.slice(
                                            0,
                                            50
                                          ) + "..."}
                                    </td>
                                    <td className="white_space_nowrap">
                                      {thanh_phan_nhu_cau.VitaminB6.length < 50
                                        ? thanh_phan_nhu_cau.VitaminB6
                                        : thanh_phan_nhu_cau.VitaminB6.slice(
                                            0,
                                            50
                                          ) + "..."}
                                    </td>
                                    <td className="white_space_nowrap">
                                      {thanh_phan_nhu_cau.Folate.length < 50
                                        ? thanh_phan_nhu_cau.Folate
                                        : thanh_phan_nhu_cau.Folate.slice(
                                            0,
                                            50
                                          ) + "..."}
                                    </td>
                                    <td className="white_space_nowrap">
                                      {thanh_phan_nhu_cau.B12.length < 50
                                        ? thanh_phan_nhu_cau.B12
                                        : thanh_phan_nhu_cau.B12.slice(0, 50) +
                                          "..."}
                                    </td>
                                    <td className="white_space_nowrap">
                                      {thanh_phan_nhu_cau.Bitotin.length < 50
                                        ? thanh_phan_nhu_cau.Bitotin
                                        : thanh_phan_nhu_cau.Bitotin.slice(
                                            0,
                                            50
                                          ) + "..."}
                                    </td>
                                    <td className="white_space_nowrap">
                                      {thanh_phan_nhu_cau.VitaminC.length < 50
                                        ? thanh_phan_nhu_cau.VitaminC
                                        : thanh_phan_nhu_cau.VitaminC.slice(
                                            0,
                                            50
                                          ) + "..."}
                                    </td>
                                    <td className="white_space_nowrap">
                                      {thanh_phan_nhu_cau.Choline.length < 50
                                        ? thanh_phan_nhu_cau.Choline
                                        : thanh_phan_nhu_cau.Choline.slice(
                                            0,
                                            50
                                          ) + "..."}
                                    </td>
                                    <td className="white_space_nowrap">
                                      {thanh_phan_nhu_cau.NaMuoi.length < 50
                                        ? thanh_phan_nhu_cau.NaMuoi
                                        : thanh_phan_nhu_cau.NaMuoi.slice(
                                            0,
                                            50
                                          ) + "..."}
                                    </td>
                                    <td className="white_space_nowrap">
                                      {thanh_phan_nhu_cau.Kali.length < 50
                                        ? thanh_phan_nhu_cau.Kali
                                        : thanh_phan_nhu_cau.Kali.slice(0, 50) +
                                          "..."}
                                    </td>
                                    <td className="white_space_nowrap">
                                      {thanh_phan_nhu_cau.Clo.length < 50
                                        ? thanh_phan_nhu_cau.Clo
                                        : thanh_phan_nhu_cau.Clo.slice(0, 50) +
                                          "..."}
                                    </td>
                                    <td className="white_space_nowrap">
                                      <button
                                        className="btn btn-success btn_change_status"
                                        onClick={() =>
                                          handleShowFormEdit(thanh_phan_nhu_cau)
                                        }
                                      >
                                        Chỉnh sửa
                                      </button>
                                      <button
                                        className="btn btn-info btn_change_status"
                                        onClick={() =>
                                          handleShowFormDelete(
                                            thanh_phan_nhu_cau
                                          )
                                        }
                                      >
                                        Xóa
                                      </button>
                                    </td>
                                  </tr>
                                );
                              }
                            )}
                          </tbody>
                        </table>
                      </div>
                      <div
                        className="flex_center"
                        style={{
                          marginTop: 20,
                        }}
                      >
                        <div>Tổng số: {count}</div>
                        <ReactPaginate
                          forcePage={page - 1}
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
