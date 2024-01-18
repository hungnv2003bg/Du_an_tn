import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./component/login/Login";
import { useDispatch } from "react-redux";
import languageSlice from "./language/languageSlice";
import { vi } from "./language/vi";
import { en } from "./language/en";
import NotFound from "./component/notfound/NotFound";
import HomePage from "./component/home/HomePage";
import DashBoard from "./component/admin/dashboard/DashBoard";
import ProductDetail from "./component/home/productdetail/ProductDetail";
import userSlice from "./component/login/userSlice";
import { useEffect } from "react";
import GioHangThanhToan from "./component/home/giohangthanhtoan/GioHangThanhToan";
import Product from "./component/admin/product/Product";
import HuyDon from "./component/home/giohangthanhtoan/HuyDon";
import Profile from "./component/home/profile/Profile";
import HoaDon from "./component/admin/hoadon/HoaDon";
import ChatLieu from "./component/admin/product/chatlieu/ChatLieu";
import NhomSanPham from "./component/admin/product/nhomsanpham/NhomSanPham";
import ThietKe from "./component/admin/product/thietke/ThietKe";
import MauSac from "./component/admin/product/mausac/MauSac";
import KichThuoc from "./component/admin/product/kichthuoc/KichThuoc";
import SanPhamChiTiet from "./component/admin/product/sanphamchitiet/SanPhamChiTiet";
import BanTaiQuay from "./component/admin/bantaiquay/BanTaiQuay";
import DoiTra from "./component/admin/doitra/DoiTra";
import NguoiDung from "./component/admin/nguoidung/NguoiDung";
import CRM from "./component/admin/crm/CRM";
import GioiThieu from "./component/policy/GioiThieu";
import ChinhSachBaoMat from "./component/policy/ChinhSachBaoMat";
import Voucher from "./component/admin/voucher/Voucher";
import GiftVoucher from "./component/admin/giftvoucher/GiftVoucher";
import ThanhToanVnPay from "./component/admin/bantaiquay/ThanhToanVnPay";
import Voucher2 from "./component/admin/voucher2/Voucher2";
import ThanhToanChoXacNhan from "./component/home/giohangthanhtoan/ThanhToanChoXacNhan";

import Doitra from "./component/policy/Doitra";
import Phuongthucthanhtoan from "./component/policy/Phuongthucthanhtoan";
import Huongdandathang from "./component/policy/Huongdandathang";
import Luuymuahang from "./component/policy/Luuykhimuahang";

import Thongtin from "./component/policy/Thongtin";




import SignIn from "./component/login/SignIn";
import ThanhCong from "./component/login/ThanhCong";
import CornfirmTaiKhoan from "./component/login/ConfirmTaiKhoan";
import XacNhanThanhCong from "./component/login/XacNhanThanhCong";
import QuenMatKhau from "./component/login/QuenMatKhau";
import ThanhCong2 from "./component/login/ThanhCong2";
import DoiMatKhau from "./component/login/DoiMatKhau";
import DoiThanhCong from "./component/login/DoiThanhCong";

function App() {
  const dispath = useDispatch();
  const disPath = useDispatch();
  useEffect(() => {
    let language = localStorage.getItem("language");
    if (language === null) {
      language = "vi";
      dispath(languageSlice.actions.setLanguage(vi));
      localStorage.setItem("language", "vi");
    } else {
      switch (language) {
        case "vi":
          dispath(languageSlice.actions.setLanguage(vi));
          break;
        case "en":
          dispath(languageSlice.actions.setLanguage(en));
          break;
        default:
      }
    }
    const user = localStorage.getItem("user");
    if (user) {
      disPath(userSlice.actions.dangNhap(JSON.parse(user).data));
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path="/admin/voucher" element={<Voucher2 />} />
        <Route path="/admin/giftvoucher" element={<GiftVoucher />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login/:status" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/quenmatkhau" element={<QuenMatKhau />} />
        <Route path="/xacnhanthanhcong" element={<XacNhanThanhCong />} />
        <Route path="/thanhcongcheckemail/:id" element={<ThanhCong />} />
        <Route path="/thanhcongcheckemail2/" element={<ThanhCong2 />} />
        <Route path="/doimatkhau/:id" element={<DoiMatKhau />} />
        <Route path="/doithanhcong" element={<DoiThanhCong />} />
        <Route path="/xacnhan/:id" element={<CornfirmTaiKhoan />} />
        <Route path="/sanpham/:id" element={<ProductDetail />} />
        <Route path="/thanhtoan" element={<GioHangThanhToan />} />
        <Route path="/admin/sanpham" element={<Product />} />
        <Route path="/vnpay/ketqua" element={<HuyDon />} />
        <Route path="/vnpay/checkout" element={<ThanhToanChoXacNhan />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/admin/hoadon" element={<HoaDon />} />
        <Route path="/admin/dashboard" element={<DashBoard />} />
        <Route path="/admin/sanpham/chatlieu" element={<ChatLieu />} />
        <Route path="/admin/sanpham/nhomsanpham" element={<NhomSanPham />} />
        <Route path="/admin/sanpham/thietke" element={<ThietKe />} />
        <Route path="/admin/sanpham/mausac" element={<MauSac />} />
        <Route path="/admin/sanpham/kichthuoc" element={<KichThuoc />} />
        <Route path="/admin/doitra" element={<DoiTra />} />
        <Route path="/admin/nguoidung" element={<NguoiDung />} />
        <Route path="/admin/crm" element={<CRM />} />
        <Route
          path="/admin/sanpham/sanphamchitiet"
          element={<SanPhamChiTiet />}
        />
        <Route path="/admin/bantaiquay" element={<BanTaiQuay />} />
        <Route path="/admin/vnpaytrangthai" element={<ThanhToanVnPay />} />
        <Route path="/gioi-thieu" element={<GioiThieu />} />
        <Route path="/chinh-sach-bao-mat" element={<ChinhSachBaoMat />} />
        <Route path="/chinh-sach-doi-tra" element={<Doitra />} />
        <Route path="/phuong-thuc-thanh-toan" element={<Phuongthucthanhtoan />} />
        <Route path="/thong-tin-lien-he" element={<Thongtin/>} />
        <Route path="/huong-dan-dat-hang" element={<Huongdandathang/>} />
        <Route path="/luu-y-mua-hang" element={<Luuymuahang/>} />


      </Routes>
    </>
  );
}

export default App;
