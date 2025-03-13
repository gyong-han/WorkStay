package com.kh.springfinal.admin;

import com.kh.springfinal.home.FaqVo;
import com.kh.springfinal.host.TableVo;
import com.kh.springfinal.space.SpaceVo;
import com.kh.springfinal.stay.StayVo;
import com.kh.springfinal.util.PageVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
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
    public Map<String, Object> getStayEnrollReqList(@RequestParam(defaultValue = "1") int pno){
        int listCnt = service.getStayEnrollReqListCount();
        int pageLimit = 5;
        int boardLimit = 10;
        PageVo pageVo = new PageVo(listCnt,pno,pageLimit,boardLimit);
        Map<String,Object> map = new HashMap<>();
        List<TableVo> voList = service.getStayEnrollReqList(pageVo);
        map.put("voList",voList);
        map.put("pageVo",pageVo);
        return map;
    }

    //공간 입점 요청 리스트 가져오기
    @PostMapping("spaceEnrollReqList")
    public Map<String, Object> getSpaceEnrollReqList(@RequestParam(defaultValue = "1") int pno){
        int listCnt = service.getSpaceEnrollReqListCount();
        int pageLimit = 5;
        int boardLimit = 10;
        PageVo pageVo = new PageVo(listCnt,pno,pageLimit,boardLimit);
        Map<String,Object> map = new HashMap<>();
        List<TableVo> voList = service.getSpaceEnrollReqList(pageVo);
        map.put("voList",voList);
        map.put("pageVo",pageVo);
        return map;
    }

    //호스트 리스트 가져오기
    @PostMapping("hostList")
    public Map<String, Object> getHostList(@RequestParam(defaultValue = "1") int pno){
        int listCnt = service.getHostListCount();
        int pageLimit = 5;
        int boardLimit = 10;
        PageVo pageVo = new PageVo(listCnt,pno,pageLimit,boardLimit);
        Map<String,Object> hostMap = new HashMap<>();
        List<TableVo> voList = service.getHostList(pageVo);
        hostMap.put("voList",voList);
        hostMap.put("pageVo",pageVo);
        return hostMap;
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

    //공간 수정요청 목록조회
    @PostMapping("spaceEditReq")
    public Map<String, Object> getSpaceEditReqList(@RequestParam(defaultValue = "1") int pno){
        int listCnt = service.getSpaceEditReqCount();
        int pageLimit = 5;
        int boardLimit = 10;
        PageVo pageVo = new PageVo(listCnt,pno,pageLimit,boardLimit);
        Map<String,Object> map = new HashMap<>();
        List<SpaceVo> voList = service.getSpaceEditList(pageVo);
        map.put("voList",voList);
        map.put("pageVo",pageVo);
        return map;
    }

    //숙소 수정요청 목록조회
    @PostMapping("stayEditReq")
    public Map<String, Object> getStayEditReqList(@RequestParam(defaultValue = "1") int pno){
        int listCnt = service.getStayEditReqCount();
        int pageLimit = 5;
        int boardLimit = 10;
        PageVo pageVo = new PageVo(listCnt,pno,pageLimit,boardLimit);
        Map<String,Object> map = new HashMap<>();
        List<StayVo> voList = service.getStayEditList(pageVo);
        map.put("voList",voList);
        map.put("pageVo",pageVo);
        return map;
    }

    //독채 수정요청 목록조회
    @PostMapping("roomEditReq")
    public Map<String, Object> getRoomEditReqList(@RequestParam(defaultValue = "1") int pno){
        int listCnt = service.getRoomEditReqCount();
        int pageLimit = 5;
        int boardLimit = 10;
        PageVo pageVo = new PageVo(listCnt,pno,pageLimit,boardLimit);
        Map<String,Object> map = new HashMap<>();
        List<StayVo> voList = service.getRoomEditList(pageVo);
        map.put("voList",voList);
        map.put("pageVo",pageVo);
        return map;
    }

    //공간 수정요청 상세조회
    @PostMapping("spaceEditReqDetail")
    public Map<String, Object> getSpaceEditReqDetail(@RequestBody String spaceNum){
        String spaceNo = spaceNum.replace("\"", "");
        return service.getSpaceEditReqDetail(spaceNo);
    }

    //숙소 수정요청 상세조회
    @PostMapping("stayEditReqDetail")
    public Map<String, Object> getStayEditReqDetail(@RequestBody String stayNum){
        String stayNo = stayNum.replace("\"","");
        return service.getStayEditReqDetail(stayNo);
    }

    //독채 수정요청 상세조회
    @PostMapping("roomEditReqDetail")
    public Map<String, Object> getRoomEditReqDetail(@RequestBody String roomNum){
        String roomNo = roomNum.replace("\"","");
        return service.getRoomEditReqDetail(roomNo);
    }

    //공간 수정 승인
    @PostMapping("approveEditSpace")
    public int approveEditSpace(@RequestBody String spaceNum){
        String spaceNo = spaceNum.replace("\"","");
        return service.approveEditSpace(spaceNo);
    }

    //공간 수정 반려
    @PostMapping("companionEditSpace")
    public int companionEditSpace(@RequestBody String spaceNum){
        String spaceNo = spaceNum.replace("\"","");
        return service.companionEditSpace(spaceNo);
    }

    //숙소 수정 승인
    @PostMapping("approveEditStay")
    public int approveEditStay(@RequestBody String stayNum){
        String stayNo = stayNum.replace("\"","");
        return service.approveEditStay(stayNo);
    }

    //숙소 수정 반려
    @PostMapping("companionEditStay")
    public int companionEditStay(@RequestBody String stayNum){
        String stayNo = stayNum.replace("\"","");
        return service.companionEditStay(stayNo);
    }

    //독채 수정 승인
    @PostMapping("approveEditRoom")
    public int approveEditRoom(@RequestBody String roomNum){
        String roomNo = roomNum.replace("\"","");
        int result = service.approveEditRoom(roomNo);
        return result;
    }

    //독채 수정 반려
    @PostMapping("companionEditRoom")
    public int companionEditRoom(@RequestBody String roomNum){
        String roomNo = roomNum.replace("\"","");
        int result = service.companionEditRoom(roomNo);
        return result;
    }

    //공간 삭제 목록조회
    @PostMapping("deleteSpaceList")
    public Map<String, Object> deleteSpaceList(@RequestParam(defaultValue = "1") int pno){
        int listCnt = service.getSpaceDeleteReqListCount();
        int pageLimit = 5;
        int boardLimit = 10;
        PageVo pageVo = new PageVo(listCnt,pno,pageLimit,boardLimit);
        Map<String,Object> map = new HashMap<>();
        List<SpaceVo> voList =  service.getDeleteSpaceList(pageVo);
        map.put("voList",voList);
        map.put("pageVo",pageVo);
        return map;
    }

    //숙소 삭제 목록조회
    @PostMapping("deleteStayList")
    public Map<String, Object> deleteStayList(@RequestParam(defaultValue = "1") int pno){
        int listCnt = service.getStayDeleteReqListCount();
        int pageLimit = 5;
        int boardLimit = 10;
        PageVo pageVo = new PageVo(listCnt,pno,pageLimit,boardLimit);
        Map<String,Object> map = new HashMap<>();
        List<StayVo> voList = service.deleteStayList(pageVo);
        map.put("voList",voList);
        map.put("pageVo",pageVo);
        return map;
    }

    @PostMapping("getFAQ")
    public Map<String, Object> getFAQList(@RequestParam(defaultValue = "1") int pno){
        int listCnt = service.getFAQCount();
        int pageLimit = 5;
        int boardLimit = 10;
        PageVo pageVo = new PageVo(listCnt,pno,pageLimit,boardLimit);
        Map<String,Object> map = new HashMap<>();
        List<FaqVo> voList = service.getFAQList(pageVo);
        map.put("voList",voList);
        map.put("pageVo",pageVo);
        return map;
    }
    
    @PostMapping("changeCheck")
    public void changeCheck(FaqVo vo){
        service.changeCheck(vo);
    }

    @PostMapping("faqWrite")
    public int faqWrite(FaqVo vo){
        return service.faqWrite(vo);
    }

    @PostMapping("getFAQDetail")
    public FaqVo getFAQDetail(@RequestBody Long no){
        return service.getFAQDetail(no);
    }

    @PostMapping("deleteFAQ")
    public int deleteFAQ(@RequestBody Long no){
        return service.deleteFAQ(no);
    }

    @PostMapping("editFAQ")
    public int editFAQ(FaqVo vo){
        return service.editFAQ(vo);
    }
}
