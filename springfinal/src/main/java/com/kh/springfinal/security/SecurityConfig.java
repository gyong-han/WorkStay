package com.kh.springfinal.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;


@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {


        //csrf 끄기
        httpSecurity.csrf(AbstractHttpConfigurer::disable);

        //모든 요청 통과시키기
        httpSecurity.authorizeHttpRequests( auth -> auth.anyRequest().permitAll() );

        //cors 문제 해결하기
        httpSecurity.cors( corsConfig -> corsConfig.configurationSource( request -> {
            CorsConfiguration conf = new CorsConfiguration();
            conf.addAllowedOrigin("*");
            conf.addAllowedMethod("*");
            conf.addAllowedHeader("*");
            return conf;
        } ) );




        return httpSecurity.build();
    }

}
