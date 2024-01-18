import { useSelector } from "react-redux";
import "./style.css";
import { selectLanguage } from "../../../../language/selectLanguage";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Dropdown } from "antd";
function Header() {
  const language = useSelector(selectLanguage);
  var nguoiDung = JSON.parse(localStorage.getItem("user"))?.data?.nguoiDung;
  const items = [
    {
      key: '1',
      label: (
        <a onClick={() => {
          localStorage.removeItem('user')
          window.location = "http://localhost:3000/"
        }} href="#">
          Đăng xuất
        </a>
      ),
    },
  ];
  return (
    <>
      <div className="header-admin-container">
        <div
          className="shop-logo"
          onClick={() => {
            window.location = "http://localhost:3000/";
          }}
        >
          <img
            src="https://routine.vn/media/logo/websites/1/logo-black-2x.png"
            alt="logo"
          />
        </div>
        <div className="user">
          <div className="user-detail">
            <img
              style={{
                height: "40px",
                width: "40px",
                borderRadius: "50%"
              }}
              src={nguoiDung.anhDaiDien}
              alt="avatar"
            />
            <div className="detail">
              <span className="name">{nguoiDung.ho + " " + nguoiDung.ten}</span>
              <span className="role">Nhân viên</span>
            </div>
          </div>
          <div className="header-menu">
            <Dropdown
              menu={{
                items,
              }}
              placement="bottomLeft"
              onOpenChange={(e) => {
                console.log(e);
              }}
            >
              <FiMenu />

            </Dropdown>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
