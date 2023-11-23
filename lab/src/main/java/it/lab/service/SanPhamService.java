package it.lab.service;

import it.lab.common.CloudinaryUpload;
import it.lab.common.Page;
import it.lab.common.ResponObject;
import it.lab.dto.*;
import it.lab.entity.*;
import it.lab.enums.APIStatus;
import it.lab.enums.TrangThaiSanPham;
import it.lab.enums.TrangThaiSanPhamChiTiet;
import it.lab.iservice.ISanPhamService;
import it.lab.modelcustom.request.SanPhamChiTietRequest;
import it.lab.modelcustom.request.SanPhamRequest;
import it.lab.modelcustom.respon.FullThuocTinh;
import it.lab.modelcustom.respon.SanPhamChiTiet;
import it.lab.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SanPhamService implements ISanPhamService {
    @Autowired
    private SanPhamRepo _sanPhamRepository;
    @Autowired
    private SanPhamChiTietRepo _sanPhamChiTietRepository;
    @Autowired
    private MauSacRepo _mauSacRepo;
    @Autowired
    private ThietKeRepository _thietKeRepo;
    @Autowired
    private ChatLieuRepository _chatLieuRepo;
    @Autowired
    private NhomSanPhamRepository _nhomSanPhamRepo;
    @Autowired
    private KichThuocRepo _kichThuocRepo;
    @Autowired
    private HinhAnhSanPhamRepository _hinhAnhSanPhamRepo;

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
        if (list.size() > 0) {
            list.sort(Comparator.comparing(SanPham::getNgayTao).reversed());
        }
        list = list.stream().filter(x -> x.getTrangThai() == TrangThaiSanPham.DANGBAN).collect(Collectors.toList());
        if (thietKeId != null) {
            list = list.stream().filter(x -> x.getThietKe().getId() == thietKeId).collect(Collectors.toList());
        }
        if (chatLieuId != null) {
            list = list.stream().filter(x -> x.getChatLieu().getId() == chatLieuId).collect(Collectors.toList());
        }
        if (loaiSanPhamId != null) {
            list = list.stream().filter(x -> x.getNhomSanPham().getId() == loaiSanPhamId).collect(Collectors.toList());
        }
        if (mauSacId != null) {
            list = list.stream().filter(x -> x.getSanPhamChiTietList().stream().anyMatch(y -> y.getMauSac().getId() == mauSacId)).collect(Collectors.toList());
        }
        if (kichThuocId != null) {
            list = list.stream().filter(x -> x.getSanPhamChiTietList().stream().anyMatch(y -> y.getKichThuoc().getId() == kichThuocId)).collect(Collectors.toList());
        }
        return new Page<SanPhamDTO>(SanPhamDTO.fromCollection(list), page, pageSize);
    }

    @Override
    public SanPhamChiTiet chiTietSanPham(Long sanPhamId) {
        Optional<SanPham> sp = _sanPhamRepository.findById(sanPhamId);
        if (sp.isEmpty()) {
            return null;
        }
        return new SanPhamChiTiet(SanPhamDTO.fromEntity(sp.get()), SanPhamChiTietDTO.fromCollection(_sanPhamChiTietRepository.findSanPhamChiTietsBySanPham(sp.get())));
    }

    @Override
    public SanPham findById(long id) {
        return _sanPhamRepository.findById(id).orElse(null);
    }

    @Override
    public Page<ChatLieuDTO> layHetChatLieu() {
        return new Page<ChatLieuDTO>(ChatLieuDTO.fromCollection(_chatLieuRepo.findAll()), 0, 10000);
    }

    @Override
    public Page<ChatLieuDTO> xoaChatLieu(Long chatLieuId) {
        _chatLieuRepo.deleteById(chatLieuId);
        return layHetChatLieu();
    }

    @Override
    public Page<ChatLieuDTO> suaChatLieu(ChatLieu chatLieu) {
        ChatLieu chatLieuGoc = _chatLieuRepo.findById(chatLieu.getId()).get();
        chatLieuGoc.setTenChatLieu(chatLieu.getTenChatLieu());
        chatLieuGoc.setNgayCapNhat(LocalDate.now());
        _chatLieuRepo.save(chatLieuGoc);
        return layHetChatLieu();
    }

    @Override
    public Page<ChatLieuDTO> themChatLieu(ChatLieu chatLieu) {
        chatLieu.setNgayTao(LocalDate.now());
        _chatLieuRepo.save(chatLieu);
        chatLieu.setMaChatLieu("CL" + chatLieu.getId());
        _chatLieuRepo.save(chatLieu);
        return layHetChatLieu();
    }

    @Override
    public Page<NhomSanPhamDTO> layHetNhomSanPham() {
        return new Page<NhomSanPhamDTO>(NhomSanPhamDTO.fromCollection(_nhomSanPhamRepo.findAll()), 0, 10000);
    }

    @Override
    public Page<NhomSanPhamDTO> xoaNhomSanPham(Long nhomSanPhamId) {
        _nhomSanPhamRepo.deleteById(nhomSanPhamId);
        return layHetNhomSanPham();
    }

    @Override
    public Page<NhomSanPhamDTO> suaNhomSanPham(NhomSanPham nhomSanPham) {
        NhomSanPham nhomSanPhamGoc = _nhomSanPhamRepo.findById(nhomSanPham.getId()).get();
        nhomSanPhamGoc.setTenNhom(nhomSanPham.getTenNhom());
        nhomSanPhamGoc.setNgayCapNhat(LocalDate.now());
        _nhomSanPhamRepo.save(nhomSanPhamGoc);
        return layHetNhomSanPham();
    }

    @Override
    public Page<NhomSanPhamDTO> themNhomSanPham(NhomSanPham nhomSanPham) {
        nhomSanPham.setNgayTao(LocalDate.now());
        _nhomSanPhamRepo.save(nhomSanPham);
        nhomSanPham.setMaNhom("NSP" + nhomSanPham.getId());
        _nhomSanPhamRepo.save(nhomSanPham);
        return layHetNhomSanPham();
    }

    @Override
    public NhomSanPhamDTO layNhomSanPhamById(Long nhomSanPhamId) {
        return NhomSanPhamDTO.fromEntity(_nhomSanPhamRepo.findById(nhomSanPhamId).get());
    }

    @Override
    public FullThuocTinh layHetThuocTinh() {
        return new FullThuocTinh(_mauSacRepo.findAll(), _nhomSanPhamRepo.findAll(), _chatLieuRepo.findAll(), _thietKeRepo.findAll(), _kichThuocRepo.findAll());
    }

    @Override
    public ChatLieuDTO layChatLieuById(Long chatLieuId) {
        return ChatLieuDTO.fromEntity(_chatLieuRepo.findById(chatLieuId).get());
    }

    @Override
    public Page<ThietKeDTO> layHetThietKe() {
        return new Page<ThietKeDTO>(ThietKeDTO.fromCollection(_thietKeRepo.findAll()), 0, 10000);
    }

    @Override
    public Page<ThietKeDTO> xoaThietKe(Long thietKeId) {
        _thietKeRepo.deleteById(thietKeId);
        return layHetThietKe();
    }

    @Override
    public Page<ThietKeDTO> suaThietKe(ThietKe thietKe) {
        ThietKe thietKeGoc = _thietKeRepo.findById(thietKe.getId()).get();
        thietKeGoc.setTenThietKe(thietKe.getTenThietKe());
        thietKeGoc.setNgayCapNhat(LocalDate.now());
        _thietKeRepo.save(thietKeGoc);
        return layHetThietKe();
    }

    @Override
    public Page<ThietKeDTO> themThietKe(ThietKe thietKe) {
        thietKe.setNgayTao(LocalDate.now());
        _thietKeRepo.save(thietKe);
        thietKe.setMaThietKe("TK" + thietKe.getId());
        _thietKeRepo.save(thietKe);
        return layHetThietKe();
    }

    @Override
    public ThietKeDTO layThietKeById(Long thietKeId) {
        return ThietKeDTO.fromEntity(_thietKeRepo.findById(thietKeId).get());
    }

    @Override
    public Page<MauSacDTO> layHetMauSac() {
        return new Page<MauSacDTO>(MauSacDTO.fromCollection(_mauSacRepo.findAll()), 0, 10000);
    }

    @Override
    public Page<MauSacDTO> xoaMauSac(Long mauSacId) {
        _mauSacRepo.deleteById(mauSacId);
        return layHetMauSac();
    }

    @Override
    public Page<MauSacDTO> suaMauSac(MauSac mauSac) {
        MauSac mauSacGoc = _mauSacRepo.findById(mauSac.getId()).get();
        mauSacGoc.setTenMau(mauSac.getTenMau());
        mauSacGoc.setMaMauCss(mauSac.getMaMauCss());
        mauSacGoc.setNgayCapNhat(LocalDate.now());
        _mauSacRepo.save(mauSacGoc);
        return layHetMauSac();
    }

    @Override
    public Page<MauSacDTO> themMauSac(MauSac mauSac) {
        mauSac.setNgayTao(LocalDate.now());
        _mauSacRepo.save(mauSac);
        mauSac.setMaMau("MS" + mauSac.getId());
        _mauSacRepo.save(mauSac);
        return layHetMauSac();
    }

    @Override
    public MauSacDTO layMauSacById(Long mauSacId) {
        return MauSacDTO.fromEntity(_mauSacRepo.findById(mauSacId).get());
    }

    @Override
    public Page<KichThuocDTO> layHetKichThuoc() {
        return new Page<KichThuocDTO>(KichThuocDTO.fromCollection(_kichThuocRepo.findAll()), 0, 10000);
    }

    @Override
    public Page<KichThuocDTO> xoaKichThuoc(Long kichThuocId) {
        _kichThuocRepo.deleteById(kichThuocId);
        return layHetKichThuoc();
    }

    @Override
    public Page<KichThuocDTO> suaKichThuoc(KichThuoc kichThuoc) {
        KichThuoc kichThuocGoc = _kichThuocRepo.findById(kichThuoc.getId()).get();
        kichThuocGoc.setTenKichThuoc(kichThuoc.getTenKichThuoc());
        kichThuocGoc.setNgayCapNhat(LocalDate.now());
        _kichThuocRepo.save(kichThuocGoc);
        return layHetKichThuoc();
    }

    @Override
    public Page<KichThuocDTO> themKichThuoc(KichThuoc kichThuoc) {
        kichThuoc.setNgayTao(LocalDate.now());
        _kichThuocRepo.save(kichThuoc);
        kichThuoc.setMaKichThuoc("MKT" + kichThuoc.getId());
        _kichThuocRepo.save(kichThuoc);
        return layHetKichThuoc();
    }

    @Override
    public KichThuocDTO layKichThuocById(Long kichThuocId) {
        return KichThuocDTO.fromEntity(_kichThuocRepo.findById(kichThuocId).get());
    }

    @Override
    public Page<SanPhamChiTietDTO> layHetSanPhamChiTiet() {
        return new Page<SanPhamChiTietDTO>(SanPhamChiTietDTO.fromCollection(_sanPhamChiTietRepository.findAll()), 0, 10000);
    }

    @Override
    public Page<SanPhamChiTietDTO> xoaSanPhamChiTiet(Long sanPhamChiTietId) {
        try {
            _sanPhamChiTietRepository.deleteById(sanPhamChiTietId);
            return layHetSanPhamChiTiet();
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Page<SanPhamChiTietDTO> suaSanPhamChiTiet(SanPhamChiTietRequest sanPhamChiTiet) {
        it.lab.entity.SanPhamChiTiet spct = _sanPhamChiTietRepository.findById(sanPhamChiTiet.getId()).get();
        if (spct.getKichThuoc().getId() == sanPhamChiTiet.getKichThuocId() && spct.getMauSac().getId() == sanPhamChiTiet.getMauSacId()) {

        } else {
            if (isSanPhamChiTietDaTonTai(sanPhamChiTiet).size() == 1) {
                return new Page<SanPhamChiTietDTO>(null, 0, 10000);
            }
        }
        it.lab.entity.SanPhamChiTiet sanPhamThayDoi = _sanPhamChiTietRepository.findById(sanPhamChiTiet.getId()).get();
        sanPhamThayDoi.setSoLuongTon(sanPhamChiTiet.getSoLuongTon());
        sanPhamThayDoi.setGiaNhap(sanPhamChiTiet.getGiaNhap());
        sanPhamThayDoi.setGiaBan(sanPhamThayDoi.getGiaBan());
        sanPhamThayDoi.setTrangThai(sanPhamChiTiet.getTrangThai());
        sanPhamThayDoi.setNgayCapNhat(LocalDate.now());
        sanPhamThayDoi.setSoLuongDaBan(sanPhamChiTiet.getSoLuongDaBan());
        sanPhamThayDoi.setSoLuongLoi(sanPhamChiTiet.getSoLuongLoi());
        sanPhamThayDoi.setSoLuongTraHang(sanPhamChiTiet.getSoLuongTraHang());
        sanPhamThayDoi.setKichThuoc(_kichThuocRepo.findById(sanPhamChiTiet.getKichThuocId()).get());
        sanPhamThayDoi.setMauSac(_mauSacRepo.findById(sanPhamChiTiet.getMauSacId()).get());
        _sanPhamChiTietRepository.save(sanPhamThayDoi);
        return laySanPhamChiTietCuaSanPham(sanPhamChiTiet.getSanPhamId());
    }

    private List<it.lab.entity.SanPhamChiTiet> isSanPhamChiTietDaTonTai(SanPhamChiTietRequest sanPhamChiTiet) {
        MauSac mauSac = _mauSacRepo.findById(sanPhamChiTiet.getMauSacId()).get();
        KichThuoc kichThuoc = _kichThuocRepo.findById(sanPhamChiTiet.getKichThuocId()).get();
        SanPham sanPham = _sanPhamRepository.findById(sanPhamChiTiet.getSanPhamId()).get();
        List<it.lab.entity.SanPhamChiTiet> sanPhamChiTietGoc = _sanPhamChiTietRepository.findSanPhamChiTietsByMauSacAndKichThuocAndSanPham(mauSac, kichThuoc, sanPham);
        return sanPhamChiTietGoc;
    }

    @Override
    public Page<SanPhamChiTietDTO> themSanPhamChiTiet(SanPhamChiTietRequest sanPhamChiTiet) {
        if (isSanPhamChiTietDaTonTai(sanPhamChiTiet).size() != 0) {
            return new Page<SanPhamChiTietDTO>(null, 0, 10000);
        }
        SanPham sanPham = _sanPhamRepository.findById(sanPhamChiTiet.getSanPhamId()).get();
        it.lab.entity.SanPhamChiTiet sanPhamMoi = new it.lab.entity.SanPhamChiTiet();
        sanPhamMoi.setSanPham(_sanPhamRepository.findById(sanPhamChiTiet.getSanPhamId()).get());
        sanPhamMoi.setMauSac(_mauSacRepo.findById(sanPhamChiTiet.getMauSacId()).get());
        sanPhamMoi.setKichThuoc(_kichThuocRepo.findById(sanPhamChiTiet.getKichThuocId()).get());
        sanPhamMoi.setGiaBan(sanPham.getGiaBan());
        sanPhamMoi.setGiaNhap(sanPham.getGiaNhap());
        sanPhamMoi.setTrangThai(TrangThaiSanPhamChiTiet.CONHANG);
        sanPhamMoi.setSoLuongTon(sanPhamChiTiet.getSoLuongTon());
        sanPhamMoi.setSoLuongLoi(0);
        sanPhamMoi.setSoLuongDaBan(0);
        sanPhamMoi.setSoLuongTraHang(0);
        sanPhamMoi.setHinhAnh(sanPham.getHinhAnh1());
        sanPhamMoi.setNgayTao(LocalDate.now());
        _sanPhamChiTietRepository.save(sanPhamMoi);
        return laySanPhamChiTietCuaSanPham(sanPham.getId());
    }

    @Override
    public Page<SanPhamDTO> layHetSanPham() {
        return new Page<SanPhamDTO>(SanPhamDTO.fromCollection(_sanPhamRepository.findAll()), 0, 10000);
    }

    @Override
    public SanPhamChiTietDTO laySanPhamChiTietById(Long sanPhamChiTietId) {
        return SanPhamChiTietDTO.fromEntity(_sanPhamChiTietRepository.findById(sanPhamChiTietId).get());
    }

    @Override
    public SanPhamDTO laySanPhamById(Long sanPhamId) {
        return SanPhamDTO.fromEntity(_sanPhamRepository.findById(sanPhamId).get());
    }

    @Override
    public Page<SanPhamChiTietDTO> laySanPhamChiTietCuaSanPham(Long sanPhamId) {
        return new Page<SanPhamChiTietDTO>(SanPhamChiTietDTO.fromCollection(_sanPhamChiTietRepository.findAll().stream().filter(x -> x.getSanPham().getId() == sanPhamId).collect(Collectors.toList())), 0, 1000);

    }

    @Override
    public ResponObject<String, APIStatus> themSanPham(SanPhamRequest sanPhamRequest, MultipartFile hinh1, MultipartFile hinh2) throws IOException {
        SanPham sanPham = new SanPham();
        sanPham.setNgayTao(LocalDate.now());
        sanPham.setGiaBan(sanPhamRequest.getGiaBan());
        sanPham.setSoLuongTon(sanPhamRequest.getSoLuongTon());
        sanPham.setTrangThai(TrangThaiSanPham.DANGBAN);
        sanPham.setTenSanPham(sanPhamRequest.getTenSanPham());
        sanPham.setGiaNhap(sanPhamRequest.getGiaNhap());
        sanPham.setNhomSanPham(_nhomSanPhamRepo.findById(sanPhamRequest.getNhomSanPhamId()).get());
        sanPham.setChatLieu(_chatLieuRepo.findById(sanPhamRequest.getChatLieuId()).get());
        sanPham.setThietKe(_thietKeRepo.findById(sanPhamRequest.getThietKeId()).get());
        sanPham.setHinhAnh1(CloudinaryUpload.uploadFile(hinh1));
        sanPham.setHinhAnh2(CloudinaryUpload.uploadFile(hinh2));
        HinhAnhSanPham hinhAnh1 = new HinhAnhSanPham();
        hinhAnh1.setLinkHinhAnh(sanPham.getHinhAnh1());
        hinhAnh1.setSanPham(sanPham);
        hinhAnh1.setNgayTao(LocalDate.now());
        HinhAnhSanPham hinhAnh2 = new HinhAnhSanPham();
        hinhAnh2.setLinkHinhAnh(sanPham.getHinhAnh2());
        hinhAnh2.setSanPham(sanPham);
        hinhAnh2.setNgayTao(LocalDate.now());
        _sanPhamRepository.save(sanPham);
        _hinhAnhSanPhamRepo.save(hinhAnh1);
        _hinhAnhSanPhamRepo.save(hinhAnh2);
        sanPham.setMaSanPham("SP" + sanPham.getId());
        _sanPhamRepository.save(sanPham);
        return new ResponObject<String, APIStatus>("Thành công", APIStatus.THANHCONG, "Thành công");
    }


    @Override
    public SanPham findById(Long id) {
        return _sanPhamRepository.findById(id).orElse(null);
    }
    @Override
    public Page<SanPhamDTO> suaSanPham(SanPhamRequest sanPham) {
        it.lab.entity.SanPham sp = _sanPhamRepository.findById(sanPham.getId()).get();
        if (sp.getThietKe().getId() == sanPham.getThietKeId() && sp.getNhomSanPham().getId() == sanPham.getNhomSanPhamId() && sp.getChatLieu().getId()==sanPham.getChatLieuId()) {

        } else {
            if (isSanPhamDaTonTai(sanPham).size() == 1) {
                return new Page<SanPhamDTO>(null, 0, 10000);
            }
        }
        it.lab.entity.SanPham sanPhamThayDoi = _sanPhamRepository.findById(sanPham.getId()).get();
        sanPhamThayDoi.setTenSanPham(sanPham.getTenSanPham());
        sanPhamThayDoi.setGiaNhap(sanPham.getGiaNhap());
        sanPhamThayDoi.setGiaBan(sanPham.getGiaBan());
        sanPhamThayDoi.setMoTa(sanPham.getMoTa());
        sanPhamThayDoi.setNgayCapNhat(LocalDate.now());
        sanPhamThayDoi.setSoLuongTon(sanPham.getSoLuongTon());
        sanPhamThayDoi.setSoLuongLoi(sanPham.getSoLuongLoi());
        sanPhamThayDoi.setSoLuongTraHang(sanPham.getSoLuongTraHang());
        sanPhamThayDoi.setNhomSanPham(_nhomSanPhamRepo.findById(sanPham.getNhomSanPhamId()).get());
        sanPhamThayDoi.setThietKe(_thietKeRepo.findById(sanPham.getThietKeId()).get());
        sanPhamThayDoi.setChatLieu(_chatLieuRepo.findById(sanPham.getChatLieuId()).get());
        _sanPhamRepository.save(sanPhamThayDoi);
        return layHetSanPham();
    }

    private List<it.lab.entity.SanPham> isSanPhamDaTonTai(SanPhamRequest sanPham) {
        ChatLieu chatLieu = _chatLieuRepo.findById(sanPham.getChatLieuId()).get();
        NhomSanPham nhomSanPham = _nhomSanPhamRepo.findById(sanPham.getNhomSanPhamId()).get();
        ThietKe thietKe = _thietKeRepo.findById(sanPham.getThietKeId()).get();
        List<it.lab.entity.SanPham> sanPhamGoc = _sanPhamRepository.findSanPhamsByThietKeAndNhomSanPhamAndChatLieu(thietKe, nhomSanPham, chatLieu);
        return sanPhamGoc;
    }

}
