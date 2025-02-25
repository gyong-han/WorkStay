package com.kh.springfinal.guest;

import com.kh.springfinal.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
            System.out.println("joinVo = " + joinVo);
        }catch(Exception e) {
            throw new IllegalStateException("[GUEST-JOIN] JOIN FAIL ...");
        }
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
        System.out.println("cno = " + no);
        System.out.println("creno = " + reno);
        int result = service.stayCancle(no,reno);
        System.out.println("c result = " + result);
        return result;
    }

    //공간 예약 상세 조회


    //공간 예약 취소




    //s-log 불러오기

    //북마크 불러오기


}
