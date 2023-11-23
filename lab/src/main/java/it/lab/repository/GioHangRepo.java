package it.lab.repository;

import it.lab.entity.GioHang;
import it.lab.entity.NguoiDung;
import it.lab.entity.SanPhamChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GioHangRepo extends JpaRepository<GioHang, Long> {
    public Optional<GioHang> findGioHangByNguoiMuaAndSanPhamChiTiet(NguoiDung nguoiDung, SanPhamChiTiet sanPhamChiTiet);

    public List<GioHang> findGioHangsByNguoiMua(NguoiDung nguoiDung);

}
