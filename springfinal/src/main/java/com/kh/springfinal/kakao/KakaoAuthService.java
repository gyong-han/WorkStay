    package com.kh.springfinal.kakao;

    import com.kh.springfinal.guest.GuestVo;
    import lombok.RequiredArgsConstructor;
    import org.json.JSONObject;
    import org.springframework.http.*;
    import org.springframework.stereotype.Service;
    import org.springframework.transaction.annotation.Transactional;
    import org.springframework.web.client.RestTemplate;

    @Service
    @RequiredArgsConstructor
    @Transactional
    public class KakaoAuthService {

        private final RestTemplate restTemplate;
        private final KakaoMapper kakaoMapper;
        private static final String KAKAO_USER_INFO_URL = "https://kapi.kakao.com/v2/user/me";

        public GuestVo getUserInfo(String accessToken) {
            // 카카오 API 요청
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + accessToken);
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<String> entity = new HttpEntity<>(headers);
            ResponseEntity<String> response = restTemplate.exchange(KAKAO_USER_INFO_URL, HttpMethod.GET, entity, String.class);

            JSONObject json = new JSONObject(response.getBody());
            String email = json.getJSONObject("kakao_account").optString("email", "kakao_" + json.get("id").toString());
            String name = json.getJSONObject("properties").getString("nickname");

            // DB에서 기존 회원 조회
            GuestVo vo = kakaoMapper.findByEmail(email);
            if (vo == null) {
                // 회원 정보가 없으면 새로 저장
                vo = new GuestVo();
                vo.setEmail(email);
                vo.setName(name);
                kakaoMapper.insertGuest(vo);
            }
            return vo;
        }
    }