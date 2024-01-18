package it.lab.repository;

import it.lab.entity.HoaDonChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface ThongKeHDCTRepository extends JpaRepository<HoaDonChiTiet,Integer> {

    @Query("SELECT SUM(h.soLuong) FROM HoaDonChiTiet h")
    int getTongSoLuongBanDuoc();


    @Query("SELECT SUM((sp.giaBan - sp.giaNhap) * hdct.soLuong) AS tongLoiNhuan " +
            "FROM HoaDonChiTiet hdct " +
            "JOIN hdct.hoaDon hdt " +
            "JOIN hdct.sanPhamChiTiet sp " +
            "WHERE FUNCTION('YEAR', hdt.ngayTao) = :yearParam " +
            "AND FUNCTION('MONTH', hdt.ngayTao) = :monthParam")
    BigDecimal tinhTongDoanhThuNamSauKhiTruChiPhi(@Param("yearParam") int year, @Param("monthParam") int month);


//    thông kê sản phẩm bán chạy nhất tháng
    @Query("SELECT c.id AS idCTSP, c.sanPham.tenSanPham, CONVERT(VARCHAR(100), c.hinhAnh) AS image, SUM(a.soLuong) AS tongSoLuong,c.sanPham.giaNhap,c.sanPham.giaBan " +
            "FROM HoaDonChiTiet a " +
            "JOIN  a.hoaDon  b " +
            "JOIN a.sanPhamChiTiet c " +
            "WHERE MONTH(b.ngayTao) = :selectedMonth " +
            "AND YEAR(b.ngayTao) = :selectedYear " +
            "GROUP BY c.id, CONVERT(VARCHAR(100), c.hinhAnh), c.sanPham " +
            "ORDER BY SUM(a.soLuong) DESC")
    List<Object[]> SanPhamBanChayTrongThang(@Param("selectedMonth") int selectedMonth, @Param("selectedYear") int selectedYear);//thông kê sản phẩm bán chạy nhất tháng


    //thông kê sản phẩm bán chạy nhất tháng
    @Query("SELECT c.id AS idCTSP, c.sanPham.tenSanPham, CONVERT(VARCHAR(100), c.hinhAnh) AS image, SUM(a.soLuong) AS tongSoLuong " +
            "FROM HoaDonChiTiet a " +
            "JOIN  a.hoaDon  b " +
            "JOIN a.sanPhamChiTiet c " +
            "WHERE YEAR(b.ngayTao) = :selectedYear " +
            "GROUP BY c.id, CONVERT(VARCHAR(100), c.hinhAnh), c.sanPham " +
            "ORDER BY SUM(a.soLuong) DESC")
    List<Object[]> SanPhamBanChayTrongNam(@Param("selectedYear") int selectedYear);



    //thông kê sản phẩm bán chạy nhất tháng
    @Query("SELECT c.id AS idCTSP, c.sanPham.tenSanPham, CONVERT(VARCHAR(100), c.hinhAnh) AS image, SUM(a.soLuong) AS tongSoLuong,c.sanPham.giaNhap,c.sanPham.giaBan " +
            "FROM HoaDonChiTiet a " +
            "JOIN a.hoaDon b " +
            "JOIN a.sanPhamChiTiet c " +

            "WHERE b.ngayTao >= :selectedDateStart and b.ngayTao <= :selectedDateEnd " + // Add this line for date range
            "GROUP BY c.id, CONVERT(VARCHAR(100), c.hinhAnh), c.sanPham " +
            "ORDER BY SUM(a.soLuong) DESC")
    List<Object[]> SanPhamBanChayTrongThangTrongKhoang(
                                                       @Param("selectedDateStart") LocalDateTime selectedDateStart, // Add this parameter for start date
                                                       @Param("selectedDateEnd") LocalDateTime selectedDateEnd); // Add this parameter for end date
//tru-chi-phi
    @Query("SELECT SUM((sp.giaBan - sp.giaNhap) * hdct.soLuong) AS tongLoiNhuan " +
            "FROM HoaDonChiTiet hdct " +
            "JOIN hdct.hoaDon hdt " +
            "JOIN hdct.sanPhamChiTiet sp " +
            "WHERE FUNCTION('YEAR', hdt.ngayTao) BETWEEN :startYear AND :endYear " +
            "AND FUNCTION('MONTH', hdt.ngayTao) = :monthParam")
    BigDecimal tinhTongDoanhThuNamSauKhiTruChiPhi(@Param("startYear") int startYear,
                                                  @Param("endYear") int endYear,
                                                  @Param("monthParam") int month);
}
