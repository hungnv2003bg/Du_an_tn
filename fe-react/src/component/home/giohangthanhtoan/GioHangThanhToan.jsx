import { useSelector } from "react-redux";
import "./style.css";
import Header from "../../common/header/Header";
import {
  Button,
  Col,
  Divider,
  Empty,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Spin,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import { useGioHangStore } from "./useGioHangStore";
import { BsCart2 } from "react-icons/bs";
import { GrMapLocation } from "react-icons/gr";
import { FaTruckFast } from "react-icons/fa6";
import { FaMoneyCheck } from "react-icons/fa";
import { selectThanhToan } from "./selectThanhToan";
import SanPhamItem from "./SanPhamItem";
import { fixMoney } from "../../../extensions/fixMoney";
import { useGHN } from "../../../plugins/ghnapi";
function GioHangThanhToan() {
  const thanhToan = useSelector(selectThanhToan);
  const [duLieuThanhToan, setDuLieuThanhToan] = useState(undefined);
  const [soTienPhaiTra, setSoTienPhaiTra] = useState(0);
  const [soLuong, setSoLong] = useState(0);
  const [phiVanChuyen, setPhiVanChuyen] = useState(0);
  const [ghiChu, setGhiChu] = useState("");
  const [diaChiChon, setDiaChiChon] = useState(undefined);
  const [phuongThucThanhToan, setPhuongThucThanhToan] = useState(0);
  const [maGiamGia, setMaGiamGia] = useState(undefined);
  const [listVoucher, setListVoucher] = useState(undefined);
  const [isMaGiamShow, setIsMaGiamShow] = useState(false);
  const options = [];
  const size = "large";
  const [api, contextHolder] = notification.useNotification();
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
  function handleCheckTongThanhToanLonHon0() {
    const check =
      soTienPhaiTra + phiVanChuyen - (maGiamGia ? maGiamGia.giaTriGiam : 0);
    if (check <= 0) {
      openNotification(
        "error",
        "Hệ thống",
        "Tổng giá trị đơn hàng phải lớn hơn 0đ!",
        "bottomRight"
      );
      return false;
    }
    return true;
  }
  async function handleTaoRequest() {
    if (phuongThucThanhToan === 0) {
      openNotification(
        "error",
        "Hệ thống",
        "Vui lòng chọn phương thức thanh toán",
        "bottomRight"
      );
      return;
    }
    if (duLieuThanhToan.data.sanPhamList.length === 0) {
      openNotification("error", "Hệ thống", "Giỏ hàng trống", "bottomRight");
      return;
    }
    if (!handleCheckTongThanhToanLonHon0()) {
      return;
    }
    for (var item of duLieuThanhToan.data.sanPhamList) {
      if (item.soLuong > item.sanPhamChiTiet.soLuongTon) {
        openNotification(
          "error",
          "Hệ thống",
          "Sản phẩm " +
          item.sanPhamChiTiet.sanPham.tenSanPham +
          " còn lại " +
          item.sanPhamChiTiet.soLuongTon +
          " chiếc",
          "bottomRight"
        );
        return;
      }
    }
    if (!diaChiChon) {
      openNotification("error", "Hệ thống", "Chưa chọn địa chỉ", "bottomRight");
      return;
    }
    if (phuongThucThanhToan === 1) {
      const request = await useGioHangStore.actions.vnPay({
        ghiChu: ghiChu,
        diaChiId: diaChiChon.id,
        phuongThucThanhToanId: phuongThucThanhToan,
        phuongThucVanChuyenId: 1,
        gia: soTienPhaiTra,
        phiVanChuyen: phiVanChuyen,
        voucherId: maGiamGia && maGiamGia.id,
      });
      window.location.href = request.data;
    } else {
      const request = await useGioHangStore.actions.taoHoaDonOnline({
        ghiChu: ghiChu,
        diaChiId: diaChiChon.id,
        phuongThucThanhToanId: phuongThucThanhToan,
        phuongThucVanChuyenId: 1,
        gia: soTienPhaiTra,
        phiVanChuyen: phiVanChuyen,
        voucherId: maGiamGia && maGiamGia.id,
      });
      window.location.href = "http://localhost:3000/vnpay/checkout";
    }
  }
  function handleChonDiaChi(e) {
    if (!duLieuThanhToan.data.diaChiDTOList) {
      return;
    }
    setDiaChiChon(
      duLieuThanhToan.data.diaChiDTOList.find((item) => {
        return item.id === e.target.value;
      })
    );
    handleTestGia();
  }
  //giao hàng
  async function handleTinhGiaVanChuyen() {
    if (!diaChiChon || soTienPhaiTra === 0) {
      return;
    }
    const giaShip = await useGHN.actions.layGia({
      gia: soTienPhaiTra,
      denHuyen: diaChiChon.huyenId,
      denXa: diaChiChon.xaId,
    });
    setPhiVanChuyen(giaShip.data.data.total);
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

  async function handleTestGia() {
    if (!diaChiChon || soTienPhaiTra === 0) {
      return;
    }
    const giaShip = await useGHN.actions.layGia({
      gia: soTienPhaiTra,
      denHuyen: diaChiChon.id % 2 === 0 ? "1444" : "1204",
      denXa: diaChiChon.id % 2 === 0 ? "20314" : "120416",
    });
    setPhiVanChuyen(giaShip.data.data.total);
  }
  async function handleLayVoucher() {
    const data = await useGioHangStore.actions.layVoucherNguoiDung(
      JSON.parse(localStorage.getItem("user")).data.nguoiDung.id
    );
    setListVoucher(data.data);
  }
  async function handleLayGioHang() {
    const data = await useGioHangStore.actions.layDuLieuThanhToan(
      JSON.parse(localStorage.getItem("user")).data.nguoiDung.id
    );
    setDuLieuThanhToan(data.data);
  }
  useEffect(() => {
    handleLayGioHang();
    handleLayVoucher();
  }, []);
  async function handleCapNhatSoLuongSanPhamGioHang(gioHangId, soLuongMoi) {
    const data = await useGioHangStore.actions.capNhatSoLuongSanPhamGioHang({
      nguoiDungId: JSON.parse(localStorage.getItem("user")).data.nguoiDung.id,
      gioHangId: gioHangId,
      soLuongMoi: soLuongMoi,
    });
    handleTestGia();
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
  useEffect(() => {
    handleTestGia();
  }, [diaChiChon]);
  async function handleXoaGioHang(id) {
    const data = await useGioHangStore.actions.xoaGioHang(id);
    handleLayGioHang();
  }
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
                    {duLieuThanhToan ? (
                      duLieuThanhToan.data.sanPhamList.map((item, index) => {
                        return (
                          <SanPhamItem
                            key={index}
                            item={item}
                            handleXoaGioHang={handleXoaGioHang}
                            handleCapNhatSoLuongSanPhamGioHang={
                              handleCapNhatSoLuongSanPhamGioHang
                            }
                            max={item.sanPhamChiTiet.soLuongTon}
                          />
                        );
                      })
                    ) : (
                      <Empty />
                    )}
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
                                    {item.hoNguoiNhan +
                                      " " +
                                      item.nguoiNhan +
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
                          disabled
                          value={diaChiChon ? diaChiChon.tinh : "Chưa chọn"}
                        ></Select>
                      </Col>
                      <Col
                        span={8}
                        style={{
                          padding: "4px 4px",
                        }}
                      >
                        <Select
                          disabled
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
                          disabled
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
                          disabled
                          placeholder="Tên người nhận"
                          value={diaChiChon ? diaChiChon.nguoiNhan : ""}
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
                          disabled
                          placeholder="Họ người nhận"
                          value={diaChiChon ? diaChiChon.hoNguoiNhan : ""}
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
                          disabled
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
                          disabled
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
                          disabled
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
                      disabled
                      placeholder="Chọn mã giảm giá"
                      style={{
                        backgroundColor: "white",
                        width: "70%",
                      }}
                      value={maGiamGia && maGiamGia.maVoucher}
                      onClick={() => {
                        setMaGiamGia(undefined);
                      }}
                    />
                    <span
                      className="app"
                      onClick={() => {
                        setIsMaGiamShow(true);
                      }}
                    >
                      Chọn mã
                    </span>
                    <Modal
                      title="Voucher tài khoản"
                      open={isMaGiamShow}
                      onOk={() => {
                        setIsMaGiamShow(false);
                      }}
                      onCancel={() => {
                        setIsMaGiamShow(false);
                      }}
                      centered
                    >
                      {listVoucher &&
                        listVoucher.map((item) => {
                          return (
                            <>
                              <div
                                className="voucher"
                                style={{
                                  height: "60px",
                                  borderRadius: "5px",
                                  padding: "4px",
                                  display: "flex",
                                  alignItems: "center",
                                  flexDirection: "row",
                                  marginBottom: "4px",
                                }}
                                onClick={() => {
                                  setMaGiamGia(item);
                                  setIsMaGiamShow(false);
                                }}
                              >
                                <div>
                                  <img
                                    style={{
                                      height: "46px",
                                      width: "auto",
                                    }}
                                    src="https://routine.vn/media/logo/websites/1/logo-black-2x.png"
                                    alt="s"
                                  />
                                </div>
                                <div
                                  style={{
                                    marginLeft: "12px",
                                  }}
                                >
                                  <p
                                    style={{
                                      marginBottom: "2px",
                                      fontSize: "14px",
                                      fontWeight: 550,
                                    }}
                                  >
                                    {item.tenVoucher + " - " + item.maVoucher}
                                  </p>
                                  <p
                                    style={{
                                      marginBottom: "0",
                                      color: "red",
                                    }}
                                  >
                                    {"-" + fixMoney(item.giaTriGiam)}
                                  </p>
                                </div>
                              </div>
                            </>
                          );
                        })}
                    </Modal>
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
                          <p>Voucher</p>
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
                              color: "red",
                            }}
                          >
                            {soLuong}
                          </p>
                          <p
                            style={{
                              textAlign: "right",
                              color: "red",
                            }}
                          >
                            {maGiamGia
                              ? fixMoney(maGiamGia.giaTriGiam)
                              : "Không áp dụng"}
                          </p>
                          <p
                            style={{
                              textAlign: "right",
                              color: "red",
                            }}
                          >
                            {fixMoney(soTienPhaiTra)}
                          </p>
                          <p
                            style={{
                              textAlign: "right",
                              color: "red",
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
                            {fixMoney(
                              soTienPhaiTra +
                              phiVanChuyen -
                              (maGiamGia ? maGiamGia.giaTriGiam : 0)
                            )}
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
                        value={1}
                      >
                        <Space direction="vertical">
                          <Radio value={1} key={1}>
                            Giao hàng nhanh
                          </Radio>
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
                        value={phuongThucThanhToan}
                        onChange={(e) => {
                          setPhuongThucThanhToan(e.target.value);
                        }}
                        style={{
                          marginLeft: "14px",
                        }}
                      >
                        <Space direction="vertical">
                          <Radio value={1} key={1}>
                            Thanh toán qua VNPAY
                          </Radio>
                          <Radio value={2} key={2}>
                            Thanh toán khi nhận hàng
                          </Radio>
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
