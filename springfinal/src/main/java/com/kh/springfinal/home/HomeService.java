package com.kh.springfinal.home;

import com.kh.springfinal.stay.StayVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class HomeService {
    private final HomeMapper mapper;

    public List<StayVo> getSpringStay() {
        return mapper.getSpringSpring();
    }
    public List<StayVo> getSummerStay() {
        return mapper.getSummerStay();
    }
    public List<StayVo> getAutumnStay() {
        return mapper.getAutumnStay();
    }
    public List<StayVo> getWinterStay() {
        return mapper.getWinterStay();
    }

    public List<StayVo> getBestHitStayByFive() {
        return mapper.getBestHitStayByFive();
    }
}
