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

        int result = mapper.join(vo);
        return vo;
    }

    // 이메일 중복 체크 서비스 로직
    public boolean isEmailDuplicate(String email) {
        return mapper.checkEmail(email) > 0; // 1 이상이면 이미 존재하는 이메일
    }

    // 전화번호 중복 체크 서비스 로직
    public boolean isPhoneDuplicate(String phone) {
        return mapper.checkPhone(phone) > 0; // 1 이상이면 이미 존재하는 전화번호
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

        if (vo.getEmail() == null || vo.getEmail().isEmpty()) {
            throw new IllegalArgumentException("이메일이 null 또는 비어 있습니다!");
        }

        GuestVo dbVo = mapper.findPwd(vo);
        if (dbVo == null) {
            throw new IllegalStateException("해당 이메일이 존재하지 않습니다.");
        }
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

    public boolean verifyPassword(String email, String password) {
        GuestVo dbVo = mapper.getMemberByEmail(email);

        if (dbVo == null) {
            throw new IllegalStateException("존재하지 않는 회원입니다.");
        }

        return encoder.matches(password, dbVo.getPwd());
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
        return result;
    }


    public MypageVo spaceDetailReserve(String reno) {
        return mapper.spaceDetailReserve(reno);
    }

    public int spaceCancle(String no, String reno) {
        int result = mapper.spaceCancle(no,reno);
        return result;
    }

    public GuestVo memberQuit(GuestVo vo) {
        int result = mapper.memberQuit(vo);
        mapper.deleteSpace(vo);
        mapper.deleteStay(vo);
        return vo;
    }

    // 숙소 북마크 목록 조회
    public List<StayBookmarkVo> getStayBookmarks(int no) {
        return mapper.getStayBookmarks(no);
    }

    // 공간 북마크 목록 조회
    public List<SpaceBookmarkVo> getSpaceBookmarks(int no) {
        return mapper.getSpaceBookmarks(no);
    }

    // 북마크 추가/삭제 (숙소)
    public void toggleStayBookmark(int no, int targetNo) {
        List<StayBookmarkVo> bookmarks = mapper.checkStayBookmark(no);

        if (!bookmarks.isEmpty()) { // 북마크가 이미 있으면 삭제
            mapper.removeStayBookmark(no, targetNo);
        } else { // 없으면 추가
            mapper.addStayBookmark(no, targetNo);
        }
    }


    // 북마크 추가/삭제 (공간)
    public void toggleSpaceBookmark(int no, int targetNo) {
        List<SpaceBookmarkVo> bookmarks = mapper.checkSpaceBookmark(no);

        if (!bookmarks.isEmpty()) { // 북마크가 이미 있으면 삭제
            mapper.removeSpaceBookmark(no, targetNo);
        } else { // 없으면 추가
            mapper.addSpaceBookmark(no, targetNo);
        }
    }


    public List<SlogListVo> slogList(String memberNo) {
        return mapper.slogList(memberNo);
    }

    public int updateStay(String no, String reno) {
        int result = mapper.updateStay(no,reno);
        return result;
    }

}//class
