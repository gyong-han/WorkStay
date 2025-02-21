package com.kh.springfinal.stay;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class StayService {
    private final StayMapper stayMapper;

//    public List<StayVo> getFindStayAll() {
//        List<StayVo> voList = stayMapper.findAllByOrderByCreatedAtDesc();
//
//        return voList;
//    }

    public List<StayAttachmentVo> stayGetAttachmentList() {
        return stayMapper.stayGetAttachmentList();
    }

    public List<StayVo> sortByList(String sort) {
        if (sort.equals("lowPrice")) {
            return stayMapper.findAllByOrderByPriceAsc();
        } else if (sort.equals("highPrice")) {
            return stayMapper.findAllByOrderByPriceDesc();
        } else if (sort.equals("popular")) {
            return stayMapper.findAllByOrderByBookmarksDesc();
        } else {
            return stayMapper.findAllByOrderByCreatedAtDesc();
        }
    }

    public StayVo getFindStayByNo(Long no) {
        StayVo stayVo = stayMapper.getFindStayByNo(no);
        List<StayAttachmentVo> stayAttachment = stayMapper.getAttachmentByNo(no);


        // 모든 첨부파일의 파일 경로를 배열로 만들어줌
        String[] attachmentPaths = stayAttachment.stream()
                .map(StayAttachmentVo::getFilePath)
                .toArray(String[]::new);

        // 배열에 담겨있는 대표이미지 하나 선정
        String[] filePaths = new String[attachmentPaths.length+1];
        filePaths[0] = stayVo.getFilePath();

        // 대표이미지를 제외한 나머지 이미지들을 배열로 나열(복사)
        System.arraycopy(attachmentPaths, 0, filePaths, 1, attachmentPaths.length);

        // Vo에 담아주기
        stayVo.setAttachmentFilePaths(attachmentPaths);

        return stayVo;
    }

//    public void findStayByName(String name) {
//        return stayMapper.findStayByName(name);
//    }


//    public StayVo getFindStayByNo(Long no) {
//
//    }
}
