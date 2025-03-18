package com.kh.springfinal.payment;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class KakaoPayService {

    private static final String cid = "TC0ONETIME";  // 가맹점 코드
    private static final String adminKey = "ad1243607e457f20ace2b9ef8cb7b459";  // 카카오의 Admin Key

    public KakaoPayVo kakaoPayReady(KakaoPayReadyVo vo) {
        // 결제 준비를 위한 파라미터 설정
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("partner_order_id", "order12345");
        parameters.add("partner_user_id", "user123");
        parameters.add("item_name", vo.getName()+" / "+vo.getPackageType());
        parameters.add("quantity", "1");
        parameters.add("total_amount", vo.getPrice());  // 총 금액
        parameters.add("vat_amount", "1000");     // 부가세
        parameters.add("tax_free_amount", "0");   // 비과세 금액
        parameters.add("approval_url", "http://d34nr975ohjmz8.cloudfront.net/findspace/successbooking/"+vo.getNo()); // 성공 URL
        parameters.add("cancel_url", "http://13.124.151.196:8080/payment/cancel");   // 취소 URL
        parameters.add("fail_url", "http://13.124.151.196:8080/payment/fail");      // 실패 URL

        // HTTP 요청을 위한 HttpEntity 설정
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, getHeaders());

        // RestTemplate을 사용하여 카카오 API로 요청
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForObject(
                "https://kapi.kakao.com/v1/payment/ready", requestEntity, KakaoPayVo.class);
    }

    public KakaoPayVo kakaoPayReadyRoom(KakaoPayReadyVo vo) {
        // 결제 준비를 위한 파라미터 설정
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("partner_order_id", "order12345");
        parameters.add("partner_user_id", "user123");
        parameters.add("item_name", vo.getName());
        parameters.add("quantity", "1");
        parameters.add("total_amount", vo.getPrice());  // 총 금액
        parameters.add("vat_amount", "1000");     // 부가세
        parameters.add("tax_free_amount", "0");   // 비과세 금액
        parameters.add("approval_url", "http://d34nr975ohjmz8.cloudfront.net/findstay/successbooking/"+vo.getNo()); // 성공 URL
        parameters.add("cancel_url", "http://13.124.151.196:8080/payment/cancel");   // 취소 URL
        parameters.add("fail_url", "http://13.124.151.196:8080/payment/fail");      // 실패 URL

        // HTTP 요청을 위한 HttpEntity 설정
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, getHeaders());

        // RestTemplate을 사용하여 카카오 API로 요청
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForObject(
                "https://kapi.kakao.com/v1/payment/ready", requestEntity, KakaoPayVo.class);
    }

    private HttpHeaders getHeaders() {
        HttpHeaders headers = new HttpHeaders();
        String auth = "KakaoAK " + adminKey;
        headers.set("Access-Control-Allow-Origin", "https://t1.kakaocdn.net");
        headers.set("Authorization", auth);
        headers.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        return headers;
    }
}
