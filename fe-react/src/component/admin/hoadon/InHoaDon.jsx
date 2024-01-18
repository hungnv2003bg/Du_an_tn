import { Button, Modal } from "antd";
import "./style.css";
import React, { useState } from "react";
import { IoMdPrint } from "react-icons/io";
import html2pdf from "html2pdf.js";
import { fixMoney } from "../../../extensions/fixMoney";
import { fixTrangThai } from "../../../extensions/fixTrangThai";
function InHoaDon({ data }) {
    const generatePdf = () => {
        const content = document.getElementById('content-to-export');
        html2pdf(content);
    };
    const date = new Date()
    const tongTien = data.hoaDonChiTietList.reduce((pre, cur) => {
        return pre + (cur.soLuong * cur.donGia)
    }, 0)
    return (
        <>
            <Button type="primary" onClick={() => {
                generatePdf()
            }}>
                <IoMdPrint />
                <span style={{
                    marginLeft: "4px"
                }}>In hóa đơn</span></Button>
            <div style={{
                display: 'none'
            }}>
                <div id="content-to-export" style={{
                    width: "96%",
                    marginLeft: "3%",
                    backgroundImage: `url(${require('./logo.png')})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "20%",
                    backgroundPosition: "center"

                }}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: "33.33%", display: "flex", justifyContent: "center", position: "relative" }}>Routin
                            <img style={{
                                height: "120px",
                                width: "auto",
                                position: "absolute",
                                top: "10px"
                            }} src={require('./logor.jpeg')} alt="" />
                        </div>
                        <div style={{ width: "33.33%", display: "flex", justifyContent: "center" }}>
                            <div>
                                <h3 style={{ textAlign: "center", marginBottom: "unset" }}>Hóa Đơn Bán Hàng {data.maHoaDon}</h3>
                                <h5 style={{ textAlign: "center", fontWeight: "450", marginBottom: "unset" }}>(Bản thể hiện của hóa
                                    đơn điện
                                    tử)</h5>
                                <h5 style={{ textAlign: "center", fontWeight: "450", fontStyle: "italic" }}>Ngày {date.getDate()} tháng {date.getMonth() + 1} năm {date.getFullYear()}</h5>
                            </div>
                        </div>
                        <div style={{ width: "33.33%", display: "flex", justifyContent: "center" }}>
                            <div>
                                <p style={{ marginBottom: '2px' }}>Mẫu số: 1209873</p>
                                <p style={{ marginBottom: '2px' }}>Ký hiệu: MS/2091</p>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div>
                        <h4 style={{ fontSize: "20px" }}>Công ty cổ phần Routin Việt Nam</h4>
                        <div>
                            <p>Mã số thuế: 01092827366</p>
                            <p>Địa chỉ: Tầng 9 nhà 10 Thanh Xuân</p>
                            <p>Điện thoại: 098787762</p>
                        </div>
                    </div>
                    <hr />
                    <div>
                        <div>
                            <p>Họ tên khách hàng: {data.nguoiMua.ho + " " + data.nguoiMua.ten}</p>
                            <p>Địa chỉ: {data.diaChiGiao ? data.diaChiGiao.huyen + ", " + data.diaChiGiao.tinh : ""}</p>
                            <p>Điện thoại: {data.diaChiGiao ? data.diaChiGiao.soDienThoai : ""}</p>
                            <p>Hình thức thanh toán: {data.phuongThucThanhToan.tenPhuongThuc}</p>
                            <p>Hình thức nhận hàng: {data.phuongThucVanChuyen.tenPhuongThuc}</p>
                        </div>
                    </div>
                    <div>
                        <h4 style={{
                            marginBottom: "12px"
                        }}>Thông tin sản phẩm</h4>
                        <table style={{ borderCollapse: "collapse", width: "100%" }}>
                            <thead>
                                <th style={{
                                    border: "1px solid black"
                                }}>STT</th>
                                <th style={{
                                    border: "1px solid black"
                                }}>Tên sản phẩm</th>
                                <th style={{
                                    border: "1px solid black"
                                }}>Đơn vị tính</th>
                                <th style={{
                                    border: "1px solid black"
                                }}>Số lượng</th>
                                <th style={{
                                    border: "1px solid black"
                                }}>Đơn giá</th>
                                <th style={{
                                    border: "1px solid black",
                                    color: "red"
                                }}>Thành tiền</th>
                            </thead>
                            <tbody>
                                {data.hoaDonChiTietList && data.hoaDonChiTietList.map((item, index) => {
                                    return <tr>
                                        <td style={{
                                            border: "1px solid black"
                                        }}>
                                            {index + 1}
                                        </td>
                                        <td style={{
                                            border: "1px solid black"
                                        }}>
                                            {item.sanPhamChiTiet.tenSanPham}
                                        </td>
                                        <td style={{
                                            border: "1px solid black"
                                        }}>
                                            chiếc
                                        </td>
                                        <td style={{
                                            border: "1px solid black"
                                        }}>
                                            {item.soLuong}
                                        </td>
                                        <td style={{
                                            border: "1px solid black"
                                        }}>
                                            {fixMoney(item.donGia)}
                                        </td>
                                        <td style={{
                                            border: "1px solid black",
                                            color: "red"
                                        }}>
                                            {fixMoney(item.donGia * item.soLuong)}
                                        </td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    </div>
                    <div style={{
                        marginTop: "12px"
                    }}>
                        <div>
                            <p>Tổng tiền hàng:   <span style={{
                                color: 'red'
                            }}>{fixMoney(tongTien)}</span></p>
                            <p>Phí ship: <span style={{
                                color: 'red'
                            }}>{fixMoney(data.phiVanChuyen)}</span></p>
                            {data.voucherGiam && <p>Áp mã:   <span style={{
                                color: 'red'
                            }}>{fixMoney(data.voucherGiam.giaTriGiam)}</span></p>}
                            <p>Thanh toán:   <span style={{
                                color: 'red'
                            }}>{fixMoney(tongTien + data.phiVanChuyen - (data.voucherGiam ? data.voucherGiam.giaTriGiam : 0))}</span></p>
                            <p>Trạng thái hóa đơn: <span style={{
                                color: 'red'
                            }}>{fixTrangThai(data.trangThai)}</span> </p>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default InHoaDon;
