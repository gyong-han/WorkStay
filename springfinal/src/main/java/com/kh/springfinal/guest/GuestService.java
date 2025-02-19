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

        String encodedPwd = encoder.encode(vo.getPwd());
        vo.setPwd(encodedPwd);

        System.out.println("vo = " + vo);
        int result = mapper.join(vo);
        System.out.println("result = " + result);
        return vo;
    }

    public String login(GuestVo vo) {
        GuestVo dbVo = mapper.loginEmail(vo);
        if (dbVo == null) {
            throw new IllegalStateException("해당 이메일이 존재하지 않습니다.");
        }
        boolean isMatch = encoder.matches(vo.getPwd(), dbVo.getPwd());
        if (!isMatch) {
            throw new IllegalStateException("비밀번호가 일치하지 않습니다.");
        }
        String token = jwtUtil.createJwtToken(dbVo.getNo(), dbVo.getEmail(), dbVo.getPageNick(),  "user_guest");
        log.info("Generated Token in Service: {}", token);
        return token;
    }

    public GuestVo findId(GuestVo vo) {
        System.out.println("Service - Received name: " + vo.getName());
        System.out.println("Service - Received phone: " + vo.getPhone());
        System.out.println("service vo = " + vo);
        return mapper.findId(vo);
    }

}
