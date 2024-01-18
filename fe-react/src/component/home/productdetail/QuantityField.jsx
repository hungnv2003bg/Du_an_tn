import { notification } from "antd";
import "./style.css";
import { useEffect } from "react";
function QuantityField({
  quantity,
  setQuantity,
  style,
  gioHangId,
  handleCapNhatSoLuongSanPhamGioHang,
  max = undefined,
}) {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, title, des, placement) => {
    if (type === "error") {
      api.error({
        message: title,
        description: des,
        placement,
      });
    } else {
      api.success({
        message: title,
        description: des,
        placement,
      });
    }
  };
  return (
    <>
      {contextHolder}
      <div className="quantity-input">
        <button
          className="quantity-input__modifier quantity-input__modifier--left"
          onClick={() => {
            setQuantity(quantity - 1);
            if (handleCapNhatSoLuongSanPhamGioHang) {
              handleCapNhatSoLuongSanPhamGioHang(gioHangId, quantity - 1);
            }
          }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: style.height,
            width: style.width,
            fontSize: style.size,
          }}
        >
          &mdash;
        </button>
        <input
          className="quantity-input__screen"
          type="text"
          value={quantity}
          readOnly
          style={{
            width: style.width,
            fontSize: style.size,
          }}
        />
        <button
          className="quantity-input__modifier quantity-input__modifier--right"
          onClick={() => {
            if (max) {
              if (quantity == max) {
                openNotification(
                  "error",
                  "Hệ thống",
                  "Sản phẩm không đủ số lượng",
                  "bottomRight"
                );
                return;
              }
            }
            setQuantity(quantity + 1);
            if (handleCapNhatSoLuongSanPhamGioHang) {
              handleCapNhatSoLuongSanPhamGioHang(gioHangId, quantity + 1);
            }
          }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: style.height,
            width: style.width,
            fontSize: style.size,
          }}
        >
          &#xff0b;
        </button>
      </div>
    </>
  );
}

export default QuantityField;
