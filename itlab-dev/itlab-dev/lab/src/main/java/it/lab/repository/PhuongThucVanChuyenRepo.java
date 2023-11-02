package it.lab.repository;

import it.lab.entity.PhuongThucVanChuyen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhuongThucVanChuyenRepo extends JpaRepository<PhuongThucVanChuyen, Long> {
}
