package it.lab.repository;

import it.lab.entity.HoaDon;
import it.lab.entity.HoaDonChiTiet;
import it.lab.entity.SanPhamChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HoaDonChiTietRepo extends JpaRepository<HoaDonChiTiet, Long> {
    public List<HoaDonChiTiet> findHoaDonChiTietsByHoaDon(HoaDon hoaDon);

    public Optional<HoaDonChiTiet> findHoaDonChiTietByHoaDonAndSanPhamChiTiet(HoaDon hoaDon, SanPhamChiTiet sanPhamChiTiet);

    @Query(value = """
            select sum(hdct.soluong*hdct.dongia) from hoadonchitiet hdct
            join hoadon hd on hd.id = hdct.hoadonid
            join sanphamchitiet spct on spct.id = hdct.sanphamchitietid
            join sanpham sp on sp.id = spct.sanphamid
            where sp.id = :sanPhamId and YEAR(hd.ngaytao) = :nam and MONTH(hd.ngaytao) = :thang and hd.trangthai in (1,8)
            """, nativeQuery = true)
    public Long doanhThuThangCuaSanPham(@Param("sanPhamId") Long sanPhamId, @Param("nam") Long nam, @Param("thang") Integer thang);

    @Query(value = """
            select sum(hdct.soluong) from hoadonchitiet hdct
            join hoadon hd on hd.id = hdct.hoadonid
            join sanphamchitiet spct on spct.id = hdct.sanphamchitietid
            join sanpham sp on sp.id = spct.sanphamid
            where sp.id = :sanPhamId and YEAR(hd.ngaytao) = :nam and MONTH(hd.ngaytao) = :thang and hd.trangthai in (1,9,10)
            """, nativeQuery = true)
    public Long doanhSoThangCuaSanPham(@Param("sanPhamId") Long sanPhamId, @Param("nam") Long nam, @Param("thang") Integer thang);
}
