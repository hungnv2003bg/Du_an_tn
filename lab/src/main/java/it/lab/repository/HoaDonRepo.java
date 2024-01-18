package it.lab.repository;

import it.lab.entity.HoaDon;
import it.lab.entity.NguoiDung;
import it.lab.enums.TrangThaiHoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface HoaDonRepo extends JpaRepository<HoaDon, Long> {
    public List<HoaDon> findAllByTrangThaiEquals(TrangThaiHoaDon trangThai);

    public List<HoaDon> findHoaDonsByNguoiMua(NguoiDung ng);

    public Optional<HoaDon> findHoaDonByMaHoaDon(String maHd);

    @Query(value = """
            select * FROM  hoadon hd where Year(hd.ngaygiao) = :nam and month(hd.ngaygiao) =:thang and day(hd.ngaygiao) =:ngay
            """, nativeQuery = true)
    public List<HoaDon> thongKeNgay(Integer nam, Integer thang, Integer ngay);

    @Query(value = """
            select sum(hdct.soluong* hdct.dongia) FROM hoadonchitiet hdct
            join hoadon hd on hd.id=hdct.hoadonid
            where hd.id = :hoaDonId
            """, nativeQuery = true)
    public Double tinhGiaTriHd(@Param("hoaDonId") Long hoaDonId);
}
