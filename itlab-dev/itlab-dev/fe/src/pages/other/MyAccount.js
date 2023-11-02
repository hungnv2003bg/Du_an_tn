import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useState } from "react";
import UserApi from "../../api/security/UserApi";
import LoadingSpin from "../../components/loading/LoadingSpin";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Image, message } from "antd";

const MyAccount = ({ location }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const oldData = JSON.parse(localStorage.getItem("user"));
  const { pathname } = location;
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [dataPass, setDataPass] = useState({
    accountId: JSON.parse(localStorage.getItem("user")).accountId,
    password: "",
    confirmPass: "",
  });
  const changeDataPass = (e) => {
    setDataPass({
      ...dataPass,
      [e.target.name]: e.target.value,
    });
  };

  const changeDataUser = (e) => {
    if (e.target.name === "phone") {
      if (
        !/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/.test(
          user.phone
        ) &&
        user.phone.length == 9
      ) {
        messageApi.open({
          type: "error",
          content: "Số điện thoại không hợp lệ",
        });
      }
    }
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const chnagePassSubmit = async () => {
    if (!dataPass.password || !dataPass.confirmPass) {
      messageApi.open({
        type: "error",
        content: "Vui lòng nhập đầy đủ các trường của mật khẩu",
      });
      return;
    }
    if (dataPass.password != dataPass.confirmPass) {
      messageApi.open({
        type: "error",
        content: "Mật khẩu nhập lại không giống nhau",
      });
      return;
    }
    try {
      setLoading(true);
      messageApi.open({
        type: "success",
        content: "Thay đổi mật khẩu thành công",
      });
      const data = dataPass;
      delete data.confirmPass;
      const res = await UserApi.ChangePass(data);
      setLoading(false);
      setDataPass({
        accountId: JSON.parse(localStorage.getItem("user")).accountId,
        password: "",
        confirmPass: "",
      });
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Thay đổi mật khẩu thất bại",
      });
      setLoading(false);
    }
  };
  const [user, setUser] = useState({
    accountId: oldData.accountId,
    phone: oldData.user.phone,
    email: oldData.user.email,
    address: oldData.user.address,
    userName: oldData.user.userName,
    avartar: oldData.avartar,
  });
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file.size > 2 * 1024 * 1024) {
      messageApi.open({
        type: "error",
        content: "Tệp tin quá lớn. Vui lòng chọn một tệp tin nhỏ hơn 2MB.",
      });
      return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      // Định dạng tệp tin không phải là hình ảnh
      messageApi.open({
        type: "error",
        content: "Vui lòng chọn một tệp tin hình ảnh (jpg, png, webp).",
      });
      return;
    }
    const formData = new FormData();
    formData.append("Avatar", file);
    const users = JSON.parse(localStorage.getItem("user"));
    try {
      setLoading(true);
      const res = await UserApi.ChangeAvartar(user.accountId, formData);
      setUser({
        ...user,
        avartar: URL.createObjectURL(file),
      });
      users.avartar = res.data;
      localStorage.setItem("user", JSON.stringify(users));
      messageApi.open({
        type: "success",
        content: "Tải ảnh đại diện thành công",
      });
      setLoading(false);
      history.go(0);
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };
  const onChageSubmitInfo = async () => {
    try {
      setLoading(true);
      const data = user;
      const formData = new FormData();
      formData.append("phone", user.phone);
      formData.append("email", user.email);
      formData.append("address", user.address);
      formData.append("userName", user.userName);
      const res = await UserApi.ChangeInfo(oldData.accountId, formData);
      const usersUpdate = JSON.parse(localStorage.getItem("user"));

      messageApi.open({
        type: "success",
        content: "Thay đổi thông tin thành công",
      });
      usersUpdate.user.phone = user.phone;
      usersUpdate.user.address = user.address;
      usersUpdate.user.userName = user.userName;
      localStorage.setItem("user", JSON.stringify(usersUpdate));
      setLoading(false);
      setTimeout(() => {
        history.go(0);
      }, 1000);
    } catch (error) {
      setLoading(false);
      messageApi.open({
        type: "success",
        content: "Thay đổi thông tin thất bại",
      });
    }
  };
  return (
    <Fragment>
      <MetaTags>
        <title>Poly Food | Tài khoản của tôi</title>
        <meta name="description" content="Compare page of PolyFood." />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
        Trang chủ
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Tài khoản của tôi
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ml-auto mr-auto col-lg-9">
                <div className="myaccount-wrapper">
                  {contextHolder}
                  {loading && (
                    <div>
                      <LoadingSpin />
                    </div>
                  )}
                  <Accordion defaultActiveKey="0">
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="0">
                          <h3 className="panel-title">
                            <span>1 .</span> Cập nhật thông tin
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="row">
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label className="text-secondary">
                                    Tên người dùng
                                  </label>
                                  <input
                                    type="text"
                                    value={user.userName}
                                    name="userName"
                                    onChange={changeDataUser}
                                    autoComplete="off"
                                  />
                                </div>
                                <div className="billing-info">
                                  <label className="text-secondary">
                                    Email
                                  </label>
                                  <input
                                    type="email"
                                    value={user.email}
                                    readOnly
                                    disabled
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info text-center">
                                  <Image
                                    style={{ borderRadius: "50%" }}
                                    width={130}
                                    height={130}
                                    src={user.avartar}
                                  />
                                  <input
                                    type="file"
                                    id="avartarUser"
                                    onChange={handleFileChange}
                                    className="d-none"
                                  />
                                  <label
                                    htmlFor="avartarUser"
                                    className="d-flex align-items-center justify-content-center border border-1 position-absolute bottom-0 p-3 mt-3 text-dark"
                                    style={{
                                      height: "30px",
                                      width: "130px",
                                      right: "34%",
                                    }}>
                                    Chọn ảnh
                                  </label>
                                  <div
                                    className="format-image position-absolute"
                                    style={{ bottom: "-30%", left: "28%" }}>
                                    <p className="mb-0 text-secondary">
                                      Dung lượng file tối đa 2 MB
                                    </p>
                                    <p className="text-secondary">
                                      Định dạng PNG, JPG, WEBP
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label className="text-secondary">
                                    Địa chỉ
                                  </label>
                                  <input
                                    type="text"
                                    value={user.address}
                                    name="address"
                                    onChange={changeDataUser}
                                    autoComplete="off"
                                  />
                                </div>
                              </div>
                              <div
                                className="col-lg-6 col-md-6"
                                style={{ visibility: "hidden" }}></div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label className="text-secondary">
                                    Số điện thoại
                                  </label>
                                  <input
                                    type="text"
                                    name="phone"
                                    value={user.phone}
                                    onChange={changeDataUser}
                                    autoComplete="off"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                {(user.phone !== oldData.user.phone ||
                                  user.address !== oldData.user.address ||
                                  user.userName !== oldData.user.userName) &&
                                  /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/.test(
                                    user.phone
                                  ) && (
                                    <button
                                      type="button"
                                      onClick={onChageSubmitInfo}>
                                      Lưu thay đổi
                                    </button>
                                  )}
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="1">
                          <h3 className="panel-title">
                            <span>2 .</span> Cập nhật mật khẩu
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Mật khẩu mới</label>
                                  <input
                                    type="password"
                                    name="password"
                                    value={dataPass.password}
                                    onChange={changeDataPass}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Xác nhận mật khẩu</label>
                                  <input
                                    type="password"
                                    name="confirmPass"
                                    value={dataPass.confirmPass}
                                    onChange={changeDataPass}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                {(dataPass.confirmPass ||
                                  dataPass.password) && (
                                    <button
                                      type="click"
                                      onClick={chnagePassSubmit}>
                                      Lưu thay đổi
                                    </button>
                                  )}
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    {/* <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="2">
                          <h3 className="panel-title">
                            <span>3 .</span> Modify your address book entries{" "}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="2">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>Address Book Entries</h4>
                            </div>
                            <div className="entries-wrapper">
                              <div className="row">
                                <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                  <div className="entries-info text-center">
                                    <p>John Doe</p>
                                    <p>Paul Park </p>
                                    <p>Lorem ipsum dolor set amet</p>
                                    <p>NYC</p>
                                    <p>New York</p>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                  <div className="entries-edit-delete text-center">
                                    <button className="edit">Edit</button>
                                    <button>Delete</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit">Continue</button>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card> */}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

MyAccount.propTypes = {
  location: PropTypes.object,
};

export default MyAccount;
