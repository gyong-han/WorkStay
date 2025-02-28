package com.kh.springfinal.home;

import com.kh.springfinal.stay.StayVo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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


}
