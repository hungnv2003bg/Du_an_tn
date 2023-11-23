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
import SuKienGiamGia  from "./component/admin/sukiengiamgia/SuKienGiamGia";
import SanPhamSuKien  from "./component/admin/sukiengiamgia/sanphamsukien/SanPhamSuKien";
import HuyDon from "./component/home/giohangthanhtoan/HuyDon";
import Profile from "./component/home/profile/Profile";
import HoaDon from "./component/admin/hoadon/HoaDon";
import ChatLieu from "./component/admin/product/chatlieu/ChatLieu";
import NhomSanPham from "./component/admin/product/nhomsanpham/NhomSanPham";
import ThietKe from "./component/admin/product/thietke/ThietKe";
import MauSac from "./component/admin/product/mausac/MauSac";
import KichThuoc from "./component/admin/product/kichthuoc/KichThuoc";
import SanPhamChiTiet from "./component/admin/product/sanphamchitiet/SanPhamChiTiet";
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
        <Route path="/*" element={<NotFound />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sanpham/:id" element={<ProductDetail />} />
        <Route path="/thanhtoan" element={<GioHangThanhToan />} />
        <Route path="/admin/sanpham" element={<Product />} />
        <Route path="/vnpay/ketqua" element={<HuyDon />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/admin/hoadon" element={<HoaDon />} />
        <Route path="/admin/sukiengiamgia" element={<SuKienGiamGia />} />
        <Route path="/admin/sukiengiamgia/sanphamsukien" element={<SanPhamSuKien />} />
        <Route path="/admin/dashboard" element={<DashBoard />} />
        <Route path="/admin/sanpham/chatlieu" element={<ChatLieu />} />
        <Route path="/admin/sanpham/nhomsanpham" element={<NhomSanPham />} />
        <Route path="/admin/sanpham/thietke" element={<ThietKe />} />
        <Route path="/admin/sanpham/mausac" element={<MauSac />} />
        <Route path="/admin/sanpham/kichthuoc" element={<KichThuoc />} />
        <Route path="/admin/sanpham/sanphamchitiet" element={<SanPhamChiTiet />} />
      </Routes>
    </>
  );
}

export default App;
