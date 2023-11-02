import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  Pagination,
  Space,
  Table,
  Select,
  Tag,
  Button,
  message,
  Modal,
  Descriptions,
  Image,
  Form,
  Input,
  Upload,
} from "antd";
import OrderApi from "../../../api/order/OrderApi.js";
import { format } from "date-fns";
import LoadingSpin from "../../loading/LoadingSpin";
import { UploadOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min.js";
import Swal from "sweetalert2";
import { useRef } from "react";
import Bill from "../../../pages/other/Bill.jsx";
import PrintButton from "../../../pages/other/PrintButton.jsx";

const OrderBeingDilivered = () => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const history = useHistory();
  const idCurent = useRef(-1);
  const [currenOrderDeatail, setCurrenOrderDeatail] = useState([]);
  const [dataCurrent, setDataCurrent] = useState({});
  const [data, setData] = useState({
    totalItems: 0,
    totalPages: 0,
    page: 1,
    pageSize: 10,
    hasPrevious: false,
    hasNext: true,
    data: [],
  });
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [curentInfo, setCurenInfo] = useState({});
  const [isModalBill, setIsModalBill] = useState(false);
  const invoiceRef = useRef(null);
  const handleCancelBill = () => {
    setIsModalBill(false);
  };

  const onFinish = async (values) => {
    if (!fileList[0]) {
      return;
    }
    const formDataApi = new FormData();
    formDataApi.append("orderId", idCurent.current);
    formDataApi.append("formFile", fileList[0].originFileObj);
    try {
      setLoading(true);
      await OrderApi.CompleteOrder(formDataApi);
      setIsModal(false);
      history.go(0);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onChange = ({ fileList }) => {
    setFileList(fileList);
  };
  const showModal = (id) => {
    const dataOrderCurrent = data.data.filter((x) => x.orderId === id)[0];
    setDataCurrent(dataOrderCurrent);
    setCurenInfo({
      address: dataOrderCurrent.address,
      phone: dataOrderCurrent.phone,
      paymentOrder:
        dataCurrent.paymentOrderPaymentId === 1
          ? "Thanh Toán Khi Nhận Hàng"
          : "Thanh Toán Online",
      noteOrder: dataOrderCurrent.noteOrder,
      imageComplete: dataOrderCurrent.imageComplete,
      orderStatus: dataOrderCurrent.orderStatus.name,
      actualPrice: dataOrderCurrent.actualPrice,
      paymentId: dataOrderCurrent.paymentId,
      fullName: dataOrderCurrent.fullName,
      email: dataOrderCurrent.address,
      createdAt: dataOrderCurrent.createdAt,
      codeOrder: dataOrderCurrent.codeOrder,
    });
    setCurrenOrderDeatail(
      dataOrderCurrent.orderDetails.map((item, index) => {
        return {
          productId: index + 1,
          nameProduct: item.product.nameProduct,
          avartarImageProduct: item.product.avartarImageProduct,
          quantity: item.quantity,
          priceOld: item.product.price.toLocaleString("vi-VN") + " " + "vnd",
          price: item.price.toLocaleString("vi-VN") + " " + "VND",
          totalPrice:
            (item.price * item.quantity).toLocaleString("vi-VN") + " " + "VND",
        };
      })
    );
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOkComplete = () => {
    setIsModal(false);
  };
  const handleCancelComplete = () => {
    setIsModal(false);
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
  useEffect(() => {
    const getOrders = async () => {
      try {
        setLoading(true);
        const { data } = await OrderApi.GetBeingDelivered(param);
        setData(data);
        setLoading(false);
        // history.go(0);
      } catch (error) {
        setLoading(false);
      }
    };
    getOrders();
  }, [param]);
  const dataSource = data.data?.map((item, index) => {
    return {
      key: index + 1,
      orderId: item.orderId,
      code: item.codeOrder,
      fullName: item.fullName,
      createdAt: item.createdAt,
      paymentOrder:
        item.paymentOrderPaymentId == 1 ? (
          <Tag color="cyan">Thanh toàn khi nhận hàng</Tag>
        ) : (
          <Tag color="green">Thanh toán online</Tag>
        ),
      orderStatus: item.orderStatus,
    };
  });

  const [options, setOptions] = useState([]);
  useEffect(() => {
    getStatus();
  }, []);
  const getStatus = async () => {
    try {
      const data = await OrderApi.getOrderStatus();
      const excludedStatusIds = [4, 15, 12];
      const filteredOrderStatuses = data.filter(
        (orderStatus) => !excludedStatusIds.includes(orderStatus.orderStatusId)
      );
      setOptions(filteredOrderStatuses);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeStatus = (id) => async (orderId, newStatus) => {
    if (newStatus.value === 5) {
      idCurent.current = id.orderId;
      form.resetFields();
      setIsModal(true);
      return;
    }
    try {
      setLoading(true);
      const confirmResult = await Swal.fire({
        title: "Xác nhận thay đổi trạng thái?",
        text: "Bạn có chắc muốn thay đổi trạng thái này?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Không",
        confirmButtonText: "Chắc chắn rồi!",
      });
      if (confirmResult.isConfirmed) {
        await OrderApi.updateOrderStatus({
          id: id.orderId,
          idStatus: newStatus.value,
        });
        messageApi.open({
          type: "success",
          content: "Thay đổi trạng thái thành công",
        });
        setLoading(false);
        setTimeout(() => {
          history.go(0);
        }, 200);
        return;
      } else {
        setLoading(false);
        return;
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Thay đổi trạng thái thất bại",
      });
      return;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 4:
        return "#70a1ff";
      case 5:
        return "#2ed573";
      case 7:
        return "#ff4757";
      case 9:
        return "#ffa502";
    }
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      align: "center",
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "code",
      key: "code",
      align: "center",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "fullName",
      key: "fullName",
      align: "center",
    },

    {
      title: "Ngày đặt hàng",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (createdAt) => (
        <>{format(new Date(createdAt), "HH:mm:ss dd/MM/yyyy")}</>
      ),
    },
    {
      title: "Phương thức thanh toàn",
      dataIndex: "paymentOrder",
      key: "paymentOrder",
      align: "center",
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "orderStatus",
      key: "orderStatus",
      align: "center",
      render: (orderStatus, orderId) => (
        <Select
          value={orderStatus.orderStatusId}
          onChange={handleChangeStatus(orderId)}>
          {options &&
            options.map((item) => {
              const isDisable = item.orderStatusId === 4;
              return (
                <Select.Option
                  key={item.orderStatusId}
                  value={item.orderStatusId}
                  disabled={isDisable}>
                  <p
                    style={{
                      color: getStatusColor(item.orderStatusId),
                    }}>
                    {item.name}
                  </p>
                </Select.Option>
              );
            })}
        </Select>
      ),
    },
    {
      title: "Xem chi tiết",
      dataIndex: "orderId",
      key: "orderId",
      align: "center",
      render: (orderId) => (
        <Space size="middle">
          <Button type="primary" onClick={(e) => showModal(orderId)}>
            Chi tiết
          </Button>
        </Space>
      ),
    },
  ];
  const columnDeatail = [
    {
      title: "STT",
      dataIndex: "productId",
      key: "productId",
      align: "center",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "nameProduct",
      key: "nameProduct",
      align: "center",
    },
    {
      title: "Hình ảnh",
      dataIndex: "avartarImageProduct",
      key: "avartarImageProduct",
      align: "center",
      render: (avartarImageProduct) => (
        <Image
          src={avartarImageProduct}
          alt={"image"}
          width={100}
          height={100}
          className="object-fit-cover border rounded-circle border border-success"
        />
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (price, record) => (
        <span>
          <del style={{ color: "#535c68" }}>{record.priceOld}</del>
          <br />
          {price}
        </span>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      align: "center",
    },
  ];
  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}>
        <Breadcrumb.Item>Bảng điều khiển</Breadcrumb.Item>
        <Breadcrumb.Item>Đơn hàng đang giao</Breadcrumb.Item>
      </Breadcrumb>
      {contextHolder}
      <Modal
        title="Thêm xác nhận ảnh sản phẩm"
        open={isModal}
        onOk={handleOkComplete}
        onCancel={handleCancelComplete}>
        <Form form={form} onFinish={onFinish}>
          <Form.Item name="image" label="Image">
            <Upload
              //   fileList={fileList}
              beforeUpload={() => false}
              onChange={onChange}>
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        // title="Basic Modal"
        open={isModalOpen}
        width={1100}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Descriptions title="Chi tiết đơn hàng">
          <Descriptions.Item label="Tên khách hàng">
            {dataCurrent && dataCurrent.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {dataCurrent && dataCurrent.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Mã đơn hàng">
            {dataCurrent && dataCurrent.codeOrder}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {dataCurrent && dataCurrent.email}
          </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">
            {dataCurrent && dataCurrent.address}
          </Descriptions.Item>
          <Descriptions.Item label="Tổng đơn hàng">
            {" "}
            {dataCurrent &&
              dataCurrent.actualPrice &&
              dataCurrent.actualPrice.toLocaleString("vi-VN")}{" "}
            VND
          </Descriptions.Item>
          <Descriptions.Item label="Phương thức thanh toán">
            {dataCurrent && (
              <Tag
                color={
                  dataCurrent.paymentOrderPaymentId === 1 ? "cyan" : "green"
                }>
                {dataCurrent.paymentOrderPaymentId === 1
                  ? "Thanh Toán Khi Nhận Hàng"
                  : "Thanh Toán Online"}
              </Tag>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Hóa đơn">
            <Button
              size="small"
              type="primary"
              onClick={() => {
                setIsModalBill(true);
              }}>
              In hóa đơn
            </Button>
          </Descriptions.Item>
        </Descriptions>
        <Table columns={columnDeatail} dataSource={currenOrderDeatail} />
      </Modal>
      <div>
        <Modal
          title="Hóa đơn chi tiết"
          open={isModalBill}
          width={829}
          onCancel={handleCancelBill}
          footer={null}>
          <Bill
            curentInfo={curentInfo}
            currenOrderDeatail={currenOrderDeatail}
            ref={invoiceRef}
          />
          <PrintButton invoiceRef={invoiceRef} />
        </Modal>
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
          showTotal={(total) => `Tổng ${total} đơn hàng`}
        />
      </div>
    </>
  );
};

export default OrderBeingDilivered;
