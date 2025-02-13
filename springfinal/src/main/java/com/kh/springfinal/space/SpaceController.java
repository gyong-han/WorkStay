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
    public List<SpaceVo> spaceGetListAll() throws InterruptedException {
        List<SpaceVo> voList = service.spaceGetListAll();

//        System.out.println("vo :::"+ voList);
        return voList;

    }
    @GetMapping("attachmentlist")
    public List<AttachmentVo> spacegetattachment() throws InterruptedException {

        List<AttachmentVo> attachmentVoList = service.spaceGetAttachment();
        System.out.println("attachmentVoList = " + attachmentVoList);
        return attachmentVoList;
    }
    @PostMapping("detail")
    public SpaceVo spaceGetDetailVo(@RequestBody Long no){
        System.out.println(no);
        return service.spaceGetDetailVo(no);
    }

}
