package it.lab.service;

import it.lab.common.Email;
import it.lab.common.ResponObject;
import it.lab.common.Template;
import it.lab.dto.DiaChiDTO;
import it.lab.dto.GioHangDTO;
import it.lab.dto.PhuongThucThanhToanDTO;
import it.lab.dto.PhuongThucVanChuyenDTO;
import it.lab.entity.*;
import it.lab.enums.APIStatus;
import it.lab.enums.TrangThaiHoaDon;
import it.lab.enums.TrangThaiNguoiDungVoucher;
import it.lab.iservice.IThanhToan;
import it.lab.modelcustom.request.TaoHoaDonOnline;
import it.lab.modelcustom.respon.CheckOut;
import it.lab.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ThanhToanService implements IThanhToan {
    @Autowired
    private GioHangRepo _gioHangRepo;
    @Autowired
    private VoucherRepo _voucherRepo;
    @Autowired
    private NguoiDungVoucherRepo _nguoiDungVoucherRepo;
    @Autowired
    private NguoiDungRepo _nguoiDungRepo;
    @Autowired
    private SanPhamChiTietRepo _sanPhamChiTietRepo;
    @Autowired
    private DiaChiRepo _diaChiRepo;
    @Autowired
    private PhuongThucThanhToanRepo _phuongThucThanhToanRepo;
    @Autowired
    private PhuongThucVanChuyenRepo _phuongThucVanChuyenRepo;
    @Autowired
    private HoaDonRepo _hoaDonRepo;
    @Autowired
    private HoaDonChiTietRepo _hoaDonChiTietRepo;
    @Autowired
    private SanPhamRepo _sanPhamRepo;

    private void thayDoiSoLuongKhiConfirmHoaDon(long hoaDonId) {
        HoaDon hoaDon = _hoaDonRepo.findById(hoaDonId).get();
        var chiTiet = _hoaDonChiTietRepo.findHoaDonChiTietsByHoaDon(hoaDon);
        for (var item : chiTiet) {
            SanPhamChiTiet sp = item.getSanPhamChiTiet();
            SanPham sanPham = sp.getSanPham();
            sanPham.setSoLuongTon(sanPham.getSoLuongTon() - item.getSoLuong());
            sanPham.setSoLuongDaBan(sanPham.getSoLuongDaBan() + item.getSoLuong());
            sp.setSoLuongDaBan(sp.getSoLuongDaBan() + item.getSoLuong());
            sp.setSoLuongTon(sp.getSoLuongTon() - item.getSoLuong());
            _sanPhamChiTietRepo.save(sp);
            _sanPhamRepo.save(sanPham);
        }
    }

    @Override
    public ResponObject<CheckOut, APIStatus> layDuLieuThanhToan(Long nguoiDungId) {
        Optional<NguoiDung> ng = _nguoiDungRepo.findById(nguoiDungId);
        if (ng.isEmpty()) {
            return new ResponObject<>(null, APIStatus.THATBAI, "Người dùng không tồn tại!");
        }
        List<GioHangDTO> listGioHang = GioHangDTO.fromCollection(_gioHangRepo.findGioHangsByNguoiMua(ng.get()));
        List<DiaChiDTO> listDiaChi = DiaChiDTO.fromCollection(_diaChiRepo.findDiaChisByNguoiDung(ng.get()));
        List<PhuongThucThanhToanDTO> listPhuongThucThanhToan = PhuongThucThanhToanDTO.fromCollection(_phuongThucThanhToanRepo.findAll());
        List<PhuongThucVanChuyenDTO> listPhuongThucVanChuyen = PhuongThucVanChuyenDTO.fromCollection(_phuongThucVanChuyenRepo.findAll());
        return new ResponObject<CheckOut, APIStatus>(new CheckOut(listGioHang, listDiaChi, listPhuongThucThanhToan, listPhuongThucVanChuyen), APIStatus.THANHCONG, "Thành công!");
    }

    @Override
    public ResponObject<CheckOut, APIStatus> taoHoaDonOnline(TaoHoaDonOnline yeuCau) {
        Optional<DiaChi> dc = _diaChiRepo.findById(yeuCau.getDiaChiId());
        Optional<PhuongThucThanhToan> pttt = _phuongThucThanhToanRepo.findById(yeuCau.getPhuongThucThanhToanId());
        Optional<PhuongThucVanChuyen> ptvc = _phuongThucVanChuyenRepo.findById(yeuCau.getPhuongThucVanChuyenId());
        if (!kiemTraTonTai(dc, pttt, ptvc)) {
            return null;
        }
        NguoiDung nguoiMua = dc.get().getNguoiDung();
        HoaDon hd = new HoaDon();
        hd.setDiaChiGiao(dc.get());
        if (yeuCau.getVoucherId() != null) {
            Voucher v = _voucherRepo.findById(yeuCau.getVoucherId()).get();
            List<NguoiDungVoucher> lst = _nguoiDungVoucherRepo.findNguoiDungVouchersByNguoiDungAndVoucher(nguoiMua, v)
                    .stream().filter(x->x.getTrangThai()==TrangThaiNguoiDungVoucher.SUDUNG).collect(Collectors.toList());
            NguoiDungVoucher ndv = lst.get(0);
            ndv.setTrangThai(TrangThaiNguoiDungVoucher.DASUDUNG);
            hd.setVoucherGiam(ndv);
            _nguoiDungVoucherRepo.save(ndv);
        }
        hd.setGhiChu(yeuCau.getGhiChu());
        hd.setNgayTao(LocalDateTime.now());
        hd.setNguoiMua(nguoiMua);
        hd.setPhuongThucThanhToan(pttt.get());
        hd.setPhuongThucVanChuyen(ptvc.get());
        hd.setPhiGiaoHang(yeuCau.getPhiVanChuyen());
        hd.setTrangThai(TrangThaiHoaDon.CHOXACNHAN);
        List<GioHang> ghList = _gioHangRepo.findGioHangsByNguoiMua(nguoiMua);
        Double giaTri = 0d;
        for (GioHang gh : ghList) {
            SanPhamChiTiet sp = _sanPhamChiTietRepo.findById(gh.getSanPhamChiTiet().getId()).get();
            giaTri += sp.getGiaBan() * gh.getSoLuong();
        }
        hd.setGiaTriHd(giaTri + yeuCau.getPhiVanChuyen());
        //  String thongBao = Template.hoaDonMoi(hd);
        //    guiThongBaoChoNhanVien(thongBao);
        _hoaDonRepo.save(hd);
        hd.setMaHoaDon("HD" + hd.getId());
        _hoaDonRepo.save(hd);
        hd.setHoaDonChiTietList(taoHoaDonChiTiet(ghList, hd.getId()));
        thayDoiSoLuongKhiConfirmHoaDon(hd.getId());
        _gioHangRepo.deleteAll(ghList);
        return null;
    }
    private void guiThongBaoChoNhanVien(String thongBao) {
        List<NguoiDung> lst = _nguoiDungRepo.findAll().stream().filter(x -> {
            for (var item : x.getQuyenNguoiDungList()) {
                if (item.getQuyen().getId() == 3 || item.getQuyen().getId() == 2) {
                    return true;
                }
            }
            return false;
        }).toList();
        for (var item : lst) {
            if (item.getEmail() != null) {
                Email email = new Email();
                email.sendContentHTML(item.getEmail(), "Hóa đơn mới", thongBao);
            }
        }
    }

    @Override
    public String taoHoaDonOnlineVnPay(TaoHoaDonOnline yeuCau) {
        Optional<DiaChi> dc = _diaChiRepo.findById(yeuCau.getDiaChiId());
        Optional<PhuongThucThanhToan> pttt = _phuongThucThanhToanRepo.findById(yeuCau.getPhuongThucThanhToanId());
        Optional<PhuongThucVanChuyen> ptvc = _phuongThucVanChuyenRepo.findById(yeuCau.getPhuongThucVanChuyenId());
        if (!kiemTraTonTai(dc, pttt, ptvc)) {
            return null;
        }
        NguoiDung nguoiMua = dc.get().getNguoiDung();
        HoaDon hd = new HoaDon();
        if (yeuCau.getVoucherId() != null) {
            Voucher v = _voucherRepo.findById(yeuCau.getVoucherId()).get();
            List<NguoiDungVoucher> lst = _nguoiDungVoucherRepo.findNguoiDungVouchersByNguoiDungAndVoucher(nguoiMua, v)
                    .stream().filter(x->x.getTrangThai()==TrangThaiNguoiDungVoucher.SUDUNG).collect(Collectors.toList());
            hd.setVoucherGiam(lst.get(0));
        }
        hd.setDiaChiGiao(dc.get());
        hd.setGhiChu(yeuCau.getGhiChu());
        hd.setNgayTao(LocalDateTime.now());
        hd.setNguoiMua(nguoiMua);
        hd.setPhuongThucThanhToan(pttt.get());
        hd.setPhuongThucVanChuyen(ptvc.get());
        hd.setPhiGiaoHang(yeuCau.getPhiVanChuyen());
        hd.setTrangThai(TrangThaiHoaDon.CHOTHANHTOANBANKING);
        List<GioHang> ghList = _gioHangRepo.findGioHangsByNguoiMua(nguoiMua);
        Double giaTri = 0d;
        for (GioHang gh : ghList) {
            SanPhamChiTiet sp = _sanPhamChiTietRepo.findById(gh.getSanPhamChiTiet().getId()).get();
            giaTri += sp.getGiaBan() * gh.getSoLuong();
        }
        hd.setGiaTriHd(giaTri + yeuCau.getPhiVanChuyen());
        _hoaDonRepo.save(hd);
        hd.setMaHoaDon("HD" + hd.getId());
        hd.setHoaDonChiTietList(taoHoaDonChiTiet(ghList, hd.getId()));
        _hoaDonRepo.save(hd);
        //  _gioHangRepo.deleteAll(ghList);
        //  thayDoiSoLuongKhiConfirmHoaDon(hd.getId());
        return hd.getMaHoaDon();
    }

    @Override
    public void checkThanhToanVNPay(String maHD, Long trangThai) {
        var hoaDon = _hoaDonRepo.findHoaDonByMaHoaDon(maHD);
        if (!hoaDon.isPresent()) {
            return;
        }
        if (trangThai == 0) {
            List<GioHang> ghList = _gioHangRepo.findGioHangsByNguoiMua(hoaDon.get().getNguoiMua());
            _gioHangRepo.deleteAll(ghList);
            thayDoiSoLuongKhiConfirmHoaDon(hoaDon.get().getId());
            hoaDon.get().setNgayThanhToan(LocalDateTime.now());
            if (hoaDon.get().getVoucherGiam() != null) {
                hoaDon.get().getVoucherGiam().setTrangThai(TrangThaiNguoiDungVoucher.DASUDUNG);
                _nguoiDungVoucherRepo.save(hoaDon.get().getVoucherGiam());
            }
            hoaDon.get().setTrangThai(TrangThaiHoaDon.CHOGIAOHANG);
            _hoaDonRepo.save(hoaDon.get());
        } else {
            hoaDon.get().setTrangThai(TrangThaiHoaDon.CUAHANGHUY);
            _hoaDonRepo.save(hoaDon.get());
        }
    }

    private List<HoaDonChiTiet> taoHoaDonChiTiet(List<GioHang> gioHangList, Long hoaDonId) {
        List<HoaDonChiTiet> hoaDonChiTietList = new ArrayList<>();
        HoaDon hoaDon = _hoaDonRepo.findById(hoaDonId).get();
        for (GioHang gh : gioHangList) {
            SanPhamChiTiet spct = _sanPhamChiTietRepo.findById(gh.getSanPhamChiTiet().getId()).get();
            HoaDonChiTiet hoaDonChiTiet = new HoaDonChiTiet();
            hoaDonChiTiet.setNgayTao(LocalDateTime.now());
            hoaDonChiTiet.setSanPhamChiTiet(spct);
            hoaDonChiTiet.setSoLuong(gh.getSoLuong());
            hoaDonChiTiet.setDonGia(gh.getSanPhamChiTiet().getGiaBan());
            hoaDonChiTiet.setHoaDon(hoaDon);
            _hoaDonChiTietRepo.save(hoaDonChiTiet);
            hoaDonChiTietList.add(hoaDonChiTiet);
            _sanPhamChiTietRepo.save(spct);
        }
        return hoaDonChiTietList;
    }

    private boolean kiemTraTonTai(Optional<DiaChi> dc, Optional<PhuongThucThanhToan> pttt, Optional<PhuongThucVanChuyen> ptvc) {
        if (dc.isEmpty()) {
            return false;
        }
        if (pttt.isEmpty()) {
            return false;
        }
        if (ptvc.isEmpty()) {
            return false;
        }
        return true;
    }

}
