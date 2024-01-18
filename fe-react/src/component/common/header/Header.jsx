import { useSelector } from "react-redux";
import "./style.css";
import { selectLanguage } from "../../../language/selectLanguage";
import GioHang from "../../home/giohang/GioHang";
import { useEffect, useState } from "react";
import MenuLeft from "../menuleft/MenuLeft";
import { HiMenuAlt2 } from "react-icons/hi";
import { FiSearch, FiHeart } from "react-icons/fi";
import { LuShoppingCart } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import Search from "../search/Search";
import YeuThich from "../../home/yeuthich/YeuThich";
import { Badge, Breadcrumb, Input, notification } from "antd";
import { Link } from "react-router-dom";
import { SearchOutlined } from '@ant-design/icons';
import { useGioHang } from "./useGioHang";
function Header() {
  const language = useSelector(selectLanguage);
  const user = JSON.parse(localStorage.getItem("user"))?.data
  const [openGioHang, setOpenGioHang] = useState(false);
  const [openYeuThich, setOpenYeuThich] = useState(false);
  const [openMenuLeft, setOpenMenuLeft] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, title, des, placement) => {
    if (type === "error") {
      api.error({
        message: title,
        description: des,
        placement,
      });
    } else {
      api.success({
        message: title,
        description: des,
        placement,
      });
    }
  };
  function handleRedirect() {
    if (user.nguoiDung.id == -1) {
      openNotification(
        "error",
        language.systemNotification.system,
        "Bạn chưa đăng nhập",
        "bottomRight"
      );
      setTimeout(() => {
        window.location.href = process.env.REACT_APP_FRONTEND_URL + "login";
      }, 1000);
      return;
    }
    window.location.href =
      process.env.REACT_APP_FRONTEND_URL + "profile/" + user.nguoiDung.id;
  }
  const [gioHang, setGioHang] = useState(undefined)
  const [yeuThich, setYeuThich] = useState(undefined)
  async function handleLayGioHang() {
    if (user) {
      const data = await useGioHang.actions.layGioHang(user.nguoiDung.id)
      setGioHang(data.data.data)
    }
  }
  async function handleLayYeuThich() {
    if (user) {
      const data = await useGioHang.actions.layYeuThich(user.nguoiDung.id)
      setYeuThich(data.data)
    }
  }
  useEffect(() => {
    handleLayGioHang()
    handleLayYeuThich()
  }, [openGioHang, openYeuThich])
  function handleSearch() {
    window.location = 'http://localhost:3000/'
  }
  return (
    <>
      {contextHolder}
      <GioHang handleLayGioHang={handleLayGioHang} gioHang={gioHang} open={openGioHang} setOpen={setOpenGioHang} />
      <YeuThich handleLayYeuThich={handleLayYeuThich} yeuThich={yeuThich} open={openYeuThich} setOpen={setOpenYeuThich} />
      <MenuLeft open={openMenuLeft} setOpen={setOpenMenuLeft} />
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
            <Link to="/">
              <img
                src="https://routine.vn/media/logo/websites/1/logo-black-2x.png"
                alt="logo"
              />
            </Link>
            <Breadcrumb
              items={[
                {
                  title: "Home",
                },
                {
                  title: <a href="">Trang chủ</a>,
                },
              ]}
            />
          </div>
          <div className="right-menu">
            <Input onChange={(e) => {
              localStorage.setItem("search", e.target.value)
            }} addonBefore={<SearchOutlined />} blur placeholder="Tìm kiếm" onPressEnter={handleSearch} />
            <div className="icon-right">
              <div
                style={{
                  height: "20px"
                }}
                onClick={() => {
                  var nguoiDung = JSON.parse(localStorage.getItem("user"));
                  if (nguoiDung) {
                    handleRedirect();
                    return;
                  } else {
                    window.location = "http://localhost:3000/login/page1";
                  }
                }}
              >
                <FaRegUser />
              </div>
              <Badge count={yeuThich ? yeuThich.length : 0}>
                <div
                  style={{
                    height: "20px"
                  }}
                  onClick={() => {
                    setOpenYeuThich(true);
                  }}
                >
                  <FiHeart />
                </div>
              </Badge>
              <Badge count={gioHang ? gioHang.length : 0}>
                <div
                  style={{
                    height: "20px"
                  }}
                  onClick={() => {
                    setOpenGioHang(true);
                  }}
                >
                  <LuShoppingCart />
                </div>
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
