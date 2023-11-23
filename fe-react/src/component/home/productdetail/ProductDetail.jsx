import { useSelector } from "react-redux";
import "./style.css";
import Header from "../../common/header/Header";
import ProductImgSlider from "./ProductImgSlider";
import { fixMoney } from "../../../extensions/fixMoney";
import { CiRuler } from "react-icons/ci";
import { AiOutlineHeart } from "react-icons/ai";
import { Button, HStack, Input, useNumberInput } from "@chakra-ui/react";
import { Rate, notification } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSanPhamChiTiet } from "./useSanPhamChiTiet";
import { selectUser } from "../../login/selectUser";
import { selectNotiApi } from "../../../redux/selectNoti";
import { selectLanguage } from "../../../language/selectLanguage";
import QuantityField from "./QuantityField";
function ProductDetail() {
  const language = useSelector(selectLanguage);
  const [api, contextHolder] = notification.useNotification();

  const user = useSelector(selectUser);
  const { id } = useParams();
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: 6,
    });

  const [quantity, setQuantity] = useState(0);
  const [sanPham, setSanPham] = useState({});
  const [mauSacList, setMauSacList] = useState([]);
  const [soLuongTon, setSoLuongTon] = useState(0);
  const [sizeList, setSizeList] = useState([]);
  const [sanPhamChon, setSanPhamChon] = useState({
    id: -1,
    mauSac: {
      id: -1,
      maMau: "RED",
      tenMau: "Chưa chọn",
      maMauCss: null,
    },
    kichThuoc: {
      id: -1,
      maKichThuoc: "S",
      tenKichThuoc: "Chưa chọn",
    },
  });
  function handleGetOption(sanPhamChiTietList) {
    const mauSac = [];
    const size = [];
    for (var item of sanPhamChiTietList) {
      if (
        !mauSac.some((item2) => {
          return item2.id === item.mauSac.id;
        })
      ) {
        mauSac.push(item.mauSac);
      }
      if (
        !size.some((item2) => {
          return item2.id === item.kichThuoc.id;
        })
      ) {
        size.push(item.kichThuoc);
      }
    }
    setMauSacList(mauSac);
    setSizeList(size);
  }
  function handleChonMauSac(mauSac) {
    setSanPhamChon({
      ...sanPhamChon,
      mauSac: mauSac,
    });
    handleSetSoLuongTon(sanPhamChon.kichThuoc.id, mauSac.id);
  }
  function handleChonKichThuoc(kichThuoc) {
    setSanPhamChon({
      ...sanPhamChon,
      kichThuoc: kichThuoc,
    });
    handleSetSoLuongTon(kichThuoc.id, sanPhamChon.mauSac.id);
  }
  function handleSetSoLuongTon(kichThuocId, mauSacId) {
    const sanPhamTimKiem = sanPham.sanPhamChiTietDTOList.find((item) => {
      return item.kichThuoc.id == kichThuocId && item.mauSac.id == mauSacId;
    });
    if (sanPhamTimKiem) {
      setSoLuongTon(sanPhamTimKiem.soLuongTon);
    } else {
      setSoLuongTon("Hết hàng");
    }
  }
  var sanPhamDangTim = null;
  function handleSetSanPhamTuOption() {
    if (sanPhamChon.kichThuoc.id == -1 || sanPhamChon.mauSac.id == -1) {
      return false;
    }
    const sanPhamTimKiem = sanPham.sanPhamChiTietDTOList.find((item) => {
      return (
        item.kichThuoc.id == sanPhamChon.kichThuoc.id &&
        item.mauSac.id == sanPhamChon.mauSac.id
      );
    });
    if (sanPhamTimKiem) {
      sanPhamDangTim = sanPhamTimKiem;
      return true;
    }
    return false;
  }
  const openNotification = (type, title, des, placement) => {
    if (type === "error") {
      api.error({
        message: title,
        description: des,
        placement,
      });
    } else {
      api.success({
        message: title,
        description: des,
        placement,
      });
    }
  };
  async function handleThemVaoGioHang() {
    if (!handleSetSanPhamTuOption()) {
      if (sanPhamChon.kichThuocId == -1) {
        openNotification(
          "error",
          language.systemNotification.system,
          language.chiTietSanPham.vuiLongChonKichThuoc,
          "bottomRight"
        );
      }
      if (sanPhamChon.mauSacId == -1) {
        openNotification(
          "error",
          language.systemNotification.system,
          language.chiTietSanPham.vuiLongChonMau,
          "bottomRight"
        );
      }
      if (sanPhamDangTim == null) {
        openNotification(
          "error",
          language.systemNotification.system,
          language.chiTietSanPham.chonSanPham,
          "bottomRight"
        );
      }
      return;
    }
    if (user.nguoiDung.id === -1) {
      openNotification(
        "error",
        language.systemNotification.system,
        language.chiTietSanPham.chuaDangNhap,
        "bottomRight"
      );
      return;
    }
    if (quantity <= 0) {
      openNotification(
        "error",
        language.systemNotification.system,
        language.chiTietSanPham.chonSoLuong,
        "bottomRight"
      );
      return;
    }
    if (quantity > sanPhamDangTim.soLuongTon) {
      openNotification(
        "error",
        language.systemNotification.system,
        language.chiTietSanPham.khongDuSoLuong,
        "bottomRight"
      );
      return;
    }

    const themSanPham = await useSanPhamChiTiet.actions.themVaoGioHang({
      nguoiDungId: user.nguoiDung.id,
      soLuong: quantity,
      sanPhamChiTietId: sanPhamDangTim.id,
    });
    if (themSanPham.data.status === "THANHCONG") {
      openNotification(
        "success",
        language.systemNotification.system,
        language.chiTietSanPham.thanhCong,
        "bottomRight"
      );
    }
  }
  useEffect(() => {
    async function handleLayDuLieu() {
      const data = await useSanPhamChiTiet.actions.layThongTinSanPham(id);
      setSanPham(data.data);
      handleGetOption(data.data.sanPhamChiTietDTOList);
    }
    handleLayDuLieu();
  }, []);
  return (
    <>
      {contextHolder}
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
          <ProductImgSlider
            imgs={
              sanPham.sanPhamDTO ? sanPham.sanPhamDTO.hinhAnhSanPhamList : ""
            }
          />
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
              {sanPham.sanPhamDTO ? sanPham.sanPhamDTO.tenSanPham : ""}
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
              {fixMoney(sanPham.sanPhamDTO ? sanPham.sanPhamDTO.giaBan : 0)}
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
              {sanPhamChon.mauSac.tenMau}
            </span>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "row",
              }}
            >
              {mauSacList.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      handleChonMauSac(item);
                    }}
                    className="color-type"
                    style={{
                      backgroundColor: item.maMauCss,
                    }}
                  ></div>
                );
              })}
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
                  {sanPhamChon.kichThuoc.tenKichThuoc}
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
                {sizeList.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="size-type"
                      onClick={() => {
                        handleChonKichThuoc(item);
                      }}
                    >
                      <span>{item.maKichThuoc}</span>
                    </div>
                  );
                })}
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
                  {quantity}
                </span>
              </div>
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "8px",
                }}
              >
                <QuantityField
                  quantity={quantity}
                  setQuantity={setQuantity}
                  style={{
                    height: "52px",
                    width: "52px",
                    size: "20px",
                  }}
                />
              </div>
              <span>
                Số lượng còn lại:
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                  }}
                >
                  {" " + soLuongTon}
                </span>
              </span>
            </div>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div
                className="btn-add-2-cart"
                onClick={() => {
                  handleThemVaoGioHang();
                }}
              >
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
