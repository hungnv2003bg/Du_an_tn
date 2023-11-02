import PropTypes from "prop-types";
import React from "react";


const SectionTitleWithText = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div
      className={`welcome-area ${spaceTopClass ? spaceTopClass : ""} ${spaceBottomClass ? spaceBottomClass : ""
        }`}
    >
      <div className="container">
        <div className="welcome-content text-center">
          <h5>Giới thiệu</h5>
          <h1>Chào mừng tới Poly Food</h1>
        </div>
        <div className="welcome-content text-justify">
          <p>
            Hơn 10 năm hình thành và phát triển, thương hiệu thực phẩm chay “Poly Food” đã khẳng định được uy tín của mình trên thị trường với đa dạng mặt hàng, chất lượng dịch vụ, chất lượng sản phẩm. Chúng tôi luôn hướng tới sức khỏe người tiêu dùng luôn được đặt lên hàng đầu, cam kết sản phẩm đưa ra luôn được đảm bảo, uy tín, nguồn gốc xuất xứ rõ ràng, giấy tờ pháp lý đầy đủ, không chất phụ gia, không chất bảo quản, được sản xuất sạch sẽ, vệ sinh an toàn thực phẩm, đảm bảo sức khỏe người tiêu dùng. Điều đó làm nên thương hiệu “Poly Food” chúng tôi ngày hôm nay. Chúng tôi luôn cố gắng để phục vụ tốt nhất đến quý khách hàng.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

SectionTitleWithText.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default SectionTitleWithText;
