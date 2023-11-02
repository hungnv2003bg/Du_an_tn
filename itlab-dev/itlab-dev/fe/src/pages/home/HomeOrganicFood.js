import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutThree from "../../layouts/LayoutThree";
import HeroSliderFive from "../../wrappers/hero-slider/HeroSliderFive";
import TabProductFour from "../../wrappers/product/TabProductFour";
import BannerFive from "../../wrappers/banner/BannerFive";
import CountDownTwo from "../../wrappers/countdown/CountDownTwo";
import TestimonialOne from "../../wrappers/testimonial/TestimonialOne";
import NewsletterTwo from "../../wrappers/newsletter/NewsletterTwo";
import TabProductCategory from "../../wrappers/product/TabProductCategory";

const HomeOrganicFood = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>POLYFOOD | Đồ ăn thuần chay</title>
        <meta name="description" content="Đồ ăn thuần chay của POLYFOOD" />
      </MetaTags>
      <LayoutThree
        headerTop="visible"
        headerContainerClass="container-fluid"
        headerBorderStyle="fluid-border"
        headerPaddingClass="header-padding-2">
        {/* hero slider */}
        <HeroSliderFive spaceLeftClass="ml-70" spaceRightClass="mr-70" />
        {/* banner */}
        <p style={{ marginTop: "40px" }}></p>
        <BannerFive />
        {/* countdown */}
        <p style={{ marginTop: "40px" }}></p>
        <TabProductFour
          spaceBottomClass="pb-30"
          category="all"
          status={0}
          titleText="Món ăn mới nhất"
          productTabClass="product-tab-fruits"
        />
        <TabProductCategory
          spaceBottomClass="pb-30"
          category="all"
          productTabClass="product-tab-fruits"
        />
        <CountDownTwo
          spaceTopClass="pt-80"
          spaceBottomClass="pb-95"
          dateTime="November 13, 2020 12:12:00"
        />
        <TabProductFour
          spaceBottomClass="pb-30"
          category="all"
          status={1}
          titleText="Món ăn giảm giá"
          productTabClass="product-tab-fruits"
        />
        {/* testimonial */}
        <TestimonialOne
          spaceTopClass="pt-100"
          spaceBottomClass="pb-95"
          spaceLeftClass="ml-70"
          spaceRightClass="mr-70"
          bgColorClass="bg-gray-3"
        />
        {/* newsletter */}
        <NewsletterTwo
          spaceTopClass="pt-100"
          spaceBottomClass="pb-30"
          subscribeBtnClass="green-subscribe"
        />
      </LayoutThree>
    </Fragment>
  );
};

export default HomeOrganicFood;
