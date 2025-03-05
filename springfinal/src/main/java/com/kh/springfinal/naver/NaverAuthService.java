package com.kh.springfinal.naver;

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
public class NaverAuthService {

    private final RestTemplate restTemplate;
    private final NaverMapper naverMapper;
    private static final String NAVER_USER_INFO_URL = "https://openapi.naver.com/v1/nid/me";

    public GuestVo getUserInfo(String accessToken) {
        // 네이버 API 요청
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(NAVER_USER_INFO_URL, HttpMethod.GET, entity, String.class);

        JSONObject json = new JSONObject(response.getBody());
        JSONObject responseData = json.getJSONObject("response");

        // 📌 네이버에서 받아올 필드 (name, email, nick)
        String email = responseData.optString("email", "naver_" + responseData.getString("id"));
        String name = responseData.getString("name");
        String nick = responseData.optString("nickname", name); // 닉네임 없으면 name 사용

        // DB에서 기존 회원 조회
        GuestVo vo = naverMapper.findByEmail(email);
        if (vo == null) {
            // 회원 정보가 없으면 새로 저장
            vo = new GuestVo();
            vo.setEmail(email);
            vo.setName(name);
            vo.setNick(nick);
            naverMapper.insertGuest(vo);
        }
        return vo;
    }
}
