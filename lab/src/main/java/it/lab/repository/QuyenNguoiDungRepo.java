package it.lab.repository;

import it.lab.entity.NguoiDung;
import it.lab.entity.QuyenNguoiDung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuyenNguoiDungRepo extends JpaRepository<QuyenNguoiDung, Long> {
    public List<QuyenNguoiDung> findAllByNguoiDungEquals(NguoiDung nguoiDung);
}
