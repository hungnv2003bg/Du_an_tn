package it.lab.repository;

import it.lab.entity.NhomSanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NhomSanPhamRepository extends JpaRepository<NhomSanPham,Long> {
    public boolean existsByTenNhomEquals(String ten);

    @Query(value = "SELECT nsp.tenthietke, COUNT(ctsp.id) AS soluongao " +
            "FROM nhomsanpham nsp " +
            "JOIN sanpham ctsp ON ctsp.nhomsanphamid = nsp.id " +
            "GROUP BY nsp.tenthietke", nativeQuery = true)
    List<Object[]> thongKeSoLuongAo();

}
