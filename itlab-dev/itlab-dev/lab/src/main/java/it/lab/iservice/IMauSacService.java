package it.lab.iservice;

import it.lab.entity.MauSac;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IMauSacService {
    Page<MauSac> getPage(Pageable pageable);
    List<MauSac> getAll();

    public MauSac save(MauSac ms);
    public void deleteById(long id);
    public MauSac update(MauSac ms,Long id);
    public MauSac findById(long id);
}
