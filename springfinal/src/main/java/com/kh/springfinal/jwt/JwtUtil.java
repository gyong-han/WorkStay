package com.kh.springfinal.jwt;

import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Component;

import java.util.Date;


@Component
public class JwtUtil {

    public String createJwtToken(String email, String role){
        return Jwts.builder()
                .claim("email" , email)
                .claim("role" , role)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + (1000*60*15)))
                .compact()
                ;
        }
    }
