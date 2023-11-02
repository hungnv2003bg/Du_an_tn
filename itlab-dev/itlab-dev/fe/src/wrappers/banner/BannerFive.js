import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Rate } from "antd";
import { Badge, Card, Space } from "antd";
import StatisticsApi from "../../api/statistic/StatisticsApi";
import { AiOutlinePlus } from "react-icons/ai";

const BannerFive = () => {
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  // Get Top Selling Products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getProducts = async () => {
      try {
        let data = await StatisticsApi.GetTopSellingProducts();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();
  }, []);
  return (
    <div className="banner-area hm9-section-padding">
      <div className="container">
        <h2 className="banner-title">Thực Phẩm Bán Chạy</h2>
        {loading ? (
          <div className="d-flex justify-content-between">
            {Array.from({ length: 4 }).map(() => (
              <Skeleton width={260} height={260} />
            ))}
          </div>
        ) : (
          <div className="d-flex flex-column">
            <Slider {...settings}>
              {products.map((item, index) => {
                const originalPrice = item.product.price;
                const discountPercentage = item.product.discount;
                const discountedPrice =
                  originalPrice * (1 - discountPercentage / 100);
                return (
                  <div className="single-banner mb-20" key={index}>
                    <Link to={`/product/${item.productId || item.id}`}>
                      <Badge.Ribbon
                        text={`-${item.product.discount}%`}
                        style={{ insetInlineEnd: 2 }}
                        color="volcano">
                        <img
                          src={
                            item.product?.avartarImageProduct || item.image[0]
                          }
                          alt={item.product?.nameProduct || item.name}
                        />
                      </Badge.Ribbon>
                      <h3 className="product-name two-lines">
                        {item.product?.nameProduct}
                      </h3>
                      <div className="d-flex justify-content-between ">
                        <div className="container-price">
                          <span className="discount">
                            {discountedPrice.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </span>
                          <span className="price">
                            {originalPrice.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </span>
                        </div>
                        <div className="mx-4">
                          <AiOutlinePlus />
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </Slider>
          </div>
        )}
        <div className="view-more text-center mt-20 toggle-btn6 col-12">
          <Link
            className="loadMore6"
            to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
            Xem thêm
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BannerFive;
