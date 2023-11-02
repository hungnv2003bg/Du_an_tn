package it.lab.repository;

import it.lab.entity.DiaChi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiaChiRepo extends JpaRepository<DiaChi, Long> {
}
