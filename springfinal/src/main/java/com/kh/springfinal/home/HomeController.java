package com.kh.springfinal.home;

import com.kh.springfinal.reservation.StayReservVo;
import com.kh.springfinal.stay.StayVo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("home")
public class HomeController {
    private final HomeService service;

    @GetMapping("spring")
    public List<StayVo> getSpringStay(){

        List<StayVo> SpringvoList = service.getSpringStay();
        return SpringvoList;
    }
    @GetMapping("summer")
    public List<StayVo> getSummerStay(){

        List<StayVo> summerVoList = service.getSummerStay();
        return summerVoList;
    }
    @GetMapping("autumn")
    public List<StayVo> getAutumnStay(){

        List<StayVo> autumnVoList = service.getAutumnStay();
        return autumnVoList;
    }
    @GetMapping("winter")
    public List<StayVo> getWinterStay(){

        List<StayVo> winterVoList = service.getWinterStay();
        return winterVoList;
    }
    @GetMapping("besthit")
    public List<StayVo> getBestHitStayByFive(){

        List<StayVo> voList = service.getBestHitStayByFive();
        return voList;
    }
    @PostMapping("bookmark")
    public int bookmark(@RequestBody StayReservVo vo){
        return service.bookmark(vo);
    }

    @PostMapping("bookmarkdel")
    public int bookmarkdel(@RequestBody StayReservVo vo){
        return service.bookmarkdel(vo);
    }



    @PostMapping("getbookmarkInfo")
    public boolean getbookmark(@RequestBody StayReservVo vo){
        int result = service.getbookmark(vo);
        if(result >= 1){
            return true;
        }else{
            return false;
        }

    }

    @PostMapping("alert")
    public Map<String, String> alert(@RequestBody Long no){
        Map<String,String> alert = service.alert(no);
        return alert;
    }

    @PostMapping("changeAlert")
    public void changeAlert(@RequestBody Long no){
        service.changeAlert(no);
    }

    @GetMapping("faq")
    public List<FaqVo> getFaq(){
        List<FaqVo> faqList = service.getFaq();
        return faqList;
    }

}
