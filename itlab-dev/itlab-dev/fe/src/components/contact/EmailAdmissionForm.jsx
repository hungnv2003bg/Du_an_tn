import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { UploadOutlined } from "@ant-design/icons";
import UserApi from "../../api/security/UserApi";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Select, message, Form, Input, Button, DatePicker, Upload } from "antd";
import LoadingSpin from "../../components/loading/LoadingSpin";
import "../../assets/css/seenEmail-override.css";

const { RangePicker } = DatePicker;
const { Option } = Select;
const courseName = [
  { name: "Fullstack .NET" },
  { name: "Fullstack Java" },
  { name: "Java on job" },
  { name: "C++ and C" },
  { name: "Chưa quyết" },
  { name: "Fullstack" },
  { name: "VueJS" },
  { name: "C# on job" },
  { name: "Frontend on job" },
  { name: "React" },
  { name: "BE .NET" },
  { name: "BE Java" },
  { name: "Back End" },
  { name: "Frontend" },
];
const AdminName = [
  { name: "AnhCTP" },
  { name: "ThuanLV" },
  { name: "QuanTM" },
  { name: "AnhDQ" },
  { name: "AnhVA" },
];
const EmailAdmissionForm = ({ location }) => {
  const [form] = Form.useForm();
  const { pathname } = location;
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [messageApi, contextHolder] = message.useMessage();
  const [activeKey, setActiveKey] = useState("login");
  const initialValues = {
    lTSGroupName: "LTS Group",
    lTSGroupCoreTechnology: "IT (Công nghệ thông tin)",
    lTSGroupCEO: "Nguyễn Đồng Khánh (CTO LTS Group kiêm CEO của LTS EDU)",
    lTSEduFormerName:
      "LTS EDU (LTS EDU) tiền thân là HVIT CLAN (được thành lập từ năm 2004)",
    lTSEduPhilosophy: "Ươm mầm tri thức, dẫn đường công nghệ",
    lTSEduAddress:
      "Tầng 3, số 30, ngõ 304 Hồ Tùng Mậu, Phú Diễn, Từ Liêm, Hà Nội",
    lTSEduYearsOfExperience: "Hơn 16 năm kinh nghiệm",
    lTSEduTrainingProgram: "Đào tạo nguồn nhân lực IT chất lượng cao",
    AdminAddress:
      "Tầng 3, số 30, ngõ 304 Hồ Tùng Mậu, Phú Diễn, Từ Liêm, Hà Nội",
    AdminName: AdminName[0].name,

    // ... thêm các giá trị khác ...
  };
  const onFinish = async (jsonData) => {
    // Tạo một đối tượng FormData mới
    const formData = new FormData();

    // Append thông tin về LTS Group vào formData
    formData.append("lTSGroupName", jsonData.lTSGroupName);
    formData.append("lTSGroupCoreTechnology", jsonData.lTSGroupCoreTechnology);
    formData.append("lTSGroupCEO", jsonData.lTSGroupCEO);

    // Append thông tin về LTS EDU vào formData
    formData.append("lTSEduFormerName", jsonData.lTSEduFormerName);
    formData.append("lTSEduPhilosophy", jsonData.lTSEduPhilosophy);
    formData.append("lTSEduAddress", jsonData.lTSEduAddress);
    formData.append(
      "lTSEduYearsOfExperience",
      jsonData.lTSEduYearsOfExperience
    );
    formData.append("lTSEduTrainingProgram", jsonData.lTSEduTrainingProgram);

    // Append thông tin về Student vào formData
    formData.append("studentName", jsonData.studentName);
    formData.append("studentEmail", jsonData.studentEmail);
    formData.append("studentCourse", jsonData.studentCourse);
    formData.append("studentLearningForm", jsonData.studentLearningForm);
    formData.append("studentAdmissionDate", jsonData.studentAdmissionDate);
    formData.append("studentExpectedEndDate", jsonData.studentExpectedEndDate);

    // Append thông tin về Admin vào formData
    formData.append("AdminName", jsonData.AdminName);
    formData.append("AdminPhone", jsonData.AdminPhone);
    formData.append("AdminAddress", jsonData.AdminAddress);

    // Append các file attachments vào formData
    const attachments = jsonData.attachments;
    if (attachments && attachments.length > 0) {
      for (let i = 0; i < attachments.length; i++) {
        formData.append("Attachments", attachments[i].originFileObj);
      }
    }
    try {
      setLoading(true);
      const res = await UserApi.EmailAdmissionForm(formData);
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
    }
  };

  return (
    <Fragment>
      <MetaTags>
        <link
          rel="icon"
          type="image/png"
          itemprop="image"
          href="https://lotusacademy.edu.vn/assets/images/lotusacademy/Logo%20LTS%20Edu-01.png"
        />

        <title>LTS EDU | THÔNG BÁO NHẬP HỌC</title>
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
                        <h4>THÔNG BÁO NHẬP HỌC</h4>
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
                          <Form
                            name="mailPointRequestForm"
                            form={form} // Thêm form={form} vào đây
                            initialValues={initialValues}
                            onFinish={onFinish}>
                            <Form.Item
                              name="lTSGroupName"
                              className="my-0"
                              label="Tên công ty"
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng nhập vào Tên công ty",
                                },
                              ]}>
                              <Input style={{ height: 30 }} />
                            </Form.Item>
                            <Form.Item
                              name="lTSGroupCoreTechnology"
                              className="my-0"
                              label="Công nghệ cốt lõi"
                              rules={[
                                {
                                  required: true,
                                  validateTrigger: "onBlur", // Xác thực khi trường mất focus (người dùng rời khỏi trường)
                                  message:
                                    "Vui lòng nhập vào công nghệ cốt lõi",
                                },
                              ]}>
                              <Input style={{ height: 30 }} />
                            </Form.Item>
                            <Form.Item
                              name="lTSGroupCEO"
                              label="Giám đốc chiến lược"
                              className="my-0"
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "Vui lòng nhập vào giám đốc chiến lược",
                                },
                              ]}>
                              <Input style={{ height: 30 }} />
                            </Form.Item>
                            <Form.Item
                              name="lTSEduFormerName"
                              label="Tên gọi cũ"
                              className="my-0"
                              rules={[
                                {
                                  required: true,

                                  message: "Vui lòng nhập vào tên gọi cũ",
                                },
                              ]}>
                              <Input style={{ height: 30 }} />
                            </Form.Item>

                            <Form.Item
                              name="lTSEduPhilosophy"
                              label="Phương châm"
                              className="my-0"
                              rules={[
                                {
                                  required: true,

                                  message: "Vui lòng nhập vào triết lý",
                                },
                              ]}>
                              <Input style={{ height: 30 }} />
                            </Form.Item>
                            <Form.Item
                              name="lTSEduAddress"
                              label="Địa chỉ của công ty"
                              className="my-0"
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "Vui lòng nhập vào địa chỉ của công ty",
                                },
                              ]}>
                              <Input style={{ height: 30 }} />
                            </Form.Item>
                            <Form.Item
                              name="lTSEduYearsOfExperience"
                              label="Lịch sử hình thành"
                              className="my-0"
                              rules={[
                                {
                                  required: true,

                                  message:
                                    "Vui lòng nhập vào lịch sử hình thành.",
                                },
                              ]}>
                              <Input style={{ height: 30 }} />
                            </Form.Item>
                            <Form.Item
                              name="lTSEduTrainingProgram"
                              label="Trương trình đào tạo"
                              className="my-0"
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "Vui lòng nhập vào trương trình đào tạo",
                                },
                              ]}>
                              <Input style={{ height: 30 }} />
                            </Form.Item>
                            <Form.Item
                              name="studentName"
                              label="Tên học sinh"
                              className="my-0"
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng nhập vào tên học sinh",
                                },
                              ]}>
                              <Input style={{ height: 30 }} />
                            </Form.Item>
                            <Form.Item
                              name="studentEmail"
                              label="email"
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
                              name="studentCourse"
                              label="Khóa học"
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
                              name="studentLearningForm"
                              label="Hình thức học"
                              className="optionSelect"
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng nhập vào khóa học",
                                },
                              ]}>
                              <Select value="Offline">
                                <Option value={"Offline"}>{"Offline"}</Option>
                                <Option value={"Online"}>{"Online"}</Option>
                              </Select>
                            </Form.Item>

                            <div className="d-flex justify-content-between">
                              <Form.Item
                                name="studentAdmissionDate"
                                label="Ngày bắt đầu"
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
                                name="studentExpectedEndDate"
                                label="kết thúc (dự kiến)"
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
                              name="AdminName"
                              label="Admin"
                              className="optionSelect"
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng nhập vào Admin",
                                },
                              ]}>
                              <Select>
                                {AdminName.map((x) => (
                                  <Option value={x.name}>{x.name}</Option>
                                ))}
                              </Select>
                            </Form.Item>
                            <Form.Item
                              name="AdminPhone"
                              className="my-0"
                              label="Số điện thoại"
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng nhập vào Tên công ty",
                                },
                              ]}>
                              <Input style={{ height: 30 }} />
                            </Form.Item>

                            <Form.Item
                              name="AdminAddress"
                              className="my-0"
                              label="Địa chỉ công ty"
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng nhập vào Tên công ty",
                                },
                              ]}>
                              <Input style={{ height: 30 }} />
                            </Form.Item>

                            <Form.Item
                              name="attachments"
                              label="Tệp đính kèm"
                              valuePropName="fileList"
                              getValueFromEvent={(e) => {
                                if (Array.isArray(e)) {
                                  return e;
                                }
                                return e && e.fileList;
                              }}>
                              <Upload
                                name="attachments"
                                customRequest={({ file, onSuccess }) => {
                                  setTimeout(() => {
                                    onSuccess("ok");
                                    // Không xử lý file ở đây, do ant tự quản lý fileList
                                  }, 1000);
                                }}
                                multiple
                                fileList={[]}>
                                <Button icon={<UploadOutlined />}>
                                  Tải lên
                                </Button>
                              </Upload>
                            </Form.Item>
                            <Form.Item wrapperCol={{ span: 32 }}>
                              <Button type="primary" htmlType="submit" block>
                                Gửi thư chào mừng
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

EmailAdmissionForm.propTypes = {
  location: PropTypes.object,
};

export default EmailAdmissionForm;
