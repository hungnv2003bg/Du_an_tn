package it.lab.service;

import it.lab.common.Page;
import it.lab.common.ResponObject;
import it.lab.dto.SanPhamDTO;
import it.lab.entity.SanPham;
import it.lab.iservice.ISanPhamService;
import it.lab.repository.SanPhamRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SanPhamService implements ISanPhamService {
    @Autowired
    private SanPhamRepo _sanPhamRepository;


    @Override
    public Page<SanPhamDTO> phanTrangSanPhamTrangChu(Integer page,
                                                     Integer pageSize,
                                                     Long chatLieuId,
                                                     Long thietKeId,
                                                     Long thuongHieuId,
                                                     Long mauSacId,
                                                     Long loaiSanPhamId,
                                                     Long kichThuocId) {
        List<SanPham> list = _sanPhamRepository.findAll();
        if (thietKeId != null) {
            list = list.stream().filter(x -> x.getThietKe().getId() == thietKeId).toList();
        }
        if (chatLieuId != null) {
            list = list.stream().filter(x -> x.getChatLieu().getId() == chatLieuId).toList();
        }
        if (loaiSanPhamId != null) {
            list = list.stream().filter(x -> x.getNhomSanPham().getId() == loaiSanPhamId).toList();
        }
        if (thuongHieuId != null) {
            list = list.stream().filter(x -> x.getBrand().getId() == thuongHieuId).toList();
        }
        if (mauSacId != null) {
            list = list.stream().filter(x -> x.getSanPhamChiTietList().stream().anyMatch(y -> y.getMauSac().getId() == mauSacId)).toList();
        }
        if (kichThuocId != null) {
            list = list.stream().filter(x -> x.getSanPhamChiTietList().stream().anyMatch(y -> y.getKichThuoc().getId() == kichThuocId)).toList();
        }
        return new Page<SanPhamDTO>(SanPhamDTO.fromCollection(list), page, pageSize);
    }

    @Override
    public SanPhamDTO chiTietSanPham(Long sanPhamId) {
        Optional<SanPham> sp = _sanPhamRepository.findById(sanPhamId);
        if (sp.isEmpty()) {
            return null;
        }
        return SanPhamDTO.fromEntity(sp.get());
    }

//Hưng Nguyễn
    public List<SanPham> getAll(){
    return _sanPhamRepository.findAll();
    }

    public SanPham add(SanPham sp){
        return _sanPhamRepository.save(sp);
    }

    public SanPham update(SanPham sanPham, Long id){
        Optional<SanPham> sp1 =_sanPhamRepository.findById(id);
        if(sp1.isPresent()){
            SanPham sp =sp1.get();
            sp.setMaSanPham(sanPham.getMaSanPham());
            sp.setTenSanPham(sanPham.getTenSanPham());
            sp.setHinhAnh1(sanPham.getHinhAnh1());
            sp.setHinhAnh2(sanPham.getHinhAnh2());
            sp.setGiaNhap(sanPham.getGiaNhap());
            sp.setGiaBan(sanPham.getGiaBan());
            return _sanPhamRepository.save(sp);
        }
        else {
            throw new RuntimeException("Không có san pham");
        }
    }
}
