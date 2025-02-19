package com.kh.springfinal.admin;

import com.kh.springfinal.host.AttachVo;
import com.kh.springfinal.host.TableVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}
