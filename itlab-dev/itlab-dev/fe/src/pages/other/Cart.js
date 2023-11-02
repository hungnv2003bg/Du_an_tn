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
import Swal from "sweetalert2";
import CartApi from "../../api/cart/CartApi";

const Cart = ({
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
  let cartTotalPrice = 0;
  let cartTotalPriceOld = 0;

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
        Giỏ hàng
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">
                  Các mặt hàng trong giỏ hàng của bạn.
                </h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Đơn giá</th>
                            <th>Số lượng</th>
                            <th>tổng phụ</th>
                            <th>hoạt động</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((cartItem, key) => {
                            const discountedPrice = getDiscountPrice(
                              cartItem.price,
                              cartItem.discount
                            );

                            const finalProductPrice = (
                              cartItem.price * currency.currencyRate
                            ).toFixed(2);
                            const finalDiscountedPrice = (
                              discountedPrice * currency.currencyRate
                            ).toFixed(2);
                            cartTotalPriceOld +=
                              finalProductPrice * cartItem.quantity;
                            discountedPrice != null
                              ? (cartTotalPrice +=
                                  finalDiscountedPrice * cartItem.quantity)
                              : (cartTotalPrice +=
                                  finalProductPrice * cartItem.quantity);
                            return (
                              <tr key={key}>
                                <td className="product-thumbnail">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/product/" +
                                      cartItem.id
                                    }>
                                    <img
                                      className="img-fluid"
                                      src={
                                        process.env.PUBLIC_URL +
                                        cartItem.image[0]
                                      }
                                      alt="polyfood"
                                    />
                                  </Link>
                                </td>

                                <td className="product-name">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/product/" +
                                      cartItem.id
                                    }>
                                    {cartItem.name}
                                  </Link>
                                </td>

                                <td className="product-price-cart">
                                  {discountedPrice !== null ? (
                                    <Fragment>
                                      <span className="amount old">
                                        {parseInt(
                                          (
                                            currency.currencySymbol +
                                            finalProductPrice
                                          ).replace("$", "")
                                        ).toLocaleString("en-US") + " VND"}
                                      </span>
                                      <span className="amount">
                                        {parseInt(
                                          (
                                            currency.currencySymbol +
                                            finalDiscountedPrice
                                          ).replace("$", "")
                                        ).toLocaleString("en-US") + " VND"}
                                      </span>
                                    </Fragment>
                                  ) : (
                                    <span className="amount">
                                      {parseInt(
                                        (
                                          currency.currencySymbol +
                                          finalProductPrice
                                        ).replace("$", "")
                                      ).toLocaleString("en-US") + " VND"}
                                    </span>
                                  )}
                                </td>

                                <td className="product-quantity">
                                  <div className="cart-plus-minus">
                                    <button
                                      className="dec qtybutton"
                                      onClick={() => {
                                        if (cartItem.quantity <= 1) {
                                          Swal.fire({
                                            title: "Bạn có muốn xóa không?",
                                            text: "Bạn hãy suy nghĩ thật",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#3085d6",
                                            cancelButtonColor: "#d33",
                                            cancelButtonText: "Thôi",
                                            confirmButtonText: "Tôi chắc chắn",
                                          }).then((result) => {
                                            if (result.isConfirmed) {
                                              if (
                                                JSON.parse(
                                                  localStorage.getItem("user")
                                                )
                                              ) {
                                                CartApi.ChangeCartItem({
                                                  quantity: 1,
                                                  userId: JSON.parse(
                                                    localStorage.getItem("user")
                                                  ).user.userId,
                                                  productId: Number(
                                                    cartItem.id
                                                  ),
                                                  IsAdd: 0,
                                                });
                                              }
                                              decreaseQuantity(
                                                cartItem,
                                                addToast
                                              );
                                            }
                                          });
                                        } else {
                                          if (
                                            JSON.parse(
                                              localStorage.getItem("user")
                                            )
                                          ) {
                                            CartApi.ChangeCartItem({
                                              quantity: 1,
                                              userId: JSON.parse(
                                                localStorage.getItem("user")
                                              ).user.userId,
                                              productId: Number(cartItem.id),
                                              IsAdd: 0,
                                            });
                                          }
                                          decreaseQuantity(cartItem, addToast);
                                        }
                                      }}>
                                      -
                                    </button>
                                    <input
                                      className="cart-plus-minus-box"
                                      type="text"
                                      value={cartItem.quantity}
                                      readOnly
                                    />
                                    <button
                                      className="inc qtybutton"
                                      onClick={() => {
                                        if (
                                          JSON.parse(
                                            localStorage.getItem("user")
                                          )
                                        ) {
                                          CartApi.ChangeCartItem({
                                            quantity: 1,
                                            userId: JSON.parse(
                                              localStorage.getItem("user")
                                            ).user.userId,
                                            productId: Number(cartItem.id),
                                            IsAdd: 1,
                                          });
                                        }
                                        addToCart(
                                          cartItem,
                                          addToast,
                                          quantityCount
                                        );
                                      }}
                                      disabled={
                                        cartItem !== undefined &&
                                        cartItem.quantity &&
                                        cartItem.quantity >=
                                          cartItemStock(
                                            cartItem,
                                            cartItem.selectedProductColor,
                                            cartItem.selectedProductSize
                                          )
                                      }>
                                      +
                                    </button>
                                  </div>
                                </td>
                                <td className="product-subtotal">
                                  {discountedPrice !== null
                                    ? parseInt(
                                        (
                                          currency.currencySymbol +
                                          (
                                            finalDiscountedPrice *
                                            cartItem.quantity
                                          ).toFixed(2)
                                        ).replace("$", "")
                                      ).toLocaleString("en-US") + " VND"
                                    : parseInt(
                                        (
                                          currency.currencySymbol +
                                          (
                                            finalProductPrice *
                                            cartItem.quantity
                                          ).toFixed(2)
                                        ).replace("$", "")
                                      ).toLocaleString("en-US") + " VND"}
                                </td>

                                <td className="product-remove">
                                  <button
                                    onClick={() => {
                                      Swal.fire({
                                        title: "Bạn có muốn xóa không?",
                                        text: "Bạn hãy suy nghĩ thật",
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: "#3085d6",
                                        cancelButtonColor: "#d33",
                                        cancelButtonText: "Thôi",
                                        confirmButtonText: "Tôi chắc chắn",
                                      }).then((result) => {
                                        if (result.isConfirmed) {
                                          if (
                                            JSON.parse(
                                              localStorage.getItem("user")
                                            )
                                          ) {
                                            CartApi.ChangeCartItem({
                                              quantity: cartItem.quantity,
                                              userId: JSON.parse(
                                                localStorage.getItem("user")
                                              ).user.userId,
                                              productId: Number(cartItem.id),
                                              IsAdd: 0,
                                            });
                                          }
                                          deleteFromCart(cartItem, addToast);
                                        }
                                      });
                                    }}>
                                    <i className="fa fa-times"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link
                          to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                          Tiếp tục mua sắm
                        </Link>
                      </div>
                      <div className="cart-clear">
                        <button
                          onClick={() => {
                            Swal.fire({
                              title: "Bạn có muốn xóa hết hay không?",
                              text: "bạn phải suy nghĩ thật kỹ!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              cancelButtonText: "thôi",
                              confirmButtonText: "Đồng ý tôi đồng ý",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                if (result.isConfirmed) {
                                  if (
                                    JSON.parse(localStorage.getItem("user"))
                                  ) {
                                    CartApi.RemoveAllCart(
                                      JSON.parse(localStorage.getItem("user"))
                                        .user.userId
                                    );
                                  }
                                }
                                deleteAllFromCart(addToast);
                              }
                            });
                          }}>
                          Xóa giỏ hàng
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-2 col-md-6">
                    {/* <div className="discount-code-wrapper">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Use Coupon Code
                        </h4>
                      </div>
                      <div className="discount-code">
                        <p>Enter your coupon code if you have one.</p>
                        <form>
                          <input type="text" required name="name" />
                          <button className="cart-btn-2" type="submit">
                            Apply Coupon
                          </button>
                        </form>
                      </div>
                    </div> */}
                  </div>
                  <div className="col-lg-6 col-md-6"></div>
                  <div className="col-lg-4 col-md-12">
                    <div className="grand-totall">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gary-cart">
                          Tổng số giỏ hàng
                        </h4>
                      </div>
                      <h5>
                        Giá Gốc{" "}
                        <span
                          style={{
                            textDecoration: "line-through",
                            fontWeight: "normal",
                            color: "#ccc",
                          }}>
                          {parseInt(
                            (
                              currency.currencySymbol +
                              cartTotalPriceOld.toFixed(2)
                            ).replace("$", "")
                          ).toLocaleString("en-US") + " VND"}
                        </span>
                      </h5>

                      <h4 className="grand-totall-title">
                        Tổng cộng{" "}
                        <span>
                          {parseInt(
                            (
                              currency.currencySymbol +
                              cartTotalPrice.toFixed(2)
                            ).replace("$", "")
                          ).toLocaleString("en-US") + " VND"}
                        </span>
                      </h4>
                      <Link to={process.env.PUBLIC_URL + "/checkout"}>
                        Tiến hành kiểm tra
                      </Link>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      Không tìm thấy mặt hàng nào trong giỏ hàng <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                        Mua ngay
                      </Link>
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

Cart.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
