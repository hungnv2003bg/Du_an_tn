import { useSelector } from "react-redux";
import "./style.css";
import { selectLanguage } from "../../../language/selectLanguage";
import { Drawer } from "antd";
import { useState } from "react";
function GioHang({ open, setOpen }) {
  const language = useSelector(selectLanguage);
  const [placement, setPlacement] = useState("right");
  function handleCloseGioHang() {
    setOpen(false);
  }
  return (
    <>
      <Drawer
        title="Basic Drawer"
        placement={placement}
        closable={false}
        onClose={handleCloseGioHang}
        open={open}
        key={placement}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
}

export default GioHang;
