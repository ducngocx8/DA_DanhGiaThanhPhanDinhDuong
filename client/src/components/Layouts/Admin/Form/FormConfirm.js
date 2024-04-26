import React from "react";
import axios from "axios";
import { ApiLink, notify } from "../../../../Utils/Title";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  BaiVietAdminURL,
  BuaAnAdminURL,
  ChiSoDuongHuyetAdminURL,
  ChiSoUserAdminURL,
  ChiTietMonAdminURL,
  ChuyenMucAdminURL,
  DoiTuongAdminURL,
  DonViAdminURL,
  LaoDongAdminURL,
  LichSuLogAdminURL,
  MonAnAdminURL,
  MucTieuAdminURL,
  NgayAnAdminURL,
  NhomMonAnAdminURL,
  NhomThucPhamAdminURL,
  NhomTuoiAdminURL,
  NhuCauHangNgayAdminURL,
  OTPAdminURL,
  RoleAdminURL,
  ThanhPhanNhuCauAdminURL,
  ThongBaoAdminURL,
} from "../../../../api/Admin";
import { CustomerChiTietMonURL, MonAnURL } from "../../../../api";
export default function FormConfirm({
  content,
  id_handle,
  status,
  closeFormConfirm,
  loadData,
  itemChoose,
  params,
}) {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  console.log(id_handle);
  const handleEvent = async () => {
    if (status === "user_cancel_order") {
      const orderStatus = {
        order_id: itemChoose.order_id,
        order_status: 4, // 4: Yêu cầu hủy
      };
      const response = await axios.post(
        `${ApiLink.domain + "/order/user"}`,
        orderStatus,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        notify(true, response.data.message);
        loadData(response.data.data);
        closeFormConfirm();
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          window.localStorage.clear();
          return navigate("/account/login", { replace: true });
        }
      }
    } else if (status === "admin_delete_laodong") {
      const response = await axios.delete(
        `${LaoDongAdminURL + "/" + id_handle}${params}`,
        {
          withCredentials: true,
        }
      );
      notify(response.data.status, response.data.message);
      if (response.data.status) {
        loadData(response.data.data);
        closeFormConfirm();
      } else {
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    } else if (status === "admin_delete_thongbao") {
      const response = await axios.delete(
        `${ThongBaoAdminURL + "/" + id_handle}${params}`,
        {
          withCredentials: true,
        }
      );
      notify(response.data.status, response.data.message);
      if (response.data.status) {
        loadData(response.data.data);
        closeFormConfirm();
      } else {
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    } else if (status === "admin_delete_donvi") {
      const response = await axios.delete(
        `${DonViAdminURL + "/" + id_handle}${params}`,
        {
          withCredentials: true,
        }
      );
      notify(response.data.status, response.data.message);
      if (response.data.status) {
        loadData(response.data.data);
        closeFormConfirm();
      } else {
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    } else if (status === "admin_delete_chuyenmuc") {
      const response = await axios.delete(
        `${ChuyenMucAdminURL + "/" + id_handle}${params}`,
        {
          withCredentials: true,
        }
      );
      notify(response.data.status, response.data.message);
      if (response.data.status) {
        loadData(response.data.data);
        closeFormConfirm();
      } else {
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    } else if (status === "admin_delete_monan") {
      const response = await axios.delete(
        `${MonAnAdminURL + "/" + id_handle}${params}`,
        {
          withCredentials: true,
        }
      );
      notify(response.data.status, response.data.message);
      if (response.data.status) {
        loadData(response.data.data);
        closeFormConfirm();
      } else {
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    } else if (status === "admin_delete_nhomtuoi") {
      const response = await axios.delete(
        `${NhomTuoiAdminURL + "/" + id_handle}${params}`,
        {
          withCredentials: true,
        }
      );
      notify(response.data.status, response.data.message);
      if (response.data.status) {
        loadData(response.data.data);
        closeFormConfirm();
      } else {
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    } else if (status === "admin_delete_tpnc") {
      const response = await axios.delete(
        `${ThanhPhanNhuCauAdminURL + "/" + id_handle}${params}`,
        {
          withCredentials: true,
        }
      );
      notify(response.data.status, response.data.message);
      if (response.data.status) {
        loadData(response.data.data);
        closeFormConfirm();
      } else {
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    } else if (status === "admin_delete_doituong") {
      const response = await axios.delete(
        `${DoiTuongAdminURL + "/" + id_handle}${params}`,
        {
          withCredentials: true,
        }
      );
      notify(response.data.status, response.data.message);
      if (response.data.status) {
        loadData(response.data.data);
        closeFormConfirm();
      } else {
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    } else if (status === "admin_delete_nhucauhangngay") {
      const nhu_cau = {
        id_nhomtuoi: itemChoose.id_nhomtuoi,
        id_laodong: itemChoose.id_laodong,
        id_doituong: itemChoose.id_doituong,
        id_nhucau: itemChoose.id_nhucau,
      };
      const response = await axios.delete(
        `${NhuCauHangNgayAdminURL}${params}`,
        {
          data: nhu_cau,
          withCredentials: true,
        }
      );
      notify(response.data.status, response.data.message);
      if (response.data.status) {
        loadData(response.data.data);
        closeFormConfirm();
      } else {
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    } else if (status === "admin_delete_bua_an") {
      const response = await axios.delete(
        `${BuaAnAdminURL + "/" + id_handle}${params}`,
        {
          withCredentials: true,
        }
      );
      notify(response.data.status, response.data.message);
      if (response.data.status) {
        loadData(response.data.data);
        closeFormConfirm();
      } else {
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    } else if (status === "admin_edit_delete_chitietmon") {
      const response = await axios.delete(
        `${ChiTietMonAdminURL + "/" + id_handle}`,
        {
          withCredentials: true,
        }
      );
      notify(response.data.status, response.data.message);
      if (response.data.status) {
        loadData(response.data.data);
        closeFormConfirm();
      } else {
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    } else if (status === "admin_add_delete_chitietmon") {
      loadData();
    } else if (status === "admin_delete_ngayan") {
      const response = await axios.delete(
        `${NgayAnAdminURL + "/" + id_handle}${params}`,
        {
          withCredentials: true,
        }
      );
      notify(response.data.status, response.data.message);
      if (response.data.status) {
        loadData(response.data.data);
        closeFormConfirm();
      } else {
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    } else if (status === "admin_delete_chisouser") {
      const response = await axios.delete(
        `${ChiSoUserAdminURL + "/" + id_handle}${params}`,
        {
          withCredentials: true,
        }
      );
      notify(response.data.status, response.data.message);
      if (response.data.status) {
        loadData(response.data.data);
        closeFormConfirm();
      } else {
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    } else if (status === "admin_delete_muctieu") {
      const response = await axios.delete(
        `${MucTieuAdminURL + "/" + id_handle}${params}`,
        {
          withCredentials: true,
        }
      );
      notify(response.data.status, response.data.message);
      if (response.data.status) {
        loadData(response.data.data);
        closeFormConfirm();
      } else {
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    } else if (status === "admin_delete_lichsulog") {
      const response = await axios.delete(
        `${LichSuLogAdminURL + "/" + id_handle}${params}`,
        {
          withCredentials: true,
        }
      );
      notify(response.data.status, response.data.message);
      if (response.data.status) {
        loadData(response.data.data);
        closeFormConfirm();
      } else {
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    } else if (status === "admin_delete_nhomthucpham") {
      const response = await axios.delete(
        `${NhomThucPhamAdminURL + "/" + id_handle + params}`,
        {
          withCredentials: true,
        }
      );
      notify(response.data.status, response.data.message);
      if (response.data.status) {
        loadData(response.data.data);
        closeFormConfirm();
      } else {
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    } else if (status === "admin_delete_nhommonan") {
      const response = await axios.delete(
        `${NhomMonAnAdminURL + "/" + id_handle}${params}`,
        {
          withCredentials: true,
        }
      );
      notify(response.data.status, response.data.message);
      if (response.data.status) {
        loadData(response.data.data);
        closeFormConfirm();
      } else {
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    } else if (status === "admin_delete_chi_so_duong_huyet") {
      const response = await axios.delete(
        `${ChiSoDuongHuyetAdminURL + "/" + id_handle}${params}`,
        {
          withCredentials: true,
        }
      );
      notify(response.data.status, response.data.message);
      if (response.data.status) {
        loadData(response.data.data);
        closeFormConfirm();
      } else {
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    } else if (status === "customer_edit_delete_chitietmon") {
      const response = await axios.delete(
        `${CustomerChiTietMonURL + "/" + id_handle}`,
        {
          withCredentials: true,
        }
      );
      notify(response.data.status, response.data.message);
      if (response.data.status) {
        loadData(response.data.data);
        closeFormConfirm();
      } else {
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    } else if (status === "customer_delete_muctieu") {
      loadData();
    } else if (status === "customer_delete_chisouser") {
      loadData();
    } else if (status === "customer_delete_monan") {
      const response = await axios.delete(
        `${MonAnURL + "/by/user/" + id_handle}`,
        {
          withCredentials: true,
        }
      );
      notify(response.data.status, response.data.message);
      if (response.data.status) {
        loadData(response.data.data);
        closeFormConfirm();
      } else {
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    } else if (status === "admin_delete_rate") {
      const response = await axios.delete(
        `${ApiLink.domain + "/admin/rate/" + itemChoose.fish_id}`,
        {
          data: {
            user_id: itemChoose.user_id,
          },
          withCredentials: true,
        }
      );
      if (response.data.status) {
        notify(true, response.data.message);
        loadData(response.data.data);
        closeFormConfirm();
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    } else if (status === "admin_delete_role") {
      const response = await axios.delete(
        `${RoleAdminURL + "/" + itemChoose.role_id}${params}`,
        {
          withCredentials: true,
        }
      );
      notify(response.data.status, response.data.message);
      if (response.data.status) {
        loadData(response.data.data);
        closeFormConfirm();
      } else {
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    } else if (status === "admin_delete_baiviet") {
      const response = await axios.delete(
        `${BaiVietAdminURL + "/" + itemChoose.id_baiviet}${params}`,
        {
          withCredentials: true,
        }
      );
      notify(response.data.status, response.data.message);
      if (response.data.status) {
        loadData(response.data.data);
        closeFormConfirm();
      } else {
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    } else if (status === "admin_delete_coupon") {
      const response = await axios.delete(
        `${ApiLink.domain + "/admin/coupon/" + itemChoose.coupon_id}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        notify(true, response.data.message);
        loadData(response.data.data);
        closeFormConfirm();
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          window.localStorage.clear();
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    } else if (status === "admin_delete_otp") {
      const response = await axios.delete(`${OTPAdminURL}${params}`, {
        withCredentials: true,
      });
      if (response.data.status) {
        notify(true, response.data.message);
        loadData(response.data.data);
        closeFormConfirm();
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          window.localStorage.clear();
          return navigate("/", { replace: true });
        } else if (response.data.must === "permission") {
          return navigate("/", { replace: true });
        }
      }
    } else if (status === "customer_submit_order") {
      const order_user = {
        fullname: itemChoose.fullname,
        address: itemChoose.address,
        phonenumber: itemChoose.phonenumber,
        email: itemChoose.email,
        coupon_code: itemChoose.coupon_code,
        note: itemChoose.note,
      };
      const response = await axios.post(
        `${ApiLink.domain + "/cart/addOrder"}`,
        order_user,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        notify(true, response.data.message);
        dispatch({
          type: "load_cart",
          value: response.data.data,
        });
        loadData();
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigate("/account/login", { replace: true });
        }
      }
    } else if (status === "admin_edit_delete_price") {
      const response = await axios.delete(
        `${ApiLink.domain + "/admin/price/" + id_handle}`,
        {
          data: {
            size_id: itemChoose.size_id,
          },
          withCredentials: true,
        }
      );
      if (response.data.status) {
        notify(true, response.data.message);
        loadData(response.data.data);
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigate("/account/login", { replace: true });
        }
      }
    } else if (status === "admin_edit_delete_image") {
      const response = await axios.delete(
        `${ApiLink.domain + "/admin/image/" + id_handle}`,
        {
          data: {
            image_id: itemChoose.image_id,
          },
          withCredentials: true,
        }
      );
      if (response.data.status) {
        notify(true, response.data.message);
        loadData(response.data.data);
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigate("/account/login", { replace: true });
        }
      }
    } else if (status === "admin_edit_delete_role") {
      const response = await axios.delete(
        `${ApiLink.domain + "/admin/roleuser/" + id_handle}`,
        {
          data: {
            role_id: itemChoose.role_id,
          },
          withCredentials: true,
        }
      );
      if (response.data.status) {
        notify(true, response.data.message);
        loadData(response.data.data);
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        }
      }
    } else if (status === "delivery_order_success") {
      const orderStatus = {};
      const response = await axios.post(
        `${ApiLink.domain + "/delivery/orderSuccess/" + itemChoose.order_id}`,
        orderStatus,
        {
          withCredentials: true,
        }
      );
      if (response.data.status) {
        notify(true, response.data.message);
        loadData(response.data.data);
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigate("/", { replace: true });
        }
      }
    }
  };

  const handleCloseEvent = () => {
    closeFormConfirm();
  };
  return (
    <div className="confirm_container remove_customer_class bg-white">
      <div
        className="confirm_header text-white bg-primary"
        style={{ padding: 10, fontWeight: 700 }}
      >
        <i className="fas fa-check-circle" style={{ color: "#47f764" }} />
        <span style={{ marginLeft: 3 }}>Xác Nhận</span>
      </div>
      <div
        className="confirm_content"
        style={{ padding: 10, textAlign: "center" }}
      >
        {content} <b>{id_handle}</b>
      </div>
      <div className="confirm_buttons">
        <div id="formDelete">
          <input type="hidden" id="inputDelete" name="user_id" />
          <button
            onClick={() => handleEvent()}
            className="btn btn-success me-1 mb-2 btn_xacnhan_xoa"
            style={{ margin: "0px 10px" }}
            type="button"
          >
            Xác Nhận
          </button>
        </div>
        <button
          onClick={() => handleCloseEvent()}
          className="btn btn-danger me-1 mb-2 btn_huy_xoa"
          style={{ margin: "0px 10px" }}
          type="button"
        >
          Hủy
        </button>
      </div>
    </div>
  );
}
