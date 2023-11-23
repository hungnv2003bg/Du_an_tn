package it.lab.repository;

import it.lab.entity.HoaDon;
import it.lab.entity.HoaDonChiTiet;
import it.lab.entity.SanPhamChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HoaDonChiTietRepo extends JpaRepository<HoaDonChiTiet, Long> {
    public List<HoaDonChiTiet> findHoaDonChiTietsByHoaDon(HoaDon hoaDon);

    public Optional<HoaDonChiTiet> findHoaDonChiTietByHoaDonAndSanPhamChiTiet(HoaDon hoaDon, SanPhamChiTiet sanPhamChiTiet);
}
