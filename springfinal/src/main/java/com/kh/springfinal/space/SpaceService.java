package com.kh.springfinal.space;

import com.kh.springfinal.guest.GuestVo;
import com.kh.springfinal.reservation.SpaceReservVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class SpaceService {

    private final SpaceMapper mapper;
    public List<SpaceVo> spaceGetListAll(String area,String people,String date,String title,String sort) {
//        System.out.println("sort 22222222:::"+sort);
        if(sort.equals("popular")){
            return mapper.spaceGetListPopular(area,people,date,title,sort);
        }else{
        return mapper.spaceGetListAll(area,people,date,title,sort);
        }
    }

    public List<AttachmentVo> spaceGetAttachment() {
        return mapper.spaceGetAttachment();
    }

    public SpaceVo spaceGetDetailVo(Long no) {
        SpaceVo spaceVo = mapper.spaceGetDetailVo(no);

        List<String> features = mapper.getFeatures(no);

//        System.out.println("features ::: " +features);

        List<AttachmentVo> attachments = mapper.spaceGetAttachmentByNo(no);

        String[] attachmentPaths = attachments.stream()
                .map(AttachmentVo::getFilePath)
                .toArray(String[]::new);

        String[] filePaths = new String[attachmentPaths.length + 1];
        filePaths[0] = spaceVo.getFilePath();

        //        배열카피하는데 여기값의   0번쨰부터 시작해서 여기배열의  1번 즉 2번째자리부터 첫번째 데이터의 길이만큼 넣어주는것
        System.arraycopy(attachmentPaths, 0, filePaths, 1, attachmentPaths.length);

        spaceVo.setAttachmentFilePaths(filePaths);
        spaceVo.setFeatures(features);

        return spaceVo;
    }

    public int reservation(SpaceReservVo vo) {
        int result = mapper.reservation(vo);
        return result;
    }

    public String[] getIsAvailable(String no) {
        String[] data = mapper.getIsAvailable(no); // 원본 데이터 (yyyyMMdd 형식)
        String[] result = new String[data.length]; // 변환된 값을 저장할 배열

        DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        for (int i = 0; i < data.length; i++) {
            LocalDate date = LocalDate.parse(data[i], inputFormatter);
            result[i] = date.format(outputFormatter); // 변환된 값 저장
        }

        return result; // 변환된 배열 반환
    }

    public SpaceReservVo packageDone(String no,String date) {
        return mapper.packageDone(no,date);
    }

    public SpaceReservVo getNowTime(SpaceReservVo vo) {
        return mapper.getNowTime(vo);
    }

    public int bookmark(SpaceReservVo vo) {
       return mapper.bookmark(vo);

    }

    public int bookmarkdel(SpaceReservVo vo) {
        return mapper.bookmarkdel(vo);
    }

    public int getbookmark(SpaceReservVo vo) {
        return mapper.getbookmark(vo);
    }

    public GuestVo getMemberInfo(String no) {
        return mapper.getMemberInfo(no);
    }
}
