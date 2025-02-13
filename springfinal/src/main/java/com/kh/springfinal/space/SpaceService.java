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

        AttachmentVo vo = mapper.spaceGetAttachmentByNo(no);
        SpaceVo spaceVo = mapper.spaceGetDetailVo(no);
        spaceVo.setAttachmentFilePaths(new String[] {spaceVo.getFilePath()});
        return spaceVo;
    }
}
