package com.kh.springfinal.payment;

import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/payment")
public class KakaoPayController {

    private final KakaoPayService kakaoPayService;

    public KakaoPayController(KakaoPayService kakaoPayService) {
        this.kakaoPayService = kakaoPayService;
    }

    @PostMapping("/ready")
    public KakaoPayVo readyToKakaoPay(@RequestBody  KakaoPayReadyVo vo) {
        vo.setPrice(vo.getPrice().replaceAll(",",""));
        if (vo.getPackageType() == null || vo.getPackageType().isEmpty()) {
        return kakaoPayService.kakaoPayReadyRoom(vo);
        }
       return kakaoPayService.kakaoPayReady(vo);
    }

    @GetMapping("/cancel")
    public String cancel() {
        return "결제가 취소되었습니다.";
    }

    @GetMapping("/fail")
    public String fail() {
        return "결제 실패.";
    }
}
