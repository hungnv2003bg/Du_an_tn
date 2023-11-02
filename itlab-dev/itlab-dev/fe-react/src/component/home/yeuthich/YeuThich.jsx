import { useSelector } from "react-redux";
import "./style.css";
import { selectLanguage } from "../../../language/selectLanguage";
import { Drawer } from "antd";
import { useState } from "react";
import YeuThichItem from "./YeuThichItem";
function YeuThich({ open, setOpen }) {
  const language = useSelector(selectLanguage);
  const [placement, setPlacement] = useState("right");
  function handleCloseGioHang() {
    setOpen(false);
  }
  return (
    <>
      <Drawer
        title={language.wish.title}
        placement={placement}
        closable={false}
        onClose={handleCloseGioHang}
        open={open}
        key={placement}
      >
        <YeuThichItem />
      </Drawer>
    </>
  );
}

export default YeuThich;
