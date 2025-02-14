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
    public List<SpaceVo> spaceGetListAll() {
        return mapper.spaceGetListAll();
    }

    public List<AttachmentVo> spaceGetAttachment() {
        return mapper.spaceGetAttachment();
    }

    public SpaceVo spaceGetDetailVo(Long no) {

        List<AttachmentVo> attachments  = mapper.spaceGetAttachmentByNo(no);
        String[] filePaths = attachments.stream()
                .map(AttachmentVo::getFilePath)
                .toArray(String[]::new);
        SpaceVo spaceVo = mapper.spaceGetDetailVo(no);
        spaceVo.setAttachmentFilePaths(filePaths);
        return spaceVo;
    }
}
