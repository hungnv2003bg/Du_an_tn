import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import OrderApi from "../../api/order/OrderApi";
import { Pagination, Rate, Spin, message } from "antd";
import ProductReviewApi from "../../api/product/ProductReviewApi";
import { useHistory } from "react-router-dom";

const ProductDescriptionTab = ({
  spaceBottomClass,
  productFullDesc,
  productId,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const history = useHistory();
  const [dataMess, setDataMess] = useState();
  const [isPurchased, setIsPurchased] = useState(false);
  const [ContentRated, setContentRated] = useState({
    productId: productId,
    userId: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).user.userId
      : -1,
    contentRated: "",
    pointEvaluation: 5,
    status: 1,
  });
  const [rating, setRating] = useState(0); // Trạng thái để lưu giá trị điểm

  const handleRateChange = (value) => {
    setRating(value); // Cập nhật giá trị điểm trong trạng thái
    setContentRated({
      ...ContentRated,
      pointEvaluation: value,
    });
  };
  const [param, setParam] = useState({
    ProductId: productId,
    page: 1,
    pageSize: 5,
  });
  useEffect(async () => {
    try {
      setLoading(true);
      const res = await ProductReviewApi.getReviewForproduct(param);
      setDataMess(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [param]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : ""
  );
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
  const subMitMess = async (e) => {
    e.preventDefault();
    if (
      ContentRated.contentRated.length <= 0 ||
      ContentRated.contentRated.length > 255
    ) {
      messageApi.open({
        type: "warning",
        content: "Bình luận quá ngắn hoặc quá dài",
      });
      return;
    }
    try {
      setLoading(true);
      await ProductReviewApi.SeenMess(ContentRated);

      messageApi.open({
        type: "success",
        content: "Cảm ơn bạn đã bình luận về sản phẩm này.",
      });
      setLoading(false);
      setTimeout(() => {
        history.go(0);
      }, 500);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(async () => {
    if (user) {
      try {
        setLoading(true);
        const res = await OrderApi.isPurchased(user.user.userId, productId);
        if (res.isPurchased) {
          setIsPurchased(true);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  }, [productId, user]);
  return (
    <div className={`description-review-area ${spaceBottomClass}`}>
      <div className="container">
        <div className="description-review-wrapper">
          <Tab.Container defaultActiveKey="productDescription">
            <Nav variant="pills" className="description-review-topbar">
              {/* <Nav.Item>
                <Nav.Link eventKey="additionalInfo">
                  Additional Information
                </Nav.Link>
              </Nav.Item> */}
              <Nav.Item>
                <Nav.Link eventKey="productDescription">
                  Mô tả chi tiết
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productReviews">
                  Đánh giá (
                  {dataMess && dataMess.totalItems > 0
                    ? dataMess.totalItems
                    : 0}
                  )
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="description-review-bottom">
              {/* <Tab.Pane eventKey="additionalInfo">
                <div className="product-anotherinfo-wrapper">
                  <ul>
                    <li>
                      <span>Weight</span> 400 g
                    </li>
                    <li>
                      <span>Dimensions</span>10 x 10 x 15 cm{" "}
                    </li>
                    <li>
                      <span>Materials</span> 60% cotton, 40% polyester
                    </li>
                    <li>
                      <span>Other Info</span> American heirloom jean shorts pug
                      seitan letterpress
                    </li>
                  </ul>
                </div>
              </Tab.Pane> */}
              <Tab.Pane eventKey="productDescription">
                {productFullDesc}
              </Tab.Pane>
              <Tab.Pane eventKey="productReviews">
                <div className="row">
                  {loading && (
                    <div style={{ width: "100%", textAlign: "center" }}>
                      <Spin style={{ textAlign: "center" }} size="large" />
                    </div>
                  )}
                  <div className="col-lg-7">
                    {dataMess && dataMess.totalItems > 0 ? (
                      dataMess.data.map((item, index) => (
                        <div className="review-wrapper">
                          <div className="single-review">
                            <div className="review-img">
                              <img
                                style={{ width: 80, height: 90 }}
                                src={item.user.account.avartar}
                                alt="polyfood"
                              />
                            </div>
                            <div className="review-content">
                              <div className="review-top-wrap">
                                <div className="review-left">
                                  <div className="review-name">
                                    <h4>
                                      {item.user.userName
                                        ? item.user.userName
                                        : item.user.account.userName}
                                    </h4>
                                  </div>
                                  <div className="review-rating">
                                    {Array.from(
                                      { length: item.pointEvaluation },
                                      (_, index) => index + 1
                                    ).map((number) => {
                                      return <i className="fa fa-star" />;
                                    })}
                                  </div>
                                </div>
                                <div className="review-left">
                                  {/* <button>Reply</button> */}
                                </div>
                              </div>
                              <div className="review-bottom">
                                <p>{item.contentRated}.</p>
                              </div>
                            </div>
                          </div>
                          {item.contentSeen && (
                            <div className="single-review child-review">
                              <div className="review-img">
                                <img
                                  style={{ width: 80, height: 90 }}
                                  src="https://cdn-icons-png.flaticon.com/512/186/186037.png"
                                  alt="polyfood"
                                />
                              </div>
                              <div className="review-content">
                                <div className="review-top-wrap">
                                  <div className="review-left">
                                    <div className="review-name">
                                      <h4>Đội ngũ Poly-food</h4>
                                    </div>
                                    {/* <div className="review-rating">
                                      <i className="fa fa-star" />
                                      <i className="fa fa-star" />
                                      <i className="fa fa-star" />
                                      <i className="fa fa-star" />
                                      <i className="fa fa-star" />
                                    </div> */}
                                  </div>
                                  <div className="review-left">
                                    {/* <button>Reply</button> */}
                                  </div>
                                </div>
                                <div className="review-bottom">
                                  <p>{item.contentSeen}.</p>
                                </div>
                              </div>
                            </div>
                          )}

                          <br />
                        </div>
                      ))
                    ) : (
                      <p>Sản phẩm chưa được bình luận</p>
                    )}{" "}
                    {dataMess && dataMess.totalItems > 0 && (
                      <Pagination
                        style={{
                          textAlign: "center",
                          padding: "10px 20px",
                        }}
                        current={dataMess ? dataMess.page : 1}
                        pageSize={dataMess ? dataMess.pageSize : 1}
                        total={dataMess ? dataMess.totalItems : 1}
                        onChange={handlePaginationChange}
                        showSizeChanger
                        showTotal={(total) => `Tổng ${total} bình lu`}
                      />
                    )}
                  </div>
                  <div className="col-lg-5">
                    <div className="ratting-form-wrapper pl-50">
                      <h3>Gửi bình luận</h3>
                      {contextHolder}
                      <div className="ratting-form">
                        {isPurchased ? (
                          <form action="#">
                            <div className="star-box">
                              {/* <span>Your rating:</span>
                            <div className="ratting-star">
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                            </div> */}
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="rating-form-style mb-10">
                                  {/* <input placeholder="Name" type="text" /> */}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="rating-form-style mb-10">
                                  {/* <input placeholder="Email" type="email" /> */}
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div className="rating-form-style form-submit">
                                  <div>
                                    <h5>Điểm Đánh Giá</h5>
                                    <Rate
                                      onChange={handleRateChange}
                                      value={rating}
                                    />{" "}
                                  </div>
                                  <br />
                                  <h5>Nội dung đánh giá</h5>
                                  <textarea
                                    name="ContentRated"
                                    placeholder="Nội dung"
                                    value={ContentRated.contentRated}
                                    onChange={(e) =>
                                      setContentRated({
                                        ...ContentRated,
                                        contentRated: e.target.value,
                                      })
                                    }
                                  />
                                  <input
                                    type="submit"
                                    defaultValue="Gửi"
                                    onClick={subMitMess}
                                  />
                                </div>
                              </div>
                            </div>
                          </form>
                        ) : (
                          <h3
                            style={{
                              color: "#484747",
                              padding: "20% 0",
                              lineHeight: "30px",
                            }}>
                            Bạn cần mua sản phẩm để có thể tham gia đánh giá
                          </h3>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </div>
  );
};

ProductDescriptionTab.propTypes = {
  productFullDesc: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default ProductDescriptionTab;
