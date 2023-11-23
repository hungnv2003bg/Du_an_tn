package it.lab.service;

import it.lab.dto.*;
import it.lab.entity.*;
import it.lab.enums.TrangThaiDiaChi;
import it.lab.enums.TrangThaiHoaDon;
import it.lab.enums.TrangThaiNguoiDung;
import it.lab.iservice.IMuaTaiQuayService;
import it.lab.modelcustom.request.MuaTaiQuayRequest;
import it.lab.modelcustom.respon.HoaDonChoTaiCuaHang;
import it.lab.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class MuaTaiQuayService implements IMuaTaiQuayService {
    @Autowired
    private HoaDonRepo _hoaDonRepo;
    @Autowired
    private NguoiDungRepo _nguoiDungRepo;
    @Autowired
    private SanPhamChiTietRepo _sanPhamChiTietRepo;
    @Autowired
    private HoaDonChiTietRepo _hoaDonChiTietRepo;
    @Autowired
    private DiaChiRepo _diaChiRepo;
    @Autowired
    private PhuongThucThanhToanRepo _phuongThucThanhToanRepo;
    @Autowired
    private PhuongThucVanChuyenRepo _phuongThucVanChuyenRepo;
    @Autowired
    private RankKhachHangRepo _rankKhachRepo;

    @Override
    public List<HoaDonChoTaiCuaHang> layDanhSachTaiCuaHang() {
        return HoaDonChoTaiCuaHang.fromCollection(_hoaDonRepo.findAll());
    }

    @Override
    public String taoMoiHoaDon(Long nhanVienId) {
        HoaDon hoaDon = new HoaDon();
        hoaDon.setNgayTao(LocalDateTime.now());
        hoaDon.setNhanVien(_nguoiDungRepo.findById(nhanVienId).get());
        hoaDon.setGiaTriHd(0d);
        hoaDon.setPhiGiaoHang(0d);
        hoaDon.setTrangThai(TrangThaiHoaDon.HOADONCHO);
        _hoaDonRepo.save(hoaDon);
        hoaDon.setMaHoaDon("HD" + hoaDon.getId());
        _hoaDonRepo.save(hoaDon);
        return hoaDon.getMaHoaDon();
    }

    @Override
    public List<SanPhamChiTietDTO> layHetChiTiet() {
        return SanPhamChiTietDTO.fromCollection(_sanPhamChiTietRepo.findAll());
    }

    @Override
    public List<HoaDonChiTietDTO> gioHangCuaHoaDon(Long hoaDonId) {
        HoaDon hoaDon = _hoaDonRepo.findById(hoaDonId).get();
        return HoaDonChiTietDTO.fromCollection(_hoaDonChiTietRepo.findHoaDonChiTietsByHoaDon(hoaDon));
    }

    @Override
    public List<HoaDonChiTietDTO> themSanPhamVaoHoaDon(Long hoaDonId, Long sanPhamId) {
        HoaDon hoaDon = _hoaDonRepo.findById(hoaDonId).get();
        SanPhamChiTiet sanPhamChiTiet = _sanPhamChiTietRepo.findById(sanPhamId).get();
        HoaDonChiTiet hoaDonNew = new HoaDonChiTiet();
        hoaDonNew.setHoaDon(hoaDon);
        hoaDonNew.setSoLuong(1);
        hoaDonNew.setSanPhamChiTiet(sanPhamChiTiet);
        hoaDonNew.setNgayTao(LocalDate.now());
        hoaDonNew.setDonGia(sanPhamChiTiet.getGiaBan());
        Double giaTri = 1 * sanPhamChiTiet.getGiaBan();
        hoaDon.setGiaTriHd(giaTri + hoaDon.getGiaTriHd());
        _hoaDonChiTietRepo.save(hoaDonNew);
        _hoaDonRepo.save(hoaDon);
        return gioHangCuaHoaDon(hoaDonId);
    }

    @Override
    public HoaDonDTO layHoaDon(Long hoaDonId) {
        return HoaDonDTO.fromEntity(_hoaDonRepo.findById(hoaDonId).get());
    }

    @Override
    public List<NguoiDungDTO> layDanhSachKhachHang() {
        return NguoiDungDTO.fromCollection(_nguoiDungRepo.findAll());
    }

    @Override
    public List<DiaChiDTO> layDiaChiNguoiDung(Long nguoiDungId) {
        return DiaChiDTO.fromCollection(_diaChiRepo.findDiaChisByNguoiDung(_nguoiDungRepo.findById(nguoiDungId).get()));
    }

    @Override
    public Boolean taoHoaDonTaiQuay(MuaTaiQuayRequest muaTaiQuayRequest) {
        HoaDon hoaDon = _hoaDonRepo.findById(muaTaiQuayRequest.getHoaDonId()).get();
        NguoiDung nguoiDung = null;
        if (muaTaiQuayRequest.getKhachHangId() == -1) {
            nguoiDung = _nguoiDungRepo.findById(taoMoiNguoiDung(muaTaiQuayRequest)).get();
        } else {
            nguoiDung = _nguoiDungRepo.findById(muaTaiQuayRequest.getKhachHangId()).get();
        }
        PhuongThucThanhToan phuongThucThanhToan = _phuongThucThanhToanRepo.findById(muaTaiQuayRequest.getPhuongThucThanhToan()).get();
        hoaDon.setPhuongThucThanhToan(phuongThucThanhToan);
        PhuongThucVanChuyen phuongThucVanChuyen = _phuongThucVanChuyenRepo.findById(muaTaiQuayRequest.getPhuongThucVanChuyen()).get();
        hoaDon.setPhuongThucVanChuyen(phuongThucVanChuyen);
        if (!muaTaiQuayRequest.getKoDungDiaChi()) {
            if (muaTaiQuayRequest.getIsCoDiaChiMoi()) {
                DiaChi diaChi = new DiaChi();
                diaChi.setChiTietDiaChi(muaTaiQuayRequest.getChiTietDiaChi());
                diaChi.setNgayTao(LocalDate.now());
                diaChi.setHuyenId(muaTaiQuayRequest.getHuyenId());
                diaChi.setHuyen(muaTaiQuayRequest.getHuyen());
                diaChi.setTinh(muaTaiQuayRequest.getTinhId());
                diaChi.setTinh(muaTaiQuayRequest.getTinh());
                diaChi.setXaId(muaTaiQuayRequest.getXaId());
                diaChi.setXa(muaTaiQuayRequest.getXa());
                diaChi.setNguoiDung(nguoiDung);
                diaChi.setLaDiaChiChinh(false);
                diaChi.setTrangThai(TrangThaiDiaChi.HOATDONG);
                diaChi.setSoDienThoai(muaTaiQuayRequest.getSoDienThoai());
                _diaChiRepo.save(diaChi);
                hoaDon.setDiaChiGiao(diaChi);
            } else {
                DiaChi diaChi = _diaChiRepo.findById(muaTaiQuayRequest.getDiaChiId()).get();
                hoaDon.setDiaChiGiao(diaChi);

            }
        }
        hoaDon.setNguoiMua(nguoiDung);
        if (muaTaiQuayRequest.getPhuongThucVanChuyen() == 1) {
            hoaDon.setTrangThai(TrangThaiHoaDon.CHOGIAOHANG);
        }
        if (muaTaiQuayRequest.getPhuongThucVanChuyen() == 3) {
            hoaDon.setNgayGiao(LocalDate.now());
            hoaDon.setTrangThai(TrangThaiHoaDon.DAGIAO);
        }
        _hoaDonRepo.save(hoaDon);
        return true;
    }

    private Long taoMoiNguoiDung(MuaTaiQuayRequest mua) {
        NguoiDung nguoiDung = new NguoiDung();
        nguoiDung.setEmail(mua.getEmail());
        nguoiDung.setTen(mua.getNguoiNhan());
        nguoiDung.setHo(mua.getHoNguoiNhan());
        nguoiDung.setDiem(0);
        nguoiDung.setGioiTinh(false);
        nguoiDung.setMatKhau(UUID.randomUUID().toString());
        nguoiDung.setNgayTao(LocalDate.now());
        nguoiDung.setTrangThai(TrangThaiNguoiDung.HOATDONG);
        nguoiDung.setRankKhachHang(_rankKhachRepo.findById(1l).get());
        _nguoiDungRepo.save(nguoiDung);
        nguoiDung.setMaNguoiDung("MEM" + nguoiDung.getId());
        _nguoiDungRepo.save(nguoiDung);
        return nguoiDung.getId();
    }

    @Override
    public List<HoaDonChiTietDTO> quetMa(String maSp, Long hoaDonId) {
        HoaDon hoaDon = _hoaDonRepo.findById(hoaDonId).get();
        Optional<SanPhamChiTiet> sanPhamChiTiet = _sanPhamChiTietRepo.findSanPhamChiTietByMaSanPham(maSp);
        if (sanPhamChiTiet.isEmpty()) {
            return gioHangCuaHoaDon(hoaDonId);
        }
        HoaDonChiTiet hoaDonNew = new HoaDonChiTiet();
        hoaDonNew.setHoaDon(hoaDon);
        hoaDonNew.setSoLuong(1);
        hoaDonNew.setSanPhamChiTiet(sanPhamChiTiet.get());
        hoaDonNew.setNgayTao(LocalDate.now());
        hoaDonNew.setDonGia(sanPhamChiTiet.get().getGiaBan());
        Double giaTri = 1 * sanPhamChiTiet.get().getGiaBan();
        hoaDon.setGiaTriHd(giaTri + hoaDon.getGiaTriHd());
        _hoaDonChiTietRepo.save(hoaDonNew);
        _hoaDonRepo.save(hoaDon);
        return gioHangCuaHoaDon(hoaDonId);
    }
}
