package com.kh.springfinal.admin;

import com.kh.springfinal.host.TableVo;
import com.kh.springfinal.room.RoomVo;
import com.kh.springfinal.space.SpaceVo;
import com.kh.springfinal.stay.StayVo;
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

    //공간 수정요청 목록조회
    @PostMapping("spaceEditReq")
    public List<SpaceVo> getSpaceEditReqList(){
        return service.getSpaceEditList();
    }

    //숙소 수정요청 목록조회
    @PostMapping("stayEditReq")
    public List<StayVo> getStayEditReqList(){
        return service.getStayEditList();
    }

    //독채 수정요청 목록조회
    @PostMapping("roomEditReq")
    public List<RoomVo> getRoomEditReqList(){
        return service.getRoomEditList();
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
        return service.approveEditRoom(roomNo);
    }

    //독채 수정 반려
    @PostMapping("companionEditRoom")
    public int companionEditRoom(@RequestBody String roomNum){
        String roomNo = roomNum.replace("\"","");
        return service.companionEditRoom(roomNo);
    }

    //공간 삭제 목록조회
    @PostMapping("deleteSpaceList")
    public List<SpaceVo> deleteSpaceList(){
        return service.getDeleteSpaceList();
    }

    //숙소 삭제 목록조회
    @PostMapping("deleteStayList")
    public List<StayVo> deleteStayList(){
        return service.deleteStayList();
    }
}
