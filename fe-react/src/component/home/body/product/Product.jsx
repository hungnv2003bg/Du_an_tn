import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { selectLanguage } from "../../../../language/selectLanguage";
import { Select, Spin } from "antd";
import { selectProduct } from "./selectProduct";
import ProductItem from "./productitem/ProductItem";
import { useEffect } from "react";
import { useSanPhamStore } from "./useSanPhamStore";
import productSlice from "./productSlice";
function Product() {
  const language = useSelector(selectLanguage);
  const product = useSelector(selectProduct);
  const dispath = useDispatch();
  useEffect(() => {
    dispath(productSlice.actions.setIsLoading(true));
    const fetchData = async () => {
      const data = await useSanPhamStore.actions.fetchSanPham(1, 20);
      dispath(productSlice.actions.setSanPham(data));
      dispath(productSlice.actions.setIsLoading(false));
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="product-container">
        <div className="sub-filter">
          <div className="total">
            {"20 " + language.body.product.subFilter.sort.total}
          </div>
          <div style={{ paddingRight: "10px" }}>
            <span className="title">
              {language.body.product.subFilter.sort.title}
            </span>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder={language.body.product.subFilter.sort.select.title}
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={[
                {
                  value: "1",
                  label: "Not Identified",
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
