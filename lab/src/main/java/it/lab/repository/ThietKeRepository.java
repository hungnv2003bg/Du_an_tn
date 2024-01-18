package it.lab.repository;

import it.lab.entity.ThietKe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ThietKeRepository extends JpaRepository<ThietKe,Long> {
    public boolean existsByTenThietKeEquals(String ten);
}
