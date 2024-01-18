import "./style.css";
import { AiOutlineClose } from "react-icons/ai";
import { fixMoney } from "../../../extensions/fixMoney";
import { InputNumber, notification } from "antd";
import { useGioHangStore } from "../giohangthanhtoan/useGioHangStore";
import { useState } from "react";
function GioHangItem({ handleLayGioHang, item }) {
  const user = JSON.parse(localStorage.getItem("user"))?.data.nguoiDung;
  const [soLuong, setSoLuong] = useState(item.soLuong);
  async function handleXoaGioHang() {
    const data = await useGioHangStore.actions.xoaGioHang(item.id);
    handleLayGioHang();
  }
  async function handleSuaSoLuong(soLuong) {
    if (!soLuong) {
      return;
    }
    if (isNaN(soLuong)) {
      return;
    }
    setSoLuong(soLuong);
    const data = await useGioHangStore.actions.capNhatSoLuongSanPhamGioHang({
      nguoiDungId: user.id,
      gioHangId: item.id,
      soLuongMoi: soLuong,
    });
    handleLayGioHang();
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "96%",
          marginLeft: "2%",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            width: "140px",
            overflow: "hidden",
            height: "180px",
            display: "flex",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <img
            src={item.sanPhamChiTiet.hinhAnh}
            alt="anh"
            style={{
              height: "180px",
              width: "auto",
              borderRadius: "10px",
            }}
          />
        </div>
        <div
          style={{
            marginLeft: "4px",
            width: "176px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                marginLeft: "2%",
                width: "88%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: 500,
              }}
            >
              {item.sanPhamChiTiet.tenSanPham}
            </div>
            <div
              style={{
                width: "10%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: 700,
                fontSize: "24px",
              }}
              className="hover-yeuthich"
              onClick={handleXoaGioHang}
            >
              <AiOutlineClose />
            </div>
          </div>
          <div>
            <p>{fixMoney(item.sanPhamChiTiet.giaBan)}</p>
          </div>
          <div>
            <InputNumber
              onChange={handleSuaSoLuong}
              defaultValue={item.soLuong}
              value={soLuong}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default GioHangItem;
