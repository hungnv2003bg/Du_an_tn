package it.lab.service;

import it.lab.common.ResponObject;
import it.lab.dto.GioHangDTO;
import it.lab.entity.GioHang;
import it.lab.entity.NguoiDung;
import it.lab.entity.SanPhamChiTiet;
import it.lab.enums.APIStatus;
import it.lab.iservice.IGioHangService;
import it.lab.iservice.IThanhToan;
import it.lab.modelcustom.respon.CheckOut;
import it.lab.repository.GioHangRepo;
import it.lab.repository.NguoiDungRepo;
import it.lab.repository.SanPhamChiTietRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class GioHangService implements IGioHangService {
    @Autowired
    private GioHangRepo _gioHangRepo;
    @Autowired
    private NguoiDungRepo _nguoiDungRepo;
    @Autowired
    private SanPhamChiTietRepo _sanPhamChiTietRepo;
    @Autowired
private IThanhToan _thanhToanService;
    @Override
    public ResponObject<String, APIStatus> themSanPhamChiTietVaoGioHang(Long nguoiDungId, Long sanPhamChiTietId, Integer soLuong) {
        Optional<NguoiDung> ng = _nguoiDungRepo.findById(nguoiDungId);
        Optional<SanPhamChiTiet> spct = _sanPhamChiTietRepo.findById(sanPhamChiTietId);
        Optional<GioHang> gioHang = _gioHangRepo.findGioHangByNguoiMuaAndSanPhamChiTiet(ng.get(), spct.get());
        if (gioHang.isEmpty()) {
            GioHang gh = new GioHang();
            gh.setNgayTao(LocalDate.now());
            gh.setNguoiMua(ng.get());
            gh.setSoLuong(soLuong);
            gh.setSanPhamChiTiet(spct.get());
            _gioHangRepo.save(gh);
        } else {
            gioHang.get().setSoLuong(gioHang.get().getSoLuong() + soLuong);
            _gioHangRepo.save(gioHang.get());
        }
        return new ResponObject<>("Thành công", APIStatus.THANHCONG, "Thành công!");
    }

    @Override
    public ResponObject<List<GioHangDTO>, APIStatus> layGioHang(Long nguoiDungId) {
        Optional<NguoiDung> ng = _nguoiDungRepo.findById(nguoiDungId);
        if (ng.isEmpty()) {
            return new ResponObject<List<GioHangDTO>, APIStatus>(null, APIStatus.THATBAI, "Không tìm thấy người dùng");
        }
        List<GioHang> gioHangList = _gioHangRepo.findGioHangsByNguoiMua(ng.get());
        return new ResponObject<List<GioHangDTO>, APIStatus>(GioHangDTO.fromCollection(gioHangList), APIStatus.THANHCONG, "Thành công");
    }

    @Override
    public ResponObject<CheckOut, APIStatus> capNhatSoLuongGioHang(Long nguoiDungId, Long gioHangId, Integer soLuongMoi) {
        Optional<GioHang> gh = _gioHangRepo.findById(gioHangId);
        if (gh.isEmpty()) {
            return new ResponObject<CheckOut, APIStatus>(null, APIStatus.THATBAI, "Giỏ hàng không tồn tại!");
        }
        gh.get().setSoLuong(soLuongMoi);
        if (gh.get().getSoLuong() <= 0) {
            _gioHangRepo.delete(gh.get());
        } else {
            _gioHangRepo.save(gh.get());
        }
        return _thanhToanService.layDuLieuThanhToan(nguoiDungId);
    }

    @Override
    public ResponObject<String, APIStatus> xoaGioHang(Long gioHangId) {
        Optional<GioHang> gh = _gioHangRepo.findById(gioHangId);
        if (gh.isEmpty()) {
            return new ResponObject<String, APIStatus>(null, APIStatus.THATBAI, "Giỏ hàng không tồn tại!");
        }
        _gioHangRepo.delete(gh.get());
        return new ResponObject<String, APIStatus>(null, APIStatus.THANHCONG, "Xóa thành công!");
    }
}
