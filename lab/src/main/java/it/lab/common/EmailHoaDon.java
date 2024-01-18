package it.lab.common;

import it.lab.entity.HoaDon;
import it.lab.enums.TrangThaiHoaDon;

public class EmailHoaDon {
    public static String guiEmailKhiDoiTraTemplate(HoaDon hd) {
        String temple = """
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <style>
                  table, th, td {
                    border: 1px solid black;
                    border-collapse: collapse;
                  }
                </style>
                                
                <body>
                    <div style="width: 70%; margin-left: 15%; ">
                        <hr>
                        <div>
                            <h4 style="font-size: 20px;">Công ty cổ phần Routin Việt Nam</h4>
                            <div>
                                <p>Mã số thuế: 01092827366</p>
                                <p>Địa chỉ: Tầng 9 nhà 10 Thanh Xuân</p>
                                <p>Điện thoại: 098787762</p>
                            </div>
                              <div>
                         
                                <p>Hóa đơn: 
                                """+hd.getMaHoaDon()+"""
                                </p>
                            </div>
                        </div>
                        <hr>
                        <div>
                            <div>
                                <p>Họ tên khách hàng: 
                                """;
        temple += hd.getNguoiMua().getHo() + " " + hd.getNguoiMua().getTen();
        temple += """ 
                </p>
                <p>Địa chỉ:""";
        if (hd.getDiaChiGiao() != null) {
            temple += hd.getDiaChiGiao().getXa() + " " + hd.getDiaChiGiao().getHuyen() + " " + hd.getDiaChiGiao().getTinh() + " </p>";
            temple += " <p>Điện thoại:" + hd.getDiaChiGiao().getSoDienThoai() + "</p>";
        } else {
            temple += "Không  </p>";
        }
        temple += "  <p>Hình thức thanh toán:" + hd.getPhuongThucThanhToan().getTenPhuongThuc() + "</p>";
        temple += "  <p>Hình thức nhận hàng:" + hd.getPhuongThucVanChuyen().getTenPhuongThuc() + "</p>";
        temple +=
                """
                                </div>
                            </div>
                            """+
                        """
                            <div>
                                <h4>Thông tin sản phẩm trước khi đổi</h4>
                                <table style="border-collapse: collapse; width: 100%;">
                                    <thead>
                                        <th style="  border: 1px solid black;
                        border-collapse: collapse;">STT</th>
                                        <th style="  border: 1px solid black;
                        border-collapse: collapse;">Tên sản phẩm</th>
                                        <th style="  border: 1px solid black;
                        border-collapse: collapse;">Đơn vị tính</th>
                                        <th style="  border: 1px solid black;
                        border-collapse: collapse;">Số lượng</th>
                                        <th style="  border: 1px solid black;
                        border-collapse: collapse;">Đơn giá</th>
                                        <th style="  border: 1px solid black;
                        border-collapse: collapse;">Thành tiền</th>
                                    </thead>
                                    <tbody>
                            
                                    """;
        int i = 0;
        for (var item : hd.getHoaDonChiTietList()) {
            if(item.getTrangThai()==1){
                continue;
            }
            temple += """
                    <tr>
                        <td style="  border: 1px solid black;
                    border-collapse: collapse;">
                        """ +
                    ++i
                    + """
                    </td>
                    <td style="  border: 1px solid black;
                    border-collapse: collapse;">
                    """ +
                    item.getSanPhamChiTiet().getTenSanPham()
                    + """
                    </td>
                      <td style="  border: 1px solid black;
                                        border-collapse: collapse;">
                                    cái
                                        </td>
                    <td style="  border: 1px solid black;
                    border-collapse: collapse;">
                    """ +
                    item.getSoLuong()
                    +
                    """
                            </td>
                            <td style="  border: 1px solid black;
                            border-collapse: collapse;">
                            """ +
                    item.getDonGia()
                    + """
                    </td>
                    <td style="  border: 1px solid black;
                    border-collapse: collapse;">
                    """ +
                    item.getDonGia() * item.getSoLuong()
                    + """
                        </td>
                    </tr>
                    """;
        }
temple+=
        """
                     </tbody>
                            </table>
                        </div>
            <div>
                <h4>Thông tin sản phẩm trước sau khi đổi</h4>
                <table style="border-collapse: collapse; width: 100%;">
                    <thead>
                        <th style="  border: 1px solid black;
        border-collapse: collapse;">STT</th>
                        <th style="  border: 1px solid black;
        border-collapse: collapse;">Tên sản phẩm</th>
                        <th style="  border: 1px solid black;
        border-collapse: collapse;">Đơn vị tính</th>
                        <th style="  border: 1px solid black;
        border-collapse: collapse;">Số lượng</th>
                        <th style="  border: 1px solid black;
        border-collapse: collapse;">Đơn giá</th>
                        <th style="  border: 1px solid black;
        border-collapse: collapse;">Thành tiền</th>
                    </thead>
                    <tbody>
                    """;
        i = 0;
        for (var item : hd.getHoaDonChiTietList()) {
            if(item.getTrangThai()==2){
                continue;
            }
            temple += """
                    <tr>
                        <td style="  border: 1px solid black;
                    border-collapse: collapse;">
                        """ +
                    ++i
                    + """
                    </td>
                    <td style="  border: 1px solid black;
                    border-collapse: collapse;">
                    """ +
                    item.getSanPhamChiTiet().getTenSanPham()
                    + """
                    </td>
                      <td style="  border: 1px solid black;
                                        border-collapse: collapse;">
                                    cái
                                        </td>
                    <td style="  border: 1px solid black;
                    border-collapse: collapse;">
                    """ +
                    item.getSoLuong()
                    +
                    """
                            </td>
                            <td style="  border: 1px solid black;
                            border-collapse: collapse;">
                            """ +
                    item.getDonGia()
                    + """
                    </td>
                    <td style="  border: 1px solid black;
                    border-collapse: collapse;">
                    """ +
                    item.getDonGia() * item.getSoLuong()
                    + """
                        </td>
                    </tr>
                    """;
        }
        temple += """
                                </tbody>
                            </table>
                        </div>
                """;
        temple += """
                <div>
                            <div>
                                <p>Tổng tiền hàng: 
                                """ +
                tinhTongTienSauDoiTra(hd)
                + """
                đ</p>
                <p>Phí ship:""" + hd.getPhiGiaoHang() + """
                đ</p>
                """;
        if (hd.getVoucherGiam() != null) {
            temple += "<p>Áp mã:" + hd.getVoucherGiam().getGiaTriGiam() + "đ</p>";
        }
        temple += """
                <p>Thanh toán: 
                """ +
                (tinhTongTienSauDoiTra(hd) + hd.getPhiGiaoHang() - (hd.getVoucherGiam() != null ? hd.getVoucherGiam().getGiaTriGiam() : 0))
                + """
                đ</p>
                <p>Trạng thái hóa đơn: 
                """
                +
                trangThai(hd.getTrangThai())
                +
                """
                                       </p>
                                    </div>
                                </div>
                            </div>
                        </body>
                        </html>
                        """;
        return temple;
    }
    public static String guiEmailKhiXacNhanTemplate(HoaDon hd) {
        String temple = """
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <style>
                  table, th, td {
                    border: 1px solid black;
                    border-collapse: collapse;
                  }
                </style>
                                
                <body>
                    <div style="width: 70%; margin-left: 15%; ">
                        <hr>
                        <div>
                            <h4 style="font-size: 20px;">Công ty cổ phần Routin Việt Nam</h4>
                            <div>
                                <p>Mã số thuế: 01092827366</p>
                                <p>Địa chỉ: Tầng 9 nhà 10 Thanh Xuân</p>
                                <p>Điện thoại: 098787762</p>
                            </div>
                              <div>
                         
                                <p>Hóa đơn: 
                                """+hd.getMaHoaDon()+"""
                                </p>
                            </div>
                        </div>
                        <hr>
                        <div>
                            <div>
                                <p>Họ tên khách hàng: 
                                """;
        temple += hd.getNguoiMua().getHo() + " " + hd.getNguoiMua().getTen();
        temple += """ 
                </p>
                <p>Địa chỉ:""";
        if (hd.getDiaChiGiao() != null) {
            temple += hd.getDiaChiGiao().getXa() + " " + hd.getDiaChiGiao().getHuyen() + " " + hd.getDiaChiGiao().getTinh() + " </p>";
            temple += " <p>Điện thoại:" + hd.getDiaChiGiao().getSoDienThoai() + "</p>";
        } else {
            temple += "Không  </p>";
        }
        temple += "  <p>Hình thức thanh toán:" + hd.getPhuongThucThanhToan().getTenPhuongThuc() + "</p>";
        temple += "  <p>Hình thức nhận hàng:" + hd.getPhuongThucVanChuyen().getTenPhuongThuc() + "</p>";
        temple +=
                """
                                </div>
                            </div>
                            <div>
                                <h4>Thông tin sản phẩm</h4>
                                <table style="border-collapse: collapse; width: 100%;">
                                    <thead>
                                        <th style="  border: 1px solid black;
                        border-collapse: collapse;">STT</th>
                                        <th style="  border: 1px solid black;
                        border-collapse: collapse;">Tên sản phẩm</th>
                                        <th style="  border: 1px solid black;
                        border-collapse: collapse;">Đơn vị tính</th>
                                        <th style="  border: 1px solid black;
                        border-collapse: collapse;">Số lượng</th>
                                        <th style="  border: 1px solid black;
                        border-collapse: collapse;">Đơn giá</th>
                                        <th style="  border: 1px solid black;
                        border-collapse: collapse;">Thành tiền</th>
                                    </thead>
                                    <tbody>
                                    """;
        int i = 0;
        for (var item : hd.getHoaDonChiTietList()) {
            temple += """
                    <tr>
                        <td style="  border: 1px solid black;
                    border-collapse: collapse;">
                        """ +
                    ++i
                    + """
                    </td>
                    <td style="  border: 1px solid black;
                    border-collapse: collapse;">
                    """ +
                    item.getSanPhamChiTiet().getTenSanPham()
                    + """
                    </td>
                      <td style="  border: 1px solid black;
                                        border-collapse: collapse;">
                                    cái
                                        </td>
                    <td style="  border: 1px solid black;
                    border-collapse: collapse;">
                    """ +
                    item.getSoLuong()
                    +
                    """
                            </td>
                            <td style="  border: 1px solid black;
                            border-collapse: collapse;">
                            """ +
                    item.getDonGia()
                    + """
                    </td>
                    <td style="  border: 1px solid black;
                    border-collapse: collapse;">
                    """ +
                    item.getDonGia() * item.getSoLuong()
                    + """
                        </td>
                    </tr>
                    """;
        }


        temple += """
                                </tbody>
                            </table>
                        </div>
                """;
        temple += """
                <div>
                            <div>
                                <p>Tổng tiền hàng: 
                                """ +
                tinhTongTien(hd)
                + """
                đ</p>
                <p>Phí ship:""" + hd.getPhiGiaoHang() + """
                đ</p>
                """;
        if (hd.getVoucherGiam() != null) {
            temple += "<p>Áp mã:" + hd.getVoucherGiam().getGiaTriGiam() + "đ</p>";
        }
        temple += """
                <p>Thanh toán: 
                """ +
                (tinhTongTien(hd) + hd.getPhiGiaoHang() - (hd.getVoucherGiam() != null ? hd.getVoucherGiam().getGiaTriGiam() : 0))
                + """
                đ</p>
                <p>Trạng thái hóa đơn: 
                """
                +
                trangThai(hd.getTrangThai())
                +
                """
                                       </p>
                                    </div>
                                </div>
                            </div>
                        </body>
                        </html>
                        """;
        return temple;
    }
    private static double tinhTongTien(HoaDon hd) {
        double total = 0l;
        for (var item : hd.getHoaDonChiTietList()) {
            total += item.getSoLuong() * item.getDonGia();
        }
        return total;
    }
    private static double tinhTongTienSauDoiTra(HoaDon hd) {
        double total = 0l;
        for (var item : hd.getHoaDonChiTietList()) {
            if(item.getTrangThai()==1){
                continue;
            }
            total += item.getSoLuong() * item.getDonGia();
        }
        return total;
    }
    private static String trangThai(TrangThaiHoaDon tt) {
        switch (tt) {
            case DAGIAO:
                return "Đã giao";
            case CHOGIAOHANG:
                return "Chờ giao hàng";
            case CHOXACNHAN:
                return "Chờ xác nhận";
            case DADOITRA:
                return "Đã đổi trả";
            case CUAHANGHUY:
                return "Cửa hàng hủy";
            case CHOTHANHTOANBANKING:
                return "Chờ thanh toán Banking";
            case TUCHOIDOI:
                return "Từ chối đổi";
            case DANGGIAO:
                return "Đang giao hàng";
            case DATHANHTOAN:
                return "Đã thanh toán";
            case KHACHHANGHUY:
                return "Khách hàng hủy";
            case HOADONCHO:
                return "Hóa đơn chờ";
            default:
                return "Không rõ";
        }
    }
}
