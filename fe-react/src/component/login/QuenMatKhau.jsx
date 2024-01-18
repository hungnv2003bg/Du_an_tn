import { Button, Card, Input, notification } from "antd";
import "./style.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { selectLanguage } from "../../language/selectLanguage";
import { useLoginStore } from "./useLoginStore";
import { checkEmpty } from "../../extensions/checkEmpty";
function QuenMatKhau() {
  const [api, contextHolder] = notification.useNotification();
  const [email, setEmail] = useState("");
  async function handleQuenMatKhau() {
    if (!checkEmpty(email)) {
      openNotification(
        "error",
        "Hệ thống",
        "Vui lòng nhập email",
        "bottomRight"
      );
      return;
    }

    const login = await useLoginStore.actions.quenMatKhau(email);
    if (login.data == 2) {
      window.location =
        process.env.REACT_APP_FRONTEND_URL + "thanhcongcheckemail2";
      return;
    }
    openNotification(
      "error",
      "Hệ thống",
      "Không tìm thấy email!",
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
              <label htmlFor="">Email đăng ký tài khoản</label>
              <Input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                size="large"
                placeholder={"Email"}
                className="input"
                value={email}
              />

              <Button size="large" onClick={handleQuenMatKhau}>
                Xác nhận
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuenMatKhau;
