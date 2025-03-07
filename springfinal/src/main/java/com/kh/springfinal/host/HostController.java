package com.kh.springfinal.host;

import com.amazonaws.services.s3.AmazonS3;
import com.kh.springfinal.guest.GuestVo;
import com.kh.springfinal.room.RoomVo;
import com.kh.springfinal.space.SpaceVo;
import com.kh.springfinal.stay.StayVo;
import com.kh.springfinal.util.FileUtil;
import com.kh.springfinal.util.PageVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/host")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin
public class HostController {

    private final HostService service;
    private final AmazonS3 s3;

    @Value("${aws.s3.bucket}")
    private String bucket;

    //공간 등록
    @PostMapping("enroll/space")
    public int enrollSpace(@RequestParam MultipartFile thumbnail, @RequestParam List<String> features
            , @RequestParam("space_floor_plan") MultipartFile spaceFloorPlan, @RequestParam List<MultipartFile> attachment,SpaceVo vo) throws IOException {

        AttachVo thumbnailVo = new AttachVo();
        thumbnailVo.setFilePath(FileUtil.uploadFileToAws(thumbnail,s3,bucket));
        thumbnailVo.setOriginName(thumbnail.getOriginalFilename());

        AttachVo spaceFloorPlanVo = new AttachVo();
        spaceFloorPlanVo.setFilePath(FileUtil.uploadFileToAws(spaceFloorPlan,s3,bucket));
        spaceFloorPlanVo.setOriginName(spaceFloorPlan.getOriginalFilename());

        List<AttachVo> attachVoList = new ArrayList<AttachVo>();
        for (MultipartFile file : attachment) {
            AttachVo attachVo = new AttachVo();
            attachVo.setFilePath(FileUtil.uploadFileToAws(file,s3,bucket));
            attachVo.setOriginName(file.getOriginalFilename());
            attachVoList.add(attachVo);
        }
        int result = service.enrollSpace(vo,features,thumbnailVo,spaceFloorPlanVo,attachVoList);

        return result;
    }

    //숙소 등록
    @PostMapping("enroll/stay")
    public int enrollStay(StayVo vo){
        int stayNo = service.enrollStay(vo);
        return stayNo;
    }

    //독채 등록
    @PostMapping("enroll/room")
    public int enrollRoom(RoomVo vo, @RequestParam MultipartFile thumbnail, @RequestParam List<String> features
            , @RequestParam("room_floor_plan") MultipartFile roomFloorPlan, @RequestParam List<MultipartFile> attachment) throws IOException {


        if ("undefined".equals(vo.getDoubleSize())) vo.setDoubleSize("0");
        if ("undefined".equals(vo.getSingleSize())) vo.setSingleSize("0");
        if ("undefined".equals(vo.getQueenSize())) vo.setQueenSize("0");

        AttachVo thumbnailVo = new AttachVo();
        thumbnailVo.setFilePath(FileUtil.uploadFileToAws(thumbnail,s3,bucket));
        thumbnailVo.setOriginName(thumbnail.getOriginalFilename());

        AttachVo roomFloorPlanVo = new AttachVo();
        roomFloorPlanVo.setFilePath(FileUtil.uploadFileToAws(roomFloorPlan,s3,bucket));
        roomFloorPlanVo.setOriginName(roomFloorPlan.getOriginalFilename());

        List<AttachVo> attachVoList = new ArrayList<AttachVo>();
        for (MultipartFile file : attachment) {
            AttachVo attachVo = new AttachVo();
            attachVo.setFilePath(FileUtil.uploadFileToAws(file,s3,bucket));
            attachVo.setOriginName(file.getOriginalFilename());
            attachVoList.add(attachVo);
        }
        int result = service.enrollRoom(vo,features,thumbnailVo,roomFloorPlanVo,attachVoList);

        return 1;
    }

    //공간 승인대기 리스트 가져오기
    @PostMapping("spaceApprovalList")
    public List<SpaceVo> getSpaceApprovalList(@RequestParam String status, @RequestParam String hostNo) {
        List<SpaceVo> spaceApprovalList = service.getSpaceApprovalList(status,hostNo);
        return spaceApprovalList;
    }

    //숙소 승인대기 리스트 가져오기
    @PostMapping("stayApprovalList")
    public List<StayVo> getStayApprovalList(@RequestParam String status, @RequestParam String hostNo){
        List<StayVo> stayApporvalList = service.getStayApprovalList(status,hostNo);
        return stayApporvalList;
    }

    //내 공간 리스트 가져오기
    @PostMapping("mySpace")
    public List<SpaceVo> mySpace(@RequestParam String hostNo){
        List<SpaceVo> mySpaceList = service.getMySpaceList(hostNo);
        return mySpaceList;
    }

    //내 숙소 리스트 가져오기
    @PostMapping("myStay")
    public List<StayVo> myStay(@RequestParam String hostNo){
        List<StayVo> myStayList = service.getMyStayList(hostNo);
        return myStayList;
    }

    //내 공간 예약 목록조회
    @PostMapping("space/reservList")
    public Map<String, Object> getSpaceReservList(@RequestParam String status, @RequestParam String hostNo, @RequestParam(defaultValue = "1") int pno){

        int listCnt = service.getSpaceReservCount(hostNo,status);
        int pageLimit = 5;
        int boardLimit = 10;
        PageVo pageVo = new PageVo(listCnt,pno,pageLimit,boardLimit);
        Map<String,Object> map = new HashMap<>();
        List<TableVo> voList = service.getSpaceReservList(status,hostNo,pageVo);
        map.put("voList",voList);
        map.put("pageVo",pageVo);
        return map;
    }

    //내 독채 예약 목록조회
    @PostMapping("room/reservList")
    public Map<String, Object> getRoomReservList(@RequestParam String status, @RequestParam String hostNo, @RequestParam(defaultValue = "1") int pno){
        int listCnt = service.getRoomReservCount(hostNo,status);
        int pageLimit = 5;
        int boardLimit = 10;
        PageVo pageVo = new PageVo(listCnt,pno,pageLimit,boardLimit);
        Map<String,Object> map = new HashMap<>();
        List<TableVo> voList = service.getRoomReservList(status,hostNo,pageVo);
        map.put("voList",voList);
        map.put("pageVo",pageVo);
        return map;

    }

    //내 공간 예약 상세조회
    @PostMapping("space/reservDetail")
    public Map<String, Object> getSpaceReservDetail(@RequestBody String spaceReservNum){
        String spaceReservNo = spaceReservNum.replace("\"", "");
        Map<String,Object> spaceReservDetail = service.getSpaceReservDetail(spaceReservNo);
        return spaceReservDetail;
    }

    //내 숙소 예약 상세조회
    @PostMapping("stay/reservDetail")
    public Map<String, Object> getStayReservDetail(@RequestBody String stayReservNum){
        String stayReservNo = stayReservNum.replace("\"", "");
        Map<String,Object> stayReservDetail = service.getStayReservDetail(stayReservNo);
        return stayReservDetail;
    }

    //내 공간 상세조회
    @PostMapping("mySpaceDetail")
    public Map<String, Object> getMySpaceDetail(@RequestBody String spaceNum){
        String spaceNo = spaceNum.replace("\"", "");
        Map<String,Object> mySpaceDetail = service.getMySpaceDetail(spaceNo);
        return mySpaceDetail;
    }

    //내 공간 수정요청
    @PostMapping("modifyMySpace")
    public int modifyMySpace(SpaceVo spaceVo, @RequestParam List<String> features,@RequestParam(required = false) MultipartFile thumbnail,
                             @RequestParam(required = false) List<MultipartFile> attachment) throws IOException {
        AttachVo thumbnailVo = new AttachVo();
        if(thumbnail != null){
            thumbnailVo.setFilePath(FileUtil.uploadFileToAws(thumbnail,s3,bucket));
            thumbnailVo.setOriginName(thumbnail.getOriginalFilename());
        }

        List<AttachVo> attachVoList = new ArrayList<AttachVo>();
        if(attachment != null){
            for (MultipartFile file : attachment) {
                AttachVo attachVo = new AttachVo();
                attachVo.setFilePath(FileUtil.uploadFileToAws(file,s3,bucket));
                attachVo.setOriginName(file.getOriginalFilename());
                attachVoList.add(attachVo);
            }
        }

        int result = service.modifyMySpace(spaceVo,features,thumbnailVo,attachVoList);
        return result;
    }

    //내 공간 입점삭제
    @PostMapping("deleteMySpace")
    public int deleteMySpace(@RequestBody String spaceNum){
        String spaceNo = spaceNum.replace("\"", "");
        int result = service.deleteMySpace(spaceNo);
        return result;
    }

    //내 숙소 상세조회
    @PostMapping("myStayDetail")
    public StayVo getMyStayDetail(@RequestBody String stayNum){
        String stayNo = stayNum.replace("\"", "");
        StayVo stayVo = service.getMyStayDetail(stayNo);
        return stayVo;
    }

    //내 숙소 수정요청
    @PostMapping("modifyMyStay")
    public int modifyMyStay(StayVo stayVo){
        int result = service.modifyMyStay(stayVo);
        return result;
    }

    //내 숙소 입점삭제
    @PostMapping("deleteMyStay")
    public int deleteMyStay(@RequestBody String stayNum){
        String stayNo = stayNum.replace("\"", "");
        int result = service.deleteMyStay(stayNo);
        return result;
    }

    //내 독채 상세조회
    @PostMapping("myRoomDetail")
    public List<Map<String, Object>> getMyRoomDEtail(@RequestParam String stayNum){
        return service.getMyRoomDetail(stayNum);
    }

    //내 독채 수정요청
    @PostMapping("modifyMyRoom")
    public int modifyMyRoom(RoomVo roomVo,  @RequestParam List<String> features,@RequestParam(required = false) MultipartFile thumbnail,
                            @RequestParam(required = false) List<MultipartFile> attachment) throws IOException {
        AttachVo thumbnailVo = new AttachVo();
        if(thumbnail != null){
            thumbnailVo.setFilePath(FileUtil.uploadFileToAws(thumbnail,s3,bucket));
            thumbnailVo.setOriginName(thumbnail.getOriginalFilename());
        }

        List<AttachVo> attachVoList = new ArrayList<AttachVo>();
        if(attachment != null){
            for (MultipartFile file : attachment) {
                AttachVo attachVo = new AttachVo();
                attachVo.setFilePath(FileUtil.uploadFileToAws(file,s3,bucket));
                attachVo.setOriginName(file.getOriginalFilename());
                attachVoList.add(attachVo);
            }
        }

        int result = service.modifyMyRoom(roomVo,features,thumbnailVo,attachVoList);
        return result;
    }

    //공간 입점 등록 요청 취소
    @PostMapping("cancelEnrollSpace")
    public int cancelEnrollSpace(@RequestParam String spaceNo){
        int result = service.cancelEnrollSpace(spaceNo);
        return result;
    }

    //숙소 입점 등록 요청 취소
    @PostMapping("cancelEnrollStay")
    public int cancelEnrollStay(@RequestParam String stayNo){
        int result = service.cancelEnrollStay(stayNo);
        return result;
    }

    //hostVo 가져오기
    @PostMapping("getHostVo")
    public GuestVo getHostVo(@RequestBody String no){
        String hostNo = no.replace("\"","");
        return service.getHostVo(hostNo);
    }
}
