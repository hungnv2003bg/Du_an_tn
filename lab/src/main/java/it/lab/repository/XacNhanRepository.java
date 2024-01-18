package it.lab.repository;

import it.lab.entity.XacNhan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface XacNhanRepository extends JpaRepository<XacNhan, Long> {
    public Optional<XacNhan> findXacNhanByCodeEquals(String code);
}
