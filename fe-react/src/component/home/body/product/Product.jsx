import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { selectLanguage } from "../../../../language/selectLanguage";
import { Select, Spin } from "antd";
import { selectProduct } from "./selectProduct";
import ProductItem from "./productitem/ProductItem";
import { useEffect, useState } from "react";
import { useSanPhamStore } from "./useSanPhamStore";
import productSlice from "./productSlice";
function Product() {
  const language = useSelector(selectLanguage);
  const product = useSelector(selectProduct);
  const dispath = useDispatch();
  const fetchData = async () => {
    const data = await useSanPhamStore.actions.fetchSanPham(1, 10);
    dispath(productSlice.actions.setSanPham(data));
    dispath(productSlice.actions.setIsLoading(false));
  };
  useEffect(() => {
    dispath(productSlice.actions.setIsLoading(true));
    fetchData();
  }, []);
  function handleSapXep(e) {
    dispath(
      productSlice.actions.setSapXep({
        data: product.data,
        type: e,
      })
    );
  }
  return (
    <>
      <div className="product-container">
        <div className="sub-filter">
          <div className="total"></div>
          <div style={{ paddingRight: "10px" }}>
            <span className="title">
              {language.body.product.subFilter.sort.title}
            </span>
            <Select
              showSearch
              style={{ width: 200 }}
              onChange={handleSapXep}
              placeholder={language.body.product.subFilter.sort.select.title}
              options={[
                {
                  value: "1",
                  label: "Mặc định",
                },
                {
                  value: "2",
                  label: "Giá giảm dần",
                },
                {
                  value: "3",
                  label: "Giá tăng dần",
                },
              ]}
            />
          </div>
        </div>
        <div className="product">
          {product.isLoading ? (
            <div className="loading">
              <Spin size="large"></Spin>
            </div>
          ) : (
            product.data.map((item, index) => {
              return <ProductItem key={index} item={item} />;
            })
          )}
        </div>
      </div>
    </>
  );
}

export default Product;
