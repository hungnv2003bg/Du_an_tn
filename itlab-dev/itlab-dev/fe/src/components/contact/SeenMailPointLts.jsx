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
import { Select, message, Form, Input, Button, DatePicker } from "antd";
import LoadingSpin from "../../components/loading/LoadingSpin";
import { Link } from "react-router-dom";
import moment from "moment";
import "../../assets/css/seenEmail-override.css";

const { RangePicker } = DatePicker;
const { Option } = Select;
const courseName = [
  { name: "Fullstack .NET" },
  { name: "Fullstack Java" },
  { name: "java on job" },
  { name: "c++ and c" },
  { name: "Chưa quyết" },
  { name: "VueJS" },
  { name: "C# on job" },
  { name: "Frontend on job" },
  { name: "React" },
  { name: "BE .NET" },
  { name: "BE Java" },
];
const SubjectName = [
  { name: "C Basic" },
  { name: "C Array" },
  { name: "C Fucntion " },
  { name: "C#/Java Basic" },
  { name: "C#/Java Collection" },
  { name: "C#/Java Medthods" },
  { name: "C#/Java OOP" },
  { name: "SQL/MySQL" },
  { name: "EF/JPA Spring + Web API" },
  { name: "HTML, CSS" },
  { name: "JS" },
  { name: "Boostrap" },
  { name: "Vue/React" },
];
const SeenMailPointLts = ({ location }) => {
  const [form] = Form.useForm();
  const { pathname } = location;
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [messageApi, contextHolder] = message.useMessage();
  const [activeKey, setActiveKey] = useState("login");

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const res = await UserApi.MailPointRequestForm(values);
      messageApi.open({
        type: "success",
        content: res,
      });
      setLoading(false);
      setTimeout(() => {
        history.go(0);
      }, [800]);
    } catch (error) {
      setLoading(false);
      messageApi.open({
        type: "error",
        content: "gửi mail bị lỗi",
      });
    }
  };

  return (
    <Fragment>
      <MetaTags>
        <title>LTS EDU | THÔNG BÁO ĐIỂM HỌC PHẦN</title>
        <meta name="description" content="Compare page of PolyFood." />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
        Trang chủ
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Đăng nhập - Đăng ký
      </BreadcrumbsItem>

      {/* breadcrumb */}
      {/* <Breadcrumb /> */}
      {contextHolder}
      <div className="login-register-area pt-60 pb-40">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12 ml-auto mr-auto">
              <div className="login-register-wrapper">
                <Tab.Container activeKey={activeKey}>
                  <Nav variant="pills" className="login-register-tab-list">
                    <Nav.Item>
                      <Nav.Link
                        eventKey="login"
                        onClick={() => setActiveKey("login")}>
                        <h4>THÔNG BÁO ĐIỂM HỌC PHẦN</h4>
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
                          <Form name="mailPointRequestForm" onFinish={onFinish}>
                            <Form.Item
                              name="studentName"
                              className="my-0"
                              label="Họ và tên"
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng nhập vào tên học sinh",
                                },
                              ]}>
                              <Input style={{ height: 30 }} />
                            </Form.Item>
                            <Form.Item
                              name="courseName"
                              label="Môn học"
                              className="optionSelect"
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng nhập vào khóa học",
                                },
                              ]}>
                              <Select>
                                {courseName.map((x) => (
                                  <Option value={x.name}>{x.name}</Option>
                                ))}
                              </Select>
                            </Form.Item>
                            <Form.Item
                              name="phone"
                              label="Điện thoại"
                              className="my-0"
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng nhập vào số điện thoại",
                                },
                              ]}>
                              <Input style={{ height: 30 }} />
                            </Form.Item>
                            <Form.Item
                              name="email"
                              label="Email"
                              className="my-0"
                              rules={[
                                {
                                  required: true,
                                  type: "email",
                                  message: "Vui lòng nhập vào email",
                                },
                              ]}>
                              <Input style={{ height: 30 }} />
                            </Form.Item>
                            <Form.Item
                              name="subjects"
                              className="subjects"
                              label="Học phần">
                              <Form.List name="subjects">
                                {(fields, { add, remove }) => (
                                  <>
                                    {fields.map((field, index) => (
                                      <Form.Item
                                        key={field.key}
                                        label={""}
                                        required={false}
                                        style={{
                                          height: 30,
                                          marginBottom: 81,
                                        }}>
                                        <Form.Item
                                          {...field}
                                          name={[field.name, "name"]}
                                          fieldKey={[field.fieldKey, "name"]}
                                          validateTrigger={[
                                            "onChange",
                                            "onBlur",
                                          ]}
                                          // noStyle
                                          rules={[
                                            {
                                              required: true,
                                              whitespace: true,
                                              message:
                                                "Vui lòng nhập vào tên học phần.",
                                            },
                                          ]}>
                                          <Select
                                            placeholder="Các môn học"
                                            style={{ height: 30 }}>
                                            {SubjectName.map((x) => (
                                              <Option value={x.name}>
                                                {x.name}
                                              </Option>
                                            ))}
                                          </Select>
                                        </Form.Item>
                                        <Form.Item
                                          {...field}
                                          name={[field.name, "point"]}
                                          fieldKey={[field.fieldKey, "point"]}
                                          validateTrigger={[
                                            "onChange",
                                            "onBlur",
                                          ]}
                                          noStyle
                                          rules={[
                                            {
                                              required: true,
                                              pattern:
                                                /^(10|[0-9](\.[0-9]+)?)$/, // Cập nhật mẫu
                                              message:
                                                "Vui lòng nhập điểm hợp lệ (0-10).",
                                            },
                                          ]}>
                                          <Input
                                            style={{ height: 30 }}
                                            placeholder="Điểm số"
                                            className="mb-0"
                                          />
                                        </Form.Item>
                                        {fields.length > 1 ? (
                                          <Button
                                            type="link"
                                            onClick={() => {
                                              remove(field.name);
                                            }}
                                            style={{ marginLeft: "8px" }}>
                                            Remove
                                          </Button>
                                        ) : null}
                                      </Form.Item>
                                    ))}
                                    <Form.Item>
                                      <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        style={{ width: "100%" }}>
                                        Thêm 1 môn học
                                      </Button>
                                    </Form.Item>
                                  </>
                                )}
                              </Form.List>
                            </Form.Item>
                            <div className="d-flex justify-content-between">
                              <Form.Item
                                name="dayAdmission"
                                label="Bắt đầu"
                                className="my-0"
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      "Vui lòng nhập vào ngày bắt đầu khóa học",
                                  },
                                ]}>
                                <DatePicker
                                  className="ovr-pickdate"
                                  style={{ height: 30 }}
                                />
                              </Form.Item>
                              <Form.Item
                                name="dayEndEstimatedEndDate"
                                label="Kết thúc (dự kiến)"
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      "Vui lòng nhập vào ngày dự kiến kết thúc khóa học",
                                  },
                                ]}>
                                <DatePicker
                                  className="ovr-pickdate"
                                  style={{ height: 30 }}
                                />
                              </Form.Item>
                            </div>
                            <Form.Item
                              name="totalRating"
                              label="Nội dung"
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng nhập vào nội dung cần gửi",
                                },
                              ]}>
                              <Input.TextArea
                                placeholder="Nhập nội dung khác"
                                style={{ height: "100px" }}
                              />
                            </Form.Item>
                            <Form.Item wrapperCol={{ span: 32 }}>
                              <Button type="primary" htmlType="submit" block>
                                Gửi điểm cho học viên
                              </Button>
                            </Form.Item>
                          </Form>
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
    </Fragment>
  );
};

SeenMailPointLts.propTypes = {
  location: PropTypes.object,
};

export default SeenMailPointLts;
