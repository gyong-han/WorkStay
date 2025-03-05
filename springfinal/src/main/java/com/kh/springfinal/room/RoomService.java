package com.kh.springfinal.room;

import com.kh.springfinal.guest.GuestVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class RoomService {
    private final RoomMapper roomMapper;

    public List<RoomVo> getRoomListByStayNo(Long no) {
        return roomMapper.getRoomListByStayNo(no);
    }

    public RoomVo getRoomInfoByNo(Long no) {
        RoomVo roomVo = roomMapper.getRoomInfoByNo(no);
        List<String> features = roomMapper.getFeatures(no);
        List<RoomAttachmentVo> roomAttachments = roomMapper.getAttachmentByNo(no);

        // 모든 첨부파일의 파일 경로를 배열로 만들어줌
        String[] attachmentPaths = roomAttachments.stream()
                .map(RoomAttachmentVo::getFilePath)
                .toArray(String[]::new);

        // 배열에 담겨있는 대표이미지 하나 선정
        String[] filePaths = new String[attachmentPaths.length + 1];
        filePaths[0] = roomVo.getFilePath();

        // 대표이미지를 제외한 나머지 이미지들을 배열로 나열(복사)
        System.arraycopy(attachmentPaths, 0, filePaths, 1, attachmentPaths.length);

        // Vo에 담아주기
        roomVo.setAttachmentFilePaths(filePaths);
        roomVo.setFeatures(features);

        return roomVo;
    }

    public List<RoomAttachmentVo> attachmentList() {
        return roomMapper.attachmentList();
    }

    public String[] isAvailable(Long no) {
        String[] data = roomMapper.getIsAvailable(no); // 원본 데이터 (yyyyMMdd 형식)
        String[] result = new String[data.length]; // 변환된 값을 저장할 배열

        DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        for (int i = 0; i < data.length; i++) {
            LocalDate date = LocalDate.parse(data[i], inputFormatter);
            result[i] = date.format(outputFormatter); // 변환된 값 저장
        }

        return result; // 변환된 배열 반환
    }

    public GuestVo memberInfo(Long no) {
        return roomMapper.memberInfo(no);
    }
}
