import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const FooterCopyright = ({ footerLogo, spaceBottomClass, colorClass }) => {
  return (
    <div
      className={`copyright ${spaceBottomClass ? spaceBottomClass : ""} ${
        colorClass ? colorClass : ""
      }`}>
      <div className="footer-logo text-center">
        <Link to={process.env.PUBLIC_URL + "/"}>
          <img
            alt="polyfood"
            style={{ maxWidth: "200px" }}
            src={
              "https://res.cloudinary.com/do9rcgv5s/image/upload/v1692137209/e2nw6oqvtlvpqmdwtmnh.png"
            }
          />
        </Link>
      </div>
      <p className="text-center text-light">
        Poly Food là nhà hàng Thuần chay và Cung cấp thực phẩm chay
      </p>
    </div>
  );
};

FooterCopyright.propTypes = {
  footerLogo: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
};

export default FooterCopyright;
