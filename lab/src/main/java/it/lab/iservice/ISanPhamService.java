package it.lab.iservice;

import it.lab.common.Page;
import it.lab.common.ResponObject;
import it.lab.dto.*;
import it.lab.entity.*;
import it.lab.enums.APIStatus;
import it.lab.modelcustom.request.FilterSanPham;
import it.lab.modelcustom.request.SanPhamChiTietRequest;
import it.lab.modelcustom.request.SanPhamRequest;
import it.lab.modelcustom.respon.FullThuocTinh;
import it.lab.modelcustom.respon.SanPhamChiTiet;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ISanPhamService {
    SanPham findById(Long id);

    public Page<SanPhamDTO> phanTrangSanPhamTrangChu(Integer page, Integer pageSize, Long chatLieuId, Long thietKeId, Long thuongHieuId, Long mauSacId, Long loaiSanPhamId, Long kichThuocId, String keyWord);

    public Page<SanPhamDTO> phanTrangSanPhamTrangChu(Integer page, Integer pageSize, FilterSanPham filterSanPham);

    public SanPhamChiTiet chiTietSanPham(Long sanPhamId);

    public Page<ChatLieuDTO> layHetChatLieu();

    public Page<ChatLieuDTO> xoaChatLieu(Long chatLieuId);

    public Page<ChatLieuDTO> suaChatLieu(ChatLieu chatLieu);

    public Page<ChatLieuDTO> themChatLieu(ChatLieu chatLieu);

    public Page<NhomSanPhamDTO> layHetNhomSanPham();

    public Page<NhomSanPhamDTO> xoaNhomSanPham(Long nhomSanPhamId);

    public Page<NhomSanPhamDTO> suaNhomSanPham(NhomSanPham nhomSanPham);

    public Page<NhomSanPhamDTO> themNhomSanPham(NhomSanPham nhomSanPham);

    public NhomSanPhamDTO layNhomSanPhamById(Long nhomSanPhamId);

    public FullThuocTinh layHetThuocTinh();

    public ChatLieuDTO layChatLieuById(Long chatLieuId);

    public Page<ThietKeDTO> layHetThietKe();

    public Page<ThietKeDTO> xoaThietKe(Long thietKeId);

    public Page<ThietKeDTO> suaThietKe(ThietKe thietKe);

    public Page<ThietKeDTO> themThietKe(ThietKe thietKe);

    public ThietKeDTO layThietKeById(Long thietKeId);

    public Page<MauSacDTO> layHetMauSac();

    public Page<MauSacDTO> xoaMauSac(Long mauSacId);

    public Page<MauSacDTO> suaMauSac(MauSac mauSac);

    public Page<MauSacDTO> themMauSac(MauSac mauSac);

    public MauSacDTO layMauSacById(Long mauSacId);

    public Page<KichThuocDTO> layHetKichThuoc();

    public Page<KichThuocDTO> xoaKichThuoc(Long kichThuocId);

    public Page<KichThuocDTO> suaKichThuoc(KichThuoc kichThuoc);

    public Page<KichThuocDTO> themKichThuoc(KichThuoc kichThuoc);

    public KichThuocDTO layKichThuocById(Long kichThuocId);

    public Page<SanPhamChiTietDTO> layHetSanPhamChiTiet();

    public Page<SanPhamChiTietDTO> xoaSanPhamChiTiet(Long sanPhamChiTietId);

    public Page<SanPhamChiTietDTO> suaSanPhamChiTiet(SanPhamChiTietRequest sanPhamChiTiet);

    public Page<SanPhamChiTietDTO> themSanPhamChiTiet(SanPhamChiTietRequest sanPhamChiTiet);

    public Page<SanPhamDTO> layHetSanPham();

    public SanPhamChiTietDTO laySanPhamChiTietById(Long sanPhamChiTietId);

    public SanPhamChiTietDTO laySanPhamChiTietByMaSp(String maSp);

    public Page<SanPhamChiTietDTO> laySanPhamChiTietCuaSanPham(Long sanPhamId);

    public ResponObject<String, APIStatus> themSanPham(SanPhamRequest sanPham, MultipartFile hinh1, MultipartFile hinh2) throws IOException;

    public SanPhamDTO laySanPhamById(Long sanPhamId);

    public List<NhomSanPham> getAll();

    Page<SanPhamDTO> capNhatSanPham(SanPhamRequest sanPhamRequest, MultipartFile multipartFile, MultipartFile multipartFile1) throws IOException;
}
