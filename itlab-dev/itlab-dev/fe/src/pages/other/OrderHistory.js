import PropTypes from "prop-types";
import React, { Fragment, useRef, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useEffect } from "react";
import OrderApi from "../../api/order/OrderApi";
import {
  Button,
  Descriptions,
  Form,
  Image,
  Input,
  Modal,
  Pagination,
  Table,
  Tag,
} from "antd";
import LoadingSpin from "../../components/loading/LoadingSpin";
import { format } from "date-fns";
import Bill from "./Bill";
import PrintButton from "./PrintButton";
const Cart = ({ location, cartItems }) => {
  const twoDaysInMillis = 2 * 24 * 60 * 60 * 1000;
  const { pathname } = location;
  const [codeOrder, setCodeOrder] = useState("");
  const [loading, setLoading] = useState(false);
  const invoiceRef = useRef(null);
  const [currenOrderDeatail, setCurrenOrderDeatail] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [dataOrderHistory, setDataOrderHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCancelOpen, setIsModalCancelOpen] = useState(false);
  const [curentInfo, setCurenInfo] = useState({});
  const handleOkCancel = () => {
    setIsModalCancelOpen(false);
  };
  const handleCancelCancel = () => {
    setIsModalCancelOpen(false);
  };
  const onFinish = async (values) => {
    try {
      setLoading(true);
      await OrderApi.CancelOrder(codeOrder, values.content);
      setLoading(false);
      setParam({
        ...param,
      });
      setIsModalCancelOpen(false);
    } catch (error) {
      alert("hủy đơn thất bại");
    }
  };
  const showModal = (codeOrder, data) => {
    const orderDetails = dataOrderHistory.data.data.filter(
      (x) => x.codeOrder === codeOrder
    )[0];
    setCurenInfo({
      address: data.address,
      phone: data.phone,
      paymentOrder: data.paymentOrder.paymentMethod,
      noteOrder: data.noteOrder,
      imageComplete: data.imageComplete,
      orderStatus: data.orderStatus.name,
      actualPrice: data.actualPrice,
      paymentId: data.paymentId,
      fullName: data.fullName,
      email: data.address,
      createdAt: data.createdAt,
      codeOrder: data.codeOrder,
    });
    setCurrenOrderDeatail(
      orderDetails.orderDetails.map((item, index) => {
        return {
          productId: index + 1,
          nameProduct: item.product.nameProduct,
          avartarImageProduct: item.product.avartarImageProduct,
          priceOld: item.product.price.toLocaleString("vi-VN") + " " + "VNĐ",
          quantity: item.quantity,
          price: item.price.toLocaleString("vi-VN") + " " + "VNĐ",
          totalPrice:
            (item.price * item.quantity).toLocaleString("vi-VN") + " " + "VNĐ",
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
  const handleCancelBill = () => {
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
    pageSize: 6,
  });
  const CancelOrder = async (value) => {
    setIsModalCancelOpen(true);
    setCodeOrder(value);
  };

  useEffect(() => {
    const getDataApi = async () => {
      try {
        setLoading(true);
        const accountId = JSON.parse(localStorage.getItem("user")).accountId;
        const res = await OrderApi.GetOrderForUserId(accountId, param);

        setLoading(false);
        setDataOrderHistory(res);
      } catch (error) {}
    };
    getDataApi();
  }, [param]);
  const columns = [
    {
      title: "STT",
      dataIndex: "productId",
      key: "productId",
      align: "center",
    },
    {
      title: "Tên món",
      dataIndex: "nameProduct",
      key: "nameProduct",
      align: "center",
    },
    {
      title: "Ảnh món ăn",
      dataIndex: "avartarImageProduct",
      key: "avartarImageProduct",
      align: "center",
      render: (avartarImageProduct) => (
        <Image
          src={avartarImageProduct}
          alt={"image"}
          width={100}
          height={100}
          className="object-fit-cover border rounded border border-white"
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
        <div>
          <span className="mr-2 text-danger">{price}</span>
          <del style={{ color: "#535c68" }}>{record.priceOld}</del>
        </div>
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
    <Fragment>
      <MetaTags>
        <title>Poly Food | Lịch sử đơn hàng</title>
        <meta name="description" content="Cart page of PolyFood." />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
        Trang chủ
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Lịch sử đơn hàng
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        <Breadcrumb />
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={1200}
          footer={null}>
          <Descriptions title="Đơn của bạn tại POLYFOOD">
            <Descriptions.Item label="Tên khách hàng">
              {curentInfo && curentInfo.fullName}
            </Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">
              {curentInfo && curentInfo.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ">
              {curentInfo && curentInfo.address}
            </Descriptions.Item>
            <Descriptions.Item label="Tổng tiền">
              {curentInfo &&
                curentInfo.actualPrice &&
                curentInfo.actualPrice.toLocaleString("vi-VN")}{" "}
              VNĐ
            </Descriptions.Item>
            <Descriptions.Item label="Phương thức thanh toán">
              {curentInfo && (
                <Tag color={curentInfo.paymentId === 1 ? "cyan" : "green"}>
                  {curentInfo.paymentOrder}
                </Tag>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Mã hóa đơn">
              {curentInfo && curentInfo.codeOrder}
            </Descriptions.Item>
            {curentInfo && curentInfo.imageComplete && (
              <Descriptions.Item label="Ảnh xác nhận khi hoàn thành">
                <Image width={100} src={curentInfo.imageComplete} />
              </Descriptions.Item>
            )}
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
          <Table columns={columns} dataSource={currenOrderDeatail} />
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
        </Modal>
        <Modal
          title="Lý do hủy đơn"
          open={isModalCancelOpen}
          onOk={handleOkCancel}
          onCancel={handleCancelCancel}>
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

            <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
              <Button type="primary" htmlType="submit">
                Gửi
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {loading && (
              <div>
                <LoadingSpin />
              </div>
            )}
            {dataOrderHistory &&
            dataOrderHistory.data &&
            dataOrderHistory?.data?.data?.length > 0 ? (
              <>
                <h3 className="cart-page-title">Lịch sử đơn hàng</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>STT</th>
                            <th>Mã đơn hàng</th>
                            <th>Trạng thái đơn hàng</th>
                            <th>Ngày tạo đơn</th>
                            <th>Hành động</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dataOrderHistory.data.data.map((item, index) => (
                            <tr key={item.orderId}>
                              <td>{index + 1}</td>
                              <td className="product-thumbnail">
                                {item.codeOrder}
                              </td>
                              <td
                                className="product-name"
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}>
                                <Tag
                                  color={
                                    item.orderStatus.orderStatusId === 4
                                      ? "#70a1ff"
                                      : item.orderStatus.orderStatusId === 5
                                      ? "#2ed573"
                                      : item.orderStatus.orderStatusId === 7
                                      ? "#ff4757"
                                      : item.orderStatus.orderStatusId === 9
                                      ? "#ffa502"
                                      : item.orderStatus.orderStatusId === 12
                                      ? "red"
                                      : item.orderStatus.orderStatusId === 15
                                      ? "green"
                                      : "white"
                                  }>
                                  {item.orderStatus.name}
                                </Tag>
                              </td>

                              <td className="product-name">
                                {format(
                                  new Date(item.createdAt),
                                  "HH:mm:ss dd/MM/yyyy"
                                )}
                              </td>

                              <td className="product-quantity">
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent:
                                      item.orderStatus.orderStatusId == 4 &&
                                      new Date() - new Date(item.createdAt) <
                                        twoDaysInMillis
                                        ? "center"
                                        : "space-around",
                                  }}>
                                  {item.orderStatus.orderStatusId == 4 &&
                                    new Date() - new Date(item.createdAt) <
                                      twoDaysInMillis && (
                                      <Button
                                        type="dashed"
                                        onClick={() =>
                                          CancelOrder(item.codeOrder)
                                        }
                                        danger>
                                        Hủy đơn
                                      </Button>
                                    )}
                                  {item.orderStatus.orderStatusId == 4 &&
                                    new Date() - new Date(item.createdAt) <
                                      twoDaysInMillis && (
                                      <div style={{ width: "5px" }}> </div>
                                    )}
                                  <Button
                                    type="primary"
                                    onClick={() =>
                                      showModal(item.codeOrder, item)
                                    }>
                                    Chi tiết
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div
                      style={{
                        width: "70%",
                        height: "1px",
                        border: "2px inset #fff",
                        margin: "20px 15%",
                      }}></div>
                    <Pagination
                      style={{
                        textAlign: "right",
                        padding: "10px 20px",
                      }}
                      current={dataOrderHistory.data.page}
                      pageSize={dataOrderHistory.data.pageSize}
                      total={dataOrderHistory.data.totalItems}
                      onChange={handlePaginationChange}
                      showSizeChanger
                      showTotal={(total) => `Tổng ${total} đơn hàng`}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-drawer"></i>
                    </div>
                    <div className="item-empty-area__text">
                      Không tồn tại đơn hàng <br />{" "}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Cart;
