package it.lab.dto;

import it.lab.entity.MauSac;
import it.lab.entity.NguoiDung;
import it.lab.entity.RankKhachHang;
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
public class RankKhachHangDTO {
    private Long id;
    private String maRank;
    private String tenRank;
    private Double phanTramGiam;
    private List<NguoiDung> nguoiDungList;
    private LocalDateTime ngayTao;
    private LocalDateTime ngayCapNhat;

    public static RankKhachHangDTO fromEntity(RankKhachHang entity) {
        return new RankKhachHangDTO(
                entity.getId(),
                entity.getMaRank(),
                entity.getTenRank(),
                entity.getPhanTramGiam(),
                null,
                entity.getNgayTao(),
                entity.getNgayCapNhat()

        );
    }

    public static List<RankKhachHangDTO> fromCollection(List<RankKhachHang> collection) {
        List<RankKhachHangDTO> to = new ArrayList<>();
        collection.forEach(x -> {
            to.add(fromEntity(x));
        });
        return to;
    }
}
