package com.kh.springfinal.kakao;

import com.kh.springfinal.guest.GuestVo;
import com.kh.springfinal.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/oauth")
@RequiredArgsConstructor
public class KakaoAuthController {

    private final KakaoAuthService kakaoAuthService;
    private final JwtUtil jwtUtil;

    @PostMapping("/kakao")
    public ResponseEntity<?> kakaoLogin(@RequestBody Map<String, String> request) {
        String accessToken = request.get("accessToken");

        // 카카오 API에서 사용자 정보 가져오기
        GuestVo vo = kakaoAuthService.getUserInfo(accessToken);

        String role = vo.getPageNick() != null ? vo.getPageNick() : "GUEST";
        // JWT 발급 (이메일만 저장)
        String jwtToken = jwtUtil.createJwtToken(vo.getNo(),vo.getEmail(),vo.getPageNick(),role);

        return ResponseEntity.ok(Map.of("token", jwtToken, "user", role));
    }
}
