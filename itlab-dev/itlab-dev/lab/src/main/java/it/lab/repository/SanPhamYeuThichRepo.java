package it.lab.repository;

import it.lab.entity.NguoiDung;
import it.lab.entity.SanPhamYeuThich;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SanPhamYeuThichRepo extends JpaRepository<SanPhamYeuThich, Long> {
    public List<SanPhamYeuThich> findAllByNguoiDungEquals(NguoiDung ng);
}
