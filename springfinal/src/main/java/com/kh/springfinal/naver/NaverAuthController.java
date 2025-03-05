package com.kh.springfinal.naver;

import com.kh.springfinal.guest.GuestVo;
import com.kh.springfinal.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/oauth")
@RequiredArgsConstructor
public class NaverAuthController {

    private final NaverAuthService naverAuthService;
    private final JwtUtil jwtUtil;

    @PostMapping("/naver")
    public ResponseEntity<?> naverLogin(@RequestBody Map<String, String> request) {
        String accessToken = request.get("accessToken");

        // 네이버 API에서 사용자 정보 가져오기
        GuestVo vo = naverAuthService.getUserInfo(accessToken);

        String role = vo.getPageNick();
        // JWT 발급 (이메일, 이름, 닉네임 포함)
        String jwtToken = jwtUtil.createJwtToken(vo.getNo(), vo.getEmail(), vo.getPageNick(), role);

        return ResponseEntity.ok(Map.of("token", jwtToken, "user", role));
    }
}