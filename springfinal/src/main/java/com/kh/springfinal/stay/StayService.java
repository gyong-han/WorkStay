package com.kh.springfinal.stay;

import com.kh.springfinal.room.RoomAttachmentVo;
import com.kh.springfinal.roomReservation.RoomReservationVo;
import com.kh.springfinal.slog.SlogVo;
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

    public List<RoomAttachmentVo> stayGetAttachmentList() {

        List<RoomAttachmentVo> stayAttachment = stayMapper.stayGetAttachmentList();

        return stayAttachment;
    }

    public List<StayVo> filterByList(String sort, String people, String area, String checkIn, String checkOut, String title) {
        if (sort.equals("lowPrice")) {
            return stayMapper.findAllByOrderByPriceAsc(people, area, checkIn, checkOut, title);
        } else if (sort.equals("highPrice")) {
            return stayMapper.findAllByOrderByPriceDesc(people, area, checkIn, checkOut, title);
        } else if (sort.equals("popular")) {
            return stayMapper.findAllByOrderByBookmarksDesc(people, area, checkIn, checkOut, title);
        } else {
            return stayMapper.findAllByOrderByCreatedAtDesc(people, area, checkIn, checkOut, title);
        }
    }

    public StayVo getFindStayByNo(Long no) {
        StayVo stayVo = stayMapper.getFindStayByNo(no);
        List<RoomAttachmentVo> stayAttachments = stayMapper.getAttachmentByNo(no);

        // 모든 첨부파일의 파일 경로를 배열로 만들어줌
        String[] attachmentPaths = stayAttachments.stream()
                .map(RoomAttachmentVo::getFilePath)
                .toArray(String[]::new);

        // 배열에 담겨있는 대표이미지 하나 선정
        String[] filePaths = new String[attachmentPaths.length + 1];
        filePaths[0] = stayVo.getFilePath();

        // 대표이미지를 제외한 나머지 이미지들을 배열로 나열(복사)
        System.arraycopy(attachmentPaths, 0, filePaths, 1, attachmentPaths.length);

        // Vo에 담아주기
        stayVo.setAttachmentFilePaths(filePaths);
        return stayVo;
        }

    public int bookmark(RoomReservationVo vo) {
        return stayMapper.bookmark(vo);
    }


    public int bookmarkDel(RoomReservationVo vo) {
        return stayMapper.bookmarkDel(vo);
    }

    public int getBookmarkInfo(RoomReservationVo vo) {
        return stayMapper.bookmarkInfo(vo);
    }

    public List<SlogVo> getSlogReview(Long no) {
        return stayMapper.getSlogReview(no);
    }
}
