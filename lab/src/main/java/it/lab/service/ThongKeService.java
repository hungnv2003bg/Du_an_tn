package it.lab.service;

import it.lab.enums.TrangThaiHoaDon;
import it.lab.iservice.IThongKeService;
import it.lab.repository.HoaDonChiTietRepo;
import it.lab.repository.HoaDonRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@Service
public class ThongKeService implements IThongKeService {
    @Autowired
    private HoaDonRepo _hoaDonRepo;
    @Autowired
    private HoaDonChiTietRepo _hoaDonChiTiet;

    @Override
    public Double doanhThuTrongNgay() {
        var now =LocalDateTime.now();
        var lst = _hoaDonRepo.thongKeNgay(now.getYear(), now.getMonthValue(),now.getDayOfMonth())
                .stream().filter(x -> x.getTrangThai() == TrangThaiHoaDon.DAGIAO || x.getTrangThai() == TrangThaiHoaDon.DADOITRA || x.getTrangThai() == TrangThaiHoaDon.TUCHOIDOI)
                .collect(Collectors.toList());
        Double total = 0d;
        for (var item : lst) {
            var chiTiet = _hoaDonChiTiet.findHoaDonChiTietsByHoaDon(item);
            for (var item2 : chiTiet) {
                if (item2.getTrangThai() == 2) {
                    total += item2.getDonGia() * item2.getSoLuong();
                }
            }
            total-=item.getPhiGiaoHang();
        }
        return total;
    }
}
