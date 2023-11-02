import { useSelector } from "react-redux";
import "./style.css";
import { selectLanguage } from "../../../language/selectLanguage";
import Header from "../../common/header/Header";
import ProductImgSlider from "./ProductImgSlider";
import { fixMoney } from "../../../extensions/fixMoney";
import { CiRuler } from "react-icons/ci";
import { AiOutlineHeart } from "react-icons/ai";
import { Button, HStack, Input, useNumberInput } from "@chakra-ui/react";
import { Rate } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSanPhamChiTiet } from "./useSanPhamChiTiet";
function ProductDetail() {
  const language = useSelector(selectLanguage);
  const { id } = useParams();
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: 6,
    });
  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();
  const [sanPham, setSanPham] = useState({})
  useEffect(() => {
    async function handleLayDuLieu() {
      const data = await useSanPhamChiTiet.actions.layThongTinSanPham(id)
      setSanPham(data.data)
    }
    handleLayDuLieu()
  }, [])
  return (
    <>
      <Header />
      <div
        style={{
          width: "96%",
          marginLeft: "2%",
          display: "flex",
          marginTop: "24px",
        }}
      >
        <div
          style={{
            width: "40%",
          }}
        >
          <ProductImgSlider imgs={sanPham.hinhAnhSanPhamList} />
        </div>
        <div
          style={{
            width: "58%",
            marginLeft: "2%",
          }}
        >
          <div
            style={{
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <h1
              style={{
                fontSize: "20px",
                fontWeight: 500,
                lineHeight: "24px",
                textTransform: "uppercase",
              }}
            >
              {sanPham.tenSanPham}
            </h1>
          </div>
          <div
            style={{
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                fontWeight: 700,
                lineHeight: "28px",
                fontSize: "24px",
              }}
            >
              {fixMoney(sanPham.giaBan)}
            </span>
          </div>
          <div>
            <span>Chọn màu sắc:</span>
            <span
              style={{
                fontWeight: 700,
                fontSize: "15px",
                lineHeight: "18px",
                marginLeft: "12px",
              }}
            >
              L/GRAY
            </span>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div className="color-type">
                <img
                  src="https://routine.vn/media/catalog/product/cache/8ee0d41a0522a757b6f54f9321607fdf/1/0/10f22jacw020_light_grey_6__2.jpg"
                  alt=""
                />
              </div>
              <div className="color-type">
                <img
                  src="https://routine.vn/media/catalog/product/cache/8ee0d41a0522a757b6f54f9321607fdf/1/0/10f22jacw020_light_grey_6__2.jpg"
                  alt=""
                />
              </div>
            </div>
            <div
              style={{
                marginTop: "20px",
              }}
            >
              <div
                style={{
                  position: "relative",
                }}
              >
                <span>Chọn size:</span>
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: "15px",
                    lineHeight: "18px",
                    marginLeft: "12px",
                  }}
                >
                  XXL
                </span>
                <span
                  style={{
                    position: "absolute",
                    right: 0,
                    fontSize: "14px",
                    textDecoration: "underline",
                    fontWeight: 400,
                  }}
                >
                  <CiRuler
                    style={{
                      fontSize: "24px",
                    }}
                  />
                  Hướng dẫn chọn size
                </span>
              </div>
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div className="size-type">
                  <span>S</span>
                </div>
                <div className="size-type">
                  <span>XL</span>
                </div>
              </div>
            </div>
            <div
              style={{
                marginTop: "20px",
              }}
            >
              <div>
                <span>Chọn số lượng:</span>
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: "15px",
                    lineHeight: "18px",
                    marginLeft: "12px",
                  }}
                >
                  2
                </span>
              </div>
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <HStack maxW="80px">
                  <Button {...inc}>+</Button>
                  <Input {...input} />
                  <Button {...dec}>-</Button>
                </HStack>
              </div>
            </div>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div className="btn-add-2-cart">
                <span>Thêm vào giỏ hàng</span>
              </div>
              <div
                style={{
                  fontSize: "36px",
                  marginLeft: "20px",
                  height: "46px",
                  display: "flex",
                  alignItems: "center",
                  justifyItems: "center",
                }}
              >
                <AiOutlineHeart />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "96%",
          marginLeft: "2%",
          backgroundColor: "#F5F5F5",
          marginTop: "40px",
          minHeight: "200px",
          padding: "30px",
        }}
      >
        <div className="danh-gia">
          <h3>Đánh giá sản phẩm</h3>
          <div className="star">
            <div
              style={{
                width: "30%",
              }}
            >
              <Rate allowHalf defaultValue={2.5} />
            </div>
            <div
              style={{
                width: "70%",
              }}
            >
              <Rate allowHalf defaultValue={2.5} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
