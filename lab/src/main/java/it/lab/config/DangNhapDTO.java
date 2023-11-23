package it.lab.config;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class DangNhapDTO {
    private String token;
    private String type="Bearer";
    private int status;
    private String userName;
    private String email;
    private List<String> roles;
}
