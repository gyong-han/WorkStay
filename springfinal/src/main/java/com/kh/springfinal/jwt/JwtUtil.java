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

    public String createJwtToken(String no , String email, String pageNick , String role){

        if (secretKey == null) {
            throw new IllegalStateException("JWT SecretKey가 null입니다!");
        }

        return Jwts.builder()
                .claim("no" , no)
                .claim("email" , email)
                .claim("pageNick" , pageNick)
                .claim("role" , role)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + (1000*60*60*24)))
                .signWith(secretKey)
                .compact()
                ;
        }
    }
