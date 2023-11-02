package it.lab.repository;

import it.lab.entity.SanPhamSuKien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SanPhamSuKienRepo extends JpaRepository<SanPhamSuKien, Long> {
}
