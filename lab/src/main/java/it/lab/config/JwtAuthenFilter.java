package it.lab.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
public class JwtAuthenFilter extends OncePerRequestFilter {
    @Autowired
    private JwtTokenProvider _provider;
    @Autowired
    private UserService _nguoiDung;

    public String layJwtTuRequest(HttpServletRequest request) {
        String bear = request.getHeader("Authorization");
        if (StringUtils.hasText(bear) && bear.startsWith("Bearer")) {
            return bear.substring(7);
        }
        return null;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwt = layJwtTuRequest(request);
            if (StringUtils.hasText(jwt) && _provider.validToken(jwt)) {
                String userName = _provider.layThongTinTuToken(jwt);
                UserDetails ud = _nguoiDung.loadUserByUsername(userName);
                if (ud != null) {
                    UsernamePasswordAuthenticationToken au = new UsernamePasswordAuthenticationToken(ud, null, ud.getAuthorities());
                    au.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(au);
                }
            }
        } catch (Exception ex) {
            log.warn("Lỗi filter!");
        }
        filterChain.doFilter(request, response);
    }
}
