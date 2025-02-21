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

    //숙소 입점 요청 리스트 가져오기
    @PostMapping("stayEnrollReqList")
    public List<TableVo> getStayEnrollReqList(){
        List<TableVo> voList = service.getStayEnrollReqList();
        return voList;
    }
    //공간 입점 요청 리스트 가져오기
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

    //공간 입점 요청 상세조회
    @PostMapping("spaceEnrollReqDetail")
    public Map<String, Object> getSpaceEnrollReqDetail(@RequestParam Long enrollReqNo){
        return service.getSpaceEnrollReqDetail(enrollReqNo);
    }

    //공간 입점 승인
    @PostMapping("approveSpace")
    public int approveSpace(@RequestParam Long hostNo, @RequestParam Long spaceNo){
        return service.approveSpace(hostNo,spaceNo);
    }

    //공간 입점 반려
    @PostMapping("companionSpace")
    public int companionSpace(@RequestParam Long spaceNo){
        return service.companionSpace(spaceNo);
    }

    //숙소 입점 요청 상세조회
    @PostMapping("stayEnrollReqDetail")
    public Map<String, Object> getStayEnrollReqDetail(@RequestParam Long enrollReqNo){
        return service.getStayEnrollReqDetail(enrollReqNo);
    }

    //독채 입점 요청 상세조회
    @PostMapping("roomEnrollReqDetail")
    public List<Map<String, Object>> getRoomEnrollReqDetail(@RequestParam Long stayNo){
        return service.getRoomEnrollReqDetail(stayNo);
    }

    //숙소 입점 승인
    @PostMapping("approveStay")
    public int approveStay(@RequestParam Long hostNo, @RequestParam Long stayNo){
        return service.approveStay(hostNo,stayNo);
    }

    //숙소 입점 반려
    @PostMapping("companionStay")
    public int companionStay(@RequestParam Long stayNo){
        return service.companionStay(stayNo);
    }
}
