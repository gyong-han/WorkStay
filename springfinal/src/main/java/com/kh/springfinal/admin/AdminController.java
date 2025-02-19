package com.kh.springfinal.admin;

import com.kh.springfinal.host.TableVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/admin")
@Slf4j
@CrossOrigin
public class AdminController {
    private final AdminService service;

    //숙소 승인 요청 리스트 가져오기
    @PostMapping("stayEnrollReqList")
    public List<TableVo> getStayEnrollReqList(){
        List<TableVo> voList = service.getStayEnrollReqList();
        return voList;
    }
    //공간 승인 요청 리스트 가져오기
    @PostMapping("spaceEnrollReqList")
    public List<TableVo> getSpaceEnrollReqList(){
        List<TableVo> voList = service.getSpaceEnrollReqList();
        return voList;
    }

    //호스트 리스트 가져오기
    @PostMapping("hostList")
    public List<TableVo> getHostList(){
        List<TableVo> voList = service.getHostList();
        return voList;
    }

    //호스트 상세조회 정보 가져오기
    @PostMapping("hostDetail")
    public Map<String, Object> getHostDetail(@RequestParam String hostNo){
        Map<String,Object> hostVoMap =  service.getHostDetail(hostNo);
        return hostVoMap;
    }

}
