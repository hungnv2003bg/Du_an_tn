package it.lab.repository;

import it.lab.entity.RankKhachHang;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ThongKeRankRepository extends JpaRepository<RankKhachHang,Integer> {

    @Query("SELECT r.tenRank, COUNT(u.id) AS so_luong_nguoi_dung " +
            "FROM RankKhachHang r " +
            "JOIN NguoiDung u ON r.id = u.rankKhachHang.id " +
            "GROUP BY r.tenRank " +
            "ORDER BY so_luong_nguoi_dung DESC")
    List<Object[]> findTotalRevenueByUser();





}
