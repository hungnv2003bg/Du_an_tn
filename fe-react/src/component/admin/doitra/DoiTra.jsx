import "./style.css";
import MenuAdmin from "../layout/menu/MenuAdmin";
import Header from "../layout/header/Header";
import React from "react";
import { } from "@ant-design/icons";
import HoanThanh from "../hoadon/hoanthanh/HoanThanh";
function DoiTra() {
  return (
    <>
      <Header />
      <MenuAdmin />
      <div className="body-container">
        <div className="content">
          <div className="content-hoadon">
            <HoanThanh type="1" />
          </div>
        </div>
      </div>
    </>
  );
}

export default DoiTra;
