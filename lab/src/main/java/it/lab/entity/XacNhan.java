package it.lab.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "xacnhan")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class XacNhan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "nguoidungid")
    private Long nguoiDungId;
    @Column(name = "code")
    private String code;
    @Column(name = "type")
    //1 là quên mật khẩu 2 là xác nhận tài khoản
    private Integer type;
    @Column(name = "ngaytao")
    private LocalDateTime ngayTao;
    @Column(name = "ngayhethan")
    private LocalDateTime ngayHetHan;
}
