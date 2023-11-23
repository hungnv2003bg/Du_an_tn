import { useSelector } from "react-redux";
import "./style.css";
import { selectLanguage } from "../../../../../language/selectLanguage";
import { PiHeartStraight } from "react-icons/pi";
import { fixMoney } from "../../../../../extensions/fixMoney";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
function ProductItem({ item }) {
  const language = useSelector(selectLanguage);
  const imgRef = useRef(undefined);
  useEffect(() => {
    if (imgRef) {
      imgRef.current.onmouseover = () => {
        imgRef.current.src = item.hinhAnh2;
      };
      imgRef.current.onmouseout = () => {
        imgRef.current.src = item.hinhAnh1;
      };
    }
  }, []);
  return (
    <>
      <div className="product-item-container">
        <div className="product-item-detail">
          <Link to={"/sanpham/" + item.id} >
            <div className="product-imgs">
              <img ref={imgRef} src={item.hinhAnh1} alt="san pham" />
              <div className="sales">
                <img
                  src={require("../../../../../assets/fakedata/sales.webp")}
                  alt=""
                />
              </div>
            </div>
          </Link>
          <div className="product-detail">
            <div className="product-name-container">
              <span>{item.tenSanPham}</span>
              <PiHeartStraight />
            </div>
            <div className="product-cost">{fixMoney(item.giaBan)}</div>
            <div className="product-color">
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductItem;
