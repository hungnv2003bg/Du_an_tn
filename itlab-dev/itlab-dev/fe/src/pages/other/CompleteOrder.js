import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import {
  addToCart,
  decreaseQuantity,
  deleteFromCart,
  cartItemStock,
  deleteAllFromCart,
} from "../../redux/actions/cartActions";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { Button, Descriptions, Modal } from "antd";
import Bill from "./Bill";
import PrintButton from "./PrintButton";
import { useRef } from "react";

const CompleteOrder = ({
  location,
  cartItems,
  currency,
  decreaseQuantity,
  addToCart,
  deleteFromCart,
  deleteAllFromCart,
}) => {
  const [quantityCount] = useState(1);
  const { addToast } = useToasts();
  const { pathname } = location;
  const [dataBill, setDataBill] = useState(
    JSON.parse(localStorage.getItem("dataBill")) || ""
  );
  const invoiceRef = useRef(null);
  const [isModal, setIsModal] = useState(false);
  const handleCancelBill = () => {
    setIsModal(false);
  };
  let cartTotalPrice = 0;

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
                  <div className="item-empty-area__text">
                    <h1>Đã Hoàn Tất đơn hàng</h1> <br />{" "}
                    <h4>
                      Chúng tôi sẽ gửi thông báo về đơn hàng sớm nhất cho bạn
                    </h4>
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

CompleteOrder.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  decreaseQuantity: PropTypes.func,
  location: PropTypes.object,
  deleteAllFromCart: PropTypes.func,
  deleteFromCart: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },
    decreaseQuantity: (item, addToast) => {
      dispatch(decreaseQuantity(item, addToast));
    },
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    },
    deleteAllFromCart: (addToast) => {
      dispatch(deleteAllFromCart(addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompleteOrder);
