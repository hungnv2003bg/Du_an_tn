import { useDispatch, useSelector } from "react-redux";
import { selectLanguage } from "../../../../language/selectLanguage";
import "./style.css";
import Header from "../../layout/header/Header";
import MenuAdmin from "../../layout/menu/MenuAdmin";
import {
  Col,
  Form,
  InputNumber,
  Modal,
  Row,
  Select,
  Spin,
  Table,
  Tag,
  notification,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space } from "antd";
import { useNhomSanPhamStore } from "./useNhomSanPhamStore";
import ModalCapNhat from "./ModalCapNhat";
import ModalXoa from "./ModalXoa";
import ModalView from "./ModalView";
import { useForm } from "antd/es/form/Form";
function SanPhamChiTiet() {
  const language = useSelector(selectLanguage);
  const dispath = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [sanPhamChiTiet, setSanPhamChiTiet] = useState(undefined);
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
      title: "Màu sắc",
      dataIndex: "mauSac",
      key: "mauSac",
      width: "12.5%",
      render: (mauSac) => <>{mauSac.tenMau}</>,
    },
    {
      title: "Kích thước",
      dataIndex: "kichThuoc",
      key: "kichThuoc",
      width: "12.5%",
      render: (kichThuoc) => <>{kichThuoc.tenKichThuoc}</>,
    },
    {
      title: "Số lượng tồn",
      dataIndex: "soLuongTon",
      key: "soLuongTon",
      width: "10%",
      render: (soLuongTon) => <>{soLuongTon ? soLuongTon : 0}</>,
    },
    {
      title: "Đã bán",
      dataIndex: "soLuongDaBan",
      key: "soLuongDaBan",
      width: "10%",
      render: (soLuongDaBan) => <>{soLuongDaBan ? soLuongDaBan : 0}</>,
    },
    {
      title: "Số lượng lỗi",
      dataIndex: "soLuongLoi",
      key: "soLuongLoi",
      width: "10%",
      render: (soLuongLoi) => <>{soLuongLoi ? soLuongLoi : 0}</>,
    },
    {
      title: "Số lượng trả hàng",
      dataIndex: "soLuongTraHang",
      key: "soLuongTraHang",
      width: "10%",
    },
    {
      title: "Ngày tạo",
      dataIndex: "ngayTao",
      key: "ngayTao",
      width: "10%",
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "ngayCapNhat",
      key: "ngayCapNhat",
      width: "10%",
      render: (ngayCapNhat) => (
        <>{ngayCapNhat ? ngayCapNhat : <Tag color="processing">Mới</Tag>}</>
      ),
    },
    {
      title: "Thao tác",
      dataIndex: "id",
      key: "maThietKe",
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
          <ModalCapNhat id={id} setData={setDataChiTiet} />
          <ModalXoa id={id} setData={setDataChiTiet} />
        </div>
      ),
    },
  ];

  const [data, setData] = useState(undefined);
  const [dataChiTiet, setDataChiTiet] = useState(undefined);
  const [thuocTinh, setThuocTinh] = useState();
  async function layDuLieu() {
    const data = await useNhomSanPhamStore.actions.fetchChatLieu();
    setData(data.data.data);
  }
  async function layDuLieu2() {
    const data = await useNhomSanPhamStore.actions.fetchThuocTinh();
    setThuocTinh(data.data);
  }
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    layDuLieu();
    layDuLieu2();
  }, []);
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
  async function handleThemChatLieu() {
    if (sanPhamChiTiet.mauSacId == null) {
      openNotification("error", "Hệ thống", "Chưa chọn màu sắc", "bottomRight");
      return;
    }
    if (sanPhamChiTiet.kichThuocId == null) {
      openNotification(
        "error",
        "Hệ thống",
        "Chưa chọn kích thước",
        "bottomRight"
      );
      return;
    }
    if (sanPhamChiTiet.soLuongTon < 1 || sanPhamChiTiet.soLuongTon == null) {
      openNotification(
        "error",
        "Hệ thống",
        "Chưa nhập số lượng",
        "bottomRight"
      );
      return;
    }
    if (!sanPhamChiTiet.sanPhamId) {
      openNotification(
        "error",
        "Hệ thống",
        "Chưa chọn sản phẩm",
        "bottomRight"
      );
      return;
    }
    const data = await useNhomSanPhamStore.actions.themChatLieu(sanPhamChiTiet);
    if (!data.data.data) {
      openNotification("error", "Hệ thống", "Đã tồn tại", "bottomRight");
      setIsModalOpen(false);
      return;
    }
    openNotification("success", "Hệ thống", "Thêm thành công", "bottomRight");
    setDataChiTiet(data.data.data);
    setSanPhamChiTiet(null);
    form.resetFields();
    setIsModalOpen(false);
  }
  async function handleSearchSelect(e) {
    const data =
      await useNhomSanPhamStore.actions.fetchSanPhamChiTietCuaSanPham(e.value);
    setDataChiTiet(data.data.data);
    setSanPhamChiTiet({
      ...sanPhamChiTiet,
      sanPhamId: e.value,
    });
  }
  const [form] = useForm()
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
                  marginBottom: "10px",
                }}
              >
                <Col span={12}>
                  <Select
                    style={{
                      width: "100%",
                    }}
                    showSearch
                    labelInValue
                    defaultValue={"Chọn sản phẩm"}
                    onChange={handleSearchSelect}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {data
                      ? data.map((option) => (
                        <Select.Option key={option.id} value={option.id}>
                          {option.tenSanPham}
                        </Select.Option>
                      ))
                      : ""}
                  </Select>
                </Col>
                <Col
                  span={12}
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button type="primary" size="large" onClick={showModal}>
                    Thêm chi tiết
                  </Button>
                </Col>
              </Row>
              <Modal
                okButtonProps={{ style: { display: "none" } }}
                cancelButtonProps={{ style: { display: "none" } }}
                title="Thêm chi tiết"
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
                    label="Màu sắc"
                    name="Màu sắc"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      labelInValue
                      optionLabelProp="children"
                      style={{
                        width: "100%",
                      }}
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                      onChange={(e) => {
                        setSanPhamChiTiet({
                          ...sanPhamChiTiet,
                          mauSacId: e.value,
                        });
                      }}
                    >
                      {thuocTinh
                        ? thuocTinh.mauSacList.map((option) => (
                          <Select.Option key={option.id} value={option.id}>
                            {option.tenMau}
                          </Select.Option>
                        ))
                        : ""}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Kích thước"
                    name="Kích thước"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      labelInValue
                      optionLabelProp="children"
                      style={{
                        width: "100%",
                      }}
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                      onChange={(e) => {
                        setSanPhamChiTiet({
                          ...sanPhamChiTiet,
                          kichThuocId: e.value,
                        });
                      }}
                    >
                      {thuocTinh
                        ? thuocTinh.kichThuocList.map((option) => (
                          <Select.Option key={option.id} value={option.id}>
                            {option.tenKichThuoc}
                          </Select.Option>
                        ))
                        : ""}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Số lượng tồn"
                    name="Số lượng tồn"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <InputNumber
                      onChange={(e) => {
                        setSanPhamChiTiet({
                          ...sanPhamChiTiet,
                          soLuongTon: e,
                        });
                      }}
                      value={sanPhamChiTiet ? sanPhamChiTiet.soLuongTon : null}
                      style={{
                        width: "100%",
                      }}
                      min={1}
                    />
                  </Form.Item>
                  <Form.Item label=" ">
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={handleThemChatLieu}
                    >
                      Thêm mới
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
              <Table
                columns={columns}
                dataSource={dataChiTiet}
                pagination={{ pageSize: 10 }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SanPhamChiTiet;
