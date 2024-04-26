import React, { useEffect, useState } from "react";
import axios from "axios";
import { notify, regexSlug } from "../../../../Utils/Title";
import { useNavigate } from "react-router-dom";
import {
  BaiVietAdminURL,
  ChuyenMucAdminURL,
  UploadImageCKEURL,
} from "../../../../api/Admin";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { BACKEND_HOME } from "../../../../api";

export default function FormEditBaiViet({
  closeFormAdd,
  loadData,
  itemChoose,
  params,
}) {
  let [CategoryList, setCategoryList] = useState([]);
  let [editSlug, setEditSlug] = useState(false);
  let navigate = useNavigate();
  let [baiVietInput, setBaiVietInput] = useState({
    tieu_de: itemChoose.tieu_de,
    mo_ta: itemChoose.mo_ta,
    slug: itemChoose.slug,
    noi_dung: itemChoose.noi_dung,
    id_chuyenmuc: itemChoose.id_chuyenmuc,
    hien_thi: itemChoose.hien_thi,
    username: itemChoose.User.username,
  });

  console.log("baiVietInput", baiVietInput);

  useEffect(() => {
    async function getAllChuyenMuc() {
      const response = await axios.get(`${ChuyenMucAdminURL}`, {
        withCredentials: true,
      });
      if (response.data.status) {
        setCategoryList(response.data.data);
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigate("/account/login", { replace: true });
        } else if (response.data.must === "permission") {
          return;
        }
      }
    }
    const list_promise = [Promise.resolve(getAllChuyenMuc())];
    Promise.all(list_promise);
  }, [navigate]);

  const handleChangeValue = (e) => {
    let { name, value } = e.target;
    if (name === "id_chuyenmuc") {
      value = Number(value);
    } else if (name === "hien_thi") {
      if (value === "true") {
        value = true;
      } else {
        value = false;
      }
    } else if (name === "tieu_de") {
      setBaiVietInput({ ...baiVietInput, [name]: value });
      return;
    }
    setBaiVietInput({ ...baiVietInput, [name]: value });
  };

  const EditBaiViet = async (newItem) => {
    const response = await axios.put(
      `${BaiVietAdminURL}/${itemChoose.id_baiviet}${params}`,
      newItem,
      {
        withCredentials: true,
      }
    );
    notify(response.data.status, response.data.message);
    if (response.data.status) {
      loadData(response.data.data);
      closeFormAdd();
    } else {
      if (response.data.must === "login") {
        return navigate("/account/login", { replace: true });
      } else if (response.data.must === "permission") {
        return;
      }
    }
  };

  const handleEditBaiViet = async () => {
    if (baiVietInput.tieu_de.trim() === "") {
      notify(false, "Vui lòng điền tiêu đề bài viết");
      return;
    }
    if (baiVietInput.slug.trim() === "") {
      notify(false, "Vui lòng điền đường dẫn bài viết");
      return;
    }
    if (!regexSlug.test(baiVietInput.slug.trim())) {
      notify(false, "Đường dẫn bài viết không hợp lệ");
      return;
    }

    if (baiVietInput.mo_ta.trim() === "") {
      notify(false, "Vui lòng điền mô tả bài viết");
      return;
    }
    if (baiVietInput.noi_dung.trim() === "") {
      notify(false, "Vui lòng điền nội dung bài viết");
      return;
    }
    if (
      baiVietInput.id_chuyenmuc === "" ||
      Number(baiVietInput.id_chuyenmuc) === -1
    ) {
      notify(false, "Vui lòng chọn 1 chuyên mục");
      return;
    }
    if (typeof baiVietInput.hien_thi !== "boolean") {
      notify(false, "Vui lòng chọn trạng thái bài viết");
      return;
    }

    const newItem = {
      tieu_de: String(baiVietInput.tieu_de).trim(),
      mo_ta: String(baiVietInput.mo_ta).trim(),
      slug: String(baiVietInput.slug).trim(),
      noi_dung: String(baiVietInput.noi_dung).trim(),
      id_chuyenmuc: baiVietInput.id_chuyenmuc,
      hien_thi: baiVietInput.hien_thi,
    };
    await EditBaiViet(newItem);
  };

  return (
    <div
      className="row col-9 add_edit_class"
      style={{
        display: "block",
        backgroundColor: "rgb(242, 247, 255)",
        borderRadius: "3px 3px 0px 0px",
        boxShadow:
          "rgb(98, 176, 253) 0px 4px 8px, rgba(0, 0, 0, 0.08) 0px 4px 12px",
        padding: "0px !important",
        margin: 0,
      }}
    >
      <div
        className="bg-primary row"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "15px 20px",
          margin: 0,
        }}
      >
        <div className="text-white add_book_class_header">
          Cập Nhật Bài Viết
        </div>
        <i
          onClick={() => closeFormAdd()}
          className="far fa-times-circle btn_close_form"
          style={{ color: "white", fontSize: 25 }}
        />
      </div>

      <div className="scroll_form_80" id="style-14">
        <div
          className="row col-12"
          style={{
            padding: "0px !important",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            margin: 0,
          }}
        >
          <div className="row col-4">
            <div
              className="row col-12"
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 20,
                display: "flex",
              }}
            >
              <div className="col-12">
                <div style={{ marginBottom: 20 }}>
                  <label className="form-label">Tác giả:</label>
                  <input
                    onChange={(e) => handleChangeValue(e)}
                    className="form-control showordisable"
                    type="text"
                    disabled
                    value={baiVietInput.username}
                  />
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label className="form-label">Chuyên mục:</label>
                  <select
                    onChange={(e) => handleChangeValue(e)}
                    className="form-select"
                    aria-label="Default select example"
                    name="id_chuyenmuc"
                    value={baiVietInput.id_chuyenmuc}
                  >
                    <option value={-1}>Chọn chuyên mục</option>
                    {CategoryList.map((category, index) => {
                      return (
                        <option key={index} value={category.id_chuyenmuc}>
                          {category.ten_chuyenmuc}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label className="form-label">Trạng thái</label>
                  <select
                    onChange={(e) => handleChangeValue(e)}
                    className="form-select"
                    name="hien_thi"
                    value={baiVietInput.hien_thi}
                  >
                    <option value={true}>Hiển thị</option>
                    <option value={false}>Ẩn</option>
                  </select>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 10,
                  }}
                >
                  {itemChoose.image_url && (
                    <img
                      alt="hinh_anh"
                      style={{
                        height: 120,
                        backgroundColor: "red",
                        borderRadius: "5px",
                        objectFit: "cover",
                      }}
                      src={BACKEND_HOME + itemChoose.image_url}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row col-8">
            <div
              className="row col-12"
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 20,
              }}
            >
              <div
                style={{
                  width: "100%",
                }}
              >
                <div style={{ marginBottom: 20 }}>
                  <label className="form-label">Tiêu đề:</label>
                  <input
                    onChange={(e) => handleChangeValue(e)}
                    className="form-control"
                    name="tieu_de"
                    type="text"
                    defaultValue={baiVietInput.tieu_de}
                  />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label className="form-label">Đường dẫn:</label>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyItems: "center",
                    }}
                  >
                    {editSlug ? (
                      <input
                        onChange={(e) => handleChangeValue(e)}
                        className="form-control"
                        name="slug"
                        type="text"
                        defaultValue={baiVietInput.slug}
                      />
                    ) : (
                      <div
                        style={{
                          flex: 1,
                          backgroundColor: "white",
                          borderRadius: "5px",
                          padding: "6px 10px",
                        }}
                      >
                        {baiVietInput.slug}
                      </div>
                    )}
                    <button
                      style={{
                        padding: "6px 10px",
                        marginLeft: 10,
                      }}
                      onClick={() => {
                        setEditSlug(!editSlug);
                      }}
                      className="btn btn-success btn_add_edit_customer_submit"
                    >
                      {editSlug ? "Lưu" : "Chỉnh sửa"}
                    </button>
                  </div>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label className="form-label">Mô tả ngắn:</label>
                  <textarea
                    onChange={(e) => handleChangeValue(e)}
                    className="form-control"
                    name="mo_ta"
                    type="text"
                    rows={2}
                    defaultValue={baiVietInput.mo_ta}
                  />
                </div>
                <div style={{ marginBottom: 20 }}>Nội dung:</div>
                <CKEditor
                  editor={DecoupledEditor}
                  config={{
                    ckfinder: {
                      uploadUrl: UploadImageCKEURL,
                      withCredentials: true,
                      headers: {
                        "X-CSRF-TOKEN": "CSFR-Token",
                      },
                    },
                  }}
                  data={baiVietInput.noi_dung}
                  onReady={(editor) => {
                    // if (insertToolbar === false) {
                    //   setInsertToolbar(true);
                    // } else {
                    editor.ui
                      .getEditableElement()
                      .parentElement.insertBefore(
                        editor.ui.view.toolbar.element,
                        editor.ui.getEditableElement()
                      );
                    // }
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setBaiVietInput({
                      ...baiVietInput,
                      noi_dung: editor.getData(),
                    });
                    console.log(data);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 20,
            marginTop: 20,
          }}
        >
          <button
            onClick={() => handleEditBaiViet()}
            className="btn btn-success btn_add_edit_customer_submit"
          >
            Cập nhật bài viết
          </button>
        </div>
      </div>
    </div>
  );
}
