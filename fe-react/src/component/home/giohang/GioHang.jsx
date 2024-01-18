import { useSelector } from "react-redux";
import "./style.css";
import { selectLanguage } from "../../../language/selectLanguage";
import { Divider, Drawer } from "antd";
import { useState } from "react";
import GioHangItem from "./GioHangItem";
import { fixMoney } from "../../../extensions/fixMoney";
function GioHang({ handleLayGioHang, gioHang, open, setOpen }) {
  const language = useSelector(selectLanguage);
  const [placement, setPlacement] = useState("right");
  function handleCloseGioHang() {
    setOpen(false);
  }
  return (
    <>
      <Drawer
        title={"Giỏ hàng của tôi"}
        placement={placement}
        closable={false}
        onClose={handleCloseGioHang}
        open={open}
        key={placement}
      >
        {gioHang && gioHang.map((item) => {
          return <GioHangItem handleLayGioHang={handleLayGioHang} item={item} />
        })}
        <Divider />
        <div>
          <div style={{
            display: "flex",
            justifyContent: "space-between"
          }}>
            <span style={{
              fontWeight: 550,
              fontSize: "16px"
            }}>Tổng tiền:</span>
            <span style={{
              fontWeight: 550,
              color: "red"
            }}>{fixMoney(gioHang ? gioHang.reduce((pre, next) => {
              return pre + next.sanPhamChiTiet.giaBan * next.soLuong
            }, 0) : 0)}</span>
          </div>
          <div onClick={() => {
            window.location = "http://localhost:3000/thanhtoan"
          }} className="btn-thanhtoan">
            Thanh Toán
          </div>
        </div>
      </Drawer>
    </>
  );
}

export default GioHang;
