package com.kh.springfinal.space;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("space")
@CrossOrigin
public class SpaceController {

    private final SpaceService service;

    @GetMapping("list")
    public List<SpaceVo> spaceGetListAll(){
        List<SpaceVo> voList = service.spaceGetListAll();

//        System.out.println("vo :::"+ voList);
        return voList;

    }
    @GetMapping("attachmentlist")
    public List<AttachmentVo> spacegetattachment(){
        List<AttachmentVo> attachmentVoList = service.spaceGetAttachment();
        System.out.println("attachmentVoList = " + attachmentVoList);
        return attachmentVoList;
    }
}
