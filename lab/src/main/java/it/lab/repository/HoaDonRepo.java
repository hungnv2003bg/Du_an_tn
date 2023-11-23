package it.lab.repository;

import it.lab.entity.HoaDon;
import it.lab.enums.TrangThaiHoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HoaDonRepo extends JpaRepository<HoaDon, Long> {
    public List<HoaDon> findAllByTrangThaiEquals(TrangThaiHoaDon trangThai);
}
