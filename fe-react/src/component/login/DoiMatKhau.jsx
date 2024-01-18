import { Button, Card, Input, notification } from "antd";
import "./style.css";
import { useState } from "react";
import { useLoginStore } from "./useLoginStore";
import { checkEmpty } from "../../extensions/checkEmpty";
import { useParams } from "react-router-dom";
function DoiMatKhau() {
  const [api, contextHolder] = notification.useNotification();
  const { id } = useParams();
  const [pass, setPass] = useState("");
  const [check, setCheck] = useState("");
  async function handleDoiMatKhau() {
    if (!checkEmpty(pass)) {
      openNotification(
        "error",
        "Hệ thống",
        "Vui lòng nhập email",
        "bottomRight"
      );
      return;
    }
    if (pass.length < 8) {
      openNotification(
        "error",
        "Hệ thống",
        "Mật khẩu phải lớn hơn 8 ký tự",
        "bottomRight"
      );
      return;
    }
    if (check != pass) {
      openNotification(
        "error",
        "Hệ thống",
        "Mật khẩu xác nhận không chính xác",
        "bottomRight"
      );
      return;
    }
    const login = await useLoginStore.actions.doiMatKhau({
      code: id,
      matKhauMoi: pass,
    });
    if (login.data == 2) {
      window.location = process.env.REACT_APP_FRONTEND_URL + "doithanhcong";
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
              <label htmlFor="">Mật khẩu mới</label>
              <Input.Password
                onChange={(e) => {
                  setPass(e.target.value);
                }}
                size="large"
                placeholder={"Email"}
                className="input"
                value={pass}
              />
              <label htmlFor="">Xác nhận mật khẩu</label>
              <Input.Password
                onChange={(e) => {
                  setCheck(e.target.value);
                }}
                size="large"
                placeholder={"Email"}
                className="input"
                value={check}
              />
              <Button size="large" onClick={handleDoiMatKhau}>
                Xác nhận
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DoiMatKhau;
