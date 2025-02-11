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
}
