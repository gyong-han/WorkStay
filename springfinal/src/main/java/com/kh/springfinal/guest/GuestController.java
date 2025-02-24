package com.kh.springfinal.guest;

import com.kh.springfinal.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

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
        try{
            String token = service.login(vo);
            return token;
        }catch(Exception e) {
            throw new IllegalStateException("[GUEST-LOGIN] EMAIL-LOGIN FAIL ...");
        }
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


    //숙소 예약정보 불러오기

    //공간 예약 정보 불러오기

    //s-log 불러오기

    //북마크 불러오기


}
