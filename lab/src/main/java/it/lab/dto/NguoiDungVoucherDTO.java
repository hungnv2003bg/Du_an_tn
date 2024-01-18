package it.lab.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import it.lab.entity.*;
import it.lab.enums.LoaiGiam;
import it.lab.enums.TrangThaiNguoiDungVoucher;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NguoiDungVoucherDTO {
    private Long id;
    private NguoiDung nguoiDung;
    private Voucher voucher;
    private LocalDateTime hanSuDung;
    private Double giaTriGiam;
    private TrangThaiNguoiDungVoucher trangThai;
    private List<HoaDon> giamList;

    public static NguoiDungVoucherDTO fromEntity(NguoiDungVoucher entity) {
        return new NguoiDungVoucherDTO(
                entity.getId(),
                entity.getNguoiDung(),
                entity.getVoucher(),
                entity.getHanSuDung(),
                entity.getGiaTriGiam(),
                entity.getTrangThai(),
                entity.getGiamList()
        );
    }

    public static List<NguoiDungVoucherDTO> fromCollection(List<NguoiDungVoucher> collection) {
        List<NguoiDungVoucherDTO> to = new ArrayList<>();
        collection.forEach(x -> {
            to.add(fromEntity(x));
        });
        return to;
    }
}
