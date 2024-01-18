import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { selectLanguage } from "../../../language/selectLanguage";
import Fillter from "./filter/Filter";
import Product from "./product/Product";
import userSlice from "../../login/userSlice";
import { useFilterStore } from "./filter/useFilter";
import productSlice from "./product/productSlice";
import { useState } from "react";
import { Pagination, Row } from "antd";
function Body() {
  const language = useSelector(selectLanguage);
  const [current, setCurrent] = useState(1);
  const onChange = (page) => {
    if (page >= 4) {
      return;
    }
    setCurrent(page);
    handleFilter({
      page: page,
      pageSize: 10,
    });
  };
  const disPath = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    disPath(userSlice.actions.dangNhap(user.data));
  }
  async function handleFilter(payload) {
    disPath(productSlice.actions.setIsLoading(true));
    const data = await useFilterStore.actions.filter({
      page: payload.page,
      pageSize: payload.pageSize,
      filter: payload.filter,
    });
    disPath(productSlice.actions.setSanPham(data));
    disPath(productSlice.actions.setIsLoading(false));
  }
  return (
    <>
      <div className="header-banner">
        <img
          src="https://routine.vn/media/catalog/category/SALE_UP_TO_50_-_T1023_1__1.jpg"
          alt="anh"
        />
      </div>
      <div className="header-title">
        <h3>{language.header.title}</h3>
      </div>
      <div className="body-home-container">
        <Fillter handleFilter={handleFilter} page={current} pageSize={10} />
        <Product />
      </div>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination
          current={current}
          onChange={onChange}
          pageSize={10}
          total={50}
        />
      </Row>
    </>
  );
}

export default Body;
