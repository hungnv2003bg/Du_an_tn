package it.lab.repository;

import it.lab.entity.NguoiDung;
import it.lab.entity.SanPhamChiTiet;
import it.lab.entity.SanPhamYeuThich;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SanPhamYeuThichRepo extends JpaRepository<SanPhamYeuThich, Long> {
    public List<SanPhamYeuThich> findAllByNguoiDungEquals(NguoiDung ng);

    public List<SanPhamYeuThich> findSanPhamYeuThichesByNguoiDung(NguoiDung ng);

    public List<SanPhamYeuThich> findSanPhamYeuThichesByNguoiDungAndSanPhamChiTiet(NguoiDung ng, SanPhamChiTiet sp);
}
