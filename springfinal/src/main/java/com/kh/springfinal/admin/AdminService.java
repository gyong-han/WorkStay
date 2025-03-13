package com.kh.springfinal.admin;

import com.kh.springfinal.guest.GuestVo;
import com.kh.springfinal.home.FaqVo;
import com.kh.springfinal.host.AttachVo;
import com.kh.springfinal.host.TableVo;
import com.kh.springfinal.room.RoomVo;
import com.kh.springfinal.space.SpaceVo;
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
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AdminService {
    private final AdminMapper mapper;

    public List<TableVo> getStayEnrollReqList(PageVo pageVo) {
        int limit = pageVo.getBoardLimit();
        int offset = pageVo.getOffset();
        return mapper.getStayEnrollReqList(limit,offset);
    }

    public List<TableVo> getSpaceEnrollReqList(PageVo pageVo) {
        int limit = pageVo.getBoardLimit();
        int offset = pageVo.getOffset();
        return mapper.getSpaceEnrollReqList(limit,offset);
    }

    public List<TableVo> getHostList(PageVo pageVo) {
        int limit = pageVo.getBoardLimit();
        int offset = pageVo.getOffset();
        return mapper.getHostList(offset,limit);
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

    public List<SpaceVo> getSpaceEditList(PageVo pageVo) {
        int limit = pageVo.getBoardLimit();
        int offset = pageVo.getOffset();
        List<SpaceVo> spaceList =  mapper.getSpaceEditList(limit,offset);
        return spaceList;
    }

    public Map<String, Object> getSpaceEditReqDetail(String spaceNo) {
        Map<String,Object> editReqDetail = new HashMap<>();
        GuestVo hostVo = mapper.getSpaceHostVo(spaceNo);
        SpaceVo originSpaceVo = mapper.getOriginSpace(spaceNo);
        SpaceVo editSpaceVo = mapper.getEditSpace(spaceNo);
        List<String> featuresList = mapper.getSpaceFeaturesList(spaceNo);
        AttachVo spaceFloorPlan = mapper.getSpaceFloorPlan(spaceNo);
        AttachVo spaceThumbNail = mapper.getEditSpaceThumbNail(spaceNo);
        if(spaceThumbNail == null){
            spaceThumbNail = mapper.getOriginSpaceThumbNail(spaceNo);
        }
        List<AttachVo> spaceAttachList = mapper.getEditSpaceAttach(spaceNo);
        if(spaceAttachList.isEmpty()){
            spaceAttachList = mapper.getOriginSpaceAttach(spaceNo);
        }
        editReqDetail.put("hostVo",hostVo);
        editReqDetail.put("spaceVo",originSpaceVo);
        editReqDetail.put("editSpaceVo",editSpaceVo);
        editReqDetail.put("featuresList",featuresList);
        editReqDetail.put("spaceFloorPlan",spaceFloorPlan);
        editReqDetail.put("spaceThumbNail",spaceThumbNail);
        editReqDetail.put("spaceAttachList",spaceAttachList);
        return editReqDetail;
    }

    public List<StayVo> getStayEditList(PageVo pageVo) {
        int limit = pageVo.getBoardLimit();
        int offset = pageVo.getOffset();
        List<StayVo> stayList = mapper.getStayEditList(limit,offset);
        return stayList;
    }

    public List<StayVo> getRoomEditList(PageVo pageVo) {
        int limit = pageVo.getBoardLimit();
        int offset = pageVo.getOffset();
        List<StayVo> roomList = mapper.getRoomEditList(limit,offset);
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
        AttachVo roomFloorPlan = mapper.getRoomFloorPlan(roomNo);

        AttachVo roomThumbNail = mapper.getEditRoomThumbNail(roomNo);
        if(roomThumbNail == null){
            roomThumbNail = mapper.getOriginRoomThumbNail(roomNo);
        }

        List<AttachVo> roomAttachList = mapper.getEditRoomAttach(roomNo);
        if(roomAttachList.isEmpty()){
            roomAttachList = mapper.getOriginRoomAttach(roomNo);
        }

        editReqDetail.put("roomVo",originRoomVo);
        editReqDetail.put("featuresList",featuresList);
        editReqDetail.put("roomFloorPlan",roomFloorPlan);
        editReqDetail.put("roomThumbNail",roomThumbNail);
        editReqDetail.put("roomAttachList",roomAttachList);

        return editReqDetail;
    }

    public int approveEditSpace(String spaceNo) {
        int result1 = mapper.approveEditSpace(spaceNo);
        int result2 = 0;
        if(result1 > 0) {
            result2 = mapper.updateStaus(spaceNo);
        }

        int result3 = 0;
        AttachVo spaceThumbNail = mapper.getEditSpaceThumbNail(spaceNo);
        if(spaceThumbNail != null){
            int res = mapper.deleteOriginSpaceThumbnail(spaceNo);
            if(res > 0 ){
                result3 = mapper.insertNewSpaceThumbnail(spaceNo);
                mapper.updateEditSpaceThumbnail(spaceNo);
            }
        }else{
            result3 = 1;
        }

        List<AttachVo> spaceAttachList = mapper.getEditSpaceAttach(spaceNo);
        int result4= 0;
        if(spaceAttachList.isEmpty()) {
            result4 = 1;
        }else{
            int res = mapper.deleteOriginSpaceAttach(spaceNo);
            if(res > 0){
                result4 = mapper.insertNewSpaceAttach(spaceNo);
                mapper.updateEditSpaceAttach(spaceNo);
            }
        }
        return result1 * result2 * result3 * result4;
    }

    public int companionEditSpace(String spaceNo) {
        int result1 = mapper.companionEditSpace(spaceNo);
        int result2 = 0;
        int count = mapper.getEditSpaceAttachList(spaceNo);
        if(count == 0){
            result2 = 1;
        }else{
            result2 = mapper.companionEditSpaceAttach(spaceNo);
        }
        return result1 * result2;
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

        int result3 = 0;
        AttachVo roomThumbNail = mapper.getEditRoomThumbNail(roomNo);
        if(roomThumbNail != null){
            int res = mapper.deleteOriginRoomThumbnail(roomNo);
            if(res > 0 ){
                    result3 = mapper.insertNewRoomThumbnail(roomNo);
                    mapper.updateEditRoomThumbnail(roomNo);
            }
        }else{
            result3 = 1;
        }

        List<AttachVo> roomAttachList = mapper.getEditRoomAttach(roomNo);
        int result4= 0;
        if(roomAttachList.isEmpty()) {
           result4 = 1;
        }else{
            int res = mapper.deleteOriginRoomAttach(roomNo);
            if(res > 0){
                result4 = mapper.insertNewRoomAttach(roomNo);
                mapper.updateEditRoomAttach(roomNo);
            }
        }
            return result1 * result2 * result3 * result4;
    }

    public int companionEditRoom(String roomNo) {
        int result1 = mapper.companionEditRoom(roomNo);
        int result2 = 0;
        int count = mapper.getEditRoomAttachList(roomNo);
        if(count == 0){
            result2 = 1;
        }else{
            result2 = mapper.companionEditRoomAttach(roomNo);
        }
        return result1 * result2;
    }

    public List<SpaceVo> getDeleteSpaceList(PageVo pageVo) {
        int limit = pageVo.getBoardLimit();
        int offset = pageVo.getOffset();
        List<SpaceVo> spaceList = mapper.getDeleteSpaceList(limit,offset);
        return spaceList;
    }

    public List<StayVo> deleteStayList(PageVo pageVo) {
        int limit = pageVo.getBoardLimit();
        int offset = pageVo.getOffset();
        return mapper.getDeleteStayList(limit,offset);
    }

    public int getHostListCount() {
        return mapper.getHostListCount();
    }

    public int getStayEnrollReqListCount() {
        return mapper.getStayEnrollReqListCount();
    }

    public int getSpaceEnrollReqListCount() {
        return mapper.getSpaceEnrollReqListCount();
    }

    public int getStayEditReqCount() {
        return mapper.getStayEditReqCount();
    }

    public int getRoomEditReqCount() {
        return mapper.getRoomEditReqCount();
    }

    public int getSpaceEditReqCount() {
        return mapper.getSpaceEditReqCount();
    }

    public int getStayDeleteReqListCount() {
        return mapper.getStayDeleteReqListCount();
    }

    public int getSpaceDeleteReqListCount() {
        return mapper.getSpaceDeleteReqListCount();
    }

    public int getFAQCount() {
        return mapper.getFAQCount();
    }

    public List<FaqVo> getFAQList(PageVo pageVo) {
        int limit = pageVo.getBoardLimit();
        int offset = pageVo.getOffset();
        return mapper.getFAQList(limit,offset);
    }

    public void changeCheck(FaqVo vo) {
        if(vo.getShowYn().equals("Y")){
            mapper.changeCheckYToN(vo);
        }else{
            mapper.changeCheckNToY(vo);
        }
    }

    public int faqWrite(FaqVo vo) {
        return mapper.faqWrite(vo);
    }

    public FaqVo getFAQDetail(Long no) {
        return mapper.getFAQDetail(no);
    }

    public int deleteFAQ(Long no) {
        return mapper.deleteFAQ(no);
    }

    public int editFAQ(FaqVo vo) {
        return mapper.editFAQ(vo);
    }
}
