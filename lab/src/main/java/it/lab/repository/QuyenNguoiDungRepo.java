package it.lab.repository;

import it.lab.entity.NguoiDung;
import it.lab.entity.Quyen;
import it.lab.entity.QuyenNguoiDung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface QuyenNguoiDungRepo extends JpaRepository<QuyenNguoiDung, Long> {
    public List<QuyenNguoiDung> findAllByNguoiDungEquals(NguoiDung nguoiDung);

    public List<QuyenNguoiDung> findQuyenNguoiDungsByNguoiDung(NguoiDung ng);

    //    thông kê có bao nhiêu nhân viên
// Thống kê có bao nhiêu nhân viên với quyenid là '2'
    @Query("SELECT COUNT(qnd) FROM QuyenNguoiDung qnd WHERE qnd.quyen.id = 2")
    Long tongSoNhanVien();

    @Query("SELECT COUNT(qnd) FROM QuyenNguoiDung qnd WHERE qnd.quyen.id = 1")
    Long tongSoKhachHang();

    @Query("SELECT COUNT(qnd) FROM QuyenNguoiDung qnd WHERE qnd.quyen.id = 3")
    Long tongSoAdmin();

    @Query("SELECT COUNT(qnd) FROM QuyenNguoiDung qnd WHERE qnd.quyen.id = 4")
    Long tongSoCRM();

    @Query("SELECT COUNT(nd) FROM QuyenNguoiDung nd WHERE nd.ngayTao >= :oneMonthAgo")
    Long countTaiKhoanMoiTrongThang123(@Param("oneMonthAgo") LocalDateTime oneMonthAgo);

}
