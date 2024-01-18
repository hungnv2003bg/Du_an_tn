import {
  Button,
  Col,
  Divider,
  Image,
  Menu,
  Row,
  Tag,
  notification,
} from "antd";
import "./style.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useHoaDonNguoiDung } from "./useHoaDonStore";
import { fixMoney } from "../../../../extensions/fixMoney";
function HoaDonHuy({ nguoiDungId }) {
  const [data, setData] = useState(undefined);
  async function handleLayHoaDonCho() {
    const fet = await useHoaDonNguoiDung.actions.layHoaDon({
      nguoiDungId: nguoiDungId,
      type: 5,
    });
    setData(fet.data);
  }
  useEffect(() => {
    handleLayHoaDonCho();
  }, []);
  return (
    <>
      <Row
        style={{
          width: "100%",
        }}
      >
        {data &&
          data.map((item) => {
            return (
              <Row
                style={{
                  width: "100%",
                }}
              >
                <Divider />
                <h5>
                  Mã HD: {item.maHoaDon} -{" "}
                  {item.diaChiGiao
                    ? "Giao đến " +
                    item.diaChiGiao.xa +
                    " " +
                    item.diaChiGiao.huyen +
                    " " +
                    item.diaChiGiao.tinh
                    : "Mua tại cửa hàng"}
                </h5>
                <Row
                  style={{
                    marginTop: "12px",
                    width: "100%",
                  }}
                >
                  {item.hoaDonChiTietList &&
                    item.hoaDonChiTietList.map((item2) => {
                      return (
                        <>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              marginBottom: "8px",
                              cursor: "pointer",
                              width: "100%",
                            }}
                          >
                            <Image
                              src={item2.sanPhamChiTiet.hinhAnh}
                              style={{
                                height: "120px",
                                width: "80px",
                              }}
                            />
                            <div
                              style={{
                                marginLeft: "8px",
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <Link
                                to={
                                  "http://localhost:3000/sanpham/" +
                                  item2.sanPhamChiTiet.sanPham.id
                                }
                              >
                                <span className="ten-san-pham">
                                  {item2.sanPhamChiTiet.tenSanPham}
                                </span>
                              </Link>
                              <div>
                                <Tag color="#108ee9">
                                  {item2.sanPhamChiTiet.mauSac.tenMau}
                                </Tag>
                                <Tag color="#108ee9">
                                  {item2.sanPhamChiTiet.kichThuoc.tenKichThuoc}
                                </Tag>
                              </div>
                              <span
                                style={{
                                  color: "red",
                                }}
                              >
                                X {item2.soLuong} cái
                              </span>
                              <div>
                                <span
                                  style={{
                                    color: "red",
                                  }}
                                >
                                  {fixMoney(item2.donGia) + "/1"}
                                </span>
                              </div>
                              <div>
                                <span
                                  style={{
                                    color: "red",
                                  }}
                                >
                                  {fixMoney(item2.donGia * item2.soLuong)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  <Divider />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <span
                        style={{
                          width: "120px",
                          display: "block",
                        }}
                      >
                        Đơn hàng:
                      </span>
                      <span
                        style={{
                          color: "red",
                        }}
                      >
                        {fixMoney(
                          item.hoaDonChiTietList.reduce((pre, cur) => {
                            return pre + cur.soLuong * cur.donGia;
                          }, 0)
                        )}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <span
                        style={{
                          width: "120px",
                          display: "block",
                        }}
                      >
                        Phí vận chuyển:
                      </span>
                      <span
                        style={{
                          color: "red",
                        }}
                      >
                        {fixMoney(item.phiVanChuyen)}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <span
                        style={{
                          width: "120px",
                          display: "block",
                        }}
                      >
                        Áp mã:
                      </span>
                      <span
                        style={{
                          color: "red",
                        }}
                      >
                        {fixMoney(
                          item.voucherGiam ? item.voucherGiam.giaTriGiam : 0
                        )}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <span
                        style={{
                          width: "120px",
                          display: "block",
                        }}
                      >
                        Thanh toán:
                      </span>
                      <span
                        style={{
                          color: "red",
                          fontWeight: 550,
                        }}
                      >
                        {fixMoney(
                          item.hoaDonChiTietList.reduce((pre, cur) => {
                            return pre + cur.soLuong * cur.donGia;
                          }, 0) +
                          item.phiVanChuyen -
                          (item.voucherGiam ? item.voucherGiam.giaTriGiam : 0)
                        )}
                      </span>
                    </div>
                  </div>
                </Row>
              </Row>
            );
          })}
      </Row>
    </>
  );
}

export default HoaDonHuy;
