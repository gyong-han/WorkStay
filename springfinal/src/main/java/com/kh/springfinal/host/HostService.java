package com.kh.springfinal.host;

import com.kh.springfinal.guest.GuestVo;
import com.kh.springfinal.reservation.SpaceReservVo;
import com.kh.springfinal.reservation.StayReservVo;
import com.kh.springfinal.space.SpaceVo;
import com.kh.springfinal.room.RoomVo;
import com.kh.springfinal.stay.StayVo;
import com.kh.springfinal.util.PageVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class HostService {
    private final HostMapper mapper;

    public int enrollSpace(SpaceVo vo, List<String> features, AttachVo thumbnailVo, AttachVo spaceFloorPlanVo, List<AttachVo> attachVoList) {
        int result1 = mapper.enrollSpace(vo);
        int result2 = 0;
        for (String feature : features) {
            result2 = mapper.enrollSpaceFeatures(feature);
        }
        int result3 = mapper.enrollSpaceThumbnail(thumbnailVo);
        int result4 = mapper.enrollSpaceFloorPlan(spaceFloorPlanVo);
        int result5= 0;
        for (AttachVo attachVo : attachVoList) {
            result5 = mapper.enrollSpaceAttach(attachVo);
        }
        int result = result1*result2*result3*result4*result5;
        return result;
    }

    public int enrollStay(StayVo vo) {
        int result = mapper.enrollStay(vo);
        int stayNo = 0;
        if(result == 1){
            stayNo = mapper.getStayNo();
        }
        return stayNo;
    }

    public int enrollRoom(RoomVo vo, List<String> features, AttachVo thumbnailVo, AttachVo roomFloorPlanVo, List<AttachVo> attachVoList) {
        int result1 = mapper.enrollRoom(vo);
        int result2 = 0;
        for (String feature : features) {
            result2 = mapper.enrollRoomFeatures(feature);
        }
        int result3 = mapper.enrollRoomThumbnail(thumbnailVo);
        int result4 = mapper.enrollRoomFloorPlan(roomFloorPlanVo);
        int result5= 0;
        for (AttachVo attachVo : attachVoList) {
            result5 = mapper.enrollRoomAttach(attachVo);
        }

        return 1;
    }

    public List<SpaceVo> getSpaceApprovalList(String status, String hostNo) {
        return mapper.getSpaceApprovalList(status,hostNo);
    }

    public List<StayVo> getStayApprovalList(String status, String hostNo) {
        return mapper.getStayApprovalList(status,hostNo);
    }

    public List<SpaceVo> getMySpaceList(String hostNo) {
        return mapper.getMySpaceList(hostNo);
    }

    public List<StayVo> getMyStayList(String hostNo) {
        return mapper.getMyStayList(hostNo);
    }

    public List<TableVo> getSpaceReservList(String status, String hostNo, PageVo pageVo) {
        int limit = pageVo.getBoardLimit();
        int offset = pageVo.getOffset();
        return mapper.getSpaceReservList(status,hostNo,limit,offset);
    }

    public List<TableVo> getRoomReservList(String status, String hostNo, PageVo pageVo) {
        int limit = pageVo.getBoardLimit();
        int offset = pageVo.getOffset();
        return mapper.getRoomReservList(status,hostNo,limit,offset);
    }

    public Map<String, Object> getSpaceReservDetail(String spaceReservNo) {
        Map<String,Object> spaceReservDetail = new HashMap<>();

        GuestVo guestVo = mapper.getSpaceReservGuest(spaceReservNo);
        SpaceReservVo spaceVo = mapper.getSpaceReserv(spaceReservNo);

        spaceReservDetail.put("guestVo",guestVo);
        spaceReservDetail.put("spaceVo",spaceVo);
        return spaceReservDetail;
    }

    public Map<String, Object> getStayReservDetail(String stayReservNo) {
        Map<String,Object> stayReservDetail = new HashMap<>();

        GuestVo guestVo = mapper.getStayReservGuest(stayReservNo);
        StayReservVo stayVo = mapper.getStayReserv(stayReservNo);

        stayReservDetail.put("guestVo",guestVo);
        stayReservDetail.put("stayVo",stayVo);

        return stayReservDetail;
    }

    public Map<String, Object> getMySpaceDetail(String spaceNo) {
        SpaceVo spaceVo = mapper.getMySpaceVo(spaceNo);
        List<String> featuresList = mapper.getMySpaceFeaturesList(spaceNo);
        AttachVo spaceFloorPlan = mapper.getMySpaceRoomFloorPlan(spaceNo);
        AttachVo spaceThumbNail = mapper.getMySpaceThumbNail(spaceNo);
        List<AttachVo> spaceAttachList = mapper.getMySpaceAttach(spaceNo);
        Map<String,Object> attachMap = new HashMap<>();
        attachMap.put("space_floor_plan",spaceFloorPlan);
        attachMap.put("thumbnail",spaceThumbNail);
        attachMap.put("attachment",spaceAttachList);
        Map<String,Object> mySpaceDetail = new HashMap<>();
        mySpaceDetail.put("spaceVo",spaceVo);
        mySpaceDetail.put("featuresList",featuresList);
        mySpaceDetail.put("attachMap",attachMap);
        return mySpaceDetail;
    }

    public int modifyMySpace(SpaceVo spaceVo, List<String> features, AttachVo thumbnailVo, List<AttachVo> attachVoList) {
        int result1 = mapper.updateMySpace(spaceVo);
        int result2 = mapper.deleteMySpaceFeatures(spaceVo);
        int result3 = 0;
        for (String feature : features) {
            result3 = mapper.insertMySpaceFeatures(spaceVo,feature);
        }
        int result4 = mapper.insertMySpaceEdit(spaceVo);

        int result5 = 0;
        if(thumbnailVo.getFilePath() == null){
            result5 = 1;
        }else{
            result5 = mapper.insertMySpaceThumbnailEdit(thumbnailVo,spaceVo);
        }

        int result6 = 0;
        if(attachVoList.size() == 0 ){
            result6 = 1;
        }else{
            for (AttachVo attachVo : attachVoList) {
                result6 = mapper.insertMySpaceAttachEdit(spaceVo,attachVo);
            }
        }
        return result1*result2*result3*result4*result5*result6;
    }

    public int deleteMySpace(String spaceNo) {
        int cnt = mapper.countSpaceReservation(spaceNo);
        if(cnt > 0){
            return 0;
        }
        int result = mapper.deleteMySpace(spaceNo);
        return result;
    }

    public StayVo getMyStayDetail(String stayNo) {
        StayVo stayVo = mapper.getMyStay(stayNo);
        return stayVo;
    }

    public int modifyMyStay(StayVo stayVo) {
        int result1 = mapper.updateMyStay(stayVo);
        int result2 = mapper.insertMyStayedit(stayVo);
        return result1*result2;
    }

    public List<Map<String, Object>> getMyRoomDetail(String stayNum) {
        List<String> roomNoList = mapper.getMyRoomNo(stayNum);
        List<Map<String,Object>> myRoomDetail = new ArrayList<>();

        for (String roomNo : roomNoList) {
            Map<String,Object> roomMap = new HashMap<>();
            RoomVo roomVo = mapper.getMyRoomVo(roomNo);
            List<String> featuresList = mapper.getMyRoomFeaturesList(roomNo);
            Map<String,Object> attachMap = new HashMap<>();
            AttachVo roomFloorPlan = mapper.getRoomFloorPlan(roomNo);
            AttachVo roomThumbNail = mapper.getRoomThumbNail(roomNo);
            List<AttachVo> roomAttachList = mapper.getRoomAttach(roomNo);
            attachMap.put("roomFloorPlan",roomFloorPlan);
            attachMap.put("thumbnail",roomThumbNail);
            attachMap.put("attachment",roomAttachList);
            roomMap.put("roomVo",roomVo);
            roomMap.put("featuresList",featuresList);
            roomMap.put("fileData",attachMap);
            myRoomDetail.add(roomMap);
        }
        return myRoomDetail;
    }

    public int modifyMyRoom(RoomVo roomVo, List<String> features, AttachVo thumbnailVo, List<AttachVo> attachVoList) {
        int result1 = mapper.updateMyRoom(roomVo);
        int result2 = mapper.deleteMyRoomFeatures(roomVo);
        int result3 = 0;
        for (String feature : features) {
            result3 = mapper.insertMyRoomFeatures(roomVo,feature);
        }
        int result4 = mapper.insertMyRoomEdit(roomVo);

        int result5 = 0;
        if(thumbnailVo.getFilePath() == null){
            result5 = 1;
        }else{
            result5 = mapper.insertMyRoomThumbnailEdit(thumbnailVo,roomVo);
        }

        int result6 = 0;
        if(attachVoList.size() == 0 ){
            result6 = 1;
        }else{
            for (AttachVo attachVo : attachVoList) {
                result6 = mapper.insertMyRoomAttachEdit(roomVo,attachVo);
            }
        }

        return result1 * result2 * result3 * result4;
    }

    public int cancelEnrollSpace(String spaceNo) {
        return mapper.cancelEnrollSpace(spaceNo);
    }

    public int cancelEnrollStay(String stayNo) {
        return mapper.cancelEnrollStay(stayNo);
    }

    public int deleteMyStay(String stayNo) {
        int cnt = mapper.countStayReservation(stayNo);
        if(cnt > 0 ){
            return 0;
        }
        return mapper.deleteMyStay(stayNo);
    }

    public int getRoomReservCount(String hostNo, String status) {
        return mapper.getRoomReservCount(hostNo,status);
    }

    public int getSpaceReservCount(String hostNo, String status) {
        return mapper.getSpaceReservCount(hostNo,status);
    }

    public GuestVo getHostVo(String hostNo) {
        GuestVo hostVo = mapper.getHostVo(hostNo);
        return hostVo;
    }
}
