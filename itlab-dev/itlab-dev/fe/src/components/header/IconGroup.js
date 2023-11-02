import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import MenuCart from "./sub-components/MenuCart";
import {
  deleteAllFromCart,
  deleteFromCart,
} from "../../redux/actions/cartActions";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import OrderApi from "../../api/order/OrderApi";
import LoadingSpin from "../loading/LoadingSpin";
import { message } from "antd";
import { useToasts } from "react-toast-notifications";

const IconGroup = ({
  currency,
  cartData,
  wishlistData,
  compareData,
  deleteFromCart,
  iconWhiteClass,
  deleteAllFromCart,
}) => {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();
  const [messageApi, contextHolder] = message.useMessage();
  const history = useHistory();
  const handleClick = (e) => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };
  const [inputCode, setInputCode] = useState("");
  const submitForCode = async (e) => {
    e.preventDefault();
    if (!inputCode) {
      return;
    }
    try {
      setLoading(true);
      const res = await OrderApi.GetOrderForCode(inputCode);
      setLoading(false);
      messageApi.open({
        type: "success",
        content: "Đang gửi thông báo đơn đến mail của bạn",
      });
    } catch (error) {
      setLoading(false);
      messageApi.open({
        type: "error",
        content: "Mã hóa đơn không tồn tại",
      });
    }
  };
  const handleLogout = () => {
    deleteAllFromCart(addToast);
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("user");
    setTimeout(() => {
      history.push("/login-register");
    }, 500);
  };
  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };
  const [userLogin, setUserLogin] = useState(
    localStorage.getItem("user") || ""
  );
  const [avartar, setAvatar] = useState("");
  useEffect(() => {
    // Lưu biến vào localStorage khi thay đổi
    localStorage.setItem("dynamicVariable", userLogin);
    if (localStorage.getItem("user")) {
      setAvatar(JSON.parse(localStorage.getItem("user")).avartar);
    }
  }, [userLogin]);
  const Token = localStorage.getItem("token");
  let isAdmin = false;
  if (Token) {
    try {
      const { role } = JSON.parse(atob(Token?.split(".")[1]));
      isAdmin = role === "admin";
    } catch (error) {
      console.error("Lỗi giải mã hoặc truy cập vai trò: ", error.message);
    }
  } else {
    console.log("Không tìm thấy mã thông báo hoặc không hợp lệ.");
  }
  return (
    <div
      className={`header-right-wrap ${iconWhiteClass ? iconWhiteClass : ""}`}>
      <div className="same-style header-search d-none d-lg-block">
        <button className="search-active" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-search" />
        </button>
        <div className="search-content">
          <form action="#">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Nhập mã đơn hàng..."
            />
            <button className="button-search" onClick={(e) => submitForCode(e)}>
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>
      </div>
      <div className="same-style account-setting d-none d-lg-block">
        <button
          className="account-setting-active"
          onClick={(e) => handleClick(e)}>
          {userLogin !== "" ? (
            <img
              style={{
                width: "35px",
                height: "35px",
                borderRadius: "35px",
              }}
              src={avartar}
              alt="polyfood"
            />
          ) : (
            <i className="pe-7s-user-female" />
          )}
        </button>
        {contextHolder}
        {loading && (
          <div>
            <LoadingSpin />
          </div>
        )}
        <div className="account-dropdown">
          <ul>
            {isAdmin ? (
              <li>
                <Link to={process.env.PUBLIC_URL + "/admin"}>
                  Trang quản trị
                </Link>
                <Link to={process.env.PUBLIC_URL + "/my-account"}>
                  Tài Khoản của tôi
                </Link>
                <Link to={process.env.PUBLIC_URL + "/order-history"}>
                  Lịch sử đơn hàng
                </Link>
                <Link to={process.env.PUBLIC_URL + "/"} onClick={handleLogout}>
                  Đăng Xuất
                </Link>
              </li>
            ) : (
              userLogin !== "" && (
                <li>
                  <Link to={process.env.PUBLIC_URL + "/my-account"}>
                    Tài Khoản của tôi
                  </Link>
                  <Link to={process.env.PUBLIC_URL + "/order-history"}>
                    Lịch sử đơn hàng
                  </Link>
                  <Link
                    to={process.env.PUBLIC_URL + "/"}
                    onClick={handleLogout}>
                    Đăng Xuất
                  </Link>
                </li>
              )
            )}
            {!userLogin && (
              <li>
                <Link to={process.env.PUBLIC_URL + "/login-register"}>
                  Đăng Nhập
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="same-style header-compare">
        <Link to={process.env.PUBLIC_URL + "/compare"}>
          <i className="pe-7s-shuffle" />
          <span className="count-style">
            {compareData && compareData.length ? compareData.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style header-wishlist">
        <Link to={process.env.PUBLIC_URL + "/wishlist"}>
          <i className="pe-7s-like" />
          <span className="count-style">
            {wishlistData && wishlistData.length ? wishlistData.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartData && cartData.length ? cartData.length : 0}
          </span>
        </button>
        {/* menu cart */}
        <MenuCart
          cartData={cartData}
          currency={currency}
          deleteFromCart={deleteFromCart}
        />
      </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartData && cartData.length ? cartData.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}>
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  cartData: PropTypes.array,
  compareData: PropTypes.array,
  currency: PropTypes.object,
  iconWhiteClass: PropTypes.string,
  deleteFromCart: PropTypes.func,
  wishlistData: PropTypes.array,
  deleteAllFromCart: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currencyData,
    cartData: state.cartData,
    wishlistData: state.wishlistData,
    compareData: state.compareData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    },
    deleteAllFromCart: (addToast) => {
      dispatch(deleteAllFromCart(addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IconGroup);
