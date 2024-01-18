package it.lab.repository;

import it.lab.entity.NguoiDung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;  // Import kiểu dữ liệu LocalDate
import java.time.LocalDateTime;
import java.util.List;

public interface ThongKeNguoiDungRepository extends JpaRepository<NguoiDung,Integer> {
    @Query("SELECT COUNT(nd) FROM NguoiDung nd WHERE nd.ngayTao >= :oneMonthAgo")
    Long countTaiKhoanMoiTrongThang(@Param("oneMonthAgo") LocalDateTime oneMonthAgo);
}
