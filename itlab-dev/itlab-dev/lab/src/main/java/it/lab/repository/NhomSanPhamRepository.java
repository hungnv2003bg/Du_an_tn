package it.lab.repository;

import it.lab.entity.NhomSanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NhomSanPhamRepository extends JpaRepository<NhomSanPham,Long> {
}
