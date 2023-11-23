package it.lab.service;

import it.lab.common.ResponObject;
import it.lab.dto.DiaChiDTO;
import it.lab.dto.GioHangDTO;
import it.lab.dto.PhuongThucThanhToanDTO;
import it.lab.dto.PhuongThucVanChuyenDTO;
import it.lab.entity.*;
import it.lab.enums.APIStatus;
import it.lab.enums.TrangThaiHoaDon;
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

@Service
public class ThanhToanService implements IThanhToan {
    @Autowired
    private GioHangRepo _gioHangRepo;
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
        hd.setGhiChu(yeuCau.getGhiChu());
        hd.setNgayTao(LocalDateTime.now());
        hd.setNguoiMua(nguoiMua);
        hd.setPhuongThucThanhToan(pttt.get());
        hd.setPhuongThucVanChuyen(ptvc.get());
        hd.setPhiGiaoHang(yeuCau.getPhiVanChuyen());
        hd.setTrangThai(TrangThaiHoaDon.CHOGIAOHANG);
        List<GioHang> ghList = _gioHangRepo.findGioHangsByNguoiMua(nguoiMua);
        Double giaTri = 0d;
        for (GioHang gh : ghList) {
            SanPhamChiTiet sp = _sanPhamChiTietRepo.findById(gh.getSanPhamChiTiet().getId()).get();
            giaTri += sp.getGiaBan() * gh.getSoLuong();
        }
        hd.setGiaTriHd(giaTri + yeuCau.getPhiVanChuyen());
        _hoaDonRepo.save(hd);
        hd.setHoaDonChiTietList(taoHoaDonChiTiet(ghList,hd.getId()));
        _gioHangRepo.deleteAll(ghList);
        return null;
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
        hd.setDiaChiGiao(dc.get());
        hd.setGhiChu(yeuCau.getGhiChu());
        hd.setNgayTao(LocalDateTime.now());
        hd.setNguoiMua(nguoiMua);
        hd.setPhuongThucThanhToan(pttt.get());
        hd.setPhuongThucVanChuyen(ptvc.get());
        hd.setPhiGiaoHang(yeuCau.getPhiVanChuyen());
        hd.setTrangThai(TrangThaiHoaDon.CHOGIAOHANG);
        List<GioHang> ghList = _gioHangRepo.findGioHangsByNguoiMua(nguoiMua);
        Double giaTri = 0d;
        for (GioHang gh : ghList) {
            SanPhamChiTiet sp = _sanPhamChiTietRepo.findById(gh.getSanPhamChiTiet().getId()).get();
            giaTri += sp.getGiaBan() * gh.getSoLuong();
        }
        hd.setGiaTriHd(giaTri + yeuCau.getPhiVanChuyen());

        _hoaDonRepo.save(hd);
        hd.setMaHoaDon("HD" + hd.getId());
        hd.setHoaDonChiTietList(taoHoaDonChiTiet(ghList,hd.getId()));
        _hoaDonRepo.save(hd);
        _gioHangRepo.deleteAll(ghList);
        return hd.getMaHoaDon();
    }

    private List<HoaDonChiTiet> taoHoaDonChiTiet(List<GioHang> gioHangList, Long hoaDonId) {
        List<HoaDonChiTiet> hoaDonChiTietList = new ArrayList<>();
        HoaDon hoaDon = _hoaDonRepo.findById(hoaDonId).get();
        for (GioHang gh : gioHangList) {
            SanPhamChiTiet spct = _sanPhamChiTietRepo.findById(gh.getSanPhamChiTiet().getId()).get();
            spct.setSoLuongTon(spct.getSoLuongTon() - gh.getSoLuong());
            HoaDonChiTiet hoaDonChiTiet = new HoaDonChiTiet();
            hoaDonChiTiet.setNgayTao(LocalDate.now());
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
