import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import ProductApi from "../../api/product/ProductApi";

const Product = ({ location, product }) => {
  const { pathname } = location;
  useEffect(async () => {
    try {
      let productView = [];
      if (localStorage.getItem("productView")) {
        productView = [...JSON.parse(localStorage.getItem("productView"))];
      }
      if (productView.filter((x) => x.id === Number(product.id))[0]) {
        return;
      }
      const res = await ProductApi.IncreaseViews(product.id);
      productView.push({
        id: Number(product.id),
      });
      localStorage.setItem("productView", JSON.stringify(productView));
    } catch (error) { }
  }, [product.id]);
  return (
    <Fragment>
      <MetaTags>
        <title>Poly Food | Chi tiết sản phẩm</title>
        <meta name="description" content="Product page of PolyFood." />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
        Trang chủ
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Chi tiết sản phẩm
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        {/* product description with image */}
        <ProductImageDescription
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          product={product}
        />

        {/* product description tab */}
        <ProductDescriptionTab
          spaceBottomClass="pb-90"
          productFullDesc={product.fullDescription}
          productId={product.id}
        />

        {/* related product slider */}
        <RelatedProductSlider
          spaceBottomClass="pb-95"
          category={product.category[0]}
        />
      </LayoutOne>
    </Fragment>
  );
};

Product.propTypes = {
  location: PropTypes.object,
  product: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const itemId = ownProps.match.params.id;
  return {
    product: state.productData.products.filter(
      (single) => single.id === itemId
    )[0],
  };
};

export default connect(mapStateToProps)(Product);
