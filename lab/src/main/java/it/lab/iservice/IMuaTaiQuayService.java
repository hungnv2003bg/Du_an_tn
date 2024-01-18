package it.lab.iservice;

import it.lab.dto.*;
import it.lab.enums.TrangThaiQuetMa;
import it.lab.modelcustom.request.MuaTaiQuay2;
import it.lab.modelcustom.request.MuaTaiQuayRequest;
import it.lab.modelcustom.respon.HoaDonChoTaiCuaHang;

import java.io.UnsupportedEncodingException;
import java.util.List;

public interface IMuaTaiQuayService {
    public List<HoaDonChoTaiCuaHang> layDanhSachTaiCuaHang();

    public String taoMoiHoaDon(Long nhanVienId);

    public List<SanPhamChiTietDTO> layHetChiTiet();

    public List<HoaDonChiTietDTO> gioHangCuaHoaDon(Long hoaDonId);

    public List<HoaDonChiTietDTO> themSanPhamVaoHoaDon(Long hoaDonId, Long sanPhamId);

    public HoaDonDTO layHoaDon(Long hoaDonId);

    public List<NguoiDungDTO> layDanhSachKhachHang();

    public List<DiaChiDTO> layDiaChiNguoiDung(Long nguoiDungId);

    public Boolean taoHoaDonTaiQuay(MuaTaiQuayRequest muaTaiQuayRequest);

    public String[] taoHoaDonTaiQuayThanhToanVNPAY(MuaTaiQuayRequest muaTaiQuayRequest);

    public TrangThaiQuetMa quetMa(String maSp, Long hoaDonId);

    public String muaTaiQuay2(MuaTaiQuay2 muaTaiQuay2) throws UnsupportedEncodingException;

    public int doiTrangThaiHoaDonTaiQuay(String maHd, String status);
}
