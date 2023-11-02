import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
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

const ForgotPassword = ({ location }) => {
  const { pathname } = location;
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [messageApi, contextHolder] = message.useMessage();
  const [activeKey, setActiveKey] = useState("login");
  const [dataLogin, setDataLogin] = useState({
    email: "",
  });
  const [dataRegister, setDataRegister] = useState({
    email: "",
    password: "",
    username: "",
  });
  const changeInputValue = (val) => {
    setDataLogin({
      ...dataLogin,
      [val.target.name]: val.target.value,
    });
  };

  const handleSubmit = async (e) => {
    if (!dataLogin.email) {
      messageApi.open({
        type: "error",
        content: "Không để trống các trường",
      });
      return;
    }
    e.preventDefault();
    try {
      setLoading(true);
      const response = await UserApi.ForgotPassword(dataLogin); // đưa dữ liệu lên đăng ký

      messageApi.open({
        type: "success",
        content: "Đã gửi thông báo về email",
      });
      setLoading(false);

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
        Quên mật khẩu
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
                                type="email"
                                name="email"
                                value={dataLogin.email}
                                placeholder="Email"
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
                                  <span>Quên mật khẩu</span>
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

ForgotPassword.propTypes = {
  location: PropTypes.object,
};

export default ForgotPassword;
