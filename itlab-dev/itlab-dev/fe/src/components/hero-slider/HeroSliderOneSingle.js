import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const HeroSliderOneSingle = ({ data, sliderClassName }) => {
  return (
    <div
      className={`single-slider slider-height-1 bg-red ${
        sliderClassName ? sliderClassName : ""
      }`}
      style={{ height: "750px" }}>
      <div className="container">
        <div className="row" style={{ margin: "0px 0 20px 0" }}>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-6">
            <div className="slider-content slider-animated-1">
              <h3 style={{ color: "#fff" }} className="animated">
                {data.title}
              </h3>
              <h1 style={{ color: "#fff" }} className="animated">
                {data.subtitle}
              </h1>
              <div className="slider-btn btn-hover">
                <Link
                  className="animated"
                  to={process.env.PUBLIC_URL + data.url}
                  style={{ color: "black", backgroundColor: "#fff" }}>
                  <h2>SHOP NOW</h2>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-6">
            <div className="slider-single-img slider-animated-1">
              <img
                className="animated img-fluid"
                style={{ width: "100%" }}
                src={process.env.PUBLIC_URL + data.image}
                alt="polyfood"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HeroSliderOneSingle.propTypes = {
  data: PropTypes.object,
  sliderClassName: PropTypes.string,
};

export default HeroSliderOneSingle;
