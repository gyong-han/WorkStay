package com.kh.springfinal.guest;

import com.kh.springfinal.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/guest")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin
public class GuestController {

    private final GuestService  service;
    private final JwtUtil jwtUtil;


    //회원가입
    @PostMapping("join")
    public void join(@RequestBody GuestVo vo){
        try{
            GuestVo joinVo = service.join(vo);
        }catch(Exception e) {
            throw new IllegalStateException("[GUEST-JOIN] JOIN FAIL ...");
        }
    }

    // 이메일 중복 체크
    @GetMapping("/check-email")
    public boolean checkEmail(@RequestParam String email) {
        return service.isEmailDuplicate(email);
    }

    // 전화번호 중복 체크
    @GetMapping("/check-phone")
    public boolean checkPhone(@RequestParam String phone) {
        return service.isPhoneDuplicate(phone);
    }


    //로그인
    @PostMapping("login")
    public String login(@RequestBody GuestVo vo){
        String token = service.login(vo);
        return token;
    }

    //아이디 찾기
    @PostMapping("findid")
    public GuestVo findId(@RequestBody GuestVo vo){
        try{
            GuestVo result = service.findId(vo);
            return result;
        }catch(Exception e) {
            throw new IllegalStateException("[GUEST-FINDID] FINDID FAIL ...");
        }
    }

    //비밀번호 찾기
    @PostMapping("findpwd")
    public String findPwd(@RequestBody GuestVo vo){
        try{
            String token = service.findPwd(vo);
            return token;
        }catch(Exception e) {
            throw new IllegalStateException("[GUEST-FINDPWD] FINDPWD FAIL ...");
        }
    }

    //새로운 비밀번호 생성하기
    @PostMapping("newpwd")
    public GuestVo newPwd(@RequestBody GuestVo vo){
        GuestVo result = service.newPwd(vo);
        return result;

    }

    //회원 수정하기
    @GetMapping("mypage")
    public GuestVo mypage(@RequestParam String email){
        GuestVo result = service.mypage(email);
        return result;
    }

    @PostMapping("editMember")
    public GuestVo editMember(@RequestBody GuestVo vo){
        GuestVo result = service.editMember(vo);
        return result;
    }

    //비밀번호 확인
    @PostMapping("/verify-password")
    public boolean verifyPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        return service.verifyPassword(email, password);
    }


    //숙소 예약 정보 불러오기
    @PostMapping("stayReserv")
    public List<MypageVo> stayReserv(@RequestBody MypageVo vo){
        List<MypageVo> stayReserv = service.stayReserv(vo);
        return stayReserv;
    }

    //숙소 예약 취소 불러오기
    @PostMapping("stayCancleReserv")
    public List<MypageVo> stayCancleReserv(@RequestBody MypageVo vo){
        List<MypageVo> stayCancleReserv = service.stayCancleReserv(vo);
        return stayCancleReserv;
    }

    //공간 예약 정보 불러오기
    @PostMapping("spaceReserv")
    public List<MypageVo> spaceReserv(@RequestBody MypageVo vo){
        List<MypageVo> spaceReserv = service.spaceReserv(vo);
        return spaceReserv;
    }
    //공간 예약 취소 불러오기
    @PostMapping("spaceCancleReserv")
    public List<MypageVo> spaceCancleReserv(@RequestBody MypageVo vo){
        List<MypageVo> spaceCancleReserv = service.spaceCancleReserv(vo);
        return spaceCancleReserv;
    }

    //숙소 예약 상세 조회
    @GetMapping("stayDetailReserv")
    public MypageVo stayDetailReserv(@RequestParam String reno){
        MypageVo dbVo = service.stayDetailReserv(reno);
        return dbVo;
    }

    //숙소 예약 취소
    @PostMapping("stayCancle")
    public int stayCancle(@RequestParam String no, @RequestParam String reno){
        int result = service.stayCancle(no,reno);
        return result;
    }

    //공간 예약 상세 조회
    @GetMapping("spaceDetailReserv")
    public MypageVo spaceDetailReserv(@RequestParam String reno){
        MypageVo result = service.spaceDetailReserve(reno);
        return result;
    }

    //공간 예약 취소
    @PostMapping("spaceCancle")
    public int spaceCancle(@RequestParam String no, @RequestParam String reno){
        int result = service.spaceCancle(no,reno);
        return result;
    }

    //회원 탈퇴 하기
    @PostMapping("memberQuit")
    public GuestVo memberQuit(@RequestBody GuestVo vo){
        GuestVo result = service.memberQuit(vo);
        return result;
    }


    // 북마크 조회 (숙소 + 공간)
    @GetMapping("/bookmarks/{no}")
    public Map<String, List<?>> getBookmarks(@PathVariable int no) {
        Map<String, List<?>> bookmarks = new HashMap<>();
        bookmarks.put("stays", service.getStayBookmarks(no));
        bookmarks.put("spaces", service.getSpaceBookmarks(no));
        return bookmarks;
    }

    // 북마크 추가/삭제 (숙소)
    @PostMapping("/stay/{no}/{targetNo}")
    public void toggleStayBookmark(@PathVariable int no, @PathVariable int targetNo) {
        service.toggleStayBookmark(no, targetNo);
    }

    // 북마크 추가/삭제 (공간)
    @PostMapping("/space/{no}/{targetNo}")
    public void toggleSpaceBookmark(@PathVariable int no, @PathVariable int targetNo) {
        service.toggleSpaceBookmark(no, targetNo);
    }

    //s-log 불러오기
    @GetMapping("slogList")
    public List<SlogListVo> slogList(@RequestParam String memberNo){
        List<SlogListVo> result = service.slogList(memberNo);
        return result;
    }

    //이용 확정 으로 바꾸기
    @PostMapping("updateStay")
    public int updateStay(@RequestParam String no, @RequestParam String reno){
        int result = service.updateStay(no,reno);
        return result;
    }

}
