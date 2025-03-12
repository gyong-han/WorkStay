package com.kh.springfinal.home;

import com.kh.springfinal.reservation.StayReservVo;
import com.kh.springfinal.stay.StayVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    public int bookmarkdel(StayReservVo vo) {
        return mapper.bookmarkdel(vo);
    }

    public int getbookmark(StayReservVo vo) {
        return mapper.getbookmark(vo);
    }

    public int bookmark(StayReservVo vo) {
        return mapper.bookmark(vo);
    }

    public Map<String, String> alert(Long no) {
        Map<String,String> alert = new HashMap<>();
        int result1 = mapper.approveSpaceAlert(no);
        int result2 = mapper.approveStayAlert(no);
        int result3 = mapper.companionSpaceAlert(no);
        int result4 = mapper.companionStayAlert(no);

        if(result1 + result2 > 0){
            alert.put("approve","true");
        }else{
            alert.put("approve","false");
        }

        if(result3 + result4 > 0){
            alert.put("companion","true");
        }else{
            alert.put("companion","false");
        }
        return alert;
    }

    public void changeAlert(Long no) {
        mapper.changeSpaceAlert(no);
        mapper.changeStayAlert(no);
    }

    public List<FaqVo> getFaq() {
        return mapper.getFaq();
    }
}
