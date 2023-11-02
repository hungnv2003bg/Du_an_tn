package it.lab.repository;

import it.lab.entity.NguoiDung;
import it.lab.modelcustom.NguoiDungCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NguoiDungRepo extends JpaRepository<NguoiDung, Long> {
    @Query(value = "select * from nguoidung", nativeQuery = true)
    public List<NguoiDungCustom> layDuLieu();

    public Optional<NguoiDung> findNguoiDungByEmailEquals(String email);
}
