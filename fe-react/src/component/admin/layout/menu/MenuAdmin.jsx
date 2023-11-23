import { useSelector } from "react-redux";
import "./style.css";
import { selectLanguage } from "../../../../language/selectLanguage";
import { BsFillBoxSeamFill, BsShopWindow } from "react-icons/bs";
import { RiBillLine } from "react-icons/ri";
import { FaBuffer, FaUserFriends, FaTag  } from "react-icons/fa";
import { SiZerodha } from "react-icons/si";
import { AiOutlineBgColors } from "react-icons/ai";
import { SiSteelseries } from "react-icons/si";
import { MdGroupWork, MdArchitecture } from "react-icons/md";
import { TbLayoutDashboard, TbPackages } from "react-icons/tb";
import { BsPercent } from 'react-icons/bs';
import { useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem(
    <Link to={"/admin/dashboard"}>Dashboard</Link>,
    "1",
    <TbLayoutDashboard />
  ),
  getItem("Quản lý sản phẩm", "sub1", <BsFillBoxSeamFill />, [
    getItem(
      <Link to={"/admin/sanpham"}>Sản phẩm</Link>,
      "2",
      <BsFillBoxSeamFill />
    ),
    getItem(
      <Link to={"/admin/sanpham/sanphamchitiet"}>Sản phẩm chi tiết</Link>,
      "3",
      <TbPackages />
    ),
    getItem("Thuộc tính", "10", <FaBuffer />, [
      getItem(
        <Link to={"/admin/sanpham/chatlieu"}>Chất liệu</Link>,
        "4",
        <SiSteelseries />
      ),
      getItem(
        <Link to={"/admin/sanpham/nhomsanpham"}>Nhóm sản phẩm</Link>,
        "5",
        <MdGroupWork />
      ),
      getItem(
        <Link to={"/admin/sanpham/thietke"}>Thiết kế</Link>,
        "6",
        <MdArchitecture />
      ),
      getItem(
        <Link to={"/admin/sanpham/mausac"}>Màu sắc</Link>,
        "7",
        <AiOutlineBgColors />
      ),
      getItem(
        <Link to={"/admin/sanpham/kichthuoc"}>Kích thước</Link>,
        "8",
        <SiZerodha />
      ),
    ]),
  ]),
  getItem(
    <Link to={"/admin/hoadon"}>Quản lý hóa đơn</Link>,
    "9",
    <RiBillLine />
  ),
  getItem(
    <Link to={"/admin/sanpham"}>Quản lý người dùng</Link>,
    "63",
    <FaUserFriends />
  ),
  getItem(
    <Link to={"/admin/sanpham"}>Bán hàng tại quầy</Link>,
    "62",
    <BsShopWindow />
  ),
  getItem("Quản lý sự kiện", "sub5", <FaTag  />, [
    getItem(
      <Link to={"/admin/sukiengiamgia"}>Sự kiện giảm giá</Link>,
      "2",
      <BsPercent  />
    ),
    getItem(
      <Link to={"/admin/sukiengiamgia/sanphamsukien"}>Sản phẩm sự kiện</Link>,
      "3",
      <TbPackages />
    ),
  ]),
];

const rootSubmenuKeys = ["sub1", "sub2", "sub4"];
function MenuAdmin() {
  const language = useSelector(selectLanguage);
  const [openKeys, setOpenKeys] = useState(["sub1"]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
    console.log(keys);
  };
  return (
    <>
      <div className="menu-container">
        <Menu
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          style={{ width: "100%", height: "100vh" }}
          items={items}
        />
      </div>
    </>
  );
}

export default MenuAdmin;
