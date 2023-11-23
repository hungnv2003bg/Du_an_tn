
import { useDispatch, useSelector } from "react-redux";
import { selectLanguage } from "../../../language/selectLanguage";
import "./style.css";
import Header from "../layout/header/Header";
import MenuAdmin from "../layout/menu/MenuAdmin";
import { Form, Modal, Row, Table, Tag, notification } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space ,Image} from "antd";
import { useSuKienGiamGiaStore } from "./useSuKienGiamGiaStore";
import ModalCapNhat from "./ModalCapNhat";
import ModalXoa from "./ModalXoa";
import ModalView from "./ModalView";
import { useForm } from "antd/es/form/Form";
function SuKienGiamGia() {
  const [form] = useForm()
  const language = useSelector(selectLanguage);
  const dispath = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [suKienGiamGia, setSuKienGiamGia] = useState({
    tenSuKien: "",
  });
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
      title: "Tên sự kiện",
      dataIndex: "tenSuKien",
      key: "tenSuKien",
      width: "15%",
      ...getColumnSearchProps("tenSuKien"),
      render: (maNhom) => (
        <>
          <Tag color="success"> {maNhom}</Tag>
        </>
      ),
    },
    {
        title: "Logo sự kiện",
        dataIndex: "logoSuKien",
        key: "logoSuKien",
        width: "10%",
        render: (logoSuKien) => (
          <Image src={logoSuKien} style={{ width: "80px", height: "80px" }} />
        ),
      },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      key: "moTa",
      width: "20%",
      ...getColumnSearchProps("moTa"),
    },
    {
        title: "Ngày bắt đầu",
        dataIndex: "ngayBatDau",
        key: "ngayBatDau",
        width: "20%",
        ...getColumnSearchProps("ngayBatDau"),
      },
    {
      title: "Ngày cập nhật",
      dataIndex: "ngayCapNhat",
      key: "ngayCapNhat",
      width: "15%",
      render: (ngayCapNhat) => (
        <>{ngayCapNhat ? ngayCapNhat : <Tag color="processing">Mới</Tag>}</>
      ),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "ngayKetThuc",
      key: "ngayKetThuc",
      width: "15%",
    },
    {
        title: "Trạng thái",
        dataIndex: "trangThai",
        key: "trangThai",
        width: "20%",
        ...getColumnSearchProps("trangThai"),
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
    const data = await useSuKienGiamGiaStore.actions.fetchSuKienGiamGia();
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
  async function handleThemSuKienGiamGia() {
    if (suKienGiamGia.tenSuKien == "" ) {
      return;
    }
    const data = await useSuKienGiamGiaStore.actions.themSuKienGiamGia(suKienGiamGia);
    openNotification("success", "Hệ thống", "Thêm thành công", "bottomRight");
    setData(data.data.data);
    setSuKienGiamGia({
      ...suKienGiamGia,
      tenSuKien: "",
      logoSuKien: "",
      mota: "",
      ngayBatDau: "",
      ngayCapNhat: "",
      ngayKetThuc: "",
      ngayTao: "",
    });
    form.resetFields()
    setIsModalOpen(false);
  }
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
                title="Thêm sự kiện giảm giá"
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
                  wrapperCol={{
                    flex: 1,
                  }}
                  colon={false}
                  style={{
                    maxWidth: 600,
                  }}
                >
                  <Form.Item
                    label="Tên sự kiện"
                    name="Tên sự kiện"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) => {
                        setSuKienGiamGia({
                          ...suKienGiamGia,
                          tenSuKien: e.target.value,
                        });
                      }}
                      value={suKienGiamGia.tenSuKien}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Logo sự kiện"
                    name="Logo sự kiện"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) => {
                        setSuKienGiamGia({
                          ...suKienGiamGia,
                          logoSuKien: e.target.value,
                        });
                      }}
                      value={suKienGiamGia.logoSuKien}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Mô tả"
                    name="Mô tả"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) => {
                        setSuKienGiamGia({
                          ...suKienGiamGia,
                          moTa: e.target.value,
                        });
                      }}
                      value={suKienGiamGia.moTa}
                    />
                  </Form.Item>
                  <Form.Item label=" ">
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={handleThemSuKienGiamGia}
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

export default SuKienGiamGia;
