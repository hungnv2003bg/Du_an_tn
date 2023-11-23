import { useSelector } from "react-redux";
import "./style.css";
import Header from "../../common/header/Header";
import {
  Button,
  Col,
  Divider,
  Empty,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Spin,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import { selectLanguage } from "../../../language/selectLanguage";
import { useGioHangStore } from "./useGioHangStore";
import { BsCart2 } from "react-icons/bs";
import { GrMapLocation } from "react-icons/gr";
import { FaTruckFast } from "react-icons/fa6";
import { FaMoneyCheck } from "react-icons/fa";
import { selectThanhToan } from "./selectThanhToan";
import SanPhamItem from "./SanPhamItem";
import { fixMoney } from "../../../extensions/fixMoney";
import { redirect2VnPay } from "../../../plugins/vnpay";
import { useGHN } from "../../../plugins/ghnapi";
import { Option } from "antd/es/mentions";
function GioHangThanhToan() {
  const language = useSelector(selectLanguage);
  const thanhToan = useSelector(selectThanhToan);
  const [duLieuThanhToan, setDuLieuThanhToan] = useState(undefined);
  const [soTienPhaiTra, setSoTienPhaiTra] = useState(0);
  const [soLuong, setSoLong] = useState(0);
  const [phiVanChuyen, setPhiVanChuyen] = useState(0);
  const [ghiChu, setGhiChu] = useState("");
  const [diaChiChon, setDiaChiChon] = useState(undefined);
  const [tinh, setTinh] = useState(undefined)
  const [huyen, setHuyen] = useState(undefined)
  const [xa, setXa] = useState(undefined)
  const [phuongThucThanhThoanChon, setPhuongThucThanhToanChon] =
    useState(undefined);
  const [phuongThucVanChuyen, setPhuongThucVanChuyen] =
    useState(undefined);
  const [api, contextHolder] = notification.useNotification();
  const options = [];
  const size = "large";
  async function handleTaoRequest() {
    if (phuongThucThanhThoanChon.maPhuongThuc == "VNPAY") {
      const request = await useGioHangStore.actions.vnPay({
        ghiChu: ghiChu,
        diaChiId: diaChiChon.id,
        phuongThucThanhToanId: phuongThucThanhThoanChon.id,
        phuongThucVanChuyenId: 1,
        gia: soTienPhaiTra,
      });
      window.location.href = request.data;
    }
  }
  function handleChonDiaChi(e) {
    setDiaChiChon(
      duLieuThanhToan.data.diaChiDTOList.find((item) => {
        return item.id == e.target.value;
      })
    );
  }
  function handleChonPhuongThucThanhToan(e) {
    setPhuongThucThanhToanChon(
      duLieuThanhToan.data.phuongThucThanhToanDTOList.find((item) => {
        return item.id == e.target.value;
      })
    );
  }
  async function handleChonPhuongThucGiao(e) {
    setPhuongThucVanChuyen(
      duLieuThanhToan.data.phuongThucVanChuyenDTOList.find((item) => {
        return item.id == e.target.value;
      })
    );
    if (e.target.value == 1) {
      const giaShip = await useGHN.actions.layGia({
        gia: soTienPhaiTra,
        denXa: diaChiChon.xaId,
        denHuyen: diaChiChon.huyenId,
      })
      setPhiVanChuyen(giaShip.data.data.total);
    }
    if (e.target.value == 2) {

      setPhiVanChuyen(0);
    }
  }
  function handleSetSoTienPhaiTra() {
    var chuaTinhChiPhi = duLieuThanhToan.data.sanPhamList.reduce((pre, cur) => {
      return pre + cur.sanPhamChiTiet.sanPham.giaBan * cur.soLuong;
    }, 0);
    var soLuongSanPham = duLieuThanhToan.data.sanPhamList.reduce((pre, cur) => {
      return pre + cur.soLuong;
    }, 0);
    setSoTienPhaiTra(chuaTinhChiPhi);
    setSoLong(soLuongSanPham);
  }
  useEffect(() => {
    async function handleLayGioHang() {
      const data = await useGioHangStore.actions.layDuLieuThanhToan(
        JSON.parse(localStorage.getItem("user")).data.nguoiDung.id
      );
      setDuLieuThanhToan(data.data);
      setPhuongThucThanhToanChon(data.data.data.phuongThucThanhToanDTOList[0]);
    }
    async function handleLayTinh() {
      const data = await useGHN.actions.layTinh()
      setTinh(data.data.data)
    }
    handleLayGioHang();
    handleLayTinh();
  }, []);
  async function handleCapNhatSoLuongSanPhamGioHang(gioHangId, soLuongMoi) {
    const data = await useGioHangStore.actions.capNhatSoLuongSanPhamGioHang({
      nguoiDungId: JSON.parse(localStorage.getItem("user")).data.nguoiDung.id,
      gioHangId: gioHangId,
      soLuongMoi: soLuongMoi,
    });
    setDuLieuThanhToan(data.data);
  }
  useEffect(() => {
    if (duLieuThanhToan) {
      handleSetSoTienPhaiTra();
      const diaChiMacDinh = duLieuThanhToan.data.diaChiDTOList.find((item) => {
        return item.laDiaChiChinh;
      });
      setDiaChiChon(diaChiMacDinh);
    }
  }, [duLieuThanhToan]);
  return (
    <>
      {contextHolder}
      <Header />
      <div
        style={{
          maxWidth: "1340px",
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div className="content">
          <div className="title">
            <BsCart2
              style={{
                fontWeight: 700,
                fontSize: "36px",
              }}
            />
            <span
              style={{
                fontWeight: 600,
                fontSize: "24px",
                marginLeft: "24px",
              }}
            >
              Giỏ hàng
            </span>
          </div>
          <div className="list">
            {thanhToan.isLoading ? (
              <div className="loading">
                <Spin size="large" />
              </div>
            ) : (
              ""
            )}
            {!thanhToan.isLoading ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div className="sanpham">
                  <p>{soLuong} sản phẩm</p>
                  <div className="sanpham-list">
                    {duLieuThanhToan
                      ? duLieuThanhToan.data.sanPhamList.map((item, index) => {
                        return (
                          <SanPhamItem
                            key={index}
                            item={item}
                            handleCapNhatSoLuongSanPhamGioHang={
                              handleCapNhatSoLuongSanPhamGioHang
                            }
                          />
                        );
                      })
                      : <Empty />}
                  </div>
                  <div
                    style={{
                      marginTop: "18px",
                    }}
                  >
                    <Row>
                      <GrMapLocation
                        style={{
                          fontWeight: 700,
                          fontSize: "30px",
                        }}
                      />
                      <span
                        style={{
                          fontWeight: 600,
                          fontSize: "18px",
                          marginLeft: "24px",
                        }}
                      >
                        Thông tin giao hàng
                      </span>
                    </Row>
                    <Row
                      style={{
                        marginTop: "12px",
                      }}
                    >
                      <Radio.Group
                        value={diaChiChon ? diaChiChon.id : 1}
                        onChange={handleChonDiaChi}
                        style={{
                          marginLeft: "14px",
                        }}
                      >
                        <Space direction="vertical">
                          {duLieuThanhToan
                            ? duLieuThanhToan.data.diaChiDTOList.map(
                              (item, index) => {
                                return (
                                  <Radio value={item.id} key={index}>
                                    {item.nguoiDung.ho +
                                      " " +
                                      item.nguoiDung.ten +
                                      "," +
                                      item.soDienThoai +
                                      " " +
                                      item.chiTietDiaChi}
                                  </Radio>
                                );
                              }
                            )
                            : ""}
                        </Space>
                      </Radio.Group>
                    </Row>
                    <Row
                      style={{
                        marginTop: "14px",
                      }}
                    >
                      <Col
                        span={8}
                        style={{
                          padding: "4px 4px",
                        }}
                      >
                        <Select
                          size={size}
                          labelInValue
                          optionLabelProp="children"
                          style={{
                            width: "100%",
                          }}
                          value={diaChiChon ? diaChiChon.tinh : "Chưa chọn"}
                        >
                          {tinh ? tinh.map((option) => (
                            <Option key={option.code} value={option.ProvinceName}>
                              {option.name}
                            </Option>
                          )) : ""}
                        </Select>
                      </Col>
                      <Col
                        span={8}
                        style={{
                          padding: "4px 4px",
                        }}
                      >
                        <Select
                          size={size}
                          style={{
                            width: "100%",
                          }}
                          value={diaChiChon ? diaChiChon.huyen : "Chưa chọn"}
                          options={options}
                        />
                      </Col>
                      <Col
                        span={8}
                        style={{
                          padding: "4px 4px",
                        }}
                      >
                        <Select
                          size={size}
                          style={{
                            width: "100%",
                          }}
                          value={diaChiChon ? diaChiChon.xa : "Chưa chọn"}
                          options={options}
                        />
                      </Col>
                    </Row>{" "}
                    <Row
                      style={{
                        marginTop: "14px",
                      }}
                    >
                      <Col
                        span={8}
                        style={{
                          padding: "4px 4px",
                        }}
                      >
                        <Input
                          placeholder="Tên người nhận"
                          value={diaChiChon ? diaChiChon.nguoiDung.ten : ""}
                          size={size}
                          style={{
                            backgroundColor: "#F1F1F1",
                          }}
                        />
                      </Col>
                      <Col
                        span={8}
                        style={{
                          padding: "4px 4px",
                        }}
                      >
                        <Input
                          placeholder="Họ người nhận"
                          value={diaChiChon ? diaChiChon.nguoiDung.ho : ""}
                          size={size}
                          style={{
                            backgroundColor: "#F1F1F1",
                          }}
                        />
                      </Col>
                      <Col
                        span={8}
                        style={{
                          padding: "4px 4px",
                        }}
                      >
                        <Input
                          placeholder="SDT người nhận"
                          size={size}
                          value={diaChiChon ? diaChiChon.soDienThoai : ""}
                          style={{
                            backgroundColor: "#F1F1F1",
                          }}
                        />
                      </Col>
                    </Row>
                    <Row
                      style={{
                        marginTop: "14px",
                      }}
                    >
                      <Col
                        span={8}
                        style={{
                          padding: "4px 4px",
                        }}
                      >
                        <Input
                          placeholder="Số nhà, đường"
                          size={size}
                          value={diaChiChon ? diaChiChon.chiTietDiaChi : ""}
                          style={{
                            backgroundColor: "#F1F1F1",
                          }}
                        />
                      </Col>
                      <Col
                        span={8}
                        style={{
                          padding: "4px 4px",
                        }}
                      >
                        <Input
                          placeholder="Email người nhận"
                          size={size}
                          value={diaChiChon ? diaChiChon.nguoiDung.email : ""}
                          style={{
                            backgroundColor: "#F1F1F1",
                          }}
                        />
                      </Col>
                      <Col
                        span={8}
                        style={{
                          padding: "4px 4px",
                        }}
                      >
                        <Input
                          placeholder="Ghi chú cho hóa đơn"
                          size={size}
                          value={ghiChu}
                          onChange={(e) => {
                            setGhiChu(e.target.value);
                          }}
                          style={{
                            backgroundColor: "#F1F1F1",
                          }}
                        />
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="option">
                  <div className="voucher">
                    <p className="title">Nhập mã giảm giá ưu đãi</p>
                    <Input
                      size="large"
                      placeholder="Nhập mã giảm giá"
                      style={{
                        backgroundColor: "white",
                        width: "70%",
                      }}
                    />
                    <span className="app">Áp dụng</span>
                    <Divider></Divider>
                    <p
                      className="title"
                      style={{
                        height: "20px",
                      }}
                    >
                      Ưu đãi khách hàng VIP
                      <span
                        style={{
                          fontWeight: 400,
                          fontSize: "15px",
                          textTransform: "none",
                        }}
                      >
                        {" " + " (Nếu có)"}
                      </span>
                    </p>
                    <p
                      style={{
                        marginTop: "2px",
                        textDecoration: "underline",
                        fontSize: "13px",
                        fontStyle: "italic",
                      }}
                    >
                      Hướng dẫn sử dụng ưu đãi VIP
                    </p>
                    <Input
                      size="large"
                      placeholder="Nhập mã giảm giá"
                      style={{
                        backgroundColor: "white",
                        width: "70%",
                      }}
                    />
                    <span className="app">Áp dụng</span>
                  </div>
                  <div className="checkout">
                    <p className="title">Tạm tính</p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <div
                        className="content"
                        style={{
                          justifyContent: "flex-start",
                        }}
                      >
                        <div>
                          <p>Số lượng</p>
                          <p>Tạm tính</p>
                          <p>Phí vận chuyển</p>
                        </div>
                      </div>
                      <div
                        className="content"
                        style={{
                          justifyContent: "flex-end",
                        }}
                      >
                        <div>
                          <p
                            style={{
                              textAlign: "right",
                            }}
                          >
                            {soLuong}
                          </p>
                          <p
                            style={{
                              textAlign: "right",
                            }}
                          >
                            {fixMoney(soTienPhaiTra)}
                          </p>
                          <p
                            style={{
                              textAlign: "right",
                            }}
                          >
                            {fixMoney(phiVanChuyen)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Divider></Divider>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <div
                        className="content"
                        style={{
                          justifyContent: "flex-start",
                        }}
                      >
                        <div>
                          <p>Tổng cộng</p>
                        </div>
                      </div>
                      <div
                        className="content"
                        style={{
                          justifyContent: "flex-end",
                        }}
                      >
                        <div>
                          <p
                            style={{
                              textAlign: "right",
                              fontWeight: 700,
                              fontSize: "20px",
                              lineHeight: "23px",
                            }}
                          >
                            {fixMoney(soTienPhaiTra + phiVanChuyen)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="checkout-option">
                    <div>
                      <p className="title">
                        <FaTruckFast
                          style={{
                            fontSize: "24px",
                          }}
                        />
                        {"  "}
                        Phương thức vận chuyển
                      </p>
                      <Radio.Group
                        style={{
                          marginLeft: "14px",
                        }}
                        value={
                          phuongThucVanChuyen
                            ? phuongThucVanChuyen.id
                            : 0
                        }
                        onChange={handleChonPhuongThucGiao}
                      >
                        <Space direction="vertical">
                          {duLieuThanhToan
                            ? duLieuThanhToan.data.phuongThucVanChuyenDTOList.map(
                              (item, index) => {
                                return (
                                  <Radio value={item.id} key={index}>
                                    {item.tenPhuongThuc}
                                  </Radio>
                                );
                              }
                            )
                            : ""}
                        </Space>
                      </Radio.Group>
                    </div>
                    <div
                      style={{
                        marginTop: "12px",
                      }}
                    >
                      <p className="title">
                        <FaMoneyCheck
                          style={{
                            fontSize: "24px",
                          }}
                        />
                        {"  "}
                        Phương thức thanh toán
                      </p>
                      <Radio.Group
                        value={
                          phuongThucThanhThoanChon
                            ? phuongThucThanhThoanChon.id
                            : 0
                        }
                        onChange={handleChonPhuongThucThanhToan}
                        style={{
                          marginLeft: "14px",
                        }}
                      >
                        <Space direction="vertical">
                          {duLieuThanhToan
                            ? duLieuThanhToan.data.phuongThucThanhToanDTOList.map(
                              (item, index) => {
                                return (
                                  <Radio value={item.id} key={index}>
                                    {item.tenPhuongThuc}
                                  </Radio>
                                );
                              }
                            )
                            : ""}
                        </Space>
                      </Radio.Group>
                    </div>
                    <Button
                      type="primary"
                      size={size}
                      style={{
                        marginTop: "14px",
                        backgroundColor: "black",
                        fontSize: "14px",
                        color: "white",
                        width: "100%",
                        fontWeight: 700,
                        textTransform: "uppercase",
                      }}
                      onClick={handleTaoRequest}
                    >
                      Thanh Toán{" "}
                      <span
                        style={{
                          textDecoration: "underline",
                          marginLeft: "4px",
                        }}
                      >
                        {" " + fixMoney(soTienPhaiTra + phiVanChuyen)}
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default GioHangThanhToan;
