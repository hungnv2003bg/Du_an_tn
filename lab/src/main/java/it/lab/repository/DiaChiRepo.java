package it.lab.repository;

import it.lab.entity.DiaChi;
import it.lab.entity.NguoiDung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiaChiRepo extends JpaRepository<DiaChi, Long> {
    public List<DiaChi> findDiaChisByNguoiDung(NguoiDung nguoiDung);
}
