import { useSelector } from "react-redux";
import "./style.css";
import { selectLanguage } from "../../../language/selectLanguage";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import QuantityField from "../productdetail/QuantityField";
import { fixMoney } from "../../../extensions/fixMoney";
import { useState } from "react";
function SanPhamItem({ item, handleCapNhatSoLuongSanPhamGioHang }) {
  const language = useSelector(selectLanguage);
  const [soLuong, setSoLuong] = useState(item.soLuong);
  return (
    <>
      <div className="sanpham-item">
        <div
          style={{
            width: "97%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <div
            style={{
              width: "120px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={item.sanPhamChiTiet.sanPham.hinhAnh1}
              alt="sanpham"
              style={{
                width: "auto",
                height: "180px",
              }}
            />
          </div>
          <div
            style={{
              marginLeft: "8px",
              height: "180px",
            }}
          >
            <div>
              <Link
                to={"/sanpham/" + item.sanPhamChiTiet.sanPham.id}
                style={{
                  color: "black",
                  fontWeight: 480,
                  fontSize: "15px",
                }}
              >
                {item.sanPhamChiTiet.sanPham.tenSanPham}
              </Link>
            </div>
            <div
              style={{
                marginTop: "8px",
              }}
            >
              <span
                style={{
                  textTransform: "uppercase",
                  marginLeft: 0,
                  color: "#6f6f6f",
                  fontSize: "15px",
                  fontStyle: "normal",
                  fontWeight: 400,
                }}
              >
                {"Màu " +
                  item.sanPhamChiTiet.mauSac.tenMau +
                  " - " +
                  item.sanPhamChiTiet.kichThuoc.tenKichThuoc}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                marginTop: "8px",
              }}
            >
              <QuantityField
                quantity={soLuong}
                setQuantity={setSoLuong}
                gioHangId={item.id}
                handleCapNhatSoLuongSanPhamGioHang={
                  handleCapNhatSoLuongSanPhamGioHang
                }
                style={{
                  height: "40px",
                  width: "40px",
                  size: "12px",
                }}
              />
            </div>
            <div
              style={{
                marginTop: "8px",
                fontWeight: 550,
              }}
            >
              {fixMoney(item.soLuong * item.sanPhamChiTiet.sanPham.giaBan)}
            </div>
          </div>
        </div>
        <div
          style={{
            width: "3%",
            fontSize: "12px !important",
          }}
        >
          <AiOutlineClose />
        </div>
      </div>
    </>
  );
}

export default SanPhamItem;
