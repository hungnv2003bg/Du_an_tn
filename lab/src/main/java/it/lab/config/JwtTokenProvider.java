package it.lab.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Date;

@Component
@Slf4j
public class JwtTokenProvider {
    private String JWT_SECRET = "lab97";
    private int JWT_EXPIRATION=84000000;
    // tạo jwt từ thông tin người dùng
    public String taoToken(NguoiDungUserDetails nguoiDung){
        Date now = new Date();
        return Jwts.builder()
                .setSubject(nguoiDung.getUsername())
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime()+JWT_EXPIRATION))
                .signWith(SignatureAlgorithm.HS512,JWT_SECRET)
                .compact();
    }
    // giải mã
    public String layThongTinTuToken(String token){
        Claims claims = Jwts.parser().setSigningKey(JWT_SECRET)
                .parseClaimsJws(token)
                .getBody();
        return  claims.getSubject();
    }
    public boolean validToken(String token){
        try{
            Jwts.parser().setSigningKey(JWT_SECRET)
                    .parseClaimsJws(token);
            return true;
        }catch (Exception ex){
        //    log.error("Lỗi!");
        }
        return false;
    }
}
