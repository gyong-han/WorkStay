package com.kh.springfinal.host;

import com.kh.springfinal.space.SpaceVo;
import com.kh.springfinal.room.RoomVo;
import com.kh.springfinal.stay.StayVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
}
