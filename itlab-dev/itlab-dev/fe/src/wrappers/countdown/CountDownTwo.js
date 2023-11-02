import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import Countdown from "react-countdown-now";
import Renderer from "../../components/countdown/Renderer";

const CountDownTwo = ({ spaceTopClass, spaceBottomClass, dateTime }) => {
  return (
    <div
      className={`funfact-area ${spaceTopClass ? spaceTopClass : ""} ${spaceBottomClass ? spaceBottomClass : ""
        }`}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="funfact-content funfact-res text-center">
              <h2 className="font-weight-bold">Đồng hồ sinh học</h2>
              <div className="timer">
                <Countdown date={new Date('2023-10-30')} renderer={Renderer} />
              </div>
              <div className="funfact-btn funfact-btn-green btn-hover">
                <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                  Xem Thêm
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="fruits-deal-img">
              <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                <img
                  src={"https://res.cloudinary.com/do9rcgv5s/image/upload/v1692143328/mboiuod7aispnimlunxd.jpg"}
                  alt="Đồng hồ sinh học"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CountDownTwo.propTypes = {
  dateTime: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default CountDownTwo;
