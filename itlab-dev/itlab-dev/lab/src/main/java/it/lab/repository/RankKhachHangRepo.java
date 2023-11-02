package it.lab.repository;

import it.lab.entity.RankKhachHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RankKhachHangRepo extends JpaRepository<RankKhachHang, Long> {
}
