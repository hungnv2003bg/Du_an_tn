import { useSelector } from "react-redux";
import "./style.css";
import { selectLanguage } from "../../../../language/selectLanguage";
import { FiMenu } from "react-icons/fi";
function Header() {
  const language = useSelector(selectLanguage);
  return (
    <>
      <div className="header-admin-container">
        <div className="shop-logo">
          <img
            src="https://routine.vn/media/logo/websites/1/logo-black-2x.png"
            alt="logo"
          />
        </div>
        <div className="user">
          <div className="user-detail">
            <img
              src="https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/379521011_675846677940789_4050907554625756958_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=E-YlJ5g8XJwAX-KxmPT&_nc_ht=scontent.fhan14-2.fna&_nc_e2o=s&oh=00_AfBkxNSF3AVfvjbf2MwxCc0HIVGUG1d8PvRZ1dN4vNjKHg&oe=65274FE3"
              alt="avatar"
            />
            <div className="detail">
              <span className="name">Cầu vồng sociu</span>
              <span className="role">Trợ lý HLV</span>
            </div>
          </div>
          <div className="header-menu">
            <FiMenu />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;