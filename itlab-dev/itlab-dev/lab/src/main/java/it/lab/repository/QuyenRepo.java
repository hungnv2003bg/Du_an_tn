package it.lab.repository;

import it.lab.entity.Quyen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuyenRepo extends JpaRepository<Quyen, Long> {
    @Query("""
           from Quyen q join QuyenNguoiDung qnd on q.id = qnd.quyen.id where qnd.nguoiDung.id = :nguoiDungId
            """)
     List<Quyen> getAllQuyen(Long nguoiDungId);
}
