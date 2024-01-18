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
    public boolean existsByEmailContains(String email);

    public boolean existsByEmailEquals(String email);

    public Optional<NguoiDung> findNguoiDungByEmailEquals(String email);

    @Query("SELECT a FROM NguoiDung a JOIN QuyenNguoiDung b ON b.nguoiDung.id = a.id WHERE b.quyen.id = 2 and  a.trangThai = 0")
    List<NguoiDung> getAllTangVoucher();


}
