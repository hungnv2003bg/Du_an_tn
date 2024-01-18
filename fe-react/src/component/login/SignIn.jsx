import { Button, Card, Input, notification } from "antd";
import "./style.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { selectLanguage } from "../../language/selectLanguage";
import { useLoginStore } from "./useLoginStore";
import { checkEmpty } from "../../extensions/checkEmpty";
function SignIn() {
  const [api, contextHolder] = notification.useNotification();
  const language = useSelector(selectLanguage);
  const [typeError, setTypeError] = useState(undefined);
  const [signIn, setSignIn] = useState({});
  const [checkMatKhau, setCheckMatKhau] = useState("");
  async function handleSignIn() {
    if (!checkEmpty(signIn.email)) {
      openNotification(
        "error",
        "Hệ thống",
        "Vui lòng nhập email",
        "bottomRight"
      );
      return;
    }
    if (!checkEmpty(signIn.ho)) {
      openNotification("error", "Hệ thống", "Vui lòng nhập họ", "bottomRight");
      return;
    }
    if (!checkEmpty(signIn.ten)) {
      openNotification("error", "Hệ thống", "Vui lòng nhập tên", "bottomRight");
      return;
    }
    if (!checkEmpty(signIn.matKhau)) {
      openNotification(
        "error",
        "Hệ thống",
        "Vui lòng nhập mật khẩu",
        "bottomRight"
      );
      return;
    }
    if (signIn.matKhau.length < 8) {
      openNotification(
        "error",
        "Hệ thống",
        "Mật khẩu phải lớn hơn 8 ký tự",
        "bottomRight"
      );
      return;
    }
    if (checkMatKhau != signIn.matKhau) {
      openNotification(
        "error",
        "Hệ thống",
        "Mật khẩu xác nhận không chính xác",
        "bottomRight"
      );
      return;
    }
    const login = await useLoginStore.actions.dangKy(signIn);
    if (login.data) {
      window.location =
        process.env.REACT_APP_FRONTEND_URL +
        "thanhcongcheckemail/" +
        login.data;
      return;
    }
    openNotification(
      "error",
      "Hệ thống",
      "Email đã tồn tại đăng ký thật bại!",
      "bottomRight"
    );
    return;
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
              <p>Áo nam phong cách</p>
              <label htmlFor="">Email</label>
              <Input
                onChange={(e) => {
                  setSignIn({
                    ...signIn,
                    email: e.target.value,
                  });
                }}
                size="large"
                placeholder={"Email"}
                className="input"
                value={signIn.email}
              />
              <label htmlFor="">Họ</label>
              <Input
                onChange={(e) => {
                  setSignIn({
                    ...signIn,
                    ho: e.target.value,
                  });
                }}
                size="large"
                placeholder={"Họ"}
                className="input"
                value={signIn.ho}
              />
              <label htmlFor="">Tên</label>
              <Input
                onChange={(e) => {
                  setSignIn({
                    ...signIn,
                    ten: e.target.value,
                  });
                }}
                size="large"
                placeholder={"Tên người dùng"}
                className="input"
                value={signIn.ten}
              />
              <label htmlFor="">{language.login.password}</label>
              <Input.Password
                onChange={(e) => {
                  setSignIn({
                    ...signIn,
                    matKhau: e.target.value,
                  });
                }}
                value={signIn.matKhau}
                size="large"
                placeholder={language.login.passwordPlaceHolder}
                className="input"
              />
              <label htmlFor="">Xác nhận mật khẩu</label>
              <Input.Password
                onChange={(e) => {
                  setCheckMatKhau(e.target.value);
                }}
                value={checkMatKhau}
                size="large"
                placeholder={language.login.passwordPlaceHolder}
                className="input"
              />
              <Link to={"/login"}>Bạn đã có tài khoản?</Link>
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

              <Button size="large" onClick={handleSignIn}>
                Đăng ký
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
