package com.kh.springfinal.space;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class SpaceService {

    private final SpaceMapper mapper;
    public List<SpaceVo> spaceGetListAll(String area,String people,String date) {
        return mapper.spaceGetListAll(area,people,date);
    }

    public List<AttachmentVo> spaceGetAttachment() {
        return mapper.spaceGetAttachment();
    }

    public SpaceVo spaceGetDetailVo(Long no) {
        SpaceVo spaceVo = mapper.spaceGetDetailVo(no);

        List<String> features = mapper.getFeatures(no);

        System.out.println("features ::: " +features);

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

    public int reservation(SpaceVo vo, String memberNo) {
        int result = mapper.reservation(vo,memberNo);
        return result;
    }
}
