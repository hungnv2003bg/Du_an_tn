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
} from "antd";
import OrderApi from "../../../api/order/OrderApi.js";
import { format } from "date-fns";
import LoadingSpin from "../../loading/LoadingSpin";
import Bill from "../../../pages/other/Bill.jsx";
import PrintButton from "../../../pages/other/PrintButton.jsx";
import { useRef } from "react";

const OrderList = () => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const invoiceRef = useRef(null);
  const [currenOrderDeatail, setCurrenOrderDeatail] = useState([]);
  const [dataCurrent, setDataCurrent] = useState({});
  const [isModal, setIsModal] = useState(false);
  const handleCancelBill = () => {
    setIsModal(false);
  };
  const [curentInfo, setCurenInfo] = useState({});
  const [data, setData] = useState({
    totalItems: 0,
    totalPages: 0,
    page: 1,
    pageSize: 10,
    hasPrevious: false,
    hasNext: true,
    data: [],
  });
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
        const { data } = await OrderApi.getAllOrders(param);
        const updatedDataSource = data.data.map((item) => {
          const orderStatusItem = dataSource.find(
            (prevItem) => prevItem.key === item.key
          );
          if (orderStatusItem) {
            item.orderStatus = orderStatusItem.orderStatus;
          }
          return item;
        });
        setData({ ...data, data: updatedDataSource });
        setLoading(false);
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
      setOptions(data);
    } catch (error) {}
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
      case 12:
        return "#EE3B3B";
      case 15:
        return "#00FA9A";
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
      render: (code) => <b>{code}</b>,
    },
    {
      title: "Tên khách hàng",
      dataIndex: "fullName",
      key: "fullName",
      align: "center",
    },

    {
      title: "Ngày đặt",
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
      render: (orderStatus) => (
        <p style={{ color: getStatusColor(orderStatus.orderStatusId) }}>
          {orderStatus.name}
        </p>
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
        <Breadcrumb.Item>Danh sách đơn hàng</Breadcrumb.Item>
      </Breadcrumb>
      {contextHolder}
      <Modal
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
            {dataCurrent &&
              dataCurrent.actualPrice &&
              dataCurrent.actualPrice.toLocaleString("vi-VN")}{" "}
            VNĐ
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
                setIsModal(true);
              }}>
              In hóa đơn
            </Button>
          </Descriptions.Item>
        </Descriptions>
        <Table columns={columnDeatail} dataSource={currenOrderDeatail} />
      </Modal>
      <Modal
        title="Hóa đơn chi tiết"
        open={isModal}
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
          showTotal={(total) => `Tổng ${total} đơn hàng`}
        />
      </div>
    </>
  );
};

export default OrderList;
