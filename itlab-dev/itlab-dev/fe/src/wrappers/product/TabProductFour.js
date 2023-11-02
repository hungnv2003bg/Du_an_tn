import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import SectionTitleThree from "../../components/section-title/SectionTitleThree";
import ProductGridTwo from "./ProductGridTwo";

const TabProductFour = ({
  spaceBottomClass,
  category,
  productTabClass,
  titleText,
  status,
}) => {
  return (
    <div className={`product-area ${spaceBottomClass ? spaceBottomClass : ""}`}>
      <div className="container">
        <SectionTitleThree titleText={titleText} positionClass="text-center" />
        <div className="row my-10">
          {status == 1 ? (
            <ProductGridTwo
              category={category}
              type="saleItems"
              limit={8}
              spaceBottomClass="mb-25"
            />
          ) : (
              <ProductGridTwo
                category={category}
                type="new_product"
                limit={8}
                spaceBottomClass="mb-25"
              />
          )}
        </div>
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

TabProductFour.propTypes = {
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default TabProductFour;
