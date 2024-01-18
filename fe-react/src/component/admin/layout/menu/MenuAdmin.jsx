import { useSelector } from "react-redux";
import "./style.css";
import { selectLanguage } from "../../../../language/selectLanguage";
import { BsFillBoxSeamFill, BsShopWindow } from "react-icons/bs";
import { RiBillLine } from "react-icons/ri";
import { FaBuffer, FaUserFriends, FaTag } from "react-icons/fa";
import { SiZerodha } from "react-icons/si";
import { AiOutlineBgColors } from "react-icons/ai";
import { SiSteelseries } from "react-icons/si";
import { MdGroupWork, MdArchitecture } from "react-icons/md";
import { TbLayoutDashboard, TbPackages } from "react-icons/tb";
import { useState } from "react";
import { Menu } from "antd";
import { RiRefundFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { BsPercent } from "react-icons/bs";
import { FcIdea } from "react-icons/fc";
import { checkAdmin, checkRole } from "../../../../extensions/checkRole";
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
    <Link to={"/admin/bantaiquay"}>Bán hàng tại quầy</Link>,
    "62",
    <BsShopWindow />
  ),
  getItem(<Link to={"/admin/doitra"}>Đổi trả</Link>, "64", <RiRefundFill />),
  getItem(<Link to={"/admin/voucher"}>Voucher</Link>, "68", <BsPercent />),
];
if (checkAdmin()) {
  items.push(
    getItem(
      <Link to={"/admin/nguoidung"}>Quản lý người dùng</Link>,
      "63",
      <FaUserFriends />
    )
  );
  items.push(
    getItem("Đánh giá", "sub5", <FaTag />, [
      getItem(
        <Link to={"/admin/crm"}>Sản phẩm doanh thu</Link>,
        "65",
        <FcIdea />
      ),
    ])
  );
}
const rootSubmenuKeys = ["sub1", "sub2", "sub4"];
function MenuAdmin() {
  checkRole();

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
