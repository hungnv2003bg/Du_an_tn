package it.lab.repository;

import it.lab.entity.MauSac;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MauSacRepo extends JpaRepository<MauSac, Long> {
    public boolean existsByTenMauEquals(String ten);
}
