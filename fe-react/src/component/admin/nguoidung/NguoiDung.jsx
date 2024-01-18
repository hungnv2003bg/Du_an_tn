import { useDispatch, useSelector } from "react-redux";
import { selectLanguage } from "../../../language/selectLanguage";
import "./style.css";
import Header from "../layout/header/Header";
import MenuAdmin from "../layout/menu/MenuAdmin";
import { Form, Modal, Row, Table, Tag, notification, message, Upload } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Image, Radio, Checkbox, DatePicker, Select } from "antd";
import { useNguoiDungStore } from "./useNguoiDungStore";
import ModalCapNhat from "./ModalCapNhat";
import ModalXoa from "./ModalXoa";
import ModalView from "./ModalView";
import { useForm } from "antd/es/form/Form";
import dayjs from 'dayjs';
import { PlusOutlined } from "@ant-design/icons";

function NguoiDung() {
  const [form] = useForm()
  const language = useSelector(selectLanguage);
  const dispath = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [date, setDate] = useState(null);
  const [searchedColumn, setSearchedColumn] = useState("");
  const { Option } = Select;
  const [nguoiDung, setNguoiDung] = useState({
    id: "",
    ten: "",
    ho: "",
    email: "",
    trangThai: "BIKHOA",
  });
  const [fileList, setFileList] = useState([]);
  const [hinhAnh, setHinhAnh] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const props = {
    beforeUpload: (file) => {
      return false;
    },
    onChange: (file) => {
      setFileList(file.fileList);
      if (file.fileList.length === 0) {
        setHinhAnh([]);
        return;
      }
      const isImage = file.file.type === "image/png" || file.file.type === "image/jpg" || file.file.type === "image/jpeg";
      if (!isImage) {
        message.error(`${file.file.name} không phải file hình ảnh`);
        return;
      }
      setHinhAnh([file.fileList[0].originFileObj]);
    },
  };
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [

    {
      title: "Mã người dùng",
      dataIndex: "maNguoiDung",
      key: "maNguoiDung",
      width: "15%",
      ...getColumnSearchProps("maNguoiDung"),
      render: (maNguoiDung) => (
        <>
          <Tag color="success"> {maNguoiDung}</Tag>
        </>
      ),
    },

    {
      title: "Ảnh đại diện",
      dataIndex: "ten",
      key: "ten",
      width: "30%",
      ...getColumnSearchProps("ten"),
      render: (ten, record) => (
        <>
          <div style={{
            display: "flex",
            flexDirection: "row"
          }}>

            <div style={{
              height: '40px',
              width: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              borderRadius: "50%",
              border: "1px solid black"
            }}>
              <img src={record.anhDaiDien} style={{ width: "auto", height: "40px" }} />
            </div>
            <span style={{
              lineHeight: "40px",
              marginLeft: "4px"
            }}>{ten}</span>
          </div>
        </>
      ),
    },

    {
      title: "Số Điện Thoại ",
      dataIndex: "soDienThoai",
      key: "soDienThoai",
      width: "15%",
      ...getColumnSearchProps("soDienThoai"),
    },



    {
      title: "Ngày tạo",
      dataIndex: "ngayTao",
      key: "ngayTao",
      width: "15%",
      render: (text) => {
        return text ? dayjs(text).format('DD/MM/YYYY HH:mm:ss') : "Mới";
      },
    }
    ,
    {
      title: "Ngày cập nhật",
      dataIndex: "ngayCapNhat",
      key: "ngayCapNhat",
      width: "15%",
      render: (ngayCapNhat) => (
        <>
          {ngayCapNhat ? dayjs(ngayCapNhat).format('DD/MM/YYYY HH:mm:ss') : <Tag color="processing">Mới</Tag>}
        </>
      ),
    },

    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      width: "15%",
      render: text => {
        if (text === "HOATDONG") {
          return "Hoạt Động";
        } else if (text === "BIKHOA") {
          return "Bị Khóa";
        }
        return text;
      },
    },


    {
      title: "Thao tác",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: "15%",
      render: (id) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ModalView id={id} />
          <ModalCapNhat id={id} setData={setData} />
          <ModalXoa id={id} setData={setData} />
        </div>
      ),
    },
  ];

  const [data, setData] = useState([]);
  async function layDuLieu() {
    const data = await useNguoiDungStore.actions.fetchNguoiDung();
    setData(data.data.data);
  }


  useEffect(() => {
    layDuLieu();
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [api, contextHolder] = notification.useNotification();
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
  async function handleThemNguoiDung() {
    if (!nguoiDung.ho || !nguoiDung.ho.trim()) {
      openNotification("error", "Hệ thống", "Vui lòng nhập họ", "bottomRight");
      return;
    }
    if (/[\d!@#$%^&*()_+{}\[\]:;<>,.?~\\]/.test(nguoiDung.ho)) {
      openNotification("error", "Hệ thống", "Tên họ không được chứa số và ký tự đặc biệt", "bottomRight");
      return;
    }

    if (!nguoiDung.ten || !nguoiDung.ten.trim()) {
      openNotification("error", "Hệ thống", "Vui lòng nhập tên", "bottomRight");
      return;
    }
    if (/[\d!@#$%^&*()_+{}\[\]:;<>,.?~\\]/.test(nguoiDung.ten)) {
      openNotification("error", "Hệ thống", "Tên không được chứa số và ký tự đặc biệt", "bottomRight");
      return;
    }
    if (!nguoiDung.email || !nguoiDung.email.trim()) {
      openNotification("error", "Hệ thống", "Vui lòng nhập email", "bottomRight");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(nguoiDung.email.trim())) {
      openNotification("error", "Hệ thống", "Email không hợp lệ", "bottomRight");
      return;
    }
    if (!nguoiDung.matKhau || !nguoiDung.matKhau.trim()) {
      openNotification("error", "Hệ thống", "Vui lòng nhập mật khẩu", "bottomRight");
      return;
    }
    if (nguoiDung.matKhau.trim().length < 6) {
      openNotification("error", "Hệ thống", "Mật khẩu phải có ít nhất 6 ký tự", "bottomRight");
      return;
    }
    if (!nguoiDung.soDienThoai || !nguoiDung.soDienThoai.trim()) {
      openNotification("error", "Hệ thống", "Vui lòng nhập số điện thoại", "bottomRight");
      return;
    }
    const phoneNumberPattern = /^0\d{9}$/;
    if (!phoneNumberPattern.test(nguoiDung.soDienThoai.trim())) {
      openNotification("error", "Hệ thống", "Số điện thoại không hợp lệ", "bottomRight");
      return;
    }

    if (!hinhAnh) {
      openNotification(
        "error",
        "Hệ thống",
        "Chọn hình ảnh",
        "bottomRight"
      );
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    if (hinhAnh.length > 0) {
      formData.append("anhDaiDien", hinhAnh[0]);
    }
    formData.append("data", JSON.stringify(nguoiDung));
    try {
      const response = await useNguoiDungStore.actions.themNguoiDung(formData);
      if (response.data.status === "THAIBAI") {
        openNotification("error", "Hệ thống", "Đã tồn tại người dùng có email trên", "bottomRight");
        return
      }
      if (response && response.data && response.data.status === "THANHCONG") {
        openNotification("success", "Hệ thống", "Thêm người dùng thành công", "bottomRight");
        await layDuLieu();
      } else {
        throw new Error(response.data.message || "Thêm người dùng không thành công");
      }
    } catch (error) {
      openNotification("error", "Hệ thống", error.message, "bottomRight");
    } finally {
      setNguoiDung({ ho: "", ten: "", email: "", matKhau: "", soDienThoai: "", gioiTinh: null, hinhAnh: null });
      setFileList([]);
      setHinhAnh([]);
      form.resetFields();
      setIsLoading(false);
      setIsModalOpen(false);
    }
  }
  const options = [{
    label: "Khách hàng",
    value: "1"
  }, {
    label: "Nhân viên",
    value: "2"
  }, {
    label: "ADMIN",
    value: "3"
  },];


  return (
    <>
      {contextHolder}
      <div>
        <Header />
        <MenuAdmin />
        <div className="body-container">
          <div className="content">
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "12px 12px",
              }}
            >
              <Row
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "10px",
                }}
              >
                <Button type="primary" size="large" onClick={showModal}>
                  Thêm dữ liệu
                </Button>
              </Row>
              <Modal
                okButtonProps={{ style: { display: "none" } }}
                cancelButtonProps={{ style: { display: "none" } }}
                title="Thêm Người Dùng"
                open={isModalOpen}
                onCancel={handleCancel}
                centered
              >
                <Form
                  form={form}
                  name="wrap"
                  labelCol={{
                    flex: "110px",
                  }}
                  labelAlign="left"
                  labelWrap
                  onFinish={handleThemNguoiDung}
                  wrapperCol={{
                    flex: 1,
                  }}
                  colon={false}
                  style={{
                    maxWidth: 600,
                  }}
                >
                  <Form.Item
                    label="Họ"
                    name="Họ"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) => {
                        setNguoiDung({
                          ...nguoiDung,
                          ho: e.target.value,
                        });
                      }}
                      value={nguoiDung.ho}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Tên"
                    name="Tên "
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) => {
                        setNguoiDung({
                          ...nguoiDung,
                          ten: e.target.value,
                        });
                      }}
                      value={nguoiDung.ten}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="Email"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) => {
                        setNguoiDung({
                          ...nguoiDung,
                          email: e.target.value,
                        });
                      }}
                      value={nguoiDung.email}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Mật Khẩu"
                    name="Mật Khẩu"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input.Password
                      onChange={(e) => {
                        setNguoiDung({
                          ...nguoiDung,
                          matKhau: e.target.value,
                        });
                      }}
                      value={nguoiDung.matKhau}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Số Điện Thoại"
                    name="Số Điện Thoại"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) => {
                        setNguoiDung({
                          ...nguoiDung,
                          soDienThoai: e.target.value,
                        });
                      }}
                      value={nguoiDung.soDienThoai}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Quyền"
                    name="Quyền"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      mode="multiple"
                      allowClear
                      style={{
                        width: '100%',
                      }}
                      placeholder="Chọn quyền"
                      onChange={(e) => {
                        setNguoiDung({
                          ...nguoiDung,
                          quyen: e
                        })
                      }}
                      options={options}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Giới Tính"
                    name="gioiTinh"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng chọn giới tính!'
                      },
                    ]}
                  >
                    <Radio.Group
                      onChange={(e) => setNguoiDung({ ...nguoiDung, gioiTinh: e.target.value === "Nam" })}
                    >
                      <Radio value="Nam">Nam</Radio>
                      <Radio value="Nữ">Nữ</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item label="Ảnh đại diện"
                    name="Ảnh đại diện"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng chọn Ảnh đại diện!'
                      },
                    ]}>
                    <Upload
                      listType="picture-card"
                      {...props}
                      maxCount={1}
                      fileList={fileList}
                    >
                      <div>
                        <PlusOutlined />
                        <div
                          style={{
                            marginTop: 8,
                          }}
                        >
                          Upload
                        </div>
                      </div>
                    </Upload>
                  </Form.Item>

                  <Form.Item label=" ">
                    <Button
                      type="primary"
                      htmlType="submit"
                    >
                      Thêm mới
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
              <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 10 }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NguoiDung;