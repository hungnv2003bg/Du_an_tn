package it.lab.repository;

import it.lab.entity.HinhAnhSanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HinhAnhSanPhamRepository extends JpaRepository<HinhAnhSanPham,Long> {
}
