package it.lab.repository;

import it.lab.entity.ThietKe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThietKeRepository extends JpaRepository<ThietKe,Long> {
}
