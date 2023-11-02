import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SectionTitleThree from "../../components/section-title/SectionTitleThree";
import ProductGridTwo from "./ProductGridTwo";
import { useEffect } from "react";
import { useState } from "react";
import categoryAPI from "../../api/category/CategoryApi";

const TabProductCategory = ({
  spaceBottomClass,
  category,
  productTabClass,
}) => {
  const [data, setDatas] = useState([
    {
      productTypeId: 1,
      nameProductType: "Hàng chay cấp đông",
      imageTypeProduct:
        "https://res.cloudinary.com/doedovklj/image/upload/v1686794187/xyz-abc_638224161851379056image.webp",
      createdAt: "2023-06-04T14:52:00.2831254",
      updatedAt: "2023-06-04T14:52:00.2831343",
      key: "ffdbe0b0-c0ba-4f86-b040-6c3b530fccbc",
    },
    {
      productTypeId: 3,
      nameProductType: "Món Cơm",
      imageTypeProduct:
        "https://res.cloudinary.com/doedovklj/image/upload/v1686794050/xyz-abc_638224160489753108image.webp",
      createdAt: "2023-06-13T14:20:31.2382471",
      updatedAt: "2023-06-13T14:20:31.2382622",
      key: "9748e660-c4c9-41a1-92db-e70b17503d05",
    },
    {
      productTypeId: 4,
      nameProductType: "Món Nộm",
      imageTypeProduct:
        "https://res.cloudinary.com/doedovklj/image/upload/v1686793993/xyz-abc_638224159912695779image.webp",
      createdAt: "2023-06-13T14:20:31.2382471",
      updatedAt: "2023-06-13T14:20:31.2382622",
      key: "175874d9-ec95-44a8-abad-c35de3a37275",
    },
    {
      productTypeId: 6,
      nameProductType: "Món Chay Mặn",
      imageTypeProduct:
        "https://res.cloudinary.com/doedovklj/image/upload/v1686793918/xyz-abc_638224159162019553image.webp",
      createdAt: "2023-06-13T14:20:31.2382471",
      updatedAt: "2023-06-13T14:20:31.2382622",
      key: "5890ac64-1ad3-486e-b2b8-d4a4d0b1e821",
    },
  ]);

  useEffect(async () => {
    try {
      // const res = await categoryAPI.GetCategoryFrontend();
      // setDatas(res);
    } catch (error) {}
  }, []);
  return (
    <div className={`product-area ${spaceBottomClass ? spaceBottomClass : ""}`}>
      <div className="container">
        <SectionTitleThree
          titleText="Loại sản phẩm"
          positionClass="text-center"
        />
        <Tab.Container defaultActiveKey={data && data[0].key}>
          <Nav
            variant="pills"
            className={`product-tab-list pt-35 pb-60 text-center ${
              productTabClass ? productTabClass : ""
            }`}>
            {data &&
              data.map((item, index) => {
                return (
                  <Nav.Item>
                    <Nav.Link eventKey={item.key}>
                      <h4>{item.nameProductType}</h4>
                    </Nav.Link>
                  </Nav.Item>
                );
              })}
          </Nav>
          <Tab.Content>
            {data &&
              data.map((item, index) => {
                return (
                  <Tab.Pane eventKey={item.key}>
                    <div className="row">
                      <ProductGridTwo
                        category={item.nameProductType}
                        type="new"
                        limit={8}
                        spaceBottomClass="mb-25"
                      />
                    </div>
                  </Tab.Pane>
                );
              })}
          </Tab.Content>
        </Tab.Container>
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

TabProductCategory.propTypes = {
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default TabProductCategory;
