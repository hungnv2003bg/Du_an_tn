import { Button, Card, Divider, Input, notification } from "antd";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { selectLanguage } from "../../language/selectLanguage";
import { useLoginStore } from "./useLoginStore";
function Login() {
  const { status } = useParams();
  const [api, contextHolder] = notification.useNotification();
  const language = useSelector(selectLanguage);
  const [loginPayload, setLoginPayload] = useState({
    userName: "",
    password: "",
  });
  async function handleLogin() {
    try {
      const login = await useLoginStore.actions.dangNhap(loginPayload);
      setLoginPayload({
        userName: "",
        password: "",
      });
      if (login.data == 1) {
        localStorage.removeItem("user");
        window.location.href =
          process.env.REACT_APP_FRONTEND_URL + "login/page2";
        return;
      }
      localStorage.setItem("user", JSON.stringify(login));
      window.location.href = process.env.REACT_APP_FRONTEND_URL;
    } catch (e) {}
  }
  function handleUpdateUserName(e) {
    setLoginPayload({
      password: loginPayload.password,
      userName: e.target.value,
    });
  }

  function handleUpdatePassword(e) {
    setLoginPayload({
      password: e.target.value,
      userName: loginPayload.userName,
    });
  }

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
  console.log(status);
  return (
    <>
      {contextHolder}
      <div className="login-container">
        <div className="login-banner">
          <div className="login-pannel">
            <img src={require("../../assets/login/login3.png")} alt="" /> :
          </div>
        </div>
        <div className="login-option">
          <div className="login-option-site">
            <div className="login-option-header">
              <img
                src="https://routine.vn/media/amasty/webp/logo/websites/1/logo-black-2x_png.webp"
                alt="s"
              />
              <p>Áo nam</p>
              <label htmlFor="">{language.login.userName}</label>
              <Input
                onChange={handleUpdateUserName}
                size="large"
                placeholder={language.login.userNamePlaceHolder}
                className="input"
                value={loginPayload.userName}
              />
              <label htmlFor="">{language.login.password}</label>
              <Input.Password
                onChange={handleUpdatePassword}
                value={loginPayload.password}
                size="large"
                placeholder={language.login.passwordPlaceHolder}
                className="input"
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Link to={"/quenmatkhau"}>{language.login.forgotPass}</Link>
                <Link to={"/signin"}>Bạn chưa có tài khoản?</Link>
              </div>
              {status === "page2" && (
                <Card
                  style={{
                    width: "100%",
                    marginBottom: 12,
                    marginTop: 12,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p className="wrong">{language.login.wrong}</p>
                </Card>
              )}

              <Button size="large" onClick={handleLogin}>
                {language.login.loginBtn}
              </Button>
              {/* <Divider className="span"> {language.login.or}</Divider>
              <div className="social-oauth">
                <div>
                  <img
                    src={require("../../assets/login/googleoauth.png")}
                    alt=""
                  />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
