import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../helpers/product";
import { Rate } from "antd";
import ProductModal from "./ProductModal";
import CartApi from "../../api/cart/CartApi";

const ProductGridListSingle = ({
  product,
  currency,
  addToCart,
  addToWishlist,
  addToCompare,
  cartItem,
  wishlistItem,
  compareItem,
  sliderClassName,
  spaceBottomClass,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const { addToast } = useToasts();

  const discountedPrice = getDiscountPrice(product.price, product.discount);
  const finalProductPrice = +(product.price * currency.currencyRate).toFixed(2);
  const finalDiscountedPrice = +(
    discountedPrice * currency.currencyRate
  ).toFixed(2);
  return (
    <Fragment>
      <div
        className={`col-xl-4 col-sm-6 ${
          sliderClassName ? sliderClassName : ""
        }`}>
        <div
          className={`product-wrap ${
            spaceBottomClass ? spaceBottomClass : ""
          }`}>
          <div
            className="product-img"
            style={{
              width: "auto",
              height: "200px",
              objectFit: "contain",
              display: "flex",
              alignItems: "center",
            }}>
            <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
              <img
                className="default-img"
                src={process.env.PUBLIC_URL + product.image[0]}
                alt="polyfood"
              />
              {product.image.length > 1 ? (
                <img
                  className="hover-img"
                  src={process.env.PUBLIC_URL + product.image[1]}
                  alt="polyfood"
                />
              ) : (
                ""
              )}
            </Link>
            {product.discount || product.new_product ? (
              <div className="product-img-badges">
                {product.discount ? (
                  <span className="pink">- {product.discount}%</span>
                ) : (
                  ""
                )}
                {product.new_product ? <span className="purple">Mới</span> : ""}
              </div>
            ) : (
              ""
            )}
            <div className="product-action">
              <div className="pro-same-action pro-wishlist">
                <button
                  className={wishlistItem !== undefined ? "active" : ""}
                  disabled={wishlistItem !== undefined}
                  title={
                    wishlistItem !== undefined
                      ? "Đã thêm vào danh sách yêu thích"
                      : "Thêm vào danh sách yêu thích"
                  }
                  onClick={() => addToWishlist(product, addToast)}>
                  <i className="pe-7s-like" />
                </button>
              </div>
              <div className="pro-same-action pro-cart">
                {product.affiliateLink ? (
                  <a
                    href={product.affiliateLink}
                    rel="noopener noreferrer"
                    target="_blank">
                    Mua ngay
                  </a>
                ) : product.variation && product.variation.length >= 1 ? (
                  <Link to={`${process.env.PUBLIC_URL}/product/${product.id}`}>
                    Select Option
                  </Link>
                ) : product.stock && product.stock > 0 ? (
                  <button
                    onClick={() => {
                      if (JSON.parse(localStorage.getItem("user"))) {
                        CartApi.ChangeCartItem({
                          quantity: 1,
                          userId: JSON.parse(localStorage.getItem("user")).user
                            .userId,
                          productId: Number(product.id),
                          IsAdd: 1,
                        });
                      }
                      addToCart(product, addToast);
                    }}
                    className={
                      cartItem !== undefined && cartItem.quantity > 0
                        ? "active"
                        : ""
                    }
                    disabled={cartItem !== undefined && cartItem.quantity > 0}
                    title={
                      cartItem !== undefined
                        ? "Thêm vào giỏ hàng"
                        : "Thêm vào giỏ hàng"
                    }>
                    {" "}
                    <i className="pe-7s-cart"></i>{" "}
                    {cartItem !== undefined && cartItem.quantity > 0
                      ? "Đã thêm vào giỏ hàng"
                      : "Thêm vào giỏ hàng"}
                  </button>
                ) : (
                  <button disabled className="active">
                    Hết hàng
                  </button>
                )}
              </div>
              <div className="pro-same-action pro-quickview">
                <button onClick={() => setModalShow(true)} title="Quick View">
                  <i className="pe-7s-look" />
                </button>
              </div>
            </div>
          </div>
          <div className="product-content text-center">
            <h3
              style={{
                fontSize: "20px",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}>
              <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
                {product.name}
              </Link>
            </h3>
            <div className="product-price">
              {discountedPrice !== null ? (
                <Fragment>
                  <span>
                    {parseInt(
                      (currency.currencySymbol + finalDiscountedPrice).replace(
                        "$",
                        ""
                      )
                    ).toLocaleString("en-US") + " VND"}
                  </span>{" "}
                  <span className="old">
                    {parseInt(
                      (currency.currencySymbol + finalProductPrice).replace(
                        "$",
                        ""
                      )
                    ).toLocaleString("en-US") + " VND"}
                  </span>
                </Fragment>
              ) : (
                <span>
                  {parseInt(
                    (currency.currencySymbol + finalProductPrice).replace(
                      "$",
                      ""
                    )
                  ).toLocaleString("en-US") + " VND"}{" "}
                </span>
              )}
            </div>
            <div className="product-rating">
              {product.rating && product.rating > 0 ? (
                <Rate disabled defaultValue={product.rating} />
              ) : (
                <Rate disabled defaultValue={product.rating} />
              )}
            </div>
          </div>
        </div>
        <div className="shop-list-wrap mb-30">
          <div className="row">
            <div className="col-xl-4 col-md-5 col-sm-6">
              <div className="product-list-image-wrap">
                <div className="product-img">
                  <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
                    <img
                      className="default-img img-fluid"
                      src={process.env.PUBLIC_URL + product.image[0]}
                      alt="polyfood"
                    />
                    {product.image.length > 1 ? (
                      <img
                        className="hover-img img-fluid"
                        src={process.env.PUBLIC_URL + product.image[1]}
                        alt="polyfood"
                      />
                    ) : (
                      ""
                    )}
                  </Link>
                  {product.discount || product.new_product ? (
                    <div className="product-img-badges">
                      {product.discount ? (
                        <span className="pink">-{product.discount}%</span>
                      ) : (
                        ""
                      )}
                      {product.new_product_product ? (
                        <span className="purple">Mới</span>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="col-xl-8 col-md-7 col-sm-6">
              <div className="shop-list-content">
                <h3>
                  <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
                    {product.name}
                  </Link>
                </h3>
                {product.rating && product.rating > 0 ? (
                  <div className="rating-review">
                    <div className="product-list-rating">
                      <Rate disabled defaultValue={product.rating} />
                    </div>
                  </div>
                ) : (
                  <Rate disabled defaultValue={product.rating} />
                )}
                {product.shortDescription ? (
                  <p>{product.shortDescription}</p>
                ) : (
                  ""
                )}
                <div className="product-list-price">
                  {discountedPrice !== null ? (
                    <Fragment>
                      <span>
                        {parseInt(
                          (
                            currency.currencySymbol + finalDiscountedPrice
                          ).replace("$", "")
                        ).toLocaleString("en-US") + " VND"}
                      </span>{" "}
                      <span className="old">
                        {parseInt(
                          (currency.currencySymbol + finalProductPrice).replace(
                            "$",
                            ""
                          )
                        ).toLocaleString("en-US") + " VND"}
                      </span>
                    </Fragment>
                  ) : (
                    <span>
                      {parseInt(
                        (currency.currencySymbol + finalProductPrice).replace(
                          "$",
                          ""
                        )
                      ).toLocaleString("en-US") + " VND"}{" "}
                    </span>
                  )}
                </div>
                <div className="shop-list-actions d-flex align-items-center">
                  <div className="shop-list-btn btn-hover">
                    {product.affiliateLink ? (
                      <a
                        href={product.affiliateLink}
                        rel="noopener noreferrer"
                        target="_blank">
                        Mua ngay
                      </a>
                    ) : product.variation && product.variation.length >= 1 ? (
                      <Link
                        to={`${process.env.PUBLIC_URL}/product/${product.id}`}>
                        Select Option
                      </Link>
                    ) : product.stock && product.stock > 0 ? (
                      <button
                        onClick={() => {
                          if (JSON.parse(localStorage.getItem("user"))) {
                            CartApi.ChangeCartItem({
                              quantity: 1,
                              userId: JSON.parse(localStorage.getItem("user"))
                                .user.userId,
                              productId: Number(product.id),
                              IsAdd: 1,
                            });
                          }
                          addToCart(product, addToast);
                        }}
                        className={
                          cartItem !== undefined && cartItem.quantity > 0
                            ? "active"
                            : ""
                        }
                        disabled={
                          cartItem !== undefined && cartItem.quantity > 0
                        }
                        title={
                          cartItem !== undefined
                            ? "Đã thêm vào giỏ hàng"
                            : "Thêm vào giỏ hàng"
                        }>
                        {" "}
                        <i className="pe-7s-cart"></i>{" "}
                        {cartItem !== undefined && cartItem.quantity > 0
                          ? "Thêm"
                          : "Thêm vào giỏ hàng"}
                      </button>
                    ) : (
                      <button disabled className="active">
                        Hết hàng
                      </button>
                    )}
                  </div>
                  <div className="shop-list-wishlist ml-10">
                    <button
                      className={wishlistItem !== undefined ? "active" : ""}
                      disabled={wishlistItem !== undefined}
                      title={
                        wishlistItem !== undefined
                          ? "Đã thêm vào danh sách yêu thích"
                          : "thêm vào danh sách yêu thíc"
                      }
                      onClick={() => addToWishlist(product, addToast)}>
                      <i className="pe-7s-like" />
                    </button>
                  </div>
                  <div className="shop-list-compare ml-10">
                    <button
                      className={compareItem !== undefined ? "active" : ""}
                      disabled={compareItem !== undefined}
                      title={
                        compareItem !== undefined
                          ? "Đã thêm vào danh sách yêu thích"
                          : "thêm vào danh sách yêu thích"
                      }
                      onClick={() => addToCompare(product, addToast)}>
                      <i className="pe-7s-shuffle" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        currency={currency}
        discountedprice={discountedPrice}
        finalproductprice={finalProductPrice}
        finaldiscountedprice={finalDiscountedPrice}
        cartitem={cartItem}
        wishlistitem={wishlistItem}
        compareitem={compareItem}
        addtocart={addToCart}
        addtowishlist={addToWishlist}
        addtocompare={addToCompare}
        addtoast={addToast}
      />
    </Fragment>
  );
};

ProductGridListSingle.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItem: PropTypes.object,
  compareItem: PropTypes.object,
  currency: PropTypes.object,
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.object,
};

export default ProductGridListSingle;
