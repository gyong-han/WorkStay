package com.kh.springfinal.guest;

import com.kh.springfinal.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class GuestService {

    private final GuestMapper mapper;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder encoder;

    public GuestVo join(GuestVo vo) {

        log.info("BCryptPasswordEncoder: {}",encoder);
        String encodedPwd = encoder.encode(vo.getPwd());
        vo.setPwd(encodedPwd);

        log.info("암호화된 비밀번호: {}", encodedPwd);
        System.out.println("vo = " + vo);
        int result = mapper.join(vo);
        System.out.println("result = " + result);
        return vo;
    }

    public void login(GuestVo vo) {

    }

}
