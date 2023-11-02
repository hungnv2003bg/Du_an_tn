import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import UserApi from "../../api/security/UserApi";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { message } from "antd";
import LoadingSpin from "../../components/loading/LoadingSpin";

const ResetPassword = ({ location }) => {
  const { pathname } = location;
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [messageApi, contextHolder] = message.useMessage();
  const [activeKey, setActiveKey] = useState("login");
  const [token, setToken] = useState("");
  const [dataLogin, setDataLogin] = useState({
    resetPasswordToken: "",
    NewPassword: "",
    confirmpassword: "",
  });
  const changeInputValue = (val) => {
    setDataLogin({
      ...dataLogin,
      [val.target.name]: val.target.value,
    });
  };
  useEffect(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get("token");
    if (!tokenParam) {
      history.push("/");
    }
    try {
      const res = await UserApi.CheckToken(tokenParam);
      setDataLogin({
        ...dataLogin,
        resetPasswordToken: tokenParam,
      });
    } catch (error) {
      history.push("/");
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !dataLogin.resetPasswordToken ||
      !dataLogin.confirmpassword ||
      !dataLogin.NewPassword
    ) {
      messageApi.open({
        type: "error",
        content: "Không để trống các trường",
      });
      return;
    }
    if (dataLogin.confirmpassword !== dataLogin.NewPassword) {
      messageApi.open({
        type: "error",
        content: "Mật khẩu không khớp",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await UserApi.ResetPassword(dataLogin); // đưa dữ liệu lên đăng ký

      messageApi.open({
        type: "success",
        content: "Đã reset thành công mật khẩu",
      });
      setLoading(false);
      setTimeout(() => {
        history.push("/login-register");
      }, 500);

      return;
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Email không tồn tại",
      });
      setLoading(false);
      // Xử lý lỗi tại đây (ví dụ: hiển thị thông báo lỗi)
    }
  };
  return (
    <Fragment>
      <MetaTags>
        <title>Poly Food | Đăng nhập</title>
        <meta name="description" content="Compare page of PolyFood." />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
        Trang chủ
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Đổi mật khẩu nha bạn
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        {contextHolder}
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container activeKey={activeKey}>
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link
                          eventKey="login"
                          onClick={() => setActiveKey("login")}>
                          <h4>Quên mật khẩu</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          {loading && (
                            <div>
                              <LoadingSpin />
                            </div>
                          )}
                          <div className="login-register-form">
                            <form>
                              <input
                                type="password"
                                name="NewPassword"
                                value={dataLogin.NewPassword}
                                placeholder="password"
                                onChange={changeInputValue}
                                required
                              />
                              <input
                                type="password"
                                name="confirmpassword"
                                value={dataLogin.confirmpassword}
                                placeholder="confirmpassword"
                                onChange={changeInputValue}
                                required
                              />

                              <div className="button-box">
                                {/* <div className="login-toggle-btn">
                                    <input type="checkbox" />
                                    <label className="ml-10">Remember me</label>
                                    <Link to={process.env.PUBLIC_URL + "/"}>
                                    Forgot Password?
                                  </Link>
                                </div> */}
                                <button type="submit" onClick={handleSubmit}>
                                  <span>Cập nhật mật khẩu</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

ResetPassword.propTypes = {
  location: PropTypes.object,
};

export default ResetPassword;
