package com.kh.springfinal.admin;

import com.kh.springfinal.guest.GuestVo;
import com.kh.springfinal.host.AttachVo;
import com.kh.springfinal.host.TableVo;
import com.kh.springfinal.room.RoomVo;
import com.kh.springfinal.space.SpaceVo;
import com.kh.springfinal.stay.StayVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AdminService {
    private final AdminMapper mapper;

    public List<TableVo> getStayEnrollReqList() {
        return mapper.getStayEnrollReqList();
    }

    public List<TableVo> getSpaceEnrollReqList() {
        return mapper.getSpaceEnrollReqList();
    }

    public List<TableVo> getHostList() {
        return mapper.getHostList();
    }

    public Map<String, Object> getHostDetail(String hostNo) {
        TableVo hostVo = mapper.getHostDetail(hostNo);
        List<TableVo> stayList = mapper.getStayList(hostNo);
        List<TableVo> spaceList = mapper.getSpaceList(hostNo);
        Map<String,Object> hostVoMap = new HashMap<>();
        hostVoMap.put("hostVo",hostVo);
        hostVoMap.put("stayList",stayList);
        hostVoMap.put("spaceList",spaceList);
        return hostVoMap;
    }

    public Map<String, Object> getSpaceEnrollReqDetail(Long enrollReqNo) {
        Map<String,Object> enrollReqDetail = new HashMap<>();
        GuestVo hostVo = mapper.getSpaceHostVoEnrollReq(enrollReqNo);
        SpaceVo spaceVo = mapper.getSpaceVoEnrollReq(enrollReqNo);
        List<String> featuresList = mapper.getSpaceFeaturesListEnrollReq(enrollReqNo);
        AttachVo spaceFloorPlan = mapper.getSpaceFloorPlanEnrollReq(enrollReqNo);
        AttachVo spaceThumbNail = mapper.getSpaceThumbNailEnrollReq(enrollReqNo);
        List<AttachVo> spaceAttachList = mapper.getSpaceAttachEnrollReq(enrollReqNo);
        enrollReqDetail.put("hostVo",hostVo);
        enrollReqDetail.put("spaceVo",spaceVo);
        enrollReqDetail.put("featuresList",featuresList);
        enrollReqDetail.put("spaceFloorPlan",spaceFloorPlan);
        enrollReqDetail.put("spaceThumbNail",spaceThumbNail);
        enrollReqDetail.put("spaceAttachList",spaceAttachList);
        return enrollReqDetail;
    }

    public int approveSpace(Long hostNo, Long spaceNo) {
        int result1 = mapper.approveSpace(spaceNo);
        int result2 = mapper.changeHost(hostNo);
        return result1*result2;
    }

    public int companionSpace(Long spaceNo) {
        return mapper.companionSpace(spaceNo);
    }

    public Map<String, Object> getStayEnrollReqDetail(Long enrollReqNo) {
        Map<String,Object> enrollReqDetail = new HashMap<>();
        GuestVo hostVo = mapper.getStayHostVoEnrollReq(enrollReqNo);
        StayVo stayVo = mapper.getStayVoEnrollReq(enrollReqNo);
        enrollReqDetail.put("hostVo",hostVo);
        enrollReqDetail.put("stayVo",stayVo);
        return enrollReqDetail;
    }

    public List<Map<String, Object>> getRoomEnrollReqDetail(Long stayNo) {
        List<String> roomNoList = mapper.getRoomNoEnrollReq(stayNo);
        List<Map<String,Object>> enrollRoomReqDetail = new ArrayList<>();

        for (String roomNo : roomNoList) {
            Map<String,Object> roomMap = new HashMap<>();
            RoomVo roomVo = mapper.getRoomVo(roomNo);
            List<String> featuresList = mapper.getRoomFeaturesListEnrollReq(roomNo);
            AttachVo roomFloorPlan = mapper.getStayFloorPlanEnrollReq(roomNo);
            AttachVo roomThumbNail = mapper.getStayThumbNailEnrollReq(roomNo);
            List<AttachVo> roomAttachList = mapper.getRoomAttachEnrollReq(roomNo);
            roomMap.put("roomVo",roomVo);
            roomMap.put("featuresList",featuresList);
            roomMap.put("roomFloorPlan",roomFloorPlan);
            roomMap.put("roomThumbNail",roomThumbNail);
            roomMap.put("roomAttachList",roomAttachList);
            enrollRoomReqDetail.add(roomMap);
        }
        return enrollRoomReqDetail;
    }

    public int approveStay(Long hostNo, Long stayNo) {
        int result1 = mapper.approveStay(stayNo);
        int result2 = mapper.changeHost(hostNo);
        return result1*result2;
    }

    public int companionStay(Long stayNo) {
        return mapper.companionStay(stayNo);
    }

    public List<SpaceVo> getSpaceEditList() {
        List<SpaceVo> spaceList =  mapper.getSpaceEditList();
        return spaceList;
    }

    public Map<String, Object> getSpaceEditReqDetail(String spaceNo) {
        Map<String,Object> editReqDetail = new HashMap<>();
        GuestVo hostVo = mapper.getSpaceHostVo(spaceNo);
        SpaceVo originSpaceVo = mapper.getOriginSpace(spaceNo);
        SpaceVo editSpaceVo = mapper.getEditSpace(spaceNo);
        List<String> featuresList = mapper.getSpaceFeaturesList(spaceNo);
//        AttachVo spaceFloorPlan = mapper.getSpaceFloorPlan(spaceNo);
//        AttachVo spaceThumbNail = mapper.getSpaceThumbNailEnrollReq(spaceNo);
//        List<AttachVo> spaceAttachList = mapper.getSpaceAttachEnrollReq(spaceNo);
        editReqDetail.put("hostVo",hostVo);
        editReqDetail.put("spaceVo",originSpaceVo);
        editReqDetail.put("editSpaceVo",editSpaceVo);
        editReqDetail.put("featuresList",featuresList);
        return editReqDetail;
    }

    public List<StayVo> getStayEditList() {
        List<StayVo> stayList = mapper.getStayEditList();
        return stayList;
    }

    public List<RoomVo> getRoomEditList() {
        List<RoomVo> roomList = mapper.getRoomEditList();
        return roomList;
    }

    public Map<String, Object> getStayEditReqDetail(String stayNo) {
        Map<String,Object> editReqDetail = new HashMap<>();
        GuestVo hostVo = mapper.getStayHostVo(stayNo);
        StayVo originStayVo = mapper.getOriginStay(stayNo);
        StayVo editStayVo = mapper.getEditStay(stayNo);
        editReqDetail.put("hostVo",hostVo);
        editReqDetail.put("stayVo",originStayVo);
        editReqDetail.put("editStayVo",editStayVo);
        return editReqDetail;
    }

    public Map<String, Object> getRoomEditReqDetail(String roomNo) {
        Map<String,Object> editReqDetail = new HashMap<>();
        RoomVo originRoomVo = mapper.getRoomVo(roomNo);
        SpaceVo editRoomVo = mapper.getEditRoom(roomNo);
        originRoomVo.setName(editRoomVo.getName());
        originRoomVo.setIntroduction(editRoomVo.getIntroduction());
        List<String> featuresList = mapper.getRoomFeaturesList(roomNo);
//        AttachVo spaceFloorPlan = mapper.getSpaceFloorPlan(roomNo);
//        AttachVo spaceThumbNail = mapper.getSpaceThumbNailEnrollReq(roomNo);
//        List<AttachVo> spaceAttachList = mapper.getSpaceAttachEnrollReq(roomNo);
        editReqDetail.put("roomVo",originRoomVo);
        editReqDetail.put("featuresList",featuresList);

        return editReqDetail;
    }

    public int approveEditSpace(String spaceNo) {
        int result1 = mapper.approveEditSpace(spaceNo);
        int result2 = 0;
        if(result1 > 0){
            result2 = mapper.updateStaus(spaceNo);
        }
        return result1 * result2;
    }

    public int companionEditSpace(String spaceNo) {
        return mapper.companionEditSpace(spaceNo);
    }

    public int approveEditStay(String stayNo) {
        int result1 = mapper.approveEditStay(stayNo);
        int result2 = 0;
        if(result1 > 0){
            result2 = mapper.updateStayStaus(stayNo);
        }
        return result1 * result2;
    }

    public int companionEditStay(String stayNo) {
        return mapper.companionEditStay(stayNo);
    }

    public int approveEditRoom(String roomNo) {
        int result1 = mapper.approveEditRoom(roomNo);
        int result2 = 0;
        if(result1 > 0){
            result2 = mapper.updateRoomStatus(roomNo);
        }
        return result1 * result2;
    }

    public int companionEditRoom(String roomNo) {
        return mapper.companionEditRoom(roomNo);
    }
}
