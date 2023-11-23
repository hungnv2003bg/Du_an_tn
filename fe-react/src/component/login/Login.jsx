import { Button, Card, Divider, Input } from "antd";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { selectLanguage } from "../../language/selectLanguage";
import { useLoginStore } from "./useLoginStore";
import userSlice from "./userSlice";
function Login() {
  const language = useSelector(selectLanguage);
  const dispath = useDispatch();
  const [typeError, setTypeError] = useState(undefined);
  const [loginPayload, setLoginPayload] = useState({
    userName: "",
    password: "",
  });
  async function handleLogin() {
    const login = await useLoginStore.actions.dangNhap(loginPayload);
    setLoginPayload({
      userName: "",
      password: "",
    });
    if (!login) {
      localStorage.removeItem("user");
      window.location.href = process.env.REACT_APP_FRONTEND_URL + "login";
      return;
    }
    localStorage.setItem("user", JSON.stringify(login));
    window.location.href = process.env.REACT_APP_FRONTEND_URL;
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
  // const loginWithGoogle = async () => {
  //     const authUrl = await getGoogleAuthUrl();
  //     // dieu huong sang google
  //     console.log(authUrl);
  //     window.location.href = authUrl;
  // };

  // const urlParams = new URLSearchParams(window.location.search);
  // const code = urlParams.get("code");
  // if (code) {
  //     const getUser = async () => {
  //         const user = await exchangeCodeForToken(code);
  //         // đã lấy được info
  //         //  const info = await getUserInfo(user.token);
  //         // console.log(info);
  //     };
  //     getUser();
  // }

  return (
    <>
      <div className="login-container">
        <div className="login-banner">
          <div className="login-pannel">
            <img src={require("../../assets/login/login3.png")} alt="" /> :
          </div>
        </div>
        <div className="login-option">
          <div className="login-option-site">
            <div className="login-option-header">
              <img src={require("../../assets/login/logo-noname.png")} alt="" />
              <h3>{language.login.company}</h3>
              <p>{language.login.subTitle}</p>
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
              <Link>{language.login.forgotPass}</Link>
              {typeError ? (
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
                  <p className="wait">{language.login.wait}</p>
                </Card>
              ) : (
                ""
              )}

              <Button size="large" onClick={handleLogin}>
                {language.login.loginBtn}
              </Button>
              <Divider className="span"> {language.login.or}</Divider>
              <div className="social-oauth">
                <div>
                  <img
                    src={require("../../assets/login/googleoauth.png")}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
