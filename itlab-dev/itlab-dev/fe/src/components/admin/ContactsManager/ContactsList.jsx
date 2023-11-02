import React, { useState } from "react";
import { useEffect } from "react";
import {
  Breadcrumb,
  Space,
  Table,
  Typography,
  Tag,
  Pagination,
  Button,
  Descriptions,
  Modal,
  message,
  Input,
  Form,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { format } from "date-fns";
import LoadingSpin from "../../loading/LoadingSpin";
import ContactApi from "../../../api/contact/ContactApi";
import TextArea from "antd/es/input/TextArea";

const { Paragraph } = Typography;
const ContactsList = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataCurrent, setDataCurrent] = useState([]);
  const [data, setData] = useState({
    totalItems: 0,
    totalPages: 0,
    page: 1,
    pageSize: 10,
    hasPrevious: false,
    hasNext: true,
    data: [],
  });
  const onFinish = async (values) => {
    const dataMess = {
      mess: values.username,
      email: dataCurrent[0]?.email,
    };
    try {
      setLoading(true);
      const res = await ContactApi.ReplyContact(dataMess);
      setLoading(false);
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      setLoading(false);
      setIsModalOpen(false);
    }
  };
  const showModal = (id) => {
    const dataContact = data?.data?.find((x) => x.contactId === id);
    if (dataContact) {
      setDataCurrent([
        {
          userId: dataContact.contactId,
          name: dataContact.userName,
          email: dataContact.email,
          phone: dataContact.phone,
          subject: dataContact.subject,
        },
      ]);
    }
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handlePaginationChange = (page, pageSize) => {
    setParam(
      (prev) =>
      (prev = {
        ...param,
        page: page,
        pageSize: pageSize,
      })
    );
  };
  const [param, setParam] = useState({
    page: 1,
    pageSize: 10,
    search: "",
  });
  const [searchText, setSearchText] = useState("");
  const handleSearch = (value) => {
    setSearchText(value);
    setParam((prev) => ({
      ...prev,
      searchName: value,
      page: 1,
    }));
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Tìm kiếm tên món...`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys[0])}
          style={{ marginBottom: 8, display: "block", height: 30 }}
        />
        <Space>
          <Button
            type="primary"
            size="small"
            onClick={() => handleSearch(selectedKeys[0])}
            style={{ width: 90 }}>
            Tìm
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={() => {
              clearFilters();
              setSearchText("");
              handleSearch("");
            }}
            danger
            style={{ width: 90 }}>
            Xóa
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase())
        : "",
    render: (text) => {
      return dataIndex === "userName" ? (
        <span>
          {searchText &&
            text.toLowerCase().includes(searchText.toLowerCase()) ? (
            <span>
              {text
                .split(new RegExp(`(${searchText})`, "gi"))
                .map((fragment, i) =>
                  fragment.toLowerCase() === searchText.toLowerCase() ? (
                    <span key={i} className="bg-warning">
                      {fragment}
                    </span>
                  ) : (
                    fragment
                  )
                )}
            </span>
          ) : (
            text
          )}
        </span>
      ) : (
        text
      );
    },
  });
  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const { data } = await ContactApi.getApiContact(param);
        setData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getUsers();
  }, [param]);

  const dataSource = data?.data?.map((item, index) => {
    return {
      key: index + 1,
      contactId: item.contactId,
      email: item.email,
      createdAt: item.createdAt,
      answered: item.answered,
    };
  });
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Ngày gửi",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (createdAt) => (
        <>{format(new Date(createdAt), "HH:mm:ss dd/MM/yyyy")}</>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "answered",
      key: "answered",
      align: "center",
      render: (answered) => (
        <>
          {answered ? (
            <Tag color="geekblue">Đã trả lời</Tag>
          ) : (
            <Tag color="volcano">Chưa trả lời</Tag>
          )}
        </>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "contactId",
      key: "contactId",
      align: "center",
      render: (contactId) => (
        <Space size="middle">
          <Button type="primary" onClick={(e) => showModal(contactId)}>
            Chi tiết
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}>
        <Breadcrumb.Item>Bảng điều khiển</Breadcrumb.Item>
        <Breadcrumb.Item>Danh sách Liên hệ</Breadcrumb.Item>
      </Breadcrumb>
      {contextHolder}
      <Modal
        open={isModalOpen}
        width={1100}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Descriptions title="Chi tiết đơn hàng">
          <Descriptions.Item label="Tên Người gửi">
            {dataCurrent.length > 0 && dataCurrent[0].name}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {dataCurrent.length > 0 && dataCurrent[0].phone}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {dataCurrent.length > 0 && dataCurrent[0].email}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày gửi">
            {format(
              new Date(dataSource.length > 0 && dataSource[0].createdAt),
              "HH:mm:ss dd/MM/yyyy"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Nội dung">
            <Paragraph>
              {dataCurrent.length > 0 && dataCurrent[0].subject}
            </Paragraph>
          </Descriptions.Item>
        </Descriptions>
        <Form
          name="basic"
          form={form}
          style={{
            maxWidth: 700,
          }}
          initialValues={{
            remember: true,
          }}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off">
          <Form.Item
            label="Nội dung trả lời"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}>
            <TextArea />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              gửi phản hồi
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <div>
        {loading && (
          <div>
            <LoadingSpin />
          </div>
        )}
        <Table dataSource={dataSource} columns={columns} pagination={false} />
        <Pagination
          style={{
            textAlign: "right",
            padding: "10px 20px",
          }}
          current={data.page}
          pageSize={data.pageSize}
          total={data.totalItems}
          onChange={handlePaginationChange}
          showSizeChanger
          showTotal={(total) => `Tổng ${total} sản phẩm`}
        />
      </div>
    </>
  );
};

export default ContactsList;
