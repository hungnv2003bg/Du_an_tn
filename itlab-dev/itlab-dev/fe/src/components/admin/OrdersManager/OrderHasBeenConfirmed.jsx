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
} from "antd";

import OrderApi from "../../../api/order/OrderApi.js";
import { format } from "date-fns";
import LoadingSpin from "../../loading/LoadingSpin";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min.js";
import Swal from "sweetalert2";
import GiaoHangNhanhApi from "../../../api/ghn/GiaoHangNhanhApi.js";
import { useRef } from "react";
import Bill from "../../../pages/other/Bill.jsx";
import PrintButton from "../../../pages/other/PrintButton.jsx";
const { Option } = Select;
const OrderHasBeenConfirmed = () => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalShipOpen, setIsModalShipOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const history = useHistory();
  const [currenOrderDeatail, setCurrenOrderDeatail] = useState([]);
  const [dataCurrent, setDataCurrent] = useState({});
  const [curentInfo, setCurenInfo] = useState({});
  const [isModal, setIsModal] = useState(false);
  const invoiceRef = useRef(null);
  const handleCancelBill = () => {
    setIsModal(false);
  };
  const [dataCurrentShip, setDataCurrentShip] = useState({
    payment_type_id: 2,
    note: "",
    required_note: "",
    return_phone: "0352988596",
    to_name: "",
    to_phone: "",
    to_address: "",
    quantity: -1,
    cod_amount: -1,
    to_ward_code: "",
    to_district_id: -1,
    cod_amount: -1,
    content: "",
    weight: -1,
    insurance_value: -1,
    service_type_id: 2,
    pickup_time: -1,
    items: [
      {
        name: "",
        quantity: -1,
        price: -1,
      },
    ],
  });
  const [data, setData] = useState({
    totalItems: 0,
    totalPages: 0,
    page: 1,
    pageSize: 10,
    hasPrevious: false,
    hasNext: true,
    data: [],
  });
  const handleShipOk = () => {
    setIsModalShipOpen(false);
  };

  const handleShipCancel = () => {
    setIsModalShipOpen(false);
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
        const { data } = await OrderApi.OrderHasBeenConfirmed(param);
        setData(data);
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
      const excludedStatusIds = [4, 5, 12];
      const filteredOrderStatuses = data.filter(
        (orderStatus) => !excludedStatusIds.includes(orderStatus.orderStatusId)
      );
      setOptions(filteredOrderStatuses);
    } catch (error) {}
  };
  const onFinish = async (values) => {
    console.log("Form values:", values);
    const dataShip = {
      ...dataCurrentShip,
      note: values.note,
      required_note: values.required_note,
      content: values.content,
      weight: values.weight,
    };
    try {
      setLoading(true);
      const res = await GiaoHangNhanhApi.CreateOrder(dataShip);
      await OrderApi.updateOrderStatus({
        id: dataShip.orderId,
        idStatus: 9,
      });
      messageApi.open({
        type: "success",
        content: "Tiến hàng giao hàng thành công",
      });
      setLoading(false);
      setIsModalShipOpen(false);
      setTimeout(() => {
        history.go(0);
      }, 200);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Tiến hàng giao hàng thất bại do có phát sinh lỗi",
      });
      setLoading(false);
      setIsModalShipOpen(false);
    }
  };

  const weightOptions = Array.from({ length: 50 }, (_, index) => {
    const weightGrams = (index + 1) * 100;
    return (
      <Option key={weightGrams} value={weightGrams}>
        {`${weightGrams}g`}
      </Option>
    );
  });
  const handleChangeStatus = (id) => async (orderId, newStatus) => {
    if (newStatus.value == 9) {
      const dataOrderCurrent = data.data.filter(
        (x) => x.orderId === id.orderId
      )[0];
      setDataCurrentShip({
        ...dataCurrentShip,
        orderId: id.orderId,
        to_name: dataOrderCurrent.fullName,
        to_phone: dataOrderCurrent.phone,
        to_address: dataOrderCurrent.address,
        to_ward_code: `${dataOrderCurrent.wards}`,
        to_district_id: dataOrderCurrent.districts,
        quantity: dataOrderCurrent.orderDetails.length,
        cod_amount:
          dataOrderCurrent.paymentOrderPaymentId == 1
            ? dataOrderCurrent.actualPrice
            : 0,
        insurance_value: dataOrderCurrent.actualPrice,
        pickup_time: dataOrderCurrent.pickupTime,
        quantity: dataOrderCurrent.orderDetails.reduce((total, orderDetail) => {
          return total + orderDetail.quantity;
        }, 0),
        items: dataOrderCurrent.orderDetails.map((item, index) => {
          return {
            name: item.product.nameProduct,
            quantity: item.quantity,
            price: item.price * item.quantity,
          };
        }),
      });
      console.log(dataOrderCurrent);
      setIsModalShipOpen(true);
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
              return (
                <Select.Option
                  key={item.orderStatusId}
                  value={item.orderStatusId}>
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
        <Breadcrumb.Item>Đơn hàng đang chờ</Breadcrumb.Item>
      </Breadcrumb>
      {contextHolder}
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
          count={currenOrderDeatail.reduce(
            (total, product) => total + product.quantity,
            0
          )}
          currenOrderDeatail={currenOrderDeatail}
          ref={invoiceRef}
        />
        <PrintButton invoiceRef={invoiceRef} />
      </Modal>
      <Modal
        title="Thông tin gửi thêm cho người giao hàng"
        open={isModalShipOpen}
        onOk={handleShipOk}
        onCancel={handleShipCancel}>
        <Form
          onFinish={onFinish}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}>
          <Form.Item
            label="Nội dung"
            name="content"
            rules={[{ required: true, message: "nội dung cần phải có" }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Ghi chú" name="note">
            <Input />
          </Form.Item>

          <Form.Item
            label="Trọng lượng"
            name="weight"
            rules={[
              {
                required: true,
                message: "vui lòng nhập vào trọng lượng ước tính của đơn hàng",
              },
            ]}>
            <Select>{weightOptions}</Select>
          </Form.Item>

          <Form.Item
            label="Yêu cầu ghi chú"
            name="required_note"
            rules={[
              {
                required: true,
                message: "vui lòng phải có ghi chú cho người gửi hàng",
              },
            ]}>
            <Select>
              <Option value="CHOTHUHANG">
                Người mua có thể yêu cầu xem và dùng thử hàng hóa
              </Option>
              <Option value="CHOXEMHANGKHONGTHU">
                Người mua được xem hàng nhưng không được dùng thử hàng
              </Option>
              <Option value="KHONGCHOXEMHANG">
                Người mua không được phép xem hàng
              </Option>
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Button type="primary" htmlType="submit">
              Gửi
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
          showTotal={(total) => `Tổng ${total} đơn hàng đang chờ`}
        />
      </div>
    </>
  );
};

export default OrderHasBeenConfirmed;
