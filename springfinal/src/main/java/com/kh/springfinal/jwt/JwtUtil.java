package com.kh.springfinal.jwt;

import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;


@Component
public class JwtUtil {

    private SecretKey secretKey;

    public JwtUtil(@Value("${kh.jwt.secret}") String str) {
        byte[] bytes = str.getBytes(StandardCharsets.UTF_8);
        this.secretKey = new SecretKeySpec(bytes , "HmacSHA256");
    }

    public String createJwtToken(String email, String role){
        return Jwts.builder()
                .claim("email" , email)
                .claim("role" , role)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + (1000*60*15)))
                .signWith(secretKey)
                .compact()
                ;
        }
    }
