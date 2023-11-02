import { message } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { fetchDataCarts } from "../redux/actions/cartActions";
import UserApi from "../api/security/UserApi";

const ScrollToTop = (props) => {
  const [userCheckToken, setUserCheckToken] = useState(
    localStorage.getItem("token") || ""
  );
  const [user, setUser] = useState(localStorage.getItem("user") || "");
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  useEffect(() => {
    dispatch(fetchDataCarts([]));
  }, [localStorage.getItem("token")]);
  useEffect(async () => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    const expiration = localStorage.getItem("expiration") || "";

    const checkAndRefreshToken = async () => {
      const currentTime = new Date().getTime();
      if (currentTime > expiration && user) {
        try {
          const response = await UserApi.RefreshToken({
            userId: user.accountId,
            token: JSON.parse(userCheckToken),
          });

          const expirationTime = new Date().getTime() + 4 * 60 * 60 * 1000;
          localStorage.setItem("token", JSON.stringify(response)); // Make sure `response` contains the refreshed token
          localStorage.setItem("expiration", expirationTime);

          props.messageApi.open({
            type: "success",
            content: "Cập nhật thời gian đăng nhập",
          });
        } catch (error) {
          console.error("Error refreshing token:", error);
        }
      }
    };
    checkAndRefreshToken();
    // const interval = setInterval(checkAndRefreshToken, 2 * 60 * 60 * 1000);
    // // Clean up the interval when the component unmounts
    // return () => clearInterval(interval);
  }, []);
  return props.children;
};

export default withRouter(ScrollToTop);
