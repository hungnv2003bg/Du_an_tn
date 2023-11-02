import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import LocationMap from "../../components/contact/LocationMap";
import { message } from "antd";
import ContactApi from "../../api/contact/ContactApi";
import { Spin } from "antd";

const Contact = ({ location }) => {
  const { pathname } = location;
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [dataContact, setDataContact] = useState({
    username: "",
    email: "",
    subject: "",
    phone: "",
  });
  const changeInputData = (e) => {
    setDataContact({
      ...dataContact,
      [e.target.name]: e.target.value,
    });
  };
  const handlerSubmit = async (e) => {
    e.preventDefault();
    if (
      !dataContact.email ||
      !dataContact.username ||
      !dataContact.subject ||
      !dataContact.phone
    ) {
      messageApi.open({
        type: "error",
        content: "Có trường chưa được nhập đầy đủ thông tin",
      });
      return;
    }
    try {
      setLoading(true);
      const response = await ContactApi.postApiContact(dataContact); // đưa dữ liệu lên đăng ký
      messageApi.open({
        type: "success",
        content:
          "Cảm ơn bạn đã liên hệ với chúng tôi chúng tôi sẽ trả lời phản hồi của bạn bằng mail trong thời gian nhanh nhất.",
      });
      setDataContact({
        username: "",
        email: "",
        subject: "",
        phone: "",
      });
      setLoading(false);
      // Xử lý phản hồi từ API tại đây (ví dụ: hiển thị thông báo thành công, điều hướng đến trang khác, vv)
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Gửi liên hệ thất bại",
      });
      setLoading(false);
      // Xử lý lỗi tại đây (ví dụ: hiển thị thông báo lỗi)
    }
  };
  return (
    <Fragment>
      {contextHolder}
      <MetaTags>
        <title>Poly Food | Liên hệ</title>
        <meta name="description" content="Contact of PolyFood." />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
        Trang chủ
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Liên hệ
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="contact-area pt-100 pb-100">
          <div className="container">
            <div className="contact-map mb-10">
              <LocationMap latitude="21.0338532" longitude="105.8265661" />
            </div>
            <div className="custom-row-2">
              <div className="col-lg-4 col-md-5">
                <div className="contact-info-wrap">
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-phone" />
                    </div>
                    <div className="contact-info-dec">
                      <p>+012 345 678 102</p>
                      <p>+012 345 678 102</p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-globe" />
                    </div>
                    <div className="contact-info-dec">
                      <p>
                        <a href="mailto:polyfood@email.com">
                          polyfood@store.com
                        </a>
                      </p>
                      <p>
                        <a href="//polyfood.store">polyfood.store</a>
                      </p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-map-marker" />
                    </div>
                    <div className="contact-info-dec">
                      <p>Địa chỉ</p>
                      <p>Đội Cấn, Ba Đình, Hà Nội</p>
                    </div>
                  </div>
                  <div className="contact-social text-center">
                    <h3>Theo dõi chúng tôi</h3>
                    <ul>
                      <li>
                        <a href="//facebook.com">
                          <i className="fa fa-facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="//pinterest.com">
                          <i className="fa fa-pinterest-p" />
                        </a>
                      </li>
                      <li>
                        <a href="//thumblr.com">
                          <i className="fa fa-tumblr" />
                        </a>
                      </li>
                      <li>
                        <a href="//vimeo.com">
                          <i className="fa fa-vimeo" />
                        </a>
                      </li>
                      <li>
                        <a href="//twitter.com">
                          <i className="fa fa-twitter" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-7">
                <div className="contact-form">
                  <div className="contact-title mb-30">
                    <h2>Liên hệ</h2>
                  </div>
                  <form className="contact-form-style">
                    <div className="row">
                      <div className="col-lg-6">
                        <input
                          name="username"
                          placeholder="Họ & Tên*"
                          type="text"
                          onChange={changeInputData}
                          value={dataContact.username}
                        />
                      </div>
                      <div className="col-lg-6">
                        <input
                          name="email"
                          placeholder="Email*"
                          type="email"
                          onChange={changeInputData}
                          value={dataContact.email}
                          required
                        />
                      </div>

                      <div className="col-lg-12">
                        <input
                          name="phone"
                          placeholder="Số điện thoại*"
                          type="text"
                          onChange={changeInputData}
                          value={dataContact.phone}
                          required
                        />
                      </div>
                      {loading && <Spin size="large" />}
                      <div className="col-lg-12">
                        <textarea
                          name="subject"
                          placeholder="Nội dung*"
                          value={dataContact.subject}
                          onChange={changeInputData}
                          required
                        />
                        <button
                          className="submit"
                          type="submit"
                          onClick={handlerSubmit}>
                          Gửi
                        </button>
                      </div>
                    </div>
                  </form>
                  <p className="form-messege" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Contact.propTypes = {
  location: PropTypes.object,
};

export default Contact;
