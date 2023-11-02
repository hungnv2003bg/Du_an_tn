import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { confirmOrder } from "../../redux/actions/cartActions";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import OrderApi from "../../api/order/OrderApi";
import LoadingSpin from "../loading/LoadingSpin";
import VoucherApi from "../../api/voucher/VoucherApi";
import CartApi from "../../api/cart/CartApi";
import { Button, Descriptions, Modal } from "antd";
import Bill from "../../pages/other/Bill";
import PrintButton from "../../pages/other/PrintButton";
import { useRef } from "react";

const ResVnPay = ({ location, confirmOrders }) => {
  const [paymentResult, setPaymentResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataBill, setDataBill] = useState(
    JSON.parse(localStorage.getItem("dataBill")) || ""
  );
  const invoiceRef = useRef(null);
  const [isModal, setIsModal] = useState(false);
  const handleCancelBill = () => {
    setIsModal(false);
  };
  useEffect(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const vnpResponseCode = urlParams.get("vnp_ResponseCode");
    const vnpAmount = urlParams.get("vnp_Amount");
    const vnpBankCode = urlParams.get("vnp_BankCode");
    const vnpTransactionNo = urlParams.get("vnp_TransactionNo");
    const vnpTxnRef = urlParams.get("vnp_TxnRef");
    const vnpTmnCode = urlParams.get("vnp_TmnCode");

    if (vnpResponseCode === "00") {
      confirmOrders();
      setPaymentResult({
        vnpAmount,
        vnpBankCode,
        vnpTransactionNo,
        vnpTxnRef,
        vnpTmnCode,
      });
      try {
        const storedData = JSON.parse(localStorage.getItem("dataOrderOnline"));
        localStorage.removeItem("dataOrderOnline");
        setLoading(true);
        const response = await OrderApi.CreateOrder(storedData);
        if (storedData.userId) {
          CartApi.RemoveAllCart(storedData.userId);
        }
        if (storedData.codeVoucher) {
          await VoucherApi.ApllyVoucher(
            storedData.userId,
            storedData.codeVoucher
          );
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
      return;
    } else {
      alert("Giao dịch thất bại");
    }
  }, []);

  const renderPaymentResult = () => {
    if (paymentResult) {
      return (
        <div>
          <p>
            Giao dịch được thực hiện thành công. Cảm ơn quý khách đã sử dụng
            dịch vụ
          </p>
          <p>Mã Website (Terminal ID): {paymentResult.vnpTmnCode}</p>
          <p>Mã giao dịch thanh toán: {paymentResult.vnpTxnRef}</p>
          <p>Mã giao dịch tại VNPAY: {paymentResult.vnpTransactionNo}</p>
          <p>Số tiền thanh toán (VND): {paymentResult.vnpAmount}</p>
          <p>Ngân hàng thanh toán: {paymentResult.vnpBankCode}</p>
        </div>
      );
    }
    return null;
  };
  const { pathname } = location;

  return (
    <Fragment>
      <MetaTags>
        <title>Poly Food | Giỏ hàng</title>
        <meta name="description" content="Cart page of PolyFood." />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
        Trang chủ
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Hoàn Tất Đơn Hàng
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="item-empty-area text-center">
                  <div className="item-empty-area__icon mb-30">
                    <i className="pe-7s-cart"></i>
                  </div>
                  {loading && (
                    <div>
                      <LoadingSpin />
                    </div>
                  )}
                  <div className="item-empty-area__text">
                    <h1>Đã Hoàn Tất đơn hàng</h1> <br />{" "}
                    <>{paymentResult && renderPaymentResult()}</>
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
                    <br />
                    <Modal
                      title="Hóa đơn chi tiết"
                      open={isModal}
                      width={829}
                      onCancel={handleCancelBill}
                      footer={null}>
                      <Bill
                        curentInfo={dataBill}
                        currenOrderDeatail={dataBill.currenOrderDeatail}
                        ref={invoiceRef}
                      />
                      <PrintButton invoiceRef={invoiceRef} />
                    </Modal>
                    <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                      Tiếp tục mua sắm
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

ResVnPay.propTypes = {
  confirmOrders: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    confirmOrders: () => {
      dispatch(confirmOrder());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResVnPay);
