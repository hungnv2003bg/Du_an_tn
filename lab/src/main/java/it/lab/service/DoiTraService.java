package it.lab.service;

import it.lab.common.Email;
import it.lab.common.EmailHoaDon;
import it.lab.entity.HoaDon;
import it.lab.entity.HoaDonChiTiet;
import it.lab.entity.SanPham;
import it.lab.entity.SanPhamChiTiet;
import it.lab.enums.TrangThaiHoaDon;
import it.lab.iservice.IDoiTraService;
import it.lab.modelcustom.request.ChiTietDoiTra;
import it.lab.modelcustom.request.DoiTra2;
import it.lab.repository.HoaDonChiTietRepo;
import it.lab.repository.HoaDonRepo;
import it.lab.repository.SanPhamChiTietRepo;
import it.lab.repository.SanPhamRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class DoiTraService implements IDoiTraService {
    @Autowired
    private HoaDonChiTietRepo _hoaDonChiTietRepo;
    @Autowired
    private HoaDonRepo _hoaDonRepo;
    @Autowired
    private SanPhamChiTietRepo _sanPhamChiTietRepo;
    @Autowired
    private SanPhamRepo _sanPhamRepo;
    private Email e = new Email();
    @Override
    public List<HoaDonChiTiet> layHoaDonChiTietCuaHoaDon(Long hoaDonId) {
        HoaDon hoaDon = _hoaDonRepo.findById(hoaDonId).get();
        return _hoaDonChiTietRepo.findHoaDonChiTietsByHoaDon(hoaDon);
    }

    @Override
    public Boolean doiTra(List<ChiTietDoiTra> data) {
        try {
            for (var item : data) {
                double totalGiaMoi = 0d;
                HoaDonChiTiet hoaDonChiTiet = _hoaDonChiTietRepo.findById(item.getChiTietId()).get();
                hoaDonChiTiet.setNgayCapNhat(LocalDateTime.now());
                hoaDonChiTiet.setTrangThai(1);
                hoaDonChiTiet.setSoLuongDoiTra(item.getSoLuong());
                SanPhamChiTiet sanPhamChiTiet = _sanPhamChiTietRepo.findById(hoaDonChiTiet.getSanPhamChiTiet().getId()).get();
                sanPhamChiTiet.setSoLuongLoi(sanPhamChiTiet.getSoLuongLoi() + item.getSoLuongLoi());
                sanPhamChiTiet.setSoLuongTon(sanPhamChiTiet.getSoLuongTon() + item.getSoLuongDoiTra());
                sanPhamChiTiet.setSoLuongTraHang(sanPhamChiTiet.getSoLuongTraHang() + item.getSoLuongDoiTra());

                SanPham sanPham = sanPhamChiTiet.getSanPham();
                sanPham.setSoLuongTon(sanPham.getSoLuongTon() + item.getSoLuongDoiTra());
                sanPham.setSoLuongLoi(sanPham.getSoLuongLoi() + item.getSoLuongLoi());
                sanPham.setSoLuongTraHang(sanPham.getSoLuongTraHang() + item.getSoLuongDoiTra());
                hoaDonChiTiet.setGhiChu(item.getGhiChu());
                totalGiaMoi = item.getSoLuong() * sanPhamChiTiet.getGiaBan();
                _hoaDonChiTietRepo.save(hoaDonChiTiet);
                _sanPhamChiTietRepo.save(sanPhamChiTiet);
                HoaDon hoaDon = _hoaDonRepo.findById(hoaDonChiTiet.getHoaDon().getId()).get();
                hoaDon.setGiaTriHd(hoaDon.getGiaTriHd() - totalGiaMoi);
                if (item.getSoLuong() < hoaDonChiTiet.getSoLuong()) {
                    HoaDonChiTiet hoaDonChiTiet1 = new HoaDonChiTiet();
                    hoaDonChiTiet1.setHoaDon(hoaDon);
                    hoaDonChiTiet1.setSanPhamChiTiet(hoaDonChiTiet.getSanPhamChiTiet());
                    hoaDonChiTiet1.setDonGia(sanPhamChiTiet.getGiaBan());
                    hoaDonChiTiet1.setSoLuong(hoaDonChiTiet.getSoLuong() - item.getSoLuong());
                    hoaDonChiTiet1.setNgayTao(LocalDateTime.now());
                    totalGiaMoi += (hoaDonChiTiet.getSoLuong() - item.getSoLuong()) * sanPhamChiTiet.getGiaBan();
                    _hoaDonChiTietRepo.save(hoaDonChiTiet1);
                }
                for (var item2 : item.getDuLieuMoi()) {
                    SanPhamChiTiet spMoi = _sanPhamChiTietRepo.findById(item2.getId()).get();
                    Optional<HoaDonChiTiet> check = _hoaDonChiTietRepo.findHoaDonChiTietByHoaDonAndSanPhamChiTiet(hoaDon, spMoi);
                    if (check.isEmpty()) {
                        HoaDonChiTiet hoaDonChiTiet2 = new HoaDonChiTiet();
                        hoaDonChiTiet2.setHoaDon(hoaDon);
                        hoaDonChiTiet2.setSanPhamChiTiet(spMoi);
                        hoaDonChiTiet2.setDonGia(spMoi.getGiaBan());
                        hoaDonChiTiet2.setSoLuong(item2.getSoLuongDoi());
                        hoaDonChiTiet2.setNgayTao(LocalDateTime.now());
                        _hoaDonChiTietRepo.save(hoaDonChiTiet2);
                    } else {
                        check.get().setSoLuong(check.get().getSoLuong() + item2.getSoLuongDoi());
                        _hoaDonChiTietRepo.save(check.get());
                    }
                    spMoi.setSoLuongTon(item2.getSoLuongDoi());
                    totalGiaMoi += item2.getSoLuongDoi() * spMoi.getGiaBan();
                    _sanPhamChiTietRepo.save(spMoi);
                }
                hoaDon.setGiaTriHd(hoaDon.getGiaTriHd() + totalGiaMoi);
                hoaDon.setTrangThai(TrangThaiHoaDon.DADOITRA);
                hoaDon.setNgayCapNhat(LocalDateTime.now());
                _hoaDonRepo.save(hoaDon);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /// 1 là thành công, 2 là ko đồng ý do giá trị hóa đơn nhỏ hơn trước
    @Override
    public Integer doiTra2(DoiTra2 doiTra) {
        Double giaTriHdHienTai = _hoaDonRepo.tinhGiaTriHd(doiTra.getHoaDonId());
        Double giaTriHdMoi = tinhGiaTriHdSauDoiTra(doiTra);
        if (giaTriHdMoi < giaTriHdHienTai) {
            return 2;
        }
        doiTraSanPham(doiTra);
        return 1;
    }

    private void doiTraSanPham(DoiTra2 doiTra) {
        HoaDon hd = _hoaDonRepo.findById(doiTra.getHoaDonId()).get();
        hd.setTrangThai(TrangThaiHoaDon.DADOITRA);
        e.sendContentHTML(hd.getNguoiMua().getEmail(),"Đổi trả hóa đơn thành công", EmailHoaDon.guiEmailKhiDoiTraTemplate(hd));
        for (var item : doiTra.getSanPhamTra()) {
            HoaDonChiTiet hdct = _hoaDonChiTietRepo.findById(item.getChiTietId()).get();
            hdct.setTrangThai(1);
            hdct.setSoLuongDoiTra(item.getSoLuong());
            hdct.setSoLuongLoi(item.getSoLuongLoi());
            hdct.setSoLuongDoi(item.getSoLuongDoiTra());
            hdct.setGhiChu(item.getGhiChu());
            SanPhamChiTiet sp = hdct.getSanPhamChiTiet();
            sp.setSoLuongTon(sp.getSoLuongTon()+item.getSoLuongDoiTra());
            sp.setSoLuongLoi(sp.getSoLuongLoi()+item.getSoLuongLoi());
            sp.setSoLuongTraHang(sp.getSoLuongTraHang()+item.getSoLuongDoiTra());
            sp.setSoLuongDaBan(sp.getSoLuongDaBan()-item.getSoLuongDoiTra()-item.getSoLuongLoi());
            SanPham sanPham = sp.getSanPham();
            sanPham.setSoLuongTon(sanPham.getSoLuongTon()+item.getSoLuongDoiTra());
            sanPham.setSoLuongLoi(sanPham.getSoLuongLoi()+item.getSoLuongLoi());
            sanPham.setSoLuongTraHang(sanPham.getSoLuongTraHang()+item.getSoLuongDoiTra());
            sanPham.setSoLuongDaBan(sanPham.getSoLuongDaBan()-item.getSoLuongDoiTra()-item.getSoLuongLoi());
            if(hdct.getSoLuong()>item.getSoLuong()){
                HoaDonChiTiet hdctMoi = new HoaDonChiTiet();
                hdctMoi.setNgayTao(LocalDateTime.now());
                hdctMoi.setHoaDon(hd);
                hdctMoi.setSoLuong(hdct.getSoLuong()-item.getSoLuong());
                hdctMoi.setSanPhamChiTiet(sp);
                hdctMoi.setDonGia(sp.getGiaBan());
                hdctMoi.setTrangThai(2);
                _hoaDonChiTietRepo.save(hdctMoi);
            }
            _sanPhamRepo.save(sanPham);
            _sanPhamChiTietRepo.save(sp);
            _hoaDonChiTietRepo.save(hdct);
        }
        for (var item : doiTra.getSanPhamDoi()) {
            SanPhamChiTiet spct = _sanPhamChiTietRepo.findById(item.getId()).get();
            SanPham sp = spct.getSanPham();
            sp.setSoLuongTon(sp.getSoLuongTon()-item.getSoLuongDoi());
            spct.setSoLuongTon(spct.getSoLuongTon()-item.getSoLuongDoi());
            HoaDonChiTiet hdct = new HoaDonChiTiet();
            hdct.setNgayTao(LocalDateTime.now());
            hdct.setHoaDon(hd);
            hdct.setSoLuong(item.getSoLuongDoi());
            hdct.setSanPhamChiTiet(spct);
            hdct.setDonGia(spct.getGiaBan());
            hdct.setTrangThai(2);
            _sanPhamChiTietRepo.save(spct);
            _sanPhamRepo.save(sp);
            _hoaDonChiTietRepo.save(hdct);
        }
        hd.setGiaTriHd(tinhGiaTriHdSauDoiTra(doiTra));
        hd.setNgayCapNhat(LocalDateTime.now());
        _hoaDonRepo.save(hd);
    }

    private Double tinhGiaTriHdSauDoiTra(DoiTra2 doiTra) {
        Double total = 0d;
        for (var item : doiTra.getSanPhamTra()) {
            HoaDonChiTiet hdct = _hoaDonChiTietRepo.findById(item.getChiTietId()).get();
            total += (hdct.getSoLuong() - item.getSoLuong()) * hdct.getDonGia();
        }
        for (var item : doiTra.getSanPhamDoi()) {
            SanPhamChiTiet spct = _sanPhamChiTietRepo.findById(item.getId()).get();
            total += spct.getGiaBan() * item.getSoLuongDoi();
        }
        return total;
    }

    @Override
    public Boolean huyDoiTra(Long hoaDonId) {
        HoaDon hoaDon = _hoaDonRepo.findById(hoaDonId).get();
        hoaDon.setTrangThai(TrangThaiHoaDon.TUCHOIDOI);
        _hoaDonRepo.save(hoaDon);
        e.sendContentHTML(hoaDon.getNguoiMua().getEmail(),"Từ chối đổi trả đơn hàng", EmailHoaDon.guiEmailKhiXacNhanTemplate(hoaDon));
        return true;
    }
}
