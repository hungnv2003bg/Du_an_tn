import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { getDiscountPrice } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { confirmOrder } from "../../redux/actions/cartActions";
import { useState } from "react";
import OrderApi from "../../api/order/OrderApi";
import { Spin, message } from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { typeOf } from "react-hooks-paginator";
import VoucherApi from "../../api/voucher/VoucherApi";
import CartApi from "../../api/cart/CartApi";
import AddressApi from "../../api/ghn/AddressApi";
import GiaoHangNhanhApi from "../../api/ghn/GiaoHangNhanhApi";
import { number } from "prop-types";

const Checkout = ({ location, cartItems, currency, confirmOrders }) => {
  const validateUserOrder = (userOrder) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const isValidEmail = emailRegex.test(userOrder.email);
    const isValidAddress =
      userOrder.address.trim() !== "" &&
      userOrder.pickupTime &&
      userOrder.districts &&
      userOrder.wards;
    const isValidFullName = userOrder.fullName.trim() !== "";
    const isValidPhone = phoneRegex.test(userOrder.phone);

    return isValidEmail && isValidAddress && isValidFullName && isValidPhone;
  };

  const [discount, setDiscount] = useState({
    voucherId: 1,
    voucherName: "",
    voucherCode: "",
    valuevoucher: 0,
    countVoucher: 0,
    expirationDate: "0000-08-17T09:50:40.151",
    createdAt: "2023-08-15T16:51:17.0633333",
    updatedAt: "0001-01-01T00:00:00",
    voucherUsers: null,
  });
  const [codeVoucher, setCodeVoucher] = useState("");
  const [loading, setLoading] = useState(false);
  const [transportFee, setTransportFee] = useState(0);
  const totalPriceOld = cartItems?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalPriceNew = cartItems?.reduce(
    (total, item) =>
      total + (item.price - (item.price / 100) * item.discount) * item.quantity,
    0
  );
  const localUser = localStorage.getItem("user");
  const [messageApi, contextHolder] = message.useMessage();
  const history = useHistory();
  // getProvinceData
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [intendTime, setIntendTime] = useState(-1);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState(null);
  console.log(selectedProvince, selectedDistrict, selectedWard);
  const [userOrder, setUserOrder] = useState({
    paymentId: 1,
    userId:
      localUser ?? localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).user.userId
        : null,
    orderStatusId: 4,
    noteOrder: "",
    fullName: localUser
      ? JSON.parse(localStorage.getItem("user")).user.userName
      : "",
    phone: localUser ? JSON.parse(localStorage.getItem("user")).user.phone : "",
    address: localUser
      ? JSON.parse(localStorage.getItem("user")).user.address
      : "",
    email: localUser ? JSON.parse(localStorage.getItem("user")).user.email : "",
    originalPrice: totalPriceOld,
    actualPrice:
      totalPriceNew +
      transportFee -
      (totalPriceNew / 100) * discount.valuevoucher,
    orderDetailDtos: cartItems?.map((item) => {
      return {
        productId: Number(item.id),
        quantity: item.quantity,
        price: item.price - (item.price / 100) * item.discount,
      };
    }),
  });
  useEffect(() => {
    setUserOrder({
      ...userOrder,
      wards: selectedWard,
      provinces: selectedProvince,
      districts: selectedDistrict,
      pickupTime: intendTime,
      actualPrice:
        totalPriceNew +
        transportFee -
        (totalPriceNew / 100) * discount.valuevoucher,
    });
  }, [discount, transportFee, selectedWard, intendTime]);
  console.log(userOrder);
  // getProvinceData
  useEffect(() => {
    const getProvinceData = async () => {
      try {
        const { data } = await AddressApi.getProvinceData();
        setProvinces(data);
      } catch (error) {}
    };
    getProvinceData();
  }, []);
  useEffect(async () => {
    try {
      const res = await GiaoHangNhanhApi.CalculateShippingFeeApi({
        service_id: 53320,
        coupon: null,
        to_district_id: parseInt(selectedDistrict),
        to_ward_code: `${selectedWard}`,
        weight: 1000,
      });
      const res2 = await GiaoHangNhanhApi.IntendTime({
        service_id: 53320,
        to_district_id: parseInt(selectedDistrict),
        to_ward_code: `${selectedWard}`,
      });
      setTransportFee(Number(res.data.data.total));
      setIntendTime(res2.data.data.leadtime);
    } catch (error) {}
  }, [selectedWard]);
  // getDistrictByProvince
  useEffect(() => {
    if (selectedProvince) {
      const getDistrictByProvince = async () => {
        try {
          const { data } = await AddressApi.getDistrictByProvince(
            selectedProvince
          );
          setDistricts(data);
        } catch (error) {}
      };
      getDistrictByProvince();
    }
  }, [selectedProvince]);
  // getWardsByDistrict
  useEffect(() => {
    if (selectedDistrict) {
      const getWardsByDistrict = async () => {
        try {
          const { data } = await AddressApi.getWardsByDistrict(
            selectedDistrict
          );

          setWards(data);
        } catch (error) {}
      };
      getWardsByDistrict();
    }
  }, [selectedDistrict]);
  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    setSelectedDistrict(null);
    setSelectedWard(null);
  };
  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setSelectedWard(null);
  };
  const handleWardChange = (e) => {
    setSelectedWard(e.target.value);
  };
  const { pathname } = location;
  let cartTotalPrice = 0;
  let cartTotalPriceDiscount = 0;
  const submitCodeVoucher = async (e) => {
    e.preventDefault();
    if (!JSON.parse(localStorage.getItem("user"))) {
      messageApi.open({
        type: "warning",
        content: "Bạn cần đăng nhập để có thể sử dụng mã giảm giá",
      });
      return false;
    }
    try {
      setLoading(true);
      const res = await VoucherApi.UseVoucher(userOrder.userId, codeVoucher);
      setLoading(false);
      messageApi.open({
        type: "success",
        content: "Mã giảm giá đã được áp dụng",
      });
      setDiscount(res.data);
    } catch (error) {
      setLoading(false);
      messageApi.open({
        type: "error",
        content: "Mã giảm giá không đúng hoặc không đã được sử dụng",
      });
    }
  };
  const confirmOrderShipCode = async () => {
    const data = userOrder;
    if (!validateUserOrder(data)) {
      messageApi.open({
        type: "warning",
        content: "Vui lòng kiểm tra các trường thông tin cần nhập",
      });
      return false;
    }
    // validate trang thanh toán
    try {
      data.paymentId = 1;
      setLoading(true);
      localStorage.setItem(
        "dataBill",
        JSON.stringify({
          address: data.address,
          phone: data.phone,
          paymentOrder: "Thanh Toán Khi Nhận Hàng",
          noteOrder: data.noteOrder,
          imageComplete: data.imageComplete,
          orderStatus: "đang sử lý",
          actualPrice: data.actualPrice,
          paymentId: data.paymentId,
          fullName: data.fullName,
          email: data.email,
          createdAt: new Date(),
          codeOrder: data.codeOrder,
          currenOrderDeatail: cartItems.map((item, index) => {
            return {
              productId: index + 1,
              nameProduct: item.name,
              avartarImageProduct: item.image,
              quantity: item.quantity,
              priceOld: item.price.toLocaleString("vi-VN") + " " + "vnd",
              price:
                (
                  item.price -
                  (item.price / 100) * item.discount
                ).toLocaleString("vi-VN") +
                " " +
                "VND",
              totalPrice:
                (
                  (item.price - (item.price / 100) * item.discount) *
                  item.quantity
                ).toLocaleString("vi-VN") +
                " " +
                "VND",
            };
          }),
        })
      );
      const response = await OrderApi.CreateOrder(data);
      if (codeVoucher) {
        await VoucherApi.ApllyVoucher(userOrder.userId, codeVoucher);
      }
      messageApi.open({
        type: "success",
        content: "Cảm ơn bạn đã mua sản phẩm của chúng tôi",
      });
      setLoading(false);
      setTimeout(function () {
        confirmOrders();
        CartApi.RemoveAllCart(userOrder.userId);
        history.push("/Complete");
      }, 1500);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Thanh toán thất bại",
      });
      setLoading(false);
    }
  };
  const confirmOrderPayOnline = async () => {
    const data = userOrder;
    data.paymentId = 3;
    validateUserOrder(data);
    if (!validateUserOrder(data)) {
      messageApi.open({
        type: "warning",
        content: "Vui lòng kiểm tra các trường thông tin cần nhập",
      });
      return false;
    }
    try {
      setLoading(true);
      localStorage.setItem(
        "dataBill",
        JSON.stringify({
          address: data.address,
          phone: data.phone,
          paymentOrder: "Thanh Toán online",
          noteOrder: data.noteOrder,
          imageComplete: data.imageComplete,
          orderStatus: "đang sử lý",
          actualPrice: data.actualPrice,
          paymentId: data.paymentId,
          fullName: data.fullName,
          email: data.email,
          createdAt: new Date(),
          codeOrder: data.codeOrder,
          currenOrderDeatail: cartItems.map((item, index) => {
            return {
              productId: index + 1,
              nameProduct: item.name,
              avartarImageProduct: item.image,
              quantity: item.quantity,
              priceOld: item.price.toLocaleString("vi-VN") + " " + "vnd",
              price:
                (
                  item.price -
                  (item.price / 100) * item.discount
                ).toLocaleString("vi-VN") +
                " " +
                "VND",
              totalPrice:
                (
                  (item.price - (item.price / 100) * item.discount) *
                  item.quantity
                ).toLocaleString("vi-VN") +
                " " +
                "VND",
            };
          }),
        })
      );
      const response = await OrderApi.CreateUrlVnPay(
        parseInt(data.actualPrice)
      );
      localStorage.setItem(
        "dataOrderOnline",
        JSON.stringify({ ...data, codeVoucher })
      );
      messageApi.open({
        type: "success",
        content: "Đang tạo liên kết đến VnPay",
      });
      setLoading(false);
      setTimeout(function () {
        window.location.href = response;
      }, 500);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Tạo link thanh toán thất bại",
      });
      setLoading(false);
    }
    // const response = await OrderApi.CreateOrder(data);
  };
  const onChanginput = (e) => {
    setUserOrder({
      ...userOrder,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Fragment>
      <MetaTags>
        <title>Poly Food | Checkout</title>
        <meta name="description" content="Checkout page of PolyFood." />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
        Trang chủ
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Thanh Toán
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3>Thông tin khách hàng</h3>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Họ và Tên</label>
                          <input
                            onChange={onChanginput}
                            name="fullName"
                            value={userOrder.fullName}
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="row">
                          <div className="col">
                            <div className="billing-select mb-20">
                              <label>Tỉnh - Thành</label>
                              <select
                                onChange={handleProvinceChange}
                                value={selectedProvince || ""}>
                                <option value="">Chọn tỉnh thành</option>
                                {provinces.data?.map((province) => (
                                  <option
                                    key={province.ProvinceID}
                                    value={province.ProvinceID}>
                                    {province.ProvinceName}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col">
                            <div className="billing-select mb-20">
                              <label>Quận - Huyện</label>
                              <select
                                onChange={handleDistrictChange}
                                value={selectedDistrict || ""}>
                                <option value="">Chọn quận huyện</option>
                                {districts.data?.map((district) => (
                                  <option
                                    key={district.DistrictID}
                                    value={district.DistrictID}>
                                    {district.DistrictName}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col">
                            <div className="billing-select mb-20">
                              <label>Phường - Xã</label>
                              <select
                                onChange={handleWardChange}
                                value={selectedWard || ""}>
                                <option>Chọn phường xã</option>
                                {wards.data?.map((ward) => (
                                  <option
                                    key={ward.WardID}
                                    value={ward.WardCode}>
                                    {ward.WardName}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Địa chỉ</label>
                          <input
                            className="billing-address"
                            name="address"
                            // placeholder="Nhập địa chỉ của bạn"
                            type="text"
                            value={userOrder.address}
                            onChange={onChanginput}
                          />
                          {/* <input
                            placeholder="Apartment, suite, unit etc."
                            type="text"
                          /> */}
                        </div>
                      </div>
                      {/* <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Town / City</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>State / County</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Postcode / ZIP</label>
                          <input type="text" />
                        </div>
                      </div> */}
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Điện thoại</label>
                          <input
                            type="text"
                            onChange={onChanginput}
                            name="phone"
                            value={userOrder.phone}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Email</label>
                          <input
                            name="email"
                            onChange={onChanginput}
                            type="text"
                            value={userOrder.email}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="additional-info-wrap">
                      <h4>Ghi chú</h4>
                      <div className="additional-info">
                        {/* <label>Order notes</label> */}
                        <textarea
                          // placeholder="Notes about your order, e.g. special notes for delivery. "
                          name="noteOrder"
                          onChange={onChanginput}
                          value={userOrder.noteOrder}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="your-order-area">
                    <h3 className="text-uppercase">Đơn hàng</h3>
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul>
                            <li>Sản Phẩm</li>
                            <li>Tổng số lượng</li>
                          </ul>
                        </div>
                        {contextHolder}
                        {loading && (
                          <div style={{ width: "100%", textAlign: "center" }}>
                            <Spin
                              style={{ textAlign: "center" }}
                              size="large"
                            />
                          </div>
                        )}
                        <div className="your-order-middle">
                          <ul>
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

                              discountedPrice != null
                                ? (cartTotalPrice +=
                                    finalDiscountedPrice * cartItem.quantity)
                                : (cartTotalPrice +=
                                    finalProductPrice * cartItem.quantity);
                              return (
                                <li key={key}>
                                  <span className="order-middle-left">
                                    {cartItem.name} X {cartItem.quantity}
                                  </span>{" "}
                                  <span className="order-price">
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
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="your-order-bottom">
                          <ul>
                            <li className="your-order-shipping">
                              Chi phí vận chuyển
                            </li>
                            <li>
                              {transportFee != 0
                                ? transportFee.toLocaleString("en-US") + " VND"
                                : "đang tính chi phí"}
                            </li>
                          </ul>
                        </div>
                        {discount && discount.valuevoucher > 0 && (
                          <div className="your-order-total">
                            <ul>
                              <li style={{ color: "black" }}>
                                Tên voucher: {discount.voucherName}
                              </li>
                              <li style={{ color: "black" }}>
                                Giá trị giảm {discount.valuevoucher}%
                              </li>
                            </ul>
                          </div>
                        )}
                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">Tổng cộng</li>
                            <li>
                              <div style={{ display: "none" }}>
                                {
                                  (cartTotalPriceDiscount =
                                    cartTotalPrice -
                                    (cartTotalPrice / 100) *
                                      discount.valuevoucher)
                                }
                                {
                                  (cartTotalPriceDiscount =
                                    cartTotalPriceDiscount + transportFee)
                                }
                              </div>
                              {discount.valuevoucher > 0 ? (
                                <del className="text-dark">
                                  {parseInt(
                                    (
                                      currency.currencySymbol +
                                      cartTotalPrice.toFixed(2)
                                    ).replace("$", "")
                                  ).toLocaleString("en-US") + " VND"}
                                </del>
                              ) : (
                                parseInt(
                                  (cartTotalPrice + transportFee)
                                    .toFixed(2)
                                    .replace("$", "")
                                ).toLocaleString("en-US") + " VND"
                              )}
                            </li>
                            {discount.valuevoucher > 0 && (
                              <li>
                                {parseInt(
                                  (
                                    currency.currencySymbol +
                                    cartTotalPriceDiscount.toFixed(2)
                                  ).replace("$", "")
                                ).toLocaleString("en-US") + " VND"}
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method">
                        <b>Thời gian giao hàng dự kiến</b>:{" "}
                        {intendTime !== -1
                          ? Math.floor(
                              Math.abs(
                                intendTime - Math.floor(Date.now() / 1000)
                              ) /
                                (60 * 60 * 24)
                            ) === 1
                            ? "Đơn hàng sẽ được giao trong ngày"
                            : Math.floor(
                                Math.abs(
                                  intendTime - Math.floor(Date.now() / 1000)
                                ) /
                                  (60 * 60 * 24)
                              ) + " ngày"
                          : "Vui lòng nhập vào địa chỉ."}
                      </div>
                      <div className="payment-method">
                        <li style={{ color: "#f58634", padding: "10px 0" }}>
                          {" "}
                          Chi phí cuối cùng đã là chi phí đã được tính cùng với
                          phí vận chuyển
                        </li>
                      </div>
                    </div>
                    <div className="place-order mt-25">
                      <button
                        className="btn-hover"
                        onClick={confirmOrderShipCode}>
                        Thanh Toán khi nhận hàng
                      </button>
                    </div>
                    <div className="place-order mt-25">
                      <button
                        className="btn-hover"
                        onClick={confirmOrderPayOnline}>
                        Thanh Toán online
                      </button>
                    </div>
                  </div>
                  <br />
                  <div className="discount-code-wrapper">
                    <div className="title-wrap">
                      <h4 className="cart-bottom-title section-bg-gray">
                        Mã giảm giá
                      </h4>
                    </div>
                    <div className="discount-code">
                      <p>Nhập mã giảm giá của bạn (nếu có).</p>
                      <form>
                        <input
                          type="text"
                          required
                          name="name"
                          onChange={(e) => setCodeVoucher(e.target.value)}
                        />

                        <button
                          className="cart-btn-2"
                          type="submit"
                          onClick={submitCodeVoucher}>
                          Áp dụng
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                        Shop Now
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

Checkout.propTypes = {
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
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
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
