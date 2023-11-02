import { useSelector } from "react-redux";
import "./style.css";
import { selectLanguage } from "../../../language/selectLanguage";
import GioHang from "../../home/giohang/GioHang";
import { useState } from "react";
import MenuLeft from "../menuleft/MenuLeft";
import { HiMenuAlt2 } from "react-icons/hi";
import { FiSearch, FiHeart } from "react-icons/fi";
import { LuShoppingCart } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import Search from "../search/Search";
import YeuThich from "../../home/yeuthich/YeuThich";
import { Breadcrumb } from "antd";
function Header() {
  const language = useSelector(selectLanguage);
  const [openGioHang, setOpenGioHang] = useState(false);
  const [openYeuThich, setOpenYeuThich] = useState(false);
  const [openMenuLeft, setOpenMenuLeft] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  return (
    <>
      <GioHang open={openGioHang} setOpen={setOpenGioHang} />
      <YeuThich open={openYeuThich} setOpen={setOpenYeuThich} />
      <MenuLeft open={openMenuLeft} setOpen={setOpenMenuLeft} />
      <Search open={openSearch} setOpen={setOpenSearch} />
      <div className="header-container">
        <div className="gif-img">
          <img
            src="https://routine.vn/media/wysiwyg/SALE_UP_TO_50_-_T1023_16_.gif"
            alt="hinh anh"
          />
        </div>
        <div className="menu">
          <div className="left-menu">
            <div
              onClick={() => {
                setOpenMenuLeft(true);
              }}
            >
              <HiMenuAlt2 />
            </div>
          </div>
          <div className="mid-menu">
            <img
              src="https://routine.vn/media/logo/websites/1/logo-black-2x.png"
              alt="logo"
            />
            <Breadcrumb
              items={[
                {
                  title: "Home",
                },
                {
                  title: <a href="">Application Center</a>,
                },
              ]}
            />
          </div>
          <div className="right-menu">
            <div
              className="input-search"
              onClick={() => {
                setOpenSearch(true);
              }}
            >
              <FiSearch />
              <span>{language.header.search.inputHolder}</span>
            </div>
            <div className="icon-right">
              <div>
                <FaRegUser />
              </div>
              <div
                onClick={() => {
                  setOpenYeuThich(true);
                }}
              >
                <FiHeart />
              </div>
              <div
                onClick={() => {
                  setOpenGioHang(true);
                }}
              >
                <LuShoppingCart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
