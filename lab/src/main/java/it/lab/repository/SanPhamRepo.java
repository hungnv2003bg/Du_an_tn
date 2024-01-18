package it.lab.repository;

import it.lab.entity.NhomSanPham;
import it.lab.entity.SanPham;
import it.lab.entity.ThietKe;
import it.lab.modelcustom.SanPhamTheo12Thang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SanPhamRepo extends JpaRepository<SanPham, Long> {

    @Query("SELECT c.id,c.sanPham.tenSanPham, CONVERT(VARCHAR(100), c.hinhAnh) AS image, SUM(a.soLuong) AS tongSoLuong " +
            "FROM HoaDonChiTiet a " +
            "JOIN HoaDon b ON a.hoaDon.id = b.id " +
            "JOIN SanPhamChiTiet c ON a.sanPhamChiTiet.id = c.id " +
            "WHERE MONTH(b.ngayTao) = :thang " +
            "AND YEAR(b.ngayTao) = :nam " +
            "GROUP BY c.id, CONVERT(VARCHAR(100), c.hinhAnh), c.sanPham.tenSanPham " +
            "ORDER BY SUM(a.soLuong) DESC")
    List<Object[]> getSanPhamE(@Param("thang") int thang, @Param("nam") int nam);

    @Query("select s from SanPham s where s.nhomSanPham.id = :id")
    List<SanPham> getSanPhamTheoNhom(@Param("id") long id);



    //thong ke san pham
    @Query("SELECT SUM(s.soLuongLoi) FROM SanPham s")
    Long sumSoluongloi();

    @Query("SELECT SUM(s.soLuongTraHang) FROM SanPham s")
    Long sumSoTraHang();

    @Query(
            value = """
                    SELECT top 10 sp.id as sanPhamId,sum(hdct.soluong)as soLuongBan from sanphamchitiet spct
                    join hoadonchitiet hdct on spct.id = hdct.sanphamchitietid
                    join hoadon hd on hd.id = hdct.hoadonid
                    join sanpham sp on sp.id = spct.sanphamid
                    WHERE hd.trangthai in (1,9,10) and YEAR(hd.ngaytao) = :nam
                    GROUP BY sp.id
                    ORDER BY  sum(hdct.soluong) desc
                    """, nativeQuery = true
    )
    List<SanPhamTheo12Thang> laySanPham12Thang(@Param("nam") int nam);

    @Query(value = """
            select sum(hdct.soluong) from sanphamchitiet spct
            join hoadonchitiet hdct on spct.id = hdct.sanphamchitietid
            join hoadon hd on hd.id = hdct.hoadonid
            join sanpham sp on sp.id = spct.sanphamid
            WHERE hd.trangthai in (1,9,10) and MONTH(hd.ngaytao) = :thang and YEAR(hd.ngaytao) = :nam
            and sp.id = :spId
            ORDER BY  sum(hdct.soluong) desc
            """
            , nativeQuery = true
    )
    public Integer layDoanhSo(@Param("thang") int thang, @Param("spId") long spId, @Param("nam") int nam);


    @Query(
            value = """
                    SELECT  spct.id as sanPhamId,sum(hdct.soluong)as soLuongBan from sanphamchitiet spct
                                                                          join hoadonchitiet hdct on spct.id = hdct.sanphamchitietid
                                                                          join hoadon hd on hd.id = hdct.hoadonid
                                                                          join sanpham sp on sp.id = spct.sanphamid
                                                                          WHERE hd.trangthai in (1,9,10) and sp.id = :spId and YEAR(hd.ngaytao) =2023
                                                                          GROUP BY spct.id
                                                                          ORDER BY  sum(hdct.soluong) desc
                      """, nativeQuery = true
    )
    List<SanPhamTheo12Thang> layChiTietIdBySp(@Param("spId") long spId);

    public boolean existsByNhomSanPham(NhomSanPham nhomSanPham);

    public boolean existsByThietKe(ThietKe thietKe);
}
