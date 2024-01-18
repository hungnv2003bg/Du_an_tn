package it.lab.service;

import it.lab.dto.*;
import it.lab.entity.NguoiDung;
import it.lab.enums.APIStatus;
import it.lab.enums.TrangThaiHoaDon;
import it.lab.enums.TrangThaiSuKienGiamGia;
import it.lab.iservice.ICRMService;
import it.lab.modelcustom.respon.DoanhThu;
import it.lab.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class CRMService implements ICRMService {
    @Autowired
    private NguoiDungRepo _nguoidungRepo;
    @Autowired
    private SanPhamYeuThichRepo _sanPhamYeuThichRepo;
    @Autowired
    private HoaDonRepo _hoaDonRepo;
    @Autowired
    private HoaDonChiTietRepo _hoaDonChiTiet;
    @Autowired
    private SanPhamRepo _sanPhamRepo;
    @Autowired
    private SanPhamChiTietRepo _sanPhamChiTietRepo;

    @Override
    public List<SanPhamYeuThichDTO> getSanPhamYeuThichUser(Long userId) {
        Optional<NguoiDung> ng = _nguoidungRepo.findById(userId);
        if (ng.isEmpty()) {
            return null;
        }
        return SanPhamYeuThichDTO.fromCollection(_sanPhamYeuThichRepo.findAllByNguoiDungEquals(ng.get()));
    }

    @Override
    public List<DoanhThu> doanhThuTheo12Thang(Integer nam) {
        List<DoanhThu> res = new ArrayList<>();
        var hoaDonList = _hoaDonRepo.findAll().stream().filter(x -> x.getNgayTao().getYear() == nam && (x.getTrangThai() == TrangThaiHoaDon.DAGIAO || x.getTrangThai() == TrangThaiHoaDon.DADOITRA || x.getTrangThai() == TrangThaiHoaDon.TUCHOIDOI)).toList();
        for (int i = 1; i < 13; i++) {
            int thang = i;
            double total = 0d;
            double von = 0d;
            var hoaDonTrongThang = hoaDonList.stream().filter(x -> x.getNgayTao().getMonthValue() == thang).toList();
            for (var hoaDon : hoaDonTrongThang) {
                var chiTiet = _hoaDonChiTiet.findHoaDonChiTietsByHoaDon(hoaDon);
                for (var chiTietItem : chiTiet) {
                    von += chiTietItem.getSanPhamChiTiet().getGiaNhap() * chiTietItem.getSoLuong();
                    total += chiTietItem.getDonGia() * chiTietItem.getSoLuong();
                }
            }
            res.add(new DoanhThu(thang, von, total));
        }
        return res;
    }


    @Override
    public List<DoanhSoSanPham12Thang> thongKeBan12Thang(Integer nam) {
        List<DoanhSoSanPham12Thang> res = new ArrayList<>();
        var sanPhamTop12 = _sanPhamRepo.laySanPham12Thang(nam);
        for (var item : sanPhamTop12) {
            DoanhSoSanPham12Thang ds = new DoanhSoSanPham12Thang();
            List<Integer> doanhSo = new ArrayList<>();
            for (int i = 1; i < 13; i++) {
                Integer spDs = _sanPhamRepo.layDoanhSo(i, item.getSanPhamId(), nam);
                doanhSo.add(spDs == null ? 0 : spDs);
            }
            ds.setDoanhSo(doanhSo);
            ds.setSanPham(SanPhamDTO.fromEntity(_sanPhamRepo.findById(item.getSanPhamId()).get()));
            res.add(ds);
        }
        return res;
    }

    @Override
    public ThongKeChiTietSp thongKeChiTietCuaSanPham(long spId, long truoc, long sau) {
        ThongKeChiTietSp data = new ThongKeChiTietSp();
        List<ChiTietDoanhSoTheo12Thang> res = new ArrayList<>();
        var sanPham = _sanPhamRepo.layChiTietIdBySp(spId);
        for (var item : sanPham) {
            ChiTietDoanhSoTheo12Thang chiTiet = new ChiTietDoanhSoTheo12Thang();
            chiTiet.setSanPhamChiTiet(_sanPhamChiTietRepo.findById(item.getSanPhamId()).get());
            chiTiet.setSoLuong(item.getSoLuongBan());
            res.add(chiTiet);
        }
        List<SoSanhDoanhSo> doanhSo = new ArrayList<>();
        List<SoSanhDoanhThu> doanhThu = new ArrayList<>();
        for (int i = 1; i < 13; i++) {
            Long doanhSoData = _hoaDonChiTiet.doanhSoThangCuaSanPham(spId, truoc, i);
            Long doanhSoData2 = _hoaDonChiTiet.doanhSoThangCuaSanPham(spId, sau, i);
            Long doanhThuData = _hoaDonChiTiet.doanhThuThangCuaSanPham(spId, truoc, i);
            Long doanhThuData2 = _hoaDonChiTiet.doanhThuThangCuaSanPham(spId, sau, i);
            doanhSo.add(new SoSanhDoanhSo(doanhSoData == null ? 0 : doanhSoData, doanhSoData2 == null ? 0 : doanhSoData2));
            doanhThu.add(new SoSanhDoanhThu(doanhThuData == null ? 0 : doanhThuData, doanhThuData2 == null ? 0 : doanhThuData2));
        }
        data.setSoSanhDoanhSo(doanhSo);
        data.setSoSanhDoanhThu(doanhThu);
        data.setThongKeChiTiet12(res);
        return data;
    }
}
