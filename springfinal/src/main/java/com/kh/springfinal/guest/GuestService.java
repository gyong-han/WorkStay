package com.kh.springfinal.guest;

import com.kh.springfinal.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
        String role = dbVo.getPageNick();
        String token = jwtUtil.createJwtToken(dbVo.getNo(), dbVo.getEmail(), dbVo.getPageNick(), role);
        return token;
    }

    public GuestVo findId(GuestVo vo) {
        GuestVo dbVo = mapper.findId(vo);
        return dbVo;
    }

    public String findPwd(GuestVo vo) {
        System.out.println("service email = " + vo.getEmail());

        if (vo.getEmail() == null || vo.getEmail().isEmpty()) {
            throw new IllegalArgumentException("이메일이 null 또는 비어 있습니다!");
        }

        GuestVo dbVo = mapper.findPwd(vo);
        if (dbVo == null) {
            throw new IllegalStateException("해당 이메일이 존재하지 않습니다.");
        }
        System.out.println("dbVo email = " + dbVo.getEmail());
        String token = jwtUtil.createJwtPwdToken(dbVo.getEmail());
        return token;
    }


    public GuestVo newPwd(GuestVo vo) {
        String encodedPwd = encoder.encode(vo.getPwd());
        vo.setPwd(encodedPwd);
        int dbVo = mapper.newPwd(vo);
        String token = jwtUtil.createJwtPwdToken(vo.getEmail());
        return vo;
    }


    public GuestVo mypage(String email) {
        GuestVo dbVo = mapper.mypage(email);
        return dbVo;
    }


    public GuestVo editMember(GuestVo vo) {
        if (vo.getPwd() != null && !vo.getPwd().isEmpty()) {
            String encodedPwd = encoder.encode(vo.getPwd());
            vo.setPwd(encodedPwd);
        } else {
            vo.setPwd(null);
        }
        int result = mapper.editMember(vo);
        return vo;
    }

    public List<MypageVo> stayReserv(MypageVo vo) {
        return mapper.stayReserv(vo);
    }

    public List<MypageVo> stayCancleReserv(MypageVo vo) {
        return mapper.stayCancleReserv(vo);
    }


    public List<MypageVo> spaceReserv(MypageVo vo) {
        return mapper.spaceReserv(vo);
    }

    public List<MypageVo> spaceCancleReserv(MypageVo vo) {
        return mapper.spaceCancleReserv(vo);
    }

    public MypageVo stayDetailReserv(String reno) {
        return mapper.stayDetailReserv(reno);
    }

    public int stayCancle(String no,String reno) {
        int result = mapper.stayCancle(no,reno);
        System.out.println("s result = " + result);
        return result;
    }


    public MypageVo spaceDetailReserve(String reno) {
        return mapper.spaceDetailReserve(reno);
    }

    public int spaceCancle(String no, String reno) {
        int result = mapper.spaceCancle(no,reno);
        return result;
    }
}//class
