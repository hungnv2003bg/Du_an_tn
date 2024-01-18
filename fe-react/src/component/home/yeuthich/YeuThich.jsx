import { useSelector } from "react-redux";
import "./style.css";
import { selectLanguage } from "../../../language/selectLanguage";
import { Drawer } from "antd";
import { useState } from "react";
import YeuThichItem from "./YeuThichItem";
function YeuThich({ open, setOpen, yeuThich, handleLayYeuThich }) {
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
        {yeuThich && yeuThich.map((item) => {
          return <YeuThichItem item={item} handleLayYeuThich={handleLayYeuThich} />
        })}
      </Drawer>
    </>
  );
}

export default YeuThich;
