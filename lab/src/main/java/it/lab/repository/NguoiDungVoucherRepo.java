package it.lab.repository;

import it.lab.entity.NguoiDung;
import it.lab.entity.NguoiDungVoucher;
import it.lab.entity.Voucher;
import it.lab.modelcustom.NguoiDungSoLuongVoucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NguoiDungVoucherRepo extends JpaRepository<NguoiDungVoucher, Long> {

    //    @Query("SELECT b.id, b.maNguoiDung, b.anhDaiDien, b.soDienThoai, b.email, " +
//            "STRING_AGG(CONCAT(c.tenVoucher, ' (KT: ',c.ngayKetThuc, ')',a.trangThai), ', ') " +
//            "FROM NguoiDungVoucher a " +
//            "JOIN a.nguoiDung b " +
//            "JOIN a.voucher c " +
//            "GROUP BY b.id, b.maNguoiDung, b.anhDaiDien, b.soDienThoai, b.email")
//    List<Object[]> getAllTang();
    @Query("SELECT b.id, b.maNguoiDung, b.anhDaiDien, b.soDienThoai, b.email, " +
            "STRING_AGG(CONCAT(c.tenVoucher, ' (KT: ', c.ngayKetThuc, ')', " +
            "CASE " +
            "  WHEN a.trangThai = 0 THEN ' (Status: Run)' " +
            "  WHEN a.trangThai = 2 THEN ' (Status: DaSuDung)' " +
            "  WHEN a.trangThai = 1 THEN ' (Status: Stop)' " +
            "  ELSE '' " +
            "END), ', ') " +
            "FROM NguoiDungVoucher a " +
            "JOIN a.nguoiDung b " +
            "JOIN a.voucher c " +
            "GROUP BY b.id, b.maNguoiDung, b.anhDaiDien, b.soDienThoai, b.email")
    List<Object[]> getAllTang();

    public List<NguoiDungVoucher> findNguoiDungVouchersByNguoiDung(NguoiDung ng);

    @Query(value = """
            select nguoidungid, count(*) from 
            nguoidungvoucher
            GROUP BY nguoidungid
            where voucherid = :voucherId
            """, nativeQuery = true)
    public List<NguoiDungSoLuongVoucher> getSoLuongVoucherNguoiDung(@Param("voucherId") Long voucherId);

    @Query(value = """
            select distinct nguoidungid from nguoidungvoucher where voucherid = :voucherId
                        """, nativeQuery = true)
    public List<Long> layNguoiDungCuaVoucher(@Param("voucherId") Long voucherId);

    @Query(value = """
            select distinct nguoidungid from nguoidungvoucher where voucherid = :voucherId
                        """, nativeQuery = true)
    public List<Long> laySoLuong(@Param("voucherId") Long voucherId);

    public List<NguoiDungVoucher> findNguoiDungVouchersByNguoiDungAndVoucher(NguoiDung ng, Voucher voucher);

    public List<NguoiDungVoucher> findNguoiDungVouchersByVoucher(Voucher voucher);
}
