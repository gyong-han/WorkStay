package com.kh.springfinal.guest;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class GuestService {

    private final GuestMapper mapper;
//    private final BCryptPasswordEncoder encoder;

    public void join(GuestVo vo) {
//        String encodedPwd = encoder.encode(vo.getPwd());
//        vo.setPwd(encodedPwd);
        mapper.join(vo);
    }
}
