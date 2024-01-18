package it.lab.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import it.lab.entity.NguoiDung;
import it.lab.entity.NguoiDungVoucher;
import it.lab.entity.SanPhamYeuThich;
import it.lab.entity.Voucher;
import it.lab.enums.TrangThaiVoucher;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class VoucherDTO {
    private Long id;
    private String maVoucher;
    private String tenVoucher;
    private Double giaTriGiam;
    private LocalDateTime ngayTao;
    private LocalDateTime ngayCapNhat;
    private LocalDateTime ngayKetThuc;
    private Integer soLuong;
    private TrangThaiVoucher trangThai;
    private List<NguoiDungVoucher> nguoiDungVoucherList;

    public static VoucherDTO fromEntity(Voucher entity) {
        return new VoucherDTO(
                entity.getId(),
                entity.getMaVoucher(),
                entity.getTenVoucher(),
                entity.getGiaTriGiam(),
                entity.getNgayTao(),
                entity.getNgayCapNhat(),
                entity.getNgayKetThuc(),
                entity.getSoLuong(),
                entity.getTrangThai(),
                entity.getNguoiDungVoucherList()
        );
    }

    public Voucher toEntity() {
        return new Voucher(
                this.getId(),
                this.getMaVoucher(),
                this.getTenVoucher(),
                this.getGiaTriGiam(),
                this.getNgayTao(),
                this.getNgayCapNhat(),
                this.getNgayKetThuc(),
                this.getSoLuong(),
                this.getTrangThai(),
                this.getNguoiDungVoucherList()
        );
    }

    public static List<VoucherDTO> fromCollection(List<Voucher> collection) {
        List<VoucherDTO> to = new ArrayList<>();
        collection.forEach(x -> {
            to.add(fromEntity(x));
        });
        return to;
    }
}
