import { notification } from "antd";
import "./style.css";
import { Link, useParams } from "react-router-dom";
import { useLoginStore } from "./useLoginStore";
function ThanhCong2() {
  const [api, contextHolder] = notification.useNotification();

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
              <img
                src="https://routine.vn/media/amasty/webp/logo/websites/1/logo-black-2x_png.webp"
                alt="s"
              />
              <p>Áo nam</p>
              <img
                src="data:image/png;base64,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"
                alt="s"
              />{" "}
              <label htmlFor="">
                Yêu cầu đổi mật khẩu được tạo thành công vui lòng kiểm tra
                <a
                  style={{
                    display: "inline",
                  }}
                  href="https://mail.google.com/mail/u/0/#inbox"
                  target="_blank"
                >
                  Email
                </a>{" "}
                để đổi lại mật khẩu
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ThanhCong2;
