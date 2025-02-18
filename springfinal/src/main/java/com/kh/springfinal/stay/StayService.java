package com.kh.springfinal.stay;

import com.kh.springfinal.space.AttachmentVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class StayService {
    private final StayMapper stayMapper;

    public List<StayVo> getFindStayAll() {
        List<StayVo> voList = stayMapper.getFindStayAll();

        return voList;
    }

    public List<StayAttachmentVo> stayGetAttachmentList() {
        return stayMapper.stayGetAttachmentList();
    }

//    public void findStayByName(String name) {
//        return stayMapper.findStayByName(name);
//    }


//    public StayVo getFindStayByNo(Long no) {
//
//    }
}
