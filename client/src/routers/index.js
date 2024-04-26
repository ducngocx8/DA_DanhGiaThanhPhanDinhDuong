import Home from "../pages/Home";
import LoginSignup from "../pages/LoginSignup";
import Login from "../components/Layouts/UserLogin/Login";
import Signup from "../components/Layouts/UserLogin/Signup";
import CartUser from "../pages/CartUser";
import UserInfo from "../components/Layouts/Account/UserInfo";
import ForgotPassword from "../components/Layouts/UserLogin/ForgotPassword";
import LaoDongAdmin from "../components/Layouts/Admin/LaoDongAdmin";
import CustomerAdmin from "../components/Layouts/Admin/CustomerAdmin";
import StatisticsAdmin from "../components/Layouts/Admin/StatisticsAdmin";
import RoleAdmin from "../components/Layouts/Admin/RoleAdmin";
import Logout from "../components/Layouts/Account/Logout";
import BuaAnAdmin from "../components/Layouts/Admin/BuaAnAdmin";
import AdminPage from "../pages/Admin";
import OTPAdmin from "../components/Layouts/Admin/OTPAdmin";
import ResendEmail from "../components/Layouts/UserLogin/ResendEmail";
import VerifyEmail from "../components/Layouts/UserLogin/VerifyEmail";
import SearchMonAn from "../pages/SearchMonAn";
import InvoiceLayout from "../components/Layouts/SympleLayout/Invoice";
import Post from "../pages/Post";
import PostDetail from "../pages/PostDetail";
import FoodDetail from "../pages/FoodDetail";
import FoodCategory from "../pages/FoodCategory";
import ThucPhamDetail from "../pages/ThucPhamDetail";
import ThucPhamCategoryPage from "../pages/ThucPhamCategoryPage";
import ThucPhamPage from "../pages/ThucPhamPage";
import DuongChatPage from "../pages/DuongChatPage";
import UserIndex from "../components/Layouts/Account/UserIndex";
import Nutrition from "../components/Layouts/Account/Nutrition";
import DoiTuongAdmin from "../components/Layouts/Admin/DoiTuongAdmin";
import NhomTuoiAdmin from "../components/Layouts/Admin/NhomTuoiAdmin";
import ThanhPhanNhuCauAdmin from "../components/Layouts/Admin/ThanhPhanNhuCauAdmin";
import NhuCauHangNgayAdmin from "../components/Layouts/Admin/NhuCauHangNgayAdmin";
import NhomThucPhamAdmin from "../components/Layouts/Admin/NhomThucPhamAdmin";
import NhomMonAnAdmin from "../components/Layouts/Admin/NhomMonAnAdmin";
import ThucPhamAdmin from "../components/Layouts/Admin/ThucPhamAdmin";
import MonAnAdmin from "../components/Layouts/Admin/MonAnAdmin";
import NgayAnAdmin from "../components/Layouts/Admin/NgayAnAdmin";
import ChiSoUserAdmin from "../components/Layouts/Admin/ChiSoUserAdmin";
import SearchThucPham from "../pages/SearchThucPham";
import UserMucTieu from "../components/Layouts/Account/UserMucTieu";
import NhuCauDinhDuongPage from "../pages/NhuCauDinhDuongPage";
import ChiSoDuongHuyetPage from "../pages/ChiSoDuongHuyetPage";
import UserKhuyenNghi from "../components/Layouts/Account/UserKhuyenNghi";
import UserMonAn from "../components/Layouts/Account/UserMonAn";
import MucTieuAdmin from "../components/Layouts/Admin/MucTieuAdmin";
import ChiSoDuongHuyetAdmin from "../components/Layouts/Admin/ChiSoDuongHuyetAdmin";
import DinhDuongMonAnPage from "../pages/DinhDuongMonAnPage";
import ThongKeDinhDuong from "../components/Layouts/Account/ThongKeDinhDuong";
import ChuyenMucAdmin from "../components/Layouts/Admin/ChuyenMucAdmin";
import BaiVietAdmin from "../components/Layouts/Admin/BaiVietAdmin";
import DonViAdmin from "../components/Layouts/Admin/DonViAdmin";
import ChuyenMucPage from "../pages/ChuyenMucPage";
import TacGiaPage from "../pages/TacGiaPage";
import LichSuLogAdmin from "../components/Layouts/Admin/LichSuLogAdmin";
import ThongBaoAdmin from "../components/Layouts/Admin/ThongBaoAdmin";
import BMIPage from "../pages/BMIPage";
import ThucDonPage from "../pages/ThucDonPage";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/account/login", component: LoginSignup, layout: Login },
  { path: "/account/signup", component: LoginSignup, layout: Signup },
  {
    path: "/account/lost-password",
    component: LoginSignup,
    layout: ForgotPassword,
  },
  {
    path: "/account/verify/email/:email/:token",
    component: LoginSignup,
    layout: VerifyEmail,
  },
  {
    path: "/account/resend-email",
    component: LoginSignup,
    layout: ResendEmail,
  },
  {
    path: "/account/index",
    component: CartUser,
    layout: UserIndex,
    active_id: 2,
  },
  {
    path: "/account/muc-tieu",
    component: CartUser,
    layout: UserMucTieu,
    active_id: 3,
  },
  {
    path: "/account/nutrition",
    component: CartUser,
    layout: Nutrition,
    active_id: 4,
  },
  {
    path: "/account/khuyen-nghi",
    component: CartUser,
    layout: UserKhuyenNghi,
    active_id: 5,
  },
  {
    path: "/account/mon-an",
    component: CartUser,
    layout: UserMonAn,
    active_id: 6,
  },
  {
    path: "/account/thong-ke-dinh-duong",
    component: CartUser,
    layout: ThongKeDinhDuong,
    active_id: 7,
  },
  {
    path: "/account/info",
    component: CartUser,
    layout: UserInfo,
    active_id: 1,
  },
  { path: "/account/logout", component: Logout },
  {
    path: "/category/:id",
    component: FoodCategory,
  },
  {
    path: "/product/:id",
    component: FoodDetail,
  },

  { path: "/dinh-duong", component: ThucPhamPage },
  { path: "/duong-chat", component: DuongChatPage },
  { path: "/nhu-cau-dinh-duong", component: NhuCauDinhDuongPage },
  { path: "/chi-so-duong-huyet", component: ChiSoDuongHuyetPage },
  { path: "/duong-chat-mon-an", component: DinhDuongMonAnPage },
  { path: "/bmi-online", component: BMIPage },
  { path: "/goi-y-thuc-don", component: ThucDonPage },

  {
    path: "/dinh-duong/category/:id",
    component: ThucPhamCategoryPage,
  },
  {
    path: "/dinh-duong/:id",
    component: ThucPhamDetail,
  },

  {
    path: "/chuyen-muc/:id",
    component: ChuyenMucPage,
  },
  {
    path: "/tac-gia/:id",
    component: TacGiaPage,
  },
  {
    path: "/tin-tuc",
    component: Post,
  },
  {
    path: "/post/:slug.htm",
    component: PostDetail,
  },
];

const privateRoutes = [
  {
    path: "/admin/lao-dong",
    component: AdminPage,
    layout: LaoDongAdmin,
    active_id: "ADMIN_LAODONG",
  },
  {
    path: "/admin/doi-tuong",
    component: AdminPage,
    layout: DoiTuongAdmin,
    active_id: "ADMIN_DOITUONG",
  },
  {
    path: "/admin/nhom-tuoi",
    component: AdminPage,
    layout: NhomTuoiAdmin,
    active_id: "ADMIN_NHOMTUOI",
  },
  {
    path: "/admin/nhu-cau-hang-ngay",
    component: AdminPage,
    layout: NhuCauHangNgayAdmin,
    active_id: "ADMIN_NHUCAUHANGNGAY",
  },
  {
    path: "/admin/thanh-phan-nhu-cau",
    component: AdminPage,
    layout: ThanhPhanNhuCauAdmin,
    active_id: "ADMIN_THANHPHANNHUCAU",
  },
  {
    path: "/admin/thuc-pham",
    component: AdminPage,
    layout: ThucPhamAdmin,
    active_id: "ADMIN_THUCPHAM",
  },
  {
    path: "/admin/mon-an",
    component: AdminPage,
    layout: MonAnAdmin,
    active_id: "ADMIN_MONAN",
  },
  {
    path: "/admin/ngay-an",
    component: AdminPage,
    layout: NgayAnAdmin,
    active_id: "ADMIN_NGAYAN",
  },
  {
    path: "/admin/chi-so-user",
    component: AdminPage,
    layout: ChiSoUserAdmin,
    active_id: "ADMIN_CHISOUSER",
  },
  {
    path: "/admin/customer",
    component: AdminPage,
    layout: CustomerAdmin,
    active_id: "ADMIN_CUSTOMER",
  },
  {
    path: "/admin/statistic",
    component: AdminPage,
    layout: StatisticsAdmin,
    active_id: "ADMIN_STATISTIC",
  },
  {
    path: "/admin/bua-an",
    component: AdminPage,
    layout: BuaAnAdmin,
    active_id: "ADMIN_BUAAN",
  },
  {
    path: "/admin/nhom-mon-an",
    component: AdminPage,
    layout: NhomMonAnAdmin,
    active_id: "ADMIN_NHOMMONAN",
  },
  {
    path: "/admin/nhom-thuc-pham",
    component: AdminPage,
    layout: NhomThucPhamAdmin,
    active_id: "ADMIN_NHOMTHUCPHAM",
  },
  {
    path: "/admin/muc-tieu",
    component: AdminPage,
    layout: MucTieuAdmin,
    active_id: "ADMIN_MUCTIEU",
  },
  {
    path: "/admin/chuyen-muc",
    component: AdminPage,
    layout: ChuyenMucAdmin,
    active_id: "ADMIN_CHUYENMUC",
  },
  {
    path: "/admin/bai-viet",
    component: AdminPage,
    layout: BaiVietAdmin,
    active_id: "ADMIN_BAIVIET",
  },
  {
    path: "/admin/don-vi",
    component: AdminPage,
    layout: DonViAdmin,
    active_id: "ADMIN_DONVI",
  },
  {
    path: "/admin/chi-so-duong-huyet",
    component: AdminPage,
    layout: ChiSoDuongHuyetAdmin,
    active_id: "ADMIN_CHISODUONGHUYET",
  },
  {
    path: "/admin/role",
    component: AdminPage,
    layout: RoleAdmin,
    active_id: "ADMIN_ROLE",
  },
  {
    path: "/admin/lich-su-log",
    component: AdminPage,
    layout: LichSuLogAdmin,
    active_id: "ADMIN_LICHSULOG",
  },
  {
    path: "/admin/otp",
    component: AdminPage,
    layout: OTPAdmin,
    active_id: "ADMIN_OTP",
  },
  {
    path: "/admin/thong-bao",
    component: AdminPage,
    layout: ThongBaoAdmin,
    active_id: "ADMIN_THONGBAO",
  },
  {
    path: "/search",
    component: SearchMonAn,
  },
  {
    path: "/dinh-duong/search",
    component: SearchThucPham,
  },
  {
    path: "/invoice",
    component: InvoiceLayout,
  },
];

export { publicRoutes, privateRoutes };
