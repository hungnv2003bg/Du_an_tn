import "./style.css";
function QuantityField({
  quantity,
  setQuantity,
  style,
  gioHangId,
  handleCapNhatSoLuongSanPhamGioHang,
}) {
  return (
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
  );
}

export default QuantityField;
