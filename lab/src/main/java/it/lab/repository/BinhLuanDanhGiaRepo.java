package it.lab.repository;

import it.lab.entity.BinhLuanDanhGia;
import it.lab.modelcustom.NguoiDungCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface BinhLuanDanhGiaRepo extends JpaRepository<BinhLuanDanhGia, Long> {
}
